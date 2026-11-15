"""Lab receiving, specimen decisions, per-test lab status and report release.

ITDOSE stays authoritative. With the manual adapter, a report can be released
only after lab staff record who authorized it and when (copied from ITDOSE);
patients never see draft, superseded or revoked versions.
"""

from __future__ import annotations

import uuid
from datetime import datetime

from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.config import settings
from app.core.exceptions import NotFoundError, ValidationError
from app.models.booking import Booking
from app.models.collect import (
    LAB_STATUSES,
    CollectEvent,
    HomeVisit,
    LabReport,
    ReportAccessLog,
    Specimen,
    TransportManifest,
)
from app.models.user import User
from app.services.collect.common import aware, now_utc, record_event, report_reference
from app.services.collect.notify import notify_user
from app.services.collect.visits import ConflictError, load_visit

REJECTION_REASONS = (
    "hemolyzed",
    "clotted",
    "insufficient_volume",
    "wrong_container",
    "label_mismatch",
    "unlabelled",
    "leaked_or_broken",
    "transport_delay",
    "temperature_excursion",
    "other",
)


async def specimen_by_barcode(db: AsyncSession, barcode: str) -> Specimen:
    specimen = (
        await db.execute(select(Specimen).where(Specimen.barcode == barcode.strip().upper()))
    ).scalar_one_or_none()
    if specimen is None:
        raise NotFoundError("No specimen with that barcode")
    return specimen


async def specimen_view(db: AsyncSession, specimen: Specimen) -> dict:
    visit = await load_visit(db, specimen.visit_id)
    tests = [b for b in visit.bookings if str(b.id) in set(specimen.booking_ids)]
    history = list(
        (
            await db.execute(
                select(CollectEvent)
                .where(
                    CollectEvent.entity_type == "specimen",
                    CollectEvent.entity_id == str(specimen.id),
                )
                .order_by(CollectEvent.at)
            )
        ).scalars()
    )
    manifest = (
        await db.get(TransportManifest, specimen.manifest_id) if specimen.manifest_id else None
    )
    return {
        "barcode": specimen.barcode,
        "status": specimen.status,
        "container_type": specimen.container_type,
        "sample_type": specimen.sample_type,
        "volume_ml": specimen.volume_ml,
        "observations": specimen.observations,
        "collected_at": specimen.collected_at,
        "received_at": specimen.received_at,
        "decision_reason": specimen.decision_reason,
        "decision_notes": specimen.decision_notes,
        "recollect_of_id": specimen.recollect_of_id,
        "visit": {
            "id": visit.id,
            "reference": visit.reference,
            "patient_name": visit.patient_name,
            "patient_dob": visit.patient_dob,
            "patient_gender": visit.patient_gender,
        },
        "tests": [
            {
                "booking_id": b.id,
                "name": b.test_name,
                "lab_status": b.lab_status,
                "lis_accession": b.lis_accession,
            }
            for b in tests
        ],
        "manifest": None
        if manifest is None
        else {
            "id": manifest.id,
            "reference": manifest.reference,
            "status": manifest.status,
            "seal_intact": manifest.seal_intact,
            "temperature_note": manifest.temperature_note,
        },
        "history": [
            {
                "event": e.event,
                "from": e.from_status,
                "to": e.to_status,
                "at": e.at,
                "actor_role": e.actor_role,
                "details": e.details,
            }
            for e in history
        ],
    }


async def _mark_received(
    db: AsyncSession, specimen: Specimen, actor: User, *, manifest_ref: str | None
) -> None:
    if specimen.status in ("received", "accepted", "rejected", "on_hold"):
        return
    previous = specimen.status
    specimen.status = "received"
    specimen.received_at = now_utc()
    specimen.received_by_id = actor.id
    specimen.custodian_id = actor.id
    visit = await load_visit(db, specimen.visit_id)
    for b in visit.bookings:
        if str(b.id) in set(specimen.booking_ids) and b.lab_status == "not_received":
            b.lab_status = "received"
    await record_event(
        db,
        entity_type="specimen",
        entity_id=specimen.id,
        visit_id=specimen.visit_id,
        event="lab_received",
        from_status=previous,
        to_status="received",
        actor=actor,
        details={"manifest": manifest_ref},
        patient_visible=True,
    )


async def receive_manifest(
    db: AsyncSession,
    manifest_id: uuid.UUID,
    actor: User,
    scanned: list[str],
    *,
    seal_intact: bool | None,
    temperature_note: str | None,
) -> dict:
    manifest = await db.get(TransportManifest, manifest_id)
    if manifest is None or manifest.status not in ("in_transit", "open"):
        raise NotFoundError("Manifest not awaiting receipt")
    specimens = list(
        (await db.execute(select(Specimen).where(Specimen.manifest_id == manifest.id))).scalars()
    )
    scanned_set = {b.strip().upper() for b in scanned if b.strip()}
    expected = {s.barcode for s in specimens if s.status not in ("missing",)}
    extra = scanned_set - {s.barcode for s in specimens}
    missing = expected - scanned_set
    for s in specimens:
        if s.barcode in scanned_set:
            await _mark_received(db, s, actor, manifest_ref=manifest.reference)
        elif s.barcode in missing:
            previous = s.status
            s.status = "missing"
            s.decision_notes = f"Not received with {manifest.reference}"
            await record_event(
                db,
                entity_type="specimen",
                entity_id=s.id,
                visit_id=s.visit_id,
                event="missing_at_lab",
                from_status=previous,
                to_status="missing",
                actor=actor,
            )
    manifest.status = "received"
    manifest.received_at = now_utc()
    manifest.received_by_id = actor.id
    manifest.pending_receiver_id = None
    if seal_intact is not None:
        manifest.seal_intact = seal_intact
    if temperature_note:
        manifest.temperature_note = temperature_note.strip()[:80]
    await record_event(
        db,
        entity_type="manifest",
        entity_id=manifest.id,
        event="received",
        to_status="received",
        actor=actor,
        details={
            "missing": sorted(missing),
            "unexpected": sorted(extra),
            "seal_intact": manifest.seal_intact,
        },
    )
    await db.commit()
    return {
        "received": len(scanned_set & expected),
        "missing": sorted(missing),
        "unexpected": sorted(extra),
    }


async def receive_single(db: AsyncSession, barcode: str, actor: User) -> Specimen:
    specimen = await specimen_by_barcode(db, barcode)
    if specimen.status in ("missing", "damaged"):
        raise ConflictError(
            f"This specimen is marked {specimen.status}. Review it before receiving."
        )
    await _mark_received(db, specimen, actor, manifest_ref=None)
    await db.commit()
    return specimen


async def decide(
    db: AsyncSession,
    barcode: str,
    actor: User,
    decision: str,
    reason: str | None,
    notes: str | None,
) -> dict:
    from app.services.collect.dispatch import open_recollection

    specimen = await specimen_by_barcode(db, barcode)
    if specimen.status not in ("received", "on_hold"):
        raise ConflictError("Receive the specimen before accepting or rejecting it.")
    if decision not in ("accept", "reject", "hold"):
        raise ValidationError("Decision must be accept, reject or hold.")
    if decision in ("reject", "hold") and reason not in REJECTION_REASONS:
        raise ValidationError("Choose a standard reason.")
    previous = specimen.status
    specimen.status = {"accept": "accepted", "reject": "rejected", "hold": "on_hold"}[decision]
    specimen.decision_reason = reason if decision != "accept" else None
    specimen.decision_notes = (notes or "").strip() or None
    visit = await load_visit(db, specimen.visit_id)
    for b in visit.bookings:
        if str(b.id) in set(specimen.booking_ids):
            if decision == "accept" and b.lab_status in ("not_received", "received", "on_hold"):
                b.lab_status = "in_progress"
            elif decision != "accept":
                b.lab_status = "on_hold"
    await record_event(
        db,
        entity_type="specimen",
        entity_id=specimen.id,
        visit_id=specimen.visit_id,
        event=f"lab_{specimen.status}",
        from_status=previous,
        to_status=specimen.status,
        actor=actor,
        details={"reason": reason, "note": specimen.decision_notes},
        patient_visible=decision == "accept",
    )
    await db.commit()
    recollection = None
    if decision == "reject":
        label = reason.replace("_", " ") if reason else "sample could not be used"
        await open_recollection(db, visit.id, actor, f"Sample {label}", [str(specimen.id)])
        recollection = True
    return {
        "barcode": specimen.barcode,
        "status": specimen.status,
        "recollection_opened": bool(recollection),
    }


async def set_lab_status(
    db: AsyncSession,
    booking_id: uuid.UUID,
    actor: User,
    status: str,
    accession: str | None,
    note: str | None,
) -> Booking:
    booking = await db.get(Booking, booking_id)
    if booking is None:
        raise NotFoundError("Test order not found")
    if status not in LAB_STATUSES or status == "authorized":
        raise ValidationError(
            "Choose a valid lab status. 'Authorized' is set by releasing a report."
        )
    previous = booking.lab_status
    booking.lab_status = status
    if accession:
        booking.lis_accession = accession.strip()[:60]
        booking.lis_sync_status = "manual"
    await record_event(
        db,
        entity_type="booking",
        entity_id=booking.id,
        visit_id=booking.visit_id,
        event=f"lab_{status}",
        from_status=previous,
        to_status=status,
        actor=actor,
        details={"note": note, "accession": booking.lis_accession, "test": booking.test_name},
        patient_visible=status in ("in_progress", "under_review", "delayed", "on_hold"),
    )
    if status == "delayed" and booking.user_id:
        await notify_user(
            db,
            booking.user_id,
            kind="report_delayed",
            title="Report delayed",
            body=f"Your {booking.test_name or 'test'} report is taking longer than usual.",
            data={"visit_id": booking.visit_id},
        )
    await db.commit()
    return booking


# ── Reports ─────────────────────────────────────────────────────────────────


async def create_report(
    db: AsyncSession,
    actor: User,
    *,
    visit_id: uuid.UUID,
    booking_ids: list[str],
    title: str,
    file_bytes: bytes,
    content_type: str,
    filename: str,
    lis_accession: str | None,
    authorized_by_name: str | None,
    authorized_at: datetime | None,
    is_partial: bool,
    supersedes_id: uuid.UUID | None,
    amendment_note: str | None,
) -> LabReport:
    from app.services.storage_service import storage_service

    if content_type != "application/pdf":
        raise ValidationError("Reports must be PDF files.")
    if not file_bytes or len(file_bytes) > settings.MAX_UPLOAD_BYTES:
        raise ValidationError("The PDF is empty or too large.")
    visit = await load_visit(db, visit_id)
    live = {str(b.id) for b in visit.bookings if b.status != "cancelled"}
    if not booking_ids or not set(booking_ids) <= live:
        raise ValidationError("Pick the tests this report covers.")
    previous = None
    version = 1
    if supersedes_id:
        previous = await db.get(LabReport, supersedes_id)
        if previous is None or previous.visit_id != visit.id:
            raise ValidationError("The report being amended isn't part of this visit.")
        if not (amendment_note or "").strip():
            raise ValidationError("Describe what was corrected in the amended report.")
        version = previous.version + 1
    report_id = uuid.uuid4()
    path = f"reports/{visit.account_id or 'guest'}/{visit.id}/{report_id}.pdf"
    storage_service.upload(path, file_bytes, "application/pdf")
    report = LabReport(
        id=report_id,
        reference=report_reference(),
        visit_id=visit.id,
        account_id=visit.account_id,
        profile_id=visit.profile_id,
        booking_ids=list(booking_ids),
        title=title.strip()[:200] or "Laboratory report",
        version=version,
        is_partial=is_partial,
        status="draft",
        file_path=path,
        lis_accession=(lis_accession or "").strip() or None,
        authorized_by_name=(authorized_by_name or "").strip() or None,
        authorized_at=authorized_at,
        supersedes_id=previous.id if previous else None,
        amendment_note=(amendment_note or "").strip() or None,
    )
    db.add(report)
    await record_event(
        db,
        entity_type="report",
        entity_id=report.id,
        visit_id=visit.id,
        event="uploaded",
        to_status="draft",
        actor=actor,
        details={"version": version, "filename": filename[:120]},
    )
    await db.commit()
    await db.refresh(report)
    return report


async def release_report(db: AsyncSession, report_id: uuid.UUID, actor: User) -> LabReport:
    from app.services.collect.lis import lis_adapter

    report = await db.get(LabReport, report_id)
    if report is None:
        raise NotFoundError("Report not found")
    if report.status == "released":
        return report
    if report.status != "draft":
        raise ConflictError("Only draft reports can be released.")
    if not report.authorized_by_name or report.authorized_at is None:
        raise ValidationError(
            "Record who authorized this report in ITDOSE, and when, before releasing it."
        )
    if aware(report.authorized_at) > now_utc():
        raise ValidationError("Authorization time can't be in the future.")
    verified = await lis_adapter().verify_release(report)
    if verified is False:
        raise ConflictError("ITDOSE does not show this report as authorized. It can't be released.")
    visit = await load_visit(db, report.visit_id)
    report.status = "released"
    report.released_at = now_utc()
    report.released_by_id = actor.id
    if report.supersedes_id:
        old = await db.get(LabReport, report.supersedes_id)
        if old is not None and old.status == "released":
            old.status = "superseded"
            await record_event(
                db,
                entity_type="report",
                entity_id=old.id,
                visit_id=visit.id,
                event="superseded",
                from_status="released",
                to_status="superseded",
                actor=actor,
            )
    covered = set(report.booking_ids)
    for b in visit.bookings:
        if str(b.id) in covered:
            b.lab_status = "partial" if report.is_partial else "authorized"
            if not report.is_partial:
                b.status = "report_ready"
    await record_event(
        db,
        entity_type="report",
        entity_id=report.id,
        visit_id=visit.id,
        event="amended_report_released" if report.supersedes_id else "report_released",
        from_status="draft",
        to_status="released",
        actor=actor,
        details={
            "version": report.version,
            "partial": report.is_partial,
            "authorized_by": report.authorized_by_name,
        },
        patient_visible=True,
    )
    title = (
        "Updated report available"
        if report.supersedes_id
        else ("Partial report ready" if report.is_partial else "Your report is ready")
    )
    await notify_user(
        db,
        visit.account_id,
        kind="report_ready",
        title=title,
        body=f"{visit.reference}: open the QXL app to view it securely.",
        data={"visit_id": visit.id, "report_id": report.id},
    )
    await db.commit()
    await _email_report_ready(visit, title)
    return report


async def _email_report_ready(visit: HomeVisit, title: str) -> None:
    """Email carries no medical content or link — only a prompt to sign in."""
    from app.db.session import AsyncSessionLocal
    from app.models.user import User as UserModel
    from app.services.notification_service import send_email

    if visit.account_id is None:
        return
    async with AsyncSessionLocal() as db:
        user = await db.get(UserModel, visit.account_id)
    if user and user.email:
        await send_email(
            user.email,
            f"QXL Diagnostics — {title}",
            f"{title} for booking {visit.reference}. "
            "Sign in to the QXL app or website to view it securely.",
        )


async def revoke_report(
    db: AsyncSession, report_id: uuid.UUID, actor: User, reason: str
) -> LabReport:
    report = await db.get(LabReport, report_id)
    if report is None:
        raise NotFoundError("Report not found")
    if not (reason or "").strip():
        raise ValidationError("A reason is required to revoke a report.")
    previous = report.status
    report.status = "revoked"
    await record_event(
        db,
        entity_type="report",
        entity_id=report.id,
        visit_id=report.visit_id,
        event="revoked",
        from_status=previous,
        to_status="revoked",
        actor=actor,
        details={"reason": reason},
    )
    await db.commit()
    return report


async def patient_reports(db: AsyncSession, user: User) -> list[LabReport]:
    return list(
        (
            await db.execute(
                select(LabReport)
                .where(
                    LabReport.account_id == user.id,
                    LabReport.status.in_(("released", "superseded")),
                )
                .order_by(LabReport.released_at.desc())
            )
        ).scalars()
    )


async def report_access_url(
    db: AsyncSession, user: User, report_id: uuid.UUID, ip: str | None
) -> dict:
    from app.services.storage_service import storage_service

    report = await db.get(LabReport, report_id)
    if report is None or report.account_id != user.id:
        raise NotFoundError("Report not found")
    if report.status != "released":
        raise ConflictError("This version has been replaced. Open the latest report instead.")
    url = storage_service.signed_url(report.file_path, expires_in=settings.REPORT_LINK_TTL_SECONDS)
    db.add(ReportAccessLog(report_id=report.id, user_id=user.id, channel="app", ip_address=ip))
    await record_event(
        db,
        entity_type="report",
        entity_id=report.id,
        visit_id=report.visit_id,
        event="accessed",
        actor=user,
    )
    await db.commit()
    return {"url": url, "expires_in": settings.REPORT_LINK_TTL_SECONDS}

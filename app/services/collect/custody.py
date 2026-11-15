"""Chain of custody: manifests from collector → courier(s) → lab."""

from __future__ import annotations

import uuid

from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.exceptions import NotFoundError, ValidationError
from app.core.roles import FIELD_ROLES
from app.models.catalog import Center
from app.models.collect import CollectorProfile, Specimen, TransportManifest
from app.models.user import User
from app.services.collect.common import manifest_reference, now_utc, record_event
from app.services.collect.notify import notify_user
from app.services.collect.visits import ConflictError

ISSUE_TYPES = ("missing", "damaged", "delayed", "mishandled", "temperature")


async def my_specimens(db: AsyncSession, user: User) -> list[Specimen]:
    """Specimens physically with this user and not already handed over."""
    return list(
        (
            await db.execute(
                select(Specimen)
                .where(
                    Specimen.custodian_id == user.id,
                    Specimen.status.in_(("collected", "in_transit")),
                )
                .order_by(Specimen.collected_at)
            )
        ).scalars()
    )


async def _specimens_by_barcode(db: AsyncSession, barcodes: list[str]) -> dict[str, Specimen]:
    codes = {b.strip().upper() for b in barcodes if b and b.strip()}
    if not codes:
        return {}
    rows = (await db.execute(select(Specimen).where(Specimen.barcode.in_(codes)))).scalars()
    return {s.barcode: s for s in rows}


async def manifest_view(db: AsyncSession, manifest: TransportManifest) -> dict:
    specimens = list(
        (await db.execute(select(Specimen).where(Specimen.manifest_id == manifest.id))).scalars()
    )
    custodian = (
        await db.get(CollectorProfile, manifest.current_custodian_id)
        if manifest.current_custodian_id
        else None
    )
    center = (
        await db.get(Center, manifest.destination_center_id)
        if manifest.destination_center_id
        else None
    )
    return {
        "id": manifest.id,
        "reference": manifest.reference,
        "status": manifest.status,
        "custodian": None
        if custodian is None
        else {"name": custodian.display_name, "employee_code": custodian.employee_code},
        "destination": None if center is None else {"id": center.id, "name": center.name},
        "container_ref": manifest.container_ref,
        "seal_intact": manifest.seal_intact,
        "temperature_note": manifest.temperature_note,
        "dispatched_at": manifest.dispatched_at,
        "received_at": manifest.received_at,
        "created_at": manifest.created_at,
        "notes": manifest.notes,
        "specimens": [
            {
                "barcode": s.barcode,
                "status": s.status,
                "container_type": s.container_type,
                "visit_id": s.visit_id,
                "collected_at": s.collected_at,
            }
            for s in specimens
        ],
    }


async def _courier_by_code(db: AsyncSession, code: str) -> CollectorProfile:
    profile = (
        await db.execute(
            select(CollectorProfile).where(CollectorProfile.employee_code == code.strip())
        )
    ).scalar_one_or_none()
    user = await db.get(User, profile.user_id) if profile else None
    if profile is None or user is None or user.role not in FIELD_ROLES or not profile.is_active:
        raise ValidationError("No active courier or collector with that employee code.")
    return profile


async def create_manifest(db: AsyncSession, actor: User, data: dict) -> TransportManifest:
    """Bag specimens in my custody and hand them to a courier (who must scan to
    accept) or carry them to a lab directly (lab scans to receive)."""
    barcodes = data.get("barcodes") or []
    found = await _specimens_by_barcode(db, barcodes)
    unknown = sorted({b.strip().upper() for b in barcodes if b.strip()} - set(found))
    if unknown:
        raise ValidationError("Unknown labels: " + ", ".join(unknown))
    if not found:
        raise ValidationError("Scan at least one specimen.")
    for s in found.values():
        if s.custodian_id != actor.id or s.status not in ("collected", "in_transit"):
            raise ConflictError(f"{s.barcode} isn't in your custody.")
    to_code = (data.get("handover_to_code") or "").strip()
    center_id = data.get("destination_center_id")
    if not to_code and not center_id:
        raise ValidationError(
            "Choose the courier you're handing to, or the lab you're delivering to."
        )
    receiver = await _courier_by_code(db, to_code) if to_code else None
    if receiver is not None and receiver.user_id == actor.id:
        raise ValidationError("You can't hand specimens to yourself.")
    manifest = TransportManifest(
        reference=manifest_reference(),
        status="open" if receiver else "in_transit",
        created_by_id=actor.id,
        current_custodian_id=actor.id,
        destination_center_id=center_id,
        container_ref=(data.get("container_ref") or "").strip() or None,
        seal_intact=data.get("seal_intact"),
        temperature_note=(data.get("temperature_note") or "").strip() or None,
        dispatched_at=now_utc(),
        pending_receiver_id=receiver.user_id if receiver else None,
        notes=(data.get("notes") or "").strip() or None,
    )
    db.add(manifest)
    await db.flush()
    for s in found.values():
        previous = s.status
        s.manifest_id = manifest.id
        s.status = "handed_over" if receiver else "in_transit"
        await record_event(
            db,
            entity_type="specimen",
            entity_id=s.id,
            visit_id=s.visit_id,
            event="manifested",
            from_status=previous,
            to_status=s.status,
            actor=actor,
            details={
                "manifest": manifest.reference,
                "to": receiver.employee_code if receiver else "lab",
            },
            patient_visible=True,
        )
    await record_event(
        db,
        entity_type="manifest",
        entity_id=manifest.id,
        event="created",
        to_status=manifest.status,
        actor=actor,
        details={
            "count": len(found),
            "to": receiver.employee_code if receiver else None,
            "seal_intact": manifest.seal_intact,
        },
    )
    if receiver is not None:
        await notify_user(
            db,
            receiver.user_id,
            kind="manifest_incoming",
            title="Specimens to collect",
            body=f"{manifest.reference}: {len(found)} specimen(s) waiting for your scan.",
            data={"manifest_id": manifest.id},
        )
    await db.commit()
    await db.refresh(manifest)
    return manifest


async def courier_manifests(db: AsyncSession, user: User) -> list[TransportManifest]:
    rows = (
        (
            await db.execute(
                select(TransportManifest)
                .where(TransportManifest.status.in_(("open", "in_transit")))
                .order_by(TransportManifest.created_at.desc())
            )
        )
        .scalars()
        .all()
    )
    return [
        m
        for m in rows
        if m.pending_receiver_id == user.id
        or (m.current_custodian_id == user.id and m.status == "in_transit")
    ]


async def accept_manifest(
    db: AsyncSession,
    manifest_id: uuid.UUID,
    actor: User,
    scanned: list[str],
    *,
    seal_intact: bool | None,
    temperature_note: str | None,
) -> TransportManifest:
    manifest = await db.get(TransportManifest, manifest_id)
    if manifest is None or manifest.pending_receiver_id != actor.id or manifest.status != "open":
        raise NotFoundError("No handover waiting for you with that manifest.")
    specimens = list(
        (await db.execute(select(Specimen).where(Specimen.manifest_id == manifest.id))).scalars()
    )
    scanned_set = {b.strip().upper() for b in scanned if b.strip()}
    expected = {s.barcode for s in specimens}
    extra = scanned_set - expected
    if extra:
        raise ValidationError("These labels aren't in this manifest: " + ", ".join(sorted(extra)))
    missing = expected - scanned_set
    giver = manifest.current_custodian_id
    for s in specimens:
        previous = s.status
        if s.barcode in missing:
            s.status = "missing"
            s.decision_notes = f"Not found at handover ({manifest.reference})"
            await record_event(
                db,
                entity_type="specimen",
                entity_id=s.id,
                visit_id=s.visit_id,
                event="missing_at_handover",
                from_status=previous,
                to_status="missing",
                actor=actor,
                details={"manifest": manifest.reference},
            )
            continue
        s.status = "in_transit"
        s.custodian_id = actor.id
        await record_event(
            db,
            entity_type="specimen",
            entity_id=s.id,
            visit_id=s.visit_id,
            event="custody_accepted",
            from_status=previous,
            to_status="in_transit",
            actor=actor,
            details={"manifest": manifest.reference, "from": str(giver)},
            patient_visible=True,
        )
    manifest.status = "in_transit"
    manifest.current_custodian_id = actor.id
    manifest.pending_receiver_id = None
    if seal_intact is not None:
        manifest.seal_intact = seal_intact
    if temperature_note:
        manifest.temperature_note = temperature_note.strip()[:80]
    await record_event(
        db,
        entity_type="manifest",
        entity_id=manifest.id,
        event="accepted",
        to_status="in_transit",
        actor=actor,
        details={"missing": sorted(missing), "seal_intact": seal_intact},
    )
    await db.commit()
    return manifest


async def transfer_manifest(
    db: AsyncSession,
    manifest_id: uuid.UUID,
    actor: User,
    to_code: str | None,
    destination_center_id: uuid.UUID | None,
) -> TransportManifest:
    """Courier passes the bag on (hub hop) or sets the destination lab."""
    manifest = await db.get(TransportManifest, manifest_id)
    if (
        manifest is None
        or manifest.current_custodian_id != actor.id
        or manifest.status != "in_transit"
    ):
        raise NotFoundError("Manifest not in your custody.")
    if to_code:
        receiver = await _courier_by_code(db, to_code)
        manifest.status = "open"
        manifest.pending_receiver_id = receiver.user_id
        await notify_user(
            db,
            receiver.user_id,
            kind="manifest_incoming",
            title="Specimens to collect",
            body=f"{manifest.reference} is waiting for your scan.",
            data={"manifest_id": manifest.id},
        )
        await record_event(
            db,
            entity_type="manifest",
            entity_id=manifest.id,
            event="handover_offered",
            actor=actor,
            details={"to": receiver.employee_code},
        )
    if destination_center_id:
        manifest.destination_center_id = destination_center_id
    await db.commit()
    return manifest


async def report_issue(
    db: AsyncSession, barcode: str, actor: User, kind: str, note: str | None
) -> Specimen:
    if kind not in ISSUE_TYPES:
        raise ValidationError("Unknown issue type.")
    specimen = (
        await db.execute(select(Specimen).where(Specimen.barcode == barcode.strip().upper()))
    ).scalar_one_or_none()
    if specimen is None:
        raise NotFoundError("Specimen not found")
    if specimen.custodian_id != actor.id and specimen.collected_by_id != actor.id:
        raise NotFoundError("Specimen not found")
    previous = specimen.status
    if kind in ("missing", "damaged"):
        specimen.status = kind
    specimen.decision_notes = (note or kind)[:500]
    await record_event(
        db,
        entity_type="specimen",
        entity_id=specimen.id,
        visit_id=specimen.visit_id,
        event=f"issue_{kind}",
        from_status=previous,
        to_status=specimen.status,
        actor=actor,
        details={"note": note},
    )
    await db.commit()
    return specimen

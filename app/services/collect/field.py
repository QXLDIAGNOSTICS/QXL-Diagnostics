"""Collector (phlebotomist) actions. Every guard here is also why offline
replays can't skip safety checks: the server re-validates each step."""

from __future__ import annotations

import re
import uuid
from datetime import datetime, timedelta

from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import selectinload

from app.core.exceptions import NotFoundError, PermissionDeniedError, ValidationError
from app.models.booking import Booking
from app.models.catalog import HealthPackage, TestCatalog
from app.models.collect import (
    CollectionJob,
    CollectorLocation,
    CollectorProfile,
    HomeVisit,
    Specimen,
    VisitPayment,
)
from app.models.user import User
from app.services.collect.common import aware, haversine_m, now_utc, record_event, today_ist
from app.services.collect.notify import notify_user
from app.services.collect.visits import ConflictError, address_line

BARCODE_RE = re.compile(r"^[A-Za-z0-9\-]{6,40}$")
CHECKLIST_KEYS = (
    "labels_verified_with_patient",
    "pressure_applied_bleeding_stopped",
    "patient_feeling_well",
    "sharps_disposed_safely",
    "samples_stored_correctly",
)
APPROACHING_METRES = 500


async def load_job(db: AsyncSession, job_id: uuid.UUID, collector: User) -> CollectionJob:
    job = (
        await db.execute(
            select(CollectionJob)
            .where(CollectionJob.id == job_id)
            .options(selectinload(CollectionJob.visit).selectinload(HomeVisit.bookings))
        )
    ).scalar_one_or_none()
    if job is None or job.collector_id != collector.id:
        raise NotFoundError("Job not found")
    return job


def _require(job: CollectionJob, allowed: set[str], action: str) -> None:
    if job.status not in allowed:
        raise ConflictError(f"Can't {action} while the job is '{job.status}'.")
    if job.visit.status == "cancelled":
        raise ConflictError("This visit was cancelled.")


async def list_jobs(db: AsyncSession, collector: User, scope: str) -> list[CollectionJob]:
    today = today_ist()
    query = (
        select(CollectionJob)
        .join(HomeVisit, HomeVisit.id == CollectionJob.visit_id)
        .where(CollectionJob.collector_id == collector.id)
        .options(selectinload(CollectionJob.visit).selectinload(HomeVisit.bookings))
    )
    if scope == "today":
        query = query.where(HomeVisit.slot_date == today, CollectionJob.status != "cancelled")
    elif scope == "upcoming":
        query = query.where(HomeVisit.slot_date > today, CollectionJob.status != "cancelled")
    elif scope == "active":
        query = query.where(
            CollectionJob.status.in_(("assigned", "acknowledged", "en_route", "arrived"))
        )
    else:  # history
        query = query.where(HomeVisit.slot_date >= today - timedelta(days=60))
    query = query.order_by(HomeVisit.slot_date, HomeVisit.slot_label)
    return list((await db.execute(query)).scalars())


async def requirements(db: AsyncSession, bookings: list[Booking]) -> list[dict]:
    """Specimen requirements per test, from the catalogue (packages fall back
    to their details sample type)."""
    out = []
    for b in bookings:
        if b.status == "cancelled":
            continue
        item: dict = {
            "booking_id": b.id,
            "name": b.test_name,
            "container_type": None,
            "sample_type": None,
            "instructions": None,
            "fasting_required": None,
            "preparation": None,
        }
        if b.test_id:
            test = await db.get(TestCatalog, b.test_id)
            if test is not None:
                item.update(
                    container_type=test.container_type,
                    sample_type=test.sample_type,
                    instructions=test.specimen_instructions,
                    fasting_required=test.fasting_required,
                    preparation=test.preparation,
                )
        elif b.package_id:
            pkg = await db.get(HealthPackage, b.package_id)
            details = (pkg.details or {}) if pkg else {}
            item.update(
                sample_type=details.get("sample_type"),
                preparation=details.get("fasting_hours"),
                container_type=details.get("container_type"),
            )
        out.append(item)
    return out


async def amount_due_paise(db: AsyncSession, visit: HomeVisit) -> int:
    if visit.payment_mode != "pay_on_visit":
        return 0
    live = [b for b in visit.bookings if b.status != "cancelled"]
    if all(b.payment_status == "paid" for b in live):
        return 0
    paid_offline = sum(
        p.amount_paise
        for p in (
            await db.execute(select(VisitPayment).where(VisitPayment.visit_id == visit.id))
        ).scalars()
    )
    return max(visit.total_paise - paid_offline, 0)


async def job_detail(db: AsyncSession, job: CollectionJob) -> dict:
    v = job.visit
    specimens = list(
        (
            await db.execute(
                select(Specimen).where(Specimen.job_id == job.id).order_by(Specimen.collected_at)
            )
        ).scalars()
    )
    recollect = []
    if job.recollect_specimen_ids:
        rows = (
            await db.execute(
                select(Specimen).where(
                    Specimen.id.in_([uuid.UUID(x) for x in job.recollect_specimen_ids])
                )
            )
        ).scalars()
        recollect = [
            {
                "barcode": s.barcode,
                "container_type": s.container_type,
                "reason": s.decision_reason,
                "booking_ids": s.booking_ids,
            }
            for s in rows
        ]
    return {
        "id": job.id,
        "reference": job.reference,
        "kind": job.kind,
        "status": job.status,
        "visit_id": v.id,
        "visit_reference": v.reference,
        "visit_status": v.status,
        "slot_date": v.slot_date,
        "slot_label": v.slot_label,
        "patient": {
            "name": v.patient_name,
            "date_of_birth": v.patient_dob,
            "gender": v.patient_gender,
            "phone": v.patient_phone,
            "age": (v.slot_date - v.patient_dob).days // 365 if v.patient_dob else None,
        },
        "address": {
            "line": address_line(v),
            "house": v.house,
            "street": v.street,
            "locality": v.locality,
            "pincode": v.pincode,
            "landmark": v.landmark,
            "instructions": v.address_instructions,
            "lat": v.lat,
            "lng": v.lng,
        },
        "notes": v.notes,
        "requirements": await requirements(db, v.bookings),
        "recollect": recollect,
        "payment_mode": v.payment_mode,
        "amount_due_paise": await amount_due_paise(db, v),
        "identity_verified": job.identity_verified_at is not None,
        "identity_method": job.identity_method,
        "specimens": [
            {
                "barcode": s.barcode,
                "container_type": s.container_type,
                "sample_type": s.sample_type,
                "booking_ids": s.booking_ids,
                "collected_at": s.collected_at,
                "status": s.status,
                "volume_ml": s.volume_ml,
                "observations": s.observations,
            }
            for s in specimens
        ],
        "checklist_keys": list(CHECKLIST_KEYS),
        "assigned_at": job.assigned_at,
        "acknowledged_at": job.acknowledged_at,
        "en_route_at": job.en_route_at,
        "arrived_at": job.arrived_at,
        "completed_at": job.completed_at,
        "is_delayed": job.is_delayed,
        "outcome_reason": job.outcome_reason,
    }


async def _transition(
    db: AsyncSession,
    job: CollectionJob,
    to: str,
    actor: User,
    event: str,
    *,
    lat=None,
    lng=None,
    details=None,
    patient_visible=True,
) -> None:
    previous = job.status
    job.status = to
    await record_event(
        db,
        entity_type="job",
        entity_id=job.id,
        visit_id=job.visit_id,
        event=event,
        from_status=previous,
        to_status=to,
        actor=actor,
        lat=lat,
        lng=lng,
        details=details,
        patient_visible=patient_visible,
    )


async def acknowledge(db: AsyncSession, job: CollectionJob, actor: User) -> CollectionJob:
    if job.status == "acknowledged":
        return job
    _require(job, {"assigned"}, "acknowledge")
    job.acknowledged_at = now_utc()
    await _transition(db, job, "acknowledged", actor, "acknowledged")
    await db.commit()
    return job


async def start_journey(
    db: AsyncSession, job: CollectionJob, actor: User, lat: float | None, lng: float | None
) -> CollectionJob:
    if job.status == "en_route":
        return job
    _require(job, {"assigned", "acknowledged"}, "start the journey")
    now = now_utc()
    job.acknowledged_at = job.acknowledged_at or now
    job.en_route_at = now
    if lat is not None and lng is not None:
        job.last_lat, job.last_lng, job.last_location_at = lat, lng, now
        db.add(
            CollectorLocation(
                job_id=job.id, collector_id=actor.id, lat=lat, lng=lng, recorded_at=now
            )
        )
    await _transition(db, job, "en_route", actor, "journey_started", lat=lat, lng=lng)
    await notify_user(
        db,
        job.visit.account_id,
        kind="collector_on_the_way",
        title="Your collector is on the way",
        body="Track their arrival live in the QXL app.",
        data={"visit_id": job.visit_id},
    )
    await db.commit()
    return job


async def record_locations(
    db: AsyncSession, job: CollectionJob, actor: User, points: list[dict]
) -> dict:
    if job.status not in ("en_route", "arrived"):
        # Tracking is limited to the active trip — drop silently so a queued
        # batch from after arrival/complete doesn't fail the offline queue.
        return {"accepted": 0}
    accepted = 0
    latest: tuple[datetime, float, float] | None = None
    now = now_utc()
    for p in points[:200]:
        try:
            lat, lng = float(p["lat"]), float(p["lng"])
            at = (
                aware(datetime.fromisoformat(str(p["recorded_at"])))
                if p.get("recorded_at")
                else now
            )
        except (KeyError, TypeError, ValueError):
            continue
        if not (-90 <= lat <= 90 and -180 <= lng <= 180) or at > now + timedelta(minutes=2):
            continue
        db.add(
            CollectorLocation(
                job_id=job.id,
                collector_id=actor.id,
                lat=lat,
                lng=lng,
                accuracy_m=p.get("accuracy_m"),
                speed_mps=p.get("speed_mps"),
                recorded_at=at,
            )
        )
        accepted += 1
        if latest is None or at > latest[0]:
            latest = (at, lat, lng)
    if latest is not None and (
        job.last_location_at is None or latest[0] >= aware(job.last_location_at)
    ):
        job.last_location_at, job.last_lat, job.last_lng = latest
        v = job.visit
        if job.status == "en_route" and v.lat is not None:
            close = haversine_m(latest[1], latest[2], v.lat, v.lng) <= APPROACHING_METRES
            flags = dict(job.checklist or {})
            if close and not flags.get("_approaching_notified"):
                flags["_approaching_notified"] = True
                job.checklist = flags
                await record_event(
                    db,
                    entity_type="job",
                    entity_id=job.id,
                    visit_id=v.id,
                    event="approaching",
                    actor=actor,
                    patient_visible=True,
                )
                await notify_user(
                    db,
                    v.account_id,
                    kind="collector_approaching",
                    title="Your collector is nearby",
                    body="They should reach you in a few minutes.",
                    data={"visit_id": v.id},
                )
    await db.commit()
    return {"accepted": accepted}


async def arrive(
    db: AsyncSession, job: CollectionJob, actor: User, lat: float | None, lng: float | None
) -> CollectionJob:
    if job.status == "arrived":
        return job
    _require(job, {"en_route", "acknowledged", "assigned"}, "mark arrival")
    now = now_utc()
    job.arrived_at = now
    job.en_route_at = job.en_route_at or now
    job.arrival_lat, job.arrival_lng = lat, lng
    details = None
    if lat is not None and lng is not None and job.visit.lat is not None:
        details = {"distance_from_pin_m": int(haversine_m(lat, lng, job.visit.lat, job.visit.lng))}
    await _transition(db, job, "arrived", actor, "arrived", lat=lat, lng=lng, details=details)
    await notify_user(
        db,
        job.visit.account_id,
        kind="collector_arrived",
        title="Your collector has arrived",
        body="Please keep your ID-matching details (name and date of birth) ready.",
        data={"visit_id": job.visit_id},
    )
    await db.commit()
    return job


async def verify_identity(
    db: AsyncSession,
    job: CollectionJob,
    actor: User,
    *,
    name_confirmed: bool,
    stated_dob,
    visit_code: str | None,
) -> dict:
    _require(job, {"arrived"}, "verify the patient")
    v = job.visit
    failures = []
    if not name_confirmed:
        failures.append("name")
    if v.patient_dob is None or stated_dob != v.patient_dob:
        failures.append("date_of_birth")
    code = (visit_code or "").strip()
    if code and code != v.visit_code:
        failures.append("visit_code")
    if failures:
        job.identity_failures += 1
        job.identity_verified_at = None
        await record_event(
            db,
            entity_type="job",
            entity_id=job.id,
            visit_id=v.id,
            event="identity_failed",
            actor=actor,
            details={"failed": failures, "attempt": job.identity_failures},
        )
        await db.commit()
        raise ValidationError(
            "Identity check failed: "
            + ", ".join(f.replace("_", " ") for f in failures)
            + ". Do not collect. Re-check with the patient or contact dispatch."
        )
    job.identity_verified_at = now_utc()
    job.identity_method = "name+dob" + ("+visit_code" if code else "")
    await record_event(
        db,
        entity_type="job",
        entity_id=job.id,
        visit_id=v.id,
        event="identity_verified",
        actor=actor,
        details={"method": job.identity_method},
    )
    await db.commit()
    return {"verified": True, "method": job.identity_method}


async def add_specimen(db: AsyncSession, job: CollectionJob, actor: User, data: dict) -> Specimen:
    _require(job, {"arrived"}, "record specimens")
    if job.identity_verified_at is None:
        raise ConflictError("Verify the patient's identity before collecting.")
    barcode = (data.get("barcode") or "").strip().upper()
    if not BARCODE_RE.match(barcode):
        raise ValidationError(
            "That doesn't look like a QXL specimen label. Scan the barcode again."
        )
    existing = (
        await db.execute(select(Specimen).where(Specimen.barcode == barcode))
    ).scalar_one_or_none()
    if existing is not None:
        if (
            existing.job_id == job.id
            and existing.client_ref
            and existing.client_ref == data.get("client_ref")
        ):
            return existing  # offline replay
        raise ConflictError("This label is already linked to another specimen. Use a new label.")
    live_ids = {str(b.id) for b in job.visit.bookings if b.status != "cancelled"}
    booking_ids = [str(x) for x in (data.get("booking_ids") or [])]
    if not booking_ids or not set(booking_ids) <= live_ids:
        raise ValidationError("Link the specimen to at least one test on this visit.")
    container = (data.get("container_type") or "").strip()
    if not container:
        raise ValidationError("Select the container type.")
    collected_at = data.get("collected_at") or now_utc()
    if aware(collected_at) > now_utc() + timedelta(minutes=5):
        raise ValidationError("Collection time can't be in the future.")
    recollect_of = None
    if job.kind == "recollection" and data.get("recollect_of_barcode"):
        original = (
            await db.execute(
                select(Specimen).where(Specimen.barcode == data["recollect_of_barcode"])
            )
        ).scalar_one_or_none()
        if original is None or original.visit_id != job.visit_id:
            raise ValidationError("The original specimen isn't part of this visit.")
        recollect_of = original.id
    specimen = Specimen(
        barcode=barcode,
        visit_id=job.visit_id,
        job_id=job.id,
        booking_ids=booking_ids,
        container_type=container[:40],
        sample_type=(data.get("sample_type") or None),
        collected_at=collected_at,
        collected_by_id=actor.id,
        custodian_id=actor.id,
        volume_ml=data.get("volume_ml"),
        observations=(data.get("observations") or None),
        recollect_of_id=recollect_of,
        client_ref=data.get("client_ref"),
        status="collected",
    )
    db.add(specimen)
    await db.flush()
    await record_event(
        db,
        entity_type="specimen",
        entity_id=specimen.id,
        visit_id=job.visit_id,
        event="collected",
        to_status="collected",
        actor=actor,
        details={
            "barcode": barcode,
            "container_type": specimen.container_type,
            "tests": len(booking_ids),
            "recollect_of": str(recollect_of) if recollect_of else None,
        },
    )
    await db.commit()
    await db.refresh(specimen)
    return specimen


async def remove_specimen(
    db: AsyncSession, job: CollectionJob, actor: User, barcode: str, reason: str | None
) -> None:
    """Undo a wrongly scanned label before the job is closed."""
    _require(job, {"arrived"}, "remove specimens")
    specimen = (
        await db.execute(
            select(Specimen).where(Specimen.barcode == barcode.upper(), Specimen.job_id == job.id)
        )
    ).scalar_one_or_none()
    if specimen is None:
        raise NotFoundError("Specimen not found on this job")
    await record_event(
        db,
        entity_type="specimen",
        entity_id=specimen.id,
        visit_id=job.visit_id,
        event="label_voided",
        from_status=specimen.status,
        actor=actor,
        details={"barcode": specimen.barcode, "reason": reason},
    )
    await db.delete(specimen)
    await db.commit()


async def complete(db: AsyncSession, job: CollectionJob, actor: User, data: dict) -> CollectionJob:
    outcome = data.get("outcome")
    if outcome not in ("collected", "partially_collected", "unsuccessful"):
        raise ValidationError("Choose an outcome.")
    if job.status == outcome:
        return job  # replay
    v = job.visit
    reason = (data.get("reason") or "").strip() or None
    specimens = list(
        (await db.execute(select(Specimen).where(Specimen.job_id == job.id))).scalars()
    )
    live = [b for b in v.bookings if b.status != "cancelled"]
    if outcome == "unsuccessful":
        _require(job, {"assigned", "acknowledged", "en_route", "arrived"}, "close the job")
        if not reason:
            raise ValidationError("Give a reason for the unsuccessful visit.")
        if specimens:
            raise ConflictError(
                "Specimens were recorded — use partial collection or void the labels first."
            )
    else:
        _require(job, {"arrived"}, "complete collection")
        if job.identity_verified_at is None:
            raise ConflictError("Patient identity was not verified. Collection can't be completed.")
        if not specimens:
            raise ValidationError("Scan at least one specimen label.")
        covered = {bid for s in specimens for bid in s.booking_ids}
        uncovered = [b for b in live if str(b.id) not in covered]
        if outcome == "collected" and uncovered:
            raise ValidationError(
                "Some tests have no specimen yet: "
                + ", ".join(b.test_name or "test" for b in uncovered)
            )
        if outcome == "partially_collected" and not reason:
            raise ValidationError("Explain why the collection is partial.")
        checklist = data.get("checklist") or {}
        missing = [k for k in CHECKLIST_KEYS if checklist.get(k) is not True]
        if missing:
            raise ValidationError("Complete the aftercare checklist before closing the job.")
        job.checklist = {**(job.checklist or {}), **{k: True for k in CHECKLIST_KEYS}}
        due = await amount_due_paise(db, v)
        if due > 0:
            payment = data.get("payment") or {}
            mode = payment.get("mode")
            amount = payment.get("amount_paise")
            if mode not in ("cash", "upi") or amount != due:
                raise ValidationError(
                    f"Record the payment of ₹{due / 100:.2f} taken at the visit (cash or UPI)."
                )
            if mode == "upi" and not (payment.get("reference") or "").strip():
                raise ValidationError("Enter the UPI transaction reference.")
            db.add(
                VisitPayment(
                    visit_id=v.id,
                    amount_paise=amount,
                    mode=mode,
                    reference=(payment.get("reference") or "").strip() or None,
                    collected_by_id=actor.id,
                )
            )
            for b in live:
                b.payment_status = "paid"
            await record_event(
                db,
                entity_type="payment",
                entity_id=v.id,
                visit_id=v.id,
                event="paid_at_visit",
                actor=actor,
                details={"mode": mode, "amount_paise": amount},
                patient_visible=True,
            )
        covered_ids = {bid for s in specimens for bid in s.booking_ids}
        for b in live:
            if str(b.id) in covered_ids:
                b.status = "sample_collected"
    job.completed_at = now_utc()
    job.outcome_reason = reason
    await _transition(
        db, job, outcome, actor, outcome, details={"reason": reason, "specimens": len(specimens)}
    )
    if outcome == "collected":
        v.status = "completed"
        await notify_user(
            db,
            v.account_id,
            kind="sample_collected",
            title="Samples collected",
            body="Your samples are on their way to the QXL lab.",
            data={"visit_id": v.id},
        )
    elif outcome == "partially_collected":
        await notify_user(
            db,
            v.account_id,
            kind="sample_partial",
            title="Some samples collected",
            body="Our team will contact you about the remaining tests.",
            data={"visit_id": v.id},
        )
    else:
        await notify_user(
            db,
            v.account_id,
            kind="visit_unsuccessful",
            title="We couldn't complete your collection",
            body="Our team will contact you to reschedule.",
            data={"visit_id": v.id},
        )
    await db.commit()
    return job


EXCEPTION_TYPES = (
    "delay",
    "address_issue",
    "patient_unavailable",
    "patient_unwell",
    "vehicle_issue",
    "other",
)


async def report_exception(
    db: AsyncSession,
    job: CollectionJob,
    actor: User,
    kind: str,
    note: str | None,
    eta_minutes: int | None,
) -> CollectionJob:
    if kind not in EXCEPTION_TYPES:
        raise ValidationError("Unknown exception type.")
    _require(job, {"assigned", "acknowledged", "en_route", "arrived"}, "report an issue")
    note = (note or "").strip() or None
    if kind == "delay":
        job.is_delayed = True
        job.delay_note = note or (
            f"About {eta_minutes} min late" if eta_minutes else "Running late"
        )
        await notify_user(
            db,
            job.visit.account_id,
            kind="collector_delayed",
            title="Your collector is running late",
            body=job.delay_note,
            data={"visit_id": job.visit_id},
        )
    await record_event(
        db,
        entity_type="job",
        entity_id=job.id,
        visit_id=job.visit_id,
        event=f"exception_{kind}",
        actor=actor,
        details={"note": note, "eta_minutes": eta_minutes},
        patient_visible=kind == "delay",
    )
    await db.commit()
    return job


async def collector_profile(db: AsyncSession, user: User) -> CollectorProfile:
    profile = await db.get(CollectorProfile, user.id)
    if profile is None or not profile.is_active:
        raise PermissionDeniedError("Your collector profile isn't set up yet. Contact dispatch.")
    return profile

"""Home visits: booking, patient view, tracking, cancel/reschedule, payment hooks."""

from __future__ import annotations

import uuid
from datetime import date, datetime, timedelta

from sqlalchemy import select
from sqlalchemy.exc import IntegrityError
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import selectinload

from app.core.config import settings
from app.core.exceptions import AppError, NotFoundError, ValidationError
from app.models.booking import Booking
from app.models.catalog import HealthPackage, TestCatalog
from app.models.collect import (
    JOB_ACTIVE_STATUSES,
    CollectEvent,
    CollectionJob,
    CollectorProfile,
    HomeVisit,
    LabReport,
    PatientProfile,
    Specimen,
)
from app.models.user import User
from app.services.booking_service import is_package_bookable_online
from app.services.collect import patients
from app.services.collect.common import (
    IST,
    aware,
    eta_seconds,
    haversine_m,
    job_reference,
    now_ist,
    now_utc,
    record_event,
    today_ist,
    visit_code,
    visit_reference,
)
from app.services.collect.notify import notify_user


class ConflictError(AppError):
    status_code = 409
    code = "conflict"


# Statuses before the collector leaves; patients may still change the visit.
_PATIENT_CHANGEABLE_JOB = frozenset({"unassigned", "assigned", "acknowledged"})


def _age_on(dob: date | None, day: date) -> int | None:
    if dob is None:
        return None
    years = day.year - dob.year - ((day.month, day.day) < (dob.month, dob.day))
    return max(years, 0)


def address_line(v: HomeVisit) -> str:
    parts = [v.house, v.street, v.landmark and f"near {v.landmark}", v.locality, v.city, v.pincode]
    return ", ".join(p for p in parts if p)


async def load_visit(db: AsyncSession, visit_id: uuid.UUID) -> HomeVisit:
    visit = (
        await db.execute(
            select(HomeVisit)
            .where(HomeVisit.id == visit_id)
            .options(selectinload(HomeVisit.bookings), selectinload(HomeVisit.jobs))
        )
    ).scalar_one_or_none()
    if visit is None:
        raise NotFoundError("Visit not found")
    return visit


async def get_owned_visit(db: AsyncSession, user: User, visit_id: uuid.UUID) -> HomeVisit:
    visit = await load_visit(db, visit_id)
    if visit.account_id != user.id:
        raise NotFoundError("Visit not found")
    return visit


def active_job(visit: HomeVisit) -> CollectionJob | None:
    """The newest non-cancelled job (initial or recollection)."""
    for job in sorted(visit.jobs, key=lambda j: j.created_at, reverse=True):
        if job.status != "cancelled":
            return job
    return None


async def _resolve_items(
    db: AsyncSession, items: list[dict]
) -> list[tuple[str, TestCatalog | HealthPackage]]:
    if not items:
        raise ValidationError("Add at least one test or package.")
    if len(items) > 20:
        raise ValidationError("A single visit can include up to 20 tests or packages.")
    seen: set[tuple[str, str]] = set()
    resolved: list[tuple[str, TestCatalog | HealthPackage]] = []
    for item in items:
        kind, raw_id = item.get("kind"), str(item.get("id"))
        if (kind, raw_id) in seen:
            continue
        seen.add((kind, raw_id))
        try:
            item_id = uuid.UUID(raw_id)
        except ValueError as exc:
            raise ValidationError("Invalid item id") from exc
        if kind == "test":
            row = await db.get(TestCatalog, item_id)
            if row is None or not row.is_active or not row.price:
                raise ValidationError("A selected test is no longer available online.")
        elif kind == "package":
            row = await db.get(HealthPackage, item_id)
            if row is None or not row.is_active or not is_package_bookable_online(row):
                raise ValidationError("A selected package can't be booked online.")
        else:
            raise ValidationError("Item kind must be 'test' or 'package'.")
        if not row.home_collection_available:
            raise ValidationError(
                f"'{row.name}' needs a centre visit and can't be collected at home."
            )
        resolved.append((kind, row))
    return resolved


async def _validate_slot(db: AsyncSession, zone: str, day: date, label: str) -> str:
    if day < today_ist() or day > today_ist() + timedelta(days=settings.HOME_VISIT_BOOKING_DAYS):
        raise ValidationError("Please choose a date within the booking window.")
    match = next((s for s in patients.configured_slots() if s[0] == label), None)
    if match is None:
        raise ValidationError("That time slot isn't offered. Please pick another.")
    canonical, start, end = match
    if datetime.combine(day, end or start, tzinfo=IST) <= now_ist():
        raise ConflictError("That time slot has already passed. Please pick a later one.")
    await patients.lock_slot(db, zone, day, canonical)
    capacity = await patients.slot_capacity(db, zone, day, start, end)
    if await patients.booked_visits(db, zone, day, canonical) >= capacity:
        raise ConflictError("That slot was just booked up. Please pick another time.")
    return canonical


async def create_visit(
    db: AsyncSession, user: User, data: dict, idempotency_key: str | None
) -> HomeVisit:
    key = (idempotency_key or "").strip()[:80] or None
    if key:
        existing = (
            await db.execute(
                select(HomeVisit.id).where(
                    HomeVisit.account_id == user.id, HomeVisit.idempotency_key == key
                )
            )
        ).scalar_one_or_none()
        if existing is not None:
            return await load_visit(db, existing)

    if not data.get("consent_accepted"):
        raise ValidationError("Please accept the consent and privacy notice to continue.")
    profile = await patients.get_profile(db, user, data["profile_id"])
    address = data["address"]
    patients._validate_address(address)
    area = await patients.service_area_for(db, address["pincode"])
    if area is None:
        raise ValidationError(f"Home collection isn't available at PIN {address['pincode']} yet.")
    resolved = await _resolve_items(db, data.get("items") or [])
    payment_mode = data.get("payment_mode") or "online"
    if payment_mode not in ("online", "pay_on_visit"):
        raise ValidationError("Unknown payment option.")
    slot_label = await _validate_slot(db, area.zone, data["slot_date"], data["slot_label"])

    items_total = sum(int(row.price) * 100 for _, row in resolved)
    fee = patients.collection_fee_paise(area, items_total)
    visit = HomeVisit(
        reference=visit_reference(),
        account_id=user.id,
        profile_id=profile.id,
        idempotency_key=key,
        source=data.get("source") or "app",
        status="confirmed" if payment_mode == "pay_on_visit" else "pending_payment",
        payment_mode=payment_mode,
        patient_name=profile.full_name,
        patient_dob=profile.date_of_birth,
        patient_gender=profile.gender,
        patient_phone=profile.phone or user.phone,
        visit_code=visit_code(),
        house=address["house"].strip(),
        street=(address.get("street") or "").strip() or None,
        locality=address["locality"].strip(),
        city=(address.get("city") or "Bengaluru").strip(),
        pincode=address["pincode"].strip(),
        landmark=(address.get("landmark") or "").strip() or None,
        address_instructions=(address.get("instructions") or "").strip() or None,
        lat=address.get("lat"),
        lng=address.get("lng"),
        zone=area.zone,
        slot_date=data["slot_date"],
        slot_label=slot_label,
        items_total_paise=items_total,
        collection_fee_paise=fee,
        consent_version=settings.CONSENT_VERSION,
        consent_accepted_at=now_utc(),
        notes=(data.get("notes") or "").strip() or None,
    )
    db.add(visit)
    await db.flush()
    age = _age_on(profile.date_of_birth, data["slot_date"])
    for kind, row in resolved:
        db.add(
            Booking(
                user_id=user.id,
                visit_id=visit.id,
                profile_id=profile.id,
                patient_name=profile.full_name,
                patient_phone=visit.patient_phone,
                patient_email=user.email,
                patient_age=age,
                patient_gender=(profile.gender or "")[:8] or None,
                test_name=row.name,
                test_id=row.id if kind == "test" else None,
                package_id=row.id if kind == "package" else None,
                collection_type="home",
                collection_address=address_line(visit),
                preferred_date=visit.slot_date.isoformat(),
                preferred_time=slot_label,
                notes=visit.notes,
                amount_paise=int(row.price) * 100,
                payment_status="pay_on_visit" if payment_mode == "pay_on_visit" else "unpaid",
            )
        )
    if visit.status == "confirmed":
        await _open_job(db, visit, actor=user)
    await record_event(
        db,
        entity_type="visit",
        entity_id=visit.id,
        visit_id=visit.id,
        event="booked",
        to_status=visit.status,
        actor=user,
        details={
            "items": len(resolved),
            "payment_mode": payment_mode,
            "consent_version": visit.consent_version,
        },
        patient_visible=True,
    )
    await notify_user(
        db,
        user.id,
        kind="visit_booked",
        title="Home collection booked",
        body=f"{visit.reference}: {visit.slot_date:%d %b}, {slot_label}.",
        data={"visit_id": visit.id},
    )
    try:
        await db.commit()
    except IntegrityError:
        # Same idempotency key raced in from a retry; return the winner.
        await db.rollback()
        if key:
            existing = (
                await db.execute(
                    select(HomeVisit.id).where(
                        HomeVisit.account_id == user.id, HomeVisit.idempotency_key == key
                    )
                )
            ).scalar_one()
            return await load_visit(db, existing)
        raise
    return await load_visit(db, visit.id)


async def _open_job(
    db: AsyncSession,
    visit: HomeVisit,
    *,
    actor: object | None,
    kind: str = "initial",
    recollect_specimen_ids: list[str] | None = None,
) -> CollectionJob:
    job = CollectionJob(
        reference=job_reference(),
        visit_id=visit.id,
        kind=kind,
        status="unassigned",
        recollect_specimen_ids=recollect_specimen_ids,
    )
    db.add(job)
    await db.flush()
    await record_event(
        db,
        entity_type="job",
        entity_id=job.id,
        visit_id=visit.id,
        event="job_opened",
        to_status="unassigned",
        actor=actor,
        details={"kind": kind},
        patient_visible=kind == "initial",
    )
    return job


async def on_bookings_paid(db: AsyncSession, booking_ids: list[uuid.UUID]) -> None:
    """Called by the payment service after a verified payment: confirm the
    visit and put it in the dispatch queue. Caller commits."""
    if not booking_ids:
        return
    visit_ids = (
        (
            await db.execute(
                select(Booking.visit_id).where(
                    Booking.id.in_(booking_ids), Booking.visit_id.isnot(None)
                )
            )
        )
        .scalars()
        .all()
    )
    for visit_id in set(visit_ids):
        visit = await load_visit(db, visit_id)
        if visit.status != "pending_payment":
            continue
        if any(b.payment_status != "paid" for b in visit.bookings if b.status != "cancelled"):
            continue
        visit.status = "confirmed"
        if active_job(visit) is None:
            await _open_job(db, visit, actor=None)
        await record_event(
            db,
            entity_type="visit",
            entity_id=visit.id,
            visit_id=visit.id,
            event="payment_verified",
            from_status="pending_payment",
            to_status="confirmed",
            patient_visible=True,
        )
        await notify_user(
            db,
            visit.account_id,
            kind="visit_confirmed",
            title="Payment received",
            body=f"{visit.reference} is confirmed. We'll assign a collector soon.",
            data={"visit_id": visit.id},
        )


# ── Patient view ────────────────────────────────────────────────────────────


def patient_stage(visit: HomeVisit, specimens: list[Specimen], reports: list[LabReport]) -> str:
    if visit.status == "cancelled":
        return "cancelled"
    if visit.status == "pending_payment":
        return "awaiting_payment"
    if any(r.status == "released" for r in reports):
        live = [b for b in visit.bookings if b.status != "cancelled"]
        return (
            "report_ready" if all(b.lab_status == "authorized" for b in live) else "partial_report"
        )
    if any(s.status in ("received", "accepted", "on_hold") for s in specimens):
        return "at_lab"
    if any(s.status in ("handed_over", "in_transit") for s in specimens):
        return "in_transit"
    job = active_job(visit)
    if job is None:
        return "awaiting_assignment"
    return {
        "unassigned": "awaiting_assignment",
        "assigned": "collector_assigned",
        "acknowledged": "collector_confirmed",
        "en_route": "on_the_way",
        "arrived": "arrived",
        "collected": "collected",
        "partially_collected": "partially_collected",
        "unsuccessful": "unsuccessful",
    }.get(job.status, "awaiting_assignment")


async def visit_detail(db: AsyncSession, visit: HomeVisit, *, for_patient: bool = True) -> dict:
    specimens = list(
        (
            await db.execute(
                select(Specimen)
                .where(Specimen.visit_id == visit.id)
                .order_by(Specimen.collected_at)
            )
        ).scalars()
    )
    reports = list(
        (
            await db.execute(
                select(LabReport)
                .where(
                    LabReport.visit_id == visit.id, LabReport.status.in_(("released", "superseded"))
                )
                .order_by(LabReport.released_at.desc())
            )
        ).scalars()
    )
    events_q = (
        select(CollectEvent).where(CollectEvent.visit_id == visit.id).order_by(CollectEvent.at)
    )
    if for_patient:
        events_q = events_q.where(CollectEvent.patient_visible.is_(True))
    events = list((await db.execute(events_q)).scalars())
    job = active_job(visit)
    collector = None
    if job is not None and job.collector_id is not None:
        collector = await collector_card(db, job, for_patient=for_patient)
    can_change = visit.status in ("pending_payment", "confirmed") and (
        job is None or job.status in _PATIENT_CHANGEABLE_JOB
    )
    paid = sum(b.amount_paise or 0 for b in visit.bookings if b.payment_status == "paid")
    live_bookings = [b for b in visit.bookings if b.status != "cancelled"]
    return {
        "id": visit.id,
        "reference": visit.reference,
        "status": visit.status,
        "stage": patient_stage(visit, specimens, reports),
        "payment_mode": visit.payment_mode,
        "payment_status": _visit_payment_status(visit),
        "items_total_paise": visit.items_total_paise,
        "collection_fee_paise": visit.collection_fee_paise,
        "total_paise": visit.total_paise,
        "paid_paise": paid,
        "patient": {
            "profile_id": visit.profile_id,
            "name": visit.patient_name,
            "date_of_birth": visit.patient_dob,
            "gender": visit.patient_gender,
            "phone": visit.patient_phone,
        },
        "visit_code": visit.visit_code if for_patient else None,
        "address": {
            "house": visit.house,
            "street": visit.street,
            "locality": visit.locality,
            "city": visit.city,
            "pincode": visit.pincode,
            "landmark": visit.landmark,
            "instructions": visit.address_instructions,
            "lat": visit.lat,
            "lng": visit.lng,
            "line": address_line(visit),
        },
        "slot_date": visit.slot_date,
        "slot_label": visit.slot_label,
        "can_cancel": can_change,
        "can_reschedule": can_change,
        "job": None
        if job is None
        else {
            "id": job.id,
            "reference": job.reference,
            "kind": job.kind,
            "status": job.status,
            "is_delayed": job.is_delayed,
            "delay_note": job.delay_note,
            "assigned_at": job.assigned_at,
            "en_route_at": job.en_route_at,
            "arrived_at": job.arrived_at,
            "completed_at": job.completed_at,
            "outcome_reason": job.outcome_reason,
        },
        "collector": collector,
        "tests": [
            {
                "booking_id": b.id,
                "name": b.test_name,
                "kind": "package" if b.package_id else "test",
                "amount_paise": b.amount_paise,
                "payment_status": b.payment_status,
                "status": b.status,
                "lab_status": b.lab_status,
            }
            for b in live_bookings
        ],
        "specimens": [
            {
                "barcode": s.barcode if not for_patient else None,
                "container_type": s.container_type,
                "sample_type": s.sample_type,
                "status": s.status,
                "collected_at": s.collected_at,
                "received_at": s.received_at,
                "decision_reason": s.decision_reason if s.status == "rejected" else None,
                "booking_ids": s.booking_ids,
            }
            for s in specimens
        ],
        "reports": [
            {
                "id": r.id,
                "reference": r.reference,
                "title": r.title,
                "version": r.version,
                "is_partial": r.is_partial,
                "status": r.status,
                "released_at": r.released_at,
            }
            for r in reports
        ],
        "timeline": [
            {
                "event": e.event,
                "status": e.to_status,
                "at": e.at,
                "details": _public_details(e) if for_patient else e.details,
            }
            for e in events
        ],
        "created_at": visit.created_at,
    }


def _public_details(event: CollectEvent) -> dict | None:
    allowed = {"reason", "note", "slot_date", "slot_label", "kind", "outcome"}
    if not event.details:
        return None
    return {k: v for k, v in event.details.items() if k in allowed} or None


def _visit_payment_status(visit: HomeVisit) -> str:
    live = [b for b in visit.bookings if b.status != "cancelled"]
    if not live:
        return "cancelled"
    statuses = {b.payment_status for b in live}
    if statuses == {"paid"}:
        return "paid"
    if "refunded" in statuses:
        return "refunded"
    if visit.payment_mode == "pay_on_visit":
        return "pay_on_visit"
    if "pending" in statuses:
        return "pending"
    if "failed" in statuses:
        return "failed"
    return "unpaid"


async def collector_card(db: AsyncSession, job: CollectionJob, *, for_patient: bool) -> dict | None:
    profile = await db.get(CollectorProfile, job.collector_id) if job.collector_id else None
    if profile is None:
        return None
    share_phone = job.status in JOB_ACTIVE_STATUSES and job.status != "unassigned"
    return {
        "name": profile.display_name,
        "employee_code": profile.employee_code,
        "photo_url": profile.photo_url,
        "qualification": profile.qualification,
        "phone": profile.contact_phone if (share_phone or not for_patient) else None,
    }


async def list_patient_visits(
    db: AsyncSession, user: User, limit: int = 20, offset: int = 0
) -> tuple[list[HomeVisit], int]:
    from sqlalchemy import func

    base = select(HomeVisit).where(HomeVisit.account_id == user.id)
    total = (await db.scalar(select(func.count()).select_from(base.subquery()))) or 0
    rows = (
        (
            await db.execute(
                base.options(selectinload(HomeVisit.bookings), selectinload(HomeVisit.jobs))
                .order_by(HomeVisit.slot_date.desc(), HomeVisit.created_at.desc())
                .limit(min(limit, 50))
                .offset(offset)
            )
        )
        .scalars()
        .all()
    )
    return list(rows), total


async def tracking(db: AsyncSession, visit: HomeVisit) -> dict:
    """Live view: only the active job's collector, only while travelling or
    at the door, only with a fresh location."""
    job = active_job(visit)
    result: dict = {
        "visit_id": visit.id,
        "job_status": job.status if job else None,
        "collector": None,
        "location": None,
        "eta_seconds": None,
        "distance_m": None,
        "is_delayed": bool(job and job.is_delayed),
        "delay_note": job.delay_note if job else None,
        "destination": None,
    }
    if visit.lat is not None and visit.lng is not None:
        result["destination"] = {"lat": visit.lat, "lng": visit.lng}
    if job is None or visit.status == "cancelled":
        return result
    result["collector"] = await collector_card(db, job, for_patient=True)
    if job.status not in ("en_route", "arrived") or job.last_lat is None:
        return result
    seen_at = aware(job.last_location_at)
    if (
        seen_at is None
        or (now_utc() - seen_at).total_seconds() > settings.LOCATION_FRESHNESS_SECONDS
    ):
        return result
    result["location"] = {"lat": job.last_lat, "lng": job.last_lng, "at": seen_at}
    if visit.lat is not None and job.status == "en_route":
        distance = haversine_m(job.last_lat, job.last_lng, visit.lat, visit.lng)
        result["distance_m"] = int(distance)
        result["eta_seconds"] = eta_seconds(distance)
    return result


# ── Patient changes ─────────────────────────────────────────────────────────


def _ensure_patient_can_change(visit: HomeVisit) -> CollectionJob | None:
    if visit.status not in ("pending_payment", "confirmed"):
        raise ConflictError(
            "This visit can no longer be changed in the app. Please contact support."
        )
    job = active_job(visit)
    if job is not None and job.status not in _PATIENT_CHANGEABLE_JOB:
        raise ConflictError(
            "Your collector is already on the way. Please contact support to change this visit."
        )
    return job


async def cancel_visit(
    db: AsyncSession, visit: HomeVisit, actor: User, reason: str | None, *, by_staff: bool = False
) -> HomeVisit:
    job = active_job(visit) if by_staff else _ensure_patient_can_change(visit)
    if visit.status == "cancelled":
        return visit
    previous = visit.status
    visit.status = "cancelled"
    visit.cancel_reason = (reason or "").strip()[:500] or None
    for booking in visit.bookings:
        booking.status = "cancelled"
    if job is not None and job.status not in (
        "collected",
        "partially_collected",
        "unsuccessful",
        "cancelled",
    ):
        old_status, collector_id = job.status, job.collector_id
        job.status = "cancelled"
        await record_event(
            db,
            entity_type="job",
            entity_id=job.id,
            visit_id=visit.id,
            event="job_cancelled",
            from_status=old_status,
            to_status="cancelled",
            actor=actor,
        )
        if collector_id:
            await notify_user(
                db,
                collector_id,
                kind="job_cancelled",
                title="Visit cancelled",
                body=f"{visit.reference} on {visit.slot_date:%d %b} was cancelled.",
                data={"job_id": job.id},
            )
    paid = any(b.payment_status == "paid" for b in visit.bookings)
    await record_event(
        db,
        entity_type="visit",
        entity_id=visit.id,
        visit_id=visit.id,
        event="cancelled",
        from_status=previous,
        to_status="cancelled",
        actor=actor,
        details={"reason": visit.cancel_reason, "refund_due": paid, "by_staff": by_staff},
        patient_visible=True,
    )
    await notify_user(
        db,
        visit.account_id,
        kind="visit_cancelled",
        title="Visit cancelled",
        body=f"{visit.reference} has been cancelled."
        + (" Any refund will be processed by QXL." if paid else ""),
        data={"visit_id": visit.id},
    )
    await db.commit()
    return await load_visit(db, visit.id)


async def reschedule_visit(
    db: AsyncSession,
    visit: HomeVisit,
    actor: User,
    day: date,
    label: str,
    *,
    by_staff: bool = False,
) -> HomeVisit:
    job = active_job(visit) if by_staff else _ensure_patient_can_change(visit)
    canonical = await _validate_slot(db, visit.zone, day, label)
    old = {"slot_date": visit.slot_date.isoformat(), "slot_label": visit.slot_label}
    visit.slot_date, visit.slot_label = day, canonical
    visit.reschedule_count += 1
    for booking in visit.bookings:
        booking.preferred_date, booking.preferred_time = day.isoformat(), canonical
        booking.was_rescheduled = True
    if job is not None and job.collector_id is not None and job.status in _PATIENT_CHANGEABLE_JOB:
        # The previous collector may not be on shift for the new slot.
        collector_id = job.collector_id
        job.collector_id, job.status = None, "unassigned"
        job.assigned_at = job.acknowledged_at = None
        await record_event(
            db,
            entity_type="job",
            entity_id=job.id,
            visit_id=visit.id,
            event="unassigned_for_reschedule",
            to_status="unassigned",
            actor=actor,
        )
        await notify_user(
            db,
            collector_id,
            kind="job_unassigned",
            title="Visit rescheduled",
            body=(
                f"{visit.reference} moved to {day:%d %b}, {canonical}. "
                "It's no longer on your list."
            ),
            data={"job_id": job.id},
        )
    await record_event(
        db,
        entity_type="visit",
        entity_id=visit.id,
        visit_id=visit.id,
        event="rescheduled",
        actor=actor,
        details={"from": old, "slot_date": day.isoformat(), "slot_label": canonical},
        patient_visible=True,
    )
    await notify_user(
        db,
        visit.account_id,
        kind="visit_rescheduled",
        title="Visit rescheduled",
        body=f"{visit.reference} is now on {day:%d %b}, {canonical}.",
        data={"visit_id": visit.id},
    )
    await db.commit()
    return await load_visit(db, visit.id)


async def profile_for(db: AsyncSession, profile_id: uuid.UUID | None) -> PatientProfile | None:
    return await db.get(PatientProfile, profile_id) if profile_id else None

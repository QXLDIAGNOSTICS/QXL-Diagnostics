"""Dispatch: queue, manual/automatic allocation, collectors, alerts, live map."""

from __future__ import annotations

import uuid
from datetime import date, datetime, timedelta

from sqlalchemy import func, select
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import selectinload

from app.core.config import settings
from app.core.exceptions import NotFoundError, ValidationError
from app.core.roles import FIELD_ROLES, ROLE_COLLECTOR
from app.models.collect import (
    JOB_ACTIVE_STATUSES,
    CollectionJob,
    CollectorProfile,
    HomeVisit,
    ServiceArea,
    Specimen,
)
from app.models.user import User
from app.services.collect import patients
from app.services.collect.common import (
    IST,
    aware,
    haversine_m,
    now_ist,
    now_utc,
    record_event,
    today_ist,
)
from app.services.collect.notify import notify_user
from app.services.collect.visits import active_job, address_line, load_visit

# ── Queue ───────────────────────────────────────────────────────────────────


async def list_visits(
    db: AsyncSession,
    *,
    day: date | None = None,
    status: str | None = None,
    zone: str | None = None,
    job_status: str | None = None,
    q: str | None = None,
    limit: int = 100,
    offset: int = 0,
) -> tuple[list[HomeVisit], int]:
    query = select(HomeVisit)
    if day is not None:
        query = query.where(HomeVisit.slot_date == day)
    if status:
        query = query.where(HomeVisit.status == status)
    if zone:
        query = query.where(HomeVisit.zone == zone)
    if q:
        like = f"%{q.strip()}%"
        query = query.where(
            HomeVisit.reference.ilike(like)
            | HomeVisit.patient_name.ilike(like)
            | HomeVisit.patient_phone.ilike(like)
            | HomeVisit.pincode.ilike(like)
        )
    if job_status:
        query = query.where(
            HomeVisit.id.in_(
                select(CollectionJob.visit_id).where(CollectionJob.status == job_status)
            )
        )
    total = (await db.scalar(select(func.count()).select_from(query.subquery()))) or 0
    rows = (
        (
            await db.execute(
                query.options(selectinload(HomeVisit.bookings), selectinload(HomeVisit.jobs))
                .order_by(HomeVisit.slot_date, HomeVisit.slot_label, HomeVisit.created_at)
                .limit(min(limit, 200))
                .offset(offset)
            )
        )
        .scalars()
        .all()
    )
    return list(rows), total


async def collector_names(
    db: AsyncSession, ids: set[uuid.UUID]
) -> dict[uuid.UUID, CollectorProfile]:
    if not ids:
        return {}
    rows = (
        (await db.execute(select(CollectorProfile).where(CollectorProfile.user_id.in_(ids))))
        .scalars()
        .all()
    )
    return {r.user_id: r for r in rows}


def queue_row(visit: HomeVisit, collectors: dict[uuid.UUID, CollectorProfile]) -> dict:
    job = active_job(visit)
    collector = collectors.get(job.collector_id) if job and job.collector_id else None
    return {
        "id": visit.id,
        "reference": visit.reference,
        "status": visit.status,
        "payment_mode": visit.payment_mode,
        "patient_name": visit.patient_name,
        "patient_phone": visit.patient_phone,
        "pincode": visit.pincode,
        "locality": visit.locality,
        "zone": visit.zone,
        "address": address_line(visit),
        "lat": visit.lat,
        "lng": visit.lng,
        "slot_date": visit.slot_date,
        "slot_label": visit.slot_label,
        "tests": [b.test_name for b in visit.bookings if b.status != "cancelled"],
        "total_paise": visit.total_paise,
        "job": None
        if job is None
        else {
            "id": job.id,
            "reference": job.reference,
            "kind": job.kind,
            "status": job.status,
            "is_delayed": job.is_delayed,
            "collector_id": job.collector_id,
            "collector_name": collector.display_name if collector else None,
            "assigned_at": job.assigned_at,
            "acknowledged_at": job.acknowledged_at,
            "last_location_at": job.last_location_at,
        },
    }


# ── Collectors ──────────────────────────────────────────────────────────────


async def list_collectors(db: AsyncSession, *, include_inactive: bool = False) -> list[dict]:
    from app.services.collect.team import account_state

    query = select(CollectorProfile).options(selectinload(CollectorProfile.user))
    if not include_inactive:
        query = query.where(CollectorProfile.is_active.is_(True))
    rows = (await db.execute(query.order_by(CollectorProfile.display_name))).scalars().all()
    today = today_ist()
    loads = dict(
        (
            await db.execute(
                select(CollectionJob.collector_id, func.count())
                .join(HomeVisit, HomeVisit.id == CollectionJob.visit_id)
                .where(HomeVisit.slot_date == today, CollectionJob.status != "cancelled")
                .group_by(CollectionJob.collector_id)
            )
        ).all()
    )
    result = []
    for c in rows:
        last = (
            await db.execute(
                select(
                    CollectionJob.last_lat, CollectionJob.last_lng, CollectionJob.last_location_at
                )
                .where(
                    CollectionJob.collector_id == c.user_id,
                    CollectionJob.last_location_at.isnot(None),
                )
                .order_by(CollectionJob.last_location_at.desc())
                .limit(1)
            )
        ).first()
        result.append(
            {
                "user_id": c.user_id,
                "role": c.user.role if c.user else None,
                "employee_code": c.employee_code,
                "display_name": c.display_name,
                "phone": c.contact_phone,
                "zone": c.zone,
                "shift_start": c.shift_start,
                "shift_end": c.shift_end,
                "working_days": c.working_days,
                "competencies": c.competencies,
                "qualification": c.qualification,
                "max_daily_jobs": c.max_daily_jobs,
                "is_active": c.is_active,
                "on_duty": c.on_duty,
                "jobs_today": loads.get(c.user_id, 0),
                "last_location": None
                if last is None
                else {"lat": last[0], "lng": last[1], "at": last[2]},
                "photo_url": c.photo_url,
                **account_state(c.user),
            }
        )
    return result


async def upsert_collector(db: AsyncSession, user_id: uuid.UUID, data: dict) -> CollectorProfile:
    user = await db.get(User, user_id)
    if user is None:
        raise NotFoundError("User not found")
    if user.role not in FIELD_ROLES:
        raise ValidationError("Give the user the Collector or Courier role first (Users screen).")
    for field in ("shift_start", "shift_end"):
        if field in data and data[field] is not None:
            try:
                patients._parse_hhmm(data[field])
            except (ValueError, AttributeError) as exc:
                raise ValidationError(f"{field} must be HH:MM") from exc
    profile = await db.get(CollectorProfile, user_id)
    if profile is None:
        code = (data.get("employee_code") or "").strip()
        if not code:
            raise ValidationError("Employee code is required.")
        clash = (
            await db.execute(select(CollectorProfile).where(CollectorProfile.employee_code == code))
        ).scalar_one_or_none()
        if clash is not None:
            raise ValidationError("That employee code is already in use.")
        profile = CollectorProfile(
            user_id=user_id,
            employee_code=code,
            display_name=(data.get("display_name") or user.name or code).strip(),
        )
        db.add(profile)
    for field in (
        "display_name",
        "photo_url",
        "contact_phone",
        "zone",
        "shift_start",
        "shift_end",
        "working_days",
        "competencies",
        "qualification",
        "max_daily_jobs",
        "home_lat",
        "home_lng",
        "is_active",
    ):
        if field in data and data[field] is not None:
            setattr(profile, field, data[field])
    await db.commit()
    await db.refresh(profile)
    return profile


# ── Allocation ──────────────────────────────────────────────────────────────


def required_competencies(visit: HomeVisit) -> set[str]:
    """Skills a visit needs, derived from the patient's age."""
    if visit.patient_dob is None:
        return set()
    age = (visit.slot_date - visit.patient_dob).days // 365
    if age < 12:
        return {"pediatric"}
    if age >= 75:
        return {"geriatric"}
    return set()


async def _get_job_for_dispatch(db: AsyncSession, visit: HomeVisit) -> CollectionJob:
    if visit.status not in ("confirmed",):
        raise ValidationError(
            "Only confirmed visits can be dispatched (check payment or cancellation)."
        )
    job = active_job(visit)
    if job is None or job.status not in JOB_ACTIVE_STATUSES:
        raise ValidationError("This visit has no open collection job.")
    return job


async def assign(
    db: AsyncSession,
    visit_id: uuid.UUID,
    collector_id: uuid.UUID,
    actor: User,
    *,
    mode: str = "manual",
    reason: str | None = None,
) -> HomeVisit:
    visit = await load_visit(db, visit_id)
    job = await _get_job_for_dispatch(db, visit)
    collector = await db.get(CollectorProfile, collector_id)
    user = await db.get(User, collector_id)
    if collector is None or not collector.is_active or user is None or user.role != ROLE_COLLECTOR:
        raise ValidationError("Choose an active collector.")
    missing = required_competencies(visit) - set(collector.competencies or [])
    if missing and mode == "auto":
        raise ValidationError(f"Collector lacks required competency: {', '.join(sorted(missing))}")
    previous = job.collector_id
    if previous == collector_id and job.status != "unassigned":
        return visit
    old_status = job.status
    job.collector_id = collector_id
    job.status = "assigned"
    job.assigned_by_id = actor.id if actor else None
    job.assignment_mode = mode
    job.assigned_at = now_utc()
    job.acknowledged_at = None
    if old_status in ("en_route", "arrived"):
        job.en_route_at = job.arrived_at = None
    await record_event(
        db,
        entity_type="job",
        entity_id=job.id,
        visit_id=visit.id,
        event="reassigned" if previous else "assigned",
        from_status=old_status,
        to_status="assigned",
        actor=actor,
        details={
            "collector": collector.employee_code,
            "mode": mode,
            "reason": reason,
            "competency_override": sorted(missing) or None,
        },
        patient_visible=True,
    )
    await notify_user(
        db,
        collector_id,
        kind="job_assigned",
        title="New home collection",
        body=f"{visit.slot_date:%d %b}, {visit.slot_label} · {visit.locality} ({visit.pincode})",
        data={"job_id": job.id},
    )
    if previous and previous != collector_id:
        await notify_user(
            db,
            previous,
            kind="job_unassigned",
            title="Visit reassigned",
            body=f"{visit.reference} was reassigned to another collector.",
            data={"job_id": job.id},
        )
    await notify_user(
        db,
        visit.account_id,
        kind="collector_assigned",
        title="Collector assigned",
        body=(
            f"{collector.display_name} will collect your sample on "
            f"{visit.slot_date:%d %b}, {visit.slot_label}."
        ),
        data={"visit_id": visit.id},
    )
    await db.commit()
    return await load_visit(db, visit.id)


async def suggest_collectors(db: AsyncSession, visit: HomeVisit) -> list[dict]:
    """Ranks eligible collectors: zone + shift + working day + competency,
    then fewest jobs that day, then nearest last-known/home location."""
    match = next((s for s in patients.configured_slots() if s[0] == visit.slot_label), None)
    start, end = (match[1], match[2]) if match else (None, None)
    pool = (
        await patients.collectors_on_shift(db, visit.zone, visit.slot_date, start, end)
        if start is not None
        else []
    )
    needed = required_competencies(visit)
    ranked = []
    for c in pool:
        if not needed.issubset(set(c.competencies or [])):
            continue
        load = (
            await db.scalar(
                select(func.count())
                .select_from(CollectionJob)
                .join(HomeVisit, HomeVisit.id == CollectionJob.visit_id)
                .where(
                    CollectionJob.collector_id == c.user_id,
                    HomeVisit.slot_date == visit.slot_date,
                    CollectionJob.status != "cancelled",
                )
            )
        ) or 0
        if load >= c.max_daily_jobs:
            continue
        same_slot = (
            await db.scalar(
                select(func.count())
                .select_from(CollectionJob)
                .join(HomeVisit, HomeVisit.id == CollectionJob.visit_id)
                .where(
                    CollectionJob.collector_id == c.user_id,
                    HomeVisit.slot_date == visit.slot_date,
                    HomeVisit.slot_label == visit.slot_label,
                    CollectionJob.status != "cancelled",
                )
            )
        ) or 0
        if same_slot >= settings.VISITS_PER_COLLECTOR_PER_SLOT:
            continue
        origin = (c.home_lat, c.home_lng)
        last = (
            await db.execute(
                select(CollectionJob.last_lat, CollectionJob.last_lng)
                .where(
                    CollectionJob.collector_id == c.user_id,
                    CollectionJob.last_location_at.isnot(None),
                )
                .order_by(CollectionJob.last_location_at.desc())
                .limit(1)
            )
        ).first()
        if last is not None:
            origin = (last[0], last[1])
        distance = None
        if visit.lat is not None and origin[0] is not None:
            distance = haversine_m(origin[0], origin[1], visit.lat, visit.lng)
        ranked.append(
            {
                "user_id": c.user_id,
                "display_name": c.display_name,
                "employee_code": c.employee_code,
                "jobs_that_day": load,
                "jobs_in_slot": same_slot,
                "distance_m": int(distance) if distance is not None else None,
                "on_duty": c.on_duty,
            }
        )
    ranked.sort(
        key=lambda r: (
            r["jobs_in_slot"],
            r["jobs_that_day"],
            r["distance_m"] if r["distance_m"] is not None else 10**9,
        )
    )
    return ranked


async def auto_assign(db: AsyncSession, visit_id: uuid.UUID, actor: User) -> HomeVisit:
    visit = await load_visit(db, visit_id)
    await _get_job_for_dispatch(db, visit)
    ranked = await suggest_collectors(db, visit)
    if not ranked:
        raise ValidationError(
            "No eligible collector is free for this zone and slot. Assign manually."
        )
    return await assign(db, visit_id, ranked[0]["user_id"], actor, mode="auto")


async def unassign(
    db: AsyncSession, visit_id: uuid.UUID, actor: User, reason: str | None
) -> HomeVisit:
    visit = await load_visit(db, visit_id)
    job = await _get_job_for_dispatch(db, visit)
    if job.collector_id is None:
        return visit
    collector_id, old_status = job.collector_id, job.status
    job.collector_id, job.status = None, "unassigned"
    job.assigned_at = job.acknowledged_at = job.en_route_at = job.arrived_at = None
    await record_event(
        db,
        entity_type="job",
        entity_id=job.id,
        visit_id=visit.id,
        event="unassigned",
        from_status=old_status,
        to_status="unassigned",
        actor=actor,
        details={"reason": reason},
    )
    await notify_user(
        db,
        collector_id,
        kind="job_unassigned",
        title="Visit removed",
        body=f"{visit.reference} is no longer assigned to you.",
        data={"job_id": job.id},
    )
    await db.commit()
    return await load_visit(db, visit.id)


async def open_recollection(
    db: AsyncSession,
    visit_id: uuid.UUID,
    actor: User,
    reason: str | None,
    specimen_ids: list[str] | None = None,
) -> HomeVisit:
    from app.services.collect.visits import _open_job

    visit = await load_visit(db, visit_id)
    job = active_job(visit)
    if job is not None and job.status in JOB_ACTIVE_STATUSES:
        raise ValidationError("This visit already has an open collection job.")
    if visit.status == "cancelled":
        raise ValidationError("The visit is cancelled.")
    visit.status = "confirmed"
    await _open_job(
        db, visit, actor=actor, kind="recollection", recollect_specimen_ids=specimen_ids
    )
    await record_event(
        db,
        entity_type="visit",
        entity_id=visit.id,
        visit_id=visit.id,
        event="recollection_required",
        actor=actor,
        details={"reason": reason},
        patient_visible=True,
    )
    await notify_user(
        db,
        visit.account_id,
        kind="recollection_required",
        title="A new sample is needed",
        body=(
            f"For {visit.reference}: {reason or 'the lab needs a fresh sample'}. "
            "Our team will contact you to schedule it."
        ),
        data={"visit_id": visit.id},
    )
    await db.commit()
    return await load_visit(db, visit.id)


# ── Alerts & live ───────────────────────────────────────────────────────────


async def alerts(db: AsyncSession) -> list[dict]:
    now = now_utc()
    today = today_ist()
    out: list[dict] = []
    jobs = (
        (
            await db.execute(
                select(CollectionJob)
                .join(HomeVisit, HomeVisit.id == CollectionJob.visit_id)
                .where(
                    HomeVisit.slot_date.in_((today, today + timedelta(days=1))),
                    HomeVisit.status == "confirmed",
                )
                .options(selectinload(CollectionJob.visit))
            )
        )
        .scalars()
        .all()
    )
    slot_starts = {label: start for label, start, _ in patients.configured_slots()}
    for job in jobs:
        v = job.visit
        base = {
            "visit_id": v.id,
            "reference": v.reference,
            "job_id": job.id,
            "slot_date": v.slot_date,
            "slot_label": v.slot_label,
            "patient_name": v.patient_name,
            "collector_id": job.collector_id,
        }
        start = slot_starts.get(v.slot_label)
        slot_start = datetime.combine(v.slot_date, start, tzinfo=IST) if start else None
        if job.status == "unassigned" and v.slot_date == today:
            out.append({**base, "type": "unassigned_today", "severity": "high"})
        elif job.status == "unassigned":
            out.append({**base, "type": "unassigned_tomorrow", "severity": "medium"})
        if job.status == "assigned" and job.assigned_at is not None:
            waited = (now - aware(job.assigned_at)).total_seconds() / 60
            if waited >= settings.UNACKNOWLEDGED_ALERT_MINUTES:
                out.append(
                    {**base, "type": "unacknowledged", "severity": "medium", "minutes": int(waited)}
                )
        if (
            slot_start is not None
            and job.status in ("assigned", "acknowledged")
            and now_ist() > slot_start + timedelta(minutes=30)
        ):
            out.append({**base, "type": "not_started", "severity": "high"})
        if job.is_delayed and job.status in JOB_ACTIVE_STATUSES:
            out.append(
                {**base, "type": "collector_delayed", "severity": "medium", "note": job.delay_note}
            )
        if job.status == "unsuccessful":
            out.append(
                {**base, "type": "unsuccessful", "severity": "high", "note": job.outcome_reason}
            )
        if job.status == "partially_collected":
            out.append(
                {
                    **base,
                    "type": "partial_collection",
                    "severity": "medium",
                    "note": job.outcome_reason,
                }
            )
    issues = (
        (
            await db.execute(
                select(Specimen)
                .where(Specimen.status.in_(("missing", "damaged")))
                .order_by(Specimen.updated_at.desc())
                .limit(50)
            )
        )
        .scalars()
        .all()
    )
    for s in issues:
        out.append(
            {
                "type": f"specimen_{s.status}",
                "severity": "high",
                "visit_id": s.visit_id,
                "barcode": s.barcode,
                "note": s.decision_notes,
            }
        )
    order = {"high": 0, "medium": 1, "low": 2}
    out.sort(key=lambda a: order.get(a["severity"], 3))
    return out


async def live(db: AsyncSession) -> dict:
    jobs = (
        (
            await db.execute(
                select(CollectionJob)
                .where(
                    CollectionJob.status.in_(("assigned", "acknowledged", "en_route", "arrived"))
                )
                .options(selectinload(CollectionJob.visit))
            )
        )
        .scalars()
        .all()
    )
    names = await collector_names(db, {j.collector_id for j in jobs if j.collector_id})
    fresh_after = now_utc() - timedelta(seconds=settings.LOCATION_FRESHNESS_SECONDS)
    return {
        "jobs": [
            {
                "job_id": j.id,
                "reference": j.reference,
                "visit_id": j.visit_id,
                "visit_reference": j.visit.reference,
                "status": j.status,
                "collector_id": j.collector_id,
                "collector_name": names[j.collector_id].display_name
                if j.collector_id in names
                else None,
                "destination": {
                    "lat": j.visit.lat,
                    "lng": j.visit.lng,
                    "address": address_line(j.visit),
                },
                "slot_label": j.visit.slot_label,
                "slot_date": j.visit.slot_date,
                "location": {"lat": j.last_lat, "lng": j.last_lng, "at": j.last_location_at}
                if j.last_lat is not None
                and aware(j.last_location_at)
                and aware(j.last_location_at) >= fresh_after
                else None,
                "is_delayed": j.is_delayed,
            }
            for j in jobs
        ],
        "collectors": await list_collectors(db),
    }


# ── Service areas ───────────────────────────────────────────────────────────


async def list_service_areas(db: AsyncSession) -> list[ServiceArea]:
    return list(
        (
            await db.execute(select(ServiceArea).order_by(ServiceArea.zone, ServiceArea.pincode))
        ).scalars()
    )


async def upsert_service_area(db: AsyncSession, data: dict) -> ServiceArea:
    pincode = (data.get("pincode") or "").strip()
    if len(pincode) != 6 or not pincode.isdigit():
        raise ValidationError("PIN code must be 6 digits.")
    area = (
        await db.execute(select(ServiceArea).where(ServiceArea.pincode == pincode))
    ).scalar_one_or_none()
    if area is None:
        area = ServiceArea(pincode=pincode)
        db.add(area)
    for field in ("locality", "zone", "is_active", "collection_fee_paise", "lab_center_id"):
        if field in data:
            setattr(area, field, data[field])
    if not area.zone:
        area.zone = "default"
    await db.commit()
    await db.refresh(area)
    return area


async def delete_service_area(db: AsyncSession, pincode: str) -> None:
    area = (
        await db.execute(select(ServiceArea).where(ServiceArea.pincode == pincode))
    ).scalar_one_or_none()
    if area is None:
        raise NotFoundError("PIN code not found")
    area.is_active = False
    await db.commit()

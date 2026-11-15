"""Operations dashboard aggregates for a date range (visit slot dates, IST)."""

from __future__ import annotations

from collections import Counter, defaultdict
from datetime import date
from statistics import median

from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import selectinload

from app.models.collect import (
    CollectorProfile,
    HomeVisit,
    LabReport,
    Specimen,
    VisitPayment,
)
from app.models.payment import Payment
from app.services.collect.common import IST, aware


def _minutes(a, b) -> float | None:  # noqa: ANN001
    a, b = aware(a), aware(b)
    if a is None or b is None or b < a:
        return None
    return (b - a).total_seconds() / 60


def _summary(values: list[float]) -> dict:
    if not values:
        return {"count": 0, "median_minutes": None, "max_minutes": None}
    return {
        "count": len(values),
        "median_minutes": round(median(values), 1),
        "max_minutes": round(max(values), 1),
    }


async def dashboard(db: AsyncSession, start: date, end: date) -> dict:
    visits = (
        (
            await db.execute(
                select(HomeVisit)
                .where(HomeVisit.slot_date >= start, HomeVisit.slot_date <= end)
                .options(selectinload(HomeVisit.bookings), selectinload(HomeVisit.jobs))
            )
        )
        .scalars()
        .all()
    )
    visit_ids = [v.id for v in visits]
    booking_ids = {b.id for v in visits for b in v.bookings}

    status_counts = Counter(v.status for v in visits)
    by_source = Counter(v.source for v in visits)
    by_zone = Counter(v.zone for v in visits)

    online_paid = 0
    refunded = 0
    if booking_ids:
        payments = (
            (await db.execute(select(Payment).where(Payment.booking_id.in_(booking_ids))))
            .scalars()
            .all()
        )
        online_paid = sum(p.amount for p in payments if p.status == "paid")
        refunded = sum(p.amount for p in payments if p.status == "refunded")
    offline = (
        (await db.execute(select(VisitPayment).where(VisitPayment.visit_id.in_(visit_ids))))
        .scalars()
        .all()
        if visit_ids
        else []
    )
    offline_paid = sum(p.amount_paise for p in offline)
    unreconciled_offline = sum(p.amount_paise for p in offline if p.reconciled_at is None)
    outstanding = sum(
        v.total_paise
        for v in visits
        if v.payment_mode == "pay_on_visit"
        and v.status != "cancelled"
        and any(b.payment_status != "paid" for b in v.bookings if b.status != "cancelled")
    )

    jobs = [j for v in visits for j in v.jobs if j.status != "cancelled"]
    job_outcomes = Counter(j.status for j in jobs)
    per_collector: dict = defaultdict(
        lambda: {"collected": 0, "partial": 0, "unsuccessful": 0, "assigned": 0}
    )
    for j in jobs:
        if j.collector_id is None:
            continue
        row = per_collector[j.collector_id]
        row["assigned"] += 1
        if j.status == "collected":
            row["collected"] += 1
        elif j.status == "partially_collected":
            row["partial"] += 1
        elif j.status == "unsuccessful":
            row["unsuccessful"] += 1
    names = {}
    if per_collector:
        names = {
            p.user_id: p.display_name
            for p in (
                await db.execute(
                    select(CollectorProfile).where(
                        CollectorProfile.user_id.in_(list(per_collector))
                    )
                )
            ).scalars()
        }

    assign_to_ack = [
        m for j in jobs if (m := _minutes(j.assigned_at, j.acknowledged_at)) is not None
    ]
    travel = [m for j in jobs if (m := _minutes(j.en_route_at, j.arrived_at)) is not None]
    at_door = [m for j in jobs if (m := _minutes(j.arrived_at, j.completed_at)) is not None]

    specimens = (
        (await db.execute(select(Specimen).where(Specimen.visit_id.in_(visit_ids)))).scalars().all()
        if visit_ids
        else []
    )
    collection_to_receipt = [
        m for s in specimens if (m := _minutes(s.collected_at, s.received_at)) is not None
    ]
    spec_status = Counter(s.status for s in specimens)
    rejection_reasons = Counter(s.decision_reason for s in specimens if s.status == "rejected")
    recollections = sum(1 for j in jobs if j.kind == "recollection")

    reports = (
        (
            await db.execute(
                select(LabReport).where(
                    LabReport.visit_id.in_(visit_ids),
                    LabReport.status.in_(("released", "superseded")),
                )
            )
        )
        .scalars()
        .all()
        if visit_ids
        else []
    )
    first_receipt: dict = {}
    for s in specimens:
        if s.received_at is not None:
            prev = first_receipt.get(s.visit_id)
            first_receipt[s.visit_id] = min(prev, s.received_at) if prev else s.received_at
    lab_tat = [
        m
        for r in reports
        if r.version == 1
        and (m := _minutes(first_receipt.get(r.visit_id), r.released_at)) is not None
    ]

    received_or_decided = [
        s for s in specimens if s.status in ("received", "accepted", "rejected", "on_hold")
    ]
    rejection_rate = (
        round(100 * spec_status.get("rejected", 0) / len(received_or_decided), 1)
        if received_or_decided
        else None
    )
    return {
        "range": {"from": start, "to": end, "timezone": str(IST)},
        "bookings": {
            "visits": len(visits),
            "by_status": dict(status_counts),
            "by_source": dict(by_source),
            "by_zone": dict(by_zone),
            "tests": len(booking_ids),
            "conversion_paid_or_confirmed_pct": round(
                100
                * (status_counts.get("confirmed", 0) + status_counts.get("completed", 0))
                / len(visits),
                1,
            )
            if visits
            else None,
        },
        "revenue": {
            "online_verified_paise": online_paid,
            "collected_at_visit_paise": offline_paid,
            "unreconciled_at_visit_paise": unreconciled_offline,
            "pay_on_visit_outstanding_paise": outstanding,
            "refunded_paise": refunded,
        },
        "field": {
            "job_outcomes": dict(job_outcomes),
            "assign_to_acknowledge": _summary(assign_to_ack),
            "travel_time": _summary(travel),
            "time_at_patient": _summary(at_door),
            "recollections": recollections,
            "collectors": [
                {"collector_id": cid, "name": names.get(cid, "—"), **row}
                for cid, row in sorted(per_collector.items(), key=lambda kv: -kv[1]["collected"])
            ],
        },
        "transport": {
            "collection_to_lab_receipt": _summary(collection_to_receipt),
            "missing": spec_status.get("missing", 0),
            "damaged": spec_status.get("damaged", 0),
        },
        "lab": {
            "specimens_by_status": dict(spec_status),
            "rejection_rate_pct": rejection_rate,
            "rejection_reasons": dict(rejection_reasons),
            "receipt_to_report_release": _summary(lab_tat),
            "reports_released": sum(1 for r in reports if r.status == "released"),
            "amended_reports": sum(1 for r in reports if r.version > 1),
        },
    }

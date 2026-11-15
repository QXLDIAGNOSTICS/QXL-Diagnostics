"""QXL Collect — operations portal endpoints (qxl-admin): dispatch, collectors,
service areas, live map, alerts, lab receiving, reports, LIS queue, metrics."""

from __future__ import annotations

import json
import uuid
from datetime import date, datetime, timedelta

from fastapi import APIRouter, Depends, File, Form, Query, UploadFile
from sqlalchemy import select

from app.api.deps import DbSession, require_permission
from app.core.exceptions import NotFoundError, ValidationError
from app.models.collect import LabReport, TransportManifest, VisitPayment
from app.models.user import User
from app.schemas.collect import (
    AssignIn,
    CollectorIn,
    DecisionIn,
    LabReceiveIn,
    LabStatusIn,
    OpsRescheduleIn,
    ReasonIn,
    ReconcileIn,
    RevokeIn,
    ServiceAreaIn,
    ServiceAreaOut,
)
from app.services.collect import custody, dispatch, lab, lis, metrics, visits
from app.services.collect.common import now_utc, today_ist

router = APIRouter(tags=["collect-ops"])

Dispatcher = Depends(require_permission("dispatch.manage"))
LabReceiver = Depends(require_permission("lab.receive"))
LabReporter = Depends(require_permission("lab.report"))
MetricsViewer = Depends(require_permission("collect.metrics"))


# ── Dispatch ────────────────────────────────────────────────────────────────


@router.get("/ops/visits")
async def ops_visits(
    db: DbSession,
    day: date | None = Query(default=None, alias="date"),
    status: str | None = None,
    zone: str | None = None,
    job_status: str | None = None,
    q: str | None = None,
    limit: int = 100,
    offset: int = 0,
    user: User = Dispatcher,
) -> dict:
    rows, total = await dispatch.list_visits(
        db,
        day=day,
        status=status,
        zone=zone,
        job_status=job_status,
        q=q,
        limit=limit,
        offset=offset,
    )
    names = await dispatch.collector_names(
        db, {j.collector_id for v in rows for j in v.jobs if j.collector_id}
    )
    return {"items": [dispatch.queue_row(v, names) for v in rows], "count": total}


@router.get("/ops/visits/{visit_id}")
async def ops_visit(visit_id: uuid.UUID, db: DbSession, user: User = Dispatcher) -> dict:
    visit = await visits.load_visit(db, visit_id)
    detail = await visits.visit_detail(db, visit, for_patient=False)
    detail["suggestions"] = (
        await dispatch.suggest_collectors(db, visit) if visit.status == "confirmed" else []
    )
    payments = (
        (await db.execute(select(VisitPayment).where(VisitPayment.visit_id == visit.id)))
        .scalars()
        .all()
    )
    detail["visit_payments"] = [
        {
            "id": p.id,
            "amount_paise": p.amount_paise,
            "mode": p.mode,
            "reference": p.reference,
            "at": p.created_at,
            "reconciled_at": p.reconciled_at,
        }
        for p in payments
    ]
    return detail


@router.post("/ops/visits/{visit_id}/assign")
async def ops_assign(
    visit_id: uuid.UUID, body: AssignIn, db: DbSession, user: User = Dispatcher
) -> dict:
    visit = await dispatch.assign(db, visit_id, body.collector_id, user, reason=body.reason)
    return await visits.visit_detail(db, visit, for_patient=False)


@router.post("/ops/visits/{visit_id}/auto-assign")
async def ops_auto_assign(visit_id: uuid.UUID, db: DbSession, user: User = Dispatcher) -> dict:
    visit = await dispatch.auto_assign(db, visit_id, user)
    return await visits.visit_detail(db, visit, for_patient=False)


@router.post("/ops/visits/auto-assign-day")
async def ops_auto_assign_day(
    db: DbSession, day: date = Query(alias="date"), user: User = Dispatcher
) -> dict:
    rows, _ = await dispatch.list_visits(
        db, day=day, status="confirmed", job_status="unassigned", limit=200
    )
    assigned, failed = [], []
    for v in rows:
        try:
            await dispatch.auto_assign(db, v.id, user)
            assigned.append(v.reference)
        except ValidationError as exc:
            failed.append({"reference": v.reference, "reason": exc.message})
    return {"assigned": assigned, "failed": failed}


@router.post("/ops/visits/{visit_id}/unassign")
async def ops_unassign(
    visit_id: uuid.UUID, body: ReasonIn, db: DbSession, user: User = Dispatcher
) -> dict:
    visit = await dispatch.unassign(db, visit_id, user, body.reason)
    return await visits.visit_detail(db, visit, for_patient=False)


@router.post("/ops/visits/{visit_id}/reschedule")
async def ops_reschedule(
    visit_id: uuid.UUID, body: OpsRescheduleIn, db: DbSession, user: User = Dispatcher
) -> dict:
    visit = await visits.load_visit(db, visit_id)
    visit = await visits.reschedule_visit(
        db, visit, user, body.slot_date, body.slot_label, by_staff=True
    )
    return await visits.visit_detail(db, visit, for_patient=False)


@router.post("/ops/visits/{visit_id}/cancel")
async def ops_cancel(
    visit_id: uuid.UUID, body: ReasonIn, db: DbSession, user: User = Dispatcher
) -> dict:
    visit = await visits.load_visit(db, visit_id)
    visit = await visits.cancel_visit(db, visit, user, body.reason, by_staff=True)
    return await visits.visit_detail(db, visit, for_patient=False)


@router.post("/ops/visits/{visit_id}/recollect")
async def ops_recollect(
    visit_id: uuid.UUID, body: ReasonIn, db: DbSession, user: User = Dispatcher
) -> dict:
    visit = await dispatch.open_recollection(db, visit_id, user, body.reason)
    return await visits.visit_detail(db, visit, for_patient=False)


@router.post("/ops/visit-payments/reconcile")
async def ops_reconcile(body: ReconcileIn, db: DbSession, user: User = Dispatcher) -> dict:
    rows = (
        (await db.execute(select(VisitPayment).where(VisitPayment.id.in_(body.payment_ids))))
        .scalars()
        .all()
    )
    for p in rows:
        if p.reconciled_at is None:
            p.reconciled_at, p.reconciled_by_id = now_utc(), user.id
    await db.commit()
    return {"reconciled": len(rows)}


@router.get("/ops/collectors")
async def ops_collectors(
    db: DbSession, include_inactive: bool = False, user: User = Dispatcher
) -> list[dict]:
    return await dispatch.list_collectors(db, include_inactive=include_inactive)


@router.get("/ops/field-users")
async def ops_field_users(db: DbSession, user: User = Dispatcher) -> list[dict]:
    """Users with a field role, so dispatch can create their collector profile."""
    from app.core.roles import FIELD_ROLES
    from app.models.collect import CollectorProfile

    rows = (
        (await db.execute(select(User).where(User.role.in_(FIELD_ROLES)).order_by(User.name)))
        .scalars()
        .all()
    )
    have = {p for p in (await db.execute(select(CollectorProfile.user_id))).scalars()}
    return [
        {"id": u.id, "name": u.name, "phone": u.phone, "role": u.role, "has_profile": u.id in have}
        for u in rows
    ]


@router.put("/ops/collectors/{user_id}")
async def ops_upsert_collector(
    user_id: uuid.UUID, body: CollectorIn, db: DbSession, user: User = Dispatcher
) -> dict:
    await dispatch.upsert_collector(db, user_id, body.model_dump(exclude_unset=True))
    return next(
        c
        for c in await dispatch.list_collectors(db, include_inactive=True)
        if c["user_id"] == user_id
    )


@router.get("/ops/live")
async def ops_live(db: DbSession, user: User = Dispatcher) -> dict:
    return await dispatch.live(db)


@router.get("/ops/alerts")
async def ops_alerts(db: DbSession, user: User = Dispatcher) -> list[dict]:
    return await dispatch.alerts(db)


@router.get("/ops/service-areas", response_model=list[ServiceAreaOut])
async def ops_service_areas(db: DbSession, user: User = Dispatcher):
    return await dispatch.list_service_areas(db)


@router.put("/ops/service-areas", response_model=ServiceAreaOut)
async def ops_upsert_service_area(body: ServiceAreaIn, db: DbSession, user: User = Dispatcher):
    return await dispatch.upsert_service_area(db, body.model_dump())


@router.delete("/ops/service-areas/{pincode}", status_code=204)
async def ops_disable_service_area(pincode: str, db: DbSession, user: User = Dispatcher) -> None:
    await dispatch.delete_service_area(db, pincode)


@router.get("/ops/metrics")
async def ops_metrics(
    db: DbSession,
    start: date | None = Query(default=None, alias="from"),
    end: date | None = Query(default=None, alias="to"),
    user: User = MetricsViewer,
) -> dict:
    end = end or today_ist()
    start = start or end - timedelta(days=6)
    if start > end or (end - start).days > 366:
        raise ValidationError("Choose a range of up to one year.")
    return await metrics.dashboard(db, start, end)


# ── Lab receiving ───────────────────────────────────────────────────────────


@router.get("/lab/manifests")
async def lab_manifests(
    db: DbSession, status: str | None = Query(default="in_transit"), user: User = LabReceiver
) -> list[dict]:
    query = select(TransportManifest).order_by(TransportManifest.created_at.desc()).limit(100)
    if status:
        query = query.where(TransportManifest.status == status)
    return [await custody.manifest_view(db, m) for m in (await db.execute(query)).scalars()]


@router.post("/lab/manifests/{manifest_id}/receive")
async def lab_receive_manifest(
    manifest_id: uuid.UUID, body: LabReceiveIn, db: DbSession, user: User = LabReceiver
) -> dict:
    return await lab.receive_manifest(
        db,
        manifest_id,
        user,
        body.barcodes,
        seal_intact=body.seal_intact,
        temperature_note=body.temperature_note,
    )


@router.get("/lab/specimens/{barcode}")
async def lab_specimen(barcode: str, db: DbSession, user: User = LabReceiver) -> dict:
    return await lab.specimen_view(db, await lab.specimen_by_barcode(db, barcode))


@router.post("/lab/specimens/{barcode}/receive")
async def lab_receive_specimen(barcode: str, db: DbSession, user: User = LabReceiver) -> dict:
    specimen = await lab.receive_single(db, barcode, user)
    return await lab.specimen_view(db, specimen)


@router.post("/lab/specimens/{barcode}/decision")
async def lab_decision(
    barcode: str, body: DecisionIn, db: DbSession, user: User = LabReceiver
) -> dict:
    return await lab.decide(db, barcode, user, body.decision, body.reason, body.notes)


@router.get("/lab/rejection-reasons")
async def lab_rejection_reasons(user: User = LabReceiver) -> list[str]:
    return list(lab.REJECTION_REASONS)


@router.get("/lab/worklist")
async def lab_worklist(db: DbSession, user: User = LabReceiver) -> list[dict]:
    """Tests from home visits that are at the lab and not yet reported."""
    from sqlalchemy.orm import selectinload

    from app.models.booking import Booking

    rows = (
        (
            await db.execute(
                select(Booking)
                .options(selectinload(Booking.visit))
                .where(
                    Booking.visit_id.isnot(None),
                    Booking.lab_status.in_(
                        ("received", "in_progress", "under_review", "partial", "delayed", "on_hold")
                    ),
                )
                .order_by(Booking.updated_at.desc())
                .limit(300)
            )
        )
        .scalars()
        .all()
    )
    return [
        {
            "booking_id": b.id,
            "visit_id": b.visit_id,
            "visit_reference": b.visit.reference if b.visit else None,
            "test": b.test_name,
            "patient_name": b.patient_name,
            "lab_status": b.lab_status,
            "lis_accession": b.lis_accession,
            "updated_at": b.updated_at,
        }
        for b in rows
    ]


@router.post("/lab/bookings/{booking_id}/status")
async def lab_booking_status(
    booking_id: uuid.UUID, body: LabStatusIn, db: DbSession, user: User = LabReporter
) -> dict:
    b = await lab.set_lab_status(
        db, booking_id, user, body.lab_status, body.lis_accession, body.note
    )
    return {"booking_id": b.id, "lab_status": b.lab_status, "lis_accession": b.lis_accession}


# ── Reports ─────────────────────────────────────────────────────────────────


def _report_row(r: LabReport) -> dict:
    return {
        "id": r.id,
        "reference": r.reference,
        "visit_id": r.visit_id,
        "title": r.title,
        "version": r.version,
        "status": r.status,
        "is_partial": r.is_partial,
        "booking_ids": r.booking_ids,
        "lis_accession": r.lis_accession,
        "authorized_by_name": r.authorized_by_name,
        "authorized_at": r.authorized_at,
        "released_at": r.released_at,
        "supersedes_id": r.supersedes_id,
        "amendment_note": r.amendment_note,
        "created_at": r.created_at,
    }


@router.get("/lab/reports")
async def lab_reports(
    db: DbSession,
    visit_id: uuid.UUID | None = None,
    status: str | None = None,
    user: User = LabReporter,
) -> list[dict]:
    query = select(LabReport).order_by(LabReport.created_at.desc()).limit(200)
    if visit_id:
        query = query.where(LabReport.visit_id == visit_id)
    if status:
        query = query.where(LabReport.status == status)
    return [_report_row(r) for r in (await db.execute(query)).scalars()]


@router.post("/lab/reports", status_code=201)
async def lab_upload_report(
    db: DbSession,
    file: UploadFile = File(...),
    visit_id: uuid.UUID = Form(...),
    booking_ids: str = Form(..., description="JSON array of booking ids"),
    title: str = Form("Laboratory report"),
    lis_accession: str | None = Form(None),
    authorized_by_name: str | None = Form(None),
    authorized_at: datetime | None = Form(None),
    is_partial: bool = Form(False),
    supersedes_id: uuid.UUID | None = Form(None),
    amendment_note: str | None = Form(None),
    user: User = LabReporter,
) -> dict:
    try:
        ids = [str(uuid.UUID(str(x))) for x in json.loads(booking_ids)]
    except (ValueError, TypeError) as exc:
        raise ValidationError("booking_ids must be a JSON array of ids") from exc
    report = await lab.create_report(
        db,
        user,
        visit_id=visit_id,
        booking_ids=ids,
        title=title,
        file_bytes=await file.read(),
        content_type=file.content_type or "",
        filename=file.filename or "report.pdf",
        lis_accession=lis_accession,
        authorized_by_name=authorized_by_name,
        authorized_at=authorized_at,
        is_partial=is_partial,
        supersedes_id=supersedes_id,
        amendment_note=amendment_note,
    )
    return _report_row(report)


@router.post("/lab/reports/{report_id}/release")
async def lab_release_report(report_id: uuid.UUID, db: DbSession, user: User = LabReporter) -> dict:
    return _report_row(await lab.release_report(db, report_id, user))


@router.post("/lab/reports/{report_id}/revoke")
async def lab_revoke_report(
    report_id: uuid.UUID, body: RevokeIn, db: DbSession, user: User = LabReporter
) -> dict:
    return _report_row(await lab.revoke_report(db, report_id, user, body.reason))


@router.get("/lab/reports/{report_id}/preview")
async def lab_preview_report(report_id: uuid.UUID, db: DbSession, user: User = LabReporter) -> dict:
    from app.services.storage_service import storage_service

    report = await db.get(LabReport, report_id)
    if report is None:
        raise NotFoundError("Report not found")
    return {"url": storage_service.signed_url(report.file_path, expires_in=120)}


# ── LIS queue ───────────────────────────────────────────────────────────────


@router.get("/lab/lis/tasks")
async def lis_tasks(db: DbSession, status: str | None = None, user: User = LabReporter) -> dict:
    tasks = await lis.list_tasks(db, status)
    return {
        "adapter": lis.lis_adapter().name,
        "items": [
            {
                "id": t.id,
                "kind": t.kind,
                "entity_id": t.entity_id,
                "status": t.status,
                "attempts": t.attempts,
                "last_error": t.last_error,
                "next_attempt_at": t.next_attempt_at,
                "created_at": t.created_at,
            }
            for t in tasks
        ],
    }


@router.post("/lab/lis/tasks/{task_id}/retry")
async def lis_retry(task_id: uuid.UUID, db: DbSession, user: User = LabReporter) -> dict:
    task = await lis.retry(db, task_id)
    if task is None:
        raise NotFoundError("Task not found")
    return {"id": task.id, "status": task.status}

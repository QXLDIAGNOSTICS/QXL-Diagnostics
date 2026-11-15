"""QXL Collect — Collector app endpoints (phlebotomist + courier).

Every mutation accepts ``Idempotency-Key`` so the app's offline queue can
replay safely; the server still re-runs every safety check on first receipt.
"""

from __future__ import annotations

import uuid

from fastapi import APIRouter, Depends, Header, Query

from app.api.deps import CurrentUser, DbSession
from app.core.exceptions import PermissionDeniedError
from app.core.roles import FIELD_ROLES, ROLE_COLLECTOR
from app.models.catalog import Center
from app.models.user import User
from app.schemas.collect import (
    CompleteIn,
    DutyIn,
    ExceptionIn,
    IdentityIn,
    IssueIn,
    LatLng,
    LocationBatch,
    ManifestAccept,
    ManifestCreate,
    ManifestTransfer,
    ReasonIn,
    SpecimenIn,
)
from app.services.collect import custody, field
from app.services.collect.common import idempotent, today_ist

router = APIRouter(tags=["collect-field"])

IdemKey = Header(default=None, alias="Idempotency-Key")


async def collector_user(user: CurrentUser, db: DbSession) -> User:
    if user.role != ROLE_COLLECTOR:
        raise PermissionDeniedError("Collector app access only.")
    await field.collector_profile(db, user)
    return user


async def field_user(user: CurrentUser, db: DbSession) -> User:
    if user.role not in FIELD_ROLES:
        raise PermissionDeniedError("Collector app access only.")
    await field.collector_profile(db, user)
    return user


Collector = Depends(collector_user)
FieldUser = Depends(field_user)


# ── Profile ─────────────────────────────────────────────────────────────────


@router.get("/collector/me")
async def me(db: DbSession, user: User = FieldUser) -> dict:
    profile = await field.collector_profile(db, user)
    stats = {"today": 0, "completed_today": 0, "pending_today": 0}
    if user.role == ROLE_COLLECTOR:
        jobs = await field.list_jobs(db, user, "today")
        stats = {
            "today": len(jobs),
            "completed_today": sum(
                1 for j in jobs if j.status in ("collected", "partially_collected")
            ),
            "pending_today": sum(
                1 for j in jobs if j.status in ("assigned", "acknowledged", "en_route", "arrived")
            ),
            "unsuccessful_today": sum(1 for j in jobs if j.status == "unsuccessful"),
        }
    return {
        "user_id": user.id,
        "role": user.role,
        "name": profile.display_name,
        "employee_code": profile.employee_code,
        "photo_url": profile.photo_url,
        "phone": user.phone,
        "zone": profile.zone,
        "shift_start": profile.shift_start,
        "shift_end": profile.shift_end,
        "working_days": profile.working_days,
        "competencies": profile.competencies,
        "qualification": profile.qualification,
        "on_duty": profile.on_duty,
        "today": today_ist(),
        "stats": stats,
    }


@router.post("/collector/me/duty")
async def set_duty(body: DutyIn, db: DbSession, user: User = FieldUser) -> dict:
    profile = await field.collector_profile(db, user)
    profile.on_duty = body.on_duty
    await db.commit()
    return {"on_duty": profile.on_duty}


@router.get("/collector/centers")
async def lab_centers(db: DbSession, user: User = FieldUser) -> list[dict]:
    from sqlalchemy import select

    rows = (
        await db.execute(
            select(Center).where(Center.is_active.is_(True)).order_by(Center.sort_order)
        )
    ).scalars()
    return [{"id": c.id, "name": c.name, "address": c.address} for c in rows]


# ── Jobs ────────────────────────────────────────────────────────────────────


def _summary(job) -> dict:  # noqa: ANN001
    v = job.visit
    return {
        "id": job.id,
        "reference": job.reference,
        "kind": job.kind,
        "status": job.status,
        "visit_reference": v.reference,
        "slot_date": v.slot_date,
        "slot_label": v.slot_label,
        "patient_name": v.patient_name,
        "locality": v.locality,
        "pincode": v.pincode,
        "lat": v.lat,
        "lng": v.lng,
        "tests": [b.test_name for b in v.bookings if b.status != "cancelled"],
        "payment_mode": v.payment_mode,
        "is_delayed": job.is_delayed,
        "visit_status": v.status,
    }


@router.get("/collector/jobs")
async def jobs(
    db: DbSession,
    scope: str = Query("today", pattern="^(today|upcoming|active|history)$"),
    user: User = Collector,
) -> list[dict]:
    return [_summary(j) for j in await field.list_jobs(db, user, scope)]


@router.get("/collector/jobs/{job_id}")
async def job(job_id: uuid.UUID, db: DbSession, user: User = Collector) -> dict:
    return await field.job_detail(db, await field.load_job(db, job_id, user))


async def _detail(db, job_id, user) -> dict:  # noqa: ANN001
    return await field.job_detail(db, await field.load_job(db, job_id, user))


@router.post("/collector/jobs/{job_id}/acknowledge")
async def acknowledge(
    job_id: uuid.UUID, db: DbSession, key: str | None = IdemKey, user: User = Collector
):
    async def run():
        await field.acknowledge(db, await field.load_job(db, job_id, user), user)
        return await _detail(db, job_id, user)

    return await idempotent(db, actor_id=user.id, key=key, route="acknowledge", run=run)


@router.post("/collector/jobs/{job_id}/start")
async def start(
    job_id: uuid.UUID,
    body: LatLng,
    db: DbSession,
    key: str | None = IdemKey,
    user: User = Collector,
):
    async def run():
        await field.start_journey(
            db, await field.load_job(db, job_id, user), user, body.lat, body.lng
        )
        return await _detail(db, job_id, user)

    return await idempotent(db, actor_id=user.id, key=key, route="start", run=run)


@router.post("/collector/jobs/{job_id}/location")
async def location(
    job_id: uuid.UUID,
    body: LocationBatch,
    db: DbSession,
    key: str | None = IdemKey,
    user: User = Collector,
):
    async def run():
        points = [p.model_dump() for p in body.points]
        for p in points:
            if p.get("recorded_at") is not None:
                p["recorded_at"] = p["recorded_at"].isoformat()
        return await field.record_locations(
            db, await field.load_job(db, job_id, user), user, points
        )

    return await idempotent(db, actor_id=user.id, key=key, route="location", run=run)


@router.post("/collector/jobs/{job_id}/arrive")
async def arrive(
    job_id: uuid.UUID,
    body: LatLng,
    db: DbSession,
    key: str | None = IdemKey,
    user: User = Collector,
):
    async def run():
        await field.arrive(db, await field.load_job(db, job_id, user), user, body.lat, body.lng)
        return await _detail(db, job_id, user)

    return await idempotent(db, actor_id=user.id, key=key, route="arrive", run=run)


@router.post("/collector/jobs/{job_id}/verify-identity")
async def verify_identity(
    job_id: uuid.UUID,
    body: IdentityIn,
    db: DbSession,
    key: str | None = IdemKey,
    user: User = Collector,
):
    async def run():
        await field.verify_identity(
            db,
            await field.load_job(db, job_id, user),
            user,
            name_confirmed=body.name_confirmed,
            stated_dob=body.stated_dob,
            visit_code=body.visit_code,
        )
        # Same shape as every other job action: the updated job.
        return await _detail(db, job_id, user)

    return await idempotent(db, actor_id=user.id, key=key, route="verify-identity", run=run)


@router.post("/collector/jobs/{job_id}/specimens", status_code=201)
async def add_specimen(
    job_id: uuid.UUID,
    body: SpecimenIn,
    db: DbSession,
    key: str | None = IdemKey,
    user: User = Collector,
):
    async def run():
        data = body.model_dump()
        data["booking_ids"] = [str(b) for b in data["booking_ids"]]
        data["client_ref"] = data.get("client_ref") or key
        await field.add_specimen(db, await field.load_job(db, job_id, user), user, data)
        return await _detail(db, job_id, user)

    return await idempotent(
        db, actor_id=user.id, key=key, route="specimen", run=run, status_code=201
    )


@router.post("/collector/jobs/{job_id}/specimens/{barcode}/void")
async def void_specimen(
    job_id: uuid.UUID,
    barcode: str,
    body: ReasonIn,
    db: DbSession,
    key: str | None = IdemKey,
    user: User = Collector,
):
    async def run():
        await field.remove_specimen(
            db, await field.load_job(db, job_id, user), user, barcode, body.reason
        )
        return await _detail(db, job_id, user)

    return await idempotent(db, actor_id=user.id, key=key, route="void", run=run)


@router.post("/collector/jobs/{job_id}/complete")
async def complete(
    job_id: uuid.UUID,
    body: CompleteIn,
    db: DbSession,
    key: str | None = IdemKey,
    user: User = Collector,
):
    async def run():
        await field.complete(db, await field.load_job(db, job_id, user), user, body.model_dump())
        return await _detail(db, job_id, user)

    return await idempotent(db, actor_id=user.id, key=key, route="complete", run=run)


@router.post("/collector/jobs/{job_id}/exception")
async def exception(
    job_id: uuid.UUID,
    body: ExceptionIn,
    db: DbSession,
    key: str | None = IdemKey,
    user: User = Collector,
):
    async def run():
        await field.report_exception(
            db, await field.load_job(db, job_id, user), user, body.type, body.note, body.eta_minutes
        )
        return await _detail(db, job_id, user)

    return await idempotent(db, actor_id=user.id, key=key, route="exception", run=run)


# ── Custody ─────────────────────────────────────────────────────────────────


@router.get("/collector/specimens")
async def my_specimens(db: DbSession, user: User = FieldUser) -> list[dict]:
    return [
        {
            "barcode": s.barcode,
            "status": s.status,
            "container_type": s.container_type,
            "visit_id": s.visit_id,
            "collected_at": s.collected_at,
            "manifest_id": s.manifest_id,
        }
        for s in await custody.my_specimens(db, user)
    ]


@router.post("/manifests", status_code=201)
async def create_manifest(
    body: ManifestCreate, db: DbSession, key: str | None = IdemKey, user: User = FieldUser
):
    async def run():
        manifest = await custody.create_manifest(db, user, body.model_dump())
        return await custody.manifest_view(db, manifest)

    return await idempotent(
        db, actor_id=user.id, key=key, route="manifest", run=run, status_code=201
    )


@router.get("/courier/manifests")
async def courier_manifests(db: DbSession, user: User = FieldUser) -> list[dict]:
    return [await custody.manifest_view(db, m) for m in await custody.courier_manifests(db, user)]


@router.get("/manifests/{manifest_id}")
async def get_manifest(manifest_id: uuid.UUID, db: DbSession, user: User = FieldUser) -> dict:
    from app.core.exceptions import NotFoundError
    from app.models.collect import TransportManifest

    manifest = await db.get(TransportManifest, manifest_id)
    if manifest is None or user.id not in (
        manifest.current_custodian_id,
        manifest.pending_receiver_id,
        manifest.created_by_id,
    ):
        raise NotFoundError("Manifest not found")
    return await custody.manifest_view(db, manifest)


@router.post("/manifests/{manifest_id}/accept")
async def accept_manifest(
    manifest_id: uuid.UUID,
    body: ManifestAccept,
    db: DbSession,
    key: str | None = IdemKey,
    user: User = FieldUser,
):
    async def run():
        manifest = await custody.accept_manifest(
            db,
            manifest_id,
            user,
            body.barcodes,
            seal_intact=body.seal_intact,
            temperature_note=body.temperature_note,
        )
        return await custody.manifest_view(db, manifest)

    return await idempotent(db, actor_id=user.id, key=key, route="accept", run=run)


@router.post("/manifests/{manifest_id}/transfer")
async def transfer_manifest(
    manifest_id: uuid.UUID,
    body: ManifestTransfer,
    db: DbSession,
    key: str | None = IdemKey,
    user: User = FieldUser,
):
    async def run():
        manifest = await custody.transfer_manifest(
            db, manifest_id, user, body.handover_to_code, body.destination_center_id
        )
        return await custody.manifest_view(db, manifest)

    return await idempotent(db, actor_id=user.id, key=key, route="transfer", run=run)


@router.post("/specimens/{barcode}/issue")
async def specimen_issue(
    barcode: str, body: IssueIn, db: DbSession, key: str | None = IdemKey, user: User = FieldUser
):
    async def run():
        s = await custody.report_issue(db, barcode, user, body.type, body.note)
        return {"barcode": s.barcode, "status": s.status}

    return await idempotent(db, actor_id=user.id, key=key, route="issue", run=run)

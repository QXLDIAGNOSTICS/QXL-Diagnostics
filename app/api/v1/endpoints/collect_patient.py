"""QXL Collect — patient endpoints: profiles, addresses, serviceability, home
visits, live tracking, reports, devices and in-app inbox."""

from __future__ import annotations

import uuid
from datetime import date

from fastapi import APIRouter, Header, Query, Request
from fastapi.responses import Response
from sqlalchemy import select, update

from app.api.deps import CurrentUser, DbSession
from app.core.config import settings
from app.core.exceptions import NotFoundError, ValidationError
from app.models.collect import InboxMessage
from app.schemas.collect import (
    AddressIn,
    AddressOut,
    AddressPatch,
    DeviceIn,
    DeviceRemove,
    InboxRead,
    ProfileIn,
    ProfileOut,
    ProfilePatch,
    ReasonIn,
    RescheduleIn,
    VisitCreate,
)
from app.schemas.payment import CreateOrderResponse
from app.services import payment_service
from app.services.collect import lab, notify, patients, visits
from app.services.collect.common import now_utc

router = APIRouter(tags=["collect-patient"])


# ── Profiles ────────────────────────────────────────────────────────────────


@router.get("/me/profiles", response_model=list[ProfileOut])
async def list_profiles(user: CurrentUser, db: DbSession):
    return await patients.list_profiles(db, user)


@router.post("/me/profiles", response_model=ProfileOut, status_code=201)
async def create_profile(body: ProfileIn, user: CurrentUser, db: DbSession):
    return await patients.create_profile(db, user, body.model_dump())


@router.patch("/me/profiles/{profile_id}", response_model=ProfileOut)
async def update_profile(
    profile_id: uuid.UUID, body: ProfilePatch, user: CurrentUser, db: DbSession
):
    return await patients.update_profile(db, user, profile_id, body.model_dump(exclude_unset=True))


@router.delete("/me/profiles/{profile_id}", status_code=204)
async def archive_profile(profile_id: uuid.UUID, user: CurrentUser, db: DbSession) -> None:
    await patients.archive_profile(db, user, profile_id)


# ── Addresses ───────────────────────────────────────────────────────────────


@router.get("/me/addresses", response_model=list[AddressOut])
async def list_addresses(user: CurrentUser, db: DbSession):
    return await patients.list_addresses(db, user)


@router.post("/me/addresses", response_model=AddressOut, status_code=201)
async def create_address(body: AddressIn, user: CurrentUser, db: DbSession):
    return await patients.create_address(db, user, body.model_dump())


@router.patch("/me/addresses/{address_id}", response_model=AddressOut)
async def update_address(
    address_id: uuid.UUID, body: AddressPatch, user: CurrentUser, db: DbSession
):
    return await patients.update_address(db, user, address_id, body.model_dump(exclude_unset=True))


@router.delete("/me/addresses/{address_id}", status_code=204)
async def delete_address(address_id: uuid.UUID, user: CurrentUser, db: DbSession) -> None:
    await patients.delete_address(db, user, address_id)


# ── Serviceability & slots (public) ────────────────────────────────────────


@router.get("/service-areas/check")
async def check_service_area(
    db: DbSession, pincode: str = Query(min_length=6, max_length=6)
) -> dict:
    area = await patients.service_area_for(db, pincode)
    if area is None:
        return {"pincode": pincode, "serviceable": False}
    return {
        "pincode": pincode,
        "serviceable": True,
        "locality": area.locality,
        "zone": area.zone,
        "collection_fee_paise": area.collection_fee_paise,
        "free_collection_above_paise": settings.HOME_COLLECTION_FREE_ABOVE * 100
        if area.collection_fee_paise is None
        else None,
        "default_fee_paise": settings.HOME_COLLECTION_FEE * 100
        if area.collection_fee_paise is None
        else None,
    }


@router.get("/home-collection/slots")
async def home_collection_slots(
    db: DbSession, date: date, pincode: str = Query(min_length=6, max_length=6)
) -> dict:  # noqa: A002
    return await patients.visit_slots(db, date, pincode)


@router.get("/home-collection/config")
async def home_collection_config() -> dict:
    """Values the booking screens show (consent version, booking window)."""
    return {
        "consent_version": settings.CONSENT_VERSION,
        "booking_days": settings.HOME_VISIT_BOOKING_DAYS,
        "pay_on_visit_enabled": True,
    }


# ── Visits ──────────────────────────────────────────────────────────────────


@router.post("/home-visits", status_code=201)
async def create_visit(
    body: VisitCreate,
    user: CurrentUser,
    db: DbSession,
    idempotency_key: str | None = Header(default=None, alias="Idempotency-Key"),
) -> dict:
    data = body.model_dump()
    data["items"] = [{"kind": i["kind"], "id": str(i["id"])} for i in data["items"]]
    visit = await visits.create_visit(db, user, data, idempotency_key)
    return await visits.visit_detail(db, visit)


@router.get("/home-visits")
async def list_visits(user: CurrentUser, db: DbSession, limit: int = 20, offset: int = 0) -> dict:
    rows, total = await visits.list_patient_visits(db, user, limit=limit, offset=offset)
    return {"items": [await visits.visit_detail(db, v) for v in rows], "count": total}


@router.get("/home-visits/{visit_id}")
async def get_visit(visit_id: uuid.UUID, user: CurrentUser, db: DbSession) -> dict:
    visit = await visits.get_owned_visit(db, user, visit_id)
    return await visits.visit_detail(db, visit)


@router.get("/home-visits/{visit_id}/tracking")
async def track_visit(visit_id: uuid.UUID, user: CurrentUser, db: DbSession) -> dict:
    visit = await visits.get_owned_visit(db, user, visit_id)
    return await visits.tracking(db, visit)


@router.post("/home-visits/{visit_id}/cancel")
async def cancel_visit(
    visit_id: uuid.UUID, body: ReasonIn, user: CurrentUser, db: DbSession
) -> dict:
    visit = await visits.get_owned_visit(db, user, visit_id)
    visit = await visits.cancel_visit(db, visit, user, body.reason)
    return await visits.visit_detail(db, visit)


@router.post("/home-visits/{visit_id}/reschedule")
async def reschedule_visit(
    visit_id: uuid.UUID, body: RescheduleIn, user: CurrentUser, db: DbSession
) -> dict:
    visit = await visits.get_owned_visit(db, user, visit_id)
    visit = await visits.reschedule_visit(db, visit, user, body.slot_date, body.slot_label)
    return await visits.visit_detail(db, visit)


@router.post("/home-visits/{visit_id}/pay", response_model=CreateOrderResponse, status_code=201)
async def pay_visit(visit_id: uuid.UUID, user: CurrentUser, db: DbSession) -> CreateOrderResponse:
    """Razorpay order for the exact visit total shown at booking."""
    visit = await visits.get_owned_visit(db, user, visit_id)
    if visit.status == "cancelled":
        raise ValidationError("This visit was cancelled.")
    unpaid = [b for b in visit.bookings if b.status != "cancelled" and b.payment_status != "paid"]
    if not unpaid:
        raise ValidationError("This visit is already paid.")
    if len(unpaid) != len([b for b in visit.bookings if b.status != "cancelled"]):
        raise ValidationError("Part of this visit is already paid. Please contact support.")
    payment, bookings = await payment_service.create_order(
        db,
        booking_ids=[b.id for b in unpaid],
        user=user,
        collection_fee_override_paise=visit.collection_fee_paise,
    )
    return CreateOrderResponse(
        key_id=settings.RAZORPAY_KEY_ID,
        order_id=payment.razorpay_order_id,
        amount=payment.amount,
        currency=payment.currency,
        booking_ids=[b.id for b in bookings],
        collection_fee=visit.collection_fee_paise,
        description=f"Home collection {visit.reference}",
    )


# ── Reports ─────────────────────────────────────────────────────────────────


@router.get("/me/reports")
async def my_reports(user: CurrentUser, db: DbSession) -> list[dict]:
    rows = await lab.patient_reports(db, user)
    profiles = {p.id: p for p in await patients.list_profiles(db, user)}
    return [
        {
            "id": r.id,
            "reference": r.reference,
            "visit_id": r.visit_id,
            "title": r.title,
            "version": r.version,
            "is_partial": r.is_partial,
            "status": r.status,
            "released_at": r.released_at,
            "patient_name": profiles[r.profile_id].full_name if r.profile_id in profiles else None,
            "profile_id": r.profile_id,
            "amendment_note": r.amendment_note,
        }
        for r in rows
    ]


@router.post("/me/reports/{report_id}/access")
async def report_access(
    report_id: uuid.UUID, request: Request, user: CurrentUser, db: DbSession
) -> dict:
    ip = request.client.host if request.client else None
    return await lab.report_access_url(db, user, report_id, ip)


# ── Devices & inbox ─────────────────────────────────────────────────────────


@router.post("/me/devices", status_code=204)
async def register_device(body: DeviceIn, user: CurrentUser, db: DbSession) -> None:
    await notify.register_device(db, user.id, body.token, body.platform, body.app)


@router.delete("/me/devices", status_code=204)
async def unregister_device(body: DeviceRemove, user: CurrentUser, db: DbSession) -> None:
    await notify.unregister_device(db, user.id, body.token)


@router.get("/me/inbox")
async def inbox(user: CurrentUser, db: DbSession, limit: int = 50) -> dict:
    rows = (
        (
            await db.execute(
                select(InboxMessage)
                .where(InboxMessage.user_id == user.id)
                .order_by(InboxMessage.created_at.desc())
                .limit(min(limit, 100))
            )
        )
        .scalars()
        .all()
    )
    unread = sum(1 for r in rows if r.read_at is None)
    return {
        "unread": unread,
        "items": [
            {
                "id": r.id,
                "kind": r.kind,
                "title": r.title,
                "body": r.body,
                "data": r.data,
                "read": r.read_at is not None,
                "created_at": r.created_at,
            }
            for r in rows
        ],
    }


@router.post("/me/inbox/read", status_code=204)
async def mark_read(body: InboxRead, user: CurrentUser, db: DbSession) -> None:
    query = update(InboxMessage).where(
        InboxMessage.user_id == user.id, InboxMessage.read_at.is_(None)
    )
    if body.ids:
        query = query.where(InboxMessage.id.in_(body.ids))
    await db.execute(query.values(read_at=now_utc()))
    await db.commit()


# ── Dev-only local file serving ─────────────────────────────────────────────


@router.get("/storage/local", include_in_schema=False)
async def local_file(token: str) -> Response:
    from app.services.storage_service import read_local

    if settings.is_production or not settings.LOCAL_STORAGE_DIR:
        raise NotFoundError("Not found")
    found = read_local(token)
    if found is None:
        raise NotFoundError("Link expired")
    data, name = found
    return Response(
        data,
        media_type="application/pdf",
        headers={"Content-Disposition": f'inline; filename="{name}"', "Cache-Control": "no-store"},
    )

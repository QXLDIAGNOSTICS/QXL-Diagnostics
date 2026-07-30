"""Booking endpoints: guest + authenticated test/package bookings, staff management."""
from __future__ import annotations

import csv
import io
import uuid
from datetime import datetime, timedelta, timezone

from fastapi import APIRouter, Depends, Query
from fastapi.responses import StreamingResponse

from app.api.deps import CurrentUser, CurrentUserOptional, DbSession, require_role
from app.core import roles as R
from app.models.user import User
from app.repositories.booking_repository import BookingRepository
from app.schemas.booking import (
    BookingAdminUpdate,
    BookingCreate,
    BookingFeed,
    BookingFeedItem,
    BookingList,
    BookingReceipt,
    BookingRead,
    BookingRescheduleRequest,
    BookingStatusUpdate,
    PatientList,
    PatientRead,
    ReceiptPaymentEntry,
)
from app.schemas.notification import NotificationList, NotifyRequest, NotificationRead
from app.services import appointment_stats_service, booking_notification_service, booking_service

router = APIRouter(prefix="/bookings", tags=["bookings"])


@router.post("", response_model=BookingRead, status_code=201)
async def create_booking(
    body: BookingCreate, db: DbSession, user: CurrentUserOptional
) -> BookingRead:
    booking = await booking_service.create_booking(db, body.model_dump(), user)
    return BookingRead.model_validate(booking)


@router.get("/slot-availability")
async def slot_availability(date: str, db: DbSession) -> dict:
    """Public endpoint the booking form polls when a date is picked, so it
    can grey out slots that are already full or in the past."""
    from app.core.config import settings

    counts = await BookingRepository(db).counts_by_time_for_date(date)
    return {"date": date, "max_per_slot": settings.MAX_BOOKINGS_PER_SLOT, "booked": counts}


@router.get("/me", response_model=BookingList)
async def list_my_bookings(db: DbSession, user: CurrentUser, limit: int = 50, offset: int = 0) -> BookingList:
    items, count = await booking_service.list_my_bookings(db, user, limit=limit, offset=offset)
    return BookingList(items=[BookingRead.model_validate(b) for b in items], count=count)


@router.get("/stats")
async def appointment_stats(db: DbSession, user: User = Depends(require_role("staff"))) -> dict:
    """Appointment dashboard + live front-desk stats — powers the Appointments page."""
    _ = user
    return await appointment_stats_service.get_dashboard_stats(db)


@router.get("/notifications-feed", response_model=BookingFeed)
async def booking_notifications_feed(
    db: DbSession,
    since: datetime | None = Query(None, description="ISO timestamp; only bookings created after this are returned"),
    limit: int = Query(20, le=50),
    user: User = Depends(require_role("staff")),
) -> BookingFeed:
    """Powers the admin bell icon — new-booking alerts + payment alerts.

    Audience rules:
    - **New appointments**: only the assigned appointments staff member sees
      them (or any appointments.manage staff if still unassigned). Admins do
      NOT get appointment pings — those belong to front-desk roles like
      ``front_staff_appointment``.
    - **Payments**: admins see every paid/failed update; appointments staff
      still see payment updates for bookings assigned to them.
    """
    cutoff = since or (datetime.now(timezone.utc) - timedelta(minutes=20))
    if cutoff.tzinfo is None:
        cutoff = cutoff.replace(tzinfo=timezone.utc)
    repo = BookingRepository(db)
    is_admin = await R.is_admin_async(db, user.role)
    can_manage_appts = await R.has_permission_async(db, user.role, "appointments.manage")

    new_rows = await repo.list_created_after(cutoff, limit=limit)
    paid_rows = await repo.list_payment_updated_after(cutoff, limit=limit)

    # Appointment alerts → appointments staff only (never admin-tier).
    if is_admin:
        new_rows = []
    elif can_manage_appts:
        new_rows = [b for b in new_rows if b.assigned_to_id in (None, user.id)]
    else:
        new_rows = []

    # Payment alerts → admins see all; appointments staff see their own.
    if is_admin:
        pass  # keep all paid_rows
    elif can_manage_appts:
        paid_rows = [b for b in paid_rows if b.assigned_to_id in (None, user.id)]
    else:
        paid_rows = []

    def _aware(dt: datetime) -> datetime:
        return dt if dt.tzinfo is not None else dt.replace(tzinfo=timezone.utc)

    def _feed_item(row, kind: str, event_at: datetime) -> BookingFeedItem:
        item = BookingFeedItem.model_validate(row)
        item.kind = kind
        item.event_at = _aware(event_at)
        return item

    items = [_feed_item(row, "new_booking", row.created_at) for row in new_rows]
    items += [_feed_item(row, "payment", row.updated_at) for row in paid_rows]
    items.sort(key=lambda it: it.event_at or it.created_at, reverse=True)

    return BookingFeed(items=items[:limit], server_time=datetime.now(timezone.utc))


@router.get("/export")
async def export_bookings_csv(
    db: DbSession,
    status: str | None = None,
    user: User = Depends(require_role("admin")),
) -> StreamingResponse:
    """CSV export of appointments — administrators only."""
    _ = user
    items, _count = await booking_service.list_all_bookings(db, status=status, limit=5000, offset=0)

    buf = io.StringIO()
    writer = csv.writer(buf)
    writer.writerow(
        [
            "id",
            "patient_name",
            "patient_phone",
            "patient_email",
            "test_or_package",
            "collection_type",
            "visit_type",
            "preferred_date",
            "preferred_time",
            "status",
            "is_delayed",
            "was_rescheduled",
            "payment_status",
            "amount_paise",
            "assigned_to",
            "notes",
            "created_at",
        ]
    )
    for b in items:
        writer.writerow(
            [
                str(b.id),
                b.patient_name,
                b.patient_phone,
                b.patient_email or "",
                b.test_name or "",
                b.collection_type,
                b.visit_type,
                b.preferred_date or "",
                b.preferred_time or "",
                b.status,
                b.is_delayed,
                b.was_rescheduled,
                b.payment_status,
                b.amount_paise or "",
                b.assigned_to_name or "",
                (b.notes or "").replace("\n", " "),
                b.created_at.isoformat() if getattr(b, "created_at", None) else "",
            ]
        )

    buf.seek(0)
    filename = "qxl-appointments.csv"
    return StreamingResponse(
        iter([buf.getvalue()]),
        media_type="text/csv",
        headers={"Content-Disposition": f'attachment; filename="{filename}"'},
    )


@router.get("/patients", response_model=PatientList)
async def list_patients(
    db: DbSession,
    limit: int = Query(20, ge=1, le=100),
    offset: int = Query(0, ge=0),
    q: str | None = Query(None, description="Search name / phone / email"),
    filter: str | None = Query(None, description="'new' | 'returning' | omit for all"),
    user: User = Depends(require_role("staff")),
) -> PatientList:
    """Paginated distinct-patient list derived from bookings (by phone)."""
    _ = user
    kind = filter if filter in {"new", "returning"} else None
    items, count = await booking_service.list_patients(
        db, limit=limit, offset=offset, q=q, filter_kind=kind
    )
    return PatientList(items=[PatientRead(**row) for row in items], count=count)


@router.get("/{booking_id}", response_model=BookingRead)
async def get_my_booking(booking_id: uuid.UUID, db: DbSession, user: CurrentUser) -> BookingRead:
    booking = await booking_service.get_booking_for_user(db, booking_id, user)
    return BookingRead.model_validate(booking)


@router.get("", response_model=BookingList)
async def admin_list_bookings(
    db: DbSession,
    status: str | None = None,
    statuses: str | None = Query(
        None, description="Comma-separated status list, e.g. sample_collected,report_ready,completed"
    ),
    collection_type: str | None = Query(None, description="'home' | 'center'"),
    visit_type: str | None = Query(None, description="'scheduled' | 'walk_in' | 'emergency'"),
    date_from: str | None = Query(None, description="Preferred date lower bound YYYY-MM-DD"),
    date_to: str | None = Query(None, description="Preferred date upper bound YYYY-MM-DD"),
    q: str | None = Query(None, description="Search patient name / phone / email / test"),
    limit: int = Query(20, ge=1, le=100),
    offset: int = Query(0, ge=0),
    user: User = Depends(require_role("staff")),
) -> BookingList:
    _ = user
    status_list = [s.strip() for s in statuses.split(",") if s.strip()] if statuses else None
    if collection_type and collection_type not in {"home", "center"}:
        collection_type = None
    if visit_type and visit_type not in {"scheduled", "walk_in", "emergency"}:
        visit_type = None
    items, count = await booking_service.list_all_bookings(
        db,
        status=status,
        limit=limit,
        offset=offset,
        collection_type=collection_type,
        statuses=status_list,
        q=q,
        visit_type=visit_type,
        date_from=date_from,
        date_to=date_to,
    )
    return BookingList(items=[BookingRead.model_validate(b) for b in items], count=count)


@router.patch("/{booking_id}/status", response_model=BookingRead)
async def update_booking_status(
    booking_id: uuid.UUID,
    body: BookingStatusUpdate,
    db: DbSession,
    user: User = Depends(require_role("staff")),
) -> BookingRead:
    _ = user
    booking = await booking_service.update_booking_status(db, booking_id, body.status)
    return BookingRead.model_validate(booking)


@router.post("/{booking_id}/checkin", response_model=BookingRead)
async def checkin_booking(
    booking_id: uuid.UUID, db: DbSession, user: User = Depends(require_role("staff"))
) -> BookingRead:
    _ = user
    booking = await booking_service.check_in(db, booking_id)
    return BookingRead.model_validate(booking)


@router.post("/{booking_id}/start", response_model=BookingRead)
async def start_booking(
    booking_id: uuid.UUID, db: DbSession, user: User = Depends(require_role("staff"))
) -> BookingRead:
    """Marks the patient as now with the doctor / technician."""
    _ = user
    booking = await booking_service.start_consultation(db, booking_id)
    return BookingRead.model_validate(booking)


@router.post("/{booking_id}/complete", response_model=BookingRead)
async def complete_booking(
    booking_id: uuid.UUID, db: DbSession, user: User = Depends(require_role("staff"))
) -> BookingRead:
    _ = user
    booking = await booking_service.complete_booking(db, booking_id)
    return BookingRead.model_validate(booking)


@router.post("/{booking_id}/no-show", response_model=BookingRead)
async def no_show_booking(
    booking_id: uuid.UUID, db: DbSession, user: User = Depends(require_role("staff"))
) -> BookingRead:
    _ = user
    booking = await booking_service.mark_no_show(db, booking_id)
    return BookingRead.model_validate(booking)


@router.post("/{booking_id}/reschedule", response_model=BookingRead)
async def reschedule_booking(
    booking_id: uuid.UUID,
    body: BookingRescheduleRequest,
    db: DbSession,
    user: User = Depends(require_role("staff")),
) -> BookingRead:
    _ = user
    booking = await booking_service.reschedule(
        db,
        booking_id,
        preferred_date=body.preferred_date,
        preferred_time=body.preferred_time,
        notify=body.notify,
        channel=body.channel,
    )
    return BookingRead.model_validate(booking)


@router.patch("/{booking_id}/delay", response_model=BookingRead)
async def toggle_delay(
    booking_id: uuid.UUID,
    is_delayed: bool,
    db: DbSession,
    user: User = Depends(require_role("staff")),
) -> BookingRead:
    _ = user
    booking = await booking_service.toggle_delay(db, booking_id, is_delayed)
    return BookingRead.model_validate(booking)


@router.post("/{booking_id}/notify", response_model=NotificationRead, status_code=201)
async def notify_patient(
    booking_id: uuid.UUID,
    body: NotifyRequest,
    db: DbSession,
    user: User = Depends(require_role("staff")),
) -> NotificationRead:
    """Send (or schedule) an SMS/email to the patient — confirmations, reminders,
    reschedule/cancellation notices, offers, or a fully custom message."""
    notification = await booking_notification_service.queue_for_booking_id(
        db,
        booking_id=booking_id,
        channel=body.channel,
        notification_type=body.type,
        subject=body.subject,
        message=body.message,
        scheduled_at=body.scheduled_at,
        created_by=user.name or user.email or user.phone,
    )
    return NotificationRead.model_validate(notification)


@router.get("/{booking_id}/notifications", response_model=NotificationList)
async def list_booking_notifications(
    booking_id: uuid.UUID, db: DbSession, user: User = Depends(require_role("staff"))
) -> NotificationList:
    _ = user
    items, count = await booking_notification_service.list_notifications(db, booking_id)
    return NotificationList(items=[NotificationRead.model_validate(n) for n in items], count=count)


@router.get("/{booking_id}/receipt", response_model=BookingReceipt)
async def get_booking_receipt(
    booking_id: uuid.UUID, db: DbSession, user: User = Depends(require_role("staff"))
) -> BookingReceipt:
    _ = user
    from app.core.exceptions import NotFoundError
    from app.repositories.booking_repository import BookingRepository
    from app.repositories.payment_repository import PaymentRepository

    booking = await BookingRepository(db).get_by_id(booking_id)
    if booking is None:
        raise NotFoundError("Booking not found")
    payments = await PaymentRepository(db).list_for_booking(booking_id)

    return BookingReceipt(
        booking_id=booking.id,
        patient_name=booking.patient_name,
        patient_phone=booking.patient_phone,
        patient_email=booking.patient_email,
        item_name=booking.test_name,
        collection_type=booking.collection_type,
        preferred_date=booking.preferred_date,
        preferred_time=booking.preferred_time,
        payment_status=booking.payment_status,
        amount_paise=booking.amount_paise,
        payments=[ReceiptPaymentEntry.model_validate(p) for p in payments],
    )


@router.patch("/{booking_id}", response_model=BookingRead)
async def update_booking(
    booking_id: uuid.UUID,
    body: BookingAdminUpdate,
    db: DbSession,
    user: User = Depends(require_role("staff")),
) -> BookingRead:
    """Staff update: patient details, status, schedule, notes, report link."""
    _ = user
    booking = await booking_service.update_booking(db, booking_id, body.model_dump(exclude_unset=True))
    return BookingRead.model_validate(booking)


@router.delete("/{booking_id}", status_code=204)
async def delete_booking(
    booking_id: uuid.UUID,
    db: DbSession,
    user: User = Depends(require_role("admin")),
) -> None:
    """Permanently remove an appointment — administrators only."""
    _ = user
    await booking_service.delete_booking(db, booking_id)

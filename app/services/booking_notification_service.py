"""Orchestrates SMS/email notifications about a booking.

Two entry points:
- ``queue_notification``: called from the API (staff-triggered) or from
  booking/payment services (system-triggered). Sends immediately unless a
  future ``scheduled_at`` is given, in which case it's stored as
  ``status="scheduled"`` for the background poller (see ``run_due_notifications``,
  started from ``app.main``'s lifespan).
- ``run_due_notifications``: polled periodically; dispatches anything whose
  ``scheduled_at`` has arrived.
"""
from __future__ import annotations

import asyncio
import uuid
from datetime import datetime, timezone

from sqlalchemy.ext.asyncio import AsyncSession

from app.core.config import settings
from app.core.exceptions import NotFoundError, ValidationError
from app.core.logging import get_logger
from app.models.booking import Booking
from app.models.notification import BookingNotification
from app.repositories.booking_repository import BookingRepository
from app.repositories.contact_optout_repository import ContactOptOutRepository
from app.repositories.notification_repository import NotificationRepository
from app.services import notification_service
from app.services.notification_templates import build_default, get_template_id

logger = get_logger(__name__)

# Keeps strong references to fire-and-forget dispatch tasks so they aren't
# garbage-collected mid-flight (asyncio only holds a weak reference once you
# stop holding the Task yourself) — see asyncio docs' "Important" note on
# create_task. Discarded automatically once each task finishes.
_pending_dispatches: set[asyncio.Task] = set()


def _fire_and_forget(coro) -> None:  # noqa: ANN001
    """Schedules ``coro`` to run on the event loop without the caller
    awaiting it. Used for outbound SMS/email so a slow (or hanging) SMTP/SMS
    provider never blocks an HTTP request/response — the actual send
    reliably took 10-30s in production (SMTP handshake + per-provider
    latency), which was enough to trip the frontend dev proxy's socket
    timeout and show "Internal Server Error" even though the booking/
    payment itself had already succeeded server-side."""
    task = asyncio.create_task(coro)
    _pending_dispatches.add(task)
    task.add_done_callback(_pending_dispatches.discard)

# Automated, recurring/bulk message types that respect the unsubscribe list.
# One-off transactional messages (booking_received, payment, payment_failed,
# reschedule, cancellation, welcome, custom staff messages) are never
# suppressed — they're essential operational communication tied to a
# specific action the patient just took.
_SUPPRESSIBLE_TYPES = {"marketing", "offer", "payment_reminder", "reminder"}


async def _dispatch(
    db: AsyncSession, booking: Booking, *, channel: str, subject: str, message: str, notification_type: str
) -> tuple[bool, bool, list[str]]:
    """Sends via the requested channel(s). Returns (sms_ok, email_ok, errors)."""
    sms_ok = True
    email_ok = True
    errors: list[str] = []
    suppressible = notification_type in _SUPPRESSIBLE_TYPES
    optout_repo = ContactOptOutRepository(db)

    if channel in {"sms", "both"}:
        if not booking.patient_phone:
            sms_ok = False
            errors.append("No phone number on file")
        elif suppressible and await optout_repo.is_opted_out(
            email=booking.patient_email, phone=booking.patient_phone, channel="sms"
        ):
            sms_ok = False
            errors.append("Recipient has unsubscribed from SMS reminders/offers")
        else:
            template_id = get_template_id(notification_type)
            sms_ok = await notification_service.send_sms(
                booking.patient_phone, message, template_id=template_id
            )
            if not sms_ok:
                errors.append(
                    "SMS delivery failed, or no DLT-approved template ID configured for "
                    f"'{notification_type}' (see NETTYFISH_DLT_TEMPLATES.md)"
                )

    if channel in {"email", "both"}:
        if not booking.patient_email:
            email_ok = False
            errors.append("No email on file")
        elif suppressible and await optout_repo.is_opted_out(
            email=booking.patient_email, phone=booking.patient_phone, channel="email"
        ):
            email_ok = False
            errors.append("Recipient has unsubscribed from email reminders/offers")
        else:
            unsubscribe_url = (
                f"{settings.FRONTEND_BASE_URL}/unsubscribe?token={booking.unsubscribe_token}"
                if suppressible
                else None
            )
            email_ok = await notification_service.send_email(
                booking.patient_email, subject, message, unsubscribe_url=unsubscribe_url
            )
            if not email_ok:
                errors.append("Email delivery failed or not configured")

    return sms_ok, email_ok, errors


async def queue_notification(
    db: AsyncSession,
    *,
    booking: Booking,
    channel: str,
    notification_type: str,
    subject: str | None = None,
    message: str | None = None,
    scheduled_at: datetime | None = None,
    created_by: str | None = None,
) -> BookingNotification:
    if notification_type == "custom" and not (message or "").strip():
        raise ValidationError("A custom notification requires a message")

    default_subject, default_message = build_default(notification_type, booking)
    final_subject = (subject or "").strip() or default_subject
    final_message = (message or "").strip() or default_message

    repo = NotificationRepository(db)
    now = datetime.now(timezone.utc)
    is_future = scheduled_at is not None and scheduled_at > now

    notification = await repo.create(
        booking_id=booking.id,
        channel=channel,
        type=notification_type,
        subject=final_subject,
        message=final_message,
        scheduled_at=scheduled_at,
        status="scheduled" if is_future else "pending",
        created_by=created_by,
    )
    # Commit BEFORE scheduling the background dispatch below: the dispatch
    # runs in its own DB session (see `_dispatch_by_id`), which won't see
    # this row until the current transaction is committed.
    await db.commit()
    await db.refresh(notification)

    if not is_future:
        # Deliberately not awaited — see `_fire_and_forget`'s docstring.
        # Callers get back a "pending" notification immediately; its status
        # flips to sent/partial/failed moments later once the background
        # task finishes (visible on the next notifications-list refresh).
        _fire_and_forget(_dispatch_by_id(notification.id, booking.id))

    return notification


async def _dispatch_by_id(notification_id: uuid.UUID, booking_id: uuid.UUID) -> None:
    """Standalone entry point for the fire-and-forget path: opens its own
    session because the originating request's session may already be closed
    (or in use elsewhere) by the time this actually runs."""
    from app.db.session import AsyncSessionLocal

    async with AsyncSessionLocal() as db:
        notification = await NotificationRepository(db).get_by_id(notification_id)
        booking = await BookingRepository(db).get_by_id(booking_id)
        if notification is None or booking is None:
            logger.warning(
                "Skipping notification dispatch — notification=%s booking=%s missing by the time "
                "the background task ran",
                notification_id,
                booking_id,
            )
            return
        await _send_and_record(db, notification, booking)
        await db.commit()


async def _send_and_record(db: AsyncSession, notification: BookingNotification, booking: Booking) -> None:
    repo = NotificationRepository(db)
    try:
        sms_ok, email_ok, errors = await _dispatch(
            db,
            booking,
            channel=notification.channel,
            subject=notification.subject or "",
            message=notification.message,
            notification_type=notification.type,
        )
    except Exception as exc:  # noqa: BLE001
        logger.exception("Notification dispatch crashed for booking=%s", booking.id)
        await repo.mark_failed(notification, error=str(exc))
        return

    now = datetime.now(timezone.utc)
    if notification.channel == "both":
        if sms_ok and email_ok:
            await repo.mark_sent(notification, sent_at=now)
        elif sms_ok or email_ok:
            await repo.mark_partial(notification, sent_at=now, error="; ".join(errors))
        else:
            await repo.mark_failed(notification, error="; ".join(errors) or "Delivery failed")
    else:
        ok = sms_ok if notification.channel == "sms" else email_ok
        if ok:
            await repo.mark_sent(notification, sent_at=now)
        else:
            await repo.mark_failed(notification, error="; ".join(errors) or "Delivery failed")


async def run_due_notifications(db: AsyncSession) -> int:
    """Sends everything whose scheduled time has arrived. Returns count processed."""
    notif_repo = NotificationRepository(db)
    booking_repo = BookingRepository(db)
    due = await notif_repo.list_due(now=datetime.now(timezone.utc))
    processed = 0
    for notification in due:
        booking = await booking_repo.get_by_id(notification.booking_id)
        if booking is None:
            await notif_repo.mark_failed(notification, error="Booking no longer exists")
            processed += 1
            continue
        await _send_and_record(db, notification, booking)
        processed += 1
    if processed:
        await db.commit()
    return processed


async def list_notifications(db: AsyncSession, booking_id) -> tuple[list[BookingNotification], int]:  # noqa: ANN001
    return await NotificationRepository(db).list_for_booking(booking_id)


async def queue_for_booking_id(
    db: AsyncSession,
    *,
    booking_id,  # noqa: ANN001
    channel: str,
    notification_type: str,
    subject: str | None = None,
    message: str | None = None,
    scheduled_at: datetime | None = None,
    created_by: str | None = None,
) -> BookingNotification:
    booking = await BookingRepository(db).get_by_id(booking_id)
    if booking is None:
        raise NotFoundError("Booking not found")
    return await queue_notification(
        db,
        booking=booking,
        channel=channel,
        notification_type=notification_type,
        subject=subject,
        message=message,
        scheduled_at=scheduled_at,
        created_by=created_by,
    )

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

from datetime import datetime, timezone

from sqlalchemy.ext.asyncio import AsyncSession

from app.core.exceptions import NotFoundError, ValidationError
from app.core.logging import get_logger
from app.models.booking import Booking
from app.models.notification import BookingNotification
from app.repositories.booking_repository import BookingRepository
from app.repositories.notification_repository import NotificationRepository
from app.services import notification_service
from app.services.notification_templates import build_default

logger = get_logger(__name__)


async def _dispatch(booking: Booking, *, channel: str, subject: str, message: str) -> tuple[bool, bool, list[str]]:
    """Sends via the requested channel(s). Returns (sms_ok, email_ok, errors)."""
    sms_ok = True
    email_ok = True
    errors: list[str] = []

    if channel in {"sms", "both"}:
        if not booking.patient_phone:
            sms_ok = False
            errors.append("No phone number on file")
        else:
            sms_ok = await notification_service.send_sms(booking.patient_phone, message)
            if not sms_ok:
                errors.append("SMS delivery failed or not configured")

    if channel in {"email", "both"}:
        if not booking.patient_email:
            email_ok = False
            errors.append("No email on file")
        else:
            email_ok = await notification_service.send_email(booking.patient_email, subject, message)
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

    if not is_future:
        await _send_and_record(db, notification, booking)

    await db.commit()
    await db.refresh(notification)
    return notification


async def _send_and_record(db: AsyncSession, notification: BookingNotification, booking: Booking) -> None:
    repo = NotificationRepository(db)
    try:
        sms_ok, email_ok, errors = await _dispatch(
            booking, channel=notification.channel, subject=notification.subject or "", message=notification.message
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

"""Account-lifecycle notifications that aren't tied to any single booking
(e.g. the welcome message sent right after an account is created), so they
don't go through ``booking_notification_service`` / ``BookingNotification``
(which requires a ``booking_id``).

Best-effort and fire-and-forget — a delivery failure here must never break
registration or login.
"""
from __future__ import annotations

from app.core.logging import get_logger
from app.models.user import User
from app.services import notification_service
from app.services.notification_templates import build_welcome, get_template_id

logger = get_logger(__name__)


async def send_welcome_notification(user: User) -> None:
    """Sends a "Welcome to QXL" SMS/email to a newly created account."""
    try:
        subject, message = build_welcome(user.name)
        template_id = get_template_id("welcome")
        if user.phone:
            await notification_service.send_sms(user.phone, message, template_id=template_id)
        if user.email:
            await notification_service.send_email(user.email, subject, message)
    except Exception:  # noqa: BLE001
        logger.exception("Failed to send welcome notification for user=%s", user.id)

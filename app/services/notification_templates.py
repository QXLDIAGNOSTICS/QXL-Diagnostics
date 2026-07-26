"""Default SMS/email copy for each booking notification type.

Kept deliberately short and plain-text — Nettyfish SMS has a strict length
budget and staff can always override with a fully custom message.

IMPORTANT (India DLT compliance): the SMS wording below is written to match,
word-for-word, the templates submitted for DLT approval in
``qxl-backend/NETTYFISH_DLT_TEMPLATES.md``. If you edit the SMS copy here,
you must also re-register the updated wording with your DLT entity — a
mismatch between the submitted template and the actual message text will
cause Nettyfish/the carrier to reject the SMS at send time.
"""
from __future__ import annotations

from app.core.config import settings
from app.models.booking import Booking

_BRAND = "QXL Diagnostics"

# Maps a notification type to the env var holding its DLT-approved template ID.
_TEMPLATE_ID_BY_TYPE: dict[str, str] = {
    "confirmation": "NETTYFISH_TEMPLATE_ID_CONFIRMATION",
    "payment": "NETTYFISH_TEMPLATE_ID_PAYMENT",
    "reminder": "NETTYFISH_TEMPLATE_ID_REMINDER",
    "reschedule": "NETTYFISH_TEMPLATE_ID_RESCHEDULE",
    "cancellation": "NETTYFISH_TEMPLATE_ID_CANCELLATION",
    "offer": "NETTYFISH_TEMPLATE_ID_OFFER",
}


def get_template_id(notification_type: str) -> str:
    """DLT-approved Nettyfish template ID for this notification type.

    Custom (staff-authored) messages always use the generic free-text
    template (NETTYFISH_TEMPLATE_ID_CUSTOM) since their body isn't fixed.
    """
    if notification_type == "custom":
        return settings.NETTYFISH_TEMPLATE_ID_CUSTOM
    env_field = _TEMPLATE_ID_BY_TYPE.get(notification_type)
    return getattr(settings, env_field, "") if env_field else ""


def _item(booking: Booking) -> str:
    return booking.test_name or "your test"


def _slot(booking: Booking) -> str:
    if booking.preferred_date and booking.preferred_time:
        return f"{booking.preferred_date} at {booking.preferred_time}"
    return booking.preferred_date or booking.preferred_time or "your scheduled slot"


def build_default(notification_type: str, booking: Booking) -> tuple[str, str]:
    """Returns (subject, message) for a given notification type.

    The SMS wording (used verbatim as the `message` for both the SMS and
    email body) intentionally matches, word-for-word, the DLT templates in
    ``NETTYFISH_DLT_TEMPLATES.md``. Do not tweak the sentence structure here
    without re-submitting the matching DLT template for approval.
    """
    name = booking.patient_name.split(" ")[0] if booking.patient_name else "there"

    if notification_type == "confirmation":
        subject = f"{_BRAND}: Appointment confirmed"
        message = (
            f"Dear {name}, your {_item(booking)} appointment with {_BRAND} is confirmed for "
            f"{_slot(booking)}. For changes, call us. - {_BRAND}"
        )
    elif notification_type == "payment":
        amount = f"{booking.amount_paise / 100:.0f}" if booking.amount_paise else "0"
        subject = f"{_BRAND}: Payment received"
        message = (
            f"Dear {name}, we have received your payment of Rs.{amount} for {_item(booking)} at "
            f"{_BRAND}. Thank you. - {_BRAND}"
        )
    elif notification_type == "reminder":
        subject = f"{_BRAND}: Appointment reminder"
        message = (
            f"Dear {name}, this is a reminder for your {_item(booking)} appointment with {_BRAND} "
            f"on {_slot(booking)}. See you soon. - {_BRAND}"
        )
    elif notification_type == "reschedule":
        subject = f"{_BRAND}: Appointment rescheduled"
        message = (
            f"Dear {name}, your {_item(booking)} appointment with {_BRAND} has been rescheduled to "
            f"{_slot(booking)}. Call us for queries. - {_BRAND}"
        )
    elif notification_type == "cancellation":
        subject = f"{_BRAND}: Appointment cancelled"
        message = (
            f"Dear {name}, your {_item(booking)} appointment with {_BRAND} scheduled for "
            f"{_slot(booking)} has been cancelled. Call us to rebook. - {_BRAND}"
        )
    elif notification_type == "offer":
        subject = f"{_BRAND}: A special offer for you"
        message = (
            f"Dear {name}, {_BRAND} has a special offer on health checkup packages this month. "
            f"Call us to book. - {_BRAND}"
        )
    else:  # custom — caller must supply message; this is just a safe fallback.
        subject = f"{_BRAND}: Update"
        message = f"Dear {name}, this is an update from {_BRAND} regarding your recent visit. - {_BRAND}"

    return subject, message

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

from datetime import datetime

from app.core.config import settings
from app.models.booking import Booking

_BRAND = "QXL Diagnostics"

# Maps a notification type to the env var holding its DLT-approved template ID.
_TEMPLATE_ID_BY_TYPE: dict[str, str] = {
    "booking_received": "NETTYFISH_TEMPLATE_ID_BOOKING_RECEIVED",
    "confirmation": "NETTYFISH_TEMPLATE_ID_CONFIRMATION",
    "payment": "NETTYFISH_TEMPLATE_ID_PAYMENT",
    "reminder": "NETTYFISH_TEMPLATE_ID_REMINDER",
    "reschedule": "NETTYFISH_TEMPLATE_ID_RESCHEDULE",
    "cancellation": "NETTYFISH_TEMPLATE_ID_CANCELLATION",
    "offer": "NETTYFISH_TEMPLATE_ID_OFFER",
    "welcome": "NETTYFISH_TEMPLATE_ID_WELCOME",
    "payment_failed": "NETTYFISH_TEMPLATE_ID_PAYMENT_FAILED",
    "payment_reminder": "NETTYFISH_TEMPLATE_ID_PAYMENT_REMINDER",
    "marketing": "NETTYFISH_TEMPLATE_ID_MARKETING",
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


# DLT caps each {#var#} at 30 characters; a longer value makes the carrier
# reject the whole SMS as not matching the approved template.
_DLT_VAR_MAX = 30


def _var(value: str) -> str:
    value = " ".join(value.split())
    return value if len(value) <= _DLT_VAR_MAX else value[: _DLT_VAR_MAX - 3].rstrip() + "..."


def _item(booking: Booking) -> str:
    return _var(booking.test_name or "your test")


def _display_date(value: str) -> str:
    """'2026-11-02' -> '02 Nov' (shorter, and keeps date + time slot within
    one DLT variable); anything else is passed through unchanged."""
    try:
        return datetime.strptime(value, "%Y-%m-%d").strftime("%d %b")
    except ValueError:
        return value


def _slot(booking: Booking) -> str:
    if booking.preferred_date and booking.preferred_time:
        return _var(f"{_display_date(booking.preferred_date)} at {booking.preferred_time}")
    if booking.preferred_date:
        return _var(_display_date(booking.preferred_date))
    return _var(booking.preferred_time or "your scheduled slot")


def build_default(notification_type: str, booking: Booking) -> tuple[str, str]:
    """Returns (subject, message) for a given notification type.

    The SMS wording (used verbatim as the `message` for both the SMS and
    email body) intentionally matches, word-for-word, the DLT templates in
    ``NETTYFISH_DLT_TEMPLATES.md``. Do not tweak the sentence structure here
    without re-submitting the matching DLT template for approval.
    """
    name = _var(booking.patient_name.split(" ")[0]) if booking.patient_name else "there"

    if notification_type == "booking_received":
        subject = f"{_BRAND}: Booking request received"
        message = (
            f"Dear {name}, we've received your {_item(booking)} booking request with {_BRAND} for "
            f"{_slot(booking)}. We'll confirm shortly. - {_BRAND}"
        )
    elif notification_type == "confirmation":
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
    elif notification_type == "payment_failed":
        subject = f"{_BRAND}: Payment unsuccessful"
        message = (
            f"Dear {name}, your payment for {_item(booking)} at {_BRAND} could not be completed. "
            f"Please try again or contact us for help. - {_BRAND}"
        )
    elif notification_type == "payment_reminder":
        amount = f"{booking.amount_paise / 100:.0f}" if booking.amount_paise else "0"
        subject = f"{_BRAND}: Payment pending"
        message = (
            f"Dear {name}, your payment of Rs.{amount} for {_item(booking)} at {_BRAND} is still "
            f"pending. Please complete it to confirm your slot. - {_BRAND}"
        )
    elif notification_type == "marketing":
        subject = f"{_BRAND}: Something for you"
        message = (
            f"Dear {name}, {_BRAND} has new health checkup packages and offers this month. "
            f"Call us or visit our website to book. - {_BRAND}"
        )
    else:  # custom — caller must supply message; this is just a safe fallback.
        subject = f"{_BRAND}: Update"
        message = f"Dear {name}, this is an update from {_BRAND} regarding your recent visit. - {_BRAND}"

    return subject, message


def preview_default(notification_type: str) -> tuple[str, str]:
    """Same copy as :func:`build_default` but rendered against a fake sample
    booking — powers the admin "Template" picker preview without needing a
    real booking on hand."""
    import types

    sample = types.SimpleNamespace(
        patient_name="Priya",
        test_name="Complete Blood Count",
        amount_paise=99900,
        preferred_date="2026-08-05",
        preferred_time="10:30 AM",
    )
    return build_default(notification_type, sample)  # type: ignore[arg-type]


def build_welcome(name: str | None) -> tuple[str, str]:
    """Account-creation welcome message — not tied to any booking, so it's
    built separately from ``build_default`` (which requires one)."""
    first = (name or "").split(" ")[0] or "there"
    subject = f"Welcome to {_BRAND}!"
    message = (
        f"Dear {first}, welcome to {_BRAND}! Your account is ready - you can now book tests, "
        f"track reports, and manage appointments anytime. - {_BRAND}"
    )
    return subject, message

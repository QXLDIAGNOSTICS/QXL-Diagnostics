"""Default SMS/email copy for each booking notification type.

Kept deliberately short and plain-text — Nettyfish SMS has a strict length
budget and staff can always override with a fully custom message.
"""
from __future__ import annotations

from app.models.booking import Booking

_BRAND = "QXL Diagnostics"


def _item(booking: Booking) -> str:
    return booking.test_name or "your test"


def _slot(booking: Booking) -> str:
    if booking.preferred_date and booking.preferred_time:
        return f"{booking.preferred_date} at {booking.preferred_time}"
    return booking.preferred_date or booking.preferred_time or "your scheduled slot"


def build_default(notification_type: str, booking: Booking) -> tuple[str, str]:
    """Returns (subject, message) for a given notification type."""
    name = booking.patient_name.split(" ")[0] if booking.patient_name else "there"

    if notification_type == "confirmation":
        subject = f"{_BRAND}: Appointment confirmed"
        message = (
            f"Hi {name}, your {_item(booking)} appointment with {_BRAND} is booked for "
            f"{_slot(booking)}. We'll see you then! Reply to this number for any changes."
        )
    elif notification_type == "payment":
        amount = f"₹{booking.amount_paise / 100:.0f}" if booking.amount_paise else "your payment"
        subject = f"{_BRAND}: Payment received"
        message = (
            f"Hi {name}, we've received {amount} for {_item(booking)}. Thank you for choosing "
            f"{_BRAND}! Your receipt is available in your account."
        )
    elif notification_type == "reminder":
        subject = f"{_BRAND}: Appointment reminder"
        message = (
            f"Hi {name}, this is a reminder for your {_item(booking)} appointment on "
            f"{_slot(booking)} with {_BRAND}. See you soon!"
        )
    elif notification_type == "reschedule":
        subject = f"{_BRAND}: Appointment rescheduled"
        message = (
            f"Hi {name}, your {_item(booking)} appointment has been rescheduled to "
            f"{_slot(booking)}. Contact us if this doesn't work for you."
        )
    elif notification_type == "cancellation":
        subject = f"{_BRAND}: Appointment cancelled"
        message = (
            f"Hi {name}, your {_item(booking)} appointment scheduled for {_slot(booking)} has been "
            f"cancelled. Call us anytime to rebook."
        )
    elif notification_type == "offer":
        subject = f"{_BRAND}: A special offer for you"
        message = (
            f"Hi {name}, it's been a while! {_BRAND} has a special offer on health checkup "
            f"packages this month. Reply to this message to book again."
        )
    else:  # custom — caller must supply message; this is just a safe fallback.
        subject = f"{_BRAND}: Update"
        message = f"Hi {name}, this is an update from {_BRAND} regarding your recent visit."

    return subject, message

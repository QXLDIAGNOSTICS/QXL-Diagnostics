"""BookingNotification: an SMS/email sent (or scheduled) about one booking.

Covers both system-triggered messages (booking confirmation, payment receipt)
and staff-triggered ones from the admin Appointments page (reminders,
reschedule notices, custom messages, offers) — including "send later" via
``scheduled_at``, dispatched by the background poller in ``app.main``.
"""
from __future__ import annotations

import uuid
from datetime import datetime

from sqlalchemy import DateTime, ForeignKey, String, Text
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.base import Base, TimestampMixin, new_uuid

NOTIFICATION_CHANNELS = ("sms", "email", "both")
NOTIFICATION_TYPES = (
    "confirmation",
    "payment",
    "reminder",
    "reschedule",
    "cancellation",
    "offer",
    "custom",
)
NOTIFICATION_STATUSES = ("pending", "scheduled", "sent", "failed", "partial")


class BookingNotification(Base, TimestampMixin):
    __tablename__ = "booking_notifications"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=new_uuid)
    booking_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), ForeignKey("bookings.id", ondelete="CASCADE"), index=True, nullable=False
    )

    channel: Mapped[str] = mapped_column(String(8), nullable=False)  # sms | email | both
    type: Mapped[str] = mapped_column(String(24), nullable=False, index=True)
    subject: Mapped[str | None] = mapped_column(String(200), nullable=True)
    message: Mapped[str] = mapped_column(Text, nullable=False)

    scheduled_at: Mapped[datetime | None] = mapped_column(DateTime(timezone=True), nullable=True, index=True)
    sent_at: Mapped[datetime | None] = mapped_column(DateTime(timezone=True), nullable=True)
    status: Mapped[str] = mapped_column(String(16), default="pending", nullable=False, index=True)
    error: Mapped[str | None] = mapped_column(Text, nullable=True)
    created_by: Mapped[str | None] = mapped_column(String(120), nullable=True)

    booking: Mapped["Booking"] = relationship(back_populates="notifications")  # noqa: F821

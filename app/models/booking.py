"""Booking model: patient appointment or home-collection request."""
from __future__ import annotations

import uuid

from sqlalchemy import Boolean, ForeignKey, Integer, String, Text
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.base import Base, TimestampMixin, new_uuid

# Status lifecycle: pending → confirmed → sample_collected → report_ready → completed | cancelled
BOOKING_STATUSES = ("pending", "confirmed", "sample_collected", "report_ready", "completed", "cancelled")


class Booking(Base, TimestampMixin):
    """A patient request to book a test, package, or home-collection."""

    __tablename__ = "bookings"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=new_uuid)

    # Authenticated user link (optional — guests can book too)
    user_id: Mapped[uuid.UUID | None] = mapped_column(
        UUID(as_uuid=True), ForeignKey("users.id", ondelete="SET NULL"), nullable=True, index=True
    )

    # Patient details (denormalised for guest bookings)
    patient_name: Mapped[str] = mapped_column(String, nullable=False)
    patient_phone: Mapped[str] = mapped_column(String, nullable=False)
    patient_email: Mapped[str | None] = mapped_column(String, nullable=True)
    patient_age: Mapped[int | None] = mapped_column(Integer, nullable=True)
    patient_gender: Mapped[str | None] = mapped_column(String(8), nullable=True)

    # What was booked
    test_name: Mapped[str | None] = mapped_column(String, nullable=True)
    package_id: Mapped[uuid.UUID | None] = mapped_column(
        UUID(as_uuid=True), ForeignKey("health_packages.id", ondelete="SET NULL"), nullable=True
    )
    center_id: Mapped[uuid.UUID | None] = mapped_column(
        UUID(as_uuid=True), ForeignKey("centers.id", ondelete="SET NULL"), nullable=True
    )

    # Logistics
    collection_type: Mapped[str] = mapped_column(String(16), default="home", nullable=False)  # 'home' | 'center'
    collection_address: Mapped[str | None] = mapped_column(Text, nullable=True)
    preferred_date: Mapped[str | None] = mapped_column(String, nullable=True)   # ISO date string
    preferred_time: Mapped[str | None] = mapped_column(String, nullable=True)

    # Lifecycle
    status: Mapped[str] = mapped_column(String(24), default="pending", nullable=False, index=True)
    notes: Mapped[str | None] = mapped_column(Text, nullable=True)
    is_urgent: Mapped[bool] = mapped_column(Boolean, default=False, nullable=False)

    user: Mapped["User | None"] = relationship(back_populates="bookings")  # noqa: F821
    package: Mapped["HealthPackage | None"] = relationship(back_populates="bookings")  # noqa: F821
    center: Mapped["Center | None"] = relationship(back_populates="bookings")  # noqa: F821

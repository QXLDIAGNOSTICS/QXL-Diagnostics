"""Payment model — tracks a Razorpay order end-to-end for a booking."""
from __future__ import annotations

import uuid
from datetime import datetime

from sqlalchemy import DateTime, ForeignKey, Integer, String
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.base import Base, TimestampMixin, new_uuid

# created -> authorized/captured (paid) -> refunded, or failed at any point before paid.
PAYMENT_STATUSES = ("created", "paid", "failed", "refunded")


class Payment(Base, TimestampMixin):
    __tablename__ = "payments"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=new_uuid)
    booking_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), ForeignKey("bookings.id", ondelete="CASCADE"), index=True, nullable=False
    )
    user_id: Mapped[uuid.UUID | None] = mapped_column(
        UUID(as_uuid=True), ForeignKey("users.id", ondelete="SET NULL"), nullable=True, index=True
    )

    razorpay_order_id: Mapped[str] = mapped_column(String, unique=True, index=True, nullable=False)
    razorpay_payment_id: Mapped[str | None] = mapped_column(String, unique=True, nullable=True)
    razorpay_signature: Mapped[str | None] = mapped_column(String, nullable=True)

    amount: Mapped[int] = mapped_column(Integer, nullable=False)  # smallest currency subunit (paise)
    currency: Mapped[str] = mapped_column(String(3), default="INR", nullable=False)
    status: Mapped[str] = mapped_column(String(16), default="created", nullable=False, index=True)
    failure_reason: Mapped[str | None] = mapped_column(String, nullable=True)
    paid_at: Mapped[datetime | None] = mapped_column(DateTime(timezone=True), nullable=True)

    booking: Mapped["Booking"] = relationship(back_populates="payments")  # noqa: F821

"""ContactOptOut: suppression list for automated bulk/marketing messages.

Recorded per contact (email and/or phone) rather than per user account, since
guest bookings have no user row. Checked by
``booking_notification_service._dispatch`` before sending any *automated,
recurring* notification type (marketing offers, payment/booking reminders) —
never applied to one-off transactional messages (booking received, payment
success/failure, staff-sent custom messages, reschedule/cancellation), which
remain essential operational communication and stay exempt from unsubscribe.
"""
from __future__ import annotations

import uuid

from sqlalchemy import Boolean, String
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column

from app.db.base import Base, TimestampMixin, new_uuid


class ContactOptOut(Base, TimestampMixin):
    __tablename__ = "contact_optouts"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=new_uuid)
    # Normalised (lowercased email / last-10-digit phone) — see
    # app.repositories.contact_optout_repository for the normalisation rules.
    email: Mapped[str | None] = mapped_column(String(255), nullable=True, index=True)
    phone: Mapped[str | None] = mapped_column(String(20), nullable=True, index=True)
    opt_out_email: Mapped[bool] = mapped_column(Boolean, default=False, nullable=False)
    opt_out_sms: Mapped[bool] = mapped_column(Boolean, default=False, nullable=False)

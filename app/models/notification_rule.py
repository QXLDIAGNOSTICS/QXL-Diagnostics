"""NotificationRule: admin-configurable automation for recurring SMS/email.

Two kinds of rule:
- ``payment_reminder``: repeatedly nudges patients with an unpaid/pending
  booking, every ``interval_days``, while the rule is active.
- ``marketing``: broadcasts to every patient on file (derived from their most
  recent booking) every ``interval_days`` — e.g. weekly (7) or monthly (30).

Both kinds respect an optional ``start_date``/``end_date`` window and can be
paused via ``is_active`` without deleting the rule. The scheduler
(``app.services.notification_rule_service.run_due_rules``) evaluates these
every tick alongside the existing "send later" notification poller.
"""
from __future__ import annotations

import uuid
from datetime import date, datetime

from sqlalchemy import Boolean, Date, DateTime, Integer, String, Text, func
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column

from app.db.base import Base, TimestampMixin, new_uuid

RULE_TYPES = ("payment_reminder", "marketing")
RULE_CHANNELS = ("sms", "email", "both")


class NotificationRule(Base, TimestampMixin):
    __tablename__ = "notification_rules"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=new_uuid)
    name: Mapped[str] = mapped_column(String(120), nullable=False)
    rule_type: Mapped[str] = mapped_column(String(24), nullable=False, index=True)
    channel: Mapped[str] = mapped_column(String(8), default="sms", nullable=False)

    # Repeat cadence, in days (1=daily, 7=weekly, 30=monthly, or any custom N).
    interval_days: Mapped[int] = mapped_column(Integer, nullable=False, default=7)

    start_date: Mapped[date | None] = mapped_column(Date, nullable=True)
    end_date: Mapped[date | None] = mapped_column(Date, nullable=True)
    is_active: Mapped[bool] = mapped_column(Boolean, default=True, nullable=False)

    # Optional overrides — blank means "use the default template for this type".
    subject: Mapped[str | None] = mapped_column(String(200), nullable=True)
    message: Mapped[str | None] = mapped_column(Text, nullable=True)

    # Marketing rules broadcast to the whole audience at once, so we track the
    # last full run here instead of a per-recipient log.
    last_run_at: Mapped[datetime | None] = mapped_column(DateTime(timezone=True), nullable=True)

    created_by: Mapped[str | None] = mapped_column(String(120), nullable=True)
    updated_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), server_default=func.now(), onupdate=func.now(), nullable=False
    )

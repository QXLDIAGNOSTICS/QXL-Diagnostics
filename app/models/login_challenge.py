"""LoginChallenge: the two-factor login handshake (OTP + SMS link).

A login only completes — i.e. a session cookie is issued — once BOTH factors
are satisfied:
  1. ``otp_verified_at`` — the user typed the correct one-time code.
  2. ``link_verified_at`` — the user clicked the one-time link sent via SMS.

Both the OTP and the link token are opaque, random, single-use secrets that
are only ever stored as a SHA-256 hash (see ``app.core.security``). Neither is
a JWT — leaking a hash (or even the raw value after expiry/consumption) can't
be replayed to authenticate.
"""
from __future__ import annotations

import uuid
from datetime import datetime

from sqlalchemy import Boolean, DateTime, ForeignKey, Integer, String
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.base import Base, TimestampMixin, new_uuid


class LoginChallenge(Base, TimestampMixin):
    __tablename__ = "login_challenges"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=new_uuid)
    user_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), ForeignKey("users.id", ondelete="CASCADE"), index=True, nullable=False
    )

    otp_hash: Mapped[str] = mapped_column(String(64), nullable=False)
    otp_expires_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), nullable=False)
    otp_attempts: Mapped[int] = mapped_column(Integer, default=0, nullable=False)
    otp_verified_at: Mapped[datetime | None] = mapped_column(DateTime(timezone=True), nullable=True)

    link_token_hash: Mapped[str] = mapped_column(String(64), unique=True, index=True, nullable=False)
    link_expires_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), nullable=False)
    link_verified_at: Mapped[datetime | None] = mapped_column(DateTime(timezone=True), nullable=True)

    ip_address: Mapped[str | None] = mapped_column(String, nullable=True)
    user_agent: Mapped[str | None] = mapped_column(String, nullable=True)

    consumed_at: Mapped[datetime | None] = mapped_column(DateTime(timezone=True), nullable=True)
    invalidated: Mapped[bool] = mapped_column(Boolean, default=False, nullable=False)

    user: Mapped["User"] = relationship(back_populates="login_challenges")  # noqa: F821

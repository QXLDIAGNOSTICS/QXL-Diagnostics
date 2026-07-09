"""User model — first-party account with password + phone/email OTP 2FA."""
from __future__ import annotations

import uuid
from datetime import date, datetime

from sqlalchemy import Boolean, Date, DateTime, Integer, String, func
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.base import Base, TimestampMixin, new_uuid


class User(Base, TimestampMixin):
    __tablename__ = "users"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=new_uuid)
    # Nullable: phone-only patient accounts (created on first OTP login) have
    # no email/password until they optionally add them later.
    email: Mapped[str | None] = mapped_column(String, unique=True, index=True, nullable=True)
    phone: Mapped[str] = mapped_column(String, unique=True, index=True, nullable=False)
    name: Mapped[str | None] = mapped_column(String, nullable=True)
    date_of_birth: Mapped[date | None] = mapped_column(Date, nullable=True)
    password_hash: Mapped[str | None] = mapped_column(String, nullable=True)

    is_email_verified: Mapped[bool] = mapped_column(Boolean, default=False, nullable=False)
    is_phone_verified: Mapped[bool] = mapped_column(Boolean, default=False, nullable=False)

    # Brute-force protection — checked/incremented on every login attempt.
    failed_login_attempts: Mapped[int] = mapped_column(Integer, default=0, nullable=False)
    locked_until: Mapped[datetime | None] = mapped_column(DateTime(timezone=True), nullable=True)

    # Authorization lives in our own DB: role drives what a session can do.
    role: Mapped[str] = mapped_column(String(20), server_default="patient", nullable=False)
    updated_at: Mapped[datetime] = mapped_column(
        server_default=func.now(), onupdate=func.now(), nullable=False
    )

    files: Mapped[list["FileRecord"]] = relationship(  # noqa: F821
        back_populates="owner", cascade="all, delete-orphan"
    )
    conversations: Mapped[list["Conversation"]] = relationship(  # noqa: F821
        back_populates="owner", cascade="all, delete-orphan"
    )
    sessions: Mapped[list["Session"]] = relationship(  # noqa: F821
        back_populates="user", cascade="all, delete-orphan"
    )
    bookings: Mapped[list["Booking"]] = relationship(  # noqa: F821
        back_populates="user", cascade="all, delete-orphan"
    )
    prescriptions: Mapped[list["Prescription"]] = relationship(  # noqa: F821
        back_populates="user", cascade="all, delete-orphan"
    )
    login_challenges: Mapped[list["LoginChallenge"]] = relationship(  # noqa: F821
        back_populates="user", cascade="all, delete-orphan"
    )


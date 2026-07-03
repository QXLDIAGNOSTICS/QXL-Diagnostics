"""User model — locally provisioned from Auth0 identities."""
from __future__ import annotations

import uuid
from datetime import datetime

from sqlalchemy import String, func
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.base import Base, TimestampMixin, new_uuid


class User(Base, TimestampMixin):
    __tablename__ = "users"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=new_uuid)
    auth0_sub: Mapped[str] = mapped_column(String, unique=True, index=True, nullable=False)
    email: Mapped[str | None] = mapped_column(String, index=True, nullable=True)
    name: Mapped[str | None] = mapped_column(String, nullable=True)
    # Authorization lives in our own DB, not in Auth0 claims: Auth0 only verifies identity.
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

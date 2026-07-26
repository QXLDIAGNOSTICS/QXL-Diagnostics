"""CustomRole: DB-backed role + permission definitions.

Built-in roles (front_office, staff, reception, marketing, sales, admin,
super_admin) are seeded here too (``is_system=True``) so the super admin
manages every role — built-in or custom — from one screen. ``tier`` decides
which backend guard tier (staff/admin) the role satisfies; ``permissions``
is a fine-grained feature list the admin frontend uses for nav/action gating.
"""
from __future__ import annotations

import uuid
from datetime import datetime

from sqlalchemy import JSON, Boolean, DateTime, String, func
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column

from app.db.base import Base, new_uuid


class CustomRole(Base):
    __tablename__ = "custom_roles"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=new_uuid)
    key: Mapped[str] = mapped_column(String(40), unique=True, nullable=False, index=True)
    label: Mapped[str] = mapped_column(String(80), nullable=False)
    tier: Mapped[str] = mapped_column(String(20), nullable=False, default="staff")
    permissions: Mapped[list] = mapped_column(JSON, nullable=False, default=list)
    is_system: Mapped[bool] = mapped_column(Boolean, nullable=False, default=False)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now(), nullable=False)
    updated_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), server_default=func.now(), onupdate=func.now(), nullable=False
    )

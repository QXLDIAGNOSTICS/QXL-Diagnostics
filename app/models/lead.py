"""Lead capture models: collaboration enquiries and contact form submissions."""
from __future__ import annotations

import uuid

from sqlalchemy import Boolean, String, Text
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column

from app.db.base import Base, TimestampMixin, new_uuid


class CollaborationLead(Base, TimestampMixin):
    """Franchise / partner / collaborate-with-us form submission."""

    __tablename__ = "collaboration_leads"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=new_uuid)
    name: Mapped[str] = mapped_column(String, nullable=False)
    email: Mapped[str | None] = mapped_column(String, nullable=True)
    phone: Mapped[str] = mapped_column(String, nullable=False)
    city: Mapped[str | None] = mapped_column(String, nullable=True)
    interest: Mapped[str | None] = mapped_column(String, nullable=True)  # franchise | hospital | doctor | other
    message: Mapped[str | None] = mapped_column(Text, nullable=True)
    is_read: Mapped[bool] = mapped_column(Boolean, default=False, nullable=False, index=True)
    notes: Mapped[str | None] = mapped_column(Text, nullable=True)


class ContactInquiry(Base, TimestampMixin):
    """General contact/support inquiry from the Contact Us page."""

    __tablename__ = "contact_inquiries"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=new_uuid)
    name: Mapped[str] = mapped_column(String, nullable=False)
    email: Mapped[str | None] = mapped_column(String, nullable=True)
    phone: Mapped[str | None] = mapped_column(String, nullable=True)
    subject: Mapped[str | None] = mapped_column(String, nullable=True)
    message: Mapped[str] = mapped_column(Text, nullable=False)
    is_read: Mapped[bool] = mapped_column(Boolean, default=False, nullable=False, index=True)

"""Domain catalog models: Centers, HealthPackages, TestCatalog."""
from __future__ import annotations

import uuid
from datetime import datetime

from sqlalchemy import Boolean, Integer, Numeric, String, Text
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.base import Base, TimestampMixin, new_uuid


class Center(Base, TimestampMixin):
    """Diagnostic center / collection point."""

    __tablename__ = "centers"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=new_uuid)
    name: Mapped[str] = mapped_column(String, nullable=False)
    address: Mapped[str] = mapped_column(String, nullable=False)
    city: Mapped[str] = mapped_column(String, nullable=False, index=True)
    phone: Mapped[str | None] = mapped_column(String, nullable=True)
    hours: Mapped[str | None] = mapped_column(String, nullable=True)
    lat: Mapped[float | None] = mapped_column(Numeric(10, 7), nullable=True)
    lng: Mapped[float | None] = mapped_column(Numeric(10, 7), nullable=True)
    is_nabl: Mapped[bool] = mapped_column(Boolean, default=False, nullable=False)
    is_active: Mapped[bool] = mapped_column(Boolean, default=True, nullable=False, index=True)
    sort_order: Mapped[int] = mapped_column(Integer, default=0, nullable=False)

    bookings: Mapped[list["Booking"]] = relationship(back_populates="center")  # noqa: F821


class HealthPackage(Base, TimestampMixin):
    """Curated health check package offered by QXL."""

    __tablename__ = "health_packages"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=new_uuid)
    name: Mapped[str] = mapped_column(String, nullable=False, index=True)
    slug: Mapped[str] = mapped_column(String, unique=True, index=True, nullable=False)
    tag: Mapped[str | None] = mapped_column(String(32), nullable=True)
    price: Mapped[int] = mapped_column(Integer, nullable=False)
    old_price: Mapped[int | None] = mapped_column(Integer, nullable=True)
    save_amount: Mapped[int | None] = mapped_column(Integer, nullable=True)
    parameters: Mapped[str | None] = mapped_column(String, nullable=True)
    includes: Mapped[str | None] = mapped_column(Text, nullable=True)
    # JSON-serialised list; stored as Text for portability
    benefits: Mapped[str | None] = mapped_column(Text, nullable=True)
    who_should_take: Mapped[str | None] = mapped_column(Text, nullable=True)
    age_group: Mapped[str | None] = mapped_column(String(32), nullable=True)
    gender: Mapped[str | None] = mapped_column(String(32), nullable=True)
    doctor_recommended: Mapped[bool] = mapped_column(Boolean, default=False, nullable=False)
    is_active: Mapped[bool] = mapped_column(Boolean, default=True, nullable=False, index=True)
    sort_order: Mapped[int] = mapped_column(Integer, default=0, nullable=False)

    bookings: Mapped[list["Booking"]] = relationship(back_populates="package")  # noqa: F821


class TestCatalog(Base, TimestampMixin):
    """Individual lab test entry."""

    __tablename__ = "test_catalog"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=new_uuid)
    name: Mapped[str] = mapped_column(String, nullable=False, index=True)
    slug: Mapped[str] = mapped_column(String, unique=True, index=True, nullable=False)
    category: Mapped[str | None] = mapped_column(String, nullable=True, index=True)
    description: Mapped[str | None] = mapped_column(Text, nullable=True)
    price: Mapped[int | None] = mapped_column(Integer, nullable=True)
    preparation: Mapped[str | None] = mapped_column(Text, nullable=True)
    turnaround_hours: Mapped[int | None] = mapped_column(Integer, nullable=True)
    is_active: Mapped[bool] = mapped_column(Boolean, default=True, nullable=False, index=True)

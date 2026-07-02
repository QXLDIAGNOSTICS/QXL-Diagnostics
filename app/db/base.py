"""SQLAlchemy declarative base and model registry.

Importing this module (via ``app.models``) ensures all ORM models are
registered on ``Base.metadata`` for Alembic autogenerate.
"""
from __future__ import annotations

import uuid
from datetime import datetime

from sqlalchemy import func
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column


class Base(DeclarativeBase):
    """Declarative base for all ORM models."""


class TimestampMixin:
    created_at: Mapped[datetime] = mapped_column(server_default=func.now(), nullable=False)


def new_uuid() -> uuid.UUID:
    return uuid.uuid4()

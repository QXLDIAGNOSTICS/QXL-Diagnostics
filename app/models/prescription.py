"""Prescription model: uploaded prescription files + AI analysis results."""
from __future__ import annotations

import uuid

from sqlalchemy import ForeignKey, String, Text
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.base import Base, TimestampMixin, new_uuid


class Prescription(Base, TimestampMixin):
    """Tracks an uploaded prescription and its AI-generated analysis."""

    __tablename__ = "prescriptions"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=new_uuid)
    user_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), ForeignKey("users.id", ondelete="CASCADE"), nullable=False, index=True
    )
    file_id: Mapped[uuid.UUID | None] = mapped_column(
        UUID(as_uuid=True), ForeignKey("files.id", ondelete="SET NULL"), nullable=True
    )

    # File metadata (cached so we can show it even if file is deleted)
    filename: Mapped[str] = mapped_column(String, nullable=False)
    content_type: Mapped[str] = mapped_column(String, nullable=False)

    # AI analysis output
    # JSON string: { tests: [str], medications: [str], summary: str, raw_text: str }
    analysis_json: Mapped[str | None] = mapped_column(Text, nullable=True)
    analysis_status: Mapped[str] = mapped_column(String(16), default="pending", nullable=False)
    # pending | processing | completed | failed
    error_message: Mapped[str | None] = mapped_column(Text, nullable=True)

    user: Mapped["User"] = relationship(back_populates="prescriptions")  # noqa: F821
    file: Mapped["FileRecord | None"] = relationship()  # noqa: F821

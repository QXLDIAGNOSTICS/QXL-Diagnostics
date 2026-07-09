"""File metadata model. Bytes live in Supabase Storage; metadata lives here."""
from __future__ import annotations

import uuid

from sqlalchemy import BigInteger, ForeignKey, String
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.base import Base, TimestampMixin, new_uuid


class FileRecord(Base, TimestampMixin):
    __tablename__ = "files"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=new_uuid)
    # Nullable: NULL means a global, admin-managed knowledge-base document that
    # grounds the chatbot for every visitor rather than a single user's files.
    owner_id: Mapped[uuid.UUID | None] = mapped_column(
        UUID(as_uuid=True), ForeignKey("users.id", ondelete="CASCADE"), index=True, nullable=True
    )
    bucket: Mapped[str] = mapped_column(String, nullable=False)
    object_path: Mapped[str] = mapped_column(String, nullable=False)
    filename: Mapped[str] = mapped_column(String, nullable=False)
    content_type: Mapped[str] = mapped_column(String, nullable=False)
    size: Mapped[int] = mapped_column(BigInteger, nullable=False)

    owner: Mapped["User | None"] = relationship(back_populates="files")  # noqa: F821
    chunks: Mapped[list["DocChunk"]] = relationship(  # noqa: F821
        back_populates="source_file", cascade="all, delete-orphan"
    )

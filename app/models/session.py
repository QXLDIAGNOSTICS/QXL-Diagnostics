"""Backend-owned login session: an opaque cookie token hashed at rest."""
from __future__ import annotations

import uuid
from datetime import datetime

from sqlalchemy import DateTime, ForeignKey, String
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.base import Base, TimestampMixin, new_uuid


class Session(Base, TimestampMixin):
    __tablename__ = "sessions"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=new_uuid)
    user_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), ForeignKey("users.id", ondelete="CASCADE"), index=True, nullable=False
    )
    # SHA-256 hex digest of the raw cookie token. The raw token is never stored.
    token_hash: Mapped[str] = mapped_column(String(64), unique=True, index=True, nullable=False)
    user_agent: Mapped[str | None] = mapped_column(String, nullable=True)
    ip_address: Mapped[str | None] = mapped_column(String, nullable=True)
    expires_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), nullable=False)
    revoked_at: Mapped[datetime | None] = mapped_column(DateTime(timezone=True), nullable=True)
    # Sliding idle-activity timestamp: updated on every authenticated request.
    # If now() - last_seen_at exceeds SESSION_IDLE_TIMEOUT_HOURS, the session
    # is treated as expired even though `expires_at` (the absolute 14-day
    # ceiling) hasn't been reached yet — forces re-login after a period of
    # inactivity (e.g. 24h) per security requirements.
    last_seen_at: Mapped[datetime | None] = mapped_column(DateTime(timezone=True), nullable=True)

    # Set only after this session's owner (an admin) has additionally
    # verified the ADMIN_ACCESS_KEY via POST /auth/admin/elevate. Cleared
    # once expired — admin-role endpoints re-check this on every request.
    admin_elevated_until: Mapped[datetime | None] = mapped_column(
        DateTime(timezone=True), nullable=True
    )

    user: Mapped["User"] = relationship(back_populates="sessions")  # noqa: F821

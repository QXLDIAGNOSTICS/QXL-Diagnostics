"""home_collection_available flags + session last_seen_at

Adds:
- health_packages.home_collection_available (bool, default True)
- test_catalog.home_collection_available (bool, default True)
- sessions.last_seen_at (nullable timestamptz) — sliding idle-activity
  timestamp used to enforce a configurable idle timeout
  (SESSION_IDLE_TIMEOUT_HOURS) independent of the absolute SESSION_TTL_DAYS
  ceiling.

Revision ID: 0010_home_collection_session
Revises: 0009_user_date_of_birth
Create Date: 2026-07-10

"""
from __future__ import annotations

from collections.abc import Sequence

import sqlalchemy as sa

from alembic import op

revision: str = "0010_home_collection_session"
down_revision: str | None = "0009_user_date_of_birth"
branch_labels: str | Sequence[str] | None = None
depends_on: str | Sequence[str] | None = None


def upgrade() -> None:
    op.add_column(
        "health_packages",
        sa.Column("home_collection_available", sa.Boolean(), nullable=False, server_default=sa.true()),
    )
    op.add_column(
        "test_catalog",
        sa.Column("home_collection_available", sa.Boolean(), nullable=False, server_default=sa.true()),
    )
    op.add_column("sessions", sa.Column("last_seen_at", sa.DateTime(timezone=True), nullable=True))


def downgrade() -> None:
    op.drop_column("sessions", "last_seen_at")
    op.drop_column("test_catalog", "home_collection_available")
    op.drop_column("health_packages", "home_collection_available")

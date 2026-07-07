"""admin elevation: step-up ("sudo mode") timestamp on sessions

Revision ID: 0006_admin_elevation
Revises: 0005_payments
Create Date: 2026-07-05

"""
from __future__ import annotations

from collections.abc import Sequence

import sqlalchemy as sa

from alembic import op

revision: str = "0006_admin_elevation"
down_revision: str | None = "0005_payments"
branch_labels: str | Sequence[str] | None = None
depends_on: str | Sequence[str] | None = None


def upgrade() -> None:
    op.add_column(
        "sessions", sa.Column("admin_elevated_until", sa.DateTime(timezone=True), nullable=True)
    )


def downgrade() -> None:
    op.drop_column("sessions", "admin_elevated_until")

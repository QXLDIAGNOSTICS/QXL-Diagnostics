"""Widen users.role to fit custom role keys.

Revision ID: 0017_widen_user_role
Revises: 0016_custom_roles
Create Date: 2026-07-26
"""

from __future__ import annotations

from alembic import op
import sqlalchemy as sa

revision = "0017_widen_user_role"
down_revision = "0016_custom_roles"
branch_labels = None
depends_on = None


def upgrade() -> None:
    # Custom role keys may be up to 40 chars (see custom_roles.key / role key regex).
    # The previous VARCHAR(20) rejected keys like ``front_staff_appointment``.
    op.alter_column(
        "users",
        "role",
        existing_type=sa.String(length=20),
        type_=sa.String(length=40),
        existing_nullable=False,
        existing_server_default="patient",
    )


def downgrade() -> None:
    op.alter_column(
        "users",
        "role",
        existing_type=sa.String(length=40),
        type_=sa.String(length=20),
        existing_nullable=False,
        existing_server_default="patient",
    )

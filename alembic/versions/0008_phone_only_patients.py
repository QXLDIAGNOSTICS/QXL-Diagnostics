"""allow phone-only patient accounts

Patients now sign up/login purely via phone + OTP (auto-provisioned on first
verified login) — they no longer need an email/password. Relax `users.email`
and `users.password_hash` to nullable. Admin/super-admin accounts continue to
be created with both (see AdminUserCreate) since they still require the
password + OTP + admin-secret flow.

Revision ID: 0008_phone_only_patients
Revises: 0007_catalog_kb_bookings
Create Date: 2026-07-08

"""
from __future__ import annotations

from collections.abc import Sequence

import sqlalchemy as sa

from alembic import op

revision: str = "0008_phone_only_patients"
down_revision: str | None = "0007_catalog_kb_bookings"
branch_labels: str | Sequence[str] | None = None
depends_on: str | Sequence[str] | None = None


def upgrade() -> None:
    op.alter_column("users", "email", existing_type=sa.String(), nullable=True)
    op.alter_column("users", "password_hash", existing_type=sa.String(), nullable=True)


def downgrade() -> None:
    op.alter_column("users", "password_hash", existing_type=sa.String(), nullable=False)
    op.alter_column("users", "email", existing_type=sa.String(), nullable=False)

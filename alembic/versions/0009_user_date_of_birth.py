"""add users.date_of_birth

The User model (app/models/user.py) already declares ``date_of_birth`` (used
by the profile edit form and returned by /auth/me, /users/me) but no prior
migration ever added the column, causing every phone/OTP login and profile
read to fail with ``UndefinedColumnError: column users.date_of_birth does not
exist``.

Revision ID: 0009_user_date_of_birth
Revises: 0008_phone_only_patients
Create Date: 2026-07-10

"""
from __future__ import annotations

from collections.abc import Sequence

import sqlalchemy as sa

from alembic import op

revision: str = "0009_user_date_of_birth"
down_revision: str | None = "0008_phone_only_patients"
branch_labels: str | Sequence[str] | None = None
depends_on: str | Sequence[str] | None = None


def upgrade() -> None:
    op.add_column("users", sa.Column("date_of_birth", sa.Date(), nullable=True))


def downgrade() -> None:
    op.drop_column("users", "date_of_birth")

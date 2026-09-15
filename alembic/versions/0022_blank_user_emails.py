"""coerce blank user emails to NULL

Phone-only patient accounts should have NULL email, but some rows were stored
with an empty string which breaks UserRead (EmailStr) serialization.

Revision ID: 0022_blank_user_emails
Revises: 0021_unsubscribe
Create Date: 2026-09-15

"""
from __future__ import annotations

from collections.abc import Sequence

from alembic import op

revision: str = "0022_blank_user_emails"
down_revision: str | None = "0021_unsubscribe"
branch_labels: str | Sequence[str] | None = None
depends_on: str | Sequence[str] | None = None


def upgrade() -> None:
    op.execute("UPDATE users SET email = NULL WHERE email = ''")


def downgrade() -> None:
    pass

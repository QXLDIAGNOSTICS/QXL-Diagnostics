"""Content blocks: admin-managed JSON documents for CMS sections

Adds ``content_blocks`` (key -> JSON) so the admin panel's Website,
Careers, Departments, SEO, Marketing and activity-log screens persist on the
server (and reach the public site) instead of only in the admin's browser
localStorage.

Revision ID: 0023_content_blocks
Revises: 0022_blank_user_emails
Create Date: 2026-11-01

"""
from __future__ import annotations

from collections.abc import Sequence

import sqlalchemy as sa

from alembic import op

revision: str = "0023_content_blocks"
down_revision: str | None = "0022_blank_user_emails"
branch_labels: str | Sequence[str] | None = None
depends_on: str | Sequence[str] | None = None


def upgrade() -> None:
    op.create_table(
        "content_blocks",
        sa.Column("key", sa.String(length=64), primary_key=True),
        sa.Column("data", sa.JSON(), nullable=False),
        sa.Column(
            "updated_at", sa.DateTime(timezone=True), server_default=sa.func.now(), nullable=False
        ),
    )


def downgrade() -> None:
    op.drop_table("content_blocks")

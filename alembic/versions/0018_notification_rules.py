"""Notification automation rules

Adds ``notification_rules`` so admins can configure recurring, self-running
automations from the Appointments page:
  - ``payment_reminder``: nag patients with an unpaid/pending booking every
    N days until paid.
  - ``marketing``: broadcast to every patient on file every N days (weekly,
    monthly, or any custom interval).

Both support an optional start/end date window and can be paused via
``is_active`` without deleting the rule.

Revision ID: 0018_notification_rules
Revises: 0017_widen_user_role
Create Date: 2026-07-28

"""
from __future__ import annotations

from collections.abc import Sequence

import sqlalchemy as sa
from sqlalchemy.dialects.postgresql import UUID

from alembic import op

revision: str = "0018_notification_rules"
down_revision: str | None = "0017_widen_user_role"
branch_labels: str | Sequence[str] | None = None
depends_on: str | Sequence[str] | None = None


def upgrade() -> None:
    op.create_table(
        "notification_rules",
        sa.Column("id", UUID(as_uuid=True), primary_key=True),
        sa.Column("name", sa.String(length=120), nullable=False),
        sa.Column("rule_type", sa.String(length=24), nullable=False),
        sa.Column("channel", sa.String(length=8), nullable=False, server_default="sms"),
        sa.Column("interval_days", sa.Integer(), nullable=False, server_default="7"),
        sa.Column("start_date", sa.Date(), nullable=True),
        sa.Column("end_date", sa.Date(), nullable=True),
        sa.Column("is_active", sa.Boolean(), nullable=False, server_default=sa.true()),
        sa.Column("subject", sa.String(length=200), nullable=True),
        sa.Column("message", sa.Text(), nullable=True),
        sa.Column("last_run_at", sa.DateTime(timezone=True), nullable=True),
        sa.Column("created_by", sa.String(length=120), nullable=True),
        sa.Column("created_at", sa.DateTime(timezone=True), nullable=False, server_default=sa.func.now()),
        sa.Column(
            "updated_at",
            sa.DateTime(timezone=True),
            nullable=False,
            server_default=sa.func.now(),
        ),
    )
    op.create_index("ix_notification_rules_rule_type", "notification_rules", ["rule_type"])


def downgrade() -> None:
    op.drop_index("ix_notification_rules_rule_type", table_name="notification_rules")
    op.drop_table("notification_rules")

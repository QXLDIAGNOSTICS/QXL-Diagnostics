"""Add template column + booking_reminder rule type

Adds ``notification_rules.template`` so admins can pick which canned copy
style (e.g. "reminder" vs "confirmation" for a booking-reminder rule, or
"marketing" vs "offer" for a marketing rule) is used for the per-recipient
message when a custom subject/message isn't supplied. No schema change is
needed for the new ``booking_reminder`` rule_type itself since it's just a
string value validated at the application layer.

Revision ID: 0020_notification_rules_template
Revises: 0019_booking_assignment
Create Date: 2026-07-29

"""
from __future__ import annotations

from collections.abc import Sequence

import sqlalchemy as sa

from alembic import op

revision: str = "0020_notification_rules_template"
down_revision: str | None = "0019_booking_assignment"
branch_labels: str | Sequence[str] | None = None
depends_on: str | Sequence[str] | None = None


def upgrade() -> None:
    op.add_column("notification_rules", sa.Column("template", sa.String(length=24), nullable=True))


def downgrade() -> None:
    op.drop_column("notification_rules", "template")

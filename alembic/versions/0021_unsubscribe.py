"""Unsubscribe support: contact_optouts table + bookings.unsubscribe_token

Adds:
- ``contact_optouts``: suppression list (by email/phone) checked before
  sending any automated marketing/reminder message — see
  ``app.repositories.contact_optout_repository``.
- ``bookings.unsubscribe_token``: a per-booking, non-guessable token used to
  power the one-click "Unsubscribe" link in marketing/reminder emails without
  requiring the recipient to log in.

Revision ID: 0021_unsubscribe
Revises: 0020_notification_rules_template
Create Date: 2026-07-29

"""
from __future__ import annotations

import secrets
from collections.abc import Sequence

import sqlalchemy as sa
from sqlalchemy.dialects.postgresql import UUID

from alembic import op

revision: str = "0021_unsubscribe"
down_revision: str | None = "0020_notification_rules_template"
branch_labels: str | Sequence[str] | None = None
depends_on: str | Sequence[str] | None = None


def upgrade() -> None:
    op.create_table(
        "contact_optouts",
        sa.Column("id", UUID(as_uuid=True), primary_key=True),
        sa.Column("email", sa.String(length=255), nullable=True),
        sa.Column("phone", sa.String(length=20), nullable=True),
        sa.Column("opt_out_email", sa.Boolean(), nullable=False, server_default=sa.false()),
        sa.Column("opt_out_sms", sa.Boolean(), nullable=False, server_default=sa.false()),
        sa.Column("created_at", sa.DateTime(), server_default=sa.func.now(), nullable=False),
    )
    op.create_index("ix_contact_optouts_email", "contact_optouts", ["email"])
    op.create_index("ix_contact_optouts_phone", "contact_optouts", ["phone"])

    # Nullable-first-then-backfill so existing rows get a unique token before
    # the NOT NULL + UNIQUE constraints are applied.
    op.add_column("bookings", sa.Column("unsubscribe_token", sa.String(length=40), nullable=True))
    conn = op.get_bind()
    result = conn.execute(sa.text("SELECT id FROM bookings WHERE unsubscribe_token IS NULL"))
    for (booking_id,) in result:
        conn.execute(
            sa.text("UPDATE bookings SET unsubscribe_token = :token WHERE id = :id"),
            {"token": secrets.token_urlsafe(24), "id": booking_id},
        )
    op.alter_column("bookings", "unsubscribe_token", nullable=False)
    op.create_index("ix_bookings_unsubscribe_token", "bookings", ["unsubscribe_token"], unique=True)


def downgrade() -> None:
    op.drop_index("ix_bookings_unsubscribe_token", table_name="bookings")
    op.drop_column("bookings", "unsubscribe_token")
    op.drop_index("ix_contact_optouts_phone", table_name="contact_optouts")
    op.drop_index("ix_contact_optouts_email", table_name="contact_optouts")
    op.drop_table("contact_optouts")

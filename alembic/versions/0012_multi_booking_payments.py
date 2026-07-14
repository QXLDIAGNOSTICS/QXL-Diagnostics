"""payments: support one combined payment order for multiple bookings

Adds ``payments.extra_booking_ids`` (JSON array of booking UUID strings) so a
single Razorpay order can cover several bookings created in the same
checkout/chat session — the user pays once for everything instead of once
per test/package. ``payments.booking_id`` remains the "primary" booking; any
additional bookings covered by the same payment are listed here.

Revision ID: 0012_multi_booking_payments
Revises: 0011_slugs_and_reviews
Create Date: 2026-07-10

"""
from __future__ import annotations

from collections.abc import Sequence

import sqlalchemy as sa

from alembic import op

revision: str = "0012_multi_booking_payments"
down_revision: str | None = "0011_slugs_and_reviews"
branch_labels: str | Sequence[str] | None = None
depends_on: str | Sequence[str] | None = None


def upgrade() -> None:
    op.add_column("payments", sa.Column("extra_booking_ids", sa.JSON(), nullable=True))


def downgrade() -> None:
    op.drop_column("payments", "extra_booking_ids")

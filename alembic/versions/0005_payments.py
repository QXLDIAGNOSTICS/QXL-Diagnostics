"""payments: Razorpay orders/payments table + booking payment fields

Revision ID: 0005_payments
Revises: 0004_auth_overhaul
Create Date: 2026-07-05

"""
from __future__ import annotations

from collections.abc import Sequence

import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

from alembic import op

revision: str = "0005_payments"
down_revision: str | None = "0004_auth_overhaul"
branch_labels: str | Sequence[str] | None = None
depends_on: str | Sequence[str] | None = None


def upgrade() -> None:
    op.add_column("bookings", sa.Column("amount_paise", sa.Integer(), nullable=True))
    op.add_column(
        "bookings",
        sa.Column("payment_status", sa.String(length=16), nullable=False, server_default="unpaid"),
    )
    op.create_index("ix_bookings_payment_status", "bookings", ["payment_status"])

    op.create_table(
        "payments",
        sa.Column("id", postgresql.UUID(as_uuid=True), primary_key=True),
        sa.Column("booking_id", postgresql.UUID(as_uuid=True), nullable=False),
        sa.Column("user_id", postgresql.UUID(as_uuid=True), nullable=True),
        sa.Column("razorpay_order_id", sa.String(), nullable=False),
        sa.Column("razorpay_payment_id", sa.String(), nullable=True),
        sa.Column("razorpay_signature", sa.String(), nullable=True),
        sa.Column("amount", sa.Integer(), nullable=False),
        sa.Column("currency", sa.String(length=3), nullable=False, server_default="INR"),
        sa.Column("status", sa.String(length=16), nullable=False, server_default="created"),
        sa.Column("failure_reason", sa.String(), nullable=True),
        sa.Column("paid_at", sa.DateTime(timezone=True), nullable=True),
        sa.Column("created_at", sa.DateTime(timezone=True), server_default=sa.func.now(), nullable=False),
        sa.ForeignKeyConstraint(["booking_id"], ["bookings.id"], ondelete="CASCADE"),
        sa.ForeignKeyConstraint(["user_id"], ["users.id"], ondelete="SET NULL"),
    )
    op.create_index("ix_payments_booking_id", "payments", ["booking_id"])
    op.create_index("ix_payments_user_id", "payments", ["user_id"])
    op.create_index("ix_payments_razorpay_order_id", "payments", ["razorpay_order_id"], unique=True)
    op.create_index("ix_payments_razorpay_payment_id", "payments", ["razorpay_payment_id"], unique=True)
    op.create_index("ix_payments_status", "payments", ["status"])


def downgrade() -> None:
    op.drop_index("ix_payments_status", table_name="payments")
    op.drop_index("ix_payments_razorpay_payment_id", table_name="payments")
    op.drop_index("ix_payments_razorpay_order_id", table_name="payments")
    op.drop_index("ix_payments_user_id", table_name="payments")
    op.drop_index("ix_payments_booking_id", table_name="payments")
    op.drop_table("payments")

    op.drop_index("ix_bookings_payment_status", table_name="bookings")
    op.drop_column("bookings", "payment_status")
    op.drop_column("bookings", "amount_paise")

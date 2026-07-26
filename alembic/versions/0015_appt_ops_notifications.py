"""Appointment ops fields + booking_notifications table

Adds front-desk / live-board fields to bookings (visit_type, is_delayed,
was_rescheduled, checked_in_at, in_progress_at, completed_at, updated_at)
and a new booking_notifications table for staff-triggered / automated
SMS + email (confirmation, payment, reminder, reschedule, cancellation,
offer, custom — including "send later" scheduling).

Revision ID: 0015_appt_ops_notifications
Revises: 0014_sitesettings_contact_info
Create Date: 2026-07-26

"""
from __future__ import annotations

from collections.abc import Sequence

import sqlalchemy as sa
from sqlalchemy.dialects.postgresql import UUID

from alembic import op

revision: str = "0015_appt_ops_notifications"
down_revision: str | None = "0014_sitesettings_contact_info"
branch_labels: str | Sequence[str] | None = None
depends_on: str | Sequence[str] | None = None


def upgrade() -> None:
    op.add_column(
        "bookings",
        sa.Column("visit_type", sa.String(length=16), nullable=False, server_default="scheduled"),
    )
    op.add_column(
        "bookings", sa.Column("is_delayed", sa.Boolean(), nullable=False, server_default=sa.false())
    )
    op.add_column(
        "bookings", sa.Column("was_rescheduled", sa.Boolean(), nullable=False, server_default=sa.false())
    )
    op.add_column("bookings", sa.Column("checked_in_at", sa.DateTime(timezone=True), nullable=True))
    op.add_column("bookings", sa.Column("in_progress_at", sa.DateTime(timezone=True), nullable=True))
    op.add_column("bookings", sa.Column("completed_at", sa.DateTime(timezone=True), nullable=True))
    op.add_column(
        "bookings",
        sa.Column(
            "updated_at",
            sa.DateTime(timezone=True),
            nullable=False,
            server_default=sa.func.now(),
        ),
    )
    op.create_index("ix_bookings_visit_type", "bookings", ["visit_type"])
    op.create_index("ix_bookings_patient_phone", "bookings", ["patient_phone"])

    op.create_table(
        "booking_notifications",
        sa.Column("id", UUID(as_uuid=True), primary_key=True),
        sa.Column(
            "booking_id",
            UUID(as_uuid=True),
            sa.ForeignKey("bookings.id", ondelete="CASCADE"),
            nullable=False,
        ),
        sa.Column("channel", sa.String(length=8), nullable=False),
        sa.Column("type", sa.String(length=24), nullable=False),
        sa.Column("subject", sa.String(length=200), nullable=True),
        sa.Column("message", sa.Text(), nullable=False),
        sa.Column("scheduled_at", sa.DateTime(timezone=True), nullable=True),
        sa.Column("sent_at", sa.DateTime(timezone=True), nullable=True),
        sa.Column("status", sa.String(length=16), nullable=False, server_default="pending"),
        sa.Column("error", sa.Text(), nullable=True),
        sa.Column("created_by", sa.String(length=120), nullable=True),
        sa.Column("created_at", sa.DateTime(timezone=True), nullable=False, server_default=sa.func.now()),
    )
    op.create_index("ix_booking_notifications_booking_id", "booking_notifications", ["booking_id"])
    op.create_index("ix_booking_notifications_type", "booking_notifications", ["type"])
    op.create_index("ix_booking_notifications_status", "booking_notifications", ["status"])
    op.create_index("ix_booking_notifications_scheduled_at", "booking_notifications", ["scheduled_at"])


def downgrade() -> None:
    op.drop_index("ix_booking_notifications_scheduled_at", table_name="booking_notifications")
    op.drop_index("ix_booking_notifications_status", table_name="booking_notifications")
    op.drop_index("ix_booking_notifications_type", table_name="booking_notifications")
    op.drop_index("ix_booking_notifications_booking_id", table_name="booking_notifications")
    op.drop_table("booking_notifications")

    op.drop_index("ix_bookings_patient_phone", table_name="bookings")
    op.drop_index("ix_bookings_visit_type", table_name="bookings")
    op.drop_column("bookings", "updated_at")
    op.drop_column("bookings", "completed_at")
    op.drop_column("bookings", "in_progress_at")
    op.drop_column("bookings", "checked_in_at")
    op.drop_column("bookings", "was_rescheduled")
    op.drop_column("bookings", "is_delayed")
    op.drop_column("bookings", "visit_type")

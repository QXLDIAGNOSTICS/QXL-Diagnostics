"""Booking auto-assignment

Adds ``bookings.assigned_to_id`` — the single front-desk/appointments staff
member auto-assigned to own a booking (see
``app.services.staff_assignment_service``), so exactly one staff member is
alerted/emailed per new appointment instead of the whole team, and workload
spreads evenly across whoever currently has the fewest open bookings.

Revision ID: 0019_booking_assignment
Revises: 0018_notification_rules
Create Date: 2026-07-28

"""
from __future__ import annotations

from collections.abc import Sequence

import sqlalchemy as sa
from sqlalchemy.dialects.postgresql import UUID

from alembic import op

revision: str = "0019_booking_assignment"
down_revision: str | None = "0018_notification_rules"
branch_labels: str | Sequence[str] | None = None
depends_on: str | Sequence[str] | None = None


def upgrade() -> None:
    op.add_column(
        "bookings",
        sa.Column("assigned_to_id", UUID(as_uuid=True), sa.ForeignKey("users.id", ondelete="SET NULL"), nullable=True),
    )
    op.create_index("ix_bookings_assigned_to_id", "bookings", ["assigned_to_id"])


def downgrade() -> None:
    op.drop_index("ix_bookings_assigned_to_id", table_name="bookings")
    op.drop_column("bookings", "assigned_to_id")

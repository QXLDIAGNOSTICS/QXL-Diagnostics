"""booking catalog validation fields + global knowledge-base support

Adds `bookings.test_id` (FK -> test_catalog) and `bookings.report_url` so
admins can attach a report and bookings can be validated against the real
test catalog instead of accepting freeform text. Also relaxes `files.owner_id`
and `doc_chunks.owner_id` to nullable so the admin can upload global
knowledge-base documents (not tied to a single user) that ground the chatbot
for every visitor.

Revision ID: 0007_catalog_kb_bookings
Revises: 0006_admin_elevation
Create Date: 2026-07-07

"""
from __future__ import annotations

from collections.abc import Sequence

import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

from alembic import op

revision: str = "0007_catalog_kb_bookings"
down_revision: str | None = "0006_admin_elevation"
branch_labels: str | Sequence[str] | None = None
depends_on: str | Sequence[str] | None = None


def upgrade() -> None:
    op.add_column(
        "bookings",
        sa.Column("test_id", postgresql.UUID(as_uuid=True), nullable=True),
    )
    op.create_foreign_key(
        "fk_bookings_test_id_test_catalog",
        "bookings",
        "test_catalog",
        ["test_id"],
        ["id"],
        ondelete="SET NULL",
    )
    op.add_column("bookings", sa.Column("report_url", sa.Text(), nullable=True))

    op.alter_column("files", "owner_id", existing_type=postgresql.UUID(as_uuid=True), nullable=True)
    op.alter_column("doc_chunks", "owner_id", existing_type=postgresql.UUID(as_uuid=True), nullable=True)


def downgrade() -> None:
    op.alter_column("doc_chunks", "owner_id", existing_type=postgresql.UUID(as_uuid=True), nullable=False)
    op.alter_column("files", "owner_id", existing_type=postgresql.UUID(as_uuid=True), nullable=False)

    op.drop_column("bookings", "report_url")
    op.drop_constraint("fk_bookings_test_id_test_catalog", "bookings", type_="foreignkey")
    op.drop_column("bookings", "test_id")

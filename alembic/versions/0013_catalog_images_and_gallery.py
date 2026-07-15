"""add image_url to packages/tests/centers + gallery_items table

Adds:
- health_packages.image_url
- test_catalog.image_url
- centers.image_url
- gallery_items table (admin-managed media gallery, replaces localStorage mock)

Revision ID: 0013_catalog_images_and_gallery
Revises: 0012_multi_booking_payments
Create Date: 2026-07-16

"""
from __future__ import annotations

from collections.abc import Sequence

import sqlalchemy as sa
from sqlalchemy.dialects.postgresql import UUID

from alembic import op

revision: str = "0013_catalog_images_and_gallery"
down_revision: str | None = "0012_multi_booking_payments"
branch_labels: str | Sequence[str] | None = None
depends_on: str | Sequence[str] | None = None


def upgrade() -> None:
    op.add_column("health_packages", sa.Column("image_url", sa.String(), nullable=True))
    op.add_column("test_catalog", sa.Column("image_url", sa.String(), nullable=True))
    op.add_column("centers", sa.Column("image_url", sa.String(), nullable=True))

    op.create_table(
        "gallery_items",
        sa.Column("id", UUID(as_uuid=True), primary_key=True),
        sa.Column("title", sa.String(), nullable=False),
        sa.Column("image_url", sa.String(), nullable=False),
        sa.Column("category", sa.String(), nullable=True),
        sa.Column("is_active", sa.Boolean(), nullable=False, server_default=sa.true()),
        sa.Column("sort_order", sa.Integer(), nullable=False, server_default="0"),
        sa.Column("created_at", sa.DateTime(timezone=True), server_default=sa.func.now(), nullable=False),
        sa.Column("updated_at", sa.DateTime(timezone=True), server_default=sa.func.now(), nullable=False),
    )
    op.create_index("ix_gallery_items_is_active", "gallery_items", ["is_active"])
    op.create_index("ix_gallery_items_category", "gallery_items", ["category"])


def downgrade() -> None:
    op.drop_index("ix_gallery_items_category", table_name="gallery_items")
    op.drop_index("ix_gallery_items_is_active", table_name="gallery_items")
    op.drop_table("gallery_items")
    op.drop_column("centers", "image_url")
    op.drop_column("test_catalog", "image_url")
    op.drop_column("health_packages", "image_url")

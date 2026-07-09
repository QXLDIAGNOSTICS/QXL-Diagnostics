"""add slugs to doctors/centers + reviews table

Adds:
- doctors.slug (unique, backfilled from existing names)
- centers.slug (unique, backfilled from existing names)
- reviews table (patient testimonials/ratings for AggregateRating schema)

Revision ID: 0011_slugs_and_reviews
Revises: 0010_home_collection_session
Create Date: 2026-07-10

"""
from __future__ import annotations

from collections.abc import Sequence

import sqlalchemy as sa
from sqlalchemy.dialects.postgresql import UUID

from alembic import op

revision: str = "0011_slugs_and_reviews"
down_revision: str | None = "0010_home_collection_session"
branch_labels: str | Sequence[str] | None = None
depends_on: str | Sequence[str] | None = None


def upgrade() -> None:
    op.add_column("doctors", sa.Column("slug", sa.String(), nullable=True))
    op.add_column("centers", sa.Column("slug", sa.String(), nullable=True))

    # Backfill slugs for any existing rows from their name, appending a
    # short id suffix to guarantee uniqueness even if names collide.
    op.execute(
        """
        UPDATE doctors
        SET slug = lower(regexp_replace(regexp_replace(name, '[^a-zA-Z0-9]+', '-', 'g'), '(^-+|-+$)', '', 'g'))
            || '-' || substr(id::text, 1, 8)
        WHERE slug IS NULL
        """
    )
    op.execute(
        """
        UPDATE centers
        SET slug = lower(regexp_replace(regexp_replace(name, '[^a-zA-Z0-9]+', '-', 'g'), '(^-+|-+$)', '', 'g'))
            || '-' || substr(id::text, 1, 8)
        WHERE slug IS NULL
        """
    )

    op.alter_column("doctors", "slug", nullable=False)
    op.alter_column("centers", "slug", nullable=False)
    op.create_unique_constraint("uq_doctors_slug", "doctors", ["slug"])
    op.create_index("ix_doctors_slug", "doctors", ["slug"], unique=False)
    op.create_unique_constraint("uq_centers_slug", "centers", ["slug"])
    op.create_index("ix_centers_slug", "centers", ["slug"], unique=False)

    op.create_table(
        "reviews",
        sa.Column("id", UUID(as_uuid=True), primary_key=True),
        sa.Column("author_name", sa.String(), nullable=False),
        sa.Column("rating", sa.Integer(), nullable=False),
        sa.Column("content", sa.Text(), nullable=False),
        sa.Column("source", sa.String(length=32), nullable=True),
        sa.Column("is_published", sa.Boolean(), nullable=False, server_default=sa.true()),
        sa.Column("sort_order", sa.Integer(), nullable=False, server_default="0"),
        sa.Column("created_at", sa.DateTime(timezone=True), server_default=sa.func.now(), nullable=False),
        sa.Column("updated_at", sa.DateTime(timezone=True), server_default=sa.func.now(), nullable=False),
    )
    op.create_index("ix_reviews_is_published", "reviews", ["is_published"])


def downgrade() -> None:
    op.drop_index("ix_reviews_is_published", table_name="reviews")
    op.drop_table("reviews")
    op.drop_index("ix_centers_slug", table_name="centers")
    op.drop_constraint("uq_centers_slug", "centers", type_="unique")
    op.drop_index("ix_doctors_slug", table_name="doctors")
    op.drop_constraint("uq_doctors_slug", "doctors", type_="unique")
    op.drop_column("centers", "slug")
    op.drop_column("doctors", "slug")

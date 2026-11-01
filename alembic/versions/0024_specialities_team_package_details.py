"""Specialities table, team fields on doctors, rich fields on health packages

The public site hard-coded its speciality pages, the founder/consultant team
page and the full package catalogue. This adds the columns/tables the admin
panel needs to manage them:

* ``specialities`` - one row per /specialities/<slug> landing page
* ``doctors`` - role line, founder flag, experience/expertise/etc.
* ``health_packages`` - category, homepage / most-booked / contact-for-price flags and a
  JSON ``details`` document (fasting, TAT, sample type, breakdown, ...)

Revision ID: 0024_specialities_team_pkg
Revises: 0023_content_blocks
Create Date: 2026-11-02

"""

from __future__ import annotations

from collections.abc import Sequence

import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

from alembic import op

revision: str = "0024_specialities_team_pkg"
down_revision: str | None = "0023_content_blocks"
branch_labels: str | Sequence[str] | None = None
depends_on: str | Sequence[str] | None = None


def upgrade() -> None:
    op.create_table(
        "specialities",
        sa.Column("id", postgresql.UUID(as_uuid=True), primary_key=True),
        sa.Column("name", sa.String(), nullable=False),
        sa.Column("slug", sa.String(), nullable=False),
        sa.Column("card_image_url", sa.String(), nullable=True),
        sa.Column("hero_image_url", sa.String(), nullable=True),
        sa.Column("hero_title", sa.String(), nullable=True),
        sa.Column("hero_description", sa.Text(), nullable=True),
        sa.Column("intro", sa.Text(), nullable=True),
        sa.Column("who_should_take", sa.JSON(), nullable=True),
        sa.Column("profiles", sa.JSON(), nullable=True),
        sa.Column("clinician_notes", sa.JSON(), nullable=True),
        sa.Column("disclaimer", sa.Text(), nullable=True),
        sa.Column("callout", sa.JSON(), nullable=True),
        sa.Column("why_choose", sa.JSON(), nullable=True),
        sa.Column("faqs", sa.JSON(), nullable=True),
        sa.Column("cta_title", sa.String(), nullable=True),
        sa.Column("cta_text", sa.Text(), nullable=True),
        sa.Column("directory", sa.JSON(), nullable=True),
        sa.Column("help_title", sa.String(), nullable=True),
        sa.Column("help_text", sa.Text(), nullable=True),
        sa.Column("seo_title", sa.String(), nullable=True),
        sa.Column("seo_description", sa.Text(), nullable=True),
        sa.Column("is_active", sa.Boolean(), server_default=sa.true(), nullable=False),
        sa.Column("sort_order", sa.Integer(), server_default="0", nullable=False),
        sa.Column(
            "created_at", sa.DateTime(timezone=True), server_default=sa.func.now(), nullable=False
        ),
        sa.Column(
            "updated_at", sa.DateTime(timezone=True), server_default=sa.func.now(), nullable=False
        ),
    )
    op.create_index("ix_specialities_slug", "specialities", ["slug"], unique=True)
    op.create_index("ix_specialities_is_active", "specialities", ["is_active"])

    op.add_column("doctors", sa.Column("title", sa.String(), nullable=True))
    op.add_column(
        "doctors", sa.Column("is_founder", sa.Boolean(), server_default=sa.false(), nullable=False)
    )
    op.add_column("doctors", sa.Column("experience", sa.String(), nullable=True))
    op.add_column("doctors", sa.Column("expertise", sa.Text(), nullable=True))
    op.add_column("doctors", sa.Column("achievements", sa.Text(), nullable=True))
    op.add_column("doctors", sa.Column("contribution", sa.Text(), nullable=True))
    op.add_column("doctors", sa.Column("department", sa.String(), nullable=True))
    op.add_column("doctors", sa.Column("registration_number", sa.String(), nullable=True))
    op.add_column("doctors", sa.Column("card_qualification", sa.String(), nullable=True))
    op.add_column("doctors", sa.Column("card_image_url", sa.String(), nullable=True))
    op.add_column("doctors", sa.Column("short_title", sa.String(), nullable=True))
    op.add_column("doctors", sa.Column("profile_path", sa.String(), nullable=True))
    op.add_column("doctors", sa.Column("image_position", sa.String(length=32), nullable=True))

    op.add_column("health_packages", sa.Column("category", sa.String(), nullable=True))
    op.add_column(
        "health_packages",
        sa.Column("show_on_home", sa.Boolean(), server_default=sa.false(), nullable=False),
    )
    op.add_column(
        "health_packages",
        sa.Column("most_booked", sa.Boolean(), server_default=sa.false(), nullable=False),
    )
    op.add_column(
        "health_packages",
        sa.Column("contact_for_price", sa.Boolean(), server_default=sa.false(), nullable=False),
    )
    op.add_column("health_packages", sa.Column("details", sa.JSON(), nullable=True))
    op.create_index("ix_health_packages_category", "health_packages", ["category"])


def downgrade() -> None:
    op.drop_index("ix_health_packages_category", table_name="health_packages")
    for col in ("details", "contact_for_price", "most_booked", "show_on_home", "category"):
        op.drop_column("health_packages", col)
    for col in (
        "image_position",
        "profile_path",
        "short_title",
        "card_image_url",
        "card_qualification",
        "registration_number",
        "department",
        "contribution",
        "achievements",
        "expertise",
        "experience",
        "is_founder",
        "title",
    ):
        op.drop_column("doctors", col)
    op.drop_index("ix_specialities_is_active", table_name="specialities")
    op.drop_index("ix_specialities_slug", table_name="specialities")
    op.drop_table("specialities")

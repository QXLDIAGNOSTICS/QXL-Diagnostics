"""add centers, health_packages, test_catalog, bookings, prescriptions,
   blog_posts, banners, doctors, faqs, collaboration_leads, contact_inquiries

Revision ID: 0003_domain_tables
Revises: 0002_sessions_and_role
Create Date: 2026-07-03
"""
from __future__ import annotations

from collections.abc import Sequence

import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

from alembic import op

revision: str = "0003_domain_tables"
down_revision: str | None = "0002_sessions_and_role"
branch_labels: str | Sequence[str] | None = None
depends_on: str | Sequence[str] | None = None


def upgrade() -> None:
    # ── Centers ────────────────────────────────────────────────────────────────
    op.create_table(
        "centers",
        sa.Column("id", postgresql.UUID(as_uuid=True), primary_key=True),
        sa.Column("name", sa.String(), nullable=False),
        sa.Column("address", sa.String(), nullable=False),
        sa.Column("city", sa.String(), nullable=False),
        sa.Column("phone", sa.String(), nullable=True),
        sa.Column("hours", sa.String(), nullable=True),
        sa.Column("lat", sa.Numeric(10, 7), nullable=True),
        sa.Column("lng", sa.Numeric(10, 7), nullable=True),
        sa.Column("is_nabl", sa.Boolean(), nullable=False, server_default=sa.false()),
        sa.Column("is_active", sa.Boolean(), nullable=False, server_default=sa.true()),
        sa.Column("sort_order", sa.Integer(), nullable=False, server_default="0"),
        sa.Column("created_at", sa.DateTime(timezone=True), server_default=sa.func.now(), nullable=False),
    )
    op.create_index("ix_centers_city", "centers", ["city"])
    op.create_index("ix_centers_is_active", "centers", ["is_active"])

    # ── Health Packages ────────────────────────────────────────────────────────
    op.create_table(
        "health_packages",
        sa.Column("id", postgresql.UUID(as_uuid=True), primary_key=True),
        sa.Column("name", sa.String(), nullable=False),
        sa.Column("slug", sa.String(), nullable=False),
        sa.Column("tag", sa.String(32), nullable=True),
        sa.Column("price", sa.Integer(), nullable=False),
        sa.Column("old_price", sa.Integer(), nullable=True),
        sa.Column("save_amount", sa.Integer(), nullable=True),
        sa.Column("parameters", sa.String(), nullable=True),
        sa.Column("includes", sa.Text(), nullable=True),
        sa.Column("benefits", sa.Text(), nullable=True),
        sa.Column("who_should_take", sa.Text(), nullable=True),
        sa.Column("age_group", sa.String(32), nullable=True),
        sa.Column("gender", sa.String(32), nullable=True),
        sa.Column("doctor_recommended", sa.Boolean(), nullable=False, server_default=sa.false()),
        sa.Column("is_active", sa.Boolean(), nullable=False, server_default=sa.true()),
        sa.Column("sort_order", sa.Integer(), nullable=False, server_default="0"),
        sa.Column("created_at", sa.DateTime(timezone=True), server_default=sa.func.now(), nullable=False),
    )
    op.create_index("ix_health_packages_slug", "health_packages", ["slug"], unique=True)
    op.create_index("ix_health_packages_name", "health_packages", ["name"])
    op.create_index("ix_health_packages_is_active", "health_packages", ["is_active"])

    # ── Test Catalog ───────────────────────────────────────────────────────────
    op.create_table(
        "test_catalog",
        sa.Column("id", postgresql.UUID(as_uuid=True), primary_key=True),
        sa.Column("name", sa.String(), nullable=False),
        sa.Column("slug", sa.String(), nullable=False),
        sa.Column("category", sa.String(), nullable=True),
        sa.Column("description", sa.Text(), nullable=True),
        sa.Column("price", sa.Integer(), nullable=True),
        sa.Column("preparation", sa.Text(), nullable=True),
        sa.Column("turnaround_hours", sa.Integer(), nullable=True),
        sa.Column("is_active", sa.Boolean(), nullable=False, server_default=sa.true()),
        sa.Column("created_at", sa.DateTime(timezone=True), server_default=sa.func.now(), nullable=False),
    )
    op.create_index("ix_test_catalog_slug", "test_catalog", ["slug"], unique=True)
    op.create_index("ix_test_catalog_name", "test_catalog", ["name"])
    op.create_index("ix_test_catalog_category", "test_catalog", ["category"])

    # ── Bookings ───────────────────────────────────────────────────────────────
    op.create_table(
        "bookings",
        sa.Column("id", postgresql.UUID(as_uuid=True), primary_key=True),
        sa.Column("user_id", postgresql.UUID(as_uuid=True), nullable=True),
        sa.Column("patient_name", sa.String(), nullable=False),
        sa.Column("patient_phone", sa.String(), nullable=False),
        sa.Column("patient_email", sa.String(), nullable=True),
        sa.Column("patient_age", sa.Integer(), nullable=True),
        sa.Column("patient_gender", sa.String(8), nullable=True),
        sa.Column("test_name", sa.String(), nullable=True),
        sa.Column("package_id", postgresql.UUID(as_uuid=True), nullable=True),
        sa.Column("center_id", postgresql.UUID(as_uuid=True), nullable=True),
        sa.Column("collection_type", sa.String(16), nullable=False, server_default="home"),
        sa.Column("collection_address", sa.Text(), nullable=True),
        sa.Column("preferred_date", sa.String(), nullable=True),
        sa.Column("preferred_time", sa.String(), nullable=True),
        sa.Column("status", sa.String(24), nullable=False, server_default="pending"),
        sa.Column("notes", sa.Text(), nullable=True),
        sa.Column("is_urgent", sa.Boolean(), nullable=False, server_default=sa.false()),
        sa.Column("created_at", sa.DateTime(timezone=True), server_default=sa.func.now(), nullable=False),
        sa.ForeignKeyConstraint(["user_id"], ["users.id"], ondelete="SET NULL"),
        sa.ForeignKeyConstraint(["package_id"], ["health_packages.id"], ondelete="SET NULL"),
        sa.ForeignKeyConstraint(["center_id"], ["centers.id"], ondelete="SET NULL"),
    )
    op.create_index("ix_bookings_user_id", "bookings", ["user_id"])
    op.create_index("ix_bookings_status", "bookings", ["status"])

    # ── Prescriptions ──────────────────────────────────────────────────────────
    op.create_table(
        "prescriptions",
        sa.Column("id", postgresql.UUID(as_uuid=True), primary_key=True),
        sa.Column("user_id", postgresql.UUID(as_uuid=True), nullable=False),
        sa.Column("file_id", postgresql.UUID(as_uuid=True), nullable=True),
        sa.Column("filename", sa.String(), nullable=False),
        sa.Column("content_type", sa.String(), nullable=False),
        sa.Column("analysis_json", sa.Text(), nullable=True),
        sa.Column("analysis_status", sa.String(16), nullable=False, server_default="pending"),
        sa.Column("error_message", sa.Text(), nullable=True),
        sa.Column("created_at", sa.DateTime(timezone=True), server_default=sa.func.now(), nullable=False),
        sa.ForeignKeyConstraint(["user_id"], ["users.id"], ondelete="CASCADE"),
        sa.ForeignKeyConstraint(["file_id"], ["files.id"], ondelete="SET NULL"),
    )
    op.create_index("ix_prescriptions_user_id", "prescriptions", ["user_id"])

    # ── Doctors ────────────────────────────────────────────────────────────────
    op.create_table(
        "doctors",
        sa.Column("id", postgresql.UUID(as_uuid=True), primary_key=True),
        sa.Column("name", sa.String(), nullable=False),
        sa.Column("qualification", sa.String(), nullable=True),
        sa.Column("specialization", sa.String(), nullable=True),
        sa.Column("bio", sa.Text(), nullable=True),
        sa.Column("image_url", sa.String(), nullable=True),
        sa.Column("is_active", sa.Boolean(), nullable=False, server_default=sa.true()),
        sa.Column("sort_order", sa.Integer(), nullable=False, server_default="0"),
        sa.Column("created_at", sa.DateTime(timezone=True), server_default=sa.func.now(), nullable=False),
    )

    # ── Banners ────────────────────────────────────────────────────────────────
    op.create_table(
        "banners",
        sa.Column("id", postgresql.UUID(as_uuid=True), primary_key=True),
        sa.Column("title", sa.String(), nullable=True),
        sa.Column("title_accent", sa.String(), nullable=True),
        sa.Column("subtitle", sa.String(), nullable=True),
        sa.Column("subtitle_accent", sa.String(), nullable=True),
        sa.Column("description", sa.Text(), nullable=True),
        sa.Column("badge", sa.String(32), nullable=True),
        sa.Column("cta_label", sa.String(64), nullable=True),
        sa.Column("cta_link", sa.String(), nullable=True),
        sa.Column("cta_secondary_label", sa.String(64), nullable=True),
        sa.Column("cta_secondary_link", sa.String(), nullable=True),
        sa.Column("image_url", sa.String(), nullable=True),
        sa.Column("image_fit", sa.String(16), nullable=True),
        sa.Column("image_only", sa.Boolean(), nullable=False, server_default=sa.false()),
        sa.Column("bg_from", sa.String(16), nullable=True),
        sa.Column("bg_to", sa.String(16), nullable=True),
        sa.Column("features", sa.Text(), nullable=True),
        sa.Column("is_active", sa.Boolean(), nullable=False, server_default=sa.true()),
        sa.Column("sort_order", sa.Integer(), nullable=False, server_default="0"),
        sa.Column("created_at", sa.DateTime(timezone=True), server_default=sa.func.now(), nullable=False),
    )

    # ── Blog Posts ─────────────────────────────────────────────────────────────
    op.create_table(
        "blog_posts",
        sa.Column("id", postgresql.UUID(as_uuid=True), primary_key=True),
        sa.Column("title", sa.String(), nullable=False),
        sa.Column("slug", sa.String(), nullable=False),
        sa.Column("excerpt", sa.Text(), nullable=True),
        sa.Column("content", sa.Text(), nullable=True),
        sa.Column("author", sa.String(), nullable=True),
        sa.Column("category", sa.String(), nullable=True),
        sa.Column("image_url", sa.String(), nullable=True),
        sa.Column("tags", sa.Text(), nullable=True),
        sa.Column("is_published", sa.Boolean(), nullable=False, server_default=sa.false()),
        sa.Column("sort_order", sa.Integer(), nullable=False, server_default="0"),
        sa.Column("created_at", sa.DateTime(timezone=True), server_default=sa.func.now(), nullable=False),
    )
    op.create_index("ix_blog_posts_slug", "blog_posts", ["slug"], unique=True)
    op.create_index("ix_blog_posts_is_published", "blog_posts", ["is_published"])

    # ── FAQs ───────────────────────────────────────────────────────────────────
    op.create_table(
        "faqs",
        sa.Column("id", postgresql.UUID(as_uuid=True), primary_key=True),
        sa.Column("question", sa.Text(), nullable=False),
        sa.Column("answer", sa.Text(), nullable=False),
        sa.Column("category", sa.String(), nullable=True),
        sa.Column("is_active", sa.Boolean(), nullable=False, server_default=sa.true()),
        sa.Column("sort_order", sa.Integer(), nullable=False, server_default="0"),
        sa.Column("created_at", sa.DateTime(timezone=True), server_default=sa.func.now(), nullable=False),
    )
    op.create_index("ix_faqs_category", "faqs", ["category"])

    # ── Collaboration Leads ────────────────────────────────────────────────────
    op.create_table(
        "collaboration_leads",
        sa.Column("id", postgresql.UUID(as_uuid=True), primary_key=True),
        sa.Column("name", sa.String(), nullable=False),
        sa.Column("email", sa.String(), nullable=True),
        sa.Column("phone", sa.String(), nullable=False),
        sa.Column("city", sa.String(), nullable=True),
        sa.Column("interest", sa.String(), nullable=True),
        sa.Column("message", sa.Text(), nullable=True),
        sa.Column("is_read", sa.Boolean(), nullable=False, server_default=sa.false()),
        sa.Column("notes", sa.Text(), nullable=True),
        sa.Column("created_at", sa.DateTime(timezone=True), server_default=sa.func.now(), nullable=False),
    )
    op.create_index("ix_collaboration_leads_is_read", "collaboration_leads", ["is_read"])

    # ── Contact Inquiries ──────────────────────────────────────────────────────
    op.create_table(
        "contact_inquiries",
        sa.Column("id", postgresql.UUID(as_uuid=True), primary_key=True),
        sa.Column("name", sa.String(), nullable=False),
        sa.Column("email", sa.String(), nullable=True),
        sa.Column("phone", sa.String(), nullable=True),
        sa.Column("subject", sa.String(), nullable=True),
        sa.Column("message", sa.Text(), nullable=False),
        sa.Column("is_read", sa.Boolean(), nullable=False, server_default=sa.false()),
        sa.Column("created_at", sa.DateTime(timezone=True), server_default=sa.func.now(), nullable=False),
    )
    op.create_index("ix_contact_inquiries_is_read", "contact_inquiries", ["is_read"])


def downgrade() -> None:
    op.drop_table("contact_inquiries")
    op.drop_table("collaboration_leads")
    op.drop_table("faqs")
    op.drop_table("blog_posts")
    op.drop_table("banners")
    op.drop_table("doctors")
    op.drop_table("prescriptions")
    op.drop_table("bookings")
    op.drop_table("test_catalog")
    op.drop_table("health_packages")
    op.drop_table("centers")

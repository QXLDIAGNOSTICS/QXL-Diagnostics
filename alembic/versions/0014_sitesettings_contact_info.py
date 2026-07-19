"""Create site_settings with contact info fields

Creates the singleton ``site_settings`` table, including the
admin-configurable contact fields:
- phone_display: Human-readable phone format (e.g., "+91 99646 39639")
- phone_e164: E.164 format for tel: links (e.g., "+919964639639")
- whatsapp_number: WhatsApp business number (e.g., "919964639639")

These replace the hardcoded values in the frontend businessInfo.ts

Revision ID: 0014_sitesettings_contact_info
Revises: 0013_catalog_images_and_gallery
Create Date: 2026-07-19

"""
from __future__ import annotations

from collections.abc import Sequence

import sqlalchemy as sa

from alembic import op

revision: str = "0014_sitesettings_contact_info"
down_revision: str | None = "0013_catalog_images_and_gallery"
branch_labels: str | Sequence[str] | None = None
depends_on: str | Sequence[str] | None = None


def upgrade() -> None:
    op.create_table(
        "site_settings",
        sa.Column("id", sa.Integer(), primary_key=True, server_default="1"),
        sa.Column("theme_primary", sa.String(length=16), nullable=False, server_default="#2563eb"),
        sa.Column("theme_secondary", sa.String(length=16), nullable=False, server_default="#0d2e42"),
        sa.Column("maintenance_mode", sa.Boolean(), nullable=False, server_default=sa.false()),
        sa.Column("cookie_banner", sa.Boolean(), nullable=False, server_default=sa.true()),
        sa.Column("ai_chat_enabled", sa.Boolean(), nullable=False, server_default=sa.true()),
        sa.Column("announcement", sa.Text(), nullable=True),
        sa.Column("custom_scripts", sa.Text(), nullable=True),
        sa.Column("live_chat_widget_id", sa.String(), nullable=True),
        sa.Column("phone_display", sa.String(length=20), nullable=False, server_default="+91 99646 39639"),
        sa.Column("phone_e164", sa.String(length=20), nullable=False, server_default="+919964639639"),
        sa.Column("whatsapp_number", sa.String(length=20), nullable=False, server_default="919964639639"),
        sa.Column("created_at", sa.DateTime(timezone=True), nullable=False, server_default=sa.func.now()),
    )


def downgrade() -> None:
    op.drop_table("site_settings")

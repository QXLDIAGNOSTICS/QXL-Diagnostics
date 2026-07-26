"""Custom roles + permissions table

Adds ``custom_roles`` so the super admin can create staff roles beyond the
built-in set and grant fine-grained feature permissions per role. Seeds the
7 built-in roles (front_office, staff, reception, marketing, sales, admin,
super_admin) as ``is_system=True`` rows with their existing default
permission sets so nothing changes for existing accounts.

Revision ID: 0016_custom_roles
Revises: 0015_appt_ops_notifications
Create Date: 2026-07-27

"""
from __future__ import annotations

import uuid
from collections.abc import Sequence

import sqlalchemy as sa
from sqlalchemy.dialects.postgresql import UUID

from alembic import op

revision: str = "0016_custom_roles"
down_revision: str | None = "0015_appt_ops_notifications"
branch_labels: str | Sequence[str] | None = None
depends_on: str | Sequence[str] | None = None

FRONT_DESK_PERMS = [
    "appointments.view",
    "appointments.manage",
    "appointments.notify",
    "patients.view",
    "home_collection.manage",
    "enquiries.manage",
]

ADMIN_PERMS = [
    "appointments.view",
    "appointments.manage",
    "appointments.delete",
    "appointments.export",
    "appointments.notify",
    "patients.view",
    "home_collection.manage",
    "enquiries.manage",
    "website.manage",
    "seo.manage",
    "knowledge_base.manage",
    "marketing.manage",
    "reports.view",
    "analytics.view",
    "users.manage",
    "settings.manage",
]

SUPER_ADMIN_PERMS = [*ADMIN_PERMS, "roles.manage"]

SEED_ROLES = [
    ("front_office", "Front Office", "staff", FRONT_DESK_PERMS),
    ("staff", "Staff", "staff", FRONT_DESK_PERMS),
    ("reception", "Reception", "staff", FRONT_DESK_PERMS),
    ("marketing", "Marketing", "staff", FRONT_DESK_PERMS),
    ("sales", "Sales", "staff", FRONT_DESK_PERMS),
    ("admin", "Administrator", "admin", ADMIN_PERMS),
    ("super_admin", "Super Admin", "admin", SUPER_ADMIN_PERMS),
]


def upgrade() -> None:
    custom_roles = op.create_table(
        "custom_roles",
        sa.Column("id", UUID(as_uuid=True), primary_key=True),
        sa.Column("key", sa.String(length=40), nullable=False, unique=True, index=True),
        sa.Column("label", sa.String(length=80), nullable=False),
        sa.Column("tier", sa.String(length=20), nullable=False, server_default="staff"),
        sa.Column("permissions", sa.JSON(), nullable=False),
        sa.Column("is_system", sa.Boolean(), nullable=False, server_default=sa.false()),
        sa.Column("created_at", sa.DateTime(timezone=True), server_default=sa.func.now(), nullable=False),
        sa.Column("updated_at", sa.DateTime(timezone=True), server_default=sa.func.now(), nullable=False),
    )

    op.bulk_insert(
        custom_roles,
        [
            {
                "id": uuid.uuid4(),
                "key": key,
                "label": label,
                "tier": tier,
                "permissions": perms,
                "is_system": True,
            }
            for key, label, tier, perms in SEED_ROLES
        ],
    )


def downgrade() -> None:
    op.drop_table("custom_roles")

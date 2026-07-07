"""auth overhaul: remove auth0_sub, add password/phone/2FA fields, login_challenges

Revision ID: 0004_auth_overhaul
Revises: 0003_domain_tables
Create Date: 2026-07-04

"""
from __future__ import annotations

from collections.abc import Sequence

import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

from alembic import op

revision: str = "0004_auth_overhaul"
down_revision: str | None = "0003_domain_tables"
branch_labels: str | Sequence[str] | None = None
depends_on: str | Sequence[str] | None = None


def upgrade() -> None:
    # --- users: drop Auth0 identity column, add password/phone/2FA fields ---
    op.drop_index("ix_users_auth0_sub", table_name="users")
    op.drop_column("users", "auth0_sub")

    op.add_column("users", sa.Column("phone", sa.String(), nullable=False, server_default=""))
    op.add_column("users", sa.Column("password_hash", sa.String(), nullable=False, server_default=""))
    op.add_column(
        "users",
        sa.Column("is_email_verified", sa.Boolean(), nullable=False, server_default=sa.false()),
    )
    op.add_column(
        "users",
        sa.Column("is_phone_verified", sa.Boolean(), nullable=False, server_default=sa.false()),
    )
    op.add_column(
        "users",
        sa.Column("failed_login_attempts", sa.Integer(), nullable=False, server_default="0"),
    )
    op.add_column("users", sa.Column("locked_until", sa.DateTime(timezone=True), nullable=True))

    # email becomes required (was nullable under Auth0)
    op.alter_column("users", "email", existing_type=sa.String(), nullable=False)

    op.drop_index("ix_users_email", table_name="users")
    op.create_index("ix_users_email", "users", ["email"], unique=True)
    op.create_index("ix_users_phone", "users", ["phone"], unique=True)

    # server_default values above were only to backfill existing rows; drop them
    # so the ORM's explicit values are required going forward.
    op.alter_column("users", "phone", server_default=None)
    op.alter_column("users", "password_hash", server_default=None)

    # --- login_challenges: OTP + SMS-link 2FA handshake ---
    op.create_table(
        "login_challenges",
        sa.Column("id", postgresql.UUID(as_uuid=True), primary_key=True),
        sa.Column("user_id", postgresql.UUID(as_uuid=True), nullable=False),
        sa.Column("otp_hash", sa.String(length=64), nullable=False),
        sa.Column("otp_expires_at", sa.DateTime(timezone=True), nullable=False),
        sa.Column("otp_attempts", sa.Integer(), nullable=False, server_default="0"),
        sa.Column("otp_verified_at", sa.DateTime(timezone=True), nullable=True),
        sa.Column("link_token_hash", sa.String(length=64), nullable=False),
        sa.Column("link_expires_at", sa.DateTime(timezone=True), nullable=False),
        sa.Column("link_verified_at", sa.DateTime(timezone=True), nullable=True),
        sa.Column("ip_address", sa.String(), nullable=True),
        sa.Column("user_agent", sa.String(), nullable=True),
        sa.Column("consumed_at", sa.DateTime(timezone=True), nullable=True),
        sa.Column("invalidated", sa.Boolean(), nullable=False, server_default=sa.false()),
        sa.Column("created_at", sa.DateTime(timezone=True), server_default=sa.func.now(), nullable=False),
        sa.ForeignKeyConstraint(["user_id"], ["users.id"], ondelete="CASCADE"),
    )
    op.create_index("ix_login_challenges_user_id", "login_challenges", ["user_id"])
    op.create_index(
        "ix_login_challenges_link_token_hash", "login_challenges", ["link_token_hash"], unique=True
    )


def downgrade() -> None:
    op.drop_index("ix_login_challenges_link_token_hash", table_name="login_challenges")
    op.drop_index("ix_login_challenges_user_id", table_name="login_challenges")
    op.drop_table("login_challenges")

    op.drop_index("ix_users_phone", table_name="users")
    op.drop_index("ix_users_email", table_name="users")
    op.create_index("ix_users_email", "users", ["email"])
    op.alter_column("users", "email", existing_type=sa.String(), nullable=True)

    op.drop_column("users", "locked_until")
    op.drop_column("users", "failed_login_attempts")
    op.drop_column("users", "is_phone_verified")
    op.drop_column("users", "is_email_verified")
    op.drop_column("users", "password_hash")
    op.drop_column("users", "phone")

    op.add_column("users", sa.Column("auth0_sub", sa.String(), nullable=False, server_default=""))
    op.alter_column("users", "auth0_sub", server_default=None)
    op.create_index("ix_users_auth0_sub", "users", ["auth0_sub"], unique=True)

"""Canonical staff / admin roles and permission helpers.

Roles live as strings on ``User.role`` (no DB enum) so we can add staff
roles without a migration. Authorization decisions should go through these
helpers rather than ad-hoc string compares.
"""
from __future__ import annotations

from typing import Iterable

# Public patient accounts (self-register on the marketing site).
ROLE_PATIENT = "patient"

# Front-desk / departmental staff — appointments desk access only. These all
# carry the same permissions (see STAFF_ROLES below); they exist as distinct
# values purely so admins can label accounts by department/job title.
ROLE_FRONT_OFFICE = "front_office"
ROLE_STAFF = "staff"
ROLE_RECEPTION = "reception"
ROLE_MARKETING = "marketing"
ROLE_SALES = "sales"

# Full CMS + appointments administrators.
ROLE_ADMIN = "admin"

# Platform owners — user provisioning, role changes, danger-zone actions.
ROLE_SUPER_ADMIN = "super_admin"

# All front-desk/departmental staff roles (same permission tier as front_office).
FRONT_DESK_ROLES: frozenset[str] = frozenset(
    {ROLE_FRONT_OFFICE, ROLE_STAFF, ROLE_RECEPTION, ROLE_MARKETING, ROLE_SALES}
)

ALL_ROLES: frozenset[str] = frozenset(
    {ROLE_PATIENT, ROLE_ADMIN, ROLE_SUPER_ADMIN} | FRONT_DESK_ROLES
)

# Anyone who may log into the admin panel (admin.qxldiagnostics.com).
STAFF_ROLES: frozenset[str] = frozenset(FRONT_DESK_ROLES | {ROLE_ADMIN, ROLE_SUPER_ADMIN})

# Full CMS managers (everything except some super-admin-only user ops).
ADMIN_ROLES: frozenset[str] = frozenset({ROLE_ADMIN, ROLE_SUPER_ADMIN})

# Roles that require the shared ADMIN_ACCESS_KEY during OTP login. Only the
# platform owner (super_admin) is gated — every other staff role (admin,
# front office, staff, reception, marketing, sales) logs in with just
# identifier + password + OTP.
SECRET_GATED_ROLES: frozenset[str] = frozenset({ROLE_SUPER_ADMIN})

# Roles an administrator may assign when creating / updating users.
# super_admin may assign any non-patient staff role; admin may only mint
# front-desk/departmental roles (not admin/super_admin).
CREATABLE_BY_ADMIN: frozenset[str] = FRONT_DESK_ROLES
CREATABLE_BY_SUPER_ADMIN: frozenset[str] = frozenset({ROLE_PATIENT, ROLE_ADMIN} | FRONT_DESK_ROLES)

# Human-readable labels for the Users UI.
ROLE_LABELS: dict[str, str] = {
    ROLE_PATIENT: "Patient",
    ROLE_FRONT_OFFICE: "Front Office",
    ROLE_STAFF: "Staff",
    ROLE_RECEPTION: "Reception",
    ROLE_MARKETING: "Marketing",
    ROLE_SALES: "Sales",
    ROLE_ADMIN: "Administrator",
    ROLE_SUPER_ADMIN: "Super Admin",
}


def is_staff(role: str | None) -> bool:
    return role in STAFF_ROLES


def is_admin(role: str | None) -> bool:
    return role in ADMIN_ROLES


def is_super_admin(role: str | None) -> bool:
    return role == ROLE_SUPER_ADMIN


async def _custom_role_tier(db, role: str | None) -> str | None:
    """Look up the ``tier`` of a super-admin-defined custom role, if any."""
    if not role:
        return None
    from sqlalchemy import select

    from app.models.role import CustomRole

    row = (await db.execute(select(CustomRole).where(CustomRole.key == role))).scalar_one_or_none()
    return row.tier if row else None


async def is_staff_async(db, role: str | None) -> bool:
    """Like :func:`is_staff` but also recognises super-admin-created custom
    roles (looked up from the ``custom_roles`` table)."""
    if is_staff(role):
        return True
    tier = await _custom_role_tier(db, role)
    return tier in ("staff", "admin")


async def is_admin_async(db, role: str | None) -> bool:
    """Like :func:`is_admin` but also recognises custom roles with an
    ``admin``-tier permission set."""
    if is_admin(role):
        return True
    tier = await _custom_role_tier(db, role)
    return tier == "admin"


def can_manage_cms(role: str | None) -> bool:
    """Website / catalog / content management."""
    return role in ADMIN_ROLES


def can_manage_appointments(role: str | None) -> bool:
    return role in STAFF_ROLES


def can_delete_appointments(role: str | None) -> bool:
    return role in ADMIN_ROLES


def can_export_appointments(role: str | None) -> bool:
    return role in ADMIN_ROLES


def can_manage_users(role: str | None) -> bool:
    """List users + create/update staff accounts."""
    return role in ADMIN_ROLES


def creatable_roles_for(actor_role: str | None) -> frozenset[str]:
    if actor_role == ROLE_SUPER_ADMIN:
        return CREATABLE_BY_SUPER_ADMIN
    if actor_role == ROLE_ADMIN:
        return CREATABLE_BY_ADMIN
    return frozenset()


def can_assign_role(actor_role: str | None, target_role: str) -> bool:
    return target_role in creatable_roles_for(actor_role)


async def creatable_roles_for_async(db, actor_role: str | None) -> set[str]:
    """Like :func:`creatable_roles_for` but also includes super-admin-defined
    custom roles from the ``custom_roles`` table."""
    from sqlalchemy import select

    from app.models.role import CustomRole

    base: set[str] = set(creatable_roles_for(actor_role))
    if actor_role not in (ROLE_SUPER_ADMIN, ROLE_ADMIN):
        return base
    rows = (await db.execute(select(CustomRole).where(CustomRole.is_system.is_(False)))).scalars().all()
    if actor_role == ROLE_SUPER_ADMIN:
        base |= {row.key for row in rows}
    elif actor_role == ROLE_ADMIN:
        base |= {row.key for row in rows if row.tier == "staff"}
    return base


async def can_assign_role_async(db, actor_role: str | None, target_role: str) -> bool:
    return target_role in await creatable_roles_for_async(db, actor_role)


def require_one_of(role: str | None, allowed: Iterable[str], *, message: str) -> None:
    """Raise PermissionDeniedError if role is not in allowed."""
    from app.core.exceptions import PermissionDeniedError

    if role not in set(allowed):
        raise PermissionDeniedError(message)

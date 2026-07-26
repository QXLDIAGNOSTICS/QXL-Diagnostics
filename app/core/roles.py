"""Canonical staff / admin roles and permission helpers.

Roles live as strings on ``User.role`` (no DB enum) so we can add staff
roles without a migration. Authorization decisions should go through these
helpers rather than ad-hoc string compares.
"""
from __future__ import annotations

from typing import Iterable

# Public patient accounts (self-register on the marketing site).
ROLE_PATIENT = "patient"

# Front-office / reception staff — appointments desk only.
ROLE_FRONT_OFFICE = "front_office"

# Full CMS + appointments administrators.
ROLE_ADMIN = "admin"

# Platform owners — user provisioning, role changes, danger-zone actions.
ROLE_SUPER_ADMIN = "super_admin"

ALL_ROLES: frozenset[str] = frozenset(
    {ROLE_PATIENT, ROLE_FRONT_OFFICE, ROLE_ADMIN, ROLE_SUPER_ADMIN}
)

# Anyone who may log into the admin panel (admin.qxldiagnostics.com).
STAFF_ROLES: frozenset[str] = frozenset(
    {ROLE_FRONT_OFFICE, ROLE_ADMIN, ROLE_SUPER_ADMIN}
)

# Full CMS managers (everything except some super-admin-only user ops).
ADMIN_ROLES: frozenset[str] = frozenset({ROLE_ADMIN, ROLE_SUPER_ADMIN})

# Roles that require the shared ADMIN_ACCESS_KEY during OTP login.
SECRET_GATED_ROLES: frozenset[str] = frozenset(STAFF_ROLES)

# Roles an administrator may assign when creating / updating users.
# super_admin may assign any non-patient staff role; admin may only mint front_office.
CREATABLE_BY_ADMIN: frozenset[str] = frozenset({ROLE_FRONT_OFFICE})
CREATABLE_BY_SUPER_ADMIN: frozenset[str] = frozenset(
    {ROLE_PATIENT, ROLE_FRONT_OFFICE, ROLE_ADMIN}
)

# Human-readable labels for the Users UI.
ROLE_LABELS: dict[str, str] = {
    ROLE_PATIENT: "Patient",
    ROLE_FRONT_OFFICE: "Front Office",
    ROLE_ADMIN: "Administrator",
    ROLE_SUPER_ADMIN: "Super Admin",
}


def is_staff(role: str | None) -> bool:
    return role in STAFF_ROLES


def is_admin(role: str | None) -> bool:
    return role in ADMIN_ROLES


def is_super_admin(role: str | None) -> bool:
    return role == ROLE_SUPER_ADMIN


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


def require_one_of(role: str | None, allowed: Iterable[str], *, message: str) -> None:
    """Raise PermissionDeniedError if role is not in allowed."""
    from app.core.exceptions import PermissionDeniedError

    if role not in set(allowed):
        raise PermissionDeniedError(message)

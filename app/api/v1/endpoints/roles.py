"""Super-admin role & permission management.

Lets the super admin define custom staff roles (beyond the built-in
front_office/staff/reception/marketing/sales/admin set) and choose exactly
which admin-panel features each role can use. Built-in roles are seeded as
``is_system=True`` rows so everything is managed from one screen; their
``key``/``tier`` are locked but their permission list can still be tuned.
"""
from __future__ import annotations

import re
import uuid

from fastapi import APIRouter, Depends
from pydantic import BaseModel, ConfigDict, field_validator
from sqlalchemy import select

from app.api.deps import DbSession, require_role
from app.core.exceptions import NotFoundError, ValidationError
from app.core.permissions import PERMISSION_CATALOG, PERMISSION_KEYS
from app.core.roles import ROLE_SUPER_ADMIN
from app.models.role import CustomRole
from app.models.user import User

router = APIRouter(prefix="/admin/roles", tags=["roles"])

_KEY_RE = re.compile(r"^[a-z][a-z0-9_]{1,39}$")


def _clean_permissions(v: list[str]) -> list[str]:
    unknown = sorted(set(v) - PERMISSION_KEYS)
    if unknown:
        raise ValueError(f"Unknown permission keys: {unknown}")
    return sorted(set(v))


class RoleRead(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    id: uuid.UUID
    key: str
    label: str
    tier: str
    permissions: list[str]
    is_system: bool


class RoleCreate(BaseModel):
    key: str
    label: str
    tier: str = "staff"
    permissions: list[str] = []

    @field_validator("key")
    @classmethod
    def _valid_key(cls, v: str) -> str:
        v = v.strip().lower().replace(" ", "_").replace("-", "_")
        if not _KEY_RE.match(v):
            raise ValueError(
                "Key must be 2-40 lowercase letters/numbers/underscores, starting with a letter"
            )
        return v

    @field_validator("label")
    @classmethod
    def _valid_label(cls, v: str) -> str:
        v = v.strip()
        if len(v) < 2:
            raise ValueError("Label must be at least 2 characters")
        return v

    @field_validator("tier")
    @classmethod
    def _valid_tier(cls, v: str) -> str:
        if v not in ("staff", "admin"):
            raise ValueError("tier must be 'staff' or 'admin'")
        return v

    @field_validator("permissions")
    @classmethod
    def _valid_perms(cls, v: list[str]) -> list[str]:
        return _clean_permissions(v)


class RoleUpdate(BaseModel):
    label: str | None = None
    tier: str | None = None
    permissions: list[str] | None = None

    @field_validator("tier")
    @classmethod
    def _valid_tier(cls, v: str | None) -> str | None:
        if v is not None and v not in ("staff", "admin"):
            raise ValueError("tier must be 'staff' or 'admin'")
        return v

    @field_validator("permissions")
    @classmethod
    def _valid_perms(cls, v: list[str] | None) -> list[str] | None:
        return _clean_permissions(v) if v is not None else v


@router.get("/permissions-catalog")
async def permissions_catalog(current: User = Depends(require_role("staff"))) -> list[dict[str, str]]:
    """The full list of feature-permission keys the Roles screen can grant."""
    _ = current
    return PERMISSION_CATALOG


@router.get("", response_model=list[RoleRead])
async def list_roles(db: DbSession, current: User = Depends(require_role("staff"))) -> list[RoleRead]:
    _ = current
    rows = (
        await db.execute(select(CustomRole).order_by(CustomRole.is_system.desc(), CustomRole.label))
    ).scalars().all()
    return [RoleRead.model_validate(row) for row in rows]


@router.post("", response_model=RoleRead, status_code=201)
async def create_role(
    body: RoleCreate, db: DbSession, current: User = Depends(require_role("super_admin"))
) -> RoleRead:
    _ = current
    existing = (await db.execute(select(CustomRole).where(CustomRole.key == body.key))).scalar_one_or_none()
    if existing:
        raise ValidationError("A role with this key already exists")
    role = CustomRole(key=body.key, label=body.label, tier=body.tier, permissions=body.permissions, is_system=False)
    db.add(role)
    await db.commit()
    await db.refresh(role)
    return RoleRead.model_validate(role)


@router.patch("/{role_id}", response_model=RoleRead)
async def update_role(
    role_id: uuid.UUID,
    body: RoleUpdate,
    db: DbSession,
    current: User = Depends(require_role("super_admin")),
) -> RoleRead:
    _ = current
    role = await db.get(CustomRole, role_id)
    if role is None:
        raise NotFoundError("Role not found")
    if role.key == ROLE_SUPER_ADMIN:
        raise ValidationError("The Super Admin role cannot be edited")
    if body.label is not None:
        role.label = body.label
    if body.tier is not None and not role.is_system:
        role.tier = body.tier
    if body.permissions is not None:
        role.permissions = body.permissions
    await db.commit()
    await db.refresh(role)
    return RoleRead.model_validate(role)


@router.delete("/{role_id}", status_code=204)
async def delete_role(
    role_id: uuid.UUID, db: DbSession, current: User = Depends(require_role("super_admin"))
) -> None:
    _ = current
    role = await db.get(CustomRole, role_id)
    if role is None:
        raise NotFoundError("Role not found")
    if role.is_system:
        raise ValidationError("Built-in roles cannot be deleted — edit its permissions instead")
    await db.delete(role)
    await db.commit()

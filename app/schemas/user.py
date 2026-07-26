"""User schemas."""
from __future__ import annotations

import re
import uuid
from datetime import date, datetime

from pydantic import BaseModel, ConfigDict, EmailStr, field_validator

from app.core.roles import ROLE_PATIENT, ROLE_SUPER_ADMIN
from app.core.security import normalize_phone_number

# Role values are validated for *shape* only here; the actual allow-list
# (built-in + super-admin-defined custom roles) is enforced against the
# actor in the endpoint layer via ``app.core.roles.can_assign_role_async``.
_ROLE_KEY_RE = re.compile(r"^[a-z][a-z0-9_]{1,39}$")


class UserBase(BaseModel):
    email: EmailStr | None = None
    phone: str
    name: str | None = None
    date_of_birth: date | None = None


class UserRead(UserBase):
    model_config = ConfigDict(from_attributes=True)

    id: uuid.UUID
    role: str
    is_email_verified: bool
    is_phone_verified: bool
    created_at: datetime


class UserUpdate(BaseModel):
    email: EmailStr | None = None
    name: str | None = None
    date_of_birth: date | None = None


class UserList(BaseModel):
    items: list[UserRead]
    count: int


class UserRoleUpdate(BaseModel):
    role: str

    @field_validator("role")
    @classmethod
    def _valid_role(cls, v: str) -> str:
        if v == ROLE_SUPER_ADMIN:
            raise ValueError("super_admin cannot be assigned via API")
        if not _ROLE_KEY_RE.match(v):
            raise ValueError("role must be a lowercase slug (letters, numbers, underscores)")
        return v


class AdminUserCreate(BaseModel):
    email: EmailStr
    phone: str
    name: str | None = None
    password: str
    role: str = ROLE_PATIENT

    @field_validator("phone")
    @classmethod
    def _validate_phone(cls, v: str) -> str:
        return normalize_phone_number(v)

    @field_validator("password")
    @classmethod
    def _password_len(cls, v: str) -> str:
        if len(v) < 8:
            raise ValueError("Password must be at least 8 characters")
        if not any(c.isalpha() for c in v) or not any(c.isdigit() for c in v):
            raise ValueError("Password must contain both letters and numbers")
        return v

    @field_validator("role")
    @classmethod
    def _valid_create_role(cls, v: str) -> str:
        # Final allow-list is enforced against the actor in the endpoint
        # (admin may only mint front-desk roles; super_admin may mint more).
        if v == ROLE_SUPER_ADMIN:
            raise ValueError("super_admin cannot be assigned via API")
        if not _ROLE_KEY_RE.match(v):
            raise ValueError("role must be a lowercase slug (letters, numbers, underscores)")
        return v

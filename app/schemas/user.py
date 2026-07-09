"""User schemas."""
from __future__ import annotations

import uuid
from datetime import date, datetime

from pydantic import BaseModel, ConfigDict, EmailStr, field_validator

from app.core.security import normalize_phone_number


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
        if v not in {"patient", "admin", "super_admin"}:
            raise ValueError("role must be 'patient', 'admin', or 'super_admin'")
        return v


class AdminUserCreate(BaseModel):
    email: EmailStr
    phone: str
    name: str | None = None
    password: str
    role: str = "patient"

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
        if v not in {"patient", "admin"}:
            raise ValueError("role must be 'patient' or 'admin'")
        return v

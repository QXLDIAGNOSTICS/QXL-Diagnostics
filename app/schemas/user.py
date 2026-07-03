"""User schemas."""
from __future__ import annotations

import uuid
from datetime import datetime

from pydantic import BaseModel, ConfigDict, EmailStr, field_validator


class UserBase(BaseModel):
    email: EmailStr | None = None
    name: str | None = None


class UserRead(UserBase):
    model_config = ConfigDict(from_attributes=True)

    id: uuid.UUID
    auth0_sub: str
    role: str
    created_at: datetime


class UserUpdate(BaseModel):
    email: EmailStr | None = None
    name: str | None = None


class UserList(BaseModel):
    items: list[UserRead]
    count: int


class UserRoleUpdate(BaseModel):
    role: str

    @field_validator("role")
    @classmethod
    def _valid_role(cls, v: str) -> str:
        if v not in {"patient", "admin"}:
            raise ValueError("role must be 'patient' or 'admin'")
        return v

"""Schemas for the backend-owned auth/session endpoints."""
from __future__ import annotations

import uuid

from pydantic import BaseModel, ConfigDict, EmailStr


class UserMe(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: uuid.UUID
    email: EmailStr | None = None
    name: str | None = None
    role: str

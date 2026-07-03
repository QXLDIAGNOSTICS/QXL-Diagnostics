"""Schemas for diagnostic centers."""
from __future__ import annotations

import uuid
from decimal import Decimal

from pydantic import BaseModel, ConfigDict, Field


class CenterBase(BaseModel):
    name: str
    address: str
    city: str
    phone: str | None = None
    hours: str | None = None
    lat: float | None = None
    lng: float | None = None
    is_nabl: bool = False
    is_active: bool = True
    sort_order: int = 0


class CenterCreate(CenterBase):
    pass


class CenterUpdate(BaseModel):
    name: str | None = None
    address: str | None = None
    city: str | None = None
    phone: str | None = None
    hours: str | None = None
    lat: float | None = None
    lng: float | None = None
    is_nabl: bool | None = None
    is_active: bool | None = None
    sort_order: int | None = None


class CenterRead(CenterBase):
    model_config = ConfigDict(from_attributes=True)
    id: uuid.UUID
    lat: float | None = None
    lng: float | None = None


class CenterList(BaseModel):
    items: list[CenterRead]
    count: int

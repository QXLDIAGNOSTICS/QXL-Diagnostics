"""Schemas for health packages and test catalog."""
from __future__ import annotations

import uuid

from pydantic import BaseModel, ConfigDict


class HealthPackageBase(BaseModel):
    name: str
    slug: str
    tag: str | None = None
    price: int
    old_price: int | None = None
    save_amount: int | None = None
    parameters: str | None = None
    includes: str | None = None
    benefits: str | None = None   # JSON list serialised as string
    who_should_take: str | None = None
    age_group: str | None = None
    gender: str | None = None
    doctor_recommended: bool = False
    is_active: bool = True
    home_collection_available: bool = True
    sort_order: int = 0


class HealthPackageCreate(HealthPackageBase):
    slug: str | None = None  # auto-generated from name if omitted


class HealthPackageUpdate(BaseModel):
    name: str | None = None
    tag: str | None = None
    price: int | None = None
    old_price: int | None = None
    save_amount: int | None = None
    parameters: str | None = None
    includes: str | None = None
    benefits: str | None = None
    who_should_take: str | None = None
    age_group: str | None = None
    gender: str | None = None
    doctor_recommended: bool | None = None
    is_active: bool | None = None
    home_collection_available: bool | None = None
    sort_order: int | None = None


class HealthPackageRead(HealthPackageBase):
    model_config = ConfigDict(from_attributes=True)
    id: uuid.UUID


class HealthPackageList(BaseModel):
    items: list[HealthPackageRead]
    count: int


class TestCatalogBase(BaseModel):
    name: str
    slug: str
    category: str | None = None
    description: str | None = None
    price: int | None = None
    preparation: str | None = None
    turnaround_hours: int | None = None
    is_active: bool = True
    home_collection_available: bool = True


class TestCatalogCreate(TestCatalogBase):
    slug: str | None = None  # auto-generated from name if omitted


class TestCatalogUpdate(BaseModel):
    name: str | None = None
    category: str | None = None
    description: str | None = None
    price: int | None = None
    preparation: str | None = None
    turnaround_hours: int | None = None
    is_active: bool | None = None
    home_collection_available: bool | None = None


class TestCatalogRead(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    id: uuid.UUID
    name: str
    slug: str
    category: str | None = None
    description: str | None = None
    price: int | None = None
    preparation: str | None = None
    turnaround_hours: int | None = None
    is_active: bool = True
    home_collection_available: bool = True


class TestCatalogList(BaseModel):
    items: list[TestCatalogRead]
    count: int

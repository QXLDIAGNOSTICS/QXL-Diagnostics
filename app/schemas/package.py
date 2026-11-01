"""Schemas for health packages and test catalog."""
from __future__ import annotations

import uuid
from typing import Any

from pydantic import BaseModel, ConfigDict, Field


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
    image_url: str | None = None
    category: str | None = None
    show_on_home: bool = False
    most_booked: bool = False
    contact_for_price: bool = False
    details: dict[str, Any] | None = None


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
    image_url: str | None = None
    category: str | None = None
    show_on_home: bool | None = None
    most_booked: bool | None = None
    contact_for_price: bool | None = None
    details: dict[str, Any] | None = None


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
    image_url: str | None = None


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
    image_url: str | None = None


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
    image_url: str | None = None


class TestCatalogList(BaseModel):
    items: list[TestCatalogRead]
    count: int


class CatalogResolveRequest(BaseModel):
    names: list[str] = Field(min_length=1, max_length=500)


class CatalogResolveMatch(BaseModel):
    query: str
    kind: str  # "test" | "package"
    id: uuid.UUID
    name: str
    price: int | None = None
    home_collection_available: bool = True


class CatalogResolveResponse(BaseModel):
    # One entry per requested name, in order; null when nothing matches
    # (booking that name would be rejected).
    results: list[CatalogResolveMatch | None]

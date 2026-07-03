"""Schemas for bookings."""
from __future__ import annotations

import uuid

from pydantic import BaseModel, ConfigDict, Field, field_validator


class BookingCreate(BaseModel):
    patient_name: str = Field(..., min_length=2, max_length=120)
    patient_phone: str = Field(..., min_length=6, max_length=20)
    patient_email: str | None = None
    patient_age: int | None = Field(None, ge=0, le=130)
    patient_gender: str | None = None

    test_name: str | None = None
    package_id: uuid.UUID | None = None
    center_id: uuid.UUID | None = None

    collection_type: str = "home"   # 'home' | 'center'
    collection_address: str | None = None
    preferred_date: str | None = None
    preferred_time: str | None = None
    notes: str | None = None
    is_urgent: bool = False

    @field_validator("collection_type")
    @classmethod
    def _valid_type(cls, v: str) -> str:
        if v not in {"home", "center"}:
            raise ValueError("collection_type must be 'home' or 'center'")
        return v


class BookingStatusUpdate(BaseModel):
    status: str

    @field_validator("status")
    @classmethod
    def _valid_status(cls, v: str) -> str:
        allowed = {"pending", "confirmed", "sample_collected", "report_ready", "completed", "cancelled"}
        if v not in allowed:
            raise ValueError(f"status must be one of {allowed}")
        return v


class BookingRead(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    id: uuid.UUID
    user_id: uuid.UUID | None = None
    patient_name: str
    patient_phone: str
    patient_email: str | None = None
    patient_age: int | None = None
    patient_gender: str | None = None
    test_name: str | None = None
    package_id: uuid.UUID | None = None
    center_id: uuid.UUID | None = None
    collection_type: str
    collection_address: str | None = None
    preferred_date: str | None = None
    preferred_time: str | None = None
    status: str
    notes: str | None = None
    is_urgent: bool


class BookingList(BaseModel):
    items: list[BookingRead]
    count: int

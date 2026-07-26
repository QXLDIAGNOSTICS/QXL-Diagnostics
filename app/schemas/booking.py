"""Schemas for bookings."""
from __future__ import annotations

import uuid
from datetime import datetime

from pydantic import BaseModel, ConfigDict, Field, field_validator

BOOKING_STATUS_VALUES = {
    "pending",
    "confirmed",
    "checked_in",
    "in_progress",
    "sample_collected",
    "report_ready",
    "completed",
    "cancelled",
    "no_show",
}

VISIT_TYPE_VALUES = {"scheduled", "walk_in", "emergency"}


class BookingCreate(BaseModel):
    patient_name: str = Field(..., min_length=2, max_length=120)
    patient_phone: str = Field(..., min_length=6, max_length=20)
    patient_email: str | None = None
    patient_age: int | None = Field(None, ge=0, le=130)
    patient_gender: str | None = None

    test_name: str | None = None
    test_id: uuid.UUID | None = None
    package_id: uuid.UUID | None = None
    center_id: uuid.UUID | None = None

    collection_type: str = "home"   # 'home' | 'center'
    collection_address: str | None = None
    preferred_date: str | None = None
    preferred_time: str | None = None
    notes: str | None = None
    is_urgent: bool = False
    visit_type: str = "scheduled"

    @field_validator("collection_type")
    @classmethod
    def _valid_type(cls, v: str) -> str:
        if v not in {"home", "center"}:
            raise ValueError("collection_type must be 'home' or 'center'")
        return v

    @field_validator("visit_type")
    @classmethod
    def _valid_visit_type(cls, v: str) -> str:
        if v not in VISIT_TYPE_VALUES:
            raise ValueError(f"visit_type must be one of {VISIT_TYPE_VALUES}")
        return v


class BookingStatusUpdate(BaseModel):
    status: str

    @field_validator("status")
    @classmethod
    def _valid_status(cls, v: str) -> str:
        if v not in BOOKING_STATUS_VALUES:
            raise ValueError(f"status must be one of {BOOKING_STATUS_VALUES}")
        return v


class BookingAdminUpdate(BaseModel):
    """Staff/admin update: patient details, schedule, status, report, notes."""

    patient_name: str | None = Field(None, min_length=2, max_length=120)
    patient_phone: str | None = Field(None, min_length=6, max_length=20)
    patient_email: str | None = None
    patient_age: int | None = Field(None, ge=0, le=130)
    patient_gender: str | None = None
    test_name: str | None = None
    collection_type: str | None = None
    collection_address: str | None = None
    status: str | None = None
    report_url: str | None = None
    notes: str | None = None
    is_urgent: bool | None = None
    is_delayed: bool | None = None
    visit_type: str | None = None
    center_id: uuid.UUID | None = None
    preferred_date: str | None = None
    preferred_time: str | None = None

    @field_validator("status")
    @classmethod
    def _valid_status(cls, v: str | None) -> str | None:
        if v is None:
            return v
        if v not in BOOKING_STATUS_VALUES:
            raise ValueError(f"status must be one of {BOOKING_STATUS_VALUES}")
        return v

    @field_validator("collection_type")
    @classmethod
    def _valid_type(cls, v: str | None) -> str | None:
        if v is None:
            return v
        if v not in {"home", "center"}:
            raise ValueError("collection_type must be 'home' or 'center'")
        return v

    @field_validator("visit_type")
    @classmethod
    def _valid_visit_type(cls, v: str | None) -> str | None:
        if v is None:
            return v
        if v not in VISIT_TYPE_VALUES:
            raise ValueError(f"visit_type must be one of {VISIT_TYPE_VALUES}")
        return v


class BookingRescheduleRequest(BaseModel):
    preferred_date: str = Field(..., min_length=4)
    preferred_time: str = Field(..., min_length=1)
    notify: bool = True
    channel: str = "sms"  # sms | email | both

    @field_validator("channel")
    @classmethod
    def _valid_channel(cls, v: str) -> str:
        if v not in {"sms", "email", "both"}:
            raise ValueError("channel must be 'sms', 'email', or 'both'")
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
    test_id: uuid.UUID | None = None
    package_id: uuid.UUID | None = None
    center_id: uuid.UUID | None = None
    collection_type: str
    collection_address: str | None = None
    preferred_date: str | None = None
    preferred_time: str | None = None
    visit_type: str = "scheduled"
    status: str
    notes: str | None = None
    is_urgent: bool
    is_delayed: bool = False
    was_rescheduled: bool = False
    report_url: str | None = None
    amount_paise: int | None = None
    payment_status: str
    checked_in_at: datetime | None = None
    in_progress_at: datetime | None = None
    completed_at: datetime | None = None
    created_at: datetime | None = None
    updated_at: datetime | None = None


class BookingList(BaseModel):
    items: list[BookingRead]
    count: int


class ReceiptPaymentEntry(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    id: uuid.UUID
    razorpay_order_id: str
    razorpay_payment_id: str | None = None
    amount: int
    currency: str
    status: str
    paid_at: datetime | None = None
    created_at: datetime | None = None


class BookingReceipt(BaseModel):
    """Printable/viewable receipt for a booking — payment source of truth
    (``payments`` table) plus a manual fallback for offline/UPI payments
    that were only ever reflected on the booking row itself."""

    booking_id: uuid.UUID
    patient_name: str
    patient_phone: str
    patient_email: str | None = None
    item_name: str | None = None
    collection_type: str
    preferred_date: str | None = None
    preferred_time: str | None = None
    payment_status: str
    amount_paise: int | None = None
    payments: list[ReceiptPaymentEntry] = []

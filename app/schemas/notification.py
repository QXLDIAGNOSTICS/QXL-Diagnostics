"""Schemas for staff/system-triggered booking notifications (SMS + email)."""
from __future__ import annotations

import uuid
from datetime import datetime

from pydantic import BaseModel, ConfigDict, Field, field_validator

NOTIFICATION_CHANNELS = {"sms", "email", "both"}
NOTIFICATION_TYPES = {
    "confirmation",
    "payment",
    "reminder",
    "reschedule",
    "cancellation",
    "offer",
    "custom",
}


class NotifyRequest(BaseModel):
    channel: str = "sms"
    type: str = "custom"
    subject: str | None = Field(None, max_length=200)
    message: str | None = Field(None, max_length=2000)
    scheduled_at: datetime | None = None

    @field_validator("channel")
    @classmethod
    def _valid_channel(cls, v: str) -> str:
        if v not in NOTIFICATION_CHANNELS:
            raise ValueError(f"channel must be one of {NOTIFICATION_CHANNELS}")
        return v

    @field_validator("type")
    @classmethod
    def _valid_type(cls, v: str) -> str:
        if v not in NOTIFICATION_TYPES:
            raise ValueError(f"type must be one of {NOTIFICATION_TYPES}")
        return v


class NotificationRead(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    id: uuid.UUID
    booking_id: uuid.UUID
    channel: str
    type: str
    subject: str | None = None
    message: str
    scheduled_at: datetime | None = None
    sent_at: datetime | None = None
    status: str
    error: str | None = None
    created_by: str | None = None
    created_at: datetime | None = None


class NotificationList(BaseModel):
    items: list[NotificationRead]
    count: int

"""Schemas for the public unsubscribe/preferences endpoints."""
from __future__ import annotations

from pydantic import BaseModel, field_validator

UNSUBSCRIBE_CHANNELS = {"email", "sms", "both"}


class UnsubscribeLookup(BaseModel):
    """What the /unsubscribe page shows before the user confirms — contact
    details are masked so the link can't be used to harvest real addresses."""

    masked_email: str | None = None
    masked_phone: str | None = None
    already_opted_out_email: bool = False
    already_opted_out_sms: bool = False


class UnsubscribeRequest(BaseModel):
    # Either resolve the contact from a booking's one-click token, or accept
    # a self-service email/phone typed directly into the unsubscribe page.
    token: str | None = None
    email: str | None = None
    phone: str | None = None
    channel: str = "both"

    @field_validator("channel")
    @classmethod
    def _valid_channel(cls, v: str) -> str:
        if v not in UNSUBSCRIBE_CHANNELS:
            raise ValueError(f"channel must be one of {sorted(UNSUBSCRIBE_CHANNELS)}")
        return v


class UnsubscribeResult(BaseModel):
    ok: bool
    message: str

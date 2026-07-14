"""Schemas for Razorpay payment orders and verification."""
from __future__ import annotations

import uuid

from pydantic import BaseModel, ConfigDict, Field


class CreateOrderRequest(BaseModel):
    """One or more booking ids to pay for together in a single order —
    a single test/package booking is just a list of one."""

    booking_ids: list[uuid.UUID] = Field(min_length=1)


class CreateOrderResponse(BaseModel):
    """Everything the frontend Razorpay Checkout widget needs to open."""

    key_id: str
    order_id: str
    amount: int
    currency: str
    booking_ids: list[uuid.UUID]
    name: str = "QXL Diagnostics"
    description: str = "Diagnostic test / package booking"


class VerifyPaymentRequest(BaseModel):
    razorpay_order_id: str
    razorpay_payment_id: str
    razorpay_signature: str


class PaymentRead(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: uuid.UUID
    booking_id: uuid.UUID
    extra_booking_ids: list[str] | None = None
    razorpay_order_id: str
    razorpay_payment_id: str | None = None
    amount: int
    currency: str
    status: str

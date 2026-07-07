"""Schemas for Razorpay payment orders and verification."""
from __future__ import annotations

import uuid

from pydantic import BaseModel, ConfigDict


class CreateOrderRequest(BaseModel):
    booking_id: uuid.UUID


class CreateOrderResponse(BaseModel):
    """Everything the frontend Razorpay Checkout widget needs to open."""

    key_id: str
    order_id: str
    amount: int
    currency: str
    booking_id: uuid.UUID
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
    razorpay_order_id: str
    razorpay_payment_id: str | None = None
    amount: int
    currency: str
    status: str

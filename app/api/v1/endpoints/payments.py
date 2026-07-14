"""Razorpay payment endpoints: create order, verify client-side callback, webhook."""
from __future__ import annotations

import json
import uuid

from fastapi import APIRouter, Depends, Request

from app.api.deps import CurrentUserOptional, DbSession, require_role
from app.core.config import settings
from app.core.exceptions import NotFoundError, UnauthorizedError
from app.core.logging import get_logger
from app.models.user import User
from app.schemas.payment import (
    CreateOrderRequest,
    CreateOrderResponse,
    PaymentRead,
    VerifyPaymentRequest,
)
from app.services import payment_service

logger = get_logger(__name__)
router = APIRouter(prefix="/payments", tags=["payments"])


@router.post("/orders", response_model=CreateOrderResponse, status_code=201)
async def create_order(
    body: CreateOrderRequest, db: DbSession, user: CurrentUserOptional
) -> CreateOrderResponse:
    payment, bookings = await payment_service.create_order(db, booking_ids=body.booking_ids, user=user)
    return CreateOrderResponse(
        key_id=settings.RAZORPAY_KEY_ID,
        order_id=payment.razorpay_order_id,
        amount=payment.amount,
        currency=payment.currency,
        booking_ids=[b.id for b in bookings],
    )


@router.post("/verify", response_model=PaymentRead)
async def verify_payment(body: VerifyPaymentRequest, db: DbSession) -> PaymentRead:
    payment = await payment_service.verify_payment(
        db,
        order_id=body.razorpay_order_id,
        payment_id=body.razorpay_payment_id,
        signature=body.razorpay_signature,
    )
    return PaymentRead.model_validate(payment)


@router.post("/webhook", status_code=200)
async def razorpay_webhook(request: Request, db: DbSession) -> dict:
    """Server-to-server webhook. Verifies the signature over the RAW body —
    do not parse/re-serialise the JSON before checking it."""
    raw_body = await request.body()
    signature = request.headers.get("x-razorpay-signature", "")

    if not payment_service.verify_webhook_signature(raw_body=raw_body, signature=signature):
        raise UnauthorizedError("Invalid webhook signature")

    try:
        event = json.loads(raw_body)
    except ValueError as exc:
        raise NotFoundError("Malformed webhook payload") from exc

    await payment_service.handle_webhook_event(db, event)
    return {"status": "ok"}


@router.post("/{payment_id}/reconcile", response_model=PaymentRead)
async def reconcile_payment(
    payment_id: uuid.UUID, db: DbSession, user: User = Depends(require_role("admin"))
) -> PaymentRead:
    """Admin-triggered reconciliation: re-verify a payment's true status
    directly against the Razorpay API instead of relying solely on webhooks."""
    payment = await payment_service.reconcile_payment(db, payment_id=payment_id)
    return PaymentRead.model_validate(payment)

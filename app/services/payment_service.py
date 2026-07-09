"""Razorpay payment integration.

Uses direct REST calls via ``httpx`` (Basic Auth with key_id:key_secret)
against the Razorpay Orders API, rather than the synchronous ``razorpay``
Python SDK, to stay consistent with the rest of this async codebase.

Two independent signature checks matter here, and they are NOT the same:
  - ``verify_payment_signature``: checked on the client-side "payment success"
    callback (``order_id|payment_id`` HMAC-SHA256 with the key secret).
  - ``verify_webhook_signature``: checked on the server-to-server webhook,
    which HMACs the *raw* request body (must not be re-serialised JSON) with
    a separate webhook secret configured in the Razorpay dashboard.

Both checks MUST pass before a booking is ever marked as paid — the
client-side callback alone is not trustworthy on its own, and is treated as
a fast-path UX signal while the webhook is the durable source of truth.
"""
from __future__ import annotations

import hashlib
import hmac
import uuid
from datetime import datetime, timezone

import httpx
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.config import settings
from app.core.exceptions import NotFoundError, PermissionDeniedError, UnauthorizedError, ValidationError
from app.core.logging import get_logger
from app.models.booking import Booking
from app.models.catalog import HealthPackage, TestCatalog
from app.models.payment import Payment
from app.models.user import User
from app.repositories.booking_repository import BookingRepository
from app.repositories.payment_repository import PaymentRepository

logger = get_logger(__name__)

_RAZORPAY_BASE_URL = "https://api.razorpay.com/v1"


async def _amount_for_booking(db: AsyncSession, booking: Booking) -> int:
    """Resolve the amount to charge, in paise (INR smallest unit)."""
    amount: int | None = None
    if booking.amount_paise:
        amount = booking.amount_paise
    elif booking.package_id is not None:
        package = await db.get(HealthPackage, booking.package_id)
        if package is not None and package.price is not None:
            amount = int(package.price) * 100
    elif booking.test_id is not None:
        test = await db.get(TestCatalog, booking.test_id)
        if test is not None and test.price is not None:
            amount = int(test.price) * 100
    if amount is None:
        raise ValidationError("Unable to determine an amount for this booking")
    if amount < 100:
        # Razorpay's minimum chargeable amount is 100 paise (₹1).
        raise ValidationError("Payment amount must be at least ₹1")
    return amount


async def create_order(
    db: AsyncSession, *, booking_id: uuid.UUID, user: User | None
) -> tuple[Payment, Booking]:
    if not settings.RAZORPAY_KEY_ID or not settings.RAZORPAY_KEY_SECRET:
        raise ValidationError("Payments are not configured")

    booking_repo = BookingRepository(db)
    booking = await booking_repo.get_by_id(booking_id)
    if booking is None:
        raise NotFoundError("Booking not found")
    # Guest bookings (user_id is None) may be paid by anyone holding the
    # booking id; bookings tied to an account may only be paid by that account.
    if booking.user_id is not None and (user is None or booking.user_id != user.id):
        raise PermissionDeniedError("You do not have access to this booking")

    amount = await _amount_for_booking(db, booking)

    async with httpx.AsyncClient(
        auth=(settings.RAZORPAY_KEY_ID, settings.RAZORPAY_KEY_SECRET), timeout=15.0
    ) as client:
        resp = await client.post(
            f"{_RAZORPAY_BASE_URL}/orders",
            json={
                "amount": amount,
                "currency": "INR",
                "receipt": str(booking.id),
                "notes": {"booking_id": str(booking.id)},
            },
        )
        if resp.status_code in (401, 403):
            logger.error("Razorpay auth failed: %s %s", resp.status_code, resp.text)
            raise UnauthorizedError("Razorpay authentication failed — check API keys")
        if resp.status_code >= 400:
            logger.error("Razorpay order creation failed: %s %s", resp.status_code, resp.text)
            raise ValidationError("Unable to create payment order")
        order = resp.json()

    payment_repo = PaymentRepository(db)
    payment = await payment_repo.create(
        booking_id=booking.id,
        user_id=booking.user_id,
        razorpay_order_id=order["id"],
        amount=amount,
        currency=order.get("currency", "INR"),
        status="created",
    )
    await booking_repo.update_payment_status(booking, payment_status="pending", amount_paise=amount)
    await db.commit()
    await db.refresh(payment)
    return payment, booking


def verify_payment_signature(*, order_id: str, payment_id: str, signature: str) -> bool:
    expected = hmac.new(
        settings.RAZORPAY_KEY_SECRET.encode("utf-8"),
        f"{order_id}|{payment_id}".encode("utf-8"),
        hashlib.sha256,
    ).hexdigest()
    return hmac.compare_digest(expected, signature)


async def verify_payment(
    db: AsyncSession, *, order_id: str, payment_id: str, signature: str
) -> Payment:
    if not verify_payment_signature(order_id=order_id, payment_id=payment_id, signature=signature):
        raise UnauthorizedError("Invalid payment signature")

    payment_repo = PaymentRepository(db)
    payment = await payment_repo.get_by_order_id(order_id)
    if payment is None:
        raise NotFoundError("Payment order not found")

    payment.razorpay_payment_id = payment_id
    payment.razorpay_signature = signature
    if payment.status != "paid":
        payment.status = "paid"
        payment.paid_at = datetime.now(timezone.utc)

    booking_repo = BookingRepository(db)
    booking = await booking_repo.get_by_id(payment.booking_id)
    if booking is not None:
        await booking_repo.update_payment_status(booking, payment_status="paid")

    await db.commit()
    await db.refresh(payment)
    return payment


def verify_webhook_signature(*, raw_body: bytes, signature: str) -> bool:
    """Per Razorpay docs: HMAC-SHA256 of the raw (unparsed) request body."""
    if not settings.RAZORPAY_WEBHOOK_SECRET:
        return False
    expected = hmac.new(
        settings.RAZORPAY_WEBHOOK_SECRET.encode("utf-8"), raw_body, hashlib.sha256
    ).hexdigest()
    return hmac.compare_digest(expected, signature)


async def handle_webhook_event(db: AsyncSession, event: dict) -> None:
    event_type = event.get("event", "")
    payload = event.get("payload", {})
    payment_entity = payload.get("payment", {}).get("entity", {})
    order_id = payment_entity.get("order_id")
    if not order_id:
        return

    payment_repo = PaymentRepository(db)
    payment = await payment_repo.get_by_order_id(order_id)
    if payment is None:
        logger.warning("Webhook for unknown order_id=%s", order_id)
        return

    booking_repo = BookingRepository(db)
    booking = await booking_repo.get_by_id(payment.booking_id)

    if event_type in {"payment.captured", "order.paid"}:
        payment.razorpay_payment_id = payment_entity.get("id") or payment.razorpay_payment_id
        if payment.status != "paid":
            payment.status = "paid"
            payment.paid_at = datetime.now(timezone.utc)
        if booking is not None:
            await booking_repo.update_payment_status(booking, payment_status="paid")
    elif event_type == "payment.failed":
        payment.status = "failed"
        payment.failure_reason = payment_entity.get("error_description")
        if booking is not None:
            await booking_repo.update_payment_status(booking, payment_status="failed")
    elif event_type in {"refund.processed", "refund.created"}:
        payment.status = "refunded"
        if booking is not None:
            await booking_repo.update_payment_status(booking, payment_status="refunded")

    await db.commit()


async def reconcile_payment(db: AsyncSession, *, payment_id: uuid.UUID) -> Payment:
    """Re-verify a payment's status directly against the Razorpay API.

    Used as a manual/admin recovery path for payments stuck in "created" or
    "pending" (e.g. the webhook never arrived or was dropped) — the webhook
    remains the primary source of truth, but this lets an operator force a
    reconciliation instead of the payment staying ambiguous forever.
    """
    if not settings.RAZORPAY_KEY_ID or not settings.RAZORPAY_KEY_SECRET:
        raise ValidationError("Payments are not configured")

    payment_repo = PaymentRepository(db)
    payment = await payment_repo.get_by_id(payment_id)
    if payment is None:
        raise NotFoundError("Payment not found")

    async with httpx.AsyncClient(
        auth=(settings.RAZORPAY_KEY_ID, settings.RAZORPAY_KEY_SECRET), timeout=15.0
    ) as client:
        resp = await client.get(
            f"{_RAZORPAY_BASE_URL}/orders/{payment.razorpay_order_id}/payments"
        )
        if resp.status_code >= 400:
            logger.error(
                "Razorpay reconciliation lookup failed for order=%s: %s %s",
                payment.razorpay_order_id, resp.status_code, resp.text,
            )
            raise ValidationError("Unable to reach Razorpay to reconcile this payment")
        attempts = resp.json().get("items", [])

    # Prefer a captured attempt; otherwise take the most recent attempt to
    # reflect its (failed/authorized) state instead of leaving it ambiguous.
    captured = next((a for a in attempts if a.get("status") == "captured"), None)
    latest = captured or (attempts[-1] if attempts else None)

    booking_repo = BookingRepository(db)
    booking = await booking_repo.get_by_id(payment.booking_id)

    if latest is None:
        # No payment attempts recorded at Razorpay at all — order was never paid.
        if payment.status not in {"paid", "refunded"}:
            payment.status = "failed"
            payment.failure_reason = "No payment attempts found at Razorpay during reconciliation"
            if booking is not None:
                await booking_repo.update_payment_status(booking, payment_status="failed")
    elif latest.get("status") == "captured":
        payment.razorpay_payment_id = latest.get("id") or payment.razorpay_payment_id
        if payment.status != "paid":
            payment.status = "paid"
            payment.paid_at = datetime.now(timezone.utc)
        if booking is not None:
            await booking_repo.update_payment_status(booking, payment_status="paid")
    elif latest.get("status") in {"failed"}:
        if payment.status not in {"paid", "refunded"}:
            payment.status = "failed"
            payment.failure_reason = latest.get("error_description") or "Payment failed at Razorpay"
            if booking is not None:
                await booking_repo.update_payment_status(booking, payment_status="failed")

    await db.commit()
    await db.refresh(payment)
    return payment

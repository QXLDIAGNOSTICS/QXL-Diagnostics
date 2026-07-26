"""Repository for Payment (Razorpay order/payment) records."""
from __future__ import annotations

import uuid

from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.payment import Payment


class PaymentRepository:
    def __init__(self, db: AsyncSession) -> None:
        self.db = db

    async def create(self, **kwargs) -> Payment:  # noqa: ANN003
        payment = Payment(**kwargs)
        self.db.add(payment)
        await self.db.flush()
        return payment

    async def get_by_id(self, payment_id: uuid.UUID) -> Payment | None:
        return await self.db.get(Payment, payment_id)

    async def get_by_order_id(self, order_id: str) -> Payment | None:
        result = await self.db.execute(select(Payment).where(Payment.razorpay_order_id == order_id))
        return result.scalar_one_or_none()

    async def list_for_booking(self, booking_id: uuid.UUID) -> list[Payment]:
        """Payments where this booking is either the primary or an extra
        (multi-booking single-checkout) booking on the payment."""
        from sqlalchemy import cast, String

        result = await self.db.execute(
            select(Payment)
            .where(
                (Payment.booking_id == booking_id)
                | (cast(Payment.extra_booking_ids, String).ilike(f"%{booking_id}%"))
            )
            .order_by(Payment.created_at.desc())
        )
        return list(result.scalars().all())

    async def save(self, payment: Payment) -> Payment:
        await self.db.flush()
        return payment

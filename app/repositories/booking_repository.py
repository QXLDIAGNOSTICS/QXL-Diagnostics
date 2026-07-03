"""Repository for Bookings."""
from __future__ import annotations

import uuid

from sqlalchemy import func, select
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.booking import Booking


class BookingRepository:
    def __init__(self, db: AsyncSession) -> None:
        self.db = db

    async def create(self, **kwargs) -> Booking:  # noqa: ANN003
        booking = Booking(**kwargs)
        self.db.add(booking)
        await self.db.flush()
        return booking

    async def get_by_id(self, booking_id: uuid.UUID) -> Booking | None:
        return await self.db.get(Booking, booking_id)

    async def list_for_user(
        self, user_id: uuid.UUID, limit: int = 50, offset: int = 0
    ) -> tuple[list[Booking], int]:
        count = (
            await self.db.execute(
                select(func.count()).select_from(Booking).where(Booking.user_id == user_id)
            )
        ).scalar_one()
        rows = list(
            (
                await self.db.execute(
                    select(Booking)
                    .where(Booking.user_id == user_id)
                    .order_by(Booking.created_at.desc())
                    .limit(limit)
                    .offset(offset)
                )
            ).scalars().all()
        )
        return rows, count

    async def list_all(
        self, status: str | None = None, limit: int = 100, offset: int = 0
    ) -> tuple[list[Booking], int]:
        base = select(Booking)
        count_q = select(func.count()).select_from(Booking)
        if status:
            base = base.where(Booking.status == status)
            count_q = count_q.where(Booking.status == status)
        count = (await self.db.execute(count_q)).scalar_one()
        rows = list(
            (
                await self.db.execute(
                    base.order_by(Booking.created_at.desc()).limit(limit).offset(offset)
                )
            ).scalars().all()
        )
        return rows, count

    async def update_status(self, booking: Booking, status: str) -> Booking:
        booking.status = status
        await self.db.flush()
        return booking

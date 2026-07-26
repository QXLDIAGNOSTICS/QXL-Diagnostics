"""Repository for Bookings."""
from __future__ import annotations

import uuid
from datetime import datetime

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

    async def list_created_after(self, since: datetime, limit: int = 20) -> list[Booking]:
        """Bookings created after ``since`` — powers the admin notification bell feed."""
        rows = list(
            (
                await self.db.execute(
                    select(Booking)
                    .where(Booking.created_at > since)
                    .order_by(Booking.created_at.desc())
                    .limit(limit)
                )
            ).scalars().all()
        )
        return rows

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

    async def update(self, booking: Booking, **kwargs) -> Booking:  # noqa: ANN003
        for k, v in kwargs.items():
            setattr(booking, k, v)
        await self.db.flush()
        return booking

    async def delete(self, booking: Booking) -> None:
        await self.db.delete(booking)
        await self.db.flush()

    async def update_payment_status(
        self, booking: Booking, *, payment_status: str, amount_paise: int | None = None
    ) -> Booking:
        booking.payment_status = payment_status
        if amount_paise is not None:
            booking.amount_paise = amount_paise
        await self.db.flush()
        return booking

    # ── Dashboard / stats helpers ───────────────────────────────────────────

    async def count_where(self, **filters) -> int:  # noqa: ANN003
        stmt = select(func.count()).select_from(Booking)
        for key, value in filters.items():
            stmt = stmt.where(getattr(Booking, key) == value)
        return (await self.db.execute(stmt)).scalar_one()

    async def count_preferred_date(self, date_str: str) -> int:
        return (
            await self.db.execute(
                select(func.count()).select_from(Booking).where(Booking.preferred_date == date_str)
            )
        ).scalar_one()

    async def count_preferred_date_between(self, start: str, end: str) -> int:
        return (
            await self.db.execute(
                select(func.count())
                .select_from(Booking)
                .where(Booking.preferred_date >= start, Booking.preferred_date <= end)
            )
        ).scalar_one()

    async def total_count(self) -> int:
        return (await self.db.execute(select(func.count()).select_from(Booking))).scalar_one()

    async def distinct_patient_count(self) -> int:
        return (
            await self.db.execute(select(func.count(func.distinct(Booking.patient_phone))))
        ).scalar_one()

    async def distinct_patient_count_for_date(self, date_str: str) -> int:
        return (
            await self.db.execute(
                select(func.count(func.distinct(Booking.patient_phone))).where(
                    Booking.preferred_date == date_str
                )
            )
        ).scalar_one()

    async def bookings_per_patient(self) -> dict[str, int]:
        """Total bookings ever made, keyed by phone — used to derive new vs
        returning patient counts (new == exactly one booking ever)."""
        rows = (
            await self.db.execute(
                select(Booking.patient_phone, func.count()).group_by(Booking.patient_phone)
            )
        ).all()
        return {phone: cnt for phone, cnt in rows}

    async def avg_minutes_between(
        self, start_col: str, end_col: str, *, since: datetime
    ) -> float | None:
        start_c = getattr(Booking, start_col)
        end_c = getattr(Booking, end_col)
        diff_seconds = func.extract("epoch", end_c - start_c)
        result = await self.db.execute(
            select(func.avg(diff_seconds)).where(
                start_c.isnot(None), end_c.isnot(None), end_c >= since
            )
        )
        avg_seconds = result.scalar_one_or_none()
        return round(avg_seconds / 60, 1) if avg_seconds is not None else None

    async def upcoming_today_count(self, date_str: str) -> int:
        return (
            await self.db.execute(
                select(func.count())
                .select_from(Booking)
                .where(
                    Booking.preferred_date == date_str,
                    Booking.status.in_(["pending", "confirmed"]),
                )
            )
        ).scalar_one()

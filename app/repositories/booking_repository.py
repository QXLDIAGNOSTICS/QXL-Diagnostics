"""Repository for Bookings."""
from __future__ import annotations

import uuid
from datetime import datetime, timezone

from sqlalchemy import func, select
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import selectinload

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
        """Deliberately uses ``select()`` + ``execute()`` rather than
        ``Session.get()``: when the booking is already resident in this
        session's identity map (e.g. right after ``repo.create()`` in the
        same request), ``Session.get()`` short-circuits and returns the
        cached object WITHOUT applying ``options`` — leaving
        ``assigned_staff`` unloaded and crashing any later synchronous
        access (e.g. Pydantic's ``BookingRead.assigned_to_name``) with
        ``MissingGreenlet``. A ``select()`` always executes the eager-load
        query and populates the relationship regardless of identity-map
        state.
        """
        return (
            await self.db.execute(
                select(Booking).options(selectinload(Booking.assigned_staff)).where(Booking.id == booking_id)
            )
        ).scalar_one_or_none()

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
                    .options(selectinload(Booking.assigned_staff))
                    .where(Booking.user_id == user_id)
                    .order_by(Booking.created_at.desc())
                    .limit(limit)
                    .offset(offset)
                )
            ).scalars().all()
        )
        return rows, count

    async def list_created_after(self, since: datetime, limit: int = 20) -> list[Booking]:
        """Bookings created after ``since`` — powers the admin notification bell feed.

        ``Booking.created_at`` is stored as a naive UTC timestamp (via
        ``TimestampMixin`` / ``func.now()``), so a tz-aware ``since`` must be
        normalised to naive UTC first — asyncpg raises a ``DataError`` if you
        try to bind an offset-aware datetime against a
        ``TIMESTAMP WITHOUT TIME ZONE`` column.
        """
        if since.tzinfo is not None:
            since = since.astimezone(timezone.utc).replace(tzinfo=None)
        rows = list(
            (
                await self.db.execute(
                    select(Booking)
                    .options(selectinload(Booking.assigned_staff))
                    .where(Booking.created_at > since)
                    .order_by(Booking.created_at.desc())
                    .limit(limit)
                )
            ).scalars().all()
        )
        return rows

    async def list_payment_updated_after(self, since: datetime, limit: int = 20) -> list[Booking]:
        """Bookings whose ``updated_at`` moved past ``since`` AND are
        currently paid/failed — feeds the admin "payment done" bell alert
        (webhook or client-verified payments both touch ``updated_at``).
        Unlike ``created_at``, ``updated_at`` is a timezone-aware column, so
        ``since`` is compared as-is (must be tz-aware)."""
        if since.tzinfo is None:
            since = since.replace(tzinfo=timezone.utc)
        rows = list(
            (
                await self.db.execute(
                    select(Booking)
                    .options(selectinload(Booking.assigned_staff))
                    .where(
                        Booking.updated_at > since,
                        Booking.payment_status.in_(["paid", "failed"]),
                    )
                    .order_by(Booking.updated_at.desc())
                    .limit(limit)
                )
            ).scalars().all()
        )
        return rows

    async def list_unpaid_older_than(self, cutoff: datetime, limit: int = 500) -> list[Booking]:
        """Bookings with money outstanding, created before ``cutoff`` — feeds
        the ``payment_reminder`` automation rule. Naive-UTC comparison, same
        caveat as :meth:`list_created_after`."""
        if cutoff.tzinfo is not None:
            cutoff = cutoff.astimezone(timezone.utc).replace(tzinfo=None)
        rows = list(
            (
                await self.db.execute(
                    select(Booking)
                    .where(
                        Booking.payment_status.in_(["unpaid", "pending"]),
                        Booking.amount_paise.isnot(None),
                        Booking.status.notin_(["cancelled", "no_show"]),
                        Booking.created_at <= cutoff,
                    )
                    .order_by(Booking.created_at.asc())
                    .limit(limit)
                )
            ).scalars().all()
        )
        return rows

    async def list_upcoming_active(self, *, from_date: str, limit: int = 1000) -> list[Booking]:
        """Bookings with a scheduled visit on/after ``from_date`` that are
        still pending/confirmed — the audience for the ``booking_reminder``
        automation (resending appointment details to already-booked people)."""
        rows = list(
            (
                await self.db.execute(
                    select(Booking)
                    .where(
                        Booking.preferred_date.isnot(None),
                        Booking.preferred_date >= from_date,
                        Booking.status.in_(["pending", "confirmed"]),
                    )
                    .order_by(Booking.preferred_date.asc())
                    .limit(limit)
                )
            ).scalars().all()
        )
        return rows

    async def list_latest_booking_per_patient(self, limit: int = 2000) -> list[Booking]:
        """One (most recent) booking per distinct patient phone — used as the
        marketing-broadcast audience/contact list."""
        latest_ids_subq = (
            select(func.max(Booking.created_at).label("max_created"), Booking.patient_phone)
            .group_by(Booking.patient_phone)
            .subquery()
        )
        rows = list(
            (
                await self.db.execute(
                    select(Booking)
                    .join(
                        latest_ids_subq,
                        (Booking.patient_phone == latest_ids_subq.c.patient_phone)
                        & (Booking.created_at == latest_ids_subq.c.max_created),
                    )
                    .limit(limit)
                )
            ).scalars().all()
        )
        return rows

    async def list_all(
        self,
        status: str | None = None,
        limit: int = 100,
        offset: int = 0,
        *,
        assigned_to_id: uuid.UUID | None = None,
    ) -> tuple[list[Booking], int]:
        base = select(Booking).options(selectinload(Booking.assigned_staff))
        count_q = select(func.count()).select_from(Booking)
        if status:
            base = base.where(Booking.status == status)
            count_q = count_q.where(Booking.status == status)
        if assigned_to_id is not None:
            base = base.where(Booking.assigned_to_id == assigned_to_id)
            count_q = count_q.where(Booking.assigned_to_id == assigned_to_id)
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

    async def counts_by_time_for_date(self, date_str: str) -> dict[str, int]:
        """Active (non-cancelled) booking counts per ``preferred_time`` on a
        given ``preferred_date`` — powers slot-capacity checks so a single
        popular 10-minute slot can't be overbooked."""
        rows = (
            await self.db.execute(
                select(Booking.preferred_time, func.count())
                .where(
                    Booking.preferred_date == date_str,
                    Booking.preferred_time.isnot(None),
                    Booking.status.notin_(["cancelled", "no_show"]),
                )
                .group_by(Booking.preferred_time)
            )
        ).all()
        return {time: cnt for time, cnt in rows if time}

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

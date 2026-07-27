"""Repository for BookingNotification (SMS/email log + scheduler queue)."""
from __future__ import annotations

import uuid
from datetime import datetime

from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.notification import BookingNotification


class NotificationRepository:
    def __init__(self, db: AsyncSession) -> None:
        self.db = db

    async def create(self, **kwargs) -> BookingNotification:  # noqa: ANN003
        notification = BookingNotification(**kwargs)
        self.db.add(notification)
        await self.db.flush()
        return notification

    async def get_by_id(self, notification_id: uuid.UUID) -> BookingNotification | None:
        return await self.db.get(BookingNotification, notification_id)

    async def list_for_booking(
        self, booking_id: uuid.UUID, limit: int = 50, offset: int = 0
    ) -> tuple[list[BookingNotification], int]:
        from sqlalchemy import func

        count = (
            await self.db.execute(
                select(func.count())
                .select_from(BookingNotification)
                .where(BookingNotification.booking_id == booking_id)
            )
        ).scalar_one()
        rows = list(
            (
                await self.db.execute(
                    select(BookingNotification)
                    .where(BookingNotification.booking_id == booking_id)
                    .order_by(BookingNotification.created_at.desc())
                    .limit(limit)
                    .offset(offset)
                )
            ).scalars().all()
        )
        return rows, count

    async def get_latest_for_type(
        self, booking_id: uuid.UUID, notification_type: str
    ) -> BookingNotification | None:
        """Most recent notification of a given type sent/queued for a booking —
        used by rule-based automations (e.g. payment reminders) to avoid
        re-sending before the configured interval has elapsed."""
        row = (
            await self.db.execute(
                select(BookingNotification)
                .where(
                    BookingNotification.booking_id == booking_id,
                    BookingNotification.type == notification_type,
                )
                .order_by(BookingNotification.created_at.desc())
                .limit(1)
            )
        ).scalar_one_or_none()
        return row

    async def list_due(self, *, now: datetime, limit: int = 100) -> list[BookingNotification]:
        rows = (
            await self.db.execute(
                select(BookingNotification)
                .where(
                    BookingNotification.status == "scheduled",
                    BookingNotification.scheduled_at.isnot(None),
                    BookingNotification.scheduled_at <= now,
                )
                .order_by(BookingNotification.scheduled_at.asc())
                .limit(limit)
            )
        ).scalars().all()
        return list(rows)

    async def mark_sent(self, notification: BookingNotification, *, sent_at: datetime) -> BookingNotification:
        notification.status = "sent"
        notification.sent_at = sent_at
        notification.error = None
        await self.db.flush()
        return notification

    async def mark_partial(self, notification: BookingNotification, *, sent_at: datetime, error: str) -> BookingNotification:
        notification.status = "partial"
        notification.sent_at = sent_at
        notification.error = error
        await self.db.flush()
        return notification

    async def mark_failed(self, notification: BookingNotification, *, error: str) -> BookingNotification:
        notification.status = "failed"
        notification.error = error
        await self.db.flush()
        return notification

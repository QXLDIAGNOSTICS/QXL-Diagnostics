"""Booking service: business logic for booking a test/package/home-collection."""
from __future__ import annotations

import uuid

from sqlalchemy.ext.asyncio import AsyncSession

from app.core.exceptions import NotFoundError
from app.models.booking import Booking
from app.models.user import User
from app.repositories.booking_repository import BookingRepository


async def create_booking(db: AsyncSession, data: dict, user: User | None) -> Booking:
    repo = BookingRepository(db)
    booking = await repo.create(**data, user_id=user.id if user else None)
    await db.commit()
    await db.refresh(booking)
    return booking


async def list_my_bookings(
    db: AsyncSession, user: User, limit: int = 50, offset: int = 0
) -> tuple[list[Booking], int]:
    return await BookingRepository(db).list_for_user(user.id, limit=limit, offset=offset)


async def list_all_bookings(
    db: AsyncSession, status: str | None, limit: int, offset: int
) -> tuple[list[Booking], int]:
    return await BookingRepository(db).list_all(status=status, limit=limit, offset=offset)


async def update_booking_status(db: AsyncSession, booking_id: uuid.UUID, status: str) -> Booking:
    repo = BookingRepository(db)
    booking = await repo.get_by_id(booking_id)
    if booking is None:
        raise NotFoundError("Booking not found")
    booking = await repo.update_status(booking, status)
    await db.commit()
    await db.refresh(booking)
    return booking


async def get_booking_for_user(db: AsyncSession, booking_id: uuid.UUID, user: User) -> Booking:
    repo = BookingRepository(db)
    booking = await repo.get_by_id(booking_id)
    if booking is None or booking.user_id != user.id:
        raise NotFoundError("Booking not found")
    return booking

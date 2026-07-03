"""Booking endpoints: guest + authenticated test/package bookings, admin management."""
from __future__ import annotations

import uuid

from fastapi import APIRouter, Depends

from app.api.deps import CurrentUser, CurrentUserOptional, DbSession, require_role
from app.models.user import User
from app.schemas.booking import BookingCreate, BookingList, BookingRead, BookingStatusUpdate
from app.services import booking_service

router = APIRouter(prefix="/bookings", tags=["bookings"])


@router.post("", response_model=BookingRead, status_code=201)
async def create_booking(
    body: BookingCreate, db: DbSession, user: CurrentUserOptional
) -> BookingRead:
    booking = await booking_service.create_booking(db, body.model_dump(), user)
    return BookingRead.model_validate(booking)


@router.get("/me", response_model=BookingList)
async def list_my_bookings(db: DbSession, user: CurrentUser, limit: int = 50, offset: int = 0) -> BookingList:
    items, count = await booking_service.list_my_bookings(db, user, limit=limit, offset=offset)
    return BookingList(items=[BookingRead.model_validate(b) for b in items], count=count)


@router.get("/{booking_id}", response_model=BookingRead)
async def get_my_booking(booking_id: uuid.UUID, db: DbSession, user: CurrentUser) -> BookingRead:
    booking = await booking_service.get_booking_for_user(db, booking_id, user)
    return BookingRead.model_validate(booking)


@router.get("", response_model=BookingList)
async def admin_list_bookings(
    db: DbSession,
    status: str | None = None,
    limit: int = 100,
    offset: int = 0,
    user: User = Depends(require_role("admin")),
) -> BookingList:
    items, count = await booking_service.list_all_bookings(db, status=status, limit=limit, offset=offset)
    return BookingList(items=[BookingRead.model_validate(b) for b in items], count=count)


@router.patch("/{booking_id}/status", response_model=BookingRead)
async def update_booking_status(
    booking_id: uuid.UUID,
    body: BookingStatusUpdate,
    db: DbSession,
    user: User = Depends(require_role("admin")),
) -> BookingRead:
    booking = await booking_service.update_booking_status(db, booking_id, body.status)
    return BookingRead.model_validate(booking)

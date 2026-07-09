"""Booking service: business logic for booking a test/package/home-collection."""
from __future__ import annotations

import uuid

from sqlalchemy.ext.asyncio import AsyncSession

from app.core.exceptions import NotFoundError, ValidationError
from app.models.booking import Booking
from app.models.user import User
from app.repositories.booking_repository import BookingRepository
from app.repositories.package_repository import HealthPackageRepository, TestCatalogRepository


async def _resolve_catalog_selection(db: AsyncSession, data: dict) -> dict:
    """Validate that the booking references a REAL, active catalog entry.

    Guests/chat users may only supply a package_id, a test_id, or a freeform
    ``test_name`` that must resolve (exact, then partial, case-insensitive
    match) to an active ``TestCatalog`` row. Arbitrary/unknown test names are
    rejected instead of being silently accepted.
    """
    package_id = data.get("package_id")
    test_id = data.get("test_id")
    test_name = (data.get("test_name") or "").strip()
    collection_type = (data.get("collection_type") or "home").strip()

    if package_id is not None:
        package = await HealthPackageRepository(db).get_by_id(package_id)
        if package is None or not package.is_active:
            raise ValidationError("Selected health package was not found")
        if collection_type == "home" and not package.home_collection_available:
            raise ValidationError(
                f"'{package.name}' is only available as a center visit, not home collection."
            )
        data["package_id"] = package.id
        if package.price is not None:
            data["amount_paise"] = int(package.price) * 100
        # A package booking doesn't also need a resolved test.
        if test_id is None and not test_name:
            return data

    test_repo = TestCatalogRepository(db)
    if test_id is not None:
        test = await test_repo.get_by_id(test_id)
        if test is None or not test.is_active:
            raise ValidationError("Selected test was not found in the catalog")
        if collection_type == "home" and not test.home_collection_available:
            raise ValidationError(
                f"'{test.name}' is only available as a center visit, not home collection."
            )
        data["test_id"] = test.id
        data["test_name"] = test.name
        if test.price is not None:
            data["amount_paise"] = int(test.price) * 100
        return data

    if test_name:
        matches = await test_repo.search(test_name, limit=10)
        match = next((t for t in matches if t.name.lower() == test_name.lower()), None)
        if match is None:
            match = next(iter(matches), None)
        if match is None:
            raise ValidationError(
                f"'{test_name}' is not a recognised test. Please choose a test from our catalog."
            )
        if collection_type == "home" and not match.home_collection_available:
            raise ValidationError(
                f"'{match.name}' is only available as a center visit, not home collection."
            )
        data["test_id"] = match.id
        data["test_name"] = match.name
        if match.price is not None:
            data["amount_paise"] = int(match.price) * 100
        return data

    if package_id is None:
        raise ValidationError("Please select a test or health package to book")

    return data


async def create_booking(db: AsyncSession, data: dict, user: User | None) -> Booking:
    repo = BookingRepository(db)
    data = await _resolve_catalog_selection(db, dict(data))
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


async def update_booking(db: AsyncSession, booking_id: uuid.UUID, data: dict) -> Booking:
    """Admin general-purpose update: status, report link, notes, schedule."""
    repo = BookingRepository(db)
    booking = await repo.get_by_id(booking_id)
    if booking is None:
        raise NotFoundError("Booking not found")
    booking = await repo.update(booking, **data)
    await db.commit()
    await db.refresh(booking)
    return booking


async def get_booking_for_user(db: AsyncSession, booking_id: uuid.UUID, user: User) -> Booking:
    repo = BookingRepository(db)
    booking = await repo.get_by_id(booking_id)
    if booking is None or booking.user_id != user.id:
        raise NotFoundError("Booking not found")
    return booking

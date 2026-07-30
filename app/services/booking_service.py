"""Booking service: business logic for booking a test/package/home-collection."""
from __future__ import annotations

import asyncio
import uuid
from datetime import datetime, timedelta, timezone
from zoneinfo import ZoneInfo

from sqlalchemy.ext.asyncio import AsyncSession

from app.core.config import settings
from app.core.exceptions import NotFoundError, ValidationError
from app.core.logging import get_logger
from app.models.booking import Booking
from app.models.user import User
from app.repositories.booking_repository import BookingRepository
from app.repositories.package_repository import HealthPackageRepository, TestCatalogRepository

logger = get_logger(__name__)

# See booking_notification_service._pending_dispatches docstring — same
# rationale applies here: the acknowledgement notification, payment-reminder
# scheduling and staff auto-assignment below are all best-effort side
# effects that each cost a DB round trip (or more); running them
# synchronously in the request was measured to add ~15-20s on top of the
# booking insert itself in production, comfortably enough to trip the
# frontend dev proxy's socket timeout even after SMTP sending was already
# made non-blocking.
_pending_side_effects: set[asyncio.Task] = set()


def _fire_and_forget(coro) -> None:  # noqa: ANN001
    task = asyncio.create_task(coro)
    _pending_side_effects.add(task)
    task.add_done_callback(_pending_side_effects.discard)

_IST = ZoneInfo("Asia/Kolkata")

# How long to wait after an unpaid booking is created before nudging the
# patient to complete payment — gives them (and any quick manual staff
# follow-up) a chance first. Matches the grace window used by the
# `payment_reminder` automation rule, so its recurring cadence (if the admin
# also activates one) picks up seamlessly from this first reminder.
_PAYMENT_REMINDER_DELAY_HOURS = 3


def _parse_slot_datetime(date_str: str, time_str: str) -> datetime | None:
    """Best-effort parse of preferred_date ('YYYY-MM-DD') + preferred_time
    ('6:30 AM' / '3:10 PM') into an IST-aware datetime. Returns None if either
    value is missing/unparseable — callers should skip validation in that case
    rather than reject an otherwise-valid booking."""
    try:
        d = datetime.strptime(date_str, "%Y-%m-%d").date()
        t = datetime.strptime(time_str.strip().upper(), "%I:%M %p").time()
        return datetime.combine(d, t, tzinfo=_IST)
    except (ValueError, AttributeError):
        return None


async def _validate_slot(db: AsyncSession, data: dict) -> None:
    """Reject bookings for a slot that has already passed, or that's already
    at capacity (see ``MAX_BOOKINGS_PER_SLOT``) — prevents everyone piling
    into the same popular 10-minute window.

    A preferred date AND time are mandatory for every booking — this is the
    one choke point every creation path funnels through (the public API's
    ``BookingCreate`` schema, and the chat assistant's ``create_booking``
    tool, which calls this service directly with a raw dict and so never
    goes through that schema's own validation)."""
    date_str = (data.get("preferred_date") or "").strip()
    time_str = (data.get("preferred_time") or "").strip()
    if not date_str or not time_str:
        raise ValidationError("Please select a preferred date and time slot for your booking.")

    slot_dt = _parse_slot_datetime(date_str, time_str)
    if slot_dt is None:
        raise ValidationError(
            "Preferred date/time could not be understood. Please pick a date and time slot again."
        )
    if slot_dt < datetime.now(_IST):
        raise ValidationError(
            "That time slot has already passed. Please choose a later slot."
        )

    counts = await BookingRepository(db).counts_by_time_for_date(date_str)
    if counts.get(time_str, 0) >= settings.MAX_BOOKINGS_PER_SLOT:
        raise ValidationError(
            f"The {time_str} slot on {date_str} is fully booked. Please choose another time."
        )


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
        if match is not None:
            if collection_type == "home" and not match.home_collection_available:
                raise ValidationError(
                    f"'{match.name}' is only available as a center visit, not home collection."
                )
            data["test_id"] = match.id
            data["test_name"] = match.name
            if match.price is not None:
                data["amount_paise"] = int(match.price) * 100
            return data

        # Not a test — the client may have sent a health package's name
        # instead of its id (e.g. a stale/offline catalog on the frontend).
        # Try to resolve it against packages before giving up, so bookings
        # don't fail just because the frontend couldn't map name -> id.
        pkg_matches = await HealthPackageRepository(db).search(test_name, limit=10)
        pkg_match = next((p for p in pkg_matches if p.name.lower() == test_name.lower()), None)
        if pkg_match is None:
            pkg_match = next(iter(pkg_matches), None)
        if pkg_match is not None:
            if collection_type == "home" and not pkg_match.home_collection_available:
                raise ValidationError(
                    f"'{pkg_match.name}' is only available as a center visit, not home collection."
                )
            data["package_id"] = pkg_match.id
            data["test_name"] = pkg_match.name
            if pkg_match.price is not None:
                data["amount_paise"] = int(pkg_match.price) * 100
            return data

        raise ValidationError(
            f"'{test_name}' is not a recognised test or package. Please choose one from our catalog."
        )

    if package_id is None:
        raise ValidationError("Please select a test or health package to book")

    return data


async def create_booking(db: AsyncSession, data: dict, user: User | None) -> Booking:
    repo = BookingRepository(db)
    data = await _resolve_catalog_selection(db, dict(data))
    await _validate_slot(db, data)
    booking = await repo.create(**data, user_id=user.id if user else None)
    await db.commit()
    await db.refresh(booking)

    # Everything below (acknowledgement message, payment-reminder scheduling,
    # staff auto-assignment + its email) is best-effort and deliberately NOT
    # awaited here — see `_fire_and_forget` above. `booking.assigned_to_id`
    # is still None at this point, which SQLAlchemy's lazy loader resolves
    # to `assigned_staff = None` without a DB call, so returning `booking`
    # immediately is safe to serialize (no MissingGreenlet risk).
    _fire_and_forget(_post_booking_side_effects(booking.id))

    return booking


async def _post_booking_side_effects(booking_id: uuid.UUID) -> None:
    """Runs after ``create_booking`` has already returned to its caller.
    Opens its own DB session/transaction, independent of the request's
    (which may already be closed by the time this actually executes)."""
    from app.db.session import AsyncSessionLocal
    from app.services.booking_notification_service import queue_notification
    from app.services.staff_assignment_service import assign_booking

    async with AsyncSessionLocal() as db:
        booking = await BookingRepository(db).get_by_id(booking_id)
        if booking is None:
            logger.warning("Booking %s vanished before background side-effects ran", booking_id)
            return

        # Best-effort "we got your request" acknowledgement — deliberately
        # NOT a "confirmed" message: nothing about the visit is confirmed
        # until payment succeeds (see app.services.payment_service, which
        # sends the real confirmation/"payment received" notice once
        # Razorpay verifies payment).
        channel = "both" if booking.patient_email else "sms"
        try:
            await queue_notification(
                db, booking=booking, channel=channel, notification_type="booking_received", created_by="system"
            )
        except Exception:  # noqa: BLE001
            logger.exception("Failed to queue booking-received notice for booking=%s", booking.id)

        # If money is owed and hasn't been paid, schedule a one-time reminder
        # in case the patient closes the tab before paying (common: they
        # book, get distracted, never complete checkout). If the admin also
        # activates a recurring `payment_reminder` automation rule, its
        # cadence check (latest `payment_reminder` notification already
        # logged) picks up seamlessly from this first one instead of
        # double-sending.
        if booking.amount_paise and booking.payment_status == "unpaid":
            try:
                await queue_notification(
                    db,
                    booking=booking,
                    channel=channel,
                    notification_type="payment_reminder",
                    scheduled_at=datetime.now(timezone.utc) + timedelta(hours=_PAYMENT_REMINDER_DELAY_HOURS),
                    created_by="system",
                )
            except Exception:  # noqa: BLE001
                logger.exception("Failed to schedule payment reminder for booking=%s", booking.id)

        # Auto-assign to exactly one appointments staff member (least-loaded)
        # and email just them — best-effort, never blocks/fails the booking
        # itself (assign_booking already has its own internal try/except).
        try:
            await assign_booking(db, booking)
        except Exception:  # noqa: BLE001
            logger.exception("Failed to auto-assign booking=%s", booking.id)


async def list_my_bookings(
    db: AsyncSession, user: User, limit: int = 50, offset: int = 0
) -> tuple[list[Booking], int]:
    return await BookingRepository(db).list_for_user(user.id, limit=limit, offset=offset)


async def list_all_bookings(
    db: AsyncSession,
    status: str | None,
    limit: int,
    offset: int,
    *,
    assigned_to_id: uuid.UUID | None = None,
    collection_type: str | None = None,
    statuses: list[str] | None = None,
    q: str | None = None,
    visit_type: str | None = None,
    date_from: str | None = None,
    date_to: str | None = None,
) -> tuple[list[Booking], int]:
    return await BookingRepository(db).list_all(
        status=status,
        limit=limit,
        offset=offset,
        assigned_to_id=assigned_to_id,
        collection_type=collection_type,
        statuses=statuses,
        q=q,
        visit_type=visit_type,
        date_from=date_from,
        date_to=date_to,
    )


async def list_patients(
    db: AsyncSession,
    *,
    limit: int = 20,
    offset: int = 0,
    q: str | None = None,
    filter_kind: str | None = None,
) -> tuple[list[dict], int]:
    return await BookingRepository(db).list_patients(
        limit=limit, offset=offset, q=q, filter_kind=filter_kind
    )


# Statuses that imply the visit is locked in / finished — require payment
# first when money is owed on the booking.
_PAYMENT_REQUIRED_STATUSES = frozenset({"confirmed", "completed"})


def _require_paid_if_owed(booking: Booking, *, next_status: str) -> None:
    """Block confirm/complete when the booking has an amount and isn't paid."""
    if next_status not in _PAYMENT_REQUIRED_STATUSES:
        return
    if not booking.amount_paise:
        return
    if booking.payment_status == "paid":
        return
    raise ValidationError(
        f"Cannot mark this booking as '{next_status}' while payment is "
        f"{booking.payment_status or 'unpaid'}. Collect payment first."
    )


async def update_booking_status(db: AsyncSession, booking_id: uuid.UUID, status: str) -> Booking:
    repo = BookingRepository(db)
    booking = await repo.get_by_id(booking_id)
    if booking is None:
        raise NotFoundError("Booking not found")
    _require_paid_if_owed(booking, next_status=status)
    booking = await repo.update_status(booking, status)
    await db.commit()
    return await _reload(repo, booking)


async def update_booking(db: AsyncSession, booking_id: uuid.UUID, data: dict) -> Booking:
    """Admin general-purpose update: status, report link, notes, schedule."""
    repo = BookingRepository(db)
    booking = await repo.get_by_id(booking_id)
    if booking is None:
        raise NotFoundError("Booking not found")
    if "status" in data and data["status"] is not None:
        _require_paid_if_owed(booking, next_status=str(data["status"]))
    booking = await repo.update(booking, **data)
    await db.commit()
    return await _reload(repo, booking)


async def delete_booking(db: AsyncSession, booking_id: uuid.UUID) -> None:
    repo = BookingRepository(db)
    booking = await repo.get_by_id(booking_id)
    if booking is None:
        raise NotFoundError("Booking not found")
    await repo.delete(booking)
    await db.commit()


async def get_booking_for_user(db: AsyncSession, booking_id: uuid.UUID, user: User) -> Booking:
    repo = BookingRepository(db)
    booking = await repo.get_by_id(booking_id)
    if booking is None or booking.user_id != user.id:
        raise NotFoundError("Booking not found")
    return booking


# ── Front-desk lifecycle actions ────────────────────────────────────────────

async def _get_or_404(repo: BookingRepository, booking_id: uuid.UUID) -> Booking:
    booking = await repo.get_by_id(booking_id)
    if booking is None:
        raise NotFoundError("Booking not found")
    return booking


async def _reload(repo: BookingRepository, booking: Booking) -> Booking:
    """Re-fetches ``booking`` via ``get_by_id`` (selectinload-eager) instead
    of ``db.refresh(booking)``: a plain refresh expires — but does NOT
    reload — the ``assigned_staff`` relationship, so any later synchronous
    read of it (e.g. Pydantic's ``BookingRead.assigned_to_name``) would
    trigger an async lazy-load outside a valid greenlet context and crash
    with ``MissingGreenlet``."""
    reloaded = await repo.get_by_id(booking.id)
    return reloaded if reloaded is not None else booking


async def check_in(db: AsyncSession, booking_id: uuid.UUID) -> Booking:
    repo = BookingRepository(db)
    booking = await _get_or_404(repo, booking_id)
    booking = await repo.update(booking, status="checked_in", checked_in_at=datetime.now(timezone.utc))
    await db.commit()
    return await _reload(repo, booking)


async def start_consultation(db: AsyncSession, booking_id: uuid.UUID) -> Booking:
    repo = BookingRepository(db)
    booking = await _get_or_404(repo, booking_id)
    booking = await repo.update(booking, status="in_progress", in_progress_at=datetime.now(timezone.utc))
    await db.commit()
    return await _reload(repo, booking)


async def complete_booking(db: AsyncSession, booking_id: uuid.UUID) -> Booking:
    repo = BookingRepository(db)
    booking = await _get_or_404(repo, booking_id)
    _require_paid_if_owed(booking, next_status="completed")
    booking = await repo.update(booking, status="completed", completed_at=datetime.now(timezone.utc))
    await db.commit()
    return await _reload(repo, booking)


async def mark_no_show(db: AsyncSession, booking_id: uuid.UUID) -> Booking:
    repo = BookingRepository(db)
    booking = await _get_or_404(repo, booking_id)
    booking = await repo.update(booking, status="no_show")
    await db.commit()
    return await _reload(repo, booking)


async def toggle_delay(db: AsyncSession, booking_id: uuid.UUID, is_delayed: bool) -> Booking:
    repo = BookingRepository(db)
    booking = await _get_or_404(repo, booking_id)
    booking = await repo.update(booking, is_delayed=is_delayed)
    await db.commit()
    return await _reload(repo, booking)


async def reschedule(
    db: AsyncSession,
    booking_id: uuid.UUID,
    *,
    preferred_date: str,
    preferred_time: str,
    notify: bool = True,
    channel: str = "sms",
) -> Booking:
    repo = BookingRepository(db)
    booking = await _get_or_404(repo, booking_id)
    booking = await repo.update(
        booking,
        preferred_date=preferred_date,
        preferred_time=preferred_time,
        status="confirmed",
        was_rescheduled=True,
    )
    await db.commit()
    booking = await _reload(repo, booking)

    if notify:
        try:
            from app.services.booking_notification_service import queue_notification

            await queue_notification(
                db, booking=booking, channel=channel, notification_type="reschedule", created_by="staff"
            )
        except Exception:  # noqa: BLE001
            logger.exception("Failed to queue reschedule notification for booking=%s", booking.id)

    return booking

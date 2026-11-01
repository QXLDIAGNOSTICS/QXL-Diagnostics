"""Booking service: business logic for booking a test/package/home-collection."""
from __future__ import annotations

import asyncio
import re
import uuid
from datetime import date, datetime, time, timedelta, timezone
from zoneinfo import ZoneInfo

from sqlalchemy.ext.asyncio import AsyncSession

from app.core.config import settings
from app.core.exceptions import NotFoundError, ValidationError
from app.core.logging import get_logger
from app.models.booking import Booking
from app.models.catalog import HealthPackage, TestCatalog
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


_DATE_FORMATS = (
    "%Y-%m-%d",
    "%d-%m-%Y",
    "%d/%m/%Y",
    "%d %b %Y",
    "%d %B %Y",
    "%b %d %Y",
    "%B %d %Y",
)
# Formats without a year (e.g. the /book page's "16 Sep" date chips).
_YEARLESS_DATE_FORMATS = ("%d %b", "%d %B", "%b %d", "%B %d")
_URGENT_MARKERS = ("urgent", "asap", "next 60", "within 60", "immediate")
# "6:30 AM" / "7 am" / "6.30 p.m." (groups 1-3), or a bare 24h "14:30" (groups 4-5).
_TIME_TOKEN = re.compile(
    r"(\d{1,2})(?:[:.](\d{2}))?\s*([ap])\.?\s*m\b\.?|(\d{1,2})[:.](\d{2})", re.I
)


def _normalize_date(raw: str) -> date | None:
    """Parse the preferred date the various website forms send — ISO
    ('2026-11-02', or an ISO datetime), 'DD-MM-YYYY', '16 Sep', 'Mon, 16 Sep',
    'today', 'tomorrow' — into a date (IST). Year-less dates resolve to the
    next occurrence of that day."""
    s = (raw or "").strip()
    if not s:
        return None
    today = datetime.now(_IST).date()
    lowered = s.lower()
    if lowered.startswith("today"):
        return today
    if lowered.startswith("tomorrow"):
        return today + timedelta(days=1)
    if re.match(r"^\d{4}-\d{2}-\d{2}T", s):
        s = s[:10]
    # Drop a leading weekday ("Mon, 16 Sep" / "Monday 16 Sep") and ordinal suffixes ("16th").
    s = re.sub(r"^[A-Za-z]{3,9},?\s+(?=\d)", "", s)
    s = re.sub(r"(\d)(st|nd|rd|th)\b", r"\1", s, flags=re.I).replace(",", " ")
    s = re.sub(r"\s+", " ", s).strip()
    for fmt in _DATE_FORMATS:
        try:
            return datetime.strptime(s, fmt).date()
        except ValueError:
            continue
    for fmt in _YEARLESS_DATE_FORMATS:
        try:
            parsed = datetime.strptime(f"{s} {today.year}", f"{fmt} %Y").date()
        except ValueError:
            continue
        # "2 Jan" picked in late December means next January, not last.
        if parsed < today - timedelta(days=180):
            parsed = parsed.replace(year=today.year + 1)
        return parsed
    return None


def _fmt_time(t: time) -> str:
    hour = t.hour % 12 or 12
    return f"{hour}:{t.minute:02d} {'AM' if t.hour < 12 else 'PM'}"


def _normalize_time(raw: str) -> tuple[str, time | None, time | None, bool] | None:
    """Parse a preferred time slot into ``(label, start, end, is_urgent)``.

    Accepts a single time ('6:30 AM', '06:30 am', '14:30') or a window
    ('6:00 – 8:00 AM', '07:00 AM - 10:00 AM', '10:00 AM – 12:00 PM'), plus
    the /book page's 'Next 60 Minutes (Urgent)' option. The returned label is
    canonical ASCII ('6:30 AM' / '6:00 AM - 8:00 AM' / 'Urgent (within 1 hr)')
    so slot-capacity counts group identical slots and SMS bodies stay GSM-7
    safe and inside DLT's 30-character variable limit."""
    s = (raw or "").strip()
    if not s:
        return None
    if any(marker in s.lower() for marker in _URGENT_MARKERS):
        return "Urgent (within 1 hr)", None, None, True

    tokens: list[tuple[int, int, str | None]] = []
    for m in _TIME_TOKEN.finditer(s):
        if m.group(1) is not None:
            tokens.append((int(m.group(1)), int(m.group(2) or 0), m.group(3).lower()))
        else:
            tokens.append((int(m.group(4)), int(m.group(5)), None))
    if not tokens:
        return None

    def _to_time(hour: int, minute: int, meridiem: str | None) -> time | None:
        if minute > 59:
            return None
        if meridiem is None:
            return time(hour, minute) if hour <= 23 else None
        if not 1 <= hour <= 12:
            return None
        hour = hour % 12 + (12 if meridiem == "p" else 0)
        return time(hour, minute)

    first, last = tokens[0], tokens[-1]
    end = _to_time(*last) if len(tokens) > 1 else None
    if len(tokens) > 1 and first[2] is None and last[2] is not None:
        # "6:00 – 8:00 AM": the start inherits the end's meridiem, unless that
        # would put it after the end ("10:00 – 12:00 PM" starts at 10 AM).
        start = _to_time(first[0], first[1], last[2])
        if start is not None and end is not None and start > end:
            start = _to_time(first[0], first[1], "a" if last[2] == "p" else "p")
    else:
        start = _to_time(*first)
    if start is None or (len(tokens) > 1 and end is None):
        return None

    label = _fmt_time(start) if end is None else f"{_fmt_time(start)} - {_fmt_time(end)}"
    return label, start, end, False


async def _validate_slot(db: AsyncSession, data: dict) -> None:
    """Normalize the preferred date/time, then reject bookings for a slot that
    has already passed, or that's already at capacity (see
    ``MAX_BOOKINGS_PER_SLOT``) — prevents everyone piling into the same
    popular 10-minute window.

    A preferred date AND time are mandatory for every booking — this is the
    one choke point every creation path funnels through (the public API's
    ``BookingCreate`` schema, and the chat assistant's ``create_booking``
    tool, which calls this service directly with a raw dict and so never
    goes through that schema's own validation). ``data`` is updated in place
    with the ISO date and canonical time label so admin date filters, stats
    and reminders all see one consistent format."""
    date_raw = (data.get("preferred_date") or "").strip()
    time_raw = (data.get("preferred_time") or "").strip()
    if not date_raw or not time_raw:
        raise ValidationError("Please select a preferred date and time slot for your booking.")

    slot_date = _normalize_date(date_raw)
    parsed_time = _normalize_time(time_raw)
    if slot_date is None or parsed_time is None:
        raise ValidationError(
            "Preferred date/time could not be understood. Please pick a date and time slot again."
        )
    label, start, end, is_urgent = parsed_time
    date_str = slot_date.isoformat()
    data["preferred_date"] = date_str
    data["preferred_time"] = label

    now = datetime.now(_IST)
    if is_urgent:
        if slot_date < now.date():
            raise ValidationError("That date has already passed. Please choose a later date.")
        data["is_urgent"] = True
        return

    # A window ("6:00 AM - 8:00 AM") stays bookable until it ends.
    cutoff = datetime.combine(slot_date, end or start, tzinfo=_IST)
    if cutoff < now:
        raise ValidationError(
            "That time slot has already passed. Please choose a later slot."
        )

    counts = await BookingRepository(db).counts_by_time_for_date(date_str)
    if counts.get(label, 0) >= settings.MAX_BOOKINGS_PER_SLOT:
        raise ValidationError(
            f"The {label} slot on {date_str} is fully booked. Please choose another time."
        )


def _normalize_catalog_name(name: str) -> str:
    import re

    name = (name or "").lower().replace("&", " and ")
    return re.sub(r"[^a-z0-9]+", " ", name).strip()


def _contains_words(haystack: list[str], needle: list[str]) -> bool:
    n = len(needle)
    if not 0 < n <= len(haystack):
        return False
    return any(haystack[i : i + n] == needle for i in range(len(haystack) - n + 1))


def _catalog_match_stage[T](
    query: str, items: list[T], *, name_getter, stage: str
) -> T | None:
    """One matching pass over ``items``:

    - ``exact``: same normalized name ("Lipid Profile" == "LIPID PROFILE").
    - ``contained``: one name is a whole-word run inside the other ("CBC" in
      "Complete Blood Count (CBC)"); the closest-length candidate wins.

    Deliberately no looser word-overlap matching — that conflated distinct
    tests ("Kidney Function Test Panel" -> "Liver Function Test Panel",
    "CA 19-9" -> "CA 125"), booking the wrong test at the wrong price.
    """
    nq = _normalize_catalog_name(query)
    if not nq or not items:
        return None
    if stage == "exact":
        return next((i for i in items if _normalize_catalog_name(name_getter(i)) == nq), None)

    q_words = nq.split()
    best: T | None = None
    best_gap: int | None = None
    for item in items:
        words = _normalize_catalog_name(name_getter(item)).split()
        if _contains_words(words, q_words) or _contains_words(q_words, words):
            gap = abs(len(words) - len(q_words))
            if best_gap is None or gap < best_gap:
                best, best_gap = item, gap
    return best


_MATCH_STAGES = ("exact", "contained")


def _best_catalog_match[T](query: str, items: list[T], *, name_getter) -> T | None:
    """Exact → whole-word containment match (see ``_catalog_match_stage``)."""
    for stage in _MATCH_STAGES:
        match = _catalog_match_stage(query, items, name_getter=name_getter, stage=stage)
        if match is not None:
            return match
    return None


def is_package_bookable_online(package: HealthPackage) -> bool:
    """Packages flagged "contact for price" (or with no price) are enquiry-only:
    they are shown on the site but cannot be priced, booked or paid online."""
    return not package.contact_for_price and (package.price or 0) > 0


async def resolve_catalog_name(
    db: AsyncSession,
    name: str,
    *,
    tests: list[TestCatalog] | None = None,
    packages: list[HealthPackage] | None = None,
) -> tuple[str, TestCatalog | HealthPackage] | None:
    """The active test or package a free-text name books, as
    ``("test" | "package", row)`` — the single rule used both when creating a
    booking and when a checkout page asks what an item will cost.

    The catalog is small (a few hundred rows), so this matches against all of
    it rather than an SQL ILIKE on the full name, which missed spelling
    variants. Each stage checks tests then packages before falling back to
    the looser stage, so an exact package name is never shadowed by a
    partial test-name match. Pass ``tests``/``packages`` to reuse one load
    across many lookups."""
    if tests is None:
        tests = await TestCatalogRepository(db).get_all_active()
    if packages is None:
        packages = await HealthPackageRepository(db).get_all_active()
    packages = [p for p in packages if is_package_bookable_online(p)]
    for stage in _MATCH_STAGES:
        test = _catalog_match_stage(name, tests, name_getter=lambda t: t.name, stage=stage)
        if test is not None:
            return "test", test
        package = _catalog_match_stage(name, packages, name_getter=lambda p: p.name, stage=stage)
        if package is not None:
            return "package", package
    return None


async def _resolve_catalog_selection(db: AsyncSession, data: dict) -> dict:
    """Validate that the booking references a REAL, active catalog entry.

    Guests/chat users may only supply a package_id, a test_id, or a freeform
    ``test_name`` that must resolve (exact, then partial, case-insensitive
    match) to an active catalog row. Arbitrary/unknown test names are
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
        if not is_package_bookable_online(package):
            raise ValidationError(
                f"'{package.name}' is priced on request and can't be booked online. "
                "Please call us or send a WhatsApp message to arrange it."
            )
        data["package_id"] = package.id
        data["test_id"] = None
        data["test_name"] = package.name
        data["amount_paise"] = int(package.price) * 100
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
        match = await resolve_catalog_name(db, test_name)
        if match is not None:
            kind, item = match
            if collection_type == "home" and not item.home_collection_available:
                raise ValidationError(
                    f"'{item.name}' is only available as a center visit, not home collection."
                )
            data["test_id"] = item.id if kind == "test" else None
            data["package_id"] = item.id if kind == "package" else None
            data["test_name"] = item.name
            if item.price is not None:
                data["amount_paise"] = int(item.price) * 100
            return data

        raise ValidationError(
            f"'{test_name}' is not a recognised test or package. Please choose one from our catalog."
        )

    raise ValidationError("Please select a test or health package to book")


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
    # Staff may move a booking to any slot (no past/capacity checks), but keep
    # the stored format consistent with new bookings when it's parseable.
    parsed_date = _normalize_date(preferred_date)
    parsed_time = _normalize_time(preferred_time)
    booking = await repo.update(
        booking,
        preferred_date=parsed_date.isoformat() if parsed_date else preferred_date,
        preferred_time=parsed_time[0] if parsed_time else preferred_time,
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

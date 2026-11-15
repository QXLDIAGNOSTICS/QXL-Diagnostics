"""Family profiles, saved addresses, PIN serviceability and visit slots."""

from __future__ import annotations

import uuid
from datetime import date, datetime, time, timedelta

from sqlalchemy import func, select, text
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.config import settings
from app.core.exceptions import NotFoundError, ValidationError
from app.core.roles import ROLE_COLLECTOR
from app.models.collect import (
    PROFILE_RELATIONS,
    CollectorProfile,
    HomeVisit,
    PatientAddress,
    PatientProfile,
    ServiceArea,
)
from app.models.user import User
from app.services.booking_service import _normalize_time
from app.services.collect.common import IST, now_ist, profile_reference, today_ist

# ── Profiles ────────────────────────────────────────────────────────────────


def _validate_profile_fields(data: dict) -> None:
    name = (data.get("full_name") or "").strip()
    if "full_name" in data and not 2 <= len(name) <= 120:
        raise ValidationError("Enter the patient's full name.")
    dob = data.get("date_of_birth")
    if dob is not None:
        if dob > today_ist():
            raise ValidationError("Date of birth can't be in the future.")
        if dob < today_ist().replace(year=today_ist().year - 125):
            raise ValidationError("Please check the date of birth.")
    relation = data.get("relation")
    if relation is not None and relation not in PROFILE_RELATIONS:
        raise ValidationError(f"Relation must be one of: {', '.join(PROFILE_RELATIONS)}")


async def list_profiles(db: AsyncSession, user: User) -> list[PatientProfile]:
    rows = (
        await db.execute(
            select(PatientProfile)
            .where(PatientProfile.account_id == user.id, PatientProfile.is_archived.is_(False))
            .order_by(PatientProfile.relation != "self", PatientProfile.created_at)
        )
    ).scalars()
    return list(rows)


async def create_profile(db: AsyncSession, user: User, data: dict) -> PatientProfile:
    _validate_profile_fields(data)
    if data.get("relation", "self") == "self":
        existing = (
            await db.execute(
                select(PatientProfile).where(
                    PatientProfile.account_id == user.id,
                    PatientProfile.relation == "self",
                    PatientProfile.is_archived.is_(False),
                )
            )
        ).scalar_one_or_none()
        if existing is not None:
            raise ValidationError("You already have a profile for yourself. Edit it instead.")
    count = (
        await db.scalar(
            select(func.count())
            .select_from(PatientProfile)
            .where(PatientProfile.account_id == user.id, PatientProfile.is_archived.is_(False))
        )
    ) or 0
    if count >= 10:
        raise ValidationError("You can save up to 10 patient profiles.")
    profile = PatientProfile(
        account_id=user.id,
        reference=profile_reference(),
        full_name=data["full_name"].strip(),
        date_of_birth=data["date_of_birth"],
        gender=data.get("gender"),
        relation=data.get("relation") or "self",
        phone=data.get("phone"),
    )
    db.add(profile)
    # Keep the account's own name/DOB in step with its "self" profile.
    if profile.relation == "self":
        user.name = user.name or profile.full_name
        user.date_of_birth = user.date_of_birth or profile.date_of_birth
    await db.commit()
    await db.refresh(profile)
    return profile


async def get_profile(db: AsyncSession, user: User, profile_id: uuid.UUID) -> PatientProfile:
    profile = await db.get(PatientProfile, profile_id)
    if profile is None or profile.account_id != user.id or profile.is_archived:
        raise NotFoundError("Profile not found")
    return profile


async def update_profile(
    db: AsyncSession, user: User, profile_id: uuid.UUID, data: dict
) -> PatientProfile:
    profile = await get_profile(db, user, profile_id)
    _validate_profile_fields(data)
    if data.get("relation") == "self" and profile.relation != "self":
        raise ValidationError("You already have a profile for yourself.")
    for field in ("full_name", "date_of_birth", "gender", "relation", "phone"):
        if field in data and data[field] is not None:
            setattr(
                profile, field, data[field].strip() if isinstance(data[field], str) else data[field]
            )
    await db.commit()
    await db.refresh(profile)
    return profile


async def archive_profile(db: AsyncSession, user: User, profile_id: uuid.UUID) -> None:
    """Profiles are archived, not deleted, so past bookings keep their link."""
    profile = await get_profile(db, user, profile_id)
    profile.is_archived = True
    await db.commit()


# ── Addresses ───────────────────────────────────────────────────────────────


def _validate_address(data: dict) -> None:
    pincode = (data.get("pincode") or "").strip()
    if "pincode" in data and (len(pincode) != 6 or not pincode.isdigit()):
        raise ValidationError("Enter a valid 6-digit PIN code.")
    for field, label in (("house", "house / flat"), ("locality", "locality")):
        if field in data and not (data.get(field) or "").strip():
            raise ValidationError(f"Enter the {label}.")
    lat, lng = data.get("lat"), data.get("lng")
    if (lat is None) != (lng is None):
        raise ValidationError("Map location needs both latitude and longitude.")
    if lat is not None and not (-90 <= lat <= 90 and -180 <= lng <= 180):
        raise ValidationError("Invalid map location.")


async def list_addresses(db: AsyncSession, user: User) -> list[PatientAddress]:
    rows = (
        await db.execute(
            select(PatientAddress)
            .where(PatientAddress.account_id == user.id)
            .order_by(PatientAddress.is_default.desc(), PatientAddress.created_at.desc())
        )
    ).scalars()
    return list(rows)


async def _clear_default(db: AsyncSession, user: User) -> None:
    for row in await list_addresses(db, user):
        row.is_default = False


async def create_address(db: AsyncSession, user: User, data: dict) -> PatientAddress:
    _validate_address(data)
    existing = await list_addresses(db, user)
    if len(existing) >= 10:
        raise ValidationError("You can save up to 10 addresses.")
    make_default = bool(data.pop("is_default", False)) or not existing
    if make_default:
        await _clear_default(db, user)
    address = PatientAddress(account_id=user.id, is_default=make_default, **data)
    db.add(address)
    await db.commit()
    await db.refresh(address)
    return address


async def get_address(db: AsyncSession, user: User, address_id: uuid.UUID) -> PatientAddress:
    address = await db.get(PatientAddress, address_id)
    if address is None or address.account_id != user.id:
        raise NotFoundError("Address not found")
    return address


async def update_address(
    db: AsyncSession, user: User, address_id: uuid.UUID, data: dict
) -> PatientAddress:
    address = await get_address(db, user, address_id)
    _validate_address(data)
    if data.pop("is_default", False):
        await _clear_default(db, user)
        address.is_default = True
    for key, value in data.items():
        setattr(address, key, value)
    await db.commit()
    await db.refresh(address)
    return address


async def delete_address(db: AsyncSession, user: User, address_id: uuid.UUID) -> None:
    address = await get_address(db, user, address_id)
    await db.delete(address)
    await db.commit()


# ── Serviceability ──────────────────────────────────────────────────────────


async def service_area_for(db: AsyncSession, pincode: str) -> ServiceArea | None:
    pincode = (pincode or "").strip()
    if len(pincode) != 6 or not pincode.isdigit():
        return None
    return (
        await db.execute(
            select(ServiceArea).where(
                ServiceArea.pincode == pincode, ServiceArea.is_active.is_(True)
            )
        )
    ).scalar_one_or_none()


def collection_fee_paise(area: ServiceArea | None, items_total_paise: int) -> int:
    """Per-PIN fee when configured, otherwise the site-wide rule the website
    already shows (flat fee below the free-collection threshold)."""
    if area is not None and area.collection_fee_paise is not None:
        return max(0, area.collection_fee_paise)
    if (
        settings.HOME_COLLECTION_FEE <= 0
        or items_total_paise >= settings.HOME_COLLECTION_FREE_ABOVE * 100
    ):
        return 0
    return settings.HOME_COLLECTION_FEE * 100


# ── Slots ───────────────────────────────────────────────────────────────────


def _parse_hhmm(value: str) -> time:
    hour, minute = value.split(":")
    return time(int(hour), int(minute))


def configured_slots() -> list[tuple[str, time, time | None]]:
    slots: list[tuple[str, time, time | None]] = []
    seen: set[str] = set()
    for raw in settings.BOOKING_SLOTS:
        parsed = _normalize_time(raw)
        if parsed is None or parsed[3] or parsed[1] is None or parsed[0] in seen:
            continue
        seen.add(parsed[0])
        slots.append((parsed[0], parsed[1], parsed[2]))
    return slots


async def collectors_on_shift(
    db: AsyncSession, zone: str, day: date, start: time, end: time | None
) -> list[CollectorProfile]:
    rows = (
        (
            await db.execute(
                select(CollectorProfile)
                .join(User, User.id == CollectorProfile.user_id)
                .where(
                    CollectorProfile.zone == zone,
                    CollectorProfile.is_active.is_(True),
                    User.role == ROLE_COLLECTOR,
                )
            )
        )
        .scalars()
        .all()
    )
    weekday = day.weekday()
    result = []
    for c in rows:
        if weekday not in (c.working_days or []):
            continue
        try:
            shift_start, shift_end = _parse_hhmm(c.shift_start), _parse_hhmm(c.shift_end)
        except (ValueError, AttributeError):
            continue
        if shift_start <= start and (end or start) <= shift_end:
            result.append(c)
    return result


async def slot_capacity(
    db: AsyncSession, zone: str, day: date, start: time, end: time | None
) -> int:
    collectors = await collectors_on_shift(db, zone, day, start, end)
    if collectors:
        return len(collectors) * max(settings.VISITS_PER_COLLECTOR_PER_SLOT, 1)
    return max(settings.HOME_VISIT_DEFAULT_SLOT_CAPACITY, 0)


async def booked_visits(db: AsyncSession, zone: str, day: date, label: str) -> int:
    return (
        await db.scalar(
            select(func.count())
            .select_from(HomeVisit)
            .where(
                HomeVisit.zone == zone,
                HomeVisit.slot_date == day,
                HomeVisit.slot_label == label,
                HomeVisit.status != "cancelled",
            )
        )
    ) or 0


async def visit_slots(db: AsyncSession, day: date, pincode: str) -> dict:
    area = await service_area_for(db, pincode)
    if area is None:
        return {"date": day.isoformat(), "serviceable": False, "slots": []}
    if day < today_ist() or day > today_ist() + timedelta(days=settings.HOME_VISIT_BOOKING_DAYS):
        return {"date": day.isoformat(), "serviceable": True, "slots": []}
    now = now_ist()
    options = []
    for label, start, end in configured_slots():
        cutoff = datetime.combine(day, end or start, tzinfo=IST)
        capacity = await slot_capacity(db, area.zone, day, start, end)
        booked = await booked_visits(db, area.zone, day, label)
        reason = None
        if cutoff <= now:
            reason = "past"
        elif capacity <= 0:
            reason = "no_collectors"
        elif booked >= capacity:
            reason = "full"
        options.append(
            {
                "label": label,
                "start": start.strftime("%H:%M"),
                "end": end.strftime("%H:%M") if end else None,
                "available": reason is None,
                "remaining": max(capacity - booked, 0) if reason is None else 0,
                "unavailable_reason": reason,
            }
        )
    return {"date": day.isoformat(), "serviceable": True, "zone": area.zone, "slots": options}


async def lock_slot(db: AsyncSession, zone: str, day: date, label: str) -> None:
    """Serialises concurrent bookings of the same zone/slot inside a
    transaction so capacity can't be oversold."""
    await db.execute(
        text("SELECT pg_advisory_xact_lock(hashtext(:k))"),
        {"k": f"{zone}|{day.isoformat()}|{label}"},
    )

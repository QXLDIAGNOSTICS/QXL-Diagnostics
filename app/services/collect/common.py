"""Shared helpers for QXL Collect services: references, audit events, time,
distance/ETA and idempotent request replay."""

from __future__ import annotations

import math
import secrets
import string
import uuid
from collections.abc import Awaitable, Callable
from datetime import UTC, date, datetime
from typing import Any
from zoneinfo import ZoneInfo

from fastapi.encoders import jsonable_encoder
from fastapi.responses import JSONResponse
from sqlalchemy import select
from sqlalchemy.exc import IntegrityError
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.config import settings
from app.models.collect import CollectEvent, IdempotencyRecord

IST = ZoneInfo("Asia/Kolkata")
_ALNUM = string.ascii_uppercase + string.digits


def now_utc() -> datetime:
    return datetime.now(UTC)


def now_ist() -> datetime:
    return datetime.now(IST)


def today_ist() -> date:
    return now_ist().date()


def aware(dt: datetime | None) -> datetime | None:
    if dt is None:
        return None
    return dt if dt.tzinfo is not None else dt.replace(tzinfo=UTC)


def _token(n: int) -> str:
    return "".join(secrets.choice(_ALNUM) for _ in range(n))


def visit_reference() -> str:
    return f"QXL-HC-{today_ist():%y%m%d}-{_token(4)}"


def job_reference() -> str:
    return f"QXL-JOB-{_token(6)}"


def manifest_reference() -> str:
    return f"QXL-MFT-{today_ist():%y%m%d}-{_token(4)}"


def report_reference() -> str:
    return f"QXL-RPT-{_token(6)}"


def profile_reference() -> str:
    return f"QXL-PAT-{_token(6)}"


def visit_code() -> str:
    return f"{secrets.randbelow(10000):04d}"


def haversine_m(lat1: float, lng1: float, lat2: float, lng2: float) -> float:
    """Great-circle distance in metres."""
    r = 6_371_000.0
    p1, p2 = math.radians(lat1), math.radians(lat2)
    dp = math.radians(lat2 - lat1)
    dl = math.radians(lng2 - lng1)
    a = math.sin(dp / 2) ** 2 + math.cos(p1) * math.cos(p2) * math.sin(dl / 2) ** 2
    return 2 * r * math.asin(math.sqrt(a))


def eta_seconds(distance_m: float) -> int:
    """Rough road ETA: straight-line distance × 1.35 detour factor at the
    configured average urban speed. Labelled as an estimate in the apps."""
    speed_mps = max(settings.ETA_AVERAGE_SPEED_KMH, 1.0) * 1000 / 3600
    return int(distance_m * 1.35 / speed_mps)


async def record_event(
    db: AsyncSession,
    *,
    entity_type: str,
    entity_id: uuid.UUID | str,
    event: str,
    visit_id: uuid.UUID | None = None,
    from_status: str | None = None,
    to_status: str | None = None,
    actor: Any = None,
    lat: float | None = None,
    lng: float | None = None,
    details: dict | None = None,
    patient_visible: bool = False,
) -> CollectEvent:
    """Append to the audit trail. Caller commits."""
    row = CollectEvent(
        visit_id=visit_id,
        entity_type=entity_type,
        entity_id=str(entity_id),
        event=event,
        from_status=from_status,
        to_status=to_status,
        actor_id=getattr(actor, "id", None),
        actor_role=getattr(actor, "role", None),
        lat=lat,
        lng=lng,
        details=details,
        patient_visible=patient_visible,
    )
    db.add(row)
    return row


async def idempotent(
    db: AsyncSession,
    *,
    actor_id: uuid.UUID,
    key: str | None,
    route: str,
    run: Callable[[], Awaitable[Any]],
    status_code: int = 200,
) -> Any:
    """Run ``run`` once per (actor, Idempotency-Key). A retry with the same key
    gets the first response back instead of repeating the side effects —
    used by booking creation and every offline-queued collector action."""
    key = (key or "").strip()[:80]
    if not key:
        return await run()

    existing = (
        await db.execute(
            select(IdempotencyRecord).where(
                IdempotencyRecord.actor_id == actor_id, IdempotencyRecord.key == key
            )
        )
    ).scalar_one_or_none()
    if existing is not None:
        return JSONResponse(
            existing.response,
            status_code=existing.status_code,
            headers={"Idempotent-Replay": "true"},
        )

    result = await run()
    payload = jsonable_encoder(result)
    db.add(
        IdempotencyRecord(
            actor_id=actor_id, key=key, route=route, status_code=status_code, response=payload
        )
    )
    try:
        await db.commit()
    except IntegrityError:
        # A concurrent duplicate stored first; its effects already happened.
        await db.rollback()
    return result

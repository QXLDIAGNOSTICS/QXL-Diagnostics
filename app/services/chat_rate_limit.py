"""Chat message rate limiting service.

Enforces daily message quotas:
  - Logged-in users:  100 messages/day  (keyed on user.id)
  - Guest / anonymous: 50 messages/day  (keyed on a composite fingerprint
      derived from X-Forwarded-For/client IP + User-Agent + sec-ch-ua-platform
      so that common shared IPs – e.g. NAT, mobile carriers – are still
      differentiated by device/browser).

Storage: PostgreSQL via the ``chat_rate_limits`` table.  We intentionally
avoid Redis as a dependency; the DB is already present.  The counter is reset
at midnight UTC each calendar day via a simple date-keyed row.

Fingerprint collision note
--------------------------
No fingerprint scheme is perfect.  We deliberately combine three signals:
    1. Canonicalised client IP   (handles most VPN/proxy cases)
    2. User-Agent string hash    (differentiates devices behind shared NAT)
    3. sec-ch-ua-platform header (OS-level differentiation)

This is good enough to prevent casual quota abuse without being so strict
that two siblings on the same home router can't both chat.  The frontend
also stores a UUID in localStorage (``qxl_guest_chat_id``) sent as
``X-Guest-Chat-Id`` – if present it is included in the fingerprint so the
same guest is tracked consistently across sessions on the same device.
"""
from __future__ import annotations

import hashlib
from datetime import date, datetime, timezone

from fastapi import Request
from sqlalchemy import select, text
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.logging import get_logger

logger = get_logger(__name__)

# ── Limits ────────────────────────────────────────────────────────────────────
AUTHENTICATED_DAILY_LIMIT = 100
GUEST_DAILY_LIMIT = 50

# Returned to callers so the frontend can show a useful message.
LIMIT_HEADERS = {
    "authenticated": AUTHENTICATED_DAILY_LIMIT,
    "guest": GUEST_DAILY_LIMIT,
}


# ── Helpers ───────────────────────────────────────────────────────────────────

def _today_utc() -> date:
    return datetime.now(timezone.utc).date()


def _client_ip(request: Request) -> str:
    """Return the best-guess real client IP, respecting reverse-proxy headers."""
    forwarded = request.headers.get("x-forwarded-for")
    if forwarded:
        # X-Forwarded-For may be a comma-separated chain; first entry is client.
        return forwarded.split(",")[0].strip()
    real_ip = request.headers.get("x-real-ip")
    if real_ip:
        return real_ip.strip()
    return request.client.host if request.client else "unknown"


def _guest_fingerprint(request: Request) -> str:
    """Build a stable, privacy-safe fingerprint for anonymous chat sessions.

    Components (all hashed together via SHA-256):
      • Client IP (canonicalised)
      • User-Agent header
      • sec-ch-ua-platform header  (Win / macOS / Android / iOS / Linux / …)
      • X-Guest-Chat-Id header      (UUID stored in localStorage by the frontend)

    The resulting hex digest is truncated to 32 chars to keep the DB key small.
    """
    ip = _client_ip(request)
    ua = request.headers.get("user-agent", "")
    platform = request.headers.get("sec-ch-ua-platform", "")
    guest_id = request.headers.get("x-guest-chat-id", "")  # localStorage UUID

    raw = f"{ip}|{ua}|{platform}|{guest_id}"
    return hashlib.sha256(raw.encode()).hexdigest()[:32]


# ── DB helpers (raw SQL to avoid a new ORM model migration) ───────────────────

_CREATE_TABLE_SQL = text("""
CREATE TABLE IF NOT EXISTS chat_rate_limits (
    key       TEXT        NOT NULL,
    day       DATE        NOT NULL,
    count     INTEGER     NOT NULL DEFAULT 0,
    PRIMARY KEY (key, day)
);
""")


async def _ensure_table(db: AsyncSession) -> None:
    """Idempotently create the rate-limit table if it doesn't exist yet.

    Called lazily on first use rather than via an Alembic migration so that
    existing deployments don't need a migration step just to get rate limiting.
    This is a no-op if the table already exists.
    """
    await db.execute(_CREATE_TABLE_SQL)
    await db.commit()


async def _increment_and_get(db: AsyncSession, key: str, today: date) -> int:
    """Upsert the counter for (key, today) and return the NEW count.

    Uses an UPSERT so there's no race between check and increment.
    """
    upsert = text("""
        INSERT INTO chat_rate_limits (key, day, count)
        VALUES (:key, :day, 1)
        ON CONFLICT (key, day)
        DO UPDATE SET count = chat_rate_limits.count + 1
        RETURNING count
    """)
    result = await db.execute(upsert, {"key": key, "day": today})
    await db.commit()
    row = result.fetchone()
    return row[0] if row else 1


async def _get_count(db: AsyncSession, key: str, today: date) -> int:
    """Read the current counter without incrementing (for status checks)."""
    stmt = select(text("count")).select_from(
        text("chat_rate_limits")
    ).where(text("key = :key AND day = :day"))
    result = await db.execute(stmt, {"key": key, "day": today})
    row = result.fetchone()
    return row[0] if row else 0


# ── Public API ────────────────────────────────────────────────────────────────

class RateLimitExceeded(Exception):
    """Raised when the caller has hit their daily quota."""

    def __init__(self, limit: int, count: int, kind: str) -> None:
        self.limit = limit
        self.count = count
        self.kind = kind  # 'authenticated' | 'guest'
        super().__init__(f"Daily chat limit of {limit} messages reached ({kind})")


async def check_and_increment(
    db: AsyncSession,
    request: Request,
    user_id: str | None,
) -> dict:
    """Check the quota and increment the counter for this request.

    Args:
        db:       Async DB session.
        request:  FastAPI Request object (needed for IP / UA fingerprint).
        user_id:  Stringified user UUID if authenticated, else None.

    Returns:
        Dict with ``{used, limit, remaining, kind}`` so the caller can attach
        these as response headers (X-RateLimit-*) for frontend visibility.

    Raises:
        RateLimitExceeded: if the quota for today is already exhausted.
    """
    await _ensure_table(db)
    today = _today_utc()

    if user_id:
        key = f"auth:{user_id}"
        limit = AUTHENTICATED_DAILY_LIMIT
        kind = "authenticated"
    else:
        key = f"guest:{_guest_fingerprint(request)}"
        limit = GUEST_DAILY_LIMIT
        kind = "guest"

    new_count = await _increment_and_get(db, key, today)

    if new_count > limit:
        # Exceeded: roll back the just-incremented count (best-effort) so
        # subsequent status-check calls still show the correct ceiling.
        try:
            rollback = text("""
                UPDATE chat_rate_limits
                SET count = :limit
                WHERE key = :key AND day = :day AND count > :limit
            """)
            await db.execute(rollback, {"limit": limit, "key": key, "day": today})
            await db.commit()
        except Exception:  # noqa: BLE001
            pass
        raise RateLimitExceeded(limit=limit, count=new_count, kind=kind)

    return {
        "used": new_count,
        "limit": limit,
        "remaining": max(0, limit - new_count),
        "kind": kind,
    }


async def get_status(
    db: AsyncSession,
    request: Request,
    user_id: str | None,
) -> dict:
    """Return quota status without incrementing (used by the status endpoint)."""
    await _ensure_table(db)
    today = _today_utc()
    if user_id:
        key = f"auth:{user_id}"
        limit = AUTHENTICATED_DAILY_LIMIT
        kind = "authenticated"
    else:
        key = f"guest:{_guest_fingerprint(request)}"
        limit = GUEST_DAILY_LIMIT
        kind = "guest"

    count = await _get_count(db, key, today)
    return {
        "used": count,
        "limit": limit,
        "remaining": max(0, limit - count),
        "kind": kind,
    }

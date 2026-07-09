"""Session service — issues and validates the backend-owned login session cookie."""
from __future__ import annotations

import secrets
from datetime import datetime, timedelta, timezone

from sqlalchemy.ext.asyncio import AsyncSession as DbAsyncSession

from app.core.config import settings
from app.core.security import hash_opaque_value
from app.models.session import Session
from app.models.user import User
from app.repositories.session_repository import SessionRepository
from app.repositories.user_repository import UserRepository


def _hash_token(raw_token: str) -> str:
    return hash_opaque_value(raw_token)


async def create_session(
    db: DbAsyncSession,
    user: User,
    *,
    user_agent: str | None = None,
    ip_address: str | None = None,
) -> str:
    """Create a session row and return the raw token to set as a cookie.

    Enforces a single active session per account: any previously active
    session(s) for this user are revoked first, so logging in on a new
    device/browser signs the account out everywhere else.
    """
    raw_token = secrets.token_urlsafe(32)
    expires_at = datetime.now(timezone.utc) + timedelta(days=settings.SESSION_TTL_DAYS)
    repo = SessionRepository(db)
    await repo.revoke_all_for_user(user.id)
    session = await repo.create(
        user_id=user.id,
        token_hash=_hash_token(raw_token),
        expires_at=expires_at,
        user_agent=user_agent,
        ip_address=ip_address,
    )
    session.last_seen_at = datetime.now(timezone.utc)
    await db.commit()
    return raw_token


async def get_user_by_token(db: DbAsyncSession, raw_token: str) -> User | None:
    repo = SessionRepository(db)
    session = await repo.get_by_token_hash(_hash_token(raw_token))
    if session is None or session.revoked_at is not None:
        return None
    now = datetime.now(timezone.utc)
    if session.expires_at < now:
        return None
    # Idle timeout: independent of the absolute SESSION_TTL_DAYS ceiling, a
    # session unused for SESSION_IDLE_TIMEOUT_HOURS is treated as expired and
    # the user must log in again.
    last_activity = session.last_seen_at or session.created_at
    idle_cutoff = now - timedelta(hours=settings.SESSION_IDLE_TIMEOUT_HOURS)
    if last_activity < idle_cutoff:
        await repo.revoke(session)
        await db.commit()
        return None
    # Slide the idle window forward for this request and persist immediately
    # (this request may not otherwise call db.commit()).
    await repo.touch(session)
    await db.commit()
    return await UserRepository(db).get_by_id(session.user_id)


async def revoke_session(db: DbAsyncSession, raw_token: str) -> None:
    repo = SessionRepository(db)
    session = await repo.get_by_token_hash(_hash_token(raw_token))
    if session is not None and session.revoked_at is None:
        await repo.revoke(session)
        await db.commit()


async def get_session_by_token(db: DbAsyncSession, raw_token: str) -> Session | None:
    """Return the raw session row (not the user) for a cookie token, or
    ``None`` if it doesn't exist, is revoked, or has expired."""
    repo = SessionRepository(db)
    session = await repo.get_by_token_hash(_hash_token(raw_token))
    if session is None or session.revoked_at is not None:
        return None
    if session.expires_at < datetime.now(timezone.utc):
        return None
    return session

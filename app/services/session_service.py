"""Session service — issues and validates the backend-owned login session cookie."""
from __future__ import annotations

import hashlib
import secrets
from datetime import datetime, timedelta, timezone

from sqlalchemy.ext.asyncio import AsyncSession as DbAsyncSession

from app.core.config import settings
from app.models.user import User
from app.repositories.session_repository import SessionRepository
from app.repositories.user_repository import UserRepository


def _hash_token(raw_token: str) -> str:
    return hashlib.sha256(raw_token.encode("utf-8")).hexdigest()


async def create_session(
    db: DbAsyncSession,
    user: User,
    *,
    user_agent: str | None = None,
    ip_address: str | None = None,
) -> str:
    """Create a session row and return the raw token to set as a cookie."""
    raw_token = secrets.token_urlsafe(32)
    expires_at = datetime.now(timezone.utc) + timedelta(days=settings.SESSION_TTL_DAYS)
    repo = SessionRepository(db)
    await repo.create(
        user_id=user.id,
        token_hash=_hash_token(raw_token),
        expires_at=expires_at,
        user_agent=user_agent,
        ip_address=ip_address,
    )
    await db.commit()
    return raw_token


async def get_user_by_token(db: DbAsyncSession, raw_token: str) -> User | None:
    repo = SessionRepository(db)
    session = await repo.get_by_token_hash(_hash_token(raw_token))
    if session is None or session.revoked_at is not None:
        return None
    if session.expires_at < datetime.now(timezone.utc):
        return None
    return await UserRepository(db).get_by_id(session.user_id)


async def revoke_session(db: DbAsyncSession, raw_token: str) -> None:
    repo = SessionRepository(db)
    session = await repo.get_by_token_hash(_hash_token(raw_token))
    if session is not None and session.revoked_at is None:
        await repo.revoke(session)
        await db.commit()

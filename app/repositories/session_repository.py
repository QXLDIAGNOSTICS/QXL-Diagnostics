"""Session repository — CRUD for backend-owned login sessions."""
from __future__ import annotations

import uuid
from datetime import datetime, timezone

from sqlalchemy import select, update
from sqlalchemy.ext.asyncio import AsyncSession as DbAsyncSession

from app.models.session import Session


class SessionRepository:
    def __init__(self, db: DbAsyncSession) -> None:
        self.db = db

    async def create(
        self,
        *,
        user_id: uuid.UUID,
        token_hash: str,
        expires_at: datetime,
        user_agent: str | None,
        ip_address: str | None,
    ) -> Session:
        session = Session(
            user_id=user_id,
            token_hash=token_hash,
            expires_at=expires_at,
            user_agent=user_agent,
            ip_address=ip_address,
        )
        self.db.add(session)
        await self.db.flush()
        return session

    async def get_by_token_hash(self, token_hash: str) -> Session | None:
        result = await self.db.execute(
            select(Session).where(Session.token_hash == token_hash)
        )
        return result.scalar_one_or_none()

    async def revoke(self, session: Session) -> None:
        session.revoked_at = datetime.now(timezone.utc)
        await self.db.flush()

    async def touch(self, session: Session) -> None:
        """Slide the idle-activity window forward — called on every
        successful authenticated request so idle timeout is measured from
        the last request, not from session creation."""
        session.last_seen_at = datetime.now(timezone.utc)
        await self.db.flush()

    async def revoke_all_for_user(self, user_id: uuid.UUID) -> None:
        """Revoke every currently-active session for a user — enforces a
        single active session per account (a fresh login anywhere signs out
        all other devices/tabs)."""
        await self.db.execute(
            update(Session)
            .where(Session.user_id == user_id, Session.revoked_at.is_(None))
            .values(revoked_at=datetime.now(timezone.utc))
        )
        await self.db.flush()

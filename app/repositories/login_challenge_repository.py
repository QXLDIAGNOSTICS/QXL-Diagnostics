"""Repository for login challenges (OTP + SMS-link 2FA handshake)."""
from __future__ import annotations

import uuid

from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.login_challenge import LoginChallenge


class LoginChallengeRepository:
    def __init__(self, db: AsyncSession) -> None:
        self.db = db

    async def create(self, **kwargs) -> LoginChallenge:  # noqa: ANN003
        challenge = LoginChallenge(**kwargs)
        self.db.add(challenge)
        await self.db.flush()
        return challenge

    async def get_by_id(self, challenge_id: uuid.UUID) -> LoginChallenge | None:
        return await self.db.get(LoginChallenge, challenge_id)

    async def get_by_link_token_hash(self, token_hash: str) -> LoginChallenge | None:
        result = await self.db.execute(
            select(LoginChallenge).where(LoginChallenge.link_token_hash == token_hash)
        )
        return result.scalar_one_or_none()

    async def save(self, challenge: LoginChallenge) -> LoginChallenge:
        await self.db.flush()
        return challenge

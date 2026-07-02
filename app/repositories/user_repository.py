"""User repository — CRUD and JIT provisioning by Auth0 subject."""
from __future__ import annotations

import uuid

from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.user import User


class UserRepository:
    def __init__(self, db: AsyncSession) -> None:
        self.db = db

    async def get_by_id(self, user_id: uuid.UUID) -> User | None:
        return await self.db.get(User, user_id)

    async def get_by_auth0_sub(self, auth0_sub: str) -> User | None:
        result = await self.db.execute(select(User).where(User.auth0_sub == auth0_sub))
        return result.scalar_one_or_none()

    async def create(self, *, auth0_sub: str, email: str | None, name: str | None) -> User:
        user = User(auth0_sub=auth0_sub, email=email, name=name)
        self.db.add(user)
        await self.db.flush()
        return user

    async def update(
        self, user: User, *, email: str | None = None, name: str | None = None
    ) -> User:
        if email is not None:
            user.email = email
        if name is not None:
            user.name = name
        await self.db.flush()
        return user

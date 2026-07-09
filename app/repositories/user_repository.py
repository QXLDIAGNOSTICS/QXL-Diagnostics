"""User repository — CRUD and identifier lookups (email/phone)."""
from __future__ import annotations

import uuid
from datetime import date, datetime

from sqlalchemy import func, or_, select
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.user import User


class UserRepository:
    def __init__(self, db: AsyncSession) -> None:
        self.db = db

    async def get_by_id(self, user_id: uuid.UUID) -> User | None:
        return await self.db.get(User, user_id)

    async def get_by_email(self, email: str) -> User | None:
        result = await self.db.execute(select(User).where(func.lower(User.email) == email.lower()))
        return result.scalar_one_or_none()

    async def get_by_phone(self, phone: str) -> User | None:
        result = await self.db.execute(select(User).where(User.phone == phone))
        return result.scalar_one_or_none()

    async def get_by_identifier(self, identifier: str) -> User | None:
        """Look up by email or phone — whichever the login field looks like."""
        result = await self.db.execute(
            select(User).where(
                or_(func.lower(User.email) == identifier.lower(), User.phone == identifier)
            )
        )
        return result.scalar_one_or_none()

    async def create(
        self,
        *,
        phone: str,
        email: str | None = None,
        password_hash: str | None = None,
        name: str | None = None,
        date_of_birth: date | None = None,
        role: str = "patient",
    ) -> User:
        user = User(
            email=email,
            phone=phone,
            password_hash=password_hash,
            name=name,
            date_of_birth=date_of_birth,
            role=role,
        )
        self.db.add(user)
        await self.db.flush()
        return user

    async def update(
        self,
        user: User,
        *,
        email: str | None = None,
        name: str | None = None,
        date_of_birth: date | None = None,
    ) -> User:
        if email is not None:
            user.email = email
        if name is not None:
            user.name = name
        if date_of_birth is not None:
            user.date_of_birth = date_of_birth
        await self.db.flush()
        return user

    async def set_verification(
        self, user: User, *, email_verified: bool | None = None, phone_verified: bool | None = None
    ) -> User:
        if email_verified is not None:
            user.is_email_verified = email_verified
        if phone_verified is not None:
            user.is_phone_verified = phone_verified
        await self.db.flush()
        return user

    async def record_failed_login(self, user: User, *, lockout_threshold: int, locked_until: datetime | None) -> User:
        user.failed_login_attempts += 1
        if user.failed_login_attempts >= lockout_threshold and locked_until is not None:
            user.locked_until = locked_until
        await self.db.flush()
        return user

    async def reset_failed_logins(self, user: User) -> User:
        user.failed_login_attempts = 0
        user.locked_until = None
        await self.db.flush()
        return user

    async def list_all(
        self, limit: int = 100, offset: int = 0, *, role: str | None = None
    ) -> tuple[list[User], int]:
        count_q = select(func.count()).select_from(User)
        rows_q = select(User).order_by(User.created_at.desc()).limit(limit).offset(offset)
        if role:
            count_q = count_q.where(User.role == role)
            rows_q = rows_q.where(User.role == role)
        count = (await self.db.execute(count_q)).scalar_one()
        rows = list((await self.db.execute(rows_q)).scalars().all())
        return rows, count

    async def set_role(self, user: User, role: str) -> User:
        user.role = role
        await self.db.flush()
        return user


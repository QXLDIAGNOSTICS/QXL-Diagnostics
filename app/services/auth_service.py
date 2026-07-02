"""Auth/user service — just-in-time provisioning from Auth0 claims."""
from __future__ import annotations

from sqlalchemy.ext.asyncio import AsyncSession

from app.models.user import User
from app.repositories.user_repository import UserRepository


async def get_or_create_from_claims(db: AsyncSession, claims: dict) -> User:
    """Upsert a local user keyed by the Auth0 ``sub`` claim."""
    sub = claims.get("sub")
    if not sub:
        raise ValueError("Token is missing the 'sub' claim")

    repo = UserRepository(db)
    user = await repo.get_by_auth0_sub(sub)
    email = claims.get("email")
    name = claims.get("name")

    if user is None:
        user = await repo.create(auth0_sub=sub, email=email, name=name)
        await db.commit()
        await db.refresh(user)
        return user

    # Keep basic profile fields in sync if the token carries them.
    if (email and email != user.email) or (name and name != user.name):
        await repo.update(user, email=email, name=name)
        await db.commit()
        await db.refresh(user)
    return user

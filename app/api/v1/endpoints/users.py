"""User endpoints."""
from __future__ import annotations

import uuid

from fastapi import APIRouter, Depends

from app.api.deps import CurrentUser, DbSession, require_permission
from app.core.exceptions import NotFoundError
from app.models.user import User
from app.repositories.user_repository import UserRepository
from app.schemas.user import UserRead, UserUpdate

router = APIRouter(prefix="/users", tags=["users"])


@router.get("/me", response_model=UserRead)
async def read_me(user: CurrentUser) -> User:
    return user


@router.patch("/me", response_model=UserRead)
async def update_me(payload: UserUpdate, user: CurrentUser, db: DbSession) -> User:
    repo = UserRepository(db)
    updated = await repo.update(user, email=payload.email, name=payload.name)
    await db.commit()
    await db.refresh(updated)
    return updated


@router.get("/{user_id}", response_model=UserRead)
async def read_user(
    user_id: uuid.UUID,
    db: DbSession,
    _: User = Depends(require_permission("read:users")),
) -> User:
    repo = UserRepository(db)
    found = await repo.get_by_id(user_id)
    if found is None:
        raise NotFoundError("User not found")
    return found

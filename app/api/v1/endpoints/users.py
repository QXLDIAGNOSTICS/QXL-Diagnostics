"""User endpoints."""
from __future__ import annotations

import uuid

from fastapi import APIRouter, Depends

from app.api.deps import CurrentUser, DbSession, require_role
from app.core.exceptions import NotFoundError, ValidationError
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
    updates = payload.model_dump(exclude_unset=True)
    if "email" in updates:
      email = updates["email"]
      if email:
          existing = await repo.get_by_email(email)
          if existing is not None and existing.id != user.id:
              raise ValidationError("An account with this email already exists")
          if user.email != email:
              user.is_email_verified = False
      user.email = email
    if "name" in updates:
        user.name = updates["name"]
    if "date_of_birth" in updates:
        user.date_of_birth = updates["date_of_birth"]
    await db.flush()
    await db.commit()
    await db.refresh(user)
    return user


@router.get("/{user_id}", response_model=UserRead)
async def read_user(
    user_id: uuid.UUID,
    db: DbSession,
    _: User = Depends(require_role("admin")),
) -> User:
    repo = UserRepository(db)
    found = await repo.get_by_id(user_id)
    if found is None:
        raise NotFoundError("User not found")
    return found

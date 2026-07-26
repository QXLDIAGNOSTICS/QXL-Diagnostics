"""Admin-only endpoints: user/role management and dashboard stats."""
from __future__ import annotations

import uuid

from fastapi import APIRouter, Depends
from sqlalchemy import func, select
from sqlalchemy.ext.asyncio import AsyncSession

from app.api.deps import DbSession, require_role
from app.core import roles as R
from app.core.exceptions import NotFoundError, PermissionDeniedError, ValidationError
from app.core.security import hash_password
from app.models.booking import Booking
from app.models.lead import CollaborationLead, ContactInquiry
from app.models.prescription import Prescription
from app.models.user import User
from app.repositories.user_repository import UserRepository
from app.schemas.user import AdminUserCreate, UserList, UserRead, UserRoleUpdate

router = APIRouter(prefix="/admin", tags=["admin"])


@router.get("/users", response_model=UserList)
async def list_users(
    db: DbSession,
    limit: int = 100,
    offset: int = 0,
    role: str | None = None,
    current: User = Depends(require_role("admin")),
) -> UserList:
    _ = current
    items, count = await UserRepository(db).list_all(limit=limit, offset=offset, role=role)
    return UserList(items=[UserRead.model_validate(u) for u in items], count=count)


@router.patch("/users/{user_id}/role", response_model=UserRead)
async def update_user_role(
    user_id: uuid.UUID,
    body: UserRoleUpdate,
    db: DbSession,
    current: User = Depends(require_role("admin")),
) -> UserRead:
    if not R.can_assign_role(current.role, body.role):
        raise PermissionDeniedError(
            f"Your role ({current.role}) cannot assign role '{body.role}'"
        )
    if body.role == R.ROLE_SUPER_ADMIN:
        raise PermissionDeniedError("super_admin cannot be assigned via API")

    repo = UserRepository(db)
    target = await repo.get_by_id(user_id)
    if target is None:
        raise NotFoundError("User not found")
    if target.id == current.id:
        raise ValidationError("You cannot change your own role")
    if target.role == R.ROLE_SUPER_ADMIN and not R.is_super_admin(current.role):
        raise PermissionDeniedError("Only a super admin can modify another super admin")

    target = await repo.set_role(target, body.role)
    await db.commit()
    await db.refresh(target)
    return UserRead.model_validate(target)


@router.post("/users", response_model=UserRead, status_code=201)
async def create_user(
    body: AdminUserCreate,
    db: DbSession,
    current: User = Depends(require_role("admin")),
) -> UserRead:
    if not R.can_assign_role(current.role, body.role):
        raise PermissionDeniedError(
            f"Your role ({current.role}) cannot create users with role '{body.role}'"
        )

    repo = UserRepository(db)
    if await repo.get_by_email(body.email):
        raise ValidationError("A user with this email already exists")
    if await repo.get_by_phone(body.phone):
        raise ValidationError("A user with this phone number already exists")
    user = await repo.create(
        email=body.email,
        phone=body.phone,
        password_hash=hash_password(body.password),
        name=body.name,
        role=body.role,
    )
    await db.commit()
    await db.refresh(user)
    return UserRead.model_validate(user)


async def _count(db: AsyncSession, model, **filters) -> int:  # noqa: ANN001
    stmt = select(func.count()).select_from(model)
    for key, value in filters.items():
        stmt = stmt.where(getattr(model, key) == value)
    return (await db.execute(stmt)).scalar_one()


@router.get("/stats")
async def dashboard_stats(db: DbSession, current: User = Depends(require_role("staff"))) -> dict:
    _ = current
    return {
        "total_users": await _count(db, User),
        "total_bookings": await _count(db, Booking),
        "pending_bookings": await _count(db, Booking, status="pending"),
        "total_prescriptions": await _count(db, Prescription),
        "unread_collaboration_leads": await _count(db, CollaborationLead, is_read=False),
        "unread_contact_inquiries": await _count(db, ContactInquiry, is_read=False),
    }

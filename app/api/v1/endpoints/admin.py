"""Admin-only endpoints: user/role management and dashboard stats."""
from __future__ import annotations

import uuid

from fastapi import APIRouter, Depends
from sqlalchemy import func, select
from sqlalchemy.ext.asyncio import AsyncSession

from app.api.deps import DbSession, require_role
from app.core.exceptions import NotFoundError
from app.models.booking import Booking
from app.models.lead import CollaborationLead, ContactInquiry
from app.models.prescription import Prescription
from app.models.user import User
from app.repositories.user_repository import UserRepository
from app.schemas.user import UserList, UserRead, UserRoleUpdate

router = APIRouter(prefix="/admin", tags=["admin"])


@router.get("/users", response_model=UserList)
async def list_users(
    db: DbSession, limit: int = 100, offset: int = 0, current: User = Depends(require_role("admin"))
) -> UserList:
    items, count = await UserRepository(db).list_all(limit=limit, offset=offset)
    return UserList(items=[UserRead.model_validate(u) for u in items], count=count)


@router.patch("/users/{user_id}/role", response_model=UserRead)
async def update_user_role(
    user_id: uuid.UUID,
    body: UserRoleUpdate,
    db: DbSession,
    current: User = Depends(require_role("admin")),
) -> UserRead:
    repo = UserRepository(db)
    target = await repo.get_by_id(user_id)
    if target is None:
        raise NotFoundError("User not found")
    target = await repo.set_role(target, body.role)
    await db.commit()
    await db.refresh(target)
    return UserRead.model_validate(target)


async def _count(db: AsyncSession, model, **filters) -> int:
    stmt = select(func.count()).select_from(model)
    for key, value in filters.items():
        stmt = stmt.where(getattr(model, key) == value)
    return (await db.execute(stmt)).scalar_one()


@router.get("/stats")
async def dashboard_stats(db: DbSession, current: User = Depends(require_role("admin"))) -> dict:
    return {
        "total_users": await _count(db, User),
        "total_bookings": await _count(db, Booking),
        "pending_bookings": await _count(db, Booking, status="pending"),
        "total_prescriptions": await _count(db, Prescription),
        "unread_collaboration_leads": await _count(db, CollaborationLead, is_read=False),
        "unread_contact_inquiries": await _count(db, ContactInquiry, is_read=False),
    }

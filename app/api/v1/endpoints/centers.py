"""Center (lab/collection point) endpoints: public read, admin-only write."""
from __future__ import annotations

import uuid

from fastapi import APIRouter, Depends

from app.api.deps import DbSession, require_role
from app.models.user import User
from app.schemas.center import CenterCreate, CenterList, CenterRead, CenterUpdate
from app.services import catalog_service

router = APIRouter(prefix="/centers", tags=["centers"])


@router.get("", response_model=list[CenterRead])
async def list_centers(db: DbSession, city: str | None = None) -> list[CenterRead]:
    centers = await catalog_service.list_active_centers(db, city=city)
    return [CenterRead.model_validate(c) for c in centers]


@router.get("/admin", response_model=CenterList)
async def admin_list_centers(
    db: DbSession,
    limit: int = 100,
    offset: int = 0,
    user: User = Depends(require_role("admin")),
) -> CenterList:
    items, count = await catalog_service.list_all_centers(db, limit=limit, offset=offset)
    return CenterList(items=[CenterRead.model_validate(c) for c in items], count=count)


@router.post("", response_model=CenterRead, status_code=201)
async def create_center(
    body: CenterCreate, db: DbSession, user: User = Depends(require_role("admin"))
) -> CenterRead:
    center = await catalog_service.create_center(db, body.model_dump())
    return CenterRead.model_validate(center)


@router.patch("/{center_id}", response_model=CenterRead)
async def update_center(
    center_id: uuid.UUID,
    body: CenterUpdate,
    db: DbSession,
    user: User = Depends(require_role("admin")),
) -> CenterRead:
    center = await catalog_service.update_center(
        db, center_id, body.model_dump(exclude_unset=True)
    )
    return CenterRead.model_validate(center)


@router.delete("/{center_id}", status_code=204)
async def delete_center(
    center_id: uuid.UUID, db: DbSession, user: User = Depends(require_role("admin"))
) -> None:
    await catalog_service.delete_center(db, center_id)

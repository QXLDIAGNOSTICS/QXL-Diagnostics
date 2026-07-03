"""Repository for Centers."""
from __future__ import annotations

import uuid

from sqlalchemy import func, select
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.catalog import Center


class CenterRepository:
    def __init__(self, db: AsyncSession) -> None:
        self.db = db

    async def get_all_active(self, city: str | None = None) -> list[Center]:
        stmt = select(Center).where(Center.is_active == True).order_by(Center.sort_order, Center.name)  # noqa: E712
        if city:
            stmt = stmt.where(func.lower(Center.city) == city.lower())
        return list((await self.db.execute(stmt)).scalars().all())

    async def get_by_id(self, center_id: uuid.UUID) -> Center | None:
        return await self.db.get(Center, center_id)

    async def list_all(self, limit: int = 100, offset: int = 0) -> tuple[list[Center], int]:
        count = (await self.db.execute(select(func.count()).select_from(Center))).scalar_one()
        rows = list(
            (await self.db.execute(
                select(Center).order_by(Center.sort_order, Center.name).limit(limit).offset(offset)
            )).scalars().all()
        )
        return rows, count

    async def create(self, **kwargs) -> Center:  # noqa: ANN003
        center = Center(**kwargs)
        self.db.add(center)
        await self.db.flush()
        return center

    async def update(self, center: Center, **kwargs) -> Center:  # noqa: ANN003
        for k, v in kwargs.items():
            if v is not None:
                setattr(center, k, v)
        await self.db.flush()
        return center

    async def delete(self, center: Center) -> None:
        await self.db.delete(center)
        await self.db.flush()

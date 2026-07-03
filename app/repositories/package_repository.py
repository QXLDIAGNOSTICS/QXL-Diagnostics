"""Repositories for HealthPackage and TestCatalog."""
from __future__ import annotations

import uuid

from sqlalchemy import func, select
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.catalog import HealthPackage, TestCatalog


class HealthPackageRepository:
    def __init__(self, db: AsyncSession) -> None:
        self.db = db

    async def get_all_active(self) -> list[HealthPackage]:
        stmt = (
            select(HealthPackage)
            .where(HealthPackage.is_active == True)  # noqa: E712
            .order_by(HealthPackage.sort_order, HealthPackage.name)
        )
        return list((await self.db.execute(stmt)).scalars().all())

    async def get_by_id(self, pkg_id: uuid.UUID) -> HealthPackage | None:
        return await self.db.get(HealthPackage, pkg_id)

    async def get_by_slug(self, slug: str) -> HealthPackage | None:
        stmt = select(HealthPackage).where(HealthPackage.slug == slug)
        return (await self.db.execute(stmt)).scalars().first()

    async def list_all(self, limit: int = 100, offset: int = 0) -> tuple[list[HealthPackage], int]:
        count = (await self.db.execute(select(func.count()).select_from(HealthPackage))).scalar_one()
        rows = list(
            (await self.db.execute(
                select(HealthPackage).order_by(HealthPackage.sort_order).limit(limit).offset(offset)
            )).scalars().all()
        )
        return rows, count

    async def create(self, **kwargs) -> HealthPackage:  # noqa: ANN003
        pkg = HealthPackage(**kwargs)
        self.db.add(pkg)
        await self.db.flush()
        return pkg

    async def update(self, pkg: HealthPackage, **kwargs) -> HealthPackage:  # noqa: ANN003
        for k, v in kwargs.items():
            if v is not None:
                setattr(pkg, k, v)
        await self.db.flush()
        return pkg

    async def delete(self, pkg: HealthPackage) -> None:
        await self.db.delete(pkg)
        await self.db.flush()


class TestCatalogRepository:
    def __init__(self, db: AsyncSession) -> None:
        self.db = db

    async def get_all_active(self, category: str | None = None) -> list[TestCatalog]:
        stmt = (
            select(TestCatalog)
            .where(TestCatalog.is_active == True)  # noqa: E712
            .order_by(TestCatalog.name)
        )
        if category:
            stmt = stmt.where(TestCatalog.category == category)
        return list((await self.db.execute(stmt)).scalars().all())

    async def search(self, q: str, limit: int = 20) -> list[TestCatalog]:
        stmt = (
            select(TestCatalog)
            .where(TestCatalog.is_active == True, TestCatalog.name.ilike(f"%{q}%"))  # noqa: E712
            .order_by(TestCatalog.name)
            .limit(limit)
        )
        return list((await self.db.execute(stmt)).scalars().all())

    async def list_all(self, limit: int = 200, offset: int = 0) -> tuple[list[TestCatalog], int]:
        count = (await self.db.execute(select(func.count()).select_from(TestCatalog))).scalar_one()
        rows = list(
            (await self.db.execute(
                select(TestCatalog).order_by(TestCatalog.name).limit(limit).offset(offset)
            )).scalars().all()
        )
        return rows, count

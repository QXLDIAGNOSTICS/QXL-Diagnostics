"""Catalog service: centers, health packages, and test catalog business logic."""
from __future__ import annotations

import re
import uuid

from sqlalchemy.ext.asyncio import AsyncSession

from app.core.exceptions import NotFoundError
from app.models.catalog import Center, HealthPackage, TestCatalog
from app.repositories.package_repository import HealthPackageRepository, TestCatalogRepository
from app.repositories.center_repository import CenterRepository


def slugify(value: str) -> str:
    value = value.strip().lower()
    value = re.sub(r"[^a-z0-9]+", "-", value)
    return value.strip("-")


# ── Centers ───────────────────────────────────────────────────────────────────

async def list_active_centers(db: AsyncSession, city: str | None = None) -> list[Center]:
    return await CenterRepository(db).get_all_active(city=city)


async def list_all_centers(db: AsyncSession, limit: int, offset: int) -> tuple[list[Center], int]:
    return await CenterRepository(db).list_all(limit=limit, offset=offset)


async def create_center(db: AsyncSession, data: dict) -> Center:
    repo = CenterRepository(db)
    center = await repo.create(**data)
    await db.commit()
    await db.refresh(center)
    return center


async def update_center(db: AsyncSession, center_id: uuid.UUID, data: dict) -> Center:
    repo = CenterRepository(db)
    center = await repo.get_by_id(center_id)
    if center is None:
        raise NotFoundError("Center not found")
    center = await repo.update(center, **data)
    await db.commit()
    await db.refresh(center)
    return center


async def delete_center(db: AsyncSession, center_id: uuid.UUID) -> None:
    repo = CenterRepository(db)
    center = await repo.get_by_id(center_id)
    if center is None:
        raise NotFoundError("Center not found")
    await repo.delete(center)
    await db.commit()


# ── Health Packages ───────────────────────────────────────────────────────────

async def list_active_packages(db: AsyncSession) -> list[HealthPackage]:
    return await HealthPackageRepository(db).get_all_active()


async def list_all_packages(db: AsyncSession, limit: int, offset: int) -> tuple[list[HealthPackage], int]:
    return await HealthPackageRepository(db).list_all(limit=limit, offset=offset)


async def get_package(db: AsyncSession, package_id: uuid.UUID) -> HealthPackage:
    pkg = await HealthPackageRepository(db).get_by_id(package_id)
    if pkg is None:
        raise NotFoundError("Package not found")
    return pkg


async def create_package(db: AsyncSession, data: dict) -> HealthPackage:
    repo = HealthPackageRepository(db)
    if not data.get("slug"):
        data["slug"] = slugify(data["name"])
    existing = await repo.get_by_slug(data["slug"])
    if existing is not None:
        data["slug"] = f"{data['slug']}-{uuid.uuid4().hex[:6]}"
    pkg = await repo.create(**data)
    await db.commit()
    await db.refresh(pkg)
    return pkg


async def update_package(db: AsyncSession, package_id: uuid.UUID, data: dict) -> HealthPackage:
    repo = HealthPackageRepository(db)
    pkg = await repo.get_by_id(package_id)
    if pkg is None:
        raise NotFoundError("Package not found")
    pkg = await repo.update(pkg, **data)
    await db.commit()
    await db.refresh(pkg)
    return pkg


async def delete_package(db: AsyncSession, package_id: uuid.UUID) -> None:
    repo = HealthPackageRepository(db)
    pkg = await repo.get_by_id(package_id)
    if pkg is None:
        raise NotFoundError("Package not found")
    await repo.delete(pkg)
    await db.commit()


# ── Test Catalog ──────────────────────────────────────────────────────────────

async def list_active_tests(db: AsyncSession, category: str | None = None) -> list[TestCatalog]:
    return await TestCatalogRepository(db).get_all_active(category=category)


async def search_tests(db: AsyncSession, q: str, limit: int = 20) -> list[TestCatalog]:
    return await TestCatalogRepository(db).search(q, limit=limit)


async def list_all_tests(db: AsyncSession, limit: int, offset: int) -> tuple[list[TestCatalog], int]:
    return await TestCatalogRepository(db).list_all(limit=limit, offset=offset)

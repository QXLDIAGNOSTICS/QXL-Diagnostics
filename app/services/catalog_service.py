"""Catalog service: centers, health packages, and test catalog business logic."""
from __future__ import annotations

import re
import uuid
from math import asin, cos, radians, sin, sqrt

from sqlalchemy.ext.asyncio import AsyncSession

from app.core.exceptions import NotFoundError
from app.models.catalog import Center, HealthPackage, TestCatalog
from app.repositories.package_repository import HealthPackageRepository, TestCatalogRepository
from app.repositories.center_repository import CenterRepository

_EARTH_RADIUS_KM = 6371.0


def slugify(value: str) -> str:
    value = value.strip().lower()
    value = re.sub(r"[^a-z0-9]+", "-", value)
    return value.strip("-")


def haversine_km(lat1: float, lng1: float, lat2: float, lng2: float) -> float:
    """Great-circle distance between two lat/lng points, in kilometers."""
    lat1_r, lng1_r, lat2_r, lng2_r = map(radians, (lat1, lng1, lat2, lng2))
    d_lat = lat2_r - lat1_r
    d_lng = lng2_r - lng1_r
    a = sin(d_lat / 2) ** 2 + cos(lat1_r) * cos(lat2_r) * sin(d_lng / 2) ** 2
    return 2 * _EARTH_RADIUS_KM * asin(sqrt(a))


# ── Centers ───────────────────────────────────────────────────────────────────

async def list_active_centers(
    db: AsyncSession,
    city: str | None = None,
    *,
    lat: float | None = None,
    lng: float | None = None,
) -> list[Center]:
    centers = await CenterRepository(db).get_all_active(city=city)
    if lat is None or lng is None:
        return centers

    def _distance(center: Center) -> float:
        if center.lat is None or center.lng is None:
            return float("inf")
        return haversine_km(lat, lng, float(center.lat), float(center.lng))

    for center in centers:
        d = _distance(center)
        center.distance_km = None if d == float("inf") else round(d, 2)  # type: ignore[attr-defined]

    return sorted(centers, key=_distance)


async def nearest_centers(
    db: AsyncSession, *, lat: float, lng: float, city: str | None = None, limit: int = 5
) -> list[Center]:
    centers = await list_active_centers(db, city=city, lat=lat, lng=lng)
    return centers[:limit]


async def list_all_centers(db: AsyncSession, limit: int, offset: int) -> tuple[list[Center], int]:
    return await CenterRepository(db).list_all(limit=limit, offset=offset)


async def get_center_by_slug(db: AsyncSession, slug: str) -> Center:
    center = await CenterRepository(db).get_by_slug(slug)
    if center is None:
        raise NotFoundError("Center not found")
    return center


async def create_center(db: AsyncSession, data: dict) -> Center:
    repo = CenterRepository(db)
    if not data.get("slug"):
        data["slug"] = slugify(data["name"])
    existing = await repo.get_by_slug(data["slug"])
    if existing is not None:
        data["slug"] = f"{data['slug']}-{uuid.uuid4().hex[:6]}"
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


async def get_test(db: AsyncSession, test_id: uuid.UUID) -> TestCatalog:
    test = await TestCatalogRepository(db).get_by_id(test_id)
    if test is None:
        raise NotFoundError("Test not found")
    return test


async def create_test(db: AsyncSession, data: dict) -> TestCatalog:
    repo = TestCatalogRepository(db)
    if not data.get("slug"):
        data["slug"] = slugify(data["name"])
    existing = await repo.get_by_slug(data["slug"])
    if existing is not None:
        data["slug"] = f"{data['slug']}-{uuid.uuid4().hex[:6]}"
    test = await repo.create(**data)
    await db.commit()
    await db.refresh(test)
    return test


async def update_test(db: AsyncSession, test_id: uuid.UUID, data: dict) -> TestCatalog:
    repo = TestCatalogRepository(db)
    test = await repo.get_by_id(test_id)
    if test is None:
        raise NotFoundError("Test not found")
    test = await repo.update(test, **data)
    await db.commit()
    await db.refresh(test)
    return test


async def delete_test(db: AsyncSession, test_id: uuid.UUID) -> None:
    repo = TestCatalogRepository(db)
    test = await repo.get_by_id(test_id)
    if test is None:
        raise NotFoundError("Test not found")
    await repo.delete(test)
    await db.commit()

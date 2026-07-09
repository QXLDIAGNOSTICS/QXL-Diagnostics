"""Health package & test catalog endpoints: public read, admin-only write."""
from __future__ import annotations

import uuid

from fastapi import APIRouter, Depends

from app.api.deps import DbSession, require_role
from app.models.user import User
from app.schemas.package import (
    HealthPackageCreate,
    HealthPackageList,
    HealthPackageRead,
    HealthPackageUpdate,
    TestCatalogCreate,
    TestCatalogList,
    TestCatalogRead,
    TestCatalogUpdate,
)
from app.services import catalog_service

router = APIRouter(tags=["packages"])


# ── Health Packages ───────────────────────────────────────────────────────────

@router.get("/packages", response_model=list[HealthPackageRead])
async def list_packages(db: DbSession) -> list[HealthPackageRead]:
    packages = await catalog_service.list_active_packages(db)
    return [HealthPackageRead.model_validate(p) for p in packages]


@router.get("/packages/admin", response_model=HealthPackageList)
async def admin_list_packages(
    db: DbSession, limit: int = 100, offset: int = 0, user: User = Depends(require_role("admin"))
) -> HealthPackageList:
    items, count = await catalog_service.list_all_packages(db, limit=limit, offset=offset)
    return HealthPackageList(items=[HealthPackageRead.model_validate(p) for p in items], count=count)


@router.get("/packages/{package_id}", response_model=HealthPackageRead)
async def get_package(package_id: uuid.UUID, db: DbSession) -> HealthPackageRead:
    pkg = await catalog_service.get_package(db, package_id)
    return HealthPackageRead.model_validate(pkg)


@router.post("/packages", response_model=HealthPackageRead, status_code=201)
async def create_package(
    body: HealthPackageCreate, db: DbSession, user: User = Depends(require_role("admin"))
) -> HealthPackageRead:
    pkg = await catalog_service.create_package(db, body.model_dump())
    return HealthPackageRead.model_validate(pkg)


@router.patch("/packages/{package_id}", response_model=HealthPackageRead)
async def update_package(
    package_id: uuid.UUID,
    body: HealthPackageUpdate,
    db: DbSession,
    user: User = Depends(require_role("admin")),
) -> HealthPackageRead:
    pkg = await catalog_service.update_package(db, package_id, body.model_dump(exclude_unset=True))
    return HealthPackageRead.model_validate(pkg)


@router.delete("/packages/{package_id}", status_code=204)
async def delete_package(
    package_id: uuid.UUID, db: DbSession, user: User = Depends(require_role("admin"))
) -> None:
    await catalog_service.delete_package(db, package_id)


# ── Test Catalog ──────────────────────────────────────────────────────────────

@router.get("/tests", response_model=list[TestCatalogRead])
async def list_tests(db: DbSession, category: str | None = None, q: str | None = None) -> list[TestCatalogRead]:
    tests = await catalog_service.search_tests(db, q) if q else await catalog_service.list_active_tests(db, category=category)
    return [TestCatalogRead.model_validate(t) for t in tests]


@router.get("/tests/admin", response_model=TestCatalogList)
async def admin_list_tests(
    db: DbSession, limit: int = 200, offset: int = 0, user: User = Depends(require_role("admin"))
) -> TestCatalogList:
    items, count = await catalog_service.list_all_tests(db, limit=limit, offset=offset)
    return TestCatalogList(items=[TestCatalogRead.model_validate(t) for t in items], count=count)


@router.get("/tests/{test_id}", response_model=TestCatalogRead)
async def get_test(test_id: uuid.UUID, db: DbSession) -> TestCatalogRead:
    test = await catalog_service.get_test(db, test_id)
    return TestCatalogRead.model_validate(test)


@router.post("/tests", response_model=TestCatalogRead, status_code=201)
async def create_test(
    body: TestCatalogCreate, db: DbSession, user: User = Depends(require_role("admin"))
) -> TestCatalogRead:
    test = await catalog_service.create_test(db, body.model_dump())
    return TestCatalogRead.model_validate(test)


@router.patch("/tests/{test_id}", response_model=TestCatalogRead)
async def update_test(
    test_id: uuid.UUID,
    body: TestCatalogUpdate,
    db: DbSession,
    user: User = Depends(require_role("admin")),
) -> TestCatalogRead:
    test = await catalog_service.update_test(db, test_id, body.model_dump(exclude_unset=True))
    return TestCatalogRead.model_validate(test)


@router.delete("/tests/{test_id}", status_code=204)
async def delete_test(
    test_id: uuid.UUID, db: DbSession, user: User = Depends(require_role("admin"))
) -> None:
    await catalog_service.delete_test(db, test_id)

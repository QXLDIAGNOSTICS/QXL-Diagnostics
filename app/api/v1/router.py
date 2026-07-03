"""Aggregate all v1 routers, plus system/health endpoints."""
from __future__ import annotations

from fastapi import APIRouter
from sqlalchemy import text

from app.api.deps import DbSession
from app.api.v1.endpoints import (
    admin,
    auth,
    bookings,
    centers,
    chat,
    content,
    files,
    leads,
    packages,
    prescriptions,
    users,
)

api_router = APIRouter()
api_router.include_router(auth.router)
api_router.include_router(users.router)
api_router.include_router(files.router)
api_router.include_router(chat.router)
api_router.include_router(centers.router)
api_router.include_router(packages.router)
api_router.include_router(bookings.router)
api_router.include_router(prescriptions.router)
api_router.include_router(leads.router)
api_router.include_router(content.router)
api_router.include_router(admin.router)


@api_router.get("/health", tags=["system"])
async def health(db: DbSession) -> dict:
    """Liveness/readiness probe with a DB ping."""
    try:
        await db.execute(text("SELECT 1"))
        db_ok = True
    except Exception:
        db_ok = False
    return {"status": "ok" if db_ok else "degraded", "database": db_ok}

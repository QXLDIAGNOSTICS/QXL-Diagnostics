"""Aggregate all v1 routers, plus system/health endpoints."""
from __future__ import annotations

from fastapi import APIRouter
from sqlalchemy import text

from app.api.deps import DbSession
from app.api.v1.endpoints import chat, files, users

api_router = APIRouter()
api_router.include_router(users.router)
api_router.include_router(files.router)
api_router.include_router(chat.router)


@api_router.get("/health", tags=["system"])
async def health(db: DbSession) -> dict:
    """Liveness/readiness probe with a DB ping."""
    try:
        await db.execute(text("SELECT 1"))
        db_ok = True
    except Exception:
        db_ok = False
    return {"status": "ok" if db_ok else "degraded", "database": db_ok}

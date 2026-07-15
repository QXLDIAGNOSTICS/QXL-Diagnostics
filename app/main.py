"""FastAPI application factory: middleware, routers, exception handlers."""
from __future__ import annotations

from contextlib import asynccontextmanager
from time import perf_counter
from uuid import uuid4

from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from slowapi.errors import RateLimitExceeded
from slowapi.middleware import SlowAPIMiddleware

from app.api.v1.router import api_router
from app.core.config import settings
from app.core.exceptions import register_exception_handlers
from app.core.logging import configure_logging, get_logger
from app.core.rate_limit import limiter

configure_logging()
logger = get_logger(__name__)


@asynccontextmanager
async def lifespan(app: FastAPI):
    logger.info("Starting %s (%s)", settings.PROJECT_NAME, settings.ENVIRONMENT)
    yield
    from app.db.session import engine

    await engine.dispose()
    logger.info("Shutdown complete")


def create_app() -> FastAPI:
    app = FastAPI(
        title=settings.PROJECT_NAME,
        version="0.1.0",
        openapi_url=f"{settings.API_V1_PREFIX}/openapi.json",
        docs_url="/docs",
        redoc_url="/redoc",
        lifespan=lifespan,
    )

    app.state.limiter = limiter
    app.add_exception_handler(RateLimitExceeded, _rate_limit_handler)
    app.add_middleware(SlowAPIMiddleware)

    app.add_middleware(
        CORSMiddleware,
        allow_origins=settings.CORS_ORIGINS,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    @app.middleware("http")
    async def request_logging_middleware(request: Request, call_next):  # noqa: ANN001
        request_id = request.headers.get("x-request-id") or str(uuid4())
        request.state.request_id = request_id
        start = perf_counter()

        response = await call_next(request)

        duration_ms = round((perf_counter() - start) * 1000, 2)
        logger.info(
            "HTTP request",
            extra={
                "request_id": request_id,
                "method": request.method,
                "path": request.url.path,
                "status_code": response.status_code,
                "duration_ms": duration_ms,
                "client_ip": request.client.host if request.client else None,
            },
        )
        response.headers["X-Request-ID"] = request_id
        return response

    register_exception_handlers(app)
    app.include_router(api_router, prefix=settings.API_V1_PREFIX)

    @app.get("/", tags=["system"])
    async def root() -> dict:
        return {"name": settings.PROJECT_NAME, "docs": "/docs"}

    # Root-level health aliases keep Railway health checks robust even if
    # the configured path is "/health" instead of "/api/v1/health".
    @app.get("/health", tags=["system"])
    async def health_alias() -> dict:
        return {"status": "ok"}

    @app.get("/health/ready", tags=["system"])
    async def health_ready_alias(request: Request):  # noqa: ANN201
        from sqlalchemy import text
        from app.db.session import AsyncSessionLocal

        try:
            async with AsyncSessionLocal() as db:
                await db.execute(text("SELECT 1"))
            return {"status": "ok", "database": True}
        except Exception:
            # Keep response explicit for diagnostics without crashing probes.
            return JSONResponse(
                status_code=200,
                content={"status": "degraded", "database": False},
            )

    return app


def _rate_limit_handler(request, exc):  # noqa: ANN001
    from fastapi.responses import JSONResponse

    return JSONResponse(
        status_code=429,
        content={"error": {"code": "rate_limited", "message": "Too many requests", "detail": None}},
    )


app = create_app()

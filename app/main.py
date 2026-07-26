"""FastAPI application factory: middleware, routers, exception handlers."""
from __future__ import annotations

import asyncio
from contextlib import asynccontextmanager
from time import perf_counter
from uuid import uuid4

from fastapi import FastAPI, Request
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

_NOTIFICATION_POLL_SECONDS = 60


async def _notification_scheduler_loop() -> None:
    """Dispatches any "send later" booking notifications whose time has come.

    Simple in-process poller — sufficient for a single-instance deployment.
    If you scale to multiple backend instances, move this to a dedicated
    worker/cron so notifications aren't attempted redundantly.
    """
    from app.db.session import AsyncSessionLocal
    from app.services.booking_notification_service import run_due_notifications

    while True:
        try:
            async with AsyncSessionLocal() as db:
                processed = await run_due_notifications(db)
                if processed:
                    logger.info("Dispatched %d scheduled booking notification(s)", processed)
        except Exception:  # noqa: BLE001
            logger.exception("Notification scheduler tick failed")
        await asyncio.sleep(_NOTIFICATION_POLL_SECONDS)


@asynccontextmanager
async def lifespan(app: FastAPI):
    logger.info("Starting %s (%s)", settings.PROJECT_NAME, settings.ENVIRONMENT)
    scheduler_task = asyncio.create_task(_notification_scheduler_loop())
    yield
    scheduler_task.cancel()
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

    return app


def _rate_limit_handler(request, exc):  # noqa: ANN001
    from fastapi.responses import JSONResponse

    return JSONResponse(
        status_code=429,
        content={"error": {"code": "rate_limited", "message": "Too many requests", "detail": None}},
    )


app = create_app()

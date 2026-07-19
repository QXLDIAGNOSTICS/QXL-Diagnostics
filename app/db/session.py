"""Async SQLAlchemy engine and session factory."""
from __future__ import annotations

from collections.abc import AsyncGenerator
from urllib.parse import urlparse, urlunparse

from sqlalchemy.ext.asyncio import (
    AsyncSession,
    async_sessionmaker,
    create_async_engine,
)
from sqlalchemy.pool import NullPool

from app.core.config import settings


def _normalize_database_url(url: str) -> str:
    """Prefer Supabase/PgBouncer transaction mode (port 6543).

    Session-mode poolers (port 5432 on ``*.pooler.supabase.com``) cap clients at
    ``pool_size`` (often 15). With NullPool, each concurrent request opens a new
    client slot, so a normal page load (settings + centers + reviews + faqs…)
    quickly hits ``EMAXCONNSESSION`` and public GETs start returning 500.

    Transaction mode multiplexes many clients over fewer server connections and
    is the recommended pairing with NullPool for this stack.

    Also ensure the asyncpg driver dialect is present — ``create_async_engine``
    cannot use a bare ``postgresql://`` URL (that resolves to psycopg2).
    """
    if url.startswith("postgresql://"):
        url = "postgresql+asyncpg://" + url.removeprefix("postgresql://")
    elif url.startswith("postgres://"):
        url = "postgresql+asyncpg://" + url.removeprefix("postgres://")

    parsed = urlparse(url)
    host = (parsed.hostname or "").lower()
    if "pooler.supabase.com" in host and parsed.port == 5432:
        # Rebuild netloc with the same credentials but transaction-mode port.
        userinfo = ""
        if parsed.username is not None:
            userinfo = parsed.username
            if parsed.password is not None:
                userinfo += f":{parsed.password}"
            userinfo += "@"
        netloc = f"{userinfo}{parsed.hostname}:6543"
        return urlunparse(parsed._replace(netloc=netloc))
    return url


def _connect_args(url: str) -> dict:
    """Disable asyncpg statement caches when talking to PgBouncer.

    Transaction-mode pooling does not support prepared statements across
    checkouts; leaving the cache on causes intermittent query failures.
    """
    host = (urlparse(url).hostname or "").lower()
    if "pooler.supabase.com" in host or "pgbouncer" in url.lower():
        return {
            "statement_cache_size": 0,
            "prepared_statement_cache_size": 0,
        }
    return {}


_DATABASE_URL = _normalize_database_url(settings.DATABASE_URL)

# NullPool: open a connection per checkout and close it afterward so slots are
# returned to the external pooler immediately (required for PgBouncer).
engine = create_async_engine(
    _DATABASE_URL,
    poolclass=NullPool,
    connect_args=_connect_args(_DATABASE_URL),
    future=True,
)

AsyncSessionLocal = async_sessionmaker(
    engine,
    class_=AsyncSession,
    expire_on_commit=False,
    autoflush=False,
)


async def get_db() -> AsyncGenerator[AsyncSession, None]:
    """FastAPI dependency yielding a transactional async session."""
    async with AsyncSessionLocal() as session:
        try:
            yield session
        except Exception:
            await session.rollback()
            raise

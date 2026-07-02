"""Test fixtures: in-process ASGI client with auth & DB dependencies overridden."""
from __future__ import annotations

import uuid
from types import SimpleNamespace
from unittest.mock import AsyncMock

import pytest
from httpx import ASGITransport, AsyncClient

from app.api.deps import get_current_user, get_db, get_token_claims
from app.main import app

TEST_PERMISSIONS = ["read:files", "write:files", "read:chat", "read:users"]


@pytest.fixture
def fake_user() -> SimpleNamespace:
    return SimpleNamespace(
        id=uuid.uuid4(),
        auth0_sub="auth0|test-user",
        email="test@example.com",
        name="Test User",
    )


@pytest.fixture
def fake_db() -> AsyncMock:
    return AsyncMock()


@pytest.fixture
async def client(fake_user, fake_db):
    async def _override_db():
        yield fake_db

    async def _override_claims() -> dict:
        return {"sub": fake_user.auth0_sub, "permissions": TEST_PERMISSIONS}

    async def _override_user():
        return fake_user

    app.dependency_overrides[get_db] = _override_db
    app.dependency_overrides[get_token_claims] = _override_claims
    app.dependency_overrides[get_current_user] = _override_user

    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://test") as c:
        yield c

    app.dependency_overrides.clear()

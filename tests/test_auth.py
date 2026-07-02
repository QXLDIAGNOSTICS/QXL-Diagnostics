"""Auth dependency tests: token requirement and permission enforcement."""
from __future__ import annotations

import pytest

from app.api.deps import get_token_claims, require_permission
from app.core.exceptions import PermissionDeniedError, UnauthorizedError


async def test_missing_token_raises_unauthorized():
    with pytest.raises(UnauthorizedError):
        await get_token_claims(credentials=None)


async def test_require_permission_grants_when_present(fake_user):
    checker = require_permission("read:files")
    claims = {"permissions": ["read:files", "write:files"]}
    result = await checker(claims=claims, user=fake_user)
    assert result is fake_user


async def test_require_permission_supports_scope_string(fake_user):
    checker = require_permission("read:chat")
    claims = {"scope": "read:chat write:files"}
    result = await checker(claims=claims, user=fake_user)
    assert result is fake_user


async def test_require_permission_denies_when_missing(fake_user):
    checker = require_permission("write:files")
    claims = {"permissions": ["read:files"]}
    with pytest.raises(PermissionDeniedError):
        await checker(claims=claims, user=fake_user)

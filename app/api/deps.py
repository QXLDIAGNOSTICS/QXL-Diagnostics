"""Shared API dependencies: auth, current user, permission guards."""
from __future__ import annotations

from typing import Annotated

from fastapi import Depends
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.exceptions import PermissionDeniedError, UnauthorizedError
from app.core.security import auth0_validator
from app.db.session import get_db
from app.models.user import User
from app.services import auth_service

_bearer = HTTPBearer(auto_error=False)

DbSession = Annotated[AsyncSession, Depends(get_db)]


async def get_token_claims(
    credentials: Annotated[HTTPAuthorizationCredentials | None, Depends(_bearer)],
) -> dict:
    if credentials is None or not credentials.credentials:
        raise UnauthorizedError("Missing bearer token")
    return await auth0_validator.verify(credentials.credentials)


TokenClaims = Annotated[dict, Depends(get_token_claims)]


async def get_current_user(claims: TokenClaims, db: DbSession) -> User:
    return await auth_service.get_or_create_from_claims(db, claims)


CurrentUser = Annotated[User, Depends(get_current_user)]


def require_permission(permission: str):
    """Dependency factory enforcing an Auth0 RBAC permission/scope."""

    async def _checker(claims: TokenClaims, user: CurrentUser) -> User:
        granted = set(claims.get("permissions", []))
        # Fall back to space-delimited scope string if RBAC permissions are absent.
        if not granted and isinstance(claims.get("scope"), str):
            granted = set(claims["scope"].split())
        if permission not in granted:
            raise PermissionDeniedError(f"Missing required permission: {permission}")
        return user

    return _checker

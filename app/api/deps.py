"""Shared API dependencies: auth, current user, permission/role guards."""
from __future__ import annotations

from typing import Annotated

from fastapi import Depends, Request
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.config import settings
from app.core.exceptions import PermissionDeniedError, UnauthorizedError
from app.core.security import auth0_validator
from app.db.session import get_db
from app.models.user import User
from app.services import auth_service, session_service

_bearer = HTTPBearer(auto_error=False)

DbSession = Annotated[AsyncSession, Depends(get_db)]


async def get_token_claims(
    credentials: Annotated[HTTPAuthorizationCredentials | None, Depends(_bearer)],
) -> dict:
    """Bearer-token path — for non-browser/API clients presenting an Auth0 access token."""
    if credentials is None or not credentials.credentials:
        raise UnauthorizedError("Missing bearer token")
    return await auth0_validator.verify(credentials.credentials)


TokenClaims = Annotated[dict, Depends(get_token_claims)]


async def get_current_user(request: Request, db: DbSession) -> User:
    """Resolve the current user from our session cookie first, falling back to
    a Bearer access token. The cookie is how the first-party React frontend
    authenticates; the Bearer path stays available for future API clients.
    """
    session_token = request.cookies.get(settings.SESSION_COOKIE_NAME)
    if session_token:
        user = await session_service.get_user_by_token(db, session_token)
        if user is None:
            raise UnauthorizedError("Session expired or revoked")
        return user

    auth_header = request.headers.get("authorization", "")
    if auth_header.lower().startswith("bearer "):
        claims = await auth0_validator.verify(auth_header.split(" ", 1)[1])
        return await auth_service.get_or_create_from_claims(db, claims)

    raise UnauthorizedError("Not authenticated")


CurrentUser = Annotated[User, Depends(get_current_user)]


async def get_current_user_optional(request: Request, db: DbSession) -> User | None:
    """Like ``get_current_user`` but returns ``None`` instead of raising when the
    caller is unauthenticated. Used by endpoints (e.g. guest bookings, lead
    forms) that behave differently for logged-in vs anonymous users but don't
    require a login.
    """
    try:
        return await get_current_user(request, db)
    except UnauthorizedError:
        return None


CurrentUserOptional = Annotated[User | None, Depends(get_current_user_optional)]


def require_permission(permission: str):
    """Dependency factory enforcing an Auth0 RBAC permission/scope (Bearer-token clients only)."""

    async def _checker(claims: TokenClaims, user: CurrentUser) -> User:
        granted = set(claims.get("permissions", []))
        # Fall back to space-delimited scope string if RBAC permissions are absent.
        if not granted and isinstance(claims.get("scope"), str):
            granted = set(claims["scope"].split())
        if permission not in granted:
            raise PermissionDeniedError(f"Missing required permission: {permission}")
        return user

    return _checker


def require_role(role: str):
    """Dependency factory enforcing our own DB-owned authorization role.

    Auth0 only verifies identity; whether a user is an admin lives in our
    ``users.role`` column, checked here regardless of which auth path
    (session cookie or Bearer token) resolved the user.
    """

    async def _checker(user: CurrentUser) -> User:
        if user.role != role:
            raise PermissionDeniedError(f"Requires role: {role}")
        return user

    return _checker

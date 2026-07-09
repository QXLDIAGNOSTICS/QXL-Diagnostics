"""Shared API dependencies: auth, current user, role guards."""
from __future__ import annotations

from typing import Annotated

from fastapi import Depends, Request
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.config import settings
from app.core.exceptions import PermissionDeniedError, UnauthorizedError
from app.db.session import get_db
from app.models.user import User
from app.services import session_service

DbSession = Annotated[AsyncSession, Depends(get_db)]


async def get_current_user(request: Request, db: DbSession) -> User:
    """Resolve the current user from our first-party session cookie.

    The cookie is an opaque, hashed-at-rest token (see ``session_service``) —
    there is no JWT/Bearer path; sessions only exist after a user has
    completed the full password + OTP + SMS-link login handshake.
    """
    session_token = request.cookies.get(settings.SESSION_COOKIE_NAME)
    if not session_token:
        raise UnauthorizedError("Not authenticated")

    user = await session_service.get_user_by_token(db, session_token)
    if user is None:
        raise UnauthorizedError("Session expired or revoked")
    return user


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


def require_role(role: str):
    """Dependency factory enforcing our own DB-owned authorization role.
    """

    async def _checker(user: CurrentUser) -> User:
        if role == "admin":
            if user.role not in {"admin", "super_admin"}:
                raise PermissionDeniedError("Requires role: admin")
            return user
        if user.role != role:
            raise PermissionDeniedError(f"Requires role: {role}")
        return user

    return _checker


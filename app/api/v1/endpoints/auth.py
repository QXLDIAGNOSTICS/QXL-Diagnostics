"""Backend-owned Auth0 login: authorize redirect, callback, logout, me.

The FastAPI backend is the OAuth client. It never exposes Auth0 tokens to the
browser — after a successful login it issues its own httpOnly session cookie
(``settings.SESSION_COOKIE_NAME``), backed by the ``sessions`` table.
"""
from __future__ import annotations

from fastapi import APIRouter, Request
from fastapi.responses import RedirectResponse

from app.api.deps import CurrentUser, DbSession
from app.core import oauth
from app.core.config import settings
from app.core.exceptions import UnauthorizedError
from app.schemas.auth import UserMe
from app.services import auth_service, session_service

router = APIRouter(prefix="/auth", tags=["auth"])

_STATE_COOKIE = "qxl_oauth_state"
_RETURN_TO_COOKIE = "qxl_oauth_return_to"


def _safe_return_to(value: str | None) -> str:
    """Only allow same-app relative redirects — never an open redirect."""
    if not value or not value.startswith("/") or value.startswith("//"):
        return "/"
    return value


@router.get("/login")
async def login(request: Request, return_to: str = "/") -> RedirectResponse:
    state = oauth.new_state()
    response = RedirectResponse(oauth.build_authorize_url(state))
    response.set_cookie(
        _STATE_COOKIE, state, httponly=True, secure=settings.is_production,
        samesite="lax", max_age=600, path="/",
    )
    response.set_cookie(
        _RETURN_TO_COOKIE, _safe_return_to(return_to), httponly=True,
        secure=settings.is_production, samesite="lax", max_age=600, path="/",
    )
    return response


@router.get("/callback")
async def callback(request: Request, db: DbSession, code: str, state: str) -> RedirectResponse:
    expected_state = request.cookies.get(_STATE_COOKIE)
    return_to = _safe_return_to(request.cookies.get(_RETURN_TO_COOKIE))
    if not expected_state or expected_state != state:
        raise UnauthorizedError("Invalid or expired login state")

    claims = await oauth.claims_from_code(code)
    user = await auth_service.get_or_create_from_claims(db, claims)
    raw_token = await session_service.create_session(
        db,
        user,
        user_agent=request.headers.get("user-agent"),
        ip_address=request.client.host if request.client else None,
    )

    response = RedirectResponse(f"{settings.FRONTEND_BASE_URL}{return_to}")
    response.delete_cookie(_STATE_COOKIE, path="/")
    response.delete_cookie(_RETURN_TO_COOKIE, path="/")
    response.set_cookie(
        settings.SESSION_COOKIE_NAME, raw_token, httponly=True,
        secure=settings.is_production, samesite="lax",
        max_age=settings.SESSION_TTL_DAYS * 24 * 3600, path="/",
    )
    return response


@router.get("/logout")
async def logout(request: Request, db: DbSession) -> RedirectResponse:
    raw_token = request.cookies.get(settings.SESSION_COOKIE_NAME)
    if raw_token:
        await session_service.revoke_session(db, raw_token)
    response = RedirectResponse(oauth.build_logout_url())
    response.delete_cookie(settings.SESSION_COOKIE_NAME, path="/")
    return response


@router.get("/me", response_model=UserMe)
async def me(user: CurrentUser) -> UserMe:
    return UserMe.model_validate(user)

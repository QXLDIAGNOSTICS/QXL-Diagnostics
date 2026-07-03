"""Backend-owned Auth0 Authorization Code flow (login, not API auth).

The FastAPI backend is the confidential OAuth client: it holds
AUTH0_CLIENT_SECRET and performs the code exchange server-side. The frontend
never sees Auth0 tokens or secrets — it only gets our own session cookie.
"""
from __future__ import annotations

import secrets
from urllib.parse import urlencode

import httpx

from app.core.config import settings
from app.core.exceptions import UnauthorizedError
from app.core.security import auth0_validator


def new_state() -> str:
    return secrets.token_urlsafe(24)


def build_authorize_url(state: str) -> str:
    params = {
        "response_type": "code",
        "client_id": settings.AUTH0_CLIENT_ID,
        "redirect_uri": settings.AUTH0_CALLBACK_URL,
        "scope": "openid profile email",
        "state": state,
    }
    return f"https://{settings.AUTH0_DOMAIN}/authorize?{urlencode(params)}"


def build_logout_url() -> str:
    params = {
        "client_id": settings.AUTH0_CLIENT_ID,
        "returnTo": settings.FRONTEND_BASE_URL,
    }
    return f"https://{settings.AUTH0_DOMAIN}/v2/logout?{urlencode(params)}"


async def exchange_code_for_tokens(code: str) -> dict:
    payload = {
        "grant_type": "authorization_code",
        "client_id": settings.AUTH0_CLIENT_ID,
        "client_secret": settings.AUTH0_CLIENT_SECRET,
        "code": code,
        "redirect_uri": settings.AUTH0_CALLBACK_URL,
    }
    async with httpx.AsyncClient(timeout=10.0) as client:
        resp = await client.post(f"https://{settings.AUTH0_DOMAIN}/oauth/token", json=payload)
    if resp.status_code >= 400:
        raise UnauthorizedError("Auth0 token exchange failed", detail=resp.text)
    return resp.json()


async def claims_from_code(code: str) -> dict:
    """Exchange an authorization code and return verified ID token claims."""
    tokens = await exchange_code_for_tokens(code)
    id_token = tokens.get("id_token")
    if not id_token:
        raise UnauthorizedError("Auth0 response missing id_token")
    return await auth0_validator.verify_id_token(id_token)

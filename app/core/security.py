"""Auth0 JWT validation: JWKS fetch/caching and token verification."""
from __future__ import annotations

import time

import httpx
from jose import jwt
from jose.exceptions import JWTError

from app.core.config import Settings, settings
from app.core.exceptions import UnauthorizedError
from app.core.logging import get_logger

logger = get_logger(__name__)

_JWKS_TTL_SECONDS = 3600


class Auth0Validator:
    """Validates Auth0-issued RS256 access tokens against cached JWKS."""

    def __init__(self, config: Settings) -> None:
        self._settings = config
        self._jwks: dict | None = None
        self._fetched_at: float = 0.0

    @property
    def _jwks_url(self) -> str:
        return f"https://{self._settings.AUTH0_DOMAIN}/.well-known/jwks.json"

    async def _get_jwks(self, *, force: bool = False) -> dict:
        expired = (time.monotonic() - self._fetched_at) > _JWKS_TTL_SECONDS
        if force or self._jwks is None or expired:
            async with httpx.AsyncClient(timeout=10.0) as client:
                resp = await client.get(self._jwks_url)
                resp.raise_for_status()
                self._jwks = resp.json()
                self._fetched_at = time.monotonic()
        return self._jwks

    async def _signing_key(self, kid: str) -> dict:
        jwks = await self._get_jwks()
        key = self._match_key(jwks, kid)
        if key is None:
            # Key rotation: refetch once on unknown kid.
            jwks = await self._get_jwks(force=True)
            key = self._match_key(jwks, kid)
        if key is None:
            raise UnauthorizedError("Unable to find matching signing key")
        return key

    @staticmethod
    def _match_key(jwks: dict, kid: str) -> dict | None:
        for key in jwks.get("keys", []):
            if key.get("kid") == kid:
                return key
        return None

    async def verify(self, token: str) -> dict:
        if not self._settings.AUTH0_DOMAIN or not self._settings.AUTH0_API_AUDIENCE:
            raise UnauthorizedError("Auth0 is not configured")
        try:
            header = jwt.get_unverified_header(token)
        except JWTError as exc:
            raise UnauthorizedError("Malformed authorization token") from exc

        kid = header.get("kid")
        if not kid:
            raise UnauthorizedError("Token header missing 'kid'")

        key = await self._signing_key(kid)
        try:
            return jwt.decode(
                token,
                key,
                algorithms=self._settings.AUTH0_ALGORITHMS,
                audience=self._settings.AUTH0_API_AUDIENCE,
                issuer=self._settings.issuer,
            )
        except JWTError as exc:
            logger.warning("Token verification failed: %s", exc)
            raise UnauthorizedError("Invalid or expired token") from exc


auth0_validator = Auth0Validator(settings)

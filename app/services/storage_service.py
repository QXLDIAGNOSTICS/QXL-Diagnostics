"""Supabase Storage service: upload, signed URLs, delete."""
from __future__ import annotations

import base64
import hashlib
import hmac
import time
from functools import lru_cache
from pathlib import Path

from supabase import Client, create_client

from app.core.config import settings
from app.core.exceptions import AppError


@lru_cache
def _get_client() -> Client:
    if not settings.SUPABASE_URL or not settings.SUPABASE_SERVICE_ROLE_KEY:
        raise AppError("Supabase storage is not configured")
    return create_client(settings.SUPABASE_URL, settings.SUPABASE_SERVICE_ROLE_KEY)


class StorageService:
    """Supabase private bucket in every real environment. For local
    development only (``LOCAL_STORAGE_DIR`` set, Supabase unset, not
    production) files go to disk and signed URLs point at
    ``/api/v1/storage/local`` with an expiring HMAC token."""

    def __init__(self) -> None:
        self.bucket = settings.SUPABASE_BUCKET

    @property
    def _local(self) -> bool:
        return bool(settings.LOCAL_STORAGE_DIR) and not settings.SUPABASE_URL and not settings.is_production

    @property
    def _storage(self):
        return _get_client().storage.from_(self.bucket)

    def upload(self, path: str, data: bytes, content_type: str) -> None:
        if self._local:
            target = _local_path(path)
            target.parent.mkdir(parents=True, exist_ok=True)
            target.write_bytes(data)
            return
        self._storage.upload(
            path,
            data,
            {"content-type": content_type, "upsert": "false"},
        )

    def signed_url(self, path: str, expires_in: int = 3600) -> str:
        if self._local:
            return f"{settings.LOCAL_STORAGE_PUBLIC_BASE}{settings.API_V1_PREFIX}/storage/local?token={local_token(path, expires_in)}"
        res = self._storage.create_signed_url(path, expires_in)
        url = res.get("signedURL") or res.get("signed_url")
        if not url:
            raise AppError("Failed to create signed URL")
        return url

    def delete(self, path: str) -> None:
        if self._local:
            _local_path(path).unlink(missing_ok=True)
            return
        self._storage.remove([path])


def _local_path(path: str) -> Path:
    root = Path(settings.LOCAL_STORAGE_DIR).resolve()
    target = (root / path).resolve()
    if root not in target.parents:
        raise AppError("Invalid storage path")
    return target


def _sign(message: bytes) -> str:
    key = (settings.LOCAL_STORAGE_SIGNING_KEY or "dev-only-key").encode()
    return hmac.new(key, message, hashlib.sha256).hexdigest()


def local_token(path: str, expires_in: int) -> str:
    expires = int(time.time()) + expires_in
    body = base64.urlsafe_b64encode(f"{path}|{expires}".encode()).decode()
    return f"{body}.{_sign(body.encode())}"


def read_local(token: str) -> tuple[bytes, str] | None:
    """Returns (bytes, filename) for a valid, unexpired local token."""
    try:
        body, signature = token.rsplit(".", 1)
        if not hmac.compare_digest(signature, _sign(body.encode())):
            return None
        path, expires = base64.urlsafe_b64decode(body.encode()).decode().rsplit("|", 1)
        if int(expires) < time.time():
            return None
        target = _local_path(path)
        if not target.exists():
            return None
        return target.read_bytes(), target.name
    except (ValueError, AppError):
        return None


storage_service = StorageService()

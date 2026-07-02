"""Supabase Storage service: upload, signed URLs, delete."""
from __future__ import annotations

from functools import lru_cache

from supabase import Client, create_client

from app.core.config import settings
from app.core.exceptions import AppError


@lru_cache
def _get_client() -> Client:
    if not settings.SUPABASE_URL or not settings.SUPABASE_SERVICE_ROLE_KEY:
        raise AppError("Supabase storage is not configured")
    return create_client(settings.SUPABASE_URL, settings.SUPABASE_SERVICE_ROLE_KEY)


class StorageService:
    def __init__(self) -> None:
        self.bucket = settings.SUPABASE_BUCKET

    @property
    def _storage(self):
        return _get_client().storage.from_(self.bucket)

    def upload(self, path: str, data: bytes, content_type: str) -> None:
        self._storage.upload(
            path,
            data,
            {"content-type": content_type, "upsert": "false"},
        )

    def signed_url(self, path: str, expires_in: int = 3600) -> str:
        res = self._storage.create_signed_url(path, expires_in)
        url = res.get("signedURL") or res.get("signed_url")
        if not url:
            raise AppError("Failed to create signed URL")
        return url

    def delete(self, path: str) -> None:
        self._storage.remove([path])


storage_service = StorageService()

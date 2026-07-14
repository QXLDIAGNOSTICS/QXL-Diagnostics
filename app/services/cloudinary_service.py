"""Cloudinary image hosting for public, admin-managed CMS images.

Implemented as direct signed REST calls (Cloudinary's upload API) via
``httpx`` rather than the ``cloudinary`` SDK, to avoid adding a new
dependency — the signing scheme is a documented, simple HMAC-SHA1 over the
sorted request parameters.

Used for doctor photos, homepage/banner artwork, blog cover images, and
similar content managed from the admin panel. Anything private/per-user
(e.g. uploaded prescriptions) stays on Supabase Storage — see
``storage_service.py``.
"""
from __future__ import annotations

import hashlib
import time

import httpx

from app.core.config import settings
from app.core.exceptions import AppError, ValidationError

_UPLOAD_URL_TEMPLATE = "https://api.cloudinary.com/v1_1/{cloud_name}/image/upload"

ALLOWED_IMAGE_TYPES = {"image/png", "image/jpeg", "image/jpg", "image/webp", "image/gif"}


def _is_configured() -> bool:
    return bool(
        settings.CLOUDINARY_CLOUD_NAME
        and settings.CLOUDINARY_API_KEY
        and settings.CLOUDINARY_API_SECRET
    )


def _sign(params: dict[str, str]) -> str:
    """Cloudinary signature: SHA1 of sorted ``key=value`` pairs + api secret."""
    to_sign = "&".join(f"{k}={v}" for k, v in sorted(params.items()))
    to_sign = f"{to_sign}{settings.CLOUDINARY_API_SECRET}"
    return hashlib.sha1(to_sign.encode("utf-8")).hexdigest()  # noqa: S324 - Cloudinary's documented scheme


async def upload_image(data: bytes, filename: str, content_type: str) -> str:
    """Upload an image and return its permanent, public ``secure_url``."""
    if not _is_configured():
        raise AppError(
            "Image hosting is not configured. Set CLOUDINARY_CLOUD_NAME, "
            "CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET."
        )
    if content_type not in ALLOWED_IMAGE_TYPES:
        raise ValidationError(f"Unsupported image type: {content_type}")
    if not data:
        raise ValidationError("Empty file")
    if len(data) > settings.MAX_IMAGE_UPLOAD_BYTES:
        raise ValidationError("Image exceeds the maximum allowed size")

    timestamp = str(int(time.time()))
    params_to_sign = {"folder": settings.CLOUDINARY_UPLOAD_FOLDER, "timestamp": timestamp}
    signature = _sign(params_to_sign)

    url = _UPLOAD_URL_TEMPLATE.format(cloud_name=settings.CLOUDINARY_CLOUD_NAME)
    files = {"file": (filename, data, content_type)}
    form = {
        "api_key": settings.CLOUDINARY_API_KEY,
        "timestamp": timestamp,
        "folder": settings.CLOUDINARY_UPLOAD_FOLDER,
        "signature": signature,
    }

    async with httpx.AsyncClient(timeout=30.0) as client:
        resp = await client.post(url, data=form, files=files)
        if resp.status_code >= 400:
            raise AppError(f"Image upload failed: {resp.text}")
        body = resp.json()

    secure_url = body.get("secure_url")
    if not secure_url:
        raise AppError("Image upload failed: no URL returned")
    return secure_url

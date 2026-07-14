"""Admin image upload endpoint — hosts public CMS images on Cloudinary
(doctor photos, banner artwork, blog cover images, etc.) and returns the
permanent URL to store on the relevant record (Doctor.image_url,
Banner.image_url, BlogPost.image_url, ...).
"""
from __future__ import annotations

from fastapi import APIRouter, Depends, File, UploadFile

from app.api.deps import require_role
from app.core.exceptions import ValidationError
from app.models.user import User
from app.schemas.file import ImageUploadResponse
from app.services import cloudinary_service

router = APIRouter(prefix="/uploads", tags=["uploads"])


@router.post("/image", response_model=ImageUploadResponse, status_code=201)
async def upload_image(
    user: User = Depends(require_role("admin")),
    file: UploadFile = File(...),
) -> ImageUploadResponse:
    content_type = file.content_type or "application/octet-stream"
    data = await file.read()
    if not data:
        raise ValidationError("Empty file")
    url = await cloudinary_service.upload_image(data, file.filename or "upload", content_type)
    return ImageUploadResponse(url=url)

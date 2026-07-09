"""Prescription upload + AI analysis endpoints (authenticated users only)."""
from __future__ import annotations

import uuid

from fastapi import APIRouter, BackgroundTasks, File, UploadFile

from app.api.deps import CurrentUser, DbSession
from app.core.config import settings
from app.core.exceptions import ValidationError
from app.db.session import AsyncSessionLocal
from app.repositories.file_repository import FileRepository
from app.repositories.prescription_repository import PrescriptionRepository
from app.schemas.prescription import PrescriptionList, PrescriptionRead
from app.services import prescription_service
from app.services.storage_service import storage_service

router = APIRouter(prefix="/prescriptions", tags=["prescriptions"])

_ALLOWED_TYPES = {"application/pdf", "image/png", "image/jpeg", "image/jpg", "image/webp"}


async def _analyze_in_background(prescription_id: uuid.UUID, data: bytes, content_type: str) -> None:
    async with AsyncSessionLocal() as db:
        await prescription_service.run_analysis_and_store(db, prescription_id, data, content_type)


@router.post("", response_model=PrescriptionRead, status_code=201)
async def upload_prescription(
    background: BackgroundTasks,
    db: DbSession,
    user: CurrentUser,
    file: UploadFile = File(...),
) -> PrescriptionRead:
    await prescription_service.check_upload_quota(db, user.id)

    content_type = file.content_type or "application/octet-stream"
    if content_type not in _ALLOWED_TYPES:
        raise ValidationError(
            f"Unsupported file type: {content_type}. Please upload a PDF or image (PNG/JPEG/WEBP)."
        )

    data = await file.read()
    if not data:
        raise ValidationError("Empty file")
    if len(data) > settings.MAX_UPLOAD_BYTES:
        raise ValidationError("File exceeds the maximum allowed size")

    object_path = f"prescriptions/{user.id}/{uuid.uuid4()}_{file.filename}"
    storage_service.upload(object_path, data, content_type)

    file_repo = FileRepository(db)
    file_record = await file_repo.create(
        owner_id=user.id,
        bucket=settings.SUPABASE_BUCKET,
        object_path=object_path,
        filename=file.filename or "prescription",
        content_type=content_type,
        size=len(data),
    )

    presc_repo = PrescriptionRepository(db)
    prescription = await presc_repo.create(
        user_id=user.id,
        file_id=file_record.id,
        filename=file.filename or "prescription",
        content_type=content_type,
        analysis_status="pending",
    )
    await db.commit()
    await db.refresh(prescription)

    background.add_task(_analyze_in_background, prescription.id, data, content_type)

    return await prescription_service.get_prescription_for_user(db, prescription.id, user.id)


@router.get("/quota")
async def get_upload_quota(db: DbSession, user: CurrentUser) -> dict:
    return await prescription_service.get_upload_quota(db, user.id)


@router.get("", response_model=PrescriptionList)
async def list_my_prescriptions(db: DbSession, user: CurrentUser, limit: int = 50, offset: int = 0) -> PrescriptionList:
    items, count = await prescription_service.list_my_prescriptions(db, user.id, limit=limit, offset=offset)
    return PrescriptionList(items=items, count=count)


@router.get("/{prescription_id}", response_model=PrescriptionRead)
async def get_prescription(prescription_id: uuid.UUID, db: DbSession, user: CurrentUser) -> PrescriptionRead:
    return await prescription_service.get_prescription_for_user(db, prescription_id, user.id)

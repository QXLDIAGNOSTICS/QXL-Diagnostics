"""File endpoints: upload (Supabase + RAG ingestion), list, download, delete."""
from __future__ import annotations

import uuid

from fastapi import APIRouter, BackgroundTasks, File, UploadFile

from app.api.deps import CurrentUser, DbSession
from app.core.config import settings
from app.core.exceptions import NotFoundError, ValidationError
from app.db.session import AsyncSessionLocal
from app.repositories.file_repository import FileRepository
from app.schemas.file import FileList, FileRead, FileWithUrl
from app.services import ingestion_service
from app.services.storage_service import storage_service

router = APIRouter(prefix="/files", tags=["files"])


async def _ingest_in_background(
    owner_id: uuid.UUID, file_id: uuid.UUID, data: bytes, content_type: str
) -> None:
    async with AsyncSessionLocal() as db:
        await ingestion_service.ingest_file_bytes(
            db, owner_id=owner_id, file_id=file_id, data=data, content_type=content_type
        )


@router.post("", response_model=FileRead, status_code=201)
async def upload_file(
    background: BackgroundTasks,
    db: DbSession,
    user: CurrentUser,
    file: UploadFile = File(...),
) -> FileRead:
    content_type = file.content_type or "application/octet-stream"
    if content_type not in settings.ALLOWED_UPLOAD_TYPES:
        raise ValidationError(f"Unsupported content type: {content_type}")

    data = await file.read()
    if len(data) > settings.MAX_UPLOAD_BYTES:
        raise ValidationError("File exceeds the maximum allowed size")
    if not data:
        raise ValidationError("Empty file")

    object_path = f"{user.id}/{uuid.uuid4()}_{file.filename}"
    storage_service.upload(object_path, data, content_type)

    repo = FileRepository(db)
    record = await repo.create(
        owner_id=user.id,
        bucket=settings.SUPABASE_BUCKET,
        object_path=object_path,
        filename=file.filename or "upload",
        content_type=content_type,
        size=len(data),
    )
    await db.commit()
    await db.refresh(record)

    # RAG ingestion runs off the request path.
    background.add_task(_ingest_in_background, user.id, record.id, data, content_type)
    return FileRead.model_validate(record)


@router.get("", response_model=FileList)
async def list_files(
    db: DbSession,
    user: CurrentUser,
    limit: int = 50,
    offset: int = 0,
) -> FileList:
    repo = FileRepository(db)
    items, count = await repo.list_for_owner(user.id, limit=limit, offset=offset)
    return FileList(items=[FileRead.model_validate(i) for i in items], count=count)


@router.get("/{file_id}", response_model=FileWithUrl)
async def get_file(
    file_id: uuid.UUID,
    db: DbSession,
    user: CurrentUser,
) -> FileWithUrl:
    repo = FileRepository(db)
    record = await repo.get_owned(file_id, user.id)
    if record is None:
        raise NotFoundError("File not found")
    url = storage_service.signed_url(record.object_path)
    return FileWithUrl(**FileRead.model_validate(record).model_dump(), download_url=url)


@router.delete("/{file_id}", status_code=204)
async def delete_file(
    file_id: uuid.UUID,
    db: DbSession,
    user: CurrentUser,
) -> None:
    repo = FileRepository(db)
    record = await repo.get_owned(file_id, user.id)
    if record is None:
        raise NotFoundError("File not found")
    storage_service.delete(record.object_path)
    await repo.delete(record)
    await db.commit()

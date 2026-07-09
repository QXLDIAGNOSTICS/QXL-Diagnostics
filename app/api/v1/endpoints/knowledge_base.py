"""Admin-only endpoints for the global chatbot knowledge base.

Documents uploaded here are ingested with ``owner_id = NULL`` so they ground
every user's chatbot session (see ``knowledge_base_service`` and
``ChunkRepository.search``) — distinct from a user's own file uploads under
``/files`` which stay private (RAG-scoped to that user only).
"""
from __future__ import annotations

import uuid

from fastapi import APIRouter, Depends, File, UploadFile

from app.api.deps import DbSession, require_role
from app.core.config import settings
from app.core.exceptions import ValidationError
from app.models.user import User
from app.schemas.knowledge import KnowledgeDocumentList, KnowledgeDocumentRead
from app.services import knowledge_base_service

router = APIRouter(prefix="/admin/knowledge-base", tags=["admin"])


@router.get("", response_model=KnowledgeDocumentList)
async def list_knowledge_documents(
    db: DbSession, limit: int = 100, offset: int = 0, current: User = Depends(require_role("admin"))
) -> KnowledgeDocumentList:
    items, count = await knowledge_base_service.list_documents(db, limit=limit, offset=offset)
    return KnowledgeDocumentList(items=items, count=count)


@router.post("", response_model=KnowledgeDocumentRead, status_code=201)
async def upload_knowledge_document(
    db: DbSession,
    current: User = Depends(require_role("admin")),
    file: UploadFile = File(...),
) -> KnowledgeDocumentRead:
    content_type = file.content_type or "application/octet-stream"
    if content_type not in settings.ALLOWED_UPLOAD_TYPES:
        raise ValidationError(f"Unsupported content type: {content_type}")

    data = await file.read()
    if len(data) > settings.MAX_UPLOAD_BYTES:
        raise ValidationError("File exceeds the maximum allowed size")
    if not data:
        raise ValidationError("Empty file")

    return await knowledge_base_service.upload_document(
        db,
        filename=file.filename or "document",
        content_type=content_type,
        data=data,
        bucket=settings.SUPABASE_BUCKET,
    )


@router.delete("/{file_id}", status_code=204)
async def delete_knowledge_document(
    file_id: uuid.UUID, db: DbSession, current: User = Depends(require_role("admin"))
) -> None:
    await knowledge_base_service.delete_document(db, file_id)

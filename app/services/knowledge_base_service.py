"""Admin-managed global chatbot knowledge base.

Documents uploaded here are stored with ``owner_id = NULL`` (see
``FileRecord``/``DocChunk``) which marks them as GLOBAL: every user's chat
session is grounded in these chunks in addition to their own personal
uploads (see ``ChunkRepository.search`` and ``retrieval_service``). This is
how admins can teach the assistant about specialities, policies, or anything
else not already exposed via a live DB tool (packages/tests/centers/blog/faq).
"""
from __future__ import annotations

import uuid

from sqlalchemy.ext.asyncio import AsyncSession

from app.core.exceptions import NotFoundError
from app.repositories.chunk_repository import ChunkRepository
from app.repositories.file_repository import FileRepository
from app.schemas.knowledge import KnowledgeDocumentRead
from app.services import ingestion_service
from app.services.storage_service import storage_service


async def list_documents(db: AsyncSession, limit: int = 100, offset: int = 0) -> tuple[list[KnowledgeDocumentRead], int]:
    items, count = await FileRepository(db).list_global(limit=limit, offset=offset)
    chunk_repo = ChunkRepository(db)
    out = []
    for record in items:
        chunk_count = await chunk_repo.count_for_file(record.id)
        out.append(
            KnowledgeDocumentRead(
                id=record.id,
                filename=record.filename,
                content_type=record.content_type,
                size=record.size,
                created_at=record.created_at,
                chunk_count=chunk_count,
            )
        )
    return out, count


async def upload_document(
    db: AsyncSession,
    *,
    filename: str,
    content_type: str,
    data: bytes,
    bucket: str,
) -> KnowledgeDocumentRead:
    object_path = f"kb/{uuid.uuid4()}_{filename}"
    storage_service.upload(object_path, data, content_type)

    repo = FileRepository(db)
    record = await repo.create(
        owner_id=None,
        bucket=bucket,
        object_path=object_path,
        filename=filename,
        content_type=content_type,
        size=len(data),
    )
    await db.commit()
    await db.refresh(record)

    chunk_count = await ingestion_service.ingest_file_bytes(
        db, owner_id=None, file_id=record.id, data=data, content_type=content_type
    )
    return KnowledgeDocumentRead(
        id=record.id,
        filename=record.filename,
        content_type=record.content_type,
        size=record.size,
        created_at=record.created_at,
        chunk_count=chunk_count,
    )


async def delete_document(db: AsyncSession, file_id: uuid.UUID) -> None:
    repo = FileRepository(db)
    record = await repo.get_global(file_id)
    if record is None:
        raise NotFoundError("Knowledge base document not found")
    storage_service.delete(record.object_path)
    await repo.delete(record)
    await db.commit()

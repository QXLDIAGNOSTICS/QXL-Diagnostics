"""RAG ingestion: extract text, chunk, embed, persist doc_chunks."""
from __future__ import annotations

import io
import uuid

from sqlalchemy.ext.asyncio import AsyncSession

from app.core.logging import get_logger
from app.repositories.chunk_repository import ChunkRepository
from app.services.embedding_service import chunk_text, embed_texts

logger = get_logger(__name__)


def extract_text(data: bytes, content_type: str) -> str:
    """Extract raw text from supported file types."""
    if content_type == "application/pdf":
        return _extract_pdf(data)
    if content_type.startswith("text/"):
        return data.decode("utf-8", errors="ignore")
    # Unsupported for RAG (e.g. images) — return empty so ingestion is skipped.
    return ""


def _extract_pdf(data: bytes) -> str:
    from pypdf import PdfReader

    reader = PdfReader(io.BytesIO(data))
    pages = [page.extract_text() or "" for page in reader.pages]
    return "\n".join(pages)


async def ingest_document(
    db: AsyncSession,
    *,
    owner_id: uuid.UUID,
    file_id: uuid.UUID | None,
    raw_text: str,
) -> int:
    """Chunk, embed and store a document. Returns the number of chunks stored."""
    chunks = chunk_text(raw_text)
    if not chunks:
        return 0

    embeddings = await embed_texts(chunks)
    repo = ChunkRepository(db)
    await repo.add_many(
        owner_id=owner_id,
        source_file_id=file_id,
        chunks=chunks,
        embeddings=embeddings,
    )
    await db.commit()
    logger.info("Ingested %d chunks for file %s", len(chunks), file_id)
    return len(chunks)


async def ingest_file_bytes(
    db: AsyncSession,
    *,
    owner_id: uuid.UUID,
    file_id: uuid.UUID,
    data: bytes,
    content_type: str,
) -> int:
    text = extract_text(data, content_type)
    if not text.strip():
        return 0
    return await ingest_document(db, owner_id=owner_id, file_id=file_id, raw_text=text)

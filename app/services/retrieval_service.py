"""RAG retrieval: embed the question and fetch user-scoped context."""
from __future__ import annotations

import uuid

from sqlalchemy.ext.asyncio import AsyncSession

from app.core.config import settings
from app.repositories.chunk_repository import ChunkRepository
from app.services.embedding_service import embed_query


async def retrieve_context(
    db: AsyncSession,
    *,
    owner_id: uuid.UUID,
    question: str,
    top_k: int | None = None,
) -> str:
    """Return the concatenated most-relevant chunks for the given user."""
    k = top_k or settings.RAG_TOP_K
    query_embedding = await embed_query(question)
    repo = ChunkRepository(db)
    chunks = await repo.search(owner_id=owner_id, query_embedding=query_embedding, top_k=k)
    return "\n---\n".join(chunk.content for chunk in chunks)

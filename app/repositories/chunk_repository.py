"""Doc-chunk repository — RAG vector storage and user-scoped similarity search."""
from __future__ import annotations

import uuid
from collections.abc import Sequence

from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.doc_chunk import DocChunk


class ChunkRepository:
    def __init__(self, db: AsyncSession) -> None:
        self.db = db

    async def add_many(
        self,
        *,
        owner_id: uuid.UUID,
        source_file_id: uuid.UUID | None,
        chunks: Sequence[str],
        embeddings: Sequence[Sequence[float]],
    ) -> list[DocChunk]:
        rows = [
            DocChunk(
                owner_id=owner_id,
                source_file_id=source_file_id,
                content=content,
                embedding=list(embedding),
            )
            for content, embedding in zip(chunks, embeddings, strict=True)
        ]
        self.db.add_all(rows)
        await self.db.flush()
        return rows

    async def search(
        self, *, owner_id: uuid.UUID, query_embedding: Sequence[float], top_k: int
    ) -> list[DocChunk]:
        """Cosine-distance nearest neighbours, STRICTLY scoped to the owner."""
        stmt = (
            select(DocChunk)
            .where(DocChunk.owner_id == owner_id)
            .order_by(DocChunk.embedding.cosine_distance(list(query_embedding)))
            .limit(top_k)
        )
        result = await self.db.execute(stmt)
        return list(result.scalars().all())

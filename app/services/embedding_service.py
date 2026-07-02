"""OpenAI client + embeddings + token-aware text chunking."""
from __future__ import annotations

from functools import lru_cache

import tiktoken
from openai import AsyncOpenAI

from app.core.config import settings


@lru_cache
def get_openai_client() -> AsyncOpenAI:
    return AsyncOpenAI(api_key=settings.OPENAI_API_KEY)


@lru_cache
def _encoder() -> tiktoken.Encoding:
    try:
        return tiktoken.encoding_for_model(settings.OPENAI_EMBEDDING_MODEL)
    except KeyError:
        return tiktoken.get_encoding("cl100k_base")


def chunk_text(text: str, *, max_tokens: int = 500, overlap: int = 50) -> list[str]:
    """Split text into token-bounded, overlapping chunks."""
    text = text.strip()
    if not text:
        return []
    enc = _encoder()
    tokens = enc.encode(text)
    if len(tokens) <= max_tokens:
        return [text]

    step = max(1, max_tokens - overlap)
    chunks: list[str] = []
    for start in range(0, len(tokens), step):
        window = tokens[start : start + max_tokens]
        if not window:
            break
        chunks.append(enc.decode(window).strip())
        if start + max_tokens >= len(tokens):
            break
    return [c for c in chunks if c]


async def embed_texts(texts: list[str]) -> list[list[float]]:
    """Batch-embed a list of texts."""
    if not texts:
        return []
    client = get_openai_client()
    resp = await client.embeddings.create(
        model=settings.OPENAI_EMBEDDING_MODEL,
        input=texts,
    )
    # Preserve request order.
    ordered = sorted(resp.data, key=lambda d: d.index)
    return [d.embedding for d in ordered]


async def embed_query(text: str) -> list[float]:
    result = await embed_texts([text])
    return result[0]

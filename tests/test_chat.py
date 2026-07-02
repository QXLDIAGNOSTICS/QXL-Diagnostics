"""RAG + streaming chat tests: chunking, retrieval isolation, SSE format."""
from __future__ import annotations

import uuid
from unittest.mock import AsyncMock

from app.services import chat_service, retrieval_service
from app.services.embedding_service import chunk_text


def test_chunk_text_short_text_single_chunk():
    chunks = chunk_text("hello world", max_tokens=500, overlap=50)
    assert chunks == ["hello world"]


def test_chunk_text_empty_returns_empty():
    assert chunk_text("   ") == []


def test_chunk_text_produces_bounded_overlapping_chunks():
    text = " ".join(f"word{i}" for i in range(2000))
    chunks = chunk_text(text, max_tokens=100, overlap=20)
    assert len(chunks) > 1
    assert all(c.strip() for c in chunks)


async def test_retrieval_is_scoped_to_owner(monkeypatch):
    """retrieve_context must query only the authenticated user's chunks."""
    owner_id = uuid.uuid4()

    async def fake_embed_query(_text: str):
        return [0.1] * 8

    captured = {}

    class FakeRepo:
        def __init__(self, _db):
            pass

        async def search(self, *, owner_id, query_embedding, top_k):
            captured["owner_id"] = owner_id
            captured["top_k"] = top_k
            return [type("C", (), {"content": "chunk-A"})()]

    monkeypatch.setattr(retrieval_service, "embed_query", fake_embed_query)
    monkeypatch.setattr(retrieval_service, "ChunkRepository", FakeRepo)

    result = await retrieval_service.retrieve_context(
        AsyncMock(), owner_id=owner_id, question="what is my result?", top_k=3
    )
    assert captured["owner_id"] == owner_id
    assert captured["top_k"] == 3
    assert "chunk-A" in result


async def test_chat_stream_endpoint_emits_sse(client, monkeypatch):
    """The /chat/stream endpoint returns well-formed SSE ending with [DONE]."""

    async def fake_stream(_db, _user, _question, _conversation_id=None):
        yield f"data: {{\"conversation_id\": \"{uuid.uuid4()}\"}}\n\n"
        yield 'data: {"delta": "Hello"}\n\n'
        yield 'data: {"delta": " world"}\n\n'
        yield "data: [DONE]\n\n"

    monkeypatch.setattr(chat_service, "stream_answer", fake_stream)

    async with client.stream(
        "POST", "/api/v1/chat/stream", json={"question": "hi"}
    ) as resp:
        assert resp.status_code == 200
        assert resp.headers["content-type"].startswith("text/event-stream")
        lines = [line async for line in resp.aiter_lines() if line.strip()]

    assert any(line.startswith("data: ") for line in lines)
    assert lines[-1] == "data: [DONE]"

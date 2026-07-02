"""RAG chat service: retrieval-grounded, streaming OpenAI responses (SSE)."""
from __future__ import annotations

import json
import uuid
from collections.abc import AsyncGenerator

from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.config import settings
from app.core.exceptions import NotFoundError
from app.core.logging import get_logger
from app.models.conversation import Conversation, Message
from app.models.user import User
from app.services import retrieval_service
from app.services.embedding_service import get_openai_client

logger = get_logger(__name__)

SYSTEM_PROMPT = (
    "You are the QXL Diagnostics AI assistant. You help users understand their "
    "medical reports, lab tests, and health packages. "
    "Answer ONLY using the context provided below. "
    "If the answer is not in the context, say you don't have that information and "
    "suggest contacting QXL support. Never invent medical results. "
    "Be concise, clear, and empathetic."
)


async def _get_or_create_conversation(
    db: AsyncSession, user: User, conversation_id: uuid.UUID | None
) -> Conversation:
    if conversation_id is not None:
        conversation = await db.get(Conversation, conversation_id)
        if conversation is None or conversation.owner_id != user.id:
            raise NotFoundError("Conversation not found")
        return conversation
    conversation = Conversation(owner_id=user.id)
    db.add(conversation)
    await db.flush()
    return conversation


async def _load_recent_history(db: AsyncSession, conversation_id: uuid.UUID) -> list[dict]:
    stmt = (
        select(Message)
        .where(Message.conversation_id == conversation_id)
        .order_by(Message.created_at.desc())
        .limit(settings.CHAT_HISTORY_LIMIT)
    )
    rows = list((await db.execute(stmt)).scalars().all())
    rows.reverse()  # chronological order for the model
    return [{"role": m.role, "content": m.content} for m in rows]


async def _persist_message(
    db: AsyncSession, conversation_id: uuid.UUID, role: str, content: str
) -> None:
    db.add(Message(conversation_id=conversation_id, role=role, content=content))


async def stream_answer(
    db: AsyncSession,
    user: User,
    question: str,
    conversation_id: uuid.UUID | None = None,
) -> AsyncGenerator[str, None]:
    """Yield Server-Sent Events streaming a grounded assistant response."""
    conversation = await _get_or_create_conversation(db, user, conversation_id)
    conv_id = conversation.id

    # Emit the conversation id first so clients can continue the thread.
    yield f"data: {json.dumps({'conversation_id': str(conv_id)})}\n\n"

    context = await retrieval_service.retrieve_context(
        db, owner_id=user.id, question=question
    )
    history = await _load_recent_history(db, conv_id)

    messages = [
        {
            "role": "system",
            "content": f"{SYSTEM_PROMPT}\n\nContext:\n{context or '(no user documents found)'}",
        },
        *history,
        {"role": "user", "content": question},
    ]

    client = get_openai_client()
    collected: list[str] = []
    try:
        stream = await client.chat.completions.create(
            model=settings.OPENAI_MODEL,
            messages=messages,
            stream=True,
            temperature=0.2,
        )
        async for chunk in stream:
            if not chunk.choices:
                continue
            delta = chunk.choices[0].delta.content or ""
            if delta:
                collected.append(delta)
                yield f"data: {json.dumps({'delta': delta})}\n\n"
    except Exception as exc:  # noqa: BLE001 - surface a clean SSE error to the client
        logger.exception("Chat streaming failed")
        yield f"data: {json.dumps({'error': 'generation_failed'})}\n\n"
        # Still persist the user turn below before returning.
        _ = exc

    answer = "".join(collected)
    await _persist_message(db, conv_id, "user", question)
    if answer:
        await _persist_message(db, conv_id, "assistant", answer)
    await db.commit()

    yield "data: [DONE]\n\n"


async def list_conversations(db: AsyncSession, user: User) -> list[Conversation]:
    stmt = (
        select(Conversation)
        .where(Conversation.owner_id == user.id)
        .order_by(Conversation.created_at.desc())
    )
    return list((await db.execute(stmt)).scalars().all())


async def get_conversation(
    db: AsyncSession, user: User, conversation_id: uuid.UUID
) -> Conversation:
    conversation = await db.get(Conversation, conversation_id)
    if conversation is None or conversation.owner_id != user.id:
        raise NotFoundError("Conversation not found")
    return conversation

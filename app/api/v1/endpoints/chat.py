"""Chat endpoints: streaming RAG responses (SSE) + conversation history."""
from __future__ import annotations

import uuid

from fastapi import APIRouter, Depends
from fastapi.responses import StreamingResponse

from app.api.deps import CurrentUser, DbSession, require_permission
from app.models.user import User
from app.schemas.chat import ChatRequest, ConversationDetail, ConversationRead
from app.services import chat_service

router = APIRouter(prefix="/chat", tags=["chat"])


@router.post("/stream")
async def chat_stream(
    body: ChatRequest,
    db: DbSession,
    user: User = Depends(require_permission("read:chat")),
) -> StreamingResponse:
    generator = chat_service.stream_answer(db, user, body.question, body.conversation_id)
    return StreamingResponse(
        generator,
        media_type="text/event-stream",
        headers={
            "Cache-Control": "no-cache",
            "Connection": "keep-alive",
            "X-Accel-Buffering": "no",
        },
    )


@router.get("/conversations", response_model=list[ConversationRead])
async def list_conversations(user: CurrentUser, db: DbSession):
    return await chat_service.list_conversations(db, user)


@router.get("/conversations/{conversation_id}", response_model=ConversationDetail)
async def get_conversation(conversation_id: uuid.UUID, user: CurrentUser, db: DbSession):
    return await chat_service.get_conversation(db, user, conversation_id)

"""Chat endpoints: streaming RAG responses (SSE) + conversation history."""
from __future__ import annotations

import uuid

from fastapi import APIRouter, Request
from fastapi.responses import JSONResponse, StreamingResponse

from app.api.deps import CurrentUser, CurrentUserOptional, DbSession
from app.schemas.chat import ChatRequest, ConversationDetail, ConversationRead
from app.services import chat_service
from app.services.chat_rate_limit import RateLimitExceeded
from app.services.chat_rate_limit import check_and_increment as rl_check
from app.services.chat_rate_limit import get_status as rl_status

router = APIRouter(prefix="/chat", tags=["chat"])


@router.post("/stream")
async def chat_stream(
    body: ChatRequest,
    request: Request,
    user: CurrentUserOptional,
    db: DbSession,
) -> StreamingResponse:
    # ── Rate limit check ──────────────────────────────────────────────────────
    # Authenticated users: 100 msgs/day.  Guests: 50 msgs/day (fingerprinted).
    user_id = str(user.id) if user is not None else None
    try:
        quota = await rl_check(db, request, user_id)
    except RateLimitExceeded as exc:
        return JSONResponse(
            status_code=429,
            content={
                "error": {
                    "code": "chat_limit_reached",
                    "message": (
                        f"You've reached your daily chat limit of {exc.limit} messages. "
                        "Your limit resets at midnight UTC. "
                        + (
                            "Please log in to get a higher limit."
                            if exc.kind == "guest"
                            else "Please try again tomorrow."
                        )
                    ),
                    "limit": exc.limit,
                    "kind": exc.kind,
                }
            },
            headers={
                "X-RateLimit-Limit": str(exc.limit),
                "X-RateLimit-Remaining": "0",
                "X-RateLimit-Kind": exc.kind,
            },
        )

    # ── If not logged in, fall back to a guest-safe chat mode ─────────────────
    # The stream_answer function requires a real User — for guests we need
    # a lightweight guest context.  If user is None the chat endpoint is now
    # open to guests (rate-limited above), so we call the guest variant.
    if user is None:
        generator = chat_service.stream_answer_guest(
            db, body.question, body.conversation_id, lat=body.lat, lng=body.lng
        )
    else:
        generator = chat_service.stream_answer(
            db, user, body.question, body.conversation_id, lat=body.lat, lng=body.lng
        )

    response = StreamingResponse(
        generator,
        media_type="text/event-stream",
        headers={
            "Cache-Control": "no-cache",
            "Connection": "keep-alive",
            "X-Accel-Buffering": "no",
            "X-RateLimit-Limit": str(quota["limit"]),
            "X-RateLimit-Remaining": str(quota["remaining"]),
            "X-RateLimit-Kind": quota["kind"],
        },
    )
    return response


@router.get("/rate-limit")
async def chat_rate_limit_status(
    request: Request,
    user: CurrentUserOptional,
    db: DbSession,
) -> dict:
    """Return the current chat quota status without consuming a message."""
    user_id = str(user.id) if user is not None else None
    return await rl_status(db, request, user_id)


@router.get("/conversations", response_model=list[ConversationRead])
async def list_conversations(user: CurrentUser, db: DbSession):
    return await chat_service.list_conversations(db, user)


@router.get("/conversations/{conversation_id}", response_model=ConversationDetail)
async def get_conversation(conversation_id: uuid.UUID, user: CurrentUser, db: DbSession):
    return await chat_service.get_conversation(db, user, conversation_id)

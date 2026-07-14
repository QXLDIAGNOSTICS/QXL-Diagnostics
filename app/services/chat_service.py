"""RAG chat service: retrieval-grounded, streaming OpenAI responses (SSE).

The assistant is also equipped with backend tools (function calling) so it can
look up live health packages, tests, centers, and — for the authenticated user
only — their own bookings and analyzed prescriptions. Tool resolution happens
in a bounded, non-streaming loop; the final user-facing answer is always
generated as a streamed completion.
"""
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
from app.services.chat_tools import TOOL_SPECS, execute_tool
from app.services.embedding_service import get_openai_client

logger = get_logger(__name__)

MAX_TOOL_HOPS = 3

SYSTEM_PROMPT = (
    "You are the QXL Diagnostics AI assistant. You ONLY help with QXL Diagnostics "
    "topics: lab tests, health packages, prices, collection centers, bookings, "
    "payments, prescriptions/reports, and general lab-test health education "
    "directly related to QXL's services. You help users understand their "
    "medical reports, lab tests, and health packages, and can look up live "
    "information from QXL's systems using the tools available to you: "
    "searching health packages, searching lab tests, listing/finding nearest "
    "collection centers, searching blog articles, listing FAQs, checking "
    "prescription upload quota, and — only for the "
    "logged-in user asking about themselves — their own bookings, prescriptions, "
    "and creating a NEW booking directly in this chat. "
    "Always call a tool instead of guessing when the user asks about prices, "
    "package contents, center locations, blog/education content, policies/FAQs, "
    "their bookings, or their prescription "
    "analysis. Ground your answer in the tool results and the context provided "
    "below. If the answer is not available from tools or context, say you don't "
    "have that information and suggest contacting QXL support. Never invent "
    "medical results or diagnoses. Be concise, clear, and empathetic.\n\n"
    "OUT-OF-SCOPE QUESTIONS: if the user asks something unrelated to QXL "
    "Diagnostics and health/diagnostics in general (e.g. general trivia, "
    "consumer products, coding help, current events, or any other off-topic "
    "request — for example asking about batteries, electronics, celebrities, "
    "etc.), do NOT answer it. Politely say that you're the QXL Diagnostics "
    "assistant and can only help with lab tests, health packages, bookings, "
    "reports, and related health questions, then ask if there's something QXL "
    "can help with instead. Never use outside/general knowledge to answer "
    "unrelated questions just because you happen to know the answer.\n\n"
    "PRESCRIPTION-AWARE BOOKING: if the user has uploaded a prescription, call "
    "get_my_prescriptions to read the AI-extracted recommended tests before "
    "suggesting what to book — use those results to pre-fill/suggest the right "
    "tests or package instead of asking the user to retype everything.\n\n"
    "LOCATION & CENTER SELECTION: the user's browser silently shares its GPS "
    "location with this chat when permission is granted — you receive it "
    "automatically as part of every request, you never ask the user to type "
    "coordinates, and find_nearest_centers uses it for you without any argument "
    "from you. When a center visit is needed, just call find_nearest_centers "
    "directly — do NOT ask the user to share or enter their location first, "
    "just try the tool. Present the returned centers as a short numbered list "
    "with name, distance (if available), and address directly in the chat, "
    "clearly highlighting the nearest one, and ask the user to reply with the "
    "number or name of the one they want. Only if find_nearest_centers returns "
    "centers with no distance info (meaning no GPS location was available) "
    "should you ask the user for their city name as a fallback — never ask them "
    "to type latitude/longitude, and never claim you 'don't have access to "
    "location' without first having actually called the tool this turn.\n\n"
    "AUTOMATED BOOKING FLOW: when a user wants to book a test/package (including "
    "after you've discussed their prescription or symptoms), guide them through "
    "booking end-to-end in this chat: "
    "1) Confirm what they want to book (package or test name) using search tools — "
    "the test/package MUST be one that actually exists in QXL's catalog; if the "
    "user names something not found, show them close matches from search_tests / "
    "search_health_packages instead of guessing. "
    "2) Collect patient_name and patient_phone (and email/age/gender if offered). "
    "3) Ask whether they want home sample collection or to visit a center. For a "
    "center visit, call find_nearest_centers and let them pick one from the list "
    "as described above, or continue with their previously selected address if "
    "already provided. For home collection, collect a full address. "
    "4) Ask for a preferred date/time. "
    "5) Read back a full summary and get explicit confirmation. "
    "6) Only then call create_booking — once per test/package if the user wants "
    "more than one (e.g. call it twice for two tests). Never claim a booking was made "
    "without actually calling create_booking and getting a successful result back. If "
    "create_booking returns an error about the test/package not being recognised, "
    "apologize, show valid alternatives via search_tests/search_health_packages, "
    "and ask the user to choose one of those instead. "
    "7) PAYMENT — once ALL of the bookings the user wants to pay for right now have "
    "been created, call create_payment_order ONCE with every booking_id together (never "
    "one payment order per booking) so the user pays a single combined total. NEVER "
    "write out a payment link, URL, or markdown link yourself under any circumstances — "
    "the ONLY valid way to show a payment option is the real 'Pay Now' button the system "
    "renders automatically after a successful create_payment_order call; any link or URL "
    "you might type is fake and must never be shown. After calling create_payment_order "
    "successfully, just say in plain text (no links) that a secure payment button has "
    "appeared below for that total amount and ask them to complete it there. Do not ask "
    "them to pay any other way, and do not claim the payment succeeded yourself — the "
    "system confirms that once they finish the checkout. If create_payment_order fails or "
    "you have not called it, tell the user their booking is still confirmed and they can "
    "pay any time from the 'My Bookings' section of their dashboard, where a Pay Now "
    "button is always shown for any unpaid booking — never invent or describe a payment "
    "link for that either. "
    "If the user mentions uploading a prescription, you may also call "
    "check_prescription_quota to tell them how many uploads they have left this "
    "month (default limit is 5/month) before directing them to the upload option."
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


async def _run_tool_loop(
    client,
    db: AsyncSession,
    user: User,
    messages: list[dict],
    *,
    location: tuple[float, float] | None = None,
) -> tuple[list[dict], dict | None]:
    """Resolve backend tool calls in a bounded loop before the final streamed answer.

    Runs non-streaming "router" turns: the model may request 0+ tools per hop.
    Each requested tool is executed against the DB (scoped to ``user`` for
    anything personal) and its JSON result is appended as a ``tool`` message.
    Capped at ``MAX_TOOL_HOPS`` so a confused model can never loop forever.

    Returns the updated messages plus, if a ``create_payment_order`` tool call
    succeeded, its parsed JSON result — the caller emits this as a dedicated
    SSE event so the frontend can render a real Razorpay payment button
    instead of relying on the model to describe it accurately in free text.
    """
    payment_order: dict | None = None
    for _ in range(MAX_TOOL_HOPS):
        response = await client.chat.completions.create(
            model=settings.OPENAI_MODEL,
            messages=messages,
            tools=TOOL_SPECS,
            tool_choice="auto",
            temperature=0.2,
        )
        message = response.choices[0].message
        if not message.tool_calls:
            break

        messages.append(
            {
                "role": "assistant",
                "content": message.content,
                "tool_calls": [
                    {
                        "id": tc.id,
                        "type": "function",
                        "function": {
                            "name": tc.function.name,
                            "arguments": tc.function.arguments,
                        },
                    }
                    for tc in message.tool_calls
                ],
            }
        )
        for tool_call in message.tool_calls:
            try:
                arguments = json.loads(tool_call.function.arguments or "{}")
            except json.JSONDecodeError:
                arguments = {}
            result = await execute_tool(
                tool_call.function.name, arguments, db=db, user=user, location=location
            )
            messages.append({"role": "tool", "tool_call_id": tool_call.id, "content": result})
            if tool_call.function.name == "create_payment_order":
                try:
                    parsed = json.loads(result)
                except json.JSONDecodeError:
                    parsed = None
                if isinstance(parsed, dict) and "error" not in parsed:
                    payment_order = parsed

    return messages, payment_order


async def stream_answer(
    db: AsyncSession,
    user: User,
    question: str,
    conversation_id: uuid.UUID | None = None,
    *,
    lat: float | None = None,
    lng: float | None = None,
) -> AsyncGenerator[str, None]:
    """Yield Server-Sent Events streaming a grounded assistant response."""
    location = (lat, lng) if lat is not None and lng is not None else None
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
            "content": (
                f"{SYSTEM_PROMPT}\n\nCurrent user: {user.name or 'Unknown'} "
                f"({user.email or 'no email on file'}).\n\n"
                f"Context from the user's uploaded documents:\n{context or '(no user documents found)'}"
            ),
        },
        *history,
        {"role": "user", "content": question},
    ]

    client = get_openai_client()

    payment_order: dict | None = None
    try:
        messages, payment_order = await _run_tool_loop(client, db, user, messages, location=location)
    except Exception:  # noqa: BLE001 - tool resolution must never break the chat turn
        logger.exception("Tool resolution failed; answering without tool grounding")

    if payment_order:
        # Structured event the frontend chat widget listens for to render a
        # real Razorpay checkout button — never rely on the model to embed
        # working payment UI in free text.
        yield f"data: {json.dumps({'payment_order': payment_order})}\n\n"

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

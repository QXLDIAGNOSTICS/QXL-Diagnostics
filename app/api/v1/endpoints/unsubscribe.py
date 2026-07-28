"""Public unsubscribe endpoints — deliberately unauthenticated.

Anyone with a booking's one-click email link (``?token=...``), or anyone who
just wants to stop receiving promotional/reminder SMS or email from us, can
opt out here without needing an account. See ``app.services.unsubscribe_service``
for what this does and does not suppress.
"""
from __future__ import annotations

from fastapi import APIRouter

from app.api.deps import DbSession
from app.schemas.unsubscribe import UnsubscribeLookup, UnsubscribeRequest, UnsubscribeResult
from app.services import unsubscribe_service

router = APIRouter(prefix="/unsubscribe", tags=["unsubscribe"])


@router.get("/lookup", response_model=UnsubscribeLookup)
async def lookup(token: str, db: DbSession) -> UnsubscribeLookup:
    result = await unsubscribe_service.lookup(db, token=token)
    return UnsubscribeLookup(**result)


@router.post("", response_model=UnsubscribeResult)
async def unsubscribe(body: UnsubscribeRequest, db: DbSession) -> UnsubscribeResult:
    result = await unsubscribe_service.unsubscribe(
        db, token=body.token, email=body.email, phone=body.phone, channel=body.channel
    )
    return UnsubscribeResult(**result)


@router.post("/resubscribe", response_model=UnsubscribeResult)
async def resubscribe(body: UnsubscribeRequest, db: DbSession) -> UnsubscribeResult:
    result = await unsubscribe_service.resubscribe(
        db, token=body.token, email=body.email, phone=body.phone, channel=body.channel
    )
    return UnsubscribeResult(**result)

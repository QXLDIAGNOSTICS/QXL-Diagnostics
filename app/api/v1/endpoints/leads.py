"""Lead capture endpoints: collaboration/franchise inquiries and contact form."""
from __future__ import annotations

import uuid

from fastapi import APIRouter, Depends

from app.api.deps import DbSession, require_role
from app.models.user import User
from app.schemas.lead import (
    CollaborationLeadCreate,
    CollaborationLeadList,
    CollaborationLeadRead,
    ContactInquiryCreate,
    ContactInquiryList,
    ContactInquiryRead,
)
from app.services import lead_service

router = APIRouter(tags=["leads"])


# ── Collaboration / Franchise ────────────────────────────────────────────────

@router.post("/leads/collaboration", response_model=CollaborationLeadRead, status_code=201)
async def submit_collaboration_lead(body: CollaborationLeadCreate, db: DbSession) -> CollaborationLeadRead:
    lead = await lead_service.submit_collaboration_lead(db, body.model_dump())
    return CollaborationLeadRead.model_validate(lead)


@router.get("/leads/collaboration", response_model=CollaborationLeadList)
async def list_collaboration_leads(
    db: DbSession,
    unread_only: bool = False,
    limit: int = 100,
    offset: int = 0,
    user: User = Depends(require_role("admin")),
) -> CollaborationLeadList:
    items, count = await lead_service.list_collaboration_leads(db, unread_only, limit, offset)
    return CollaborationLeadList(items=[CollaborationLeadRead.model_validate(i) for i in items], count=count)


@router.patch("/leads/collaboration/{lead_id}/read", response_model=CollaborationLeadRead)
async def mark_collaboration_lead_read(
    lead_id: uuid.UUID, db: DbSession, user: User = Depends(require_role("admin"))
) -> CollaborationLeadRead:
    lead = await lead_service.mark_collaboration_lead_read(db, lead_id)
    return CollaborationLeadRead.model_validate(lead)


# ── Contact ───────────────────────────────────────────────────────────────────

@router.post("/leads/contact", response_model=ContactInquiryRead, status_code=201)
async def submit_contact_inquiry(body: ContactInquiryCreate, db: DbSession) -> ContactInquiryRead:
    inquiry = await lead_service.submit_contact_inquiry(db, body.model_dump())
    return ContactInquiryRead.model_validate(inquiry)


@router.get("/leads/contact", response_model=ContactInquiryList)
async def list_contact_inquiries(
    db: DbSession,
    unread_only: bool = False,
    limit: int = 100,
    offset: int = 0,
    user: User = Depends(require_role("admin")),
) -> ContactInquiryList:
    items, count = await lead_service.list_contact_inquiries(db, unread_only, limit, offset)
    return ContactInquiryList(items=[ContactInquiryRead.model_validate(i) for i in items], count=count)

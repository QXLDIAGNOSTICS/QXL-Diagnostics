"""Lead service: collaboration inquiries and contact form submissions."""
from __future__ import annotations

import uuid

from sqlalchemy.ext.asyncio import AsyncSession

from app.models.lead import CollaborationLead, ContactInquiry
from app.repositories.lead_repository import CollaborationLeadRepository, ContactInquiryRepository


async def submit_collaboration_lead(db: AsyncSession, data: dict) -> CollaborationLead:
    lead = await CollaborationLeadRepository(db).create(**data)
    await db.commit()
    await db.refresh(lead)
    return lead


async def list_collaboration_leads(
    db: AsyncSession, unread_only: bool, limit: int, offset: int
) -> tuple[list[CollaborationLead], int]:
    return await CollaborationLeadRepository(db).list_all(unread_only=unread_only, limit=limit, offset=offset)


async def mark_collaboration_lead_read(db: AsyncSession, lead_id: uuid.UUID) -> CollaborationLead | None:
    lead = await CollaborationLeadRepository(db).mark_read(lead_id)
    await db.commit()
    return lead


async def submit_contact_inquiry(db: AsyncSession, data: dict) -> ContactInquiry:
    inquiry = await ContactInquiryRepository(db).create(**data)
    await db.commit()
    await db.refresh(inquiry)
    return inquiry


async def list_contact_inquiries(
    db: AsyncSession, unread_only: bool, limit: int, offset: int
) -> tuple[list[ContactInquiry], int]:
    return await ContactInquiryRepository(db).list_all(unread_only=unread_only, limit=limit, offset=offset)


async def mark_contact_inquiry_read(db: AsyncSession, inquiry_id: uuid.UUID) -> ContactInquiry | None:
    inquiry = await ContactInquiryRepository(db).mark_read(inquiry_id)
    await db.commit()
    return inquiry

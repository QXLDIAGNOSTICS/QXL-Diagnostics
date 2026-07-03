"""Repository for lead capture models."""
from __future__ import annotations

import uuid

from sqlalchemy import func, select
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.lead import CollaborationLead, ContactInquiry


class CollaborationLeadRepository:
    def __init__(self, db: AsyncSession) -> None:
        self.db = db

    async def create(self, **kwargs) -> CollaborationLead:  # noqa: ANN003
        lead = CollaborationLead(**kwargs)
        self.db.add(lead)
        await self.db.flush()
        return lead

    async def list_all(
        self, unread_only: bool = False, limit: int = 100, offset: int = 0
    ) -> tuple[list[CollaborationLead], int]:
        base = select(CollaborationLead)
        count_q = select(func.count()).select_from(CollaborationLead)
        if unread_only:
            base = base.where(CollaborationLead.is_read == False)  # noqa: E712
            count_q = count_q.where(CollaborationLead.is_read == False)  # noqa: E712
        count = (await self.db.execute(count_q)).scalar_one()
        rows = list(
            (
                await self.db.execute(
                    base.order_by(CollaborationLead.created_at.desc()).limit(limit).offset(offset)
                )
            ).scalars().all()
        )
        return rows, count

    async def mark_read(self, lead_id: uuid.UUID) -> CollaborationLead | None:
        lead = await self.db.get(CollaborationLead, lead_id)
        if lead:
            lead.is_read = True
            await self.db.flush()
        return lead


class ContactInquiryRepository:
    def __init__(self, db: AsyncSession) -> None:
        self.db = db

    async def create(self, **kwargs) -> ContactInquiry:  # noqa: ANN003
        inquiry = ContactInquiry(**kwargs)
        self.db.add(inquiry)
        await self.db.flush()
        return inquiry

    async def list_all(
        self, unread_only: bool = False, limit: int = 100, offset: int = 0
    ) -> tuple[list[ContactInquiry], int]:
        base = select(ContactInquiry)
        count_q = select(func.count()).select_from(ContactInquiry)
        if unread_only:
            base = base.where(ContactInquiry.is_read == False)  # noqa: E712
            count_q = count_q.where(ContactInquiry.is_read == False)  # noqa: E712
        count = (await self.db.execute(count_q)).scalar_one()
        rows = list(
            (
                await self.db.execute(
                    base.order_by(ContactInquiry.created_at.desc()).limit(limit).offset(offset)
                )
            ).scalars().all()
        )
        return rows, count

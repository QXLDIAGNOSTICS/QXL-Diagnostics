"""Repository for Prescriptions."""
from __future__ import annotations

import uuid

from sqlalchemy import func, select
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.prescription import Prescription


class PrescriptionRepository:
    def __init__(self, db: AsyncSession) -> None:
        self.db = db

    async def create(self, **kwargs) -> Prescription:  # noqa: ANN003
        record = Prescription(**kwargs)
        self.db.add(record)
        await self.db.flush()
        return record

    async def get_by_id(self, prescription_id: uuid.UUID) -> Prescription | None:
        return await self.db.get(Prescription, prescription_id)

    async def list_for_user(
        self, user_id: uuid.UUID, limit: int = 50, offset: int = 0
    ) -> tuple[list[Prescription], int]:
        count = (
            await self.db.execute(
                select(func.count()).select_from(Prescription).where(Prescription.user_id == user_id)
            )
        ).scalar_one()
        rows = list(
            (
                await self.db.execute(
                    select(Prescription)
                    .where(Prescription.user_id == user_id)
                    .order_by(Prescription.created_at.desc())
                    .limit(limit)
                    .offset(offset)
                )
            ).scalars().all()
        )
        return rows, count

    async def update_analysis(
        self,
        prescription: Prescription,
        *,
        status: str,
        analysis_json: str | None = None,
        error_message: str | None = None,
    ) -> Prescription:
        prescription.analysis_status = status
        if analysis_json is not None:
            prescription.analysis_json = analysis_json
        if error_message is not None:
            prescription.error_message = error_message
        await self.db.flush()
        return prescription

    async def list_all(
        self, limit: int = 100, offset: int = 0
    ) -> tuple[list[Prescription], int]:
        count = (await self.db.execute(select(func.count()).select_from(Prescription))).scalar_one()
        rows = list(
            (
                await self.db.execute(
                    select(Prescription).order_by(Prescription.created_at.desc()).limit(limit).offset(offset)
                )
            ).scalars().all()
        )
        return rows, count

"""File repository — metadata CRUD scoped to an owner."""
from __future__ import annotations

import uuid

from sqlalchemy import func, select
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.file import FileRecord


class FileRepository:
    def __init__(self, db: AsyncSession) -> None:
        self.db = db

    async def create(
        self,
        *,
        owner_id: uuid.UUID | None,
        bucket: str,
        object_path: str,
        filename: str,
        content_type: str,
        size: int,
    ) -> FileRecord:
        record = FileRecord(
            owner_id=owner_id,
            bucket=bucket,
            object_path=object_path,
            filename=filename,
            content_type=content_type,
            size=size,
        )
        self.db.add(record)
        await self.db.flush()
        return record

    async def get_global(self, file_id: uuid.UUID) -> FileRecord | None:
        result = await self.db.execute(
            select(FileRecord).where(FileRecord.id == file_id, FileRecord.owner_id.is_(None))
        )
        return result.scalar_one_or_none()

    async def list_global(self, *, limit: int = 100, offset: int = 0) -> tuple[list[FileRecord], int]:
        base = select(FileRecord).where(FileRecord.owner_id.is_(None))
        items = (
            (
                await self.db.execute(
                    base.order_by(FileRecord.created_at.desc()).limit(limit).offset(offset)
                )
            )
            .scalars()
            .all()
        )
        count = await self.db.scalar(
            select(func.count()).select_from(FileRecord).where(FileRecord.owner_id.is_(None))
        )
        return list(items), int(count or 0)

    async def get_owned(self, file_id: uuid.UUID, owner_id: uuid.UUID) -> FileRecord | None:
        result = await self.db.execute(
            select(FileRecord).where(
                FileRecord.id == file_id, FileRecord.owner_id == owner_id
            )
        )
        return result.scalar_one_or_none()

    async def list_for_owner(
        self, owner_id: uuid.UUID, *, limit: int = 50, offset: int = 0
    ) -> tuple[list[FileRecord], int]:
        base = select(FileRecord).where(FileRecord.owner_id == owner_id)
        items = (
            (
                await self.db.execute(
                    base.order_by(FileRecord.created_at.desc()).limit(limit).offset(offset)
                )
            )
            .scalars()
            .all()
        )
        count = await self.db.scalar(
            select(func.count()).select_from(FileRecord).where(FileRecord.owner_id == owner_id)
        )
        return list(items), int(count or 0)

    async def delete(self, record: FileRecord) -> None:
        await self.db.delete(record)
        await self.db.flush()

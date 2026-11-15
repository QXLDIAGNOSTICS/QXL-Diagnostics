"""LIS (ITDOSE) integration boundary.

No ITDOSE endpoint, payload or auth scheme is assumed here. ``ManualLisAdapter``
is used until QXL provides the vendor-approved interface specification; then a
concrete adapter implements the same three methods and is selected by
``LIS_ADAPTER``. Failed calls go through ``lis_sync_tasks`` (retry with
backoff, then ``dead`` for the ops dashboard).
"""

from __future__ import annotations

from datetime import timedelta
from typing import Protocol

from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.collect import LabReport, LisSyncTask
from app.services.collect.common import now_utc

MAX_ATTEMPTS = 8


class LisAdapter(Protocol):
    name: str

    async def register_order(self, booking_id: str, payload: dict) -> str | None:
        """Register an order; returns the LIS accession number if issued."""

    async def fetch_status(self, accession: str) -> dict | None:
        """Current processing / authorization state for an accession."""

    async def verify_release(self, report: LabReport) -> bool | None:
        """True if the LIS confirms the report version is authorized,
        False if it says not, None when the adapter can't check (manual)."""


class ManualLisAdapter:
    """Lab staff transcribe accession and authorization from ITDOSE."""

    name = "manual"

    async def register_order(self, booking_id: str, payload: dict) -> str | None:
        return None

    async def fetch_status(self, accession: str) -> dict | None:
        return None

    async def verify_release(self, report: LabReport) -> bool | None:
        return None


def lis_adapter() -> LisAdapter:
    return ManualLisAdapter()


async def enqueue(
    db: AsyncSession, kind: str, entity_id: str, payload: dict | None = None
) -> LisSyncTask:
    task = LisSyncTask(
        kind=kind, entity_id=entity_id, payload=payload, status="pending", next_attempt_at=now_utc()
    )
    db.add(task)
    return task


async def process_due(db: AsyncSession) -> int:
    """Runs due tasks through the adapter. With the manual adapter tasks are
    marked ``manual`` so nothing silently piles up."""
    adapter = lis_adapter()
    due = (
        (
            await db.execute(
                select(LisSyncTask)
                .where(
                    LisSyncTask.status.in_(("pending", "failed")),
                    LisSyncTask.next_attempt_at <= now_utc(),
                )
                .limit(50)
            )
        )
        .scalars()
        .all()
    )
    for task in due:
        if adapter.name == "manual":
            task.status = "manual"
            continue
        task.attempts += 1
        try:
            if task.kind == "register_order":
                await adapter.register_order(task.entity_id, task.payload or {})
            elif task.kind == "fetch_status":
                await adapter.fetch_status(task.entity_id)
            task.status = "synced"
            task.last_error = None
        except Exception as exc:  # noqa: BLE001
            task.last_error = str(exc)[:500]
            if task.attempts >= MAX_ATTEMPTS:
                task.status = "dead"
            else:
                task.status = "failed"
                task.next_attempt_at = now_utc() + timedelta(minutes=2**task.attempts)
    await db.commit()
    return len(due)


async def list_tasks(db: AsyncSession, status: str | None) -> list[LisSyncTask]:
    query = select(LisSyncTask).order_by(LisSyncTask.created_at.desc()).limit(200)
    if status:
        query = query.where(LisSyncTask.status == status)
    return list((await db.execute(query)).scalars())


async def retry(db: AsyncSession, task_id) -> LisSyncTask | None:  # noqa: ANN001
    task = await db.get(LisSyncTask, task_id)
    if task is None:
        return None
    task.status = "pending"
    task.next_attempt_at = now_utc()
    await db.commit()
    return task

"""Repository for NotificationRule (admin-configured reminder/marketing automation)."""
from __future__ import annotations

import uuid
from datetime import date, datetime

from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.notification_rule import NotificationRule


class NotificationRuleRepository:
    def __init__(self, db: AsyncSession) -> None:
        self.db = db

    async def create(self, **kwargs) -> NotificationRule:  # noqa: ANN003
        rule = NotificationRule(**kwargs)
        self.db.add(rule)
        await self.db.flush()
        return rule

    async def get_by_id(self, rule_id: uuid.UUID) -> NotificationRule | None:
        return await self.db.get(NotificationRule, rule_id)

    async def list_all(self) -> list[NotificationRule]:
        rows = (
            await self.db.execute(select(NotificationRule).order_by(NotificationRule.created_at.desc()))
        ).scalars().all()
        return list(rows)

    async def list_active_due(self, *, today: date) -> list[NotificationRule]:
        """Active rules whose start/end date window includes ``today``."""
        stmt = select(NotificationRule).where(NotificationRule.is_active.is_(True))
        rows = (await self.db.execute(stmt)).scalars().all()
        return [
            r
            for r in rows
            if (r.start_date is None or r.start_date <= today)
            and (r.end_date is None or r.end_date >= today)
        ]

    async def update(self, rule: NotificationRule, **kwargs) -> NotificationRule:  # noqa: ANN003
        for key, value in kwargs.items():
            setattr(rule, key, value)
        await self.db.flush()
        return rule

    async def touch_last_run(self, rule: NotificationRule, *, when: datetime) -> None:
        rule.last_run_at = when
        await self.db.flush()

    async def delete(self, rule: NotificationRule) -> None:
        await self.db.delete(rule)
        await self.db.flush()

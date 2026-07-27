"""Admin-configurable automation rules: recurring payment reminders + marketing.

Staff can view the configured automations (so they understand what's being
sent automatically from the Appointments page); only administrators can
create, edit, or delete rules.
"""
from __future__ import annotations

import uuid

from fastapi import APIRouter, Depends

from app.api.deps import DbSession, require_role
from app.models.user import User
from app.schemas.notification_rule import (
    NotificationRuleCreate,
    NotificationRuleList,
    NotificationRuleRead,
    NotificationRuleUpdate,
)
from app.services import notification_rule_service

router = APIRouter(prefix="/notification-rules", tags=["notification-rules"])


@router.get("", response_model=NotificationRuleList)
async def list_rules(db: DbSession, user: User = Depends(require_role("staff"))) -> NotificationRuleList:
    _ = user
    rules = await notification_rule_service.list_rules(db)
    return NotificationRuleList(items=[NotificationRuleRead.model_validate(r) for r in rules], count=len(rules))


@router.post("", response_model=NotificationRuleRead, status_code=201)
async def create_rule(
    body: NotificationRuleCreate, db: DbSession, user: User = Depends(require_role("admin"))
) -> NotificationRuleRead:
    rule = await notification_rule_service.create_rule(
        db, body.model_dump(), created_by=user.name or user.email or user.phone
    )
    return NotificationRuleRead.model_validate(rule)


@router.patch("/{rule_id}", response_model=NotificationRuleRead)
async def update_rule(
    rule_id: uuid.UUID,
    body: NotificationRuleUpdate,
    db: DbSession,
    user: User = Depends(require_role("admin")),
) -> NotificationRuleRead:
    _ = user
    rule = await notification_rule_service.update_rule(db, rule_id, body.model_dump(exclude_unset=True))
    return NotificationRuleRead.model_validate(rule)


@router.delete("/{rule_id}", status_code=204)
async def delete_rule(
    rule_id: uuid.UUID, db: DbSession, user: User = Depends(require_role("admin"))
) -> None:
    _ = user
    await notification_rule_service.delete_rule(db, rule_id)

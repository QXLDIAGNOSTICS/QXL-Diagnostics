"""Admin-configurable automation rules: recurring payment reminders + marketing.

Any staff can view the configured automations (so they understand what's
being sent automatically from the Appointments page); creating/editing/
deleting rules requires the ``automation.manage`` feature permission, which
a super-admin can grant to any role (built-in or custom) from the Roles
screen — not just admin-tier accounts.
"""
from __future__ import annotations

import uuid

from fastapi import APIRouter, Depends

from app.api.deps import DbSession, require_permission, require_role
from app.models.notification_rule import TEMPLATE_CHOICES_BY_RULE_TYPE
from app.models.user import User
from app.schemas.notification_rule import (
    MessageTemplateOption,
    NotificationRuleCreate,
    NotificationRuleList,
    NotificationRuleRead,
    NotificationRuleUpdate,
)
from app.services import notification_rule_service
from app.services.notification_templates import preview_default

router = APIRouter(prefix="/notification-rules", tags=["notification-rules"])

_TEMPLATE_LABELS: dict[str, str] = {
    "payment_reminder": "Payment pending reminder",
    "reminder": "Appointment reminder",
    "confirmation": "Appointment confirmation (resend)",
    "marketing": "General offers & packages",
    "offer": "Special offer (punchier)",
}


@router.get("/message-templates", response_model=dict[str, list[MessageTemplateOption]])
async def message_templates(user: User = Depends(require_role("staff"))) -> dict[str, list[MessageTemplateOption]]:
    """Selectable canned-copy styles per automation type, with a rendered
    preview (using sample data) — powers the "Template" picker so staff can
    pick a starting point instead of writing an email from a blank box."""
    _ = user
    out: dict[str, list[MessageTemplateOption]] = {}
    for rule_type, keys in TEMPLATE_CHOICES_BY_RULE_TYPE.items():
        options = []
        for key in keys:
            subject, message = preview_default(key)
            options.append(
                MessageTemplateOption(
                    key=key,
                    label=_TEMPLATE_LABELS.get(key, key.replace("_", " ").title()),
                    subject_preview=subject,
                    message_preview=message,
                )
            )
        out[rule_type] = options
    return out


@router.get("", response_model=NotificationRuleList)
async def list_rules(db: DbSession, user: User = Depends(require_role("staff"))) -> NotificationRuleList:
    _ = user
    rules = await notification_rule_service.list_rules(db)
    return NotificationRuleList(items=[NotificationRuleRead.model_validate(r) for r in rules], count=len(rules))


@router.post("", response_model=NotificationRuleRead, status_code=201)
async def create_rule(
    body: NotificationRuleCreate, db: DbSession, user: User = Depends(require_permission("automation.manage"))
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
    user: User = Depends(require_permission("automation.manage")),
) -> NotificationRuleRead:
    _ = user
    rule = await notification_rule_service.update_rule(db, rule_id, body.model_dump(exclude_unset=True))
    return NotificationRuleRead.model_validate(rule)


@router.delete("/{rule_id}", status_code=204)
async def delete_rule(
    rule_id: uuid.UUID, db: DbSession, user: User = Depends(require_permission("automation.manage"))
) -> None:
    _ = user
    await notification_rule_service.delete_rule(db, rule_id)

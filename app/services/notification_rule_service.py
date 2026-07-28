"""Admin-configurable automation: recurring payment reminders + marketing blasts.

Two rule types (see ``app.models.notification_rule.RULE_TYPES``):

- ``payment_reminder``: for every booking with money outstanding, resend a
  reminder every ``interval_days`` while the rule is active and the booking
  stays unpaid. Per-booking cadence is tracked by looking at the most recent
  ``payment_reminder`` notification already logged for that booking.
- ``marketing``: broadcasts once every ``interval_days`` to every patient
  with a booking on file (one message per distinct phone number, using their
  most recent booking as the contact record). Cadence is tracked on the rule
  itself via ``last_run_at`` since it's a single audience-wide blast, not a
  per-recipient schedule.

Called from the same in-process scheduler tick as
``booking_notification_service.run_due_notifications`` (see ``app.main``).
"""
from __future__ import annotations

import asyncio
import uuid
from datetime import datetime, timedelta, timezone
from zoneinfo import ZoneInfo

from sqlalchemy.ext.asyncio import AsyncSession

from app.core.exceptions import NotFoundError
from app.core.logging import get_logger
from app.models.notification_rule import DEFAULT_TEMPLATE_BY_RULE_TYPE, NotificationRule
from app.repositories.booking_repository import BookingRepository
from app.repositories.notification_repository import NotificationRepository
from app.repositories.notification_rule_repository import NotificationRuleRepository
from app.services.booking_notification_service import queue_notification

logger = get_logger(__name__)

# Don't remind about a booking created less than this long ago — give the
# patient (and any manual staff follow-up) a chance before automation kicks in.
_PAYMENT_REMINDER_GRACE_HOURS = 3


def _template_for(rule: NotificationRule) -> str:
    """Which notification_type's canned copy to render for this rule's
    per-recipient messages (see NotificationRule.template docstring)."""
    return rule.template or DEFAULT_TEMPLATE_BY_RULE_TYPE.get(rule.rule_type, rule.rule_type)

_IST = ZoneInfo("Asia/Kolkata")

# In-process lock guarding against two overlapping ``run_due_rules`` calls
# double-sending — e.g. a future "run this rule now" admin action racing the
# 60s background scheduler tick in the same worker. Each per-booking/per-rule
# send is "read latest reminder, then insert" with no DB-level uniqueness
# constraint, so an overlapping run can slip in between the read and the
# insert. Deliberately a plain ``asyncio.Lock`` (not a Postgres advisory
# lock): this backend runs as a single process/worker, and the DB connection
# goes through Supabase's *transaction* pooler (port 6543), where
# session-scoped advisory locks are unreliable — different statements in the
# same logical session can land on different physical backends between
# transactions.
_run_due_rules_lock = asyncio.Lock()


async def list_rules(db: AsyncSession) -> list[NotificationRule]:
    return await NotificationRuleRepository(db).list_all()


async def create_rule(db: AsyncSession, data: dict, *, created_by: str | None) -> NotificationRule:
    rule = await NotificationRuleRepository(db).create(**data, created_by=created_by)
    await db.commit()
    await db.refresh(rule)
    return rule


async def update_rule(db: AsyncSession, rule_id: uuid.UUID, data: dict) -> NotificationRule:
    repo = NotificationRuleRepository(db)
    rule = await repo.get_by_id(rule_id)
    if rule is None:
        raise NotFoundError("Automation rule not found")
    await repo.update(rule, **data)
    await db.commit()
    await db.refresh(rule)
    return rule


async def delete_rule(db: AsyncSession, rule_id: uuid.UUID) -> None:
    repo = NotificationRuleRepository(db)
    rule = await repo.get_by_id(rule_id)
    if rule is None:
        raise NotFoundError("Automation rule not found")
    await repo.delete(rule)
    await db.commit()


async def _run_payment_reminder_rule(db: AsyncSession, rule: NotificationRule) -> int:
    booking_repo = BookingRepository(db)
    notif_repo = NotificationRepository(db)
    now = datetime.now(timezone.utc)
    cutoff = now - timedelta(hours=_PAYMENT_REMINDER_GRACE_HOURS)

    candidates = await booking_repo.list_unpaid_older_than(cutoff)
    sent = 0
    for booking in candidates:
        last = await notif_repo.get_latest_for_type(booking.id, "payment_reminder")
        if last is not None:
            last_at = last.created_at
            if last_at.tzinfo is None:
                last_at = last_at.replace(tzinfo=timezone.utc)
            if now - last_at < timedelta(days=rule.interval_days):
                continue
        await queue_notification(
            db,
            booking=booking,
            channel=rule.channel,
            notification_type=_template_for(rule),
            subject=rule.subject,
            message=rule.message,
            created_by=f"automation:{rule.name}",
        )
        sent += 1
    return sent


async def _run_booking_reminder_rule(db: AsyncSession, rule: NotificationRule) -> int:
    """Resends appointment details to patients with an upcoming, still-active
    booking — e.g. "see you tomorrow for your CBC test" — repeating every
    ``interval_days`` for as long as the visit date hasn't passed."""
    booking_repo = BookingRepository(db)
    notif_repo = NotificationRepository(db)
    now = datetime.now(timezone.utc)
    today_ist = datetime.now(_IST).date().isoformat()

    candidates = await booking_repo.list_upcoming_active(from_date=today_ist)
    template = _template_for(rule)
    sent = 0
    for booking in candidates:
        last = await notif_repo.get_latest_for_type(booking.id, template)
        if last is not None:
            last_at = last.created_at
            if last_at.tzinfo is None:
                last_at = last_at.replace(tzinfo=timezone.utc)
            if now - last_at < timedelta(days=rule.interval_days):
                continue
        await queue_notification(
            db,
            booking=booking,
            channel=rule.channel,
            notification_type=template,
            subject=rule.subject,
            message=rule.message,
            created_by=f"automation:{rule.name}",
        )
        sent += 1
    return sent


async def _run_marketing_rule(db: AsyncSession, rule: NotificationRule) -> int:
    now = datetime.now(timezone.utc)
    if rule.last_run_at is not None:
        last_run = rule.last_run_at
        if last_run.tzinfo is None:
            last_run = last_run.replace(tzinfo=timezone.utc)
        if now - last_run < timedelta(days=rule.interval_days):
            return 0

    booking_repo = BookingRepository(db)
    audience = await booking_repo.list_latest_booking_per_patient()
    sent = 0
    for booking in audience:
        await queue_notification(
            db,
            booking=booking,
            channel=rule.channel,
            notification_type=_template_for(rule),
            subject=rule.subject,
            message=rule.message,
            created_by=f"automation:{rule.name}",
        )
        sent += 1

    await NotificationRuleRepository(db).touch_last_run(rule, when=now)
    await db.commit()
    return sent


async def run_due_rules(db: AsyncSession) -> int:
    """Evaluates every active, in-window rule. Returns total messages queued.

    Guarded by an in-process lock so an overlapping call (e.g. a future
    staff-triggered "run now") can't race the background scheduler tick and
    double-send. If a run is already in progress, this is a no-op.
    """
    if _run_due_rules_lock.locked():
        logger.info("run_due_rules: another run is already in progress, skipping this tick")
        return 0
    async with _run_due_rules_lock:
        repo = NotificationRuleRepository(db)
        today = datetime.now(_IST).date()
        rules = await repo.list_active_due(today=today)
        total = 0
        for rule in rules:
            try:
                if rule.rule_type == "payment_reminder":
                    total += await _run_payment_reminder_rule(db, rule)
                elif rule.rule_type == "booking_reminder":
                    total += await _run_booking_reminder_rule(db, rule)
                elif rule.rule_type == "marketing":
                    total += await _run_marketing_rule(db, rule)
            except Exception:  # noqa: BLE001
                logger.exception("Automation rule '%s' (%s) failed this tick", rule.name, rule.id)
        return total

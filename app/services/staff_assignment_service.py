"""Auto-assigns each new booking to exactly one appointments staff member.

Goals (per product requirement):
- Only ONE staff member is alerted about a given booking — not the whole
  team — so people don't duplicate effort chasing the same appointment.
- Workload stays roughly even across staff over time: each new booking goes
  to whoever currently has the fewest *open* (not yet completed/cancelled/
  no-show) bookings assigned to them, with ties broken at random so the same
  person isn't always picked first.

"Who counts as appointments staff" is derived from the live, super-admin
editable ``custom_roles`` permission set (the same ``appointments.manage``
permission that already gates the booking-management UI/API) rather than a
hardcoded role list — so it automatically follows whatever the Roles screen
is configured to grant, including newly created custom roles (e.g.
"front_staff_appointment").

Admins / super-admins are deliberately excluded from auto-assignment even
when their role also grants ``appointments.manage``: appointment work goes
to front-desk staff (staff-tier roles), while payment alerts stay available
to admins via the notification feed.
"""
from __future__ import annotations

import asyncio
import random
import uuid

from sqlalchemy import func, select
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.config import settings
from app.core.logging import get_logger
from app.core.permissions import PERMISSION_APPOINTMENTS_MANAGE
from app.core.roles import ADMIN_ROLES
from app.models.booking import Booking
from app.models.role import CustomRole
from app.models.user import User
from app.services import notification_service
from app.services.email_html import render_html_email

logger = get_logger(__name__)

# See booking_notification_service._pending_dispatches for why this exists —
# same "don't let a slow SMTP call block the HTTP response" issue applies to
# the staff-assignment email.
_pending_emails: set[asyncio.Task] = set()


def _fire_and_forget(coro) -> None:  # noqa: ANN001
    task = asyncio.create_task(coro)
    _pending_emails.add(task)
    task.add_done_callback(_pending_emails.discard)

_OPEN_STATUSES_EXCLUDED = ("completed", "cancelled", "no_show")


async def _eligible_role_keys(db: AsyncSession) -> set[str]:
    """Staff-tier roles only that grant ``appointments.manage``.

    Built-in admin/super_admin keys and any custom role with ``tier ==
    "admin"`` are excluded so appointment ownership stays with front-desk
    roles like ``front_staff_appointment``.
    """
    rows = (await db.execute(select(CustomRole.key, CustomRole.tier, CustomRole.permissions))).all()
    return {
        key
        for key, tier, perms in rows
        if (
            key not in ADMIN_ROLES
            and (tier or "staff") == "staff"
            and isinstance(perms, list)
            and PERMISSION_APPOINTMENTS_MANAGE in perms
        )
    }


async def list_eligible_assignees(db: AsyncSession) -> list[User]:
    """Every staff-tier account whose role currently grants ``appointments.manage``."""
    role_keys = await _eligible_role_keys(db)
    if not role_keys:
        return []
    rows = (await db.execute(select(User).where(User.role.in_(role_keys)))).scalars().all()
    return list(rows)


async def _open_load_counts(db: AsyncSession, user_ids: list[uuid.UUID]) -> dict[uuid.UUID, int]:
    if not user_ids:
        return {}
    rows = (
        await db.execute(
            select(Booking.assigned_to_id, func.count())
            .where(
                Booking.assigned_to_id.in_(user_ids),
                Booking.status.notin_(_OPEN_STATUSES_EXCLUDED),
            )
            .group_by(Booking.assigned_to_id)
        )
    ).all()
    return {uid: count for uid, count in rows}


async def pick_assignee(db: AsyncSession) -> User | None:
    """Picks the eligible staff member with the fewest open bookings right now."""
    candidates = await list_eligible_assignees(db)
    if not candidates:
        return None
    counts = await _open_load_counts(db, [u.id for u in candidates])
    min_count = min(counts.get(u.id, 0) for u in candidates)
    least_loaded = [u for u in candidates if counts.get(u.id, 0) == min_count]
    return random.choice(least_loaded)


def _assignment_email(assignee_name: str | None, booking: Booking) -> tuple[str, str]:
    first = (assignee_name or "there").split(" ")[0]
    item = booking.test_name or "a test/package"
    when = (
        f"{booking.preferred_date} at {booking.preferred_time}"
        if booking.preferred_date and booking.preferred_time
        else (booking.preferred_date or "no preferred time given")
    )
    subject = f"New appointment assigned to you — {booking.patient_name}"
    body = (
        f"Hi {first},\n\n"
        f"A new appointment has just been assigned to you.\n\n"
        f"Patient: {booking.patient_name}\n"
        f"Phone: {booking.patient_phone}\n"
        f"Test/Package: {item}\n"
        f"Preferred slot: {when}\n"
        f"Collection: {booking.collection_type}\n\n"
        f"Please follow up and update its status from the appointments dashboard."
    )
    return subject, body


async def assign_booking(db: AsyncSession, booking: Booking) -> User | None:
    """Assigns ``booking`` to the least-loaded eligible staff member and
    emails just that person. Best-effort — never raises."""
    try:
        assignee = await pick_assignee(db)
        if assignee is None:
            logger.info("No appointments staff configured — booking %s left unassigned", booking.id)
            return None

        booking.assigned_to_id = assignee.id
        await db.flush()
        await db.commit()
        await db.refresh(booking)

        if assignee.email:
            subject, body = _assignment_email(assignee.name, booking)
            html = render_html_email(
                subject,
                body,
                cta_label="Open appointments dashboard",
                cta_url=f"{settings.ADMIN_BASE_URL.rstrip('/')}/appointments",
            )
            # Fire-and-forget: the assignment itself (above) is already
            # committed, so a slow/hanging SMTP call here must never delay
            # the booking API's response back to the patient.
            _fire_and_forget(notification_service.send_email(assignee.email, subject, body, html_body=html))
        return assignee
    except Exception:  # noqa: BLE001
        logger.exception("Failed to auto-assign booking=%s", booking.id)
        return None

"""Field team accounts: administrators create collector/courier logins from
the person's details, hand over a one-time temporary password, reset it, or
disable the account. The person sets their own password at first sign-in."""

from __future__ import annotations

import uuid
from datetime import UTC, date, datetime

from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.exceptions import NotFoundError, ValidationError
from app.core.roles import FIELD_ROLES
from app.core.security import normalize_phone_number
from app.models.collect import CollectionJob, CollectorProfile, HomeVisit
from app.models.user import User
from app.repositories.user_repository import UserRepository
from app.services import account_service
from app.services.collect import dispatch
from app.services.collect.common import record_event
from app.services.collect.visits import ConflictError

MID_VISIT = ("en_route", "arrived")
OPEN = ("assigned", "acknowledged")


async def _field_user(db: AsyncSession, user_id: uuid.UUID) -> User:
    user = await db.get(User, user_id)
    if user is None or user.role not in FIELD_ROLES:
        raise NotFoundError("Field staff member not found")
    return user


async def create_member(db: AsyncSession, data: dict, actor: User) -> tuple[User, str]:
    """Creates the login account and the field profile together. Returns the
    user and the temporary password (shown once, never stored)."""
    role = data["role"]
    if role not in FIELD_ROLES:
        raise ValidationError("Role must be collector or courier")
    name = (data.get("name") or "").strip()
    if len(name) < 2:
        raise ValidationError("Enter the person's full name")
    try:
        phone = normalize_phone_number(data["phone"])
    except ValueError as exc:
        raise ValidationError("Enter a valid mobile number") from exc
    email = (data.get("email") or "").strip().lower()
    if not email or "@" not in email:
        raise ValidationError(
            "An email address is required — the second password-reset code goes there"
        )
    repo = UserRepository(db)
    if await repo.get_by_phone(phone):
        raise ValidationError("An account with this mobile number already exists")
    if await repo.get_by_email(email):
        raise ValidationError("An account with this email already exists")
    code = (data.get("employee_code") or "").strip().upper()
    if not code:
        raise ValidationError("Employee code is required")
    clash = (
        await db.execute(select(CollectorProfile).where(CollectorProfile.employee_code == code))
    ).scalar_one_or_none()
    if clash is not None:
        raise ValidationError("That employee code is already in use")

    user = User(
        phone=phone,
        email=email,
        name=name,
        role=role,
        date_of_birth=data.get("date_of_birth"),
        is_active=True,
        is_phone_verified=False,
        is_email_verified=False,
    )
    db.add(user)
    await db.flush()
    temporary = await account_service.issue_temporary_password(db, user)
    await db.commit()

    profile_data = {
        k: v
        for k, v in data.items()
        if k not in {"role", "name", "phone", "email", "date_of_birth"}
    }
    profile_data["employee_code"] = code
    profile_data["display_name"] = profile_data.get("display_name") or name
    profile_data["contact_phone"] = profile_data.get("contact_phone") or phone
    await dispatch.upsert_collector(db, user.id, profile_data)
    await record_event(
        db,
        entity_type="user",
        entity_id=user.id,
        visit_id=None,
        event="field_account_created",
        to_status="active",
        actor=actor,
        details={"role": role, "employee_code": code},
    )
    await db.commit()
    return user, temporary


async def reset_password(db: AsyncSession, user_id: uuid.UUID, actor: User) -> str:
    user = await _field_user(db, user_id)
    if not user.is_active:
        raise ValidationError("Enable the account before issuing a new password")
    temporary = await account_service.issue_temporary_password(db, user)
    await record_event(
        db,
        entity_type="user",
        entity_id=user.id,
        visit_id=None,
        event="temporary_password_issued",
        actor=actor,
    )
    await db.commit()
    return temporary


async def set_active(
    db: AsyncSession, user_id: uuid.UUID, active: bool, actor: User, reason: str | None
) -> User:
    user = await _field_user(db, user_id)
    profile = await db.get(CollectorProfile, user_id)
    if not active:
        busy = (
            (
                await db.execute(
                    select(HomeVisit.reference)
                    .join(CollectionJob, CollectionJob.visit_id == HomeVisit.id)
                    .where(
                        CollectionJob.collector_id == user_id, CollectionJob.status.in_(MID_VISIT)
                    )
                )
            )
            .scalars()
            .all()
        )
        if busy:
            raise ConflictError(
                f"{user.name} is on the way to or at a patient ({', '.join(busy)}). "
                "Wait until the visit is closed, or reassign it first."
            )
        # Return their not-yet-started jobs to the dispatch queue.
        waiting = (
            (
                await db.execute(
                    select(CollectionJob.visit_id).where(
                        CollectionJob.collector_id == user_id, CollectionJob.status.in_(OPEN)
                    )
                )
            )
            .scalars()
            .all()
        )
        for visit_id in waiting:
            await dispatch.unassign(db, visit_id, actor, "Collector account disabled")
        await account_service.revoke_all_sessions(db, user.id)
        if profile is not None:
            profile.on_duty = False
    user.is_active = active
    if profile is not None:
        profile.is_active = active
    await record_event(
        db,
        entity_type="user",
        entity_id=user.id,
        visit_id=None,
        event="field_account_enabled" if active else "field_account_disabled",
        actor=actor,
        details={"reason": reason, "at": datetime.now(UTC).isoformat()},
    )
    await db.commit()
    return user


def account_state(user: User | None) -> dict:
    if user is None:
        return {}
    locked = bool(user.locked_until and user.locked_until > datetime.now(UTC))
    return {
        "email": user.email,
        "login_phone": user.phone,
        "date_of_birth": user.date_of_birth.isoformat()
        if isinstance(user.date_of_birth, date)
        else None,
        "account_active": user.is_active,
        "must_change_password": user.must_change_password,
        "password_changed_at": user.password_changed_at,
        "locked": locked,
    }

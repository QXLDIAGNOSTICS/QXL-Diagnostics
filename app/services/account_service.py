"""Passwords for first-party accounts: reset with SMS + email codes, forced
change after a temporary password, temporary passwords for new staff.

Every successful password change revokes the account's sessions, clears the
lockout and tells the owner by email/SMS.
"""

from __future__ import annotations

import uuid
from datetime import UTC, datetime, timedelta

from sqlalchemy import func, select, update
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.config import settings
from app.core.exceptions import UnauthorizedError, ValidationError
from app.core.logging import get_logger
from app.core.security import (
    constant_time_equals,
    generate_otp,
    generate_temporary_password,
    hash_opaque_value,
    hash_password,
    password_problem,
    verify_password,
)
from app.models.password_reset import PasswordReset
from app.models.session import Session
from app.models.user import User
from app.repositories.user_repository import UserRepository
from app.services import notification_service

logger = get_logger(__name__)

RESETS_PER_HOUR = 5
MAX_CODE_ATTEMPTS = 5


def _now() -> datetime:
    return datetime.now(UTC)


def _aware(dt: datetime) -> datetime:
    return dt if dt.tzinfo is not None else dt.replace(tzinfo=UTC)


def check_new_password(user: User, new_password: str) -> None:
    problem = password_problem(new_password, identifiers=(user.phone, user.email))
    if problem:
        raise ValidationError(problem)
    if user.password_hash and verify_password(new_password, user.password_hash):
        raise ValidationError("Choose a password different from the current one")


async def revoke_all_sessions(db: AsyncSession, user_id: uuid.UUID) -> None:
    await db.execute(
        update(Session)
        .where(Session.user_id == user_id, Session.revoked_at.is_(None))
        .values(revoked_at=_now())
    )


async def _set_password(
    db: AsyncSession, user: User, new_password: str, *, temporary: bool
) -> None:
    user.password_hash = hash_password(new_password)
    user.must_change_password = temporary
    user.password_changed_at = _now()
    user.failed_login_attempts = 0
    user.locked_until = None
    await revoke_all_sessions(db, user.id)


async def _notify_changed(user: User) -> None:
    text = (
        "Your QXL password was just changed. If this wasn't you, contact your QXL "
        "administrator immediately."
    )
    try:
        if user.email:
            await notification_service.send_email(user.email, "Your QXL password was changed", text)
    except Exception:  # noqa: BLE001
        logger.exception("Password-change email failed for user=%s", user.id)


# ── Reset (forgot password, or change while signed in) ──────────────────────


async def start_reset(
    db: AsyncSession, *, identifier: str, ip_address: str | None
) -> PasswordReset:
    """Always returns a reset id, whether or not the account exists, so the
    endpoint can't be used to discover accounts. Codes are only sent to a
    real, active account that uses a password."""
    user = await UserRepository(db).get_by_identifier(identifier)
    eligible = user is not None and user.is_active and bool(user.password_hash)
    now = _now()

    if eligible:
        assert user is not None
        recent = (
            await db.execute(
                select(func.count())
                .select_from(PasswordReset)
                .where(
                    PasswordReset.user_id == user.id,
                    PasswordReset.created_at > now - timedelta(hours=1),
                )
            )
        ).scalar_one()
        if recent >= RESETS_PER_HOUR:
            raise ValidationError("Too many reset requests. Try again in an hour.")
        # Only the newest request can be used.
        await db.execute(
            update(PasswordReset)
            .where(PasswordReset.user_id == user.id, PasswordReset.consumed_at.is_(None))
            .values(consumed_at=now)
        )

    phone_code = generate_otp()
    email_code = generate_otp() if eligible and user is not None and user.email else None
    reset = PasswordReset(
        user_id=user.id if eligible and user is not None else None,
        phone_code_hash=hash_opaque_value(phone_code),
        email_code_hash=hash_opaque_value(email_code) if email_code else None,
        expires_at=now + timedelta(seconds=settings.OTP_TTL_SECONDS),
        attempts=0,
        ip_address=ip_address,
    )
    db.add(reset)
    await db.commit()
    await db.refresh(reset)

    if eligible and user is not None:
        if not settings.is_production:
            logger.info(
                "[DEV] Password reset codes for %s: sms=%s email=%s",
                user.phone,
                phone_code,
                email_code,
            )
        # Same wording as the login SMS so it matches the approved DLT template.
        await notification_service.send_sms(
            user.phone,
            "Dear Customer, your verification code for QXL Diagnostics is "
            f"{phone_code}. This OTP is valid for 5 minutes. Please do not share it with anyone. "
            "QUALITIFY - QXL Diagnostics.",
        )
        if user.email and email_code:
            await notification_service.send_email(
                user.email,
                "Your QXL password reset code",
                f"Your password reset code is {email_code}. It expires in "
                f"{settings.OTP_TTL_SECONDS // 60} minutes. This is a different code from the "
                "one sent by SMS — you need both. If you didn't ask to reset your password, "
                "ignore this email and tell your administrator.",
            )
    return reset


async def complete_reset(
    db: AsyncSession,
    *,
    reset_id: uuid.UUID,
    phone_code: str,
    email_code: str | None,
    new_password: str,
) -> User:
    reset = await db.get(PasswordReset, reset_id)
    generic = UnauthorizedError("Incorrect or expired code")
    if reset is None or reset.consumed_at is not None:
        raise generic
    if reset.attempts >= MAX_CODE_ATTEMPTS:
        raise UnauthorizedError("Too many incorrect attempts — request new codes")
    if _now() > _aware(reset.expires_at):
        raise UnauthorizedError("The codes have expired — request new ones")

    phone_ok = constant_time_equals(hash_opaque_value(phone_code.strip()), reset.phone_code_hash)
    email_ok = reset.email_code_hash is None or constant_time_equals(
        hash_opaque_value((email_code or "").strip()), reset.email_code_hash
    )
    if reset.user_id is None or not (phone_ok and email_ok):
        reset.attempts += 1
        await db.commit()
        raise generic

    user = await UserRepository(db).get_by_id(reset.user_id)
    if user is None or not user.is_active:
        raise generic
    check_new_password(user, new_password)

    reset.consumed_at = _now()
    await _set_password(db, user, new_password, temporary=False)
    await db.commit()
    await _notify_changed(user)
    return user


# ── Forced change after a temporary password ────────────────────────────────


async def change_password(
    db: AsyncSession, user: User, *, current_password: str, new_password: str
) -> None:
    if not verify_password(current_password, user.password_hash):
        raise UnauthorizedError("Your current password is incorrect")
    check_new_password(user, new_password)
    await _set_password(db, user, new_password, temporary=False)
    await db.commit()
    await _notify_changed(user)


# ── Temporary passwords for staff created by an administrator ───────────────


async def issue_temporary_password(db: AsyncSession, user: User) -> str:
    """Sets a new random password the person must replace at first sign-in.
    The caller shows it once to the administrator; it is never stored."""
    temporary = generate_temporary_password()
    await _set_password(db, user, temporary, temporary=True)
    return temporary

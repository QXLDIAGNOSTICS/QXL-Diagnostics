"""Auth service for patient and admin login challenges.

Flow:
    1. Patient flow: phone -> OTP challenge -> OTP verification.
    2. Admin flow: password check -> OTP challenge -> OTP + admin secret key.
"""
from __future__ import annotations

import uuid
from datetime import datetime, timedelta, timezone

from sqlalchemy.ext.asyncio import AsyncSession

from app.core.config import settings
from app.core.exceptions import UnauthorizedError, ValidationError
from app.core.security import (
    constant_time_equals,
    generate_opaque_token,
    generate_otp,
    hash_opaque_value,
    hash_password,
    normalize_phone_number,
    verify_password,
)
from app.models.login_challenge import LoginChallenge
from app.models.user import User
from app.repositories.login_challenge_repository import LoginChallengeRepository
from app.repositories.user_repository import UserRepository
from app.services import notification_service, session_service
from app.core.logging import get_logger
logger = get_logger(__name__)


async def register_user(
    db: AsyncSession, *, email: str, phone: str, password: str, name: str | None
) -> User:
    phone = normalize_phone_number(phone)
    repo = UserRepository(db)
    if await repo.get_by_email(email) is not None:
        raise ValidationError("An account with this email already exists")
    if await repo.get_by_phone(phone) is not None:
        raise ValidationError("An account with this phone number already exists")

    user = await repo.create(
        email=email, phone=phone, password_hash=hash_password(password), name=name
    )
    await db.commit()
    await db.refresh(user)
    return user


async def authenticate_password(db: AsyncSession, *, identifier: str, password: str) -> User:
    """Verify the identifier (email or phone) + password. Raises on failure.

    Does not issue a session — a successful call only earns the right to
    receive a 2FA challenge.
    """
    repo = UserRepository(db)
    user = await repo.get_by_identifier(identifier)
    if user is None:
        # Constant-ish response — don't reveal whether the identifier exists.
        raise UnauthorizedError("Incorrect email/phone or password")

    if user.locked_until is not None and user.locked_until > datetime.now(timezone.utc):
        raise UnauthorizedError("Account temporarily locked due to too many failed attempts")

    if not verify_password(password, user.password_hash):
        locked_until = None
        if user.failed_login_attempts + 1 >= settings.LOGIN_LOCKOUT_THRESHOLD:
            locked_until = datetime.now(timezone.utc) + timedelta(
                minutes=settings.LOGIN_LOCKOUT_MINUTES
            )
        await repo.record_failed_login(
            user, lockout_threshold=settings.LOGIN_LOCKOUT_THRESHOLD, locked_until=locked_until
        )
        await db.commit()
        raise UnauthorizedError("Incorrect email/phone or password")

    await repo.reset_failed_logins(user)
    await db.commit()
    return user


async def authenticate_phone_otp_user(db: AsyncSession, *, phone: str) -> User:
    """Authenticate (or auto-provision) a patient login by phone only.

    Passwordless by design: the first OTP login for a new phone number
    creates the account on the spot (no separate register step) — the OTP
    itself is the only credential. Admin and super-admin accounts must use
    credential-based admin login and are never auto-provisioned here.
    """
    phone = normalize_phone_number(phone)
    repo = UserRepository(db)
    user = await repo.get_by_phone(phone)
    if user is not None:
        if user.role in {"admin", "super_admin"}:
            raise UnauthorizedError("Admin accounts must use admin login")
        return user

    user = await repo.create(phone=phone, role="patient")
    await db.commit()
    await db.refresh(user)
    return user


async def create_login_challenge(
    db: AsyncSession, user: User, *, ip_address: str | None, user_agent: str | None
) -> LoginChallenge:
    """Generate a fresh OTP challenge, persist hashes, and deliver OTP."""
    now = datetime.now(timezone.utc)
    raw_otp = generate_otp()
    logger.info("Generated OTP: %s", raw_otp)
    # Keep link token fields populated for schema compatibility; login no longer
    # requires SMS-link verification.
    raw_link_token = generate_opaque_token()

    repo = LoginChallengeRepository(db)
    challenge = await repo.create(
        user_id=user.id,
        otp_hash=hash_opaque_value(raw_otp),
        otp_expires_at=now + timedelta(seconds=settings.OTP_TTL_SECONDS),
        link_token_hash=hash_opaque_value(raw_link_token),
        link_expires_at=now + timedelta(seconds=settings.LOGIN_CHALLENGE_TTL_SECONDS),
        link_verified_at=now,
        ip_address=ip_address,
        user_agent=user_agent,
    )
    await db.commit()
    await db.refresh(challenge)

    await notification_service.send_sms(
        user.phone,
        "Dear Customer, your verification code for QXL Diagnostics is "
        f"{raw_otp}. This OTP is valid for 5 minutes. Please do not share it with anyone. "
        "QUALITIFY - QXL Diagnostics.",
    )
    if user.email:
        await notification_service.send_email(
            user.email,
            "Your QXL login verification code",
            f"Your one-time code is {raw_otp}. It expires in "
            f"{settings.OTP_TTL_SECONDS // 60} minutes. If you didn't request this, ignore this email.",
        )
    return challenge


async def verify_otp(
    db: AsyncSession, *, challenge_id: uuid.UUID, otp: str, admin_secret_key: str | None = None
) -> tuple[LoginChallenge, str | None]:
    repo = LoginChallengeRepository(db)
    challenge = await repo.get_by_id(challenge_id)
    _ensure_challenge_usable(challenge)
    assert challenge is not None

    if challenge.otp_attempts >= settings.OTP_MAX_ATTEMPTS:
        raise UnauthorizedError("Too many incorrect attempts — please log in again")

    if challenge.otp_verified_at is None:
        if len(otp) != settings.OTP_LENGTH or not otp.isdigit():
            raise UnauthorizedError("Incorrect or expired code")
        if datetime.now(timezone.utc) > _aware(challenge.otp_expires_at):
            raise UnauthorizedError("Code has expired — please log in again")
        if hash_opaque_value(otp) != challenge.otp_hash:
            challenge.otp_attempts += 1
            await db.commit()
            raise UnauthorizedError("Incorrect or expired code")

        user = await UserRepository(db).get_by_id(challenge.user_id)
        if user is None:
            raise UnauthorizedError("Account no longer exists")
        if user.role in {"admin", "super_admin"}:
            if not settings.ADMIN_ACCESS_KEY or not admin_secret_key:
                raise UnauthorizedError("Admin secret key is required")
            if not constant_time_equals(admin_secret_key, settings.ADMIN_ACCESS_KEY):
                raise UnauthorizedError("Incorrect admin secret key")

            # Promote configured admin identifiers to super-admin automatically.
            super_identifiers = {item.lower() for item in settings.ADMIN_SUPER_IDENTIFIERS}
            if (
                super_identifiers
                and (
                    (user.email or "").lower() in super_identifiers
                    or user.phone.lower() in super_identifiers
                )
                and user.role != "super_admin"
            ):
                user.role = "super_admin"

        challenge.otp_verified_at = datetime.now(timezone.utc)
        user.is_phone_verified = True
        await db.commit()

    session_token = await _maybe_complete_login(db, challenge)
    return challenge, session_token


async def get_challenge(db: AsyncSession, challenge_id: uuid.UUID) -> LoginChallenge:
    challenge = await LoginChallengeRepository(db).get_by_id(challenge_id)
    _ensure_challenge_usable(challenge, allow_consumed=True)
    assert challenge is not None
    return challenge


async def _maybe_complete_login(db: AsyncSession, challenge: LoginChallenge) -> str | None:
    if challenge.consumed_at is not None:
        return None
    if challenge.otp_verified_at is None:
        return None

    user = await UserRepository(db).get_by_id(challenge.user_id)
    if user is None:
        raise UnauthorizedError("Account no longer exists")

    challenge.consumed_at = datetime.now(timezone.utc)
    await db.commit()

    return await session_service.create_session(
        db, user, user_agent=challenge.user_agent, ip_address=challenge.ip_address
    )


def _ensure_challenge_usable(
    challenge: LoginChallenge | None, *, allow_consumed: bool = False
) -> None:
    if challenge is None or challenge.invalidated:
        raise UnauthorizedError("Login challenge not found or invalidated")
    if not allow_consumed and challenge.consumed_at is not None:
        raise UnauthorizedError("Login already completed")


def _aware(dt: datetime) -> datetime:
    return dt if dt.tzinfo is not None else dt.replace(tzinfo=timezone.utc)

"""First-party auth: register, login challenges, logout, me.

No third-party identity provider and no JWTs are involved. A session cookie
(``settings.SESSION_COOKIE_NAME``) is only ever issued after a login has
challenge has been verified — see ``app.services.auth_service``.
"""
from __future__ import annotations

import uuid as _uuid

from fastapi import APIRouter, Request, Response

from app.api.deps import DbSession, SessionUser, SessionUserOptional
from app.core import roles as R
from app.core.config import settings
from app.core.exceptions import ValidationError
from app.core.rate_limit import limiter
from app.core.roles import SECRET_GATED_ROLES
from app.core.security import mask_email, mask_phone
from app.schemas.auth import (
    LoginChallengeResponse,
    LoginRequest,
    LoginStatusResponse,
    OtpVerifyRequest,
    PasswordChangeRequest,
    PasswordForgotRequest,
    PasswordForgotResponse,
    PasswordResetRequest,
    PhoneOtpLoginRequest,
    RegisterRequest,
    RegisterResponse,
    UserMe,
)
from app.services import account_service, auth_service, session_service

router = APIRouter(prefix="/auth", tags=["auth"])


def _requires_admin_secret(user) -> bool:  # noqa: ANN001
    """Only the super-admin needs the shared secret key at login. Identifiers
    configured in ``ADMIN_SUPER_IDENTIFIERS`` are flagged too (even before
    they're promoted) so the field shows up on that account's very first
    login, when the promotion itself happens during OTP verification."""
    if user is None:
        return False
    if user.role in SECRET_GATED_ROLES:
        return True
    super_identifiers = {item.lower() for item in settings.ADMIN_SUPER_IDENTIFIERS}
    if not super_identifiers:
        return False
    return (user.email or "").lower() in super_identifiers or user.phone.lower() in super_identifiers


def _set_session_cookie(response: Response, raw_token: str) -> None:
    response.set_cookie(
        settings.SESSION_COOKIE_NAME,
        raw_token,
        httponly=True,
        secure=settings.is_production,
        samesite="lax",
        max_age=settings.SESSION_TTL_DAYS * 24 * 3600,
        path="/",
    )


def _challenge_response(challenge) -> LoginChallengeResponse:  # noqa: ANN001
    requires_admin_secret = _requires_admin_secret(challenge.user)
    return LoginChallengeResponse(
        challenge_id=challenge.id,
        masked_email=mask_email(challenge.user.email) if challenge.user else "***",
        masked_phone=mask_phone(challenge.user.phone) if challenge.user else "***",
        otp_expires_in=settings.OTP_TTL_SECONDS,
        otp_verified=challenge.otp_verified_at is not None,
        requires_admin_secret=requires_admin_secret,
    )


@router.post("/register", response_model=RegisterResponse, status_code=201)
@limiter.limit("10/hour")
async def register(request: Request, db: DbSession, payload: RegisterRequest) -> RegisterResponse:
    user = await auth_service.register_user(
        db, email=payload.email, phone=payload.phone, password=payload.password, name=payload.name
    )
    return RegisterResponse(id=user.id, email=user.email, phone=user.phone)


@router.post("/login", response_model=LoginChallengeResponse)
@limiter.limit("10/minute")
async def login(request: Request, db: DbSession, payload: LoginRequest) -> LoginChallengeResponse:
    user = await auth_service.authenticate_password(
        db, identifier=payload.identifier, password=payload.password
    )
    challenge = await auth_service.create_login_challenge(
        db,
        user,
        ip_address=request.client.host if request.client else None,
        user_agent=request.headers.get("user-agent"),
    )
    challenge.user = user  # avoid an extra query — already loaded above
    return _challenge_response(challenge)


@router.post("/login/phone", response_model=LoginChallengeResponse)
@limiter.limit("15/minute")
async def login_phone(request: Request, db: DbSession, payload: PhoneOtpLoginRequest) -> LoginChallengeResponse:
    user = await auth_service.authenticate_phone_otp_user(db, phone=payload.phone)
    challenge = await auth_service.create_login_challenge(
        db,
        user,
        ip_address=request.client.host if request.client else None,
        user_agent=request.headers.get("user-agent"),
    )
    challenge.user = user
    return _challenge_response(challenge)


@router.post("/login/otp", response_model=LoginStatusResponse)
@limiter.limit("20/hour")
async def verify_login_otp(
    request: Request, response: Response, db: DbSession, payload: OtpVerifyRequest
) -> LoginStatusResponse:
    challenge, session_token = await auth_service.verify_otp(
        db,
        challenge_id=payload.challenge_id,
        otp=payload.otp,
        admin_secret_key=payload.admin_secret_key,
    )
    must_change = False
    if session_token:
        _set_session_cookie(response, session_token)
        user = await session_service.get_user_by_token(db, session_token)
        must_change = bool(user and user.must_change_password)
    return LoginStatusResponse(
        challenge_id=challenge.id,
        otp_verified=challenge.otp_verified_at is not None,
        completed=session_token is not None,
        must_change_password=must_change,
    )


@router.get("/login/status", response_model=LoginStatusResponse)
async def login_status(db: DbSession, challenge_id: str) -> LoginStatusResponse:
    try:
        challenge = await auth_service.get_challenge(db, _uuid.UUID(challenge_id))
    except ValueError as exc:
        raise ValidationError("Invalid challenge id") from exc
    return LoginStatusResponse(
        challenge_id=challenge.id,
        otp_verified=challenge.otp_verified_at is not None,
        completed=challenge.consumed_at is not None,
    )


@router.post("/logout", status_code=204)
async def logout(request: Request, response: Response, db: DbSession) -> None:
    raw_token = request.cookies.get(settings.SESSION_COOKIE_NAME)
    if raw_token:
        await session_service.revoke_session(db, raw_token)
    response.delete_cookie(settings.SESSION_COOKIE_NAME, path="/")


@router.get("/me", response_model=UserMe | None)
async def me(user: SessionUserOptional, db: DbSession) -> UserMe | None:
    """Session probe used by the site chrome on every page load.

    Returns ``200 null`` when the visitor is a guest (no session cookie / expired
    session) so browsers and Lighthouse do not log a 401 as a console error.
    Authenticated callers still receive the full ``UserMe`` payload, including
    DB-aware role-tier booleans so the frontend never has to re-derive access
    from a hardcoded role list (which would break for super-admin-created
    custom roles).
    """
    if user is None:
        return None
    payload = UserMe.model_validate(user)
    payload.is_staff = await R.is_staff_async(db, user.role)
    payload.is_admin = await R.is_admin_async(db, user.role)
    payload.is_super_admin = R.is_super_admin(user.role)
    if payload.is_admin:
        from app.core.permissions import PERMISSION_KEYS

        payload.permissions = sorted(PERMISSION_KEYS)
    elif payload.is_staff:
        from sqlalchemy import select

        from app.models.role import CustomRole

        row = (await db.execute(select(CustomRole).where(CustomRole.key == user.role))).scalar_one_or_none()
        payload.permissions = sorted(row.permissions or []) if row else []
    return payload



# ── Passwords ────────────────────────────────────────────────────────────────


@router.post("/password/forgot", response_model=PasswordForgotResponse)
@limiter.limit("10/hour")
async def password_forgot(request: Request, db: DbSession, payload: PasswordForgotRequest) -> PasswordForgotResponse:
    """Starts a reset (also used to change a password while signed in). One
    code goes by SMS and, if the account has an email address, a second code
    by email; both are needed. The answer is identical for unknown accounts."""
    reset = await account_service.start_reset(
        db, identifier=payload.identifier, ip_address=request.client.host if request.client else None
    )
    return PasswordForgotResponse(
        reset_id=reset.id,
        expires_in=settings.OTP_TTL_SECONDS,
        message="If an account matches, we've sent a code to its phone and another to its email.",
    )


@router.post("/password/reset", status_code=204)
@limiter.limit("20/hour")
async def password_reset(request: Request, response: Response, db: DbSession, payload: PasswordResetRequest) -> None:
    await account_service.complete_reset(
        db,
        reset_id=payload.reset_id,
        phone_code=payload.phone_code,
        email_code=payload.email_code,
        new_password=payload.new_password,
    )
    # Every session was revoked; this device must sign in again too.
    response.delete_cookie(settings.SESSION_COOKIE_NAME, path="/")


@router.post("/password/change", status_code=204)
@limiter.limit("10/hour")
async def password_change(
    request: Request, response: Response, db: DbSession, user: SessionUser, payload: PasswordChangeRequest
) -> None:
    """Replace the current (e.g. temporary) password. Other sessions are
    signed out; this device gets a fresh session so the person can carry on."""
    await account_service.change_password(
        db, user, current_password=payload.current_password, new_password=payload.new_password
    )
    token = await session_service.create_session(
        db,
        user,
        user_agent=request.headers.get("user-agent"),
        ip_address=request.client.host if request.client else None,
    )
    _set_session_cookie(response, token)

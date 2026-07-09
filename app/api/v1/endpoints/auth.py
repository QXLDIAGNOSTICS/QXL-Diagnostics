"""First-party auth: register, login challenges, logout, me.

No third-party identity provider and no JWTs are involved. A session cookie
(``settings.SESSION_COOKIE_NAME``) is only ever issued after a login has
challenge has been verified — see ``app.services.auth_service``.
"""
from __future__ import annotations

import uuid as _uuid

from fastapi import APIRouter, Request, Response

from app.api.deps import CurrentUser, DbSession
from app.core.config import settings
from app.core.exceptions import ValidationError
from app.core.rate_limit import limiter
from app.core.security import mask_email, mask_phone
from app.schemas.auth import (
    LoginChallengeResponse,
    LoginRequest,
    LoginStatusResponse,
    OtpVerifyRequest,
    PhoneOtpLoginRequest,
    RegisterRequest,
    RegisterResponse,
    UserMe,
)
from app.services import auth_service, session_service

router = APIRouter(prefix="/auth", tags=["auth"])


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
    requires_admin_secret = bool(challenge.user and challenge.user.role in {"admin", "super_admin"})
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
    if session_token:
        _set_session_cookie(response, session_token)
    return LoginStatusResponse(
        challenge_id=challenge.id,
        otp_verified=challenge.otp_verified_at is not None,
        completed=session_token is not None,
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


@router.get("/me", response_model=UserMe)
async def me(user: CurrentUser) -> UserMe:
    return UserMe.model_validate(user)


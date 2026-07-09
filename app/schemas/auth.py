"""Schemas for the backend-owned auth/session endpoints.

Patient login is phone + OTP only.
Admin login is identifier + password, then OTP + admin secret key.
"""
from __future__ import annotations

import uuid
from datetime import date

from pydantic import BaseModel, ConfigDict, EmailStr, field_validator

from app.core.security import normalize_phone_number


def _normalize_phone(v: str) -> str:
    try:
        return normalize_phone_number(v)
    except ValueError as exc:
        raise ValueError(str(exc)) from exc


class UserMe(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: uuid.UUID
    email: str | None = None
    phone: str
    name: str | None = None
    date_of_birth: date | None = None
    role: str
    is_email_verified: bool
    is_phone_verified: bool


class RegisterRequest(BaseModel):
    email: EmailStr
    phone: str
    name: str | None = None
    password: str

    @field_validator("phone")
    @classmethod
    def _validate_phone(cls, v: str) -> str:
        return _normalize_phone(v)

    @field_validator("password")
    @classmethod
    def _password_len(cls, v: str) -> str:
        if len(v) < 8:
            raise ValueError("Password must be at least 8 characters")
        if not any(c.isalpha() for c in v) or not any(c.isdigit() for c in v):
            raise ValueError("Password must contain both letters and numbers")
        return v


class RegisterResponse(BaseModel):
    id: uuid.UUID
    email: EmailStr
    phone: str


class LoginRequest(BaseModel):
    identifier: str  # email or phone
    password: str

    @field_validator("identifier")
    @classmethod
    def _normalize_identifier(cls, v: str) -> str:
        v = v.strip()
        if "@" in v:
            return v.lower()
        try:
            return normalize_phone_number(v)
        except ValueError:
            # Not phone-shaped either — let auth fail naturally with a
            # generic "incorrect identifier/password" instead of a 422.
            return v


class PhoneOtpLoginRequest(BaseModel):
    phone: str

    @field_validator("phone")
    @classmethod
    def _validate_phone(cls, v: str) -> str:
        return _normalize_phone(v)


class LoginChallengeResponse(BaseModel):
    challenge_id: uuid.UUID
    masked_email: str
    masked_phone: str
    otp_expires_in: int
    otp_verified: bool
    requires_admin_secret: bool


class OtpVerifyRequest(BaseModel):
    challenge_id: uuid.UUID
    otp: str
    admin_secret_key: str | None = None


class LoginStatusResponse(BaseModel):
    challenge_id: uuid.UUID
    otp_verified: bool
    completed: bool


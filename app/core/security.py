"""Core security primitives for the first-party auth system.

This backend does NOT use Auth0 or JWTs for session auth. Instead:
- Passwords are hashed with bcrypt (adaptive, salted, slow-by-design).
- Sessions are opaque random tokens; only a SHA-256 hash is ever persisted
  (see ``app.services.session_service``), so a DB leak can't be replayed.
- Login is a two-factor challenge: a numeric OTP + a one-time link token sent
  over SMS. Both are opaque/random and hashed at rest — never JWTs, and the
  raw values are only ever transmitted once, directly to the user's device.
"""
from __future__ import annotations

import hashlib
import hmac
import re
import secrets
import string

import bcrypt

from app.core.config import settings

# ── Password hashing (bcrypt, salted + adaptive cost) ──────────────────────────


def hash_password(raw_password: str) -> str:
    return bcrypt.hashpw(raw_password.encode("utf-8"), bcrypt.gensalt(rounds=12)).decode("utf-8")


# A real bcrypt hash of a random value: checked when there is no account (or
# no password on it) so the response takes as long as a real check and
# doesn't reveal whether the identifier exists.
_DUMMY_HASH = bcrypt.hashpw(b"qxl-no-such-account", bcrypt.gensalt(rounds=12))


def verify_password(raw_password: str, password_hash: str | None) -> bool:
    if not raw_password:
        return False
    if not password_hash:
        bcrypt.checkpw(raw_password.encode("utf-8"), _DUMMY_HASH)
        return False
    try:
        return bcrypt.checkpw(raw_password.encode("utf-8"), password_hash.encode("utf-8"))
    except ValueError:
        return False


def password_problem(raw_password: str, *, identifiers: tuple[str | None, ...] = ()) -> str | None:
    """Why a new password is unacceptable, or None. Same rule everywhere a
    password is set (registration, admin-created accounts, reset, change)."""
    if len(raw_password) < max(settings.PASSWORD_MIN_LENGTH, 8):
        return f"Password must be at least {max(settings.PASSWORD_MIN_LENGTH, 8)} characters"
    if len(raw_password) > 72:
        # bcrypt only uses the first 72 bytes.
        return "Password must be at most 72 characters"
    if not any(c.isalpha() for c in raw_password) or not any(c.isdigit() for c in raw_password):
        return "Password must contain both letters and numbers"
    lowered = raw_password.lower()
    for ident in identifiers:
        if not ident:
            continue
        core = ident.lower().split("@")[0].lstrip("+")
        if core.isdigit():
            core = core[-10:]  # the local mobile number, without +91
        if len(core) >= 4 and core in lowered:
            return "Password must not contain your phone number or email"
    return None


def generate_temporary_password() -> str:
    """Readable one-time password handed to a new staff member: 12 characters
    from an alphabet without look-alikes, always with letters and digits."""
    alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789"
    while True:
        value = "".join(secrets.choice(alphabet) for _ in range(12))
        if any(c.isdigit() for c in value) and any(c.isalpha() for c in value):
            return value


def is_password_strong_enough(raw_password: str) -> bool:
    if len(raw_password) < settings.PASSWORD_MIN_LENGTH:
        return False
    has_letter = any(c.isalpha() for c in raw_password)
    has_digit = any(c.isdigit() for c in raw_password)
    return has_letter and has_digit


# ── Opaque token hashing (shared pattern for sessions, OTPs, link tokens) ──────


def hash_opaque_value(raw_value: str) -> str:
    """SHA-256 hex digest. Used to store OTPs/link-tokens/session tokens at rest
    without ever persisting the raw secret that gets sent to the user."""
    return hashlib.sha256(raw_value.encode("utf-8")).hexdigest()


def constant_time_equals(a: str, b: str) -> bool:
    return hmac.compare_digest(a, b)


# ── OTP + link token generation ─────────────────────────────────────────────────


def generate_otp(length: int | None = None) -> str:
    """Cryptographically random numeric OTP (not derived from time/counter)."""
    n = length or settings.OTP_LENGTH
    # Never emit common dummy/test OTP patterns even if randomly hit.
    disallowed = {
        "123456",
        "12345678",
        "000000",
        "00000000",
        "111111",
        "11111111",
    }
    while True:
        otp = "".join(secrets.choice(string.digits) for _ in range(n))
        if otp not in disallowed:
            return otp


def generate_opaque_token(num_bytes: int = 32) -> str:
    """Opaque, URL-safe random token — used for the SMS verification link.

    Deliberately NOT a JWT: it carries no embedded claims/identity, so leaking
    it in a log or referrer header reveals nothing beyond a random string that
    is meaningless without the corresponding server-side challenge row.
    """
    return secrets.token_urlsafe(num_bytes)


# ── Masking helpers (never log/display full identifiers) ───────────────────────


def mask_token(token: str, keep: int = 4) -> str:
    """Mask a secret for safe logging: keep only the last few characters."""
    if len(token) <= keep:
        return "*" * len(token)
    return f"{'*' * (len(token) - keep)}{token[-keep:]}"


def mask_email(email: str | None) -> str:
    if not email or "@" not in email:
        return "***"
    local, _, domain = email.partition("@")
    if len(local) <= 2:
        masked_local = local[0] + "*"
    else:
        masked_local = local[0] + "*" * (len(local) - 2) + local[-1]
    return f"{masked_local}@{domain}"


def mask_phone(phone: str, keep: int = 3) -> str:
    if len(phone) <= keep:
        return "*" * len(phone)
    return f"{'*' * (len(phone) - keep)}{phone[-keep:]}"


# ── Email normalization ──────────────────────────────────────────────────────


def normalize_optional_email(email: str | None) -> str | None:
    """Treat blank strings as missing — phone-only accounts store NULL, not ''."""
    e = (email or "").strip()
    return e or None


# ── Phone normalization ──────────────────────────────────────────────────────


def normalize_phone_number(raw: str) -> str:
    """Canonicalize a phone number to a single stable E.164-ish string so the
    same physical number always maps to the same DB value, no matter how the
    user typed it (with/without '+91', spaces, dashes, or a leading 0).

    This backend/SMS provider (Nettyfish) only targets Indian mobile numbers,
    so a bare 10-digit number is assumed to be Indian and gets '+91' prefixed.
    Without this, "9876543210" and "+919876543210" would silently create two
    different accounts / fail to find an existing one on login.
    """
    digits = re.sub(r"\D", "", raw or "")
    if len(digits) == 10:
        digits = "91" + digits
    elif len(digits) == 13 and digits.startswith("091"):
        digits = "91" + digits[3:]
    elif len(digits) == 11 and digits.startswith("0"):
        digits = "91" + digits[1:]
    if not digits or len(digits) < 8 or len(digits) > 15:
        raise ValueError("Enter a valid phone number, e.g. +919876543210")
    return f"+{digits}"

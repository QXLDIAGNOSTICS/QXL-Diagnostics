"""Auth tests: password hashing, OTP/token helpers, masking, and role guard."""
from __future__ import annotations

import pytest

from app.api.deps import require_role
from app.core.exceptions import PermissionDeniedError
from app.core.security import (
    generate_opaque_token,
    generate_otp,
    hash_opaque_value,
    hash_password,
    mask_email,
    mask_phone,
    verify_password,
)


def test_password_hash_and_verify_roundtrip():
    hashed = hash_password("Sup3rSecret!")
    assert hashed != "Sup3rSecret!"
    assert verify_password("Sup3rSecret!", hashed) is True
    assert verify_password("wrong-password", hashed) is False


def test_generate_otp_is_numeric_and_correct_length():
    otp = generate_otp(6)
    assert len(otp) == 6
    assert otp.isdigit()


def test_generate_opaque_token_is_not_a_jwt():
    token = generate_opaque_token()
    # A JWT would contain two '.' separators; an opaque token must not.
    assert token.count(".") == 0
    assert len(token) > 20


def test_hash_opaque_value_is_deterministic_and_one_way():
    raw = "some-secret-value"
    assert hash_opaque_value(raw) == hash_opaque_value(raw)
    assert hash_opaque_value(raw) != raw


def test_mask_email_keeps_domain_hides_local_part():
    masked = mask_email("johndoe@example.com")
    assert masked.endswith("@example.com")
    assert "johndoe" not in masked


def test_mask_phone_keeps_last_digits_only():
    masked = mask_phone("+919876543210")
    assert masked.endswith("210")
    assert "987654" not in masked


async def test_require_role_grants_when_matching(fake_user):
    fake_user.role = "admin"
    checker = require_role("admin")
    result = await checker(user=fake_user)
    assert result is fake_user


async def test_require_role_denies_when_not_matching(fake_user):
    fake_user.role = "patient"
    checker = require_role("admin")
    with pytest.raises(PermissionDeniedError):
        await checker(user=fake_user)

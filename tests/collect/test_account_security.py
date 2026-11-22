"""Account security and payment verification against a real database.

Enabled with QXL_COLLECT_DB_TESTS=1 (writes data — use a throwaway DB).
Covers: field staff accounts created by an admin with a temporary password,
forced change at first sign-in, SMS + email reset codes, disabled accounts,
lockout, the phone-only password crash, permission checks, and Razorpay
verification (signature, amount, currency, status, webhook, partial refund).
"""

from __future__ import annotations

import hashlib
import hmac
import json
import os
import re
import secrets
import uuid

import pytest
from httpx import ASGITransport, AsyncClient

pytestmark = pytest.mark.skipif(
    os.getenv("QXL_COLLECT_DB_TESTS") != "1", reason="needs a real database"
)

OTP = "73519246"


def _phone() -> str:
    return "+9197" + "".join(secrets.choice("0123456789") for _ in range(8))


@pytest.fixture(autouse=True)
def _fixed_codes(monkeypatch):
    """Known OTPs instead of real SMS/email, and no per-IP rate limits."""
    from app.core.rate_limit import limiter
    from app.services import account_service, auth_service, notification_service

    sent: list[tuple[str, str]] = []

    async def _sms(to, body, **_):
        sent.append(("sms", body))
        return True

    async def _email(to, subject, body, **_):
        sent.append(("email", body))
        return True

    codes = iter(["11112222", "33334444"] * 50)
    monkeypatch.setattr(auth_service, "generate_otp", lambda *a, **k: OTP)
    monkeypatch.setattr(account_service, "generate_otp", lambda *a, **k: next(codes))
    monkeypatch.setattr(notification_service, "send_sms", _sms)
    monkeypatch.setattr(notification_service, "send_email", _email)
    limiter.enabled = False
    yield sent
    limiter.enabled = True


def _anon() -> AsyncClient:
    from app.main import app

    return AsyncClient(transport=ASGITransport(app=app), base_url="http://test")


async def _session_client(user) -> AsyncClient:  # noqa: ANN001
    from app.core.config import settings
    from app.db.session import AsyncSessionLocal
    from app.services import session_service

    async with AsyncSessionLocal() as db:
        token = await session_service.create_session(
            db, user, user_agent="pytest", ip_address="127.0.0.1"
        )
    c = _anon()
    c.cookies.set(settings.SESSION_COOKIE_NAME, token)
    return c


async def _make_user(role: str, **kw):
    from app.db.session import AsyncSessionLocal
    from app.models.user import User

    async with AsyncSessionLocal() as db:
        u = User(phone=_phone(), name=kw.pop("name", role.title()), role=role, **kw)
        db.add(u)
        await db.commit()
        await db.refresh(u)
        return u


async def _login(c: AsyncClient, identifier: str, password: str):
    r = await c.post("/api/v1/auth/login", json={"identifier": identifier, "password": password})
    if r.status_code != 200:
        return r
    return await c.post(
        "/api/v1/auth/login/otp", json={"challenge_id": r.json()["challenge_id"], "otp": OTP}
    )


async def test_field_staff_lifecycle():
    admin = await _make_user("admin", name="Admin")
    dispatcher = await _make_user("dispatcher", name="Dispatcher")
    a = await _session_client(admin)
    d = await _session_client(dispatcher)
    phone = _phone()
    email = f"ravi.{secrets.token_hex(3)}@demo.qxl.test"
    body = {
        "role": "collector",
        "name": "Ravi Kumar",
        "phone": phone,
        "email": email,
        "employee_code": f"QXL-{secrets.token_hex(2)}",
        "zone": "north",
        "shift_start": "07:00",
        "shift_end": "15:00",
        "working_days": [0, 1, 2, 3, 4, 5],
    }

    # Only accounts with field_team.manage (admins) may create logins.
    r = await d.post("/api/v1/ops/field-staff", json=body)
    assert r.status_code == 403
    r = await a.post("/api/v1/ops/field-staff", json=body)
    assert r.status_code == 201, r.text
    temp = r.json()["temporary_password"]
    member = r.json()["member"]
    assert member["must_change_password"] is True and member["account_active"] is True
    assert len(temp) == 12
    # Duplicate phone / email / code are refused.
    assert (await a.post("/api/v1/ops/field-staff", json=body)).status_code == 422

    # First sign-in: OTP works, but nothing except the password change does.
    c = _anon()
    r = await _login(c, email, temp)
    assert r.status_code == 200 and r.json()["must_change_password"] is True
    assert (await c.get("/api/v1/collector/me")).status_code == 403
    assert (await c.get("/api/v1/collector/me")).json()["error"][
        "code"
    ] == "password_change_required"
    me = (await c.get("/api/v1/auth/me")).json()
    assert me["must_change_password"] is True
    # Wrong current password, weak and identifier-based passwords are refused.
    bad = await c.post(
        "/api/v1/auth/password/change",
        json={"current_password": "nope", "new_password": "Field2026x"},
    )
    assert bad.status_code == 401
    weak = await c.post(
        "/api/v1/auth/password/change", json={"current_password": temp, "new_password": "short1"}
    )
    assert weak.status_code == 422
    same = await c.post(
        "/api/v1/auth/password/change", json={"current_password": temp, "new_password": temp}
    )
    assert same.status_code == 422
    ident = await c.post(
        "/api/v1/auth/password/change",
        json={"current_password": temp, "new_password": f"x{phone[3:]}a"},
    )
    assert ident.status_code == 422
    ok = await c.post(
        "/api/v1/auth/password/change",
        json={"current_password": temp, "new_password": "Field2026x"},
    )
    assert ok.status_code == 204, ok.text
    assert (await c.get("/api/v1/collector/me")).status_code == 200
    # The temporary password no longer works; the new one does (by phone too).
    assert (await _login(_anon(), email, temp)).status_code == 401
    assert (await _login(_anon(), phone, "Field2026x")).status_code == 200

    # Admin issues a new temporary password: sessions end, change required again.
    uid = member["user_id"]
    r = await a.post(f"/api/v1/ops/field-staff/{uid}/reset-password")
    assert r.status_code == 200
    temp2 = r.json()["temporary_password"]
    r = await _login(_anon(), email, temp2)
    assert r.json()["must_change_password"] is True

    # Disable: live session stops working at once, login is refused.
    c2 = _anon()
    await _login(c2, email, temp2)
    r = await a.post(
        f"/api/v1/ops/field-staff/{uid}/status", json={"active": False, "reason": "left"}
    )
    assert r.status_code == 200 and r.json()["account_active"] is False
    assert (await c2.get("/api/v1/auth/me")).json() is None
    r = await _login(_anon(), email, temp2)
    assert r.status_code == 403 and r.json()["error"]["code"] == "account_disabled"
    # Wrong password on a disabled account gives the generic answer.
    assert (await _login(_anon(), email, "Wrong12345")).status_code == 401
    # Re-enable.
    r = await a.post(f"/api/v1/ops/field-staff/{uid}/status", json={"active": True})
    assert r.json()["account_active"] is True
    # Field roles can't use the patient phone login or the admin panel APIs.
    r = await _anon().post("/api/v1/auth/login/phone", json={"phone": phone})
    assert r.status_code == 401
    for client in (a, d, c, c2):
        await client.aclose()


async def test_password_reset_needs_both_codes(_fixed_codes):
    from app.core.security import hash_password

    email = f"tech.{secrets.token_hex(3)}@demo.qxl.test"
    user = await _make_user("courier", email=email, password_hash=hash_password("OldPass123"))
    c = _anon()

    unknown = await c.post(
        "/api/v1/auth/password/forgot", json={"identifier": "nobody@demo.qxl.test"}
    )
    assert unknown.status_code == 200
    r = await c.post("/api/v1/auth/password/forgot", json={"identifier": email})
    assert r.status_code == 200
    assert set(r.json()) == set(unknown.json()) and r.json()["message"] == unknown.json()["message"]
    reset_id = r.json()["reset_id"]
    sms_code = re.search(r"\b(\d{8})\b", [b for k, b in _fixed_codes if k == "sms"][-1]).group(1)
    email_code = re.search(r"\b(\d{8})\b", [b for k, b in _fixed_codes if k == "email"][-1]).group(
        1
    )
    assert sms_code != email_code

    # Unknown-account reset ids can never succeed.
    r = await c.post(
        "/api/v1/auth/password/reset",
        json={
            "reset_id": unknown.json()["reset_id"],
            "phone_code": sms_code,
            "email_code": email_code,
            "new_password": "NewPass2026",
        },
    )
    assert r.status_code == 401
    # SMS code alone isn't enough.
    r = await c.post(
        "/api/v1/auth/password/reset",
        json={
            "reset_id": reset_id,
            "phone_code": sms_code,
            "email_code": "00000000",
            "new_password": "NewPass2026",
        },
    )
    assert r.status_code == 401
    r = await c.post(
        "/api/v1/auth/password/reset",
        json={
            "reset_id": reset_id,
            "phone_code": sms_code,
            "email_code": email_code,
            "new_password": "NewPass2026",
        },
    )
    assert r.status_code == 204, r.text
    # Single use.
    r = await c.post(
        "/api/v1/auth/password/reset",
        json={
            "reset_id": reset_id,
            "phone_code": sms_code,
            "email_code": email_code,
            "new_password": "Other2026a",
        },
    )
    assert r.status_code == 401
    assert (await _login(_anon(), email, "OldPass123")).status_code == 401
    assert (await _login(_anon(), email, "NewPass2026")).status_code == 200

    # Five wrong tries burn the request.
    r = await c.post("/api/v1/auth/password/forgot", json={"identifier": email})
    rid = r.json()["reset_id"]
    for _ in range(5):
        await c.post(
            "/api/v1/auth/password/reset",
            json={
                "reset_id": rid,
                "phone_code": "99999999",
                "email_code": "99999999",
                "new_password": "Again2026a",
            },
        )
    sms2 = re.search(r"\b(\d{8})\b", [b for k, b in _fixed_codes if k == "sms"][-1]).group(1)
    em2 = re.search(r"\b(\d{8})\b", [b for k, b in _fixed_codes if k == "email"][-1]).group(1)
    r = await c.post(
        "/api/v1/auth/password/reset",
        json={"reset_id": rid, "phone_code": sms2, "email_code": em2, "new_password": "Again2026a"},
    )
    assert r.status_code == 401
    await c.aclose()
    _ = user


async def test_password_login_edge_cases():
    from app.core.security import hash_password

    # Phone-only patient (no password): a password attempt is a clean 401, not a crash.
    patient = await _make_user("patient")
    r = await _anon().post(
        "/api/v1/auth/login", json={"identifier": patient.phone, "password": "Whatever123"}
    )
    assert r.status_code == 401
    # Lockout after repeated wrong passwords, even with the right one afterwards.
    email = f"lock.{secrets.token_hex(3)}@demo.qxl.test"
    await _make_user("collector", email=email, password_hash=hash_password("Right2026a"))
    for _ in range(5):
        await _anon().post(
            "/api/v1/auth/login", json={"identifier": email, "password": "Wrong2026a"}
        )
    r = await _anon().post(
        "/api/v1/auth/login", json={"identifier": email, "password": "Right2026a"}
    )
    assert r.status_code == 401 and "locked" in r.json()["error"]["message"]
    # Wrong OTP five times invalidates the challenge.
    email2 = f"otp.{secrets.token_hex(3)}@demo.qxl.test"
    await _make_user("collector", email=email2, password_hash=hash_password("Right2026a"))
    c = _anon()
    ch = (
        await c.post("/api/v1/auth/login", json={"identifier": email2, "password": "Right2026a"})
    ).json()
    for _ in range(5):
        await c.post(
            "/api/v1/auth/login/otp", json={"challenge_id": ch["challenge_id"], "otp": "00000000"}
        )
    r = await c.post(
        "/api/v1/auth/login/otp", json={"challenge_id": ch["challenge_id"], "otp": OTP}
    )
    assert r.status_code == 401
    # No cookie, no access; forged cookie, no access.
    assert (await _anon().get("/api/v1/collector/me")).status_code == 401
    forged = _anon()
    forged.cookies.set("qxl_session", secrets.token_urlsafe(32))
    assert (await forged.get("/api/v1/ops/visits")).status_code == 401


# ── Razorpay ────────────────────────────────────────────────────────────────


async def _payment(amount: int = 119500):
    from app.db.session import AsyncSessionLocal
    from app.models.booking import Booking
    from app.models.payment import Payment

    async with AsyncSessionLocal() as db:
        b = Booking(
            patient_name="Pay Test",
            patient_phone=_phone(),
            collection_type="home",
            status="confirmed",
            payment_status="pending",
            amount_paise=amount,
        )
        db.add(b)
        await db.flush()
        p = Payment(
            booking_id=b.id,
            razorpay_order_id=f"order_{secrets.token_hex(6)}",
            amount=amount,
            currency="INR",
            status="created",
        )
        db.add(p)
        await db.commit()
        return p.razorpay_order_id, b.id


def _sig(secret: str, msg: bytes) -> str:
    return hmac.new(secret.encode(), msg, hashlib.sha256).hexdigest()


async def test_razorpay_verification(monkeypatch):
    from app.core.config import settings
    from app.db.session import AsyncSessionLocal
    from app.models.booking import Booking
    from app.services import payment_service

    monkeypatch.setattr(settings, "RAZORPAY_KEY_ID", "rzp_test_x")
    monkeypatch.setattr(settings, "RAZORPAY_KEY_SECRET", "test_secret")
    monkeypatch.setattr(settings, "RAZORPAY_WEBHOOK_SECRET", "hook_secret")
    remote: dict[str, dict] = {}
    run = secrets.token_hex(4)

    async def _fetch(pid):
        return remote.get(pid)

    monkeypatch.setattr(payment_service, "_fetch_razorpay_payment", _fetch)
    c = _anon()

    async def verify(order, pid, sig=None):
        return await c.post(
            "/api/v1/payments/verify",
            json={
                "razorpay_order_id": order,
                "razorpay_payment_id": pid,
                "razorpay_signature": sig or _sig("test_secret", f"{order}|{pid}".encode()),
            },
        )

    async def status_of(bid):
        async with AsyncSessionLocal() as db:
            return (await db.get(Booking, bid)).payment_status

    # Forged signature.
    order, bid = await _payment()
    assert (await verify(order, f"pay_x_{run}", sig="deadbeef")).status_code == 401
    # Valid signature but Razorpay says a smaller amount → not paid.
    remote[f"pay_small_{run}"] = {
        "id": f"pay_small_{run}",
        "order_id": order,
        "amount": 100,
        "currency": "INR",
        "status": "captured",
    }
    assert (await verify(order, f"pay_small_{run}")).status_code == 422
    assert await status_of(bid) == "pending"
    # Payment belonging to a different order.
    remote[f"pay_other_{run}"] = {
        "id": f"pay_other_{run}",
        "order_id": "order_other",
        "amount": 119500,
        "currency": "INR",
        "status": "captured",
    }
    assert (await verify(order, f"pay_other_{run}")).status_code == 422
    # Not captured yet / Razorpay unreachable → pending, never paid.
    remote[f"pay_failed_{run}"] = {
        "id": f"pay_failed_{run}",
        "order_id": order,
        "amount": 119500,
        "currency": "INR",
        "status": "failed",
    }
    r = await verify(order, f"pay_failed_{run}")
    assert r.status_code == 409 and r.json()["error"]["code"] == "payment_pending"
    assert (await verify(order, f"pay_unknown_{run}")).status_code == 409
    assert await status_of(bid) == "pending"
    # Genuine captured payment.
    remote[f"pay_ok_{run}"] = {
        "id": f"pay_ok_{run}",
        "order_id": order,
        "amount": 119500,
        "currency": "INR",
        "status": "captured",
    }
    r = await verify(order, f"pay_ok_{run}")
    assert r.status_code == 200 and r.json()["status"] == "paid"
    assert await status_of(bid) == "paid"
    # Replay is harmless.
    assert (await verify(order, f"pay_ok_{run}")).status_code == 200

    # Webhooks: bad signature rejected; wrong amount ignored; partial refund keeps paid.
    order2, bid2 = await _payment(50000)
    event = {
        "event": "payment.captured",
        "payload": {
            "payment": {
                "entity": {
                    "id": f"pay_w_{run}",
                    "order_id": order2,
                    "amount": 100,
                    "currency": "INR",
                    "status": "captured",
                }
            }
        },
    }
    raw = json.dumps(event).encode()
    r = await c.post(
        "/api/v1/payments/webhook", content=raw, headers={"x-razorpay-signature": "bad"}
    )
    assert r.status_code == 401
    r = await c.post(
        "/api/v1/payments/webhook",
        content=raw,
        headers={"x-razorpay-signature": _sig("hook_secret", raw)},
    )
    assert r.status_code == 200 and await status_of(bid2) == "pending"
    event["payload"]["payment"]["entity"]["amount"] = 50000
    raw = json.dumps(event).encode()
    await c.post(
        "/api/v1/payments/webhook",
        content=raw,
        headers={"x-razorpay-signature": _sig("hook_secret", raw)},
    )
    assert await status_of(bid2) == "paid"
    refund = {
        "event": "refund.processed",
        "payload": {
            "payment": {
                "entity": {
                    "id": f"pay_w_{run}",
                    "order_id": order2,
                    "amount": 50000,
                    "currency": "INR",
                    "amount_refunded": 10000,
                }
            }
        },
    }
    raw = json.dumps(refund).encode()
    await c.post(
        "/api/v1/payments/webhook",
        content=raw,
        headers={"x-razorpay-signature": _sig("hook_secret", raw)},
    )
    assert await status_of(bid2) == "paid"
    refund["payload"]["payment"]["entity"]["amount_refunded"] = 50000
    raw = json.dumps(refund).encode()
    await c.post(
        "/api/v1/payments/webhook",
        content=raw,
        headers={"x-razorpay-signature": _sig("hook_secret", raw)},
    )
    assert await status_of(bid2) == "refunded"
    await c.aclose()
    _ = uuid

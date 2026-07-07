"""Outbound SMS + email delivery for OTPs and the login verification link.

Uses Nettyfish SmartSMS (https://sms.nettyfish.com) for SMS and SMTP for email
when credentials are configured. In development (no credentials set), messages
are logged instead of sent so the flow is still testable locally — but
secrets/OTPs/tokens are always masked before being written to logs, never
printed in full.
"""
from __future__ import annotations

import asyncio
import smtplib
from email.mime.text import MIMEText

import httpx

from app.core.config import settings
from app.core.logging import get_logger

logger = get_logger(__name__)

_NETTYFISH_SEND_SMS_PATH = "/api/v2/SendSMS"


def _nettyfish_configured() -> bool:
    return bool(
        settings.NETTYFISH_API_KEY and settings.NETTYFISH_CLIENT_ID and settings.NETTYFISH_SENDER_ID
    )


def _smtp_configured() -> bool:
    return bool(settings.SMTP_HOST and settings.SMTP_FROM_EMAIL)


def _to_nettyfish_mobile(phone: str) -> str:
    """Nettyfish expects bare 10-digit Indian mobile numbers (no '+'/country code)."""
    digits = "".join(ch for ch in phone if ch.isdigit())
    if len(digits) > 10:
        digits = digits[-10:]
    return digits


async def send_sms(to_phone: str, body: str) -> bool:
    """Send an SMS via Nettyfish SmartSMS. Returns True if a real send succeeded."""
    if not _nettyfish_configured():
        logger.warning(
            "SMS not sent (Nettyfish not configured) — dev fallback log only. to=%s",
            _mask_for_log(to_phone),
        )
        return False
    payload = {
        "SenderId": settings.NETTYFISH_SENDER_ID,
        "Message": body,
        "MobileNumbers": _to_nettyfish_mobile(to_phone),
        "ApiKey": settings.NETTYFISH_API_KEY,
        "ClientId": settings.NETTYFISH_CLIENT_ID,
    }
    try:
        async with httpx.AsyncClient(base_url=settings.NETTYFISH_BASE_URL, timeout=10.0) as http:
            response = await http.post(_NETTYFISH_SEND_SMS_PATH, json=payload)
            response.raise_for_status()
            result = response.json()
        error_code = result.get("ErrorCode")
        if error_code != 0:
            logger.error(
                "Nettyfish SMS send failed for %s: code=%s desc=%s",
                _mask_for_log(to_phone),
                error_code,
                result.get("ErrorDescription"),
            )
            return False
        return True
    except Exception:  # noqa: BLE001
        logger.exception("Failed to send SMS to %s", _mask_for_log(to_phone))
        return False


async def send_email(to_email: str, subject: str, body: str) -> bool:
    """Send a plain-text email via SMTP. Returns True if a real send was attempted/succeeded."""
    if not _smtp_configured():
        logger.warning(
            "Email not sent (SMTP not configured) — dev fallback log only. to=%s subject=%s",
            _mask_for_log(to_email),
            subject,
        )
        return False
    try:
        def _send() -> None:
            msg = MIMEText(body)
            msg["Subject"] = subject
            msg["From"] = settings.SMTP_FROM_EMAIL
            msg["To"] = to_email
            with smtplib.SMTP(settings.SMTP_HOST, settings.SMTP_PORT, timeout=10) as server:
                if settings.SMTP_USE_TLS:
                    server.starttls()
                if settings.SMTP_USERNAME:
                    server.login(settings.SMTP_USERNAME, settings.SMTP_PASSWORD)
                server.sendmail(settings.SMTP_FROM_EMAIL, [to_email], msg.as_string())

        await asyncio.to_thread(_send)
        return True
    except Exception:  # noqa: BLE001
        logger.exception("Failed to send email to %s", _mask_for_log(to_email))
        return False


def _mask_for_log(identifier: str) -> str:
    if "@" in identifier:
        local, _, domain = identifier.partition("@")
        return f"{local[:1]}***@{domain}"
    return f"***{identifier[-3:]}" if len(identifier) > 3 else "***"

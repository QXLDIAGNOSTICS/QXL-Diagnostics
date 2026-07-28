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
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText

import httpx

from app.core.config import settings
from app.core.logging import get_logger
from app.services.email_html import render_html_email

logger = get_logger(__name__)

_NETTYFISH_SEND_SMS_PATH = "/api/v2/SendSMS"


def _nettyfish_configured(template_id: str) -> bool:
    return bool(
        settings.NETTYFISH_API_KEY
        and settings.NETTYFISH_CLIENT_ID
        and settings.NETTYFISH_SENDER_ID
        and template_id
        and settings.NETTYFISH_PRINCIPLE_ENTITY_ID
    )


def _smtp_configured() -> bool:
    return bool(settings.SMTP_HOST and settings.SMTP_FROM_EMAIL)


def _to_nettyfish_mobile(phone: str) -> str:
    """Nettyfish expects bare 10-digit Indian mobile numbers (no '+'/country code)."""
    digits = "".join(ch for ch in phone if ch.isdigit())
    if len(digits) == 13 and digits.startswith("091"):
        return digits[3:]
    if len(digits) == 12 and digits.startswith("91"):
        return digits[2:]
    if len(digits) == 11 and digits.startswith("0"):
        return digits[1:]
    if len(digits) == 10:
        return digits
    raise ValueError(f"Invalid Indian mobile number: {phone}")


async def send_sms(to_phone: str, body: str, *, template_id: str | None = None) -> bool:
    """Send an SMS via Nettyfish SmartSMS. Returns True if a real send succeeded.

    ``template_id`` should be the DLT-approved template ID whose registered
    wording matches ``body`` (see NETTYFISH_DLT_TEMPLATES.md). Omitting it
    entirely (``None``) falls back to the OTP template, for backward
    compatibility with the login/OTP call site. Passing an explicit empty
    string (as ``notification_templates.get_template_id`` does when a
    notification type's template hasn't been registered/approved yet) is
    NOT treated the same as omitting it — it must skip the send rather than
    silently reusing the unrelated OTP template with mismatched body text.
    """
    resolved_template_id = settings.NETTYFISH_TEMPLATE_ID if template_id is None else template_id
    if not _nettyfish_configured(resolved_template_id):
        logger.warning(
            "SMS not sent (Nettyfish not configured, or no DLT template ID set for this "
            "message type) — dev fallback log only. to=%s",
            _mask_for_log(to_phone),
        )
        return False
    try:
        mobile_numbers = _to_nettyfish_mobile(to_phone)
    except ValueError:
        logger.error("SMS not sent (invalid phone format): to=%s", _mask_for_log(to_phone))
        return False

    payload = {
        "SenderId": settings.NETTYFISH_SENDER_ID,
        "Is_Unicode": False,
        "Is_Flash": False,
        "IsRegisteredForDelivery": True,
        "ValidityPeriod": settings.NETTYFISH_VALIDITY_PERIOD,
        "DataCoding": "0",
        "SchedTime": "",
        "GroupId": "",
        "Message": body,
        "MobileNumbers": mobile_numbers,
        "ServiceId": settings.NETTYFISH_SERVICE_ID,
        "CoRelator": "",
        "LinkId": "",
        "PrincipleEntityId": settings.NETTYFISH_PRINCIPLE_ENTITY_ID,
        "TemplateId": resolved_template_id,
        "ApiKey": settings.NETTYFISH_API_KEY,
        "ClientId": settings.NETTYFISH_CLIENT_ID,
    }
    try:
        async with httpx.AsyncClient(base_url=settings.NETTYFISH_BASE_URL, timeout=10.0) as http:
            response = await http.post(
                _NETTYFISH_SEND_SMS_PATH,
                headers={"Type": "json"},
                json=payload,
            )
            response.raise_for_status()
            result = response.json()

        error_code_raw = result.get("ErrorCode")
        error_code = str(error_code_raw).strip() if error_code_raw is not None else ""
        # Nettyfish may return either int 0 or string "0" for success.
        if error_code not in {"0", ""}:
            logger.error(
                "Nettyfish SMS send failed for %s: code=%s desc=%s result=%s",
                _mask_for_log(to_phone),
                error_code,
                result.get("ErrorDescription"),
                result,
            )
            return False

        # Some provider responses report top-level success but include per-recipient failure.
        data = result.get("Data")
        if isinstance(data, list):
            for item in data:
                if not isinstance(item, dict):
                    continue
                msg_code = str(item.get("MessageErrorCode", "")).strip()
                if msg_code and msg_code != "0":
                    logger.error(
                        "Nettyfish SMS recipient failed for %s: msg_code=%s msg_desc=%s result=%s",
                        _mask_for_log(to_phone),
                        msg_code,
                        item.get("MessageErrorDescription"),
                        result,
                    )
                    return False

        return True
    except Exception:  # noqa: BLE001
        logger.exception("Failed to send SMS to %s", _mask_for_log(to_phone))
        return False


async def send_email(
    to_email: str,
    subject: str,
    body: str,
    *,
    html_body: str | None = None,
    cta_label: str | None = None,
    cta_url: str | None = None,
    unsubscribe_url: str | None = None,
) -> bool:
    """Send an email via SMTP. Returns True if a real send was attempted/succeeded.

    Always sends a proper branded HTML page (with the original plain text as
    the ``text/plain`` fallback part) — ``body`` alone is never sent raw.
    Pass ``html_body`` to override the auto-generated HTML entirely (e.g. for
    a template that needs bespoke layout); otherwise one is rendered from
    ``body`` via :func:`app.services.email_html.render_html_email`. Pass
    ``unsubscribe_url`` for automated/marketing-style emails only.
    """
    if not _smtp_configured():
        logger.warning(
            "Email not sent (SMTP not configured) — dev fallback log only. to=%s subject=%s",
            _mask_for_log(to_email),
            subject,
        )
        return False
    try:
        resolved_html = html_body or render_html_email(
            subject, body, cta_label=cta_label, cta_url=cta_url, unsubscribe_url=unsubscribe_url
        )

        def _send() -> None:
            msg = MIMEMultipart("alternative")
            msg["Subject"] = subject
            msg["From"] = settings.SMTP_FROM_EMAIL
            msg["To"] = to_email
            msg.attach(MIMEText(body, "plain"))
            msg.attach(MIMEText(resolved_html, "html"))
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

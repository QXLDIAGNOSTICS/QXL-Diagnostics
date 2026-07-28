"""Public-facing unsubscribe/suppression-list logic.

Two entry points into the suppression list (``ContactOptOut``):
1. A one-click link in marketing/reminder emails, resolved via a booking's
   ``unsubscribe_token`` (no login required).
2. A self-service form on the public ``/unsubscribe`` page where anyone can
   type their own email/phone and opt out directly.

Either path only ever *adds* a suppression — see
``booking_notification_service._dispatch`` for where it's enforced, and
``app.models.contact_optout`` for which message types it applies to
(automated marketing/reminders only, never transactional messages).
"""
from __future__ import annotations

from sqlalchemy.ext.asyncio import AsyncSession

from app.core.exceptions import ValidationError
from app.models.booking import Booking
from app.repositories.contact_optout_repository import ContactOptOutRepository


def _mask_email(email: str | None) -> str | None:
    if not email or "@" not in email:
        return None
    local, _, domain = email.partition("@")
    visible = local[:2] if len(local) > 2 else local[:1]
    return f"{visible}{'*' * max(len(local) - len(visible), 1)}@{domain}"


def _mask_phone(phone: str | None) -> str | None:
    if not phone:
        return None
    digits = "".join(ch for ch in phone if ch.isdigit())
    if len(digits) < 4:
        return None
    return f"{'*' * (len(digits) - 4)}{digits[-4:]}"


async def _booking_from_token(db: AsyncSession, token: str) -> Booking:
    from sqlalchemy import select

    row = (await db.execute(select(Booking).where(Booking.unsubscribe_token == token))).scalar_one_or_none()
    if row is None:
        raise ValidationError("This unsubscribe link is invalid or has expired.")
    return row


async def lookup(db: AsyncSession, *, token: str) -> dict:
    booking = await _booking_from_token(db, token)
    repo = ContactOptOutRepository(db)
    existing = await repo.find_all(email=booking.patient_email, phone=booking.patient_phone)
    return {
        "masked_email": _mask_email(booking.patient_email),
        "masked_phone": _mask_phone(booking.patient_phone),
        "already_opted_out_email": any(r.opt_out_email for r in existing),
        "already_opted_out_sms": any(r.opt_out_sms for r in existing),
    }


async def unsubscribe(
    db: AsyncSession, *, token: str | None, email: str | None, phone: str | None, channel: str
) -> dict:
    if token:
        booking = await _booking_from_token(db, token)
        email = email or booking.patient_email
        phone = phone or booking.patient_phone

    email = (email or "").strip() or None
    phone = (phone or "").strip() or None
    if not email and not phone:
        raise ValidationError("Please provide the email or phone number you'd like to unsubscribe.")

    await ContactOptOutRepository(db).set_opt_out(email=email, phone=phone, channel=channel)
    await db.commit()

    scope = {"email": "email", "sms": "SMS", "both": "email and SMS"}[channel]
    return {"ok": True, "message": f"You've been unsubscribed from promotional/reminder {scope} messages."}


async def resubscribe(
    db: AsyncSession, *, token: str | None, email: str | None, phone: str | None, channel: str
) -> dict:
    if token:
        booking = await _booking_from_token(db, token)
        email = email or booking.patient_email
        phone = phone or booking.patient_phone

    email = (email or "").strip() or None
    phone = (phone or "").strip() or None
    if not email and not phone:
        raise ValidationError("Please provide the email or phone number you'd like to resubscribe.")

    await ContactOptOutRepository(db).clear_opt_out(email=email, phone=phone, channel=channel)
    await db.commit()
    return {"ok": True, "message": "You're back on the list — thanks for staying with us!"}

"""Repository for ContactOptOut (marketing/automation suppression list).

Contacts are matched by normalised email (lowercased) and/or phone (last 10
digits, so ``+91 99646 39639``, ``9964639639`` and ``09964639639`` are all
treated as the same contact) — bookings don't always store phone numbers in
the same format, so exact-string matching would silently miss opt-outs.
"""
from __future__ import annotations

from sqlalchemy import or_, select
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.contact_optout import ContactOptOut


def normalize_email(email: str | None) -> str | None:
    e = (email or "").strip().lower()
    return e or None


def normalize_phone(phone: str | None) -> str | None:
    digits = "".join(ch for ch in (phone or "") if ch.isdigit())
    return digits[-10:] if len(digits) >= 10 else (digits or None)


class ContactOptOutRepository:
    def __init__(self, db: AsyncSession) -> None:
        self.db = db

    async def find_all(self, *, email: str | None, phone: str | None) -> list[ContactOptOut]:
        email_n = normalize_email(email)
        phone_n = normalize_phone(phone)
        if not email_n and not phone_n:
            return []
        conditions = []
        if email_n:
            conditions.append(ContactOptOut.email == email_n)
        if phone_n:
            conditions.append(ContactOptOut.phone == phone_n)
        rows = (await self.db.execute(select(ContactOptOut).where(or_(*conditions)))).scalars().all()
        return list(rows)

    async def is_opted_out(self, *, email: str | None, phone: str | None, channel: str) -> bool:
        """``channel`` is 'email' or 'sms' (the specific leg about to be sent)."""
        rows = await self.find_all(email=email, phone=phone)
        if channel == "email":
            return any(r.opt_out_email for r in rows)
        return any(r.opt_out_sms for r in rows)

    async def set_opt_out(self, *, email: str | None, phone: str | None, channel: str) -> ContactOptOut:
        """``channel``: 'email' | 'sms' | 'both'. Upserts a single suppression
        record for this contact (matched by either identifier)."""
        email_n = normalize_email(email)
        phone_n = normalize_phone(phone)
        existing = await self.find_all(email=email_n, phone=phone_n)
        row = existing[0] if existing else None
        if row is None:
            row = ContactOptOut(email=email_n, phone=phone_n)
            self.db.add(row)
        else:
            row.email = row.email or email_n
            row.phone = row.phone or phone_n
        if channel in {"email", "both"}:
            row.opt_out_email = True
        if channel in {"sms", "both"}:
            row.opt_out_sms = True
        await self.db.flush()
        return row

    async def clear_opt_out(self, *, email: str | None, phone: str | None, channel: str) -> None:
        for row in await self.find_all(email=email, phone=phone):
            if channel in {"email", "both"}:
                row.opt_out_email = False
            if channel in {"sms", "both"}:
                row.opt_out_sms = False
        await self.db.flush()

    async def list_all(self, limit: int = 500) -> list[ContactOptOut]:
        rows = (
            await self.db.execute(
                select(ContactOptOut).order_by(ContactOptOut.created_at.desc()).limit(limit)
            )
        ).scalars().all()
        return list(rows)

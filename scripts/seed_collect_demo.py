"""Seed a local QXL Collect demo: staff accounts, a field profile and a PIN code.

LOCAL DEVELOPMENT ONLY. Refuses to run when ENVIRONMENT=production.

    ENVIRONMENT=development QXL_DEMO_PASSWORD='<choose one>' \\
    DATABASE_URL=postgresql+asyncpg://... uv run python scripts/seed_collect_demo.py

Creates (or updates) these accounts, all with QXL_DEMO_PASSWORD:

    admin@demo.qxl.test        Administrator    admin panel (creates field staff logins)
    dispatcher@demo.qxl.test   Dispatcher       admin panel → Home collection ops
    lab@demo.qxl.test          Lab Reporting    admin panel → Lab receiving / reports
    collector@demo.qxl.test    Collector        QXL Collector app (phone +919000000001)
    courier@demo.qxl.test      Courier          QXL Collector app (phone +919000000002)

Patients sign in to the patient app with any phone number via OTP; in
development the OTP is printed in the backend log instead of being sent.

It also adds PIN 560040 (zone "demo") as a service area routed to the first
active centre, and fills in sample/container details on active tests that
have none so the collector app can show what to draw. The `.test` domain
can never receive real email.
"""

from __future__ import annotations

import asyncio
import os
import sys

from sqlalchemy import select

DEMO_ZONE = "demo"
DEMO_PIN = "560040"
ACCOUNTS = [
    # email, phone, name, role
    ("admin@demo.qxl.test", "+919000000009", "Demo Admin", "admin"),
    ("dispatcher@demo.qxl.test", "+919000000010", "Demo Dispatcher", "dispatcher"),
    ("lab@demo.qxl.test", "+919000000011", "Demo Lab", "lab_reporting"),
    ("collector@demo.qxl.test", "+919000000001", "Ravi Kumar", "collector"),
    ("courier@demo.qxl.test", "+919000000002", "Suresh Courier", "courier"),
]
# Generic container guidance by keyword — demo data only, not clinical rules.
CONTAINERS = [
    ("lipid", "Serum", "SST", True),
    ("glucose", "Plasma", "Fluoride", True),
    ("sugar", "Plasma", "Fluoride", True),
    ("hba1c", "Whole blood", "EDTA", False),
    ("cbc", "Whole blood", "EDTA", False),
    ("blood count", "Whole blood", "EDTA", False),
    ("urine", "Urine", "Urine container", False),
    ("liver function", "Serum", "SST", False),
    ("hormone", "Serum", "SST", False),
    ("serum", "Serum", "SST", False),
]


async def main() -> None:
    from app.core.config import settings
    from app.core.security import hash_password
    from app.db.session import AsyncSessionLocal
    from app.models.catalog import Center, TestCatalog
    from app.models.collect import CollectorProfile, ServiceArea
    from app.models.user import User

    if settings.ENVIRONMENT == "production" or os.getenv("ENVIRONMENT") == "production":
        sys.exit("Refusing to seed demo data in production.")
    password = os.getenv("QXL_DEMO_PASSWORD", "")
    if len(password) < 10:
        sys.exit("Set QXL_DEMO_PASSWORD (10+ characters).")

    async with AsyncSessionLocal() as db:
        users: dict[str, User] = {}
        for email, phone, name, role in ACCOUNTS:
            user = (await db.execute(select(User).where(User.email == email))).scalar_one_or_none()
            if user is None:
                user = User(email=email, phone=phone, name=name)
                db.add(user)
            user.role = role
            user.name = name
            user.password_hash = hash_password(password)
            user.is_email_verified = True
            user.is_phone_verified = True
            user.failed_login_attempts = 0
            user.locked_until = None
            user.is_active = True
            user.must_change_password = False
            users[role] = user
        await db.flush()

        for role, code in (("collector", "QXL-C-001"), ("courier", "QXL-T-001")):
            u = users[role]
            profile = await db.get(CollectorProfile, u.id)
            if profile is None:
                profile = CollectorProfile(user_id=u.id, employee_code=code)
                db.add(profile)
            profile.display_name = u.name
            profile.contact_phone = u.phone
            profile.zone = DEMO_ZONE
            profile.shift_start = "06:00"
            profile.shift_end = "21:00"
            profile.working_days = [0, 1, 2, 3, 4, 5, 6]
            profile.max_daily_jobs = 30
            profile.is_active = True

        centre = (
            await db.execute(
                select(Center)
                .where(Center.is_active.is_(True))
                .order_by(Center.sort_order)
                .limit(1)
            )
        ).scalar_one_or_none()
        area = (
            await db.execute(select(ServiceArea).where(ServiceArea.pincode == DEMO_PIN))
        ).scalar_one_or_none()
        if area is None:
            area = ServiceArea(pincode=DEMO_PIN)
            db.add(area)
        area.locality = "Malleswaram (demo)"
        area.zone = DEMO_ZONE
        area.is_active = True
        area.lab_center_id = centre.id if centre else None

        filled = 0
        active_tests = await db.execute(select(TestCatalog).where(TestCatalog.is_active.is_(True)))
        for test in active_tests.scalars():
            if test.container_type:
                continue
            name = test.name.lower()
            for key, sample, container, fasting in CONTAINERS:
                if key in name:
                    test.sample_type, test.container_type = sample, container
                    test.fasting_required = test.fasting_required or fasting
                    filled += 1
                    break

        await db.commit()
        print(f"Seeded {len(ACCOUNTS)} staff accounts, PIN {DEMO_PIN} → zone '{DEMO_ZONE}'"
              f" (lab: {centre.name if centre else 'none'}), sample details on {filled} tests.")


if __name__ == "__main__":
    asyncio.run(main())

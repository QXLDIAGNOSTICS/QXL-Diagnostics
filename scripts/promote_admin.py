"""One-off CLI to promote a user to admin, by email.

Usage (from qxl-backend/):
    uv run python scripts/promote_admin.py user@example.com

The user must have already logged in at least once (so a row exists in
``users``). Subsequent admins should be promoted via the admin-only
PATCH /api/v1/admin/users/{id}/role endpoint, not this script.
"""
from __future__ import annotations

import asyncio
import sys

from sqlalchemy import select

from app.db.session import AsyncSessionLocal
from app.models.user import User


async def promote(email: str) -> None:
    async with AsyncSessionLocal() as db:
        result = await db.execute(select(User).where(User.email == email))
        user = result.scalar_one_or_none()
        if user is None:
            print(f"No user found with email {email!r}. Log in once first, then retry.")
            sys.exit(1)
        user.role = "admin"
        await db.commit()
        print(f"Promoted {email} (id={user.id}) to admin.")


if __name__ == "__main__":
    if len(sys.argv) != 2:
        print("Usage: python scripts/promote_admin.py <email>")
        sys.exit(1)
    asyncio.run(promote(sys.argv[1]))

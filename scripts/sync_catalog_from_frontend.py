"""Add every test/package the public website lets patients book to the
backend ``test_catalog``, so bookings for them resolve to a real catalog row
(with a server-side price) instead of being rejected as "not a recognised
test".

Only items with no catalog row of the same (normalized) name are inserted —
existing tests/packages are left untouched and listed (with any price
difference flagged), so admin-entered names/prices always win. Matching is
exact on purpose: the website lists many similarly-named but distinct tests
("Kidney Function Test Panel" vs "Liver Function Test Panel").
Items go into ``test_catalog`` (not ``health_packages``) so the homepage's
package carousels, which render ``health_packages``, don't change.

Usage (from qxl-backend/):
    node scripts/export_frontend_catalog.cjs ../qxl-frontend /tmp/catalog.json
    uv run python scripts/sync_catalog_from_frontend.py /tmp/catalog.json [--apply]

Without --apply it's a dry run.
"""
from __future__ import annotations

import asyncio
import json
import re
import sys

from app.db.session import AsyncSessionLocal
from app.models.catalog import TestCatalog
from app.repositories.package_repository import HealthPackageRepository, TestCatalogRepository
from app.services.booking_service import _catalog_match_stage, _normalize_catalog_name
from app.services.catalog_service import slugify

# Earlier sources win when the website itself lists different prices for the
# same item; masterCatalogue.ts is the site's declared single source of truth.
SOURCE_PRIORITY = [
    "master",
    "book",
    "tests:TESTS",
    "packages:PACKAGES",
    "packagesCatalogue:PREVENTIVE_PACKAGES",
    "testsData:topTests",
]


def _turnaround_hours(tat: str | None) -> int | None:
    """'6 Hours (Same Day)' -> 6, '3–5 Days' -> 120, 'Reports same day' -> 24."""
    if not tat:
        return None
    text = tat.lower()
    nums = [int(n) for n in re.findall(r"\d+", text)]
    if "day" in text and nums:
        return max(nums) * 24
    if ("hour" in text or "hr" in text) and nums:
        return max(nums)
    if "same day" in text:
        return 24
    if "next morning" in text:
        return 24
    return None


def _pick(items: list[dict]) -> list[dict]:
    rank = {s: i for i, s in enumerate(SOURCE_PRIORITY)}
    chosen: dict[str, dict] = {}
    for item in sorted(items, key=lambda i: rank.get(i["source"], len(rank))):
        key = _normalize_catalog_name(item["name"])
        if key and key not in chosen and item.get("price"):
            chosen[key] = item
    return list(chosen.values())


async def main(path: str, apply: bool) -> None:
    with open(path) as f:  # noqa: ASYNC230 - one-off CLI script
        items = _pick(json.load(f))
    async with AsyncSessionLocal() as db:
        tests = await TestCatalogRepository(db).get_all_active()
        packages = await HealthPackageRepository(db).get_all_active()
        existing_slugs = {t.slug for t in tests}
        inserted, matched = [], []
        for item in items:
            match = _catalog_match_stage(
                item["name"], tests, name_getter=lambda t: t.name, stage="exact"
            ) or _catalog_match_stage(
                item["name"], packages, name_getter=lambda p: p.name, stage="exact"
            )
            if match is not None:
                matched.append((item, match))
                continue

            slug = base = slugify(item["name"])
            n = 2
            while slug in existing_slugs:
                slug, n = f"{base}-{n}", n + 1
            existing_slugs.add(slug)
            row = TestCatalog(
                name=item["name"],
                slug=slug,
                category=item.get("category"),
                description=item.get("includes") or item.get("params"),
                price=int(item["price"]),
                preparation=item.get("fasting"),
                turnaround_hours=_turnaround_hours(item.get("tat")),
                home_collection_available=bool(item.get("home", True)),
                is_active=True,
            )
            inserted.append(row)
            # Later items must see this one, exactly as bookings will.
            tests.append(row)

        for item, match in matched:
            flag = "" if int(item["price"]) == int(match.price or 0) else "  <-- PRICE DIFFERS"
            print(
                f"[matched] {item['name']!r} (site Rs.{item['price']}) -> "
                f"{match.name!r} (db Rs.{match.price}){flag}"
            )
        for row in inserted:
            print(f"[insert] {row.name!r} Rs.{row.price} slug={row.slug}")
        print(
            f"\n{len(items)} website items: {len(matched)} already in catalog, "
            f"{len(inserted)} to insert"
        )

        if apply and inserted:
            db.add_all(inserted)
            await db.commit()
            print(f"Inserted {len(inserted)} tests.")
        elif not apply:
            print("Dry run — pass --apply to insert.")


if __name__ == "__main__":
    if len(sys.argv) < 2:
        sys.exit(__doc__)
    asyncio.run(main(sys.argv[1], "--apply" in sys.argv))

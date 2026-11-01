"""Load the content that used to be hard-coded in qxl-frontend into the CMS
tables, so the admin panel manages it and the public site reads it from the API.

Sources (scripts/seed_data/*.json, produced by scripts/export_frontend_cms.cjs):
  specialities.json  -> ``specialities``   (10 landing pages)
  team.json          -> ``doctors``        (founder + consultants; matched to existing rows by name)
  packages.json      -> ``health_packages`` (the 49-package canonical catalogue)

Usage (from qxl-backend/):
    uv run python scripts/seed_cms_from_frontend.py [--apply] [--upload-images]
                                                    [--only specialities,team,packages]

Without --apply it is a dry run that only prints what would change. Existing
rows are never overwritten wholesale: only empty fields are filled in, so
anything an admin has edited is kept. (The two deliberate exceptions, a doctor's
``qualification`` and ``image_url``, are reported as "differs" and applied only
for the founder/consultants because the public team page is their source of
truth.)

--upload-images (with --apply) copies the externally hosted images (Unsplash
hero photos, the local founder photo) to Cloudinary; the resulting URLs are
cached in scripts/seed_data/uploaded_images.json so re-runs against another
database reuse them instead of uploading again.
"""

from __future__ import annotations

import argparse
import asyncio
import json
import mimetypes
import re
import sys
from pathlib import Path

from sqlalchemy import select

sys.path.insert(0, str(Path(__file__).resolve().parent.parent))

from app.core.config import settings  # noqa: E402
from app.db.session import AsyncSessionLocal  # noqa: E402
from app.models.catalog import HealthPackage  # noqa: E402
from app.models.content import Doctor, Speciality  # noqa: E402
from app.services import cloudinary_service  # noqa: E402

SEED_DIR = Path(__file__).resolve().parent / "seed_data"
FRONTEND_PUBLIC = Path(__file__).resolve().parent.parent.parent / "qxl-frontend" / "public"
UPLOAD_MAP = SEED_DIR / "uploaded_images.json"
LEGACY_MAP = (
    Path(__file__).resolve().parent / "cloudinary_image_map.json"
)  # local /image/... -> Cloudinary

# Packages the homepage "recommended" carousel never showed (see isSpidyOffer in
# qxl-frontend/src/app/page.tsx); they must not be flagged show_on_home.
_HIDDEN_WORDS = ("spidy", "nothing", "swing", "eat", "jump", "sleep", "100% off")


def _norm(name: str) -> str:
    name = re.sub(r"^dr\.?\s+", "", name.strip().lower()).replace("&", " and ")
    return re.sub(r"[^a-z0-9]+", "", name)


def _same_image(a: str | None, b: str | None) -> bool:
    """Same Cloudinary asset, ignoring the delivery transform (``f_auto,q_auto``)."""
    strip = lambda u: re.sub(r"/upload/[^/]*?(?:f_auto|q_auto)[^/]*/", "/upload/", u or "")  # noqa: E731
    return strip(a) == strip(b)


def _load(name: str) -> list[dict]:
    return json.loads((SEED_DIR / name).read_text())


class Images:
    """Resolve a seed image reference to a Cloudinary URL (uploading if asked)."""

    def __init__(self, apply: bool, upload: bool) -> None:
        self.apply = apply
        self.upload = upload
        self.cache: dict[str, str] = (
            json.loads(UPLOAD_MAP.read_text()) if UPLOAD_MAP.exists() else {}
        )
        self.legacy: dict[str, str] = json.loads(LEGACY_MAP.read_text())
        self.pending: list[str] = []

    async def resolve(self, src: str | None, *, public_id: str, folder: str) -> str | None:
        if not src or "res.cloudinary.com" in src:
            return src
        if src in self.cache:
            return self.cache[src]
        if src in self.legacy:  # already uploaded by scripts/migrate_images_to_cloudinary.py
            return self.legacy[src]
        if not (self.apply and self.upload):
            self.pending.append(src)
            return src
        full_folder = f"{settings.CLOUDINARY_UPLOAD_FOLDER}/{folder}"
        if src.startswith("http"):
            url = await cloudinary_service.upload_remote(
                src, public_id=public_id, folder=full_folder
            )
        else:
            path = FRONTEND_PUBLIC / src.lstrip("/")
            ctype = mimetypes.guess_type(path.name)[0] or "image/jpeg"
            url = await cloudinary_service.upload_image(path.read_bytes(), path.name, ctype)
        self.cache[src] = url
        UPLOAD_MAP.write_text(json.dumps(self.cache, indent=1))
        print(f"    uploaded {src[:60]} -> {url}")
        return url


async def seed_specialities(db, images: Images, apply: bool) -> None:
    print("\n== specialities")
    existing = {s.slug: s for s in (await db.execute(select(Speciality))).scalars().all()}
    for seed in _load("specialities.json"):
        if seed["slug"] in existing:
            row = existing[seed["slug"]]
            filled = [
                f
                for f, v in seed.items()
                if f not in ("slug", "name", "sort_order", "is_active", "hero_image_url")
                and v not in (None, [], "", {})
                and getattr(row, f, None) in (None, [], "", {})
            ]
            for f in filled:
                setattr(row, f, seed[f])
            print(
                f"  [exists]  {seed['slug']}: "
                + (f"filled empty {', '.join(filled)}" if filled else "nothing to fill")
            )
            continue
        row = dict(seed)
        row["hero_image_url"] = await images.resolve(
            row.get("hero_image_url"), public_id=f"{seed['slug']}-hero", folder="specialities"
        )
        print(
            f"  [insert]  {seed['slug']}: {len(row['profiles'])} profiles, {len(row['faqs'])} faqs"
        )
        if apply:
            db.add(Speciality(**row))


async def seed_team(db, images: Images, apply: bool) -> None:
    print("\n== team (doctors)")
    doctors = (await db.execute(select(Doctor))).scalars().all()
    by_name = {_norm(d.name): d for d in doctors}
    fill_if_empty = (
        "title",
        "short_title",
        "qualification",
        "card_qualification",
        "bio",
        "experience",
        "expertise",
        "achievements",
        "contribution",
        "department",
        "registration_number",
        "profile_path",
        "image_position",
    )
    for seed in _load("team.json"):
        seed = dict(seed)
        seed["image_url"] = await images.resolve(
            seed.get("image_url"), public_id=Path(seed["profile_path"]).name, folder="team"
        )
        seed["card_image_url"] = await images.resolve(
            seed.get("card_image_url"),
            public_id=Path(seed["profile_path"]).name + "-card",
            folder="team",
        )
        doc = by_name.get(_norm(seed["name"]))
        if doc is None:
            print(f"  [insert]  {seed['name']}")
            if apply:
                from app.services.catalog_service import slugify

                db.add(Doctor(slug=slugify(seed["name"]), is_active=True, **seed))
            continue
        changes: list[str] = []
        for field in fill_if_empty:
            if seed.get(field) and not getattr(doc, field):
                setattr(doc, field, seed[field])
                changes.append(field)
        if seed["is_founder"] and not doc.is_founder:
            doc.is_founder = True
            changes.append("is_founder")
        if doc.sort_order != seed["sort_order"]:
            changes.append(f"sort_order {doc.sort_order}->{seed['sort_order']}")
            doc.sort_order = seed["sort_order"]
        for field in ("card_image_url",):  # empty-only, like the text fields above
            if seed.get(field) and not getattr(doc, field):
                setattr(doc, field, seed[field])
                changes.append(field)
        # The homepage card photo is what visitors see most; the DB's older
        # photo (used by /doctors) is replaced by it when they differ.
        for field in ("image_url",):
            if field == "image_url" and _same_image(doc.image_url, seed.get(field)):
                continue
            if seed.get(field) and getattr(doc, field) != seed[field]:
                changes.append(f"{field} differs: {getattr(doc, field)!r} -> {seed[field]!r}")
                setattr(doc, field, seed[field])
        print(f"  [update]  {doc.name}: {', '.join(changes) or 'nothing to change'}")


def _is_hidden_from_home(pkg: HealthPackage) -> bool:
    name = (pkg.name or "").lower()
    return any(w in name for w in _HIDDEN_WORDS) or (pkg.price or 0) <= 1 or pkg.price == 800


async def seed_packages(db, apply: bool) -> None:
    print("\n== packages")
    rows = (await db.execute(select(HealthPackage))).scalars().all()
    by_name = {_norm(p.name): p for p in rows}
    # Admin-renamed packages (e.g. "Q-Oncoscreen Package" for the site's
    # "Q-Oncology Biomarker Panel") are matched by identical price + MRP.
    by_price = {(p.price, p.old_price): p for p in rows if p.price > 1 and p.old_price}
    slugs = {p.slug for p in rows}
    claimed: set[str] = set()

    # Packages already live on the site's homepage keep showing there. Only
    # done on the first run, i.e. before any package carries the flag, so
    # packages added later (by this script or the admin) aren't swept in.
    for pkg in rows if not any(p.show_on_home for p in rows) else []:
        if pkg.is_active and not _is_hidden_from_home(pkg):
            pkg.show_on_home = True
            print(f"  [home]    {pkg.name}: show_on_home")

    for seed in _load("packages.json"):
        price = seed["price"]
        details = {k: v for k, v in seed["details"].items() if v not in (None, [], "")}
        match = by_name.get(_norm(seed["name"]))
        if match is None and price and seed["mrp"]:
            match = by_price.get((price, seed["mrp"]))
        if match is not None and match.slug in claimed:
            match = None
        if match is not None:
            claimed.add(match.slug)
            changes = []
            for field, value in (
                ("category", seed["category"]),
                ("parameters", seed["parameters"]),
                ("includes", seed["includes"]),
                ("tag", (seed["tag"] or "")[:32] or None),
            ):
                if value and not getattr(match, field):
                    setattr(match, field, value)
                    changes.append(field)
            if seed["highlights"] and not match.benefits:
                match.benefits = json.dumps(seed["highlights"])
                changes.append("benefits")
            if details and not match.details:
                match.details = details
                changes.append("details")
            if match.sort_order != seed["sort_order"]:
                match.sort_order = seed["sort_order"]  # keep /packages in the site's original order
                changes.append("sort_order")
            if seed["most_booked"] and not match.most_booked:
                match.most_booked = True
                changes.append("most_booked")
            diffs = []
            if price and match.price != price:
                diffs.append(f"price DB={match.price} site={price}")
            if seed["mrp"] and match.old_price != seed["mrp"]:
                diffs.append(f"old_price DB={match.old_price} site={seed['mrp']}")
            renamed = (
                f" (site calls it {seed['name']!r})"
                if _norm(match.name) != _norm(seed["name"])
                else ""
            )
            print(
                f"  [update]  {match.name}{renamed}: {', '.join(changes) or 'nothing to fill'}"
                + (f"  !! kept DB value: {'; '.join(diffs)}" if diffs else "")
            )
            continue

        slug = seed["slug"]
        while slug in slugs:
            slug += "-2"
        slugs.add(slug)
        priced = bool(price)
        pkg = HealthPackage(
            name=seed["name"],
            slug=slug,
            tag=(seed["tag"] or "")[:32] or None,
            price=int(price or 0),
            old_price=seed["mrp"],
            save_amount=(seed["mrp"] - price) if priced and seed["mrp"] else None,
            parameters=seed["parameters"],
            includes=seed["includes"],
            benefits=json.dumps(seed["highlights"]) if seed["highlights"] else None,
            doctor_recommended=seed["details"].get("guidance_level") == "DOCTOR-DIRECTED",
            is_active=True,
            home_collection_available=True,
            sort_order=seed["sort_order"],
            category=seed["category"],
            show_on_home=False,
            most_booked=seed["most_booked"],
            contact_for_price=not priced,
            details=details or None,
        )
        label = f"Rs.{price}" if priced else "contact for price"
        print(f"  [insert]  {seed['name']} ({label})")
        if apply:
            db.add(pkg)


async def main(apply: bool, upload: bool, only: set[str]) -> None:
    images = Images(apply, upload)
    async with AsyncSessionLocal() as db:
        if "specialities" in only:
            await seed_specialities(db, images, apply)
        if "team" in only:
            await seed_team(db, images, apply)
        if "packages" in only:
            await seed_packages(db, apply)
        if apply:
            await db.commit()
    if images.pending:
        print(
            f"\n{len(set(images.pending))} external image(s) not yet on Cloudinary "
            f"(re-run with --apply --upload-images to move them)."
        )
    print("\nApplied." if apply else "\nDry run - pass --apply to write.")


if __name__ == "__main__":
    ap = argparse.ArgumentParser()
    ap.add_argument("--apply", action="store_true")
    ap.add_argument("--upload-images", action="store_true")
    ap.add_argument("--only", default="specialities,team,packages")
    args = ap.parse_args()
    asyncio.run(main(args.apply, args.upload_images, set(args.only.split(","))))

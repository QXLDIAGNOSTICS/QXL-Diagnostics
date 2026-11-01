"""Repoint CMS rows whose ``image_url`` is still a legacy local path
(e.g. "/image/dr_shantakumar_v4.jpg" — files that no longer exist in the
frontend's public/ folder, so the image renders broken) to the Cloudinary
copy recorded in scripts/cloudinary_image_map.json.

Usage (from qxl-backend/):
    uv run python scripts/fix_legacy_image_urls.py [--apply]

Without --apply it's a dry run. Rows with no Cloudinary match are listed and
left unchanged.
"""
from __future__ import annotations

import asyncio
import json
import sys
from pathlib import Path

from sqlalchemy import select

from app.db.session import AsyncSessionLocal
from app.models.catalog import Center, HealthPackage, TestCatalog
from app.models.content import Banner, BlogPost, Doctor, GalleryItem

MAP_JSON = Path(__file__).resolve().parent / "cloudinary_image_map.json"
MODELS = [Doctor, Banner, BlogPost, GalleryItem, Center, HealthPackage, TestCatalog]
# Legacy files that were never uploaded to Cloudinary: closest existing image.
SUBSTITUTES = {
    "/image/slide_lab_facility.png": "/image/about_lab.png",
    "/image/slide_histopathology.png": "/image/user_female_microscope.jpg",
    "/image/slide_molecular.png": "/image/slide_scientist_new.jpg",
    "/image/slide_autoimmune.png": "/image/slide_immunity_test_new.png",
}
_EXTS = (".jpg", ".jpeg", ".png", ".webp")


def _lookup(path: str, mapping: dict[str, str]) -> str | None:
    path = SUBSTITUTES.get(path, path)
    if path in mapping:
        return mapping[path]
    # The migration sometimes re-encoded files (e.g. .png -> .jpg), so try
    # the same basename with the other common extensions.
    stem = path.rsplit(".", 1)[0]
    for ext in _EXTS:
        if f"{stem}{ext}" in mapping:
            return mapping[f"{stem}{ext}"]
    return None


async def main(apply: bool) -> None:
    mapping: dict[str, str] = json.loads(MAP_JSON.read_text())
    changed = missing = 0
    async with AsyncSessionLocal() as db:
        for model in MODELS:
            stmt = select(model).where(model.image_url.like("/%"))
            rows = (await db.execute(stmt)).scalars().all()
            for row in rows:
                label = getattr(row, "name", None) or getattr(row, "title", None) or row.id
                new_url = _lookup(row.image_url, mapping)
                if new_url is None:
                    missing += 1
                    print(f"[no match] {model.__tablename__}: {label!r} {row.image_url}")
                    continue
                changed += 1
                print(f"[update]   {model.__tablename__}: {label!r} {row.image_url} -> {new_url}")
                row.image_url = new_url
        if apply:
            await db.commit()
            print(f"\nUpdated {changed} row(s); {missing} without a Cloudinary match.")
        else:
            await db.rollback()
            print(f"\nDry run: {changed} to update, {missing} without a match.")
            print("Pass --apply to write.")


if __name__ == "__main__":
    asyncio.run(main("--apply" in sys.argv))

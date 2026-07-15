"""One-off migration script: uploads every local image under
qxl-frontend/public/image/ and qxl-frontend/public/images/ to Cloudinary and
writes a JSON mapping of {"/image/foo.jpg": "https://res.cloudinary.com/..."}.

Run with:
    uv run python scripts/migrate_images_to_cloudinary.py

Safe to re-run: re-uploading the same public_id just overwrites the asset on
Cloudinary's side (same URL is produced), so partial re-runs are fine.
"""
from __future__ import annotations

import hashlib
import json
import mimetypes
import sys
import time
from pathlib import Path

import httpx

sys.path.insert(0, str(Path(__file__).resolve().parent.parent))

from app.core.config import settings  # noqa: E402

FRONTEND_PUBLIC = Path(__file__).resolve().parent.parent.parent / "qxl-frontend" / "public"
SOURCE_DIRS = ["image", "images"]
OUTPUT_JSON = Path(__file__).resolve().parent / "cloudinary_image_map.json"

ALLOWED_EXTS = {".png", ".jpg", ".jpeg", ".webp", ".gif"}
UPLOAD_URL_TEMPLATE = "https://api.cloudinary.com/v1_1/{cloud_name}/image/upload"
# Keep legacy assets under their own sub-folder for traceability.
UPLOAD_FOLDER = f"{settings.CLOUDINARY_UPLOAD_FOLDER}/legacy-assets"


def _sign(params: dict[str, str]) -> str:
    to_sign = "&".join(f"{k}={v}" for k, v in sorted(params.items()))
    to_sign = f"{to_sign}{settings.CLOUDINARY_API_SECRET}"
    return hashlib.sha1(to_sign.encode("utf-8")).hexdigest()  # noqa: S324


def _public_id_for(rel_path: Path) -> str:
    """Stable public_id derived from the relative path, without extension,
    with spaces/parens normalised so lookups stay predictable."""
    stem = rel_path.with_suffix("").as_posix()
    return stem.replace(" ", "_").replace("(", "").replace(")", "")


def upload_one(client: httpx.Client, file_path: Path, public_id: str) -> str:
    content_type = mimetypes.guess_type(file_path.name)[0] or "application/octet-stream"
    data = file_path.read_bytes()
    timestamp = str(int(time.time()))
    params_to_sign = {"folder": UPLOAD_FOLDER, "public_id": public_id, "timestamp": timestamp, "overwrite": "true"}
    signature = _sign(params_to_sign)
    url = UPLOAD_URL_TEMPLATE.format(cloud_name=settings.CLOUDINARY_CLOUD_NAME)
    form = {
        "api_key": settings.CLOUDINARY_API_KEY,
        "timestamp": timestamp,
        "folder": UPLOAD_FOLDER,
        "public_id": public_id,
        "overwrite": "true",
        "signature": signature,
    }
    files = {"file": (file_path.name, data, content_type)}
    resp = client.post(url, data=form, files=files, timeout=60.0)
    if resp.status_code >= 400:
        raise RuntimeError(f"Upload failed for {file_path}: {resp.status_code} {resp.text}")
    body = resp.json()
    secure_url = body.get("secure_url")
    if not secure_url:
        raise RuntimeError(f"No secure_url returned for {file_path}: {body}")
    return secure_url


def main() -> None:
    if not (settings.CLOUDINARY_CLOUD_NAME and settings.CLOUDINARY_API_KEY and settings.CLOUDINARY_API_SECRET):
        print("Cloudinary is not configured (CLOUDINARY_CLOUD_NAME/API_KEY/API_SECRET). Aborting.")
        sys.exit(1)

    mapping: dict[str, str] = {}
    if OUTPUT_JSON.exists():
        mapping = json.loads(OUTPUT_JSON.read_text())
        print(f"Loaded {len(mapping)} existing mappings from {OUTPUT_JSON}")

    files: list[Path] = []
    for d in SOURCE_DIRS:
        base = FRONTEND_PUBLIC / d
        if not base.exists():
            continue
        for p in sorted(base.rglob("*")):
            if p.is_file() and p.suffix.lower() in ALLOWED_EXTS:
                files.append(p)

    print(f"Found {len(files)} local image files to migrate.")

    with httpx.Client() as client:
        for i, file_path in enumerate(files, start=1):
            rel_to_public = file_path.relative_to(FRONTEND_PUBLIC)
            web_path = "/" + rel_to_public.as_posix()
            if web_path in mapping:
                print(f"[{i}/{len(files)}] skip (already migrated): {web_path}")
                continue
            public_id = _public_id_for(rel_to_public)
            try:
                secure_url = upload_one(client, file_path, public_id)
            except Exception as exc:  # noqa: BLE001
                print(f"[{i}/{len(files)}] FAILED: {web_path} -> {exc}")
                continue
            mapping[web_path] = secure_url
            print(f"[{i}/{len(files)}] {web_path} -> {secure_url}")
            # Persist incrementally so a partial run isn't wasted.
            OUTPUT_JSON.write_text(json.dumps(mapping, indent=2, sort_keys=True))

    print(f"\nDone. {len(mapping)} total mappings written to {OUTPUT_JSON}")


if __name__ == "__main__":
    main()

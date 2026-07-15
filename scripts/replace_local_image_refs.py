"""One-off migration script: replaces hardcoded local image path references
(e.g. "/image/foo.jpg", "/images/banners/bar.png") across the frontend source
tree with their migrated Cloudinary URLs, using the mapping produced by
migrate_images_to_cloudinary.py.

Run with:
    uv run python scripts/replace_local_image_refs.py [--dry-run]
"""
from __future__ import annotations

import json
import sys
from pathlib import Path

MAP_JSON = Path(__file__).resolve().parent / "cloudinary_image_map.json"
FRONTEND_SRC = Path(__file__).resolve().parent.parent.parent / "qxl-frontend" / "src"

SCAN_EXTS = {".ts", ".tsx", ".js", ".jsx"}
SKIP_DIR_NAMES = {"node_modules", ".next", ".git"}


def iter_source_files() -> list[Path]:
    files: list[Path] = []
    for p in FRONTEND_SRC.rglob("*"):
        if p.is_file() and p.suffix in SCAN_EXTS and not any(part in SKIP_DIR_NAMES for part in p.parts):
            files.append(p)
    return files


def main() -> None:
    dry_run = "--dry-run" in sys.argv
    if not MAP_JSON.exists():
        print(f"Mapping file not found: {MAP_JSON}. Run migrate_images_to_cloudinary.py first.")
        sys.exit(1)

    mapping: dict[str, str] = json.loads(MAP_JSON.read_text())
    # Replace longer keys first so e.g. "/image/foo_bak.jpg" doesn't get
    # partially clobbered by a shorter "/image/foo.jpg" substring match.
    ordered_keys = sorted(mapping.keys(), key=len, reverse=True)

    # Some references are fully-qualified absolute URLs pointing at the
    # site's own domain (e.g. for JSON-LD schema: "https://qxldiagnostics.com
    # /image/Logo (1).png"). Those must be replaced as a whole absolute-URL
    # match FIRST, otherwise the later plain "/image/..." substring replace
    # would only swap the path suffix and leave a broken concatenated URL
    # like "https://qxldiagnostics.comhttps://res.cloudinary.com/...".
    SITE_DOMAIN_PREFIXES = ["https://qxldiagnostics.com", "https://www.qxldiagnostics.com"]

    files = iter_source_files()
    total_replacements = 0
    files_changed = 0

    for file_path in files:
        text = file_path.read_text(encoding="utf-8")
        original = text
        file_replacements = 0
        for local_path in ordered_keys:
            for prefix in SITE_DOMAIN_PREFIXES:
                absolute = prefix + local_path
                if absolute in text:
                    count = text.count(absolute)
                    text = text.replace(absolute, mapping[local_path])
                    file_replacements += count
            if local_path in text:
                count = text.count(local_path)
                text = text.replace(local_path, mapping[local_path])
                file_replacements += count
        if text != original:
            files_changed += 1
            total_replacements += file_replacements
            rel = file_path.relative_to(FRONTEND_SRC.parent)
            print(f"{rel}: {file_replacements} replacement(s)")
            if not dry_run:
                file_path.write_text(text, encoding="utf-8")

    print(f"\n{'[DRY RUN] ' if dry_run else ''}Done. {total_replacements} replacement(s) across {files_changed} file(s).")

    # Report any local-image-looking references that had NO mapping entry, so
    # nothing silently stays broken/hardcoded.
    unmapped_hits: dict[str, int] = {}
    for file_path in files:
        text = file_path.read_text(encoding="utf-8")
        for marker in ("/image/", "/images/"):
            idx = 0
            while True:
                idx = text.find(marker, idx)
                if idx == -1:
                    break
                # crude token extraction up to a quote/paren/space-terminator
                end = idx
                while end < len(text) and text[end] not in '"\'`) \n\t':
                    end += 1
                token = text[idx:end]
                if token not in mapping:
                    unmapped_hits[token] = unmapped_hits.get(token, 0) + 1
                idx = end

    if unmapped_hits:
        print(f"\n{len(unmapped_hits)} distinct local image reference(s) still NOT mapped (need manual review):")
        for token, count in sorted(unmapped_hits.items()):
            print(f"  {token}  (x{count})")


if __name__ == "__main__":
    main()

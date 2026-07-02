"""File endpoint tests (validation path, no live DB/storage required)."""
from __future__ import annotations

import io


async def test_upload_rejects_unsupported_content_type(client):
    files = {"file": ("evil.exe", io.BytesIO(b"MZ..."), "application/x-msdownload")}
    resp = await client.post("/api/v1/files", files=files)
    assert resp.status_code == 422
    body = resp.json()
    assert body["error"]["code"] == "validation_error"


async def test_upload_rejects_empty_file(client):
    files = {"file": ("empty.txt", io.BytesIO(b""), "text/plain")}
    resp = await client.post("/api/v1/files", files=files)
    assert resp.status_code == 422

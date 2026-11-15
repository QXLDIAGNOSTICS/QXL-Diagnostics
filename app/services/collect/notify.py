"""Patient / collector notifications: in-app inbox + FCM push.

Push uses the FCM HTTP v1 API with a service-account JWT (no Google SDK).
When ``FCM_SERVICE_ACCOUNT_JSON`` is empty, push is skipped and only the
in-app inbox is written — the apps refresh it while open.

Message bodies never contain test results, report contents or OTPs.
"""

from __future__ import annotations

import asyncio
import json
import time
import uuid

import httpx
from sqlalchemy import delete, select
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.config import settings
from app.core.logging import get_logger
from app.models.collect import DeviceToken, InboxMessage

logger = get_logger(__name__)

_FCM_SCOPE = "https://www.googleapis.com/auth/firebase.messaging"
_token_cache: dict[str, tuple[str, float]] = {}
_pending: set[asyncio.Task] = set()


def _service_account() -> dict | None:
    raw = (settings.FCM_SERVICE_ACCOUNT_JSON or "").strip()
    if not raw:
        return None
    try:
        data = json.loads(raw)
    except ValueError:
        logger.error("FCM_SERVICE_ACCOUNT_JSON is not valid JSON; push disabled")
        return None
    if not all(k in data for k in ("client_email", "private_key", "project_id")):
        logger.error("FCM service account JSON is missing fields; push disabled")
        return None
    return data


async def _access_token(account: dict) -> str:
    cached = _token_cache.get(account["client_email"])
    if cached and cached[1] > time.time() + 60:
        return cached[0]
    import jwt  # pyjwt[crypto], installed with the supabase client

    now = int(time.time())
    assertion = jwt.encode(
        {
            "iss": account["client_email"],
            "scope": _FCM_SCOPE,
            "aud": "https://oauth2.googleapis.com/token",
            "iat": now,
            "exp": now + 3600,
        },
        account["private_key"],
        algorithm="RS256",
    )
    async with httpx.AsyncClient(timeout=10) as client:
        resp = await client.post(
            "https://oauth2.googleapis.com/token",
            data={
                "grant_type": "urn:ietf:params:oauth:grant-type:jwt-bearer",
                "assertion": assertion,
            },
        )
        resp.raise_for_status()
        body = resp.json()
    token = body["access_token"]
    _token_cache[account["client_email"]] = (token, time.time() + int(body.get("expires_in", 3600)))
    return token


async def _send_push(tokens: list[str], title: str, body: str, data: dict[str, str]) -> list[str]:
    """Returns tokens FCM reported as no longer registered."""
    account = _service_account()
    if account is None or not tokens:
        return []
    dead: list[str] = []
    try:
        access = await _access_token(account)
        url = f"https://fcm.googleapis.com/v1/projects/{account['project_id']}/messages:send"
        async with httpx.AsyncClient(timeout=10) as client:
            for token in tokens:
                resp = await client.post(
                    url,
                    headers={"Authorization": f"Bearer {access}"},
                    json={
                        "message": {
                            "token": token,
                            "notification": {"title": title, "body": body},
                            "data": data,
                            "android": {"priority": "high"},
                        }
                    },
                )
                if resp.status_code == 404 or "UNREGISTERED" in resp.text:
                    dead.append(token)
                elif resp.status_code >= 400:
                    logger.warning("FCM send failed: %s", resp.status_code)
    except Exception:  # noqa: BLE001
        logger.exception("FCM push failed")
    return dead


async def _push_in_background(
    user_id: uuid.UUID, title: str, body: str, data: dict[str, str]
) -> None:
    from app.db.session import AsyncSessionLocal

    async with AsyncSessionLocal() as db:
        tokens = (
            (await db.execute(select(DeviceToken.token).where(DeviceToken.user_id == user_id)))
            .scalars()
            .all()
        )
        dead = await _send_push(list(tokens), title, body, data)
        if dead:
            await db.execute(delete(DeviceToken).where(DeviceToken.token.in_(dead)))
            await db.commit()


async def notify_user(
    db: AsyncSession,
    user_id: uuid.UUID | None,
    *,
    kind: str,
    title: str,
    body: str,
    data: dict | None = None,
) -> None:
    """Writes an inbox message (caller commits) and pushes after the request."""
    if user_id is None:
        return
    payload = {k: str(v) for k, v in (data or {}).items() if v is not None}
    payload["kind"] = kind
    db.add(InboxMessage(user_id=user_id, kind=kind, title=title, body=body, data=payload))
    if _service_account() is None:
        return
    task = asyncio.create_task(_push_in_background(user_id, title, body, payload))
    _pending.add(task)
    task.add_done_callback(_pending.discard)


async def register_device(
    db: AsyncSession, user_id: uuid.UUID, token: str, platform: str, app: str
) -> None:
    existing = (
        await db.execute(select(DeviceToken).where(DeviceToken.token == token))
    ).scalar_one_or_none()
    from app.services.collect.common import now_utc

    if existing is None:
        db.add(
            DeviceToken(
                user_id=user_id, token=token, platform=platform, app=app, last_seen_at=now_utc()
            )
        )
    else:
        # A device that signs into another account moves to that account.
        existing.user_id = user_id
        existing.platform = platform
        existing.app = app
        existing.last_seen_at = now_utc()
    await db.commit()


async def unregister_device(db: AsyncSession, user_id: uuid.UUID, token: str) -> None:
    await db.execute(
        delete(DeviceToken).where(DeviceToken.token == token, DeviceToken.user_id == user_id)
    )
    await db.commit()

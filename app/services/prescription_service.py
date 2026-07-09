"""Prescription service: upload tracking + OpenAI-powered analysis (vision + text)."""
from __future__ import annotations

import base64
import calendar
import json
import uuid
from datetime import datetime, timezone

from sqlalchemy.ext.asyncio import AsyncSession

from app.core.config import settings
from app.core.exceptions import NotFoundError, ValidationError
from app.core.logging import get_logger
from app.models.prescription import Prescription
from app.repositories.prescription_repository import PrescriptionRepository
from app.schemas.prescription import PrescriptionAnalysis
from app.services import ingestion_service
from app.services.embedding_service import get_openai_client

logger = get_logger(__name__)

_IMAGE_TYPES = {"image/png", "image/jpeg", "image/jpg", "image/webp"}

_SYSTEM_PROMPT = (
    "You are a clinical assistant helping a diagnostics lab pre-process patient "
    "prescriptions. Extract structured information from the prescription text or "
    "image provided. Identify: (1) lab tests / investigations recommended, "
    "(2) medications prescribed, (3) any diagnosis or condition hints mentioned, "
    "and (4) a short plain-language summary for the patient. "
    "You are NOT diagnosing or prescribing — only summarizing what is written. "
    "If the content is unclear or not a medical prescription, say so in the summary "
    "and return empty lists for tests/medications. "
    "Respond ONLY with a JSON object matching this exact schema: "
    '{"tests": [string], "medications": [string], "diagnosis_hints": [string], '
    '"summary": string, "raw_text": string}'
)


async def _call_openai_vision(data: bytes, content_type: str) -> dict:
    b64 = base64.b64encode(data).decode("utf-8")
    client = get_openai_client()
    resp = await client.chat.completions.create(
        model=settings.OPENAI_MODEL,
        messages=[
            {"role": "system", "content": _SYSTEM_PROMPT},
            {
                "role": "user",
                "content": [
                    {
                        "type": "text",
                        "text": "Analyze this prescription image and extract the structured JSON described.",
                    },
                    {
                        "type": "image_url",
                        "image_url": {"url": f"data:{content_type};base64,{b64}"},
                    },
                ],
            },
        ],
        response_format={"type": "json_object"},
        temperature=0.1,
    )
    return json.loads(resp.choices[0].message.content or "{}")


async def _call_openai_text(raw_text: str) -> dict:
    client = get_openai_client()
    resp = await client.chat.completions.create(
        model=settings.OPENAI_MODEL,
        messages=[
            {"role": "system", "content": _SYSTEM_PROMPT},
            {
                "role": "user",
                "content": f"Prescription text extracted from the document:\n\n{raw_text}",
            },
        ],
        response_format={"type": "json_object"},
        temperature=0.1,
    )
    return json.loads(resp.choices[0].message.content or "{}")


async def analyze_prescription_bytes(data: bytes, content_type: str) -> PrescriptionAnalysis:
    """Run OpenAI analysis on prescription bytes, returning a structured result."""
    if content_type in _IMAGE_TYPES:
        raw = await _call_openai_vision(data, content_type)
        raw.setdefault("raw_text", "")
    else:
        text = ingestion_service.extract_text(data, content_type)
        if not text.strip():
            return PrescriptionAnalysis(
                summary="Could not extract any readable text from this file.",
                raw_text="",
            )
        raw = await _call_openai_text(text)
        raw.setdefault("raw_text", text[:4000])

    return PrescriptionAnalysis(
        tests=raw.get("tests") or [],
        medications=raw.get("medications") or [],
        diagnosis_hints=raw.get("diagnosis_hints") or [],
        summary=raw.get("summary") or "",
        raw_text=raw.get("raw_text") or "",
    )


async def run_analysis_and_store(
    db: AsyncSession, prescription_id: uuid.UUID, data: bytes, content_type: str
) -> None:
    """Background task: analyze a prescription and persist the result."""
    repo = PrescriptionRepository(db)
    prescription = await repo.get_by_id(prescription_id)
    if prescription is None:
        return
    try:
        await repo.update_analysis(prescription, status="processing")
        await db.commit()

        analysis = await analyze_prescription_bytes(data, content_type)

        await repo.update_analysis(
            prescription, status="completed", analysis_json=analysis.model_dump_json()
        )
        await db.commit()
    except Exception as exc:  # noqa: BLE001
        logger.exception("Prescription analysis failed for %s", prescription_id)
        await repo.update_analysis(prescription, status="failed", error_message=str(exc))
        await db.commit()


def _to_read_schema(record: Prescription):
    from app.schemas.prescription import PrescriptionRead

    analysis = None
    if record.analysis_json:
        try:
            analysis = PrescriptionAnalysis.model_validate_json(record.analysis_json)
        except ValueError:
            analysis = None
    return PrescriptionRead(
        id=record.id,
        user_id=record.user_id,
        file_id=record.file_id,
        filename=record.filename,
        content_type=record.content_type,
        analysis_status=record.analysis_status,
        analysis=analysis,
        error_message=record.error_message,
    )


async def list_my_prescriptions(db: AsyncSession, user_id: uuid.UUID, limit: int = 50, offset: int = 0):
    repo = PrescriptionRepository(db)
    rows, count = await repo.list_for_user(user_id, limit=limit, offset=offset)
    return [_to_read_schema(r) for r in rows], count


async def get_prescription_for_user(db: AsyncSession, prescription_id: uuid.UUID, user_id: uuid.UUID):
    repo = PrescriptionRepository(db)
    record = await repo.get_by_id(prescription_id)
    if record is None or record.user_id != user_id:
        raise NotFoundError("Prescription not found")
    return _to_read_schema(record)


async def latest_completed_summaries(db: AsyncSession, user_id: uuid.UUID, limit: int = 3) -> list[dict]:
    """Compact summaries for chatbot tool consumption."""
    repo = PrescriptionRepository(db)
    rows, _ = await repo.list_for_user(user_id, limit=limit, offset=0)
    out = []
    for r in rows:
        if r.analysis_status != "completed" or not r.analysis_json:
            continue
        try:
            analysis = PrescriptionAnalysis.model_validate_json(r.analysis_json)
        except ValueError:
            continue
        out.append(
            {
                "filename": r.filename,
                "uploaded_at": r.created_at.isoformat() if r.created_at else None,
                "summary": analysis.summary,
                "tests": analysis.tests,
                "medications": analysis.medications,
                "diagnosis_hints": analysis.diagnosis_hints,
            }
        )
    return out


def _month_start(now: datetime | None = None) -> datetime:
    now = now or datetime.now(timezone.utc)
    return now.replace(day=1, hour=0, minute=0, second=0, microsecond=0)


def _month_end(now: datetime | None = None) -> datetime:
    now = now or datetime.now(timezone.utc)
    last_day = calendar.monthrange(now.year, now.month)[1]
    return now.replace(
        day=last_day, hour=23, minute=59, second=59, microsecond=0
    )


async def get_upload_quota(db: AsyncSession, user_id: uuid.UUID) -> dict:
    """Monthly prescription-upload quota usage for a user."""
    used = await PrescriptionRepository(db).count_for_user_since(user_id, _month_start())
    limit = settings.PRESCRIPTION_MONTHLY_UPLOAD_LIMIT
    return {
        "used": used,
        "limit": limit,
        "remaining": max(0, limit - used),
        "resets_at": _month_end().isoformat(),
    }


async def check_upload_quota(db: AsyncSession, user_id: uuid.UUID) -> None:
    """Raise ValidationError if the user has hit their monthly upload cap."""
    quota = await get_upload_quota(db, user_id)
    if quota["remaining"] <= 0:
        raise ValidationError(
            f"You've reached your limit of {quota['limit']} prescription uploads this month. "
            f"Your quota resets on {quota['resets_at'][:10]}."
        )

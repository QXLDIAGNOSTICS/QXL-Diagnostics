"""Schemas for prescriptions and AI analysis."""
from __future__ import annotations

import uuid
from typing import Any

from pydantic import BaseModel, ConfigDict


class PrescriptionAnalysis(BaseModel):
    """Structured output from OpenAI's prescription analysis."""
    tests: list[str] = []
    medications: list[str] = []
    diagnosis_hints: list[str] = []
    summary: str = ""
    raw_text: str = ""
    disclaimer: str = (
        "This AI analysis is for informational purposes only. "
        "Always consult a qualified doctor before acting on this information."
    )


class PrescriptionRead(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    id: uuid.UUID
    user_id: uuid.UUID
    file_id: uuid.UUID | None = None
    filename: str
    content_type: str
    analysis_status: str
    analysis: PrescriptionAnalysis | None = None
    error_message: str | None = None


class PrescriptionList(BaseModel):
    items: list[PrescriptionRead]
    count: int

"""Schemas for the admin-managed global chatbot knowledge base."""
from __future__ import annotations

import uuid
from datetime import datetime

from pydantic import BaseModel, ConfigDict


class KnowledgeDocumentRead(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: uuid.UUID
    filename: str
    content_type: str
    size: int
    created_at: datetime
    chunk_count: int = 0


class KnowledgeDocumentList(BaseModel):
    items: list[KnowledgeDocumentRead]
    count: int

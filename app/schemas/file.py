"""File schemas."""
from __future__ import annotations

import uuid
from datetime import datetime

from pydantic import BaseModel, ConfigDict


class FileRead(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: uuid.UUID
    filename: str
    content_type: str
    size: int
    created_at: datetime


class FileWithUrl(FileRead):
    download_url: str


class FileList(BaseModel):
    items: list[FileRead]
    count: int

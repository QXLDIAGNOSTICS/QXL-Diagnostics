"""Schemas for lead capture (collaboration and contact forms)."""
from __future__ import annotations

import uuid

from pydantic import BaseModel, ConfigDict, Field


class CollaborationLeadCreate(BaseModel):
    name: str = Field(..., min_length=2, max_length=120)
    phone: str = Field(..., min_length=6, max_length=20)
    email: str | None = None
    city: str | None = None
    interest: str | None = None   # franchise | hospital | doctor | other
    message: str | None = None


class CollaborationLeadRead(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    id: uuid.UUID
    name: str
    phone: str
    email: str | None = None
    city: str | None = None
    interest: str | None = None
    message: str | None = None
    is_read: bool


class CollaborationLeadList(BaseModel):
    items: list[CollaborationLeadRead]
    count: int


class ContactInquiryCreate(BaseModel):
    name: str = Field(..., min_length=2, max_length=120)
    email: str | None = None
    phone: str | None = None
    subject: str | None = None
    message: str = Field(..., min_length=5)


class ContactInquiryRead(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    id: uuid.UUID
    name: str
    email: str | None = None
    phone: str | None = None
    subject: str | None = None
    message: str
    is_read: bool


class ContactInquiryList(BaseModel):
    items: list[ContactInquiryRead]
    count: int

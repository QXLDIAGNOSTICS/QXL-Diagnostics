"""Request/response schemas for QXL Collect."""

from __future__ import annotations

import uuid
from datetime import date, datetime

from pydantic import BaseModel, ConfigDict, Field, field_validator

from app.core.security import normalize_phone_number


class ProfileIn(BaseModel):
    full_name: str = Field(min_length=2, max_length=120)
    date_of_birth: date
    gender: str | None = Field(default=None, max_length=12)
    relation: str = "self"
    phone: str | None = None

    @field_validator("phone")
    @classmethod
    def _phone(cls, v: str | None) -> str | None:
        return normalize_phone_number(v) if v else None


class ProfilePatch(BaseModel):
    full_name: str | None = Field(default=None, min_length=2, max_length=120)
    date_of_birth: date | None = None
    gender: str | None = Field(default=None, max_length=12)
    relation: str | None = None
    phone: str | None = None

    @field_validator("phone")
    @classmethod
    def _phone(cls, v: str | None) -> str | None:
        return normalize_phone_number(v) if v else None


class ProfileOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    id: uuid.UUID
    reference: str
    full_name: str
    date_of_birth: date
    gender: str | None
    relation: str
    phone: str | None


class AddressIn(BaseModel):
    label: str = Field(default="Home", max_length=40)
    house: str = Field(min_length=1, max_length=200)
    street: str | None = Field(default=None, max_length=200)
    locality: str = Field(min_length=2, max_length=120)
    city: str = Field(default="Bengaluru", max_length=60)
    pincode: str = Field(min_length=6, max_length=6)
    landmark: str | None = Field(default=None, max_length=200)
    instructions: str | None = Field(default=None, max_length=500)
    lat: float | None = None
    lng: float | None = None
    is_default: bool = False


class AddressPatch(BaseModel):
    label: str | None = Field(default=None, max_length=40)
    house: str | None = Field(default=None, max_length=200)
    street: str | None = Field(default=None, max_length=200)
    locality: str | None = Field(default=None, max_length=120)
    city: str | None = Field(default=None, max_length=60)
    pincode: str | None = Field(default=None, min_length=6, max_length=6)
    landmark: str | None = Field(default=None, max_length=200)
    instructions: str | None = Field(default=None, max_length=500)
    lat: float | None = None
    lng: float | None = None
    is_default: bool | None = None


class AddressOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    id: uuid.UUID
    label: str
    house: str
    street: str | None
    locality: str
    city: str
    pincode: str
    landmark: str | None
    instructions: str | None
    lat: float | None
    lng: float | None
    is_default: bool


class VisitItem(BaseModel):
    kind: str
    id: uuid.UUID


class VisitAddress(BaseModel):
    house: str = Field(min_length=1, max_length=200)
    street: str | None = Field(default=None, max_length=200)
    locality: str = Field(min_length=2, max_length=120)
    city: str = Field(default="Bengaluru", max_length=60)
    pincode: str = Field(min_length=6, max_length=6)
    landmark: str | None = Field(default=None, max_length=200)
    instructions: str | None = Field(default=None, max_length=500)
    lat: float | None = None
    lng: float | None = None


class VisitCreate(BaseModel):
    profile_id: uuid.UUID
    items: list[VisitItem] = Field(min_length=1, max_length=20)
    address: VisitAddress
    slot_date: date
    slot_label: str = Field(min_length=3, max_length=40)
    payment_mode: str = "online"
    consent_accepted: bool
    notes: str | None = Field(default=None, max_length=1000)


class ReasonIn(BaseModel):
    reason: str | None = Field(default=None, max_length=500)


class RescheduleIn(BaseModel):
    slot_date: date
    slot_label: str = Field(min_length=3, max_length=40)


class DeviceIn(BaseModel):
    token: str = Field(min_length=10, max_length=400)
    platform: str = Field(pattern="^(android|ios)$")
    app: str = Field(pattern="^(patient|collector)$")


class DeviceRemove(BaseModel):
    token: str = Field(min_length=10, max_length=400)


class InboxRead(BaseModel):
    ids: list[uuid.UUID] | None = None


# ── Field ───────────────────────────────────────────────────────────────────


class LatLng(BaseModel):
    lat: float | None = Field(default=None, ge=-90, le=90)
    lng: float | None = Field(default=None, ge=-180, le=180)


class LocationPoint(BaseModel):
    lat: float = Field(ge=-90, le=90)
    lng: float = Field(ge=-180, le=180)
    accuracy_m: float | None = None
    speed_mps: float | None = None
    recorded_at: datetime | None = None


class LocationBatch(BaseModel):
    points: list[LocationPoint] = Field(min_length=1, max_length=200)


class IdentityIn(BaseModel):
    name_confirmed: bool
    stated_dob: date
    visit_code: str | None = Field(default=None, max_length=4)


class SpecimenIn(BaseModel):
    barcode: str = Field(min_length=6, max_length=40)
    container_type: str = Field(min_length=2, max_length=40)
    sample_type: str | None = Field(default=None, max_length=60)
    booking_ids: list[uuid.UUID] = Field(min_length=1)
    collected_at: datetime | None = None
    volume_ml: float | None = Field(default=None, ge=0, le=100)
    observations: str | None = Field(default=None, max_length=500)
    recollect_of_barcode: str | None = None
    client_ref: str | None = Field(default=None, max_length=80)


class VisitPaymentIn(BaseModel):
    mode: str
    amount_paise: int = Field(ge=0)
    reference: str | None = Field(default=None, max_length=80)


class CompleteIn(BaseModel):
    outcome: str
    reason: str | None = Field(default=None, max_length=500)
    checklist: dict[str, bool] | None = None
    payment: VisitPaymentIn | None = None


class ExceptionIn(BaseModel):
    type: str
    note: str | None = Field(default=None, max_length=500)
    eta_minutes: int | None = Field(default=None, ge=0, le=600)


class DutyIn(BaseModel):
    on_duty: bool


class ManifestCreate(BaseModel):
    barcodes: list[str] = Field(min_length=1, max_length=200)
    handover_to_code: str | None = Field(default=None, max_length=20)
    destination_center_id: uuid.UUID | None = None
    container_ref: str | None = Field(default=None, max_length=40)
    seal_intact: bool | None = None
    temperature_note: str | None = Field(default=None, max_length=80)
    notes: str | None = Field(default=None, max_length=500)


class ManifestAccept(BaseModel):
    barcodes: list[str] = Field(default_factory=list, max_length=200)
    seal_intact: bool | None = None
    temperature_note: str | None = Field(default=None, max_length=80)


class ManifestTransfer(BaseModel):
    handover_to_code: str | None = Field(default=None, max_length=20)
    destination_center_id: uuid.UUID | None = None


class IssueIn(BaseModel):
    type: str
    note: str | None = Field(default=None, max_length=500)


# ── Ops / lab ───────────────────────────────────────────────────────────────


class AssignIn(BaseModel):
    collector_id: uuid.UUID
    reason: str | None = Field(default=None, max_length=300)


class OpsRescheduleIn(RescheduleIn):
    pass


class CollectorIn(BaseModel):
    employee_code: str | None = Field(default=None, max_length=20)
    display_name: str | None = Field(default=None, max_length=120)
    photo_url: str | None = None
    contact_phone: str | None = None
    zone: str | None = Field(default=None, max_length=40)
    shift_start: str | None = Field(default=None, pattern=r"^\d{2}:\d{2}$")
    shift_end: str | None = Field(default=None, pattern=r"^\d{2}:\d{2}$")
    working_days: list[int] | None = None
    competencies: list[str] | None = None
    qualification: str | None = Field(default=None, max_length=200)
    max_daily_jobs: int | None = Field(default=None, ge=1, le=60)
    home_lat: float | None = None
    home_lng: float | None = None
    is_active: bool | None = None

    @field_validator("contact_phone")
    @classmethod
    def _phone(cls, v: str | None) -> str | None:
        return normalize_phone_number(v) if v else None


class FieldStaffIn(CollectorIn):
    """A new collector/courier: login account + field profile in one step."""

    role: str = Field(pattern=r"^(collector|courier)$")
    name: str = Field(min_length=2, max_length=120)
    phone: str = Field(min_length=10, max_length=16)
    email: str = Field(min_length=5, max_length=254)
    date_of_birth: date | None = None
    employee_code: str = Field(min_length=2, max_length=20)


class FieldStaffStatusIn(BaseModel):
    active: bool
    reason: str | None = Field(default=None, max_length=300)


class ServiceAreaIn(BaseModel):
    pincode: str = Field(min_length=6, max_length=6)
    locality: str | None = Field(default=None, max_length=120)
    zone: str = Field(default="default", max_length=40)
    is_active: bool = True
    collection_fee_paise: int | None = Field(default=None, ge=0)
    lab_center_id: uuid.UUID | None = None


class ServiceAreaOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    id: uuid.UUID
    pincode: str
    locality: str | None
    zone: str
    is_active: bool
    collection_fee_paise: int | None
    lab_center_id: uuid.UUID | None


class LabReceiveIn(BaseModel):
    barcodes: list[str] = Field(default_factory=list, max_length=500)
    seal_intact: bool | None = None
    temperature_note: str | None = Field(default=None, max_length=80)


class DecisionIn(BaseModel):
    decision: str
    reason: str | None = None
    notes: str | None = Field(default=None, max_length=500)


class LabStatusIn(BaseModel):
    lab_status: str
    lis_accession: str | None = Field(default=None, max_length=60)
    note: str | None = Field(default=None, max_length=500)


class RevokeIn(BaseModel):
    reason: str = Field(min_length=3, max_length=500)


class ReconcileIn(BaseModel):
    payment_ids: list[uuid.UUID] = Field(min_length=1)

"""QXL Collect: home visits, field jobs, specimens, custody, lab reports.

See docs/COLLECT.md for the status machines and rules. Every state change is
also written to ``collect_events`` (the audit trail / patient timeline).
"""

from __future__ import annotations

import uuid
from datetime import date, datetime

from sqlalchemy import (
    JSON,
    Boolean,
    Date,
    DateTime,
    Float,
    ForeignKey,
    Integer,
    String,
    Text,
    UniqueConstraint,
    func,
)
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.base import Base, TimestampMixin, new_uuid

PROFILE_RELATIONS = ("self", "spouse", "child", "parent", "sibling", "other")
VISIT_STATUSES = ("pending_payment", "confirmed", "completed", "cancelled")
PAYMENT_MODES = ("online", "pay_on_visit")
JOB_STATUSES = (
    "unassigned",
    "assigned",
    "acknowledged",
    "en_route",
    "arrived",
    "collected",
    "partially_collected",
    "unsuccessful",
    "cancelled",
)
JOB_ACTIVE_STATUSES = frozenset({"unassigned", "assigned", "acknowledged", "en_route", "arrived"})
JOB_TERMINAL_STATUSES = frozenset({"collected", "partially_collected", "unsuccessful", "cancelled"})
SPECIMEN_STATUSES = (
    "collected",
    "handed_over",
    "in_transit",
    "received",
    "accepted",
    "rejected",
    "on_hold",
    "missing",
    "damaged",
)
LAB_STATUSES = (
    "not_received",
    "received",
    "in_progress",
    "under_review",
    "partial",
    "delayed",
    "on_hold",
    "authorized",
)
REPORT_STATUSES = ("draft", "released", "superseded", "revoked")
MANIFEST_STATUSES = ("open", "in_transit", "received", "closed")


class PatientProfile(Base, TimestampMixin):
    """A person tests are booked for, owned by an account (self or family)."""

    __tablename__ = "patient_profiles"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=new_uuid)
    account_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), ForeignKey("users.id", ondelete="CASCADE"), nullable=False, index=True
    )
    reference: Mapped[str] = mapped_column(String(20), unique=True, nullable=False)
    full_name: Mapped[str] = mapped_column(String(120), nullable=False)
    date_of_birth: Mapped[date] = mapped_column(Date, nullable=False)
    gender: Mapped[str | None] = mapped_column(String(12), nullable=True)
    relation: Mapped[str] = mapped_column(String(12), default="self", nullable=False)
    phone: Mapped[str | None] = mapped_column(String(20), nullable=True)
    is_archived: Mapped[bool] = mapped_column(Boolean, default=False, nullable=False)
    updated_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), server_default=func.now(), onupdate=func.now(), nullable=False
    )


class PatientAddress(Base, TimestampMixin):
    """A saved collection address with an exact map pin."""

    __tablename__ = "patient_addresses"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=new_uuid)
    account_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), ForeignKey("users.id", ondelete="CASCADE"), nullable=False, index=True
    )
    label: Mapped[str] = mapped_column(String(40), default="Home", nullable=False)
    house: Mapped[str] = mapped_column(String(200), nullable=False)
    street: Mapped[str | None] = mapped_column(String(200), nullable=True)
    locality: Mapped[str] = mapped_column(String(120), nullable=False)
    city: Mapped[str] = mapped_column(String(60), default="Bengaluru", nullable=False)
    pincode: Mapped[str] = mapped_column(String(6), nullable=False, index=True)
    landmark: Mapped[str | None] = mapped_column(String(200), nullable=True)
    instructions: Mapped[str | None] = mapped_column(Text, nullable=True)
    lat: Mapped[float | None] = mapped_column(Float, nullable=True)
    lng: Mapped[float | None] = mapped_column(Float, nullable=True)
    is_default: Mapped[bool] = mapped_column(Boolean, default=False, nullable=False)


class ServiceArea(Base, TimestampMixin):
    """A serviceable PIN code (admin-managed)."""

    __tablename__ = "service_areas"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=new_uuid)
    pincode: Mapped[str] = mapped_column(String(6), unique=True, nullable=False, index=True)
    locality: Mapped[str | None] = mapped_column(String(120), nullable=True)
    zone: Mapped[str] = mapped_column(String(40), default="default", nullable=False, index=True)
    is_active: Mapped[bool] = mapped_column(Boolean, default=True, nullable=False)
    # Overrides the global home-collection fee rule for this PIN when set.
    collection_fee_paise: Mapped[int | None] = mapped_column(Integer, nullable=True)
    lab_center_id: Mapped[uuid.UUID | None] = mapped_column(
        UUID(as_uuid=True), ForeignKey("centers.id", ondelete="SET NULL"), nullable=True
    )


class CollectorProfile(Base, TimestampMixin):
    """Field details for a staff user with the ``collector`` or ``courier`` role."""

    __tablename__ = "collector_profiles"

    user_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), ForeignKey("users.id", ondelete="CASCADE"), primary_key=True
    )
    employee_code: Mapped[str] = mapped_column(String(20), unique=True, nullable=False)
    display_name: Mapped[str] = mapped_column(String(120), nullable=False)
    photo_url: Mapped[str | None] = mapped_column(String, nullable=True)
    # Shared with the patient only while a job is active, if set.
    contact_phone: Mapped[str | None] = mapped_column(String(20), nullable=True)
    zone: Mapped[str] = mapped_column(String(40), default="default", nullable=False, index=True)
    shift_start: Mapped[str] = mapped_column(
        String(5), default="06:00", nullable=False
    )  # HH:MM IST
    shift_end: Mapped[str] = mapped_column(String(5), default="14:00", nullable=False)
    working_days: Mapped[list] = mapped_column(
        JSON, default=lambda: [0, 1, 2, 3, 4, 5], nullable=False
    )
    competencies: Mapped[list] = mapped_column(JSON, default=list, nullable=False)
    qualification: Mapped[str | None] = mapped_column(String(200), nullable=True)
    max_daily_jobs: Mapped[int] = mapped_column(Integer, default=12, nullable=False)
    home_lat: Mapped[float | None] = mapped_column(Float, nullable=True)
    home_lng: Mapped[float | None] = mapped_column(Float, nullable=True)
    is_active: Mapped[bool] = mapped_column(Boolean, default=True, nullable=False)
    on_duty: Mapped[bool] = mapped_column(Boolean, default=False, nullable=False)
    updated_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), server_default=func.now(), onupdate=func.now(), nullable=False
    )

    user: Mapped["User"] = relationship()  # noqa: F821


class HomeVisit(Base, TimestampMixin):
    """One home-collection appointment for one patient profile (the order)."""

    __tablename__ = "home_visits"
    __table_args__ = (
        UniqueConstraint("account_id", "idempotency_key", name="uq_visit_idempotency"),
    )

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=new_uuid)
    reference: Mapped[str] = mapped_column(String(24), unique=True, nullable=False, index=True)
    account_id: Mapped[uuid.UUID | None] = mapped_column(
        UUID(as_uuid=True), ForeignKey("users.id", ondelete="SET NULL"), nullable=True, index=True
    )
    profile_id: Mapped[uuid.UUID | None] = mapped_column(
        UUID(as_uuid=True), ForeignKey("patient_profiles.id", ondelete="SET NULL"), nullable=True
    )
    idempotency_key: Mapped[str | None] = mapped_column(String(80), nullable=True)
    source: Mapped[str] = mapped_column(String(20), default="app", nullable=False)
    status: Mapped[str] = mapped_column(
        String(20), default="pending_payment", nullable=False, index=True
    )
    payment_mode: Mapped[str] = mapped_column(String(16), default="online", nullable=False)
    # Patient snapshot (identity checks compare against these).
    patient_name: Mapped[str] = mapped_column(String(120), nullable=False)
    patient_dob: Mapped[date | None] = mapped_column(Date, nullable=True)
    patient_gender: Mapped[str | None] = mapped_column(String(12), nullable=True)
    patient_phone: Mapped[str] = mapped_column(String(20), nullable=False)
    visit_code: Mapped[str] = mapped_column(String(4), nullable=False)
    # Address snapshot with exact pin.
    house: Mapped[str] = mapped_column(String(200), nullable=False)
    street: Mapped[str | None] = mapped_column(String(200), nullable=True)
    locality: Mapped[str] = mapped_column(String(120), nullable=False)
    city: Mapped[str] = mapped_column(String(60), default="Bengaluru", nullable=False)
    pincode: Mapped[str] = mapped_column(String(6), nullable=False, index=True)
    landmark: Mapped[str | None] = mapped_column(String(200), nullable=True)
    address_instructions: Mapped[str | None] = mapped_column(Text, nullable=True)
    lat: Mapped[float | None] = mapped_column(Float, nullable=True)
    lng: Mapped[float | None] = mapped_column(Float, nullable=True)
    zone: Mapped[str] = mapped_column(String(40), default="default", nullable=False, index=True)
    slot_date: Mapped[date] = mapped_column(Date, nullable=False, index=True)
    slot_label: Mapped[str] = mapped_column(String(40), nullable=False)
    items_total_paise: Mapped[int] = mapped_column(Integer, default=0, nullable=False)
    collection_fee_paise: Mapped[int] = mapped_column(Integer, default=0, nullable=False)
    consent_version: Mapped[str | None] = mapped_column(String(20), nullable=True)
    consent_accepted_at: Mapped[datetime | None] = mapped_column(
        DateTime(timezone=True), nullable=True
    )
    notes: Mapped[str | None] = mapped_column(Text, nullable=True)
    cancel_reason: Mapped[str | None] = mapped_column(Text, nullable=True)
    reschedule_count: Mapped[int] = mapped_column(Integer, default=0, nullable=False)
    updated_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), server_default=func.now(), onupdate=func.now(), nullable=False
    )

    bookings: Mapped[list["Booking"]] = relationship(  # noqa: F821
        back_populates="visit", order_by="Booking.created_at"
    )
    jobs: Mapped[list["CollectionJob"]] = relationship(
        back_populates="visit", order_by="CollectionJob.created_at"
    )

    @property
    def total_paise(self) -> int:
        return self.items_total_paise + self.collection_fee_paise


class CollectionJob(Base, TimestampMixin):
    """A field attempt to collect samples for a visit (initial or recollection)."""

    __tablename__ = "collection_jobs"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=new_uuid)
    reference: Mapped[str] = mapped_column(String(20), unique=True, nullable=False)
    visit_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True),
        ForeignKey("home_visits.id", ondelete="CASCADE"),
        nullable=False,
        index=True,
    )
    kind: Mapped[str] = mapped_column(
        String(16), default="initial", nullable=False
    )  # initial | recollection
    collector_id: Mapped[uuid.UUID | None] = mapped_column(
        UUID(as_uuid=True), ForeignKey("users.id", ondelete="SET NULL"), nullable=True, index=True
    )
    status: Mapped[str] = mapped_column(
        String(24), default="unassigned", nullable=False, index=True
    )
    assigned_by_id: Mapped[uuid.UUID | None] = mapped_column(
        UUID(as_uuid=True), ForeignKey("users.id", ondelete="SET NULL"), nullable=True
    )
    assignment_mode: Mapped[str | None] = mapped_column(String(10), nullable=True)  # manual | auto
    assigned_at: Mapped[datetime | None] = mapped_column(DateTime(timezone=True), nullable=True)
    acknowledged_at: Mapped[datetime | None] = mapped_column(DateTime(timezone=True), nullable=True)
    en_route_at: Mapped[datetime | None] = mapped_column(DateTime(timezone=True), nullable=True)
    arrived_at: Mapped[datetime | None] = mapped_column(DateTime(timezone=True), nullable=True)
    arrival_lat: Mapped[float | None] = mapped_column(Float, nullable=True)
    arrival_lng: Mapped[float | None] = mapped_column(Float, nullable=True)
    completed_at: Mapped[datetime | None] = mapped_column(DateTime(timezone=True), nullable=True)
    identity_verified_at: Mapped[datetime | None] = mapped_column(
        DateTime(timezone=True), nullable=True
    )
    identity_method: Mapped[str | None] = mapped_column(String(40), nullable=True)
    identity_failures: Mapped[int] = mapped_column(Integer, default=0, nullable=False)
    outcome_reason: Mapped[str | None] = mapped_column(Text, nullable=True)
    checklist: Mapped[dict | None] = mapped_column(JSON, nullable=True)
    is_delayed: Mapped[bool] = mapped_column(Boolean, default=False, nullable=False)
    delay_note: Mapped[str | None] = mapped_column(Text, nullable=True)
    last_lat: Mapped[float | None] = mapped_column(Float, nullable=True)
    last_lng: Mapped[float | None] = mapped_column(Float, nullable=True)
    last_location_at: Mapped[datetime | None] = mapped_column(
        DateTime(timezone=True), nullable=True
    )
    recollect_specimen_ids: Mapped[list | None] = mapped_column(JSON, nullable=True)
    updated_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), server_default=func.now(), onupdate=func.now(), nullable=False
    )

    visit: Mapped[HomeVisit] = relationship(back_populates="jobs")
    collector: Mapped["User | None"] = relationship(foreign_keys=[collector_id])  # noqa: F821


class CollectorLocation(Base):
    """A location ping, accepted only during an en-route/arrived job."""

    __tablename__ = "collector_locations"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    job_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True),
        ForeignKey("collection_jobs.id", ondelete="CASCADE"),
        nullable=False,
        index=True,
    )
    collector_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), nullable=False)
    lat: Mapped[float] = mapped_column(Float, nullable=False)
    lng: Mapped[float] = mapped_column(Float, nullable=False)
    accuracy_m: Mapped[float | None] = mapped_column(Float, nullable=True)
    speed_mps: Mapped[float | None] = mapped_column(Float, nullable=True)
    recorded_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), nullable=False)


class Specimen(Base, TimestampMixin):
    """One physical, barcode-labelled specimen container."""

    __tablename__ = "specimens"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=new_uuid)
    barcode: Mapped[str] = mapped_column(String(40), unique=True, nullable=False, index=True)
    visit_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True),
        ForeignKey("home_visits.id", ondelete="CASCADE"),
        nullable=False,
        index=True,
    )
    job_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True),
        ForeignKey("collection_jobs.id", ondelete="CASCADE"),
        nullable=False,
        index=True,
    )
    booking_ids: Mapped[list] = mapped_column(
        JSON, default=list, nullable=False
    )  # tests in this tube
    container_type: Mapped[str] = mapped_column(String(40), nullable=False)
    sample_type: Mapped[str | None] = mapped_column(String(60), nullable=True)
    status: Mapped[str] = mapped_column(String(16), default="collected", nullable=False, index=True)
    collected_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), nullable=False)
    collected_by_id: Mapped[uuid.UUID | None] = mapped_column(
        UUID(as_uuid=True), ForeignKey("users.id", ondelete="SET NULL"), nullable=True
    )
    volume_ml: Mapped[float | None] = mapped_column(Float, nullable=True)
    observations: Mapped[str | None] = mapped_column(Text, nullable=True)
    custodian_id: Mapped[uuid.UUID | None] = mapped_column(
        UUID(as_uuid=True), ForeignKey("users.id", ondelete="SET NULL"), nullable=True
    )
    manifest_id: Mapped[uuid.UUID | None] = mapped_column(
        UUID(as_uuid=True), ForeignKey("transport_manifests.id", ondelete="SET NULL"), nullable=True
    )
    received_at: Mapped[datetime | None] = mapped_column(DateTime(timezone=True), nullable=True)
    received_by_id: Mapped[uuid.UUID | None] = mapped_column(
        UUID(as_uuid=True), ForeignKey("users.id", ondelete="SET NULL"), nullable=True
    )
    decision_reason: Mapped[str | None] = mapped_column(String(60), nullable=True)
    decision_notes: Mapped[str | None] = mapped_column(Text, nullable=True)
    recollect_of_id: Mapped[uuid.UUID | None] = mapped_column(
        UUID(as_uuid=True), ForeignKey("specimens.id", ondelete="SET NULL"), nullable=True
    )
    client_ref: Mapped[str | None] = mapped_column(String(80), nullable=True)
    updated_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), server_default=func.now(), onupdate=func.now(), nullable=False
    )


class TransportManifest(Base, TimestampMixin):
    """A bag/box of specimens moving between custodians."""

    __tablename__ = "transport_manifests"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=new_uuid)
    reference: Mapped[str] = mapped_column(String(24), unique=True, nullable=False, index=True)
    status: Mapped[str] = mapped_column(String(16), default="open", nullable=False, index=True)
    created_by_id: Mapped[uuid.UUID | None] = mapped_column(
        UUID(as_uuid=True), ForeignKey("users.id", ondelete="SET NULL"), nullable=True
    )
    current_custodian_id: Mapped[uuid.UUID | None] = mapped_column(
        UUID(as_uuid=True), ForeignKey("users.id", ondelete="SET NULL"), nullable=True
    )
    # Courier who must scan to accept custody (status "open").
    pending_receiver_id: Mapped[uuid.UUID | None] = mapped_column(
        UUID(as_uuid=True), ForeignKey("users.id", ondelete="SET NULL"), nullable=True, index=True
    )
    destination_center_id: Mapped[uuid.UUID | None] = mapped_column(
        UUID(as_uuid=True), ForeignKey("centers.id", ondelete="SET NULL"), nullable=True
    )
    container_ref: Mapped[str | None] = mapped_column(String(40), nullable=True)
    seal_intact: Mapped[bool | None] = mapped_column(Boolean, nullable=True)
    temperature_note: Mapped[str | None] = mapped_column(String(80), nullable=True)
    dispatched_at: Mapped[datetime | None] = mapped_column(DateTime(timezone=True), nullable=True)
    received_at: Mapped[datetime | None] = mapped_column(DateTime(timezone=True), nullable=True)
    received_by_id: Mapped[uuid.UUID | None] = mapped_column(
        UUID(as_uuid=True), ForeignKey("users.id", ondelete="SET NULL"), nullable=True
    )
    notes: Mapped[str | None] = mapped_column(Text, nullable=True)


class VisitPayment(Base, TimestampMixin):
    """A payment taken by the collector at the visit (cash / UPI)."""

    __tablename__ = "visit_payments"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=new_uuid)
    visit_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True),
        ForeignKey("home_visits.id", ondelete="CASCADE"),
        nullable=False,
        index=True,
    )
    amount_paise: Mapped[int] = mapped_column(Integer, nullable=False)
    mode: Mapped[str] = mapped_column(String(10), nullable=False)  # cash | upi
    reference: Mapped[str | None] = mapped_column(String(80), nullable=True)
    collected_by_id: Mapped[uuid.UUID | None] = mapped_column(
        UUID(as_uuid=True), ForeignKey("users.id", ondelete="SET NULL"), nullable=True
    )
    reconciled_at: Mapped[datetime | None] = mapped_column(DateTime(timezone=True), nullable=True)
    reconciled_by_id: Mapped[uuid.UUID | None] = mapped_column(
        UUID(as_uuid=True), ForeignKey("users.id", ondelete="SET NULL"), nullable=True
    )


class LabReport(Base, TimestampMixin):
    """An authorized laboratory report document (versioned)."""

    __tablename__ = "lab_reports"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=new_uuid)
    reference: Mapped[str] = mapped_column(String(20), unique=True, nullable=False)
    visit_id: Mapped[uuid.UUID | None] = mapped_column(
        UUID(as_uuid=True),
        ForeignKey("home_visits.id", ondelete="SET NULL"),
        nullable=True,
        index=True,
    )
    account_id: Mapped[uuid.UUID | None] = mapped_column(
        UUID(as_uuid=True), ForeignKey("users.id", ondelete="SET NULL"), nullable=True, index=True
    )
    profile_id: Mapped[uuid.UUID | None] = mapped_column(
        UUID(as_uuid=True), ForeignKey("patient_profiles.id", ondelete="SET NULL"), nullable=True
    )
    booking_ids: Mapped[list] = mapped_column(JSON, default=list, nullable=False)
    title: Mapped[str] = mapped_column(String(200), nullable=False)
    version: Mapped[int] = mapped_column(Integer, default=1, nullable=False)
    is_partial: Mapped[bool] = mapped_column(Boolean, default=False, nullable=False)
    status: Mapped[str] = mapped_column(String(12), default="draft", nullable=False, index=True)
    file_path: Mapped[str] = mapped_column(String, nullable=False)
    lis_accession: Mapped[str | None] = mapped_column(String(60), nullable=True)
    authorized_by_name: Mapped[str | None] = mapped_column(String(120), nullable=True)
    authorized_at: Mapped[datetime | None] = mapped_column(DateTime(timezone=True), nullable=True)
    released_at: Mapped[datetime | None] = mapped_column(DateTime(timezone=True), nullable=True)
    released_by_id: Mapped[uuid.UUID | None] = mapped_column(
        UUID(as_uuid=True), ForeignKey("users.id", ondelete="SET NULL"), nullable=True
    )
    supersedes_id: Mapped[uuid.UUID | None] = mapped_column(
        UUID(as_uuid=True), ForeignKey("lab_reports.id", ondelete="SET NULL"), nullable=True
    )
    amendment_note: Mapped[str | None] = mapped_column(Text, nullable=True)


class ReportAccessLog(Base):
    __tablename__ = "report_access_logs"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    report_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True),
        ForeignKey("lab_reports.id", ondelete="CASCADE"),
        nullable=False,
        index=True,
    )
    user_id: Mapped[uuid.UUID | None] = mapped_column(UUID(as_uuid=True), nullable=True)
    channel: Mapped[str] = mapped_column(String(20), default="app", nullable=False)
    ip_address: Mapped[str | None] = mapped_column(String(64), nullable=True)
    accessed_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), server_default=func.now(), nullable=False
    )


class CollectEvent(Base):
    """Append-only audit trail for every visit/job/specimen/report transition."""

    __tablename__ = "collect_events"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    visit_id: Mapped[uuid.UUID | None] = mapped_column(
        UUID(as_uuid=True), nullable=True, index=True
    )
    entity_type: Mapped[str] = mapped_column(
        String(16), nullable=False
    )  # visit|job|specimen|manifest|report|payment
    entity_id: Mapped[str] = mapped_column(String(64), nullable=False, index=True)
    event: Mapped[str] = mapped_column(String(40), nullable=False)
    from_status: Mapped[str | None] = mapped_column(String(24), nullable=True)
    to_status: Mapped[str | None] = mapped_column(String(24), nullable=True)
    actor_id: Mapped[uuid.UUID | None] = mapped_column(UUID(as_uuid=True), nullable=True)
    actor_role: Mapped[str | None] = mapped_column(String(40), nullable=True)
    lat: Mapped[float | None] = mapped_column(Float, nullable=True)
    lng: Mapped[float | None] = mapped_column(Float, nullable=True)
    details: Mapped[dict | None] = mapped_column(JSON, nullable=True)
    patient_visible: Mapped[bool] = mapped_column(Boolean, default=False, nullable=False)
    at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), server_default=func.now(), nullable=False, index=True
    )


class IdempotencyRecord(Base):
    """First response for an (actor, Idempotency-Key) pair, replayed on retries."""

    __tablename__ = "idempotency_records"
    __table_args__ = (UniqueConstraint("actor_id", "key", name="uq_idempotency_actor_key"),)

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    actor_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), nullable=False)
    key: Mapped[str] = mapped_column(String(80), nullable=False)
    route: Mapped[str] = mapped_column(String(120), nullable=False)
    status_code: Mapped[int] = mapped_column(Integer, nullable=False)
    response: Mapped[dict | list | None] = mapped_column(JSON, nullable=True)
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), server_default=func.now(), nullable=False
    )


class DeviceToken(Base, TimestampMixin):
    __tablename__ = "device_tokens"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=new_uuid)
    user_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), ForeignKey("users.id", ondelete="CASCADE"), nullable=False, index=True
    )
    token: Mapped[str] = mapped_column(String(400), unique=True, nullable=False)
    platform: Mapped[str] = mapped_column(String(10), nullable=False)  # android | ios
    app: Mapped[str] = mapped_column(String(12), nullable=False)  # patient | collector
    last_seen_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), server_default=func.now(), nullable=False
    )


class InboxMessage(Base, TimestampMixin):
    """In-app notification shown in the apps (mirrors push)."""

    __tablename__ = "inbox_messages"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=new_uuid)
    user_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), ForeignKey("users.id", ondelete="CASCADE"), nullable=False, index=True
    )
    kind: Mapped[str] = mapped_column(String(40), nullable=False)
    title: Mapped[str] = mapped_column(String(120), nullable=False)
    body: Mapped[str] = mapped_column(Text, nullable=False)
    data: Mapped[dict | None] = mapped_column(JSON, nullable=True)
    read_at: Mapped[datetime | None] = mapped_column(DateTime(timezone=True), nullable=True)


class LisSyncTask(Base, TimestampMixin):
    """Outbox for LIS (ITDOSE) calls, retried until synced or dead-lettered."""

    __tablename__ = "lis_sync_tasks"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=new_uuid)
    kind: Mapped[str] = mapped_column(
        String(30), nullable=False
    )  # register_order | fetch_status | fetch_report
    entity_id: Mapped[str] = mapped_column(String(64), nullable=False, index=True)
    payload: Mapped[dict | None] = mapped_column(JSON, nullable=True)
    status: Mapped[str] = mapped_column(String(12), default="pending", nullable=False, index=True)
    attempts: Mapped[int] = mapped_column(Integer, default=0, nullable=False)
    last_error: Mapped[str | None] = mapped_column(Text, nullable=True)
    next_attempt_at: Mapped[datetime | None] = mapped_column(DateTime(timezone=True), nullable=True)
    updated_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), server_default=func.now(), onupdate=func.now(), nullable=False
    )

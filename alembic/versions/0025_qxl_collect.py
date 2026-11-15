"""QXL Collect: home visits, collection jobs, specimens, custody, lab reports

Additive only: new tables (see docs/COLLECT.md) plus nullable/ defaulted
columns on ``bookings`` (visit grouping, family profile, lab/LIS state) and
``test_catalog`` (specimen requirements). Existing website flows are unchanged.

Revision ID: 0025_qxl_collect
Revises: 0024_specialities_team_pkg
Create Date: 2026-11-15

"""

from __future__ import annotations

from collections.abc import Sequence

import uuid

import sqlalchemy as sa

from alembic import op

revision: str = "0025_qxl_collect"
down_revision: str | None = "0024_specialities_team_pkg"
branch_labels: str | Sequence[str] | None = None
depends_on: str | Sequence[str] | None = None

# Built-in QXL Collect roles. "field" tier = Collector app only (no admin panel).
SEED_ROLES = [
    ("collector", "Collector (Phlebotomist)", "field", ["field.collect"]),
    ("courier", "Courier", "field", ["field.transport"]),
    ("dispatcher", "Dispatcher", "staff", ["appointments.view", "home_collection.manage", "dispatch.manage", "collect.metrics"]),
    ("lab_receiving", "Lab Receiving", "staff", ["lab.receive"]),
    ("lab_reporting", "Lab Reporting", "staff", ["lab.receive", "lab.report"]),
]


def upgrade() -> None:
    op.create_table('collect_events',
    sa.Column('id', sa.Integer(), autoincrement=True, nullable=False),
    sa.Column('visit_id', sa.UUID(), nullable=True),
    sa.Column('entity_type', sa.String(length=16), nullable=False),
    sa.Column('entity_id', sa.String(length=64), nullable=False),
    sa.Column('event', sa.String(length=40), nullable=False),
    sa.Column('from_status', sa.String(length=24), nullable=True),
    sa.Column('to_status', sa.String(length=24), nullable=True),
    sa.Column('actor_id', sa.UUID(), nullable=True),
    sa.Column('actor_role', sa.String(length=40), nullable=True),
    sa.Column('lat', sa.Float(), nullable=True),
    sa.Column('lng', sa.Float(), nullable=True),
    sa.Column('details', sa.JSON(), nullable=True),
    sa.Column('patient_visible', sa.Boolean(), nullable=False),
    sa.Column('at', sa.DateTime(timezone=True), server_default=sa.text('now()'), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_collect_events_at'), 'collect_events', ['at'], unique=False)
    op.create_index(op.f('ix_collect_events_entity_id'), 'collect_events', ['entity_id'], unique=False)
    op.create_index(op.f('ix_collect_events_visit_id'), 'collect_events', ['visit_id'], unique=False)
    op.create_table('idempotency_records',
    sa.Column('id', sa.Integer(), autoincrement=True, nullable=False),
    sa.Column('actor_id', sa.UUID(), nullable=False),
    sa.Column('key', sa.String(length=80), nullable=False),
    sa.Column('route', sa.String(length=120), nullable=False),
    sa.Column('status_code', sa.Integer(), nullable=False),
    sa.Column('response', sa.JSON(), nullable=True),
    sa.Column('created_at', sa.DateTime(timezone=True), server_default=sa.text('now()'), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('actor_id', 'key', name='uq_idempotency_actor_key')
    )
    op.create_table('lis_sync_tasks',
    sa.Column('id', sa.UUID(), nullable=False),
    sa.Column('kind', sa.String(length=30), nullable=False),
    sa.Column('entity_id', sa.String(length=64), nullable=False),
    sa.Column('payload', sa.JSON(), nullable=True),
    sa.Column('status', sa.String(length=12), nullable=False),
    sa.Column('attempts', sa.Integer(), nullable=False),
    sa.Column('last_error', sa.Text(), nullable=True),
    sa.Column('next_attempt_at', sa.DateTime(timezone=True), nullable=True),
    sa.Column('updated_at', sa.DateTime(timezone=True), server_default=sa.text('now()'), nullable=False),
    sa.Column('created_at', sa.DateTime(timezone=True), server_default=sa.text('now()'), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_lis_sync_tasks_entity_id'), 'lis_sync_tasks', ['entity_id'], unique=False)
    op.create_index(op.f('ix_lis_sync_tasks_status'), 'lis_sync_tasks', ['status'], unique=False)
    op.create_table('collector_profiles',
    sa.Column('user_id', sa.UUID(), nullable=False),
    sa.Column('employee_code', sa.String(length=20), nullable=False),
    sa.Column('display_name', sa.String(length=120), nullable=False),
    sa.Column('photo_url', sa.String(), nullable=True),
    sa.Column('contact_phone', sa.String(length=20), nullable=True),
    sa.Column('zone', sa.String(length=40), nullable=False),
    sa.Column('shift_start', sa.String(length=5), nullable=False),
    sa.Column('shift_end', sa.String(length=5), nullable=False),
    sa.Column('working_days', sa.JSON(), nullable=False),
    sa.Column('competencies', sa.JSON(), nullable=False),
    sa.Column('qualification', sa.String(length=200), nullable=True),
    sa.Column('max_daily_jobs', sa.Integer(), nullable=False),
    sa.Column('home_lat', sa.Float(), nullable=True),
    sa.Column('home_lng', sa.Float(), nullable=True),
    sa.Column('is_active', sa.Boolean(), nullable=False),
    sa.Column('on_duty', sa.Boolean(), nullable=False),
    sa.Column('updated_at', sa.DateTime(timezone=True), server_default=sa.text('now()'), nullable=False),
    sa.Column('created_at', sa.DateTime(timezone=True), server_default=sa.text('now()'), nullable=False),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ondelete='CASCADE'),
    sa.PrimaryKeyConstraint('user_id'),
    sa.UniqueConstraint('employee_code')
    )
    op.create_index(op.f('ix_collector_profiles_zone'), 'collector_profiles', ['zone'], unique=False)
    op.create_table('device_tokens',
    sa.Column('id', sa.UUID(), nullable=False),
    sa.Column('user_id', sa.UUID(), nullable=False),
    sa.Column('token', sa.String(length=400), nullable=False),
    sa.Column('platform', sa.String(length=10), nullable=False),
    sa.Column('app', sa.String(length=12), nullable=False),
    sa.Column('last_seen_at', sa.DateTime(timezone=True), server_default=sa.text('now()'), nullable=False),
    sa.Column('created_at', sa.DateTime(timezone=True), server_default=sa.text('now()'), nullable=False),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ondelete='CASCADE'),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('token')
    )
    op.create_index(op.f('ix_device_tokens_user_id'), 'device_tokens', ['user_id'], unique=False)
    op.create_table('inbox_messages',
    sa.Column('id', sa.UUID(), nullable=False),
    sa.Column('user_id', sa.UUID(), nullable=False),
    sa.Column('kind', sa.String(length=40), nullable=False),
    sa.Column('title', sa.String(length=120), nullable=False),
    sa.Column('body', sa.Text(), nullable=False),
    sa.Column('data', sa.JSON(), nullable=True),
    sa.Column('read_at', sa.DateTime(timezone=True), nullable=True),
    sa.Column('created_at', sa.DateTime(timezone=True), server_default=sa.text('now()'), nullable=False),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ondelete='CASCADE'),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_inbox_messages_user_id'), 'inbox_messages', ['user_id'], unique=False)
    op.create_table('patient_addresses',
    sa.Column('id', sa.UUID(), nullable=False),
    sa.Column('account_id', sa.UUID(), nullable=False),
    sa.Column('label', sa.String(length=40), nullable=False),
    sa.Column('house', sa.String(length=200), nullable=False),
    sa.Column('street', sa.String(length=200), nullable=True),
    sa.Column('locality', sa.String(length=120), nullable=False),
    sa.Column('city', sa.String(length=60), nullable=False),
    sa.Column('pincode', sa.String(length=6), nullable=False),
    sa.Column('landmark', sa.String(length=200), nullable=True),
    sa.Column('instructions', sa.Text(), nullable=True),
    sa.Column('lat', sa.Float(), nullable=True),
    sa.Column('lng', sa.Float(), nullable=True),
    sa.Column('is_default', sa.Boolean(), nullable=False),
    sa.Column('created_at', sa.DateTime(timezone=True), server_default=sa.text('now()'), nullable=False),
    sa.ForeignKeyConstraint(['account_id'], ['users.id'], ondelete='CASCADE'),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_patient_addresses_account_id'), 'patient_addresses', ['account_id'], unique=False)
    op.create_index(op.f('ix_patient_addresses_pincode'), 'patient_addresses', ['pincode'], unique=False)
    op.create_table('patient_profiles',
    sa.Column('id', sa.UUID(), nullable=False),
    sa.Column('account_id', sa.UUID(), nullable=False),
    sa.Column('reference', sa.String(length=20), nullable=False),
    sa.Column('full_name', sa.String(length=120), nullable=False),
    sa.Column('date_of_birth', sa.Date(), nullable=False),
    sa.Column('gender', sa.String(length=12), nullable=True),
    sa.Column('relation', sa.String(length=12), nullable=False),
    sa.Column('phone', sa.String(length=20), nullable=True),
    sa.Column('is_archived', sa.Boolean(), nullable=False),
    sa.Column('updated_at', sa.DateTime(timezone=True), server_default=sa.text('now()'), nullable=False),
    sa.Column('created_at', sa.DateTime(timezone=True), server_default=sa.text('now()'), nullable=False),
    sa.ForeignKeyConstraint(['account_id'], ['users.id'], ondelete='CASCADE'),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('reference')
    )
    op.create_index(op.f('ix_patient_profiles_account_id'), 'patient_profiles', ['account_id'], unique=False)
    op.create_table('service_areas',
    sa.Column('id', sa.UUID(), nullable=False),
    sa.Column('pincode', sa.String(length=6), nullable=False),
    sa.Column('locality', sa.String(length=120), nullable=True),
    sa.Column('zone', sa.String(length=40), nullable=False),
    sa.Column('is_active', sa.Boolean(), nullable=False),
    sa.Column('collection_fee_paise', sa.Integer(), nullable=True),
    sa.Column('lab_center_id', sa.UUID(), nullable=True),
    sa.Column('created_at', sa.DateTime(timezone=True), server_default=sa.text('now()'), nullable=False),
    sa.ForeignKeyConstraint(['lab_center_id'], ['centers.id'], ondelete='SET NULL'),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_service_areas_pincode'), 'service_areas', ['pincode'], unique=True)
    op.create_index(op.f('ix_service_areas_zone'), 'service_areas', ['zone'], unique=False)
    op.create_table('transport_manifests',
    sa.Column('id', sa.UUID(), nullable=False),
    sa.Column('reference', sa.String(length=24), nullable=False),
    sa.Column('status', sa.String(length=16), nullable=False),
    sa.Column('created_by_id', sa.UUID(), nullable=True),
    sa.Column('current_custodian_id', sa.UUID(), nullable=True),
    sa.Column('pending_receiver_id', sa.UUID(), nullable=True),
    sa.Column('destination_center_id', sa.UUID(), nullable=True),
    sa.Column('container_ref', sa.String(length=40), nullable=True),
    sa.Column('seal_intact', sa.Boolean(), nullable=True),
    sa.Column('temperature_note', sa.String(length=80), nullable=True),
    sa.Column('dispatched_at', sa.DateTime(timezone=True), nullable=True),
    sa.Column('received_at', sa.DateTime(timezone=True), nullable=True),
    sa.Column('received_by_id', sa.UUID(), nullable=True),
    sa.Column('notes', sa.Text(), nullable=True),
    sa.Column('created_at', sa.DateTime(timezone=True), server_default=sa.text('now()'), nullable=False),
    sa.ForeignKeyConstraint(['created_by_id'], ['users.id'], ondelete='SET NULL'),
    sa.ForeignKeyConstraint(['current_custodian_id'], ['users.id'], ondelete='SET NULL'),
    sa.ForeignKeyConstraint(['pending_receiver_id'], ['users.id'], ondelete='SET NULL'),
    sa.ForeignKeyConstraint(['destination_center_id'], ['centers.id'], ondelete='SET NULL'),
    sa.ForeignKeyConstraint(['received_by_id'], ['users.id'], ondelete='SET NULL'),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_transport_manifests_pending_receiver_id'), 'transport_manifests', ['pending_receiver_id'], unique=False)
    op.create_index(op.f('ix_transport_manifests_reference'), 'transport_manifests', ['reference'], unique=True)
    op.create_index(op.f('ix_transport_manifests_status'), 'transport_manifests', ['status'], unique=False)
    op.create_table('home_visits',
    sa.Column('id', sa.UUID(), nullable=False),
    sa.Column('reference', sa.String(length=24), nullable=False),
    sa.Column('account_id', sa.UUID(), nullable=True),
    sa.Column('profile_id', sa.UUID(), nullable=True),
    sa.Column('idempotency_key', sa.String(length=80), nullable=True),
    sa.Column('source', sa.String(length=20), nullable=False),
    sa.Column('status', sa.String(length=20), nullable=False),
    sa.Column('payment_mode', sa.String(length=16), nullable=False),
    sa.Column('patient_name', sa.String(length=120), nullable=False),
    sa.Column('patient_dob', sa.Date(), nullable=True),
    sa.Column('patient_gender', sa.String(length=12), nullable=True),
    sa.Column('patient_phone', sa.String(length=20), nullable=False),
    sa.Column('visit_code', sa.String(length=4), nullable=False),
    sa.Column('house', sa.String(length=200), nullable=False),
    sa.Column('street', sa.String(length=200), nullable=True),
    sa.Column('locality', sa.String(length=120), nullable=False),
    sa.Column('city', sa.String(length=60), nullable=False),
    sa.Column('pincode', sa.String(length=6), nullable=False),
    sa.Column('landmark', sa.String(length=200), nullable=True),
    sa.Column('address_instructions', sa.Text(), nullable=True),
    sa.Column('lat', sa.Float(), nullable=True),
    sa.Column('lng', sa.Float(), nullable=True),
    sa.Column('zone', sa.String(length=40), nullable=False),
    sa.Column('slot_date', sa.Date(), nullable=False),
    sa.Column('slot_label', sa.String(length=40), nullable=False),
    sa.Column('items_total_paise', sa.Integer(), nullable=False),
    sa.Column('collection_fee_paise', sa.Integer(), nullable=False),
    sa.Column('consent_version', sa.String(length=20), nullable=True),
    sa.Column('consent_accepted_at', sa.DateTime(timezone=True), nullable=True),
    sa.Column('notes', sa.Text(), nullable=True),
    sa.Column('cancel_reason', sa.Text(), nullable=True),
    sa.Column('reschedule_count', sa.Integer(), nullable=False),
    sa.Column('updated_at', sa.DateTime(timezone=True), server_default=sa.text('now()'), nullable=False),
    sa.Column('created_at', sa.DateTime(timezone=True), server_default=sa.text('now()'), nullable=False),
    sa.ForeignKeyConstraint(['account_id'], ['users.id'], ondelete='SET NULL'),
    sa.ForeignKeyConstraint(['profile_id'], ['patient_profiles.id'], ondelete='SET NULL'),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('account_id', 'idempotency_key', name='uq_visit_idempotency')
    )
    op.create_index(op.f('ix_home_visits_account_id'), 'home_visits', ['account_id'], unique=False)
    op.create_index(op.f('ix_home_visits_pincode'), 'home_visits', ['pincode'], unique=False)
    op.create_index(op.f('ix_home_visits_reference'), 'home_visits', ['reference'], unique=True)
    op.create_index(op.f('ix_home_visits_slot_date'), 'home_visits', ['slot_date'], unique=False)
    op.create_index(op.f('ix_home_visits_status'), 'home_visits', ['status'], unique=False)
    op.create_index(op.f('ix_home_visits_zone'), 'home_visits', ['zone'], unique=False)
    op.create_table('collection_jobs',
    sa.Column('id', sa.UUID(), nullable=False),
    sa.Column('reference', sa.String(length=20), nullable=False),
    sa.Column('visit_id', sa.UUID(), nullable=False),
    sa.Column('kind', sa.String(length=16), nullable=False),
    sa.Column('collector_id', sa.UUID(), nullable=True),
    sa.Column('status', sa.String(length=24), nullable=False),
    sa.Column('assigned_by_id', sa.UUID(), nullable=True),
    sa.Column('assignment_mode', sa.String(length=10), nullable=True),
    sa.Column('assigned_at', sa.DateTime(timezone=True), nullable=True),
    sa.Column('acknowledged_at', sa.DateTime(timezone=True), nullable=True),
    sa.Column('en_route_at', sa.DateTime(timezone=True), nullable=True),
    sa.Column('arrived_at', sa.DateTime(timezone=True), nullable=True),
    sa.Column('arrival_lat', sa.Float(), nullable=True),
    sa.Column('arrival_lng', sa.Float(), nullable=True),
    sa.Column('completed_at', sa.DateTime(timezone=True), nullable=True),
    sa.Column('identity_verified_at', sa.DateTime(timezone=True), nullable=True),
    sa.Column('identity_method', sa.String(length=40), nullable=True),
    sa.Column('identity_failures', sa.Integer(), nullable=False),
    sa.Column('outcome_reason', sa.Text(), nullable=True),
    sa.Column('checklist', sa.JSON(), nullable=True),
    sa.Column('is_delayed', sa.Boolean(), nullable=False),
    sa.Column('delay_note', sa.Text(), nullable=True),
    sa.Column('last_lat', sa.Float(), nullable=True),
    sa.Column('last_lng', sa.Float(), nullable=True),
    sa.Column('last_location_at', sa.DateTime(timezone=True), nullable=True),
    sa.Column('recollect_specimen_ids', sa.JSON(), nullable=True),
    sa.Column('updated_at', sa.DateTime(timezone=True), server_default=sa.text('now()'), nullable=False),
    sa.Column('created_at', sa.DateTime(timezone=True), server_default=sa.text('now()'), nullable=False),
    sa.ForeignKeyConstraint(['assigned_by_id'], ['users.id'], ondelete='SET NULL'),
    sa.ForeignKeyConstraint(['collector_id'], ['users.id'], ondelete='SET NULL'),
    sa.ForeignKeyConstraint(['visit_id'], ['home_visits.id'], ondelete='CASCADE'),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('reference')
    )
    op.create_index(op.f('ix_collection_jobs_collector_id'), 'collection_jobs', ['collector_id'], unique=False)
    op.create_index(op.f('ix_collection_jobs_status'), 'collection_jobs', ['status'], unique=False)
    op.create_index(op.f('ix_collection_jobs_visit_id'), 'collection_jobs', ['visit_id'], unique=False)
    op.create_table('lab_reports',
    sa.Column('id', sa.UUID(), nullable=False),
    sa.Column('reference', sa.String(length=20), nullable=False),
    sa.Column('visit_id', sa.UUID(), nullable=True),
    sa.Column('account_id', sa.UUID(), nullable=True),
    sa.Column('profile_id', sa.UUID(), nullable=True),
    sa.Column('booking_ids', sa.JSON(), nullable=False),
    sa.Column('title', sa.String(length=200), nullable=False),
    sa.Column('version', sa.Integer(), nullable=False),
    sa.Column('is_partial', sa.Boolean(), nullable=False),
    sa.Column('status', sa.String(length=12), nullable=False),
    sa.Column('file_path', sa.String(), nullable=False),
    sa.Column('lis_accession', sa.String(length=60), nullable=True),
    sa.Column('authorized_by_name', sa.String(length=120), nullable=True),
    sa.Column('authorized_at', sa.DateTime(timezone=True), nullable=True),
    sa.Column('released_at', sa.DateTime(timezone=True), nullable=True),
    sa.Column('released_by_id', sa.UUID(), nullable=True),
    sa.Column('supersedes_id', sa.UUID(), nullable=True),
    sa.Column('amendment_note', sa.Text(), nullable=True),
    sa.Column('created_at', sa.DateTime(timezone=True), server_default=sa.text('now()'), nullable=False),
    sa.ForeignKeyConstraint(['account_id'], ['users.id'], ondelete='SET NULL'),
    sa.ForeignKeyConstraint(['profile_id'], ['patient_profiles.id'], ondelete='SET NULL'),
    sa.ForeignKeyConstraint(['released_by_id'], ['users.id'], ondelete='SET NULL'),
    sa.ForeignKeyConstraint(['supersedes_id'], ['lab_reports.id'], ondelete='SET NULL'),
    sa.ForeignKeyConstraint(['visit_id'], ['home_visits.id'], ondelete='SET NULL'),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('reference')
    )
    op.create_index(op.f('ix_lab_reports_account_id'), 'lab_reports', ['account_id'], unique=False)
    op.create_index(op.f('ix_lab_reports_status'), 'lab_reports', ['status'], unique=False)
    op.create_index(op.f('ix_lab_reports_visit_id'), 'lab_reports', ['visit_id'], unique=False)
    op.create_table('visit_payments',
    sa.Column('id', sa.UUID(), nullable=False),
    sa.Column('visit_id', sa.UUID(), nullable=False),
    sa.Column('amount_paise', sa.Integer(), nullable=False),
    sa.Column('mode', sa.String(length=10), nullable=False),
    sa.Column('reference', sa.String(length=80), nullable=True),
    sa.Column('collected_by_id', sa.UUID(), nullable=True),
    sa.Column('reconciled_at', sa.DateTime(timezone=True), nullable=True),
    sa.Column('reconciled_by_id', sa.UUID(), nullable=True),
    sa.Column('created_at', sa.DateTime(timezone=True), server_default=sa.text('now()'), nullable=False),
    sa.ForeignKeyConstraint(['collected_by_id'], ['users.id'], ondelete='SET NULL'),
    sa.ForeignKeyConstraint(['reconciled_by_id'], ['users.id'], ondelete='SET NULL'),
    sa.ForeignKeyConstraint(['visit_id'], ['home_visits.id'], ondelete='CASCADE'),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_visit_payments_visit_id'), 'visit_payments', ['visit_id'], unique=False)
    op.create_table('collector_locations',
    sa.Column('id', sa.Integer(), autoincrement=True, nullable=False),
    sa.Column('job_id', sa.UUID(), nullable=False),
    sa.Column('collector_id', sa.UUID(), nullable=False),
    sa.Column('lat', sa.Float(), nullable=False),
    sa.Column('lng', sa.Float(), nullable=False),
    sa.Column('accuracy_m', sa.Float(), nullable=True),
    sa.Column('speed_mps', sa.Float(), nullable=True),
    sa.Column('recorded_at', sa.DateTime(timezone=True), nullable=False),
    sa.ForeignKeyConstraint(['job_id'], ['collection_jobs.id'], ondelete='CASCADE'),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_collector_locations_job_id'), 'collector_locations', ['job_id'], unique=False)
    op.create_table('report_access_logs',
    sa.Column('id', sa.Integer(), autoincrement=True, nullable=False),
    sa.Column('report_id', sa.UUID(), nullable=False),
    sa.Column('user_id', sa.UUID(), nullable=True),
    sa.Column('channel', sa.String(length=20), nullable=False),
    sa.Column('ip_address', sa.String(length=64), nullable=True),
    sa.Column('accessed_at', sa.DateTime(timezone=True), server_default=sa.text('now()'), nullable=False),
    sa.ForeignKeyConstraint(['report_id'], ['lab_reports.id'], ondelete='CASCADE'),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_report_access_logs_report_id'), 'report_access_logs', ['report_id'], unique=False)
    op.create_table('specimens',
    sa.Column('id', sa.UUID(), nullable=False),
    sa.Column('barcode', sa.String(length=40), nullable=False),
    sa.Column('visit_id', sa.UUID(), nullable=False),
    sa.Column('job_id', sa.UUID(), nullable=False),
    sa.Column('booking_ids', sa.JSON(), nullable=False),
    sa.Column('container_type', sa.String(length=40), nullable=False),
    sa.Column('sample_type', sa.String(length=60), nullable=True),
    sa.Column('status', sa.String(length=16), nullable=False),
    sa.Column('collected_at', sa.DateTime(timezone=True), nullable=False),
    sa.Column('collected_by_id', sa.UUID(), nullable=True),
    sa.Column('volume_ml', sa.Float(), nullable=True),
    sa.Column('observations', sa.Text(), nullable=True),
    sa.Column('custodian_id', sa.UUID(), nullable=True),
    sa.Column('manifest_id', sa.UUID(), nullable=True),
    sa.Column('received_at', sa.DateTime(timezone=True), nullable=True),
    sa.Column('received_by_id', sa.UUID(), nullable=True),
    sa.Column('decision_reason', sa.String(length=60), nullable=True),
    sa.Column('decision_notes', sa.Text(), nullable=True),
    sa.Column('recollect_of_id', sa.UUID(), nullable=True),
    sa.Column('client_ref', sa.String(length=80), nullable=True),
    sa.Column('updated_at', sa.DateTime(timezone=True), server_default=sa.text('now()'), nullable=False),
    sa.Column('created_at', sa.DateTime(timezone=True), server_default=sa.text('now()'), nullable=False),
    sa.ForeignKeyConstraint(['collected_by_id'], ['users.id'], ondelete='SET NULL'),
    sa.ForeignKeyConstraint(['custodian_id'], ['users.id'], ondelete='SET NULL'),
    sa.ForeignKeyConstraint(['job_id'], ['collection_jobs.id'], ondelete='CASCADE'),
    sa.ForeignKeyConstraint(['manifest_id'], ['transport_manifests.id'], ondelete='SET NULL'),
    sa.ForeignKeyConstraint(['received_by_id'], ['users.id'], ondelete='SET NULL'),
    sa.ForeignKeyConstraint(['recollect_of_id'], ['specimens.id'], ondelete='SET NULL'),
    sa.ForeignKeyConstraint(['visit_id'], ['home_visits.id'], ondelete='CASCADE'),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_specimens_barcode'), 'specimens', ['barcode'], unique=True)
    op.create_index(op.f('ix_specimens_job_id'), 'specimens', ['job_id'], unique=False)
    op.create_index(op.f('ix_specimens_status'), 'specimens', ['status'], unique=False)
    op.create_index(op.f('ix_specimens_visit_id'), 'specimens', ['visit_id'], unique=False)
    op.add_column('bookings', sa.Column('visit_id', sa.UUID(), nullable=True))
    op.add_column('bookings', sa.Column('profile_id', sa.UUID(), nullable=True))
    op.add_column('bookings', sa.Column('lab_status', sa.String(length=16), server_default='not_received', nullable=False))
    op.add_column('bookings', sa.Column('lis_accession', sa.String(length=60), nullable=True))
    op.add_column('bookings', sa.Column('lis_sync_status', sa.String(length=16), server_default='not_applicable', nullable=False))
    op.create_index(op.f('ix_bookings_lis_accession'), 'bookings', ['lis_accession'], unique=False)
    op.create_index(op.f('ix_bookings_visit_id'), 'bookings', ['visit_id'], unique=False)
    op.create_foreign_key('fk_bookings_profile_id', 'bookings', 'patient_profiles', ['profile_id'], ['id'], ondelete='SET NULL')
    op.create_foreign_key('fk_bookings_visit_id', 'bookings', 'home_visits', ['visit_id'], ['id'], ondelete='SET NULL')
    op.add_column('test_catalog', sa.Column('sample_type', sa.String(length=60), nullable=True))
    op.add_column('test_catalog', sa.Column('container_type', sa.String(length=40), nullable=True))
    op.add_column('test_catalog', sa.Column('specimen_instructions', sa.Text(), nullable=True))
    op.add_column('test_catalog', sa.Column('fasting_required', sa.Boolean(), nullable=True))


    roles = sa.table(
        "custom_roles",
        sa.column("id", sa.UUID()),
        sa.column("key", sa.String()),
        sa.column("label", sa.String()),
        sa.column("tier", sa.String()),
        sa.column("permissions", sa.JSON()),
        sa.column("is_system", sa.Boolean()),
    )
    conn = op.get_bind()
    for key, label, tier, perms in SEED_ROLES:
        exists = conn.execute(sa.text("SELECT 1 FROM custom_roles WHERE key = :k"), {"k": key}).first()
        if exists is None:
            conn.execute(
                roles.insert().values(
                    id=uuid.uuid4(), key=key, label=label, tier=tier, permissions=perms, is_system=True
                )
            )


def downgrade() -> None:
    op.execute(
        sa.text("DELETE FROM custom_roles WHERE is_system AND key IN :keys").bindparams(
            sa.bindparam("keys", value=tuple(r[0] for r in SEED_ROLES), expanding=True)
        )
    )
    op.drop_constraint('fk_bookings_visit_id', 'bookings', type_='foreignkey')
    op.drop_constraint('fk_bookings_profile_id', 'bookings', type_='foreignkey')
    op.drop_index(op.f('ix_bookings_visit_id'), table_name='bookings')
    op.drop_index(op.f('ix_bookings_lis_accession'), table_name='bookings')
    op.drop_column('bookings', 'lis_sync_status')
    op.drop_column('bookings', 'lis_accession')
    op.drop_column('bookings', 'lab_status')
    op.drop_column('bookings', 'profile_id')
    op.drop_column('bookings', 'visit_id')
    op.drop_column('test_catalog', 'fasting_required')
    op.drop_column('test_catalog', 'specimen_instructions')
    op.drop_column('test_catalog', 'container_type')
    op.drop_column('test_catalog', 'sample_type')
    op.drop_table('specimens')
    op.drop_table('report_access_logs')
    op.drop_table('collector_locations')
    op.drop_table('visit_payments')
    op.drop_table('lab_reports')
    op.drop_table('collection_jobs')
    op.drop_table('home_visits')
    op.drop_table('transport_manifests')
    op.drop_table('service_areas')
    op.drop_table('patient_profiles')
    op.drop_table('patient_addresses')
    op.drop_table('inbox_messages')
    op.drop_table('device_tokens')
    op.drop_table('collector_profiles')
    op.drop_table('lis_sync_tasks')
    op.drop_table('idempotency_records')
    op.drop_table('collect_events')

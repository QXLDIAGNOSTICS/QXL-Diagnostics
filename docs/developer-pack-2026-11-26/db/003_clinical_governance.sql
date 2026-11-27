-- Reference version registry only; no patient data or clinical rule defaults.
BEGIN;
CREATE SCHEMA IF NOT EXISTS qxl_clinical;
CREATE TABLE IF NOT EXISTS qxl_clinical.version_registry (
  entity_id text NOT NULL, version text NOT NULL,
  entity_type text NOT NULL CHECK(entity_type IN ('article','biomarker_rule','risk_model','radar_pathway')),
  source_urls text[] NOT NULL CHECK(cardinality(source_urls)>0),
  content_hash text NOT NULL CHECK(content_hash ~ '^[0-9a-f]{64}$'),
  eligibility jsonb NOT NULL, limitations text NOT NULL,
  status text NOT NULL DEFAULT 'draft' CHECK(status IN ('draft','approved','retired')),
  approved_by text, approved_at timestamptz, validation_ref text,
  PRIMARY KEY(entity_id,version),
  CHECK(status<>'approved' OR (approved_by IS NOT NULL AND approved_at IS NOT NULL AND validation_ref IS NOT NULL))
);
-- Only authorised clinical governance service can create/approve versions. Application reads approved versions only.
REVOKE ALL ON SCHEMA qxl_clinical FROM PUBLIC;
REVOKE ALL ON ALL TABLES IN SCHEMA qxl_clinical FROM PUBLIC;
COMMIT;
-- Add append-only audit events and enforced immutability after approval using existing identity/role system.
-- No public model release until independent validation and local regulatory review.

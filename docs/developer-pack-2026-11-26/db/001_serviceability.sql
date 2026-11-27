-- PostgreSQL reference migration. Map existing QXL IDs; do not replace existing tables.
BEGIN;
CREATE SCHEMA IF NOT EXISTS qxl_service;
CREATE TABLE IF NOT EXISTS qxl_service.post_office (
  pin text NOT NULL CHECK(pin ~ '^[1-9][0-9]{5}$'),
  office_name text NOT NULL, district text NOT NULL, state text NOT NULL,
  source_url text NOT NULL, imported_at timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY(pin,office_name,district,state)
);
CREATE TABLE IF NOT EXISTS qxl_service.coverage (
  pin text PRIMARY KEY CHECK(pin ~ '^[1-9][0-9]{5}$'),
  hub_id text NOT NULL, enabled boolean NOT NULL DEFAULT false,
  base_fee_paise integer NOT NULL CHECK(base_fee_paise>=0),
  free_above_paise integer CHECK(free_above_paise>=0),
  valid_until timestamptz NOT NULL, approved_by text NOT NULL,
  CHECK(length(trim(approved_by))>0)
);
CREATE TABLE IF NOT EXISTS qxl_service.test_policy (
  test_id text PRIMARY KEY, home_allowed boolean NOT NULL DEFAULT false,
  specimen text NOT NULL, transport_sop_version text NOT NULL,
  stability_minutes integer CHECK(stability_minutes>0),
  policy_version text NOT NULL, valid_until timestamptz NOT NULL,
  approved_by text NOT NULL
);
CREATE TABLE IF NOT EXISTS qxl_service.hub_test (
  hub_id text NOT NULL, test_id text NOT NULL REFERENCES qxl_service.test_policy(test_id),
  approved boolean NOT NULL DEFAULT false, valid_until timestamptz NOT NULL,
  PRIMARY KEY(hub_id,test_id)
);
-- Public eligibility is provisional, not appointment confirmation.
-- p_subtotal_paise MUST be computed by the server from the current catalogue, never client supplied.
CREATE OR REPLACE FUNCTION qxl_service.check_eligibility(p_pin text,p_test_ids text[],p_subtotal_paise integer)
RETURNS jsonb LANGUAGE plpgsql STABLE SECURITY INVOKER AS $$
DECLARE c qxl_service.coverage%ROWTYPE; missing text[]; fee integer;
BEGIN
 IF p_pin IS NULL OR p_pin !~ '^[1-9][0-9]{5}$' OR p_test_ids IS NULL OR cardinality(p_test_ids) NOT BETWEEN 1 AND 100 OR array_position(p_test_ids,NULL) IS NOT NULL OR p_subtotal_paise IS NULL OR p_subtotal_paise<0 THEN
 RETURN jsonb_build_object('status','INVALID_INPUT'); END IF;
 IF NOT EXISTS(SELECT 1 FROM qxl_service.post_office WHERE pin=p_pin) THEN
 RETURN jsonb_build_object('status','PIN_NOT_VERIFIED'); END IF;
 SELECT * INTO c FROM qxl_service.coverage WHERE pin=p_pin AND enabled AND valid_until>now();
 IF NOT FOUND THEN RETURN jsonb_build_object('status','MANUAL_SERVICE_CHECK'); END IF;
 SELECT array_agg(DISTINCT i.id) INTO missing FROM unnest(p_test_ids) i(id)
 LEFT JOIN qxl_service.test_policy t ON t.test_id=i.id AND t.home_allowed AND t.valid_until>now() AND t.stability_minutes IS NOT NULL
 LEFT JOIN qxl_service.hub_test h ON h.test_id=i.id AND h.hub_id=c.hub_id AND h.approved AND h.valid_until>now()
 WHERE t.test_id IS NULL OR h.test_id IS NULL;
 IF missing IS NOT NULL THEN RETURN jsonb_build_object('status','TEST_REQUIRES_REVIEW','test_ids',missing); END IF;
 fee:=CASE WHEN c.free_above_paise IS NOT NULL AND p_subtotal_paise>=c.free_above_paise THEN 0 ELSE c.base_fee_paise END;
 RETURN jsonb_build_object('status','PROVISIONALLY_ELIGIBLE','hub_id',c.hub_id,'collection_fee_paise',fee,'slot_confirmed',false,'address_check_required',true);
END; $$;
REVOKE ALL ON FUNCTION qxl_service.check_eligibility(text,text[],integer) FROM PUBLIC;
COMMIT;
-- Grant execution and minimal table read access to existing trusted application role only.
-- Final reservation must atomically recheck policies, price, transport feasibility, address and slot capacity.

-- Run using psql from this directory after normalising official India Post CSV into
-- pincode.csv columns: pin,office_name,district,state. Review district aliases and coverage manually.
-- Source: https://data.gov.in/catalog/all-india-pincode-directory-through-webservice
BEGIN;
CREATE TEMP TABLE postal_stage(pin text,office_name text,district text,state text);
\copy postal_stage FROM 'pincode.csv' WITH (FORMAT csv, HEADER true)
-- Fail closed for empty or malformed imports; never silently drop postal offices.
DO $$ BEGIN
 IF NOT EXISTS (SELECT 1 FROM postal_stage) OR EXISTS(SELECT 1 FROM postal_stage WHERE pin IS NULL OR trim(pin) !~ '^[1-9][0-9]{5}$' OR nullif(trim(office_name),'') IS NULL OR nullif(trim(district),'') IS NULL OR nullif(trim(state),'') IS NULL) THEN
 RAISE EXCEPTION 'Invalid postal source; review CSV'; END IF;
END $$;
INSERT INTO qxl_service.post_office(pin,office_name,district,state,source_url)
SELECT DISTINCT trim(pin),trim(office_name),trim(district),trim(state),'https://data.gov.in/catalog/all-india-pincode-directory-through-webservice' FROM postal_stage
ON CONFLICT(pin,office_name,district,state) DO UPDATE SET imported_at=now(),source_url=excluded.source_url;
COMMIT;
-- Import does NOT activate coverage. Logistics owner must approve each PIN and hub separately.
-- Reconcile removed/renamed offices before retiring records; never delete active coverage automatically.

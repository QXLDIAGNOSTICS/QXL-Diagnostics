# QXL Collect — home collection, dispatch, custody and report release

Additive extension of the FastAPI backend. Existing website contracts are unchanged:
a website booking is still one `bookings` row per test/package. The mobile apps and the
ops portal group those rows under a **home visit**.

## Identifiers

| Thing | Table | Human reference |
|---|---|---|
| Account | `users` | — |
| Patient (family member) | `patient_profiles` | `QXL-PAT-XXXXXX` |
| Home visit (order) | `home_visits` | `QXL-HC-YYMMDD-XXXX` |
| Test order line | `bookings` (`visit_id` set) | booking UUID |
| Field job (one per attempt) | `collection_jobs` | `QXL-JOB-XXXXXX` |
| Physical specimen | `specimens` | the scanned pre-printed barcode |
| Transport manifest | `transport_manifests` | `QXL-MFT-YYMMDD-XXXX` |
| Online payment | `payments` (Razorpay) | Razorpay order/payment ids |
| Offline payment | `visit_payments` | cash / UPI reference |
| LIS accession | `bookings.lis_accession` | ITDOSE number |
| Report | `lab_reports` (versioned) | `QXL-RPT-XXXXXX` |

## Separate status machines

- **Visit** (`home_visits.status`): `pending_payment` → `confirmed` → `completed`; `cancelled`.
  Pay-at-collection visits are `confirmed` immediately.
- **Payment** (`bookings.payment_status`): `unpaid | pending | paid | failed | refunded | pay_on_visit`.
  Only a verified Razorpay signature/webhook or a collector-recorded offline payment sets `paid`.
- **Field job** (`collection_jobs.status`): `unassigned → assigned → acknowledged → en_route →
  arrived → collected | partially_collected | unsuccessful`; `cancelled` (reassigned, visit
  cancelled). A recollection is a new job with `kind = recollection`.
- **Specimen** (`specimens.status`): `collected → handed_over → in_transit → received →
  accepted | rejected | on_hold`; `missing`, `damaged`.
- **Lab, per test** (`bookings.lab_status`): `not_received | received | in_progress | under_review |
  partial | delayed | on_hold | authorized`.
- **Report** (`lab_reports.status`): `draft → released`; `superseded` (amended), `revoked`.
  Patients only ever see `released` reports whose authorization was recorded.

Every transition is written to `collect_events` (entity, from → to, actor user + role, time,
location when relevant, JSON details). That table is the audit trail and the patient timeline.

## Roles

New built-in staff roles (strings on `users.role`, like the existing ones):
`collector` (phlebotomist), `courier`, `dispatcher`, `lab_receiving`, `lab_reporting`.
Admin/super-admin pass every check. Ops portal permissions: `dispatch.manage`,
`lab.receive`, `lab.report`, `collect.metrics`.

## Rules enforced server-side

- Home visits require sign-in, a profile with **date of birth**, a serviceable PIN code
  (`service_areas`), home-collection-eligible active items, and a slot with capacity.
- `POST /home-visits` and every collector mutation accept an `Idempotency-Key`; replays return
  the first result (no duplicate visits, specimens, payments or status jumps).
- Slot capacity counts **visits**, not tests: `collectors on shift in the zone ×
  VISITS_PER_COLLECTOR_PER_SLOT`, falling back to `HOME_VISIT_DEFAULT_SLOT_CAPACITY` when a
  zone has no collector rosters yet.
- Collection cannot complete unless identity was verified (full name + DOB; optional 4-digit
  visit code) on that job. Failed checks are recorded and block completion.
- A barcode can be bound to exactly one specimen, ever. A recollection gets a new barcode and
  `recollect_of_id` points to the rejected specimen.
- Live location is accepted only from the assigned collector while the job is `en_route` or
  `arrived`; patients can read it only for their own visit in those states; points older than
  10 minutes are not shown.
- Patients can cancel/reschedule their own visit until the job is `en_route`; afterwards the API
  returns 409 and the app routes them to support. Refunds stay a staff action.
- Report access: owner only, `released` only, returns a 5-minute signed URL and logs the access.

## Endpoints (prefix `/api/v1`)

Patient: `GET|POST /me/profiles`, `PATCH|DELETE /me/profiles/{id}`, `GET|POST /me/addresses`,
`PATCH|DELETE /me/addresses/{id}`, `GET /service-areas/check?pincode=`,
`GET /home-collection/slots?date=&pincode=`, `POST|GET /home-visits`, `GET /home-visits/{id}`,
`GET /home-visits/{id}/tracking`, `POST /home-visits/{id}/cancel`,
`POST /home-visits/{id}/reschedule`, `GET /me/reports`, `POST /me/reports/{id}/access`,
`POST|DELETE /me/devices`, `GET /me/inbox`, `POST /me/inbox/read`.

Collector / courier: `GET /collector/me`, `POST /collector/me/duty`, `GET /collector/jobs`,
`GET /collector/jobs/{id}`, `POST /collector/jobs/{id}/{acknowledge|start|arrive|verify-identity|
specimens|complete|exception|location}`, `GET /collector/specimens`, `POST /manifests`,
`GET /courier/manifests`, `POST /manifests/{id}/{accept|transfer}`,
`POST /specimens/{barcode}/issue`. Every job action takes an `Idempotency-Key` and returns
the updated job (same shape as `GET /collector/jobs/{id}`); `location` returns `{accepted}`.

Ops / lab (qxl-admin): `/ops/visits…`, `/ops/collectors…`, `/ops/service-areas…`, `/ops/live`,
`/ops/alerts`, `/ops/metrics`, `/lab/specimens/{barcode}…`, `/lab/manifests/{id}/receive`,
`/lab/bookings/{id}/status`, `/lab/reports…`, `/lab/lis/tasks…`.

## ITDOSE

`app/services/lis/` defines `LisAdapter` (`register_order`, `fetch_status`, `fetch_report`).
The shipped `ManualLisAdapter` does nothing remotely; lab staff enter accession numbers, test
status and the authorized PDF in the portal. `lis_sync_tasks` is an outbox with retries and a
dead-letter state so a vendor adapter can be dropped in without changing callers. Do not invent
ITDOSE endpoints — implement the adapter only from the vendor-approved specification.

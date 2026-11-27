# Integration and security release matrix (staging, synthetic data only)
Do not use live patients, real payments or public report IDs. Use vendor-approved ITDOSE sandbox and payment sandbox. Developer must supply endpoint mappings, auth and documented fixtures; no credentials in source or reports. Test in two isolated tenant accounts. Production smoke checks are read-only or controlled approved test transactions.

| ID | Scenario | Required result |
|---|---|---|
| INT01 | Unknown PIN, inactive PIN, invalid PIN | No promised service, safe review or validation response |
| INT02 | Known PIN, non-home test or expired policy | Block home reservation; no default eligibility |
| INT03 | Client tampers with price or fee | Server calculates price; mismatch requires confirmation |
| INT04 | Two requests for last slot | Only one reservation, transactional capacity check |
| INT05 | Duplicate booking retry | Same idempotency key and request returns same booking; altered request rejected |
| INT06 | Payment invalid signature, wrong amount/currency/order | No paid state or LIS submission |
| INT07 | Duplicate/out-of-order payment webhook | One transition and one outbox entry; no duplicate charges or LIS records |
| INT08 | Payment failure/timeout/refund | Explicit status, reconciliation and auditable reversal |
| INT09 | ITDOSE timeout or duplicate acknowledgement | Retry with stable external ID; reconcile before duplicate create |
| INT10 | Specimen barcode mismatch, rejected or delayed specimen | Block accession or route exception, audit and escalation |
| INT11 | Unauthorised or preliminary report | Never released to patient |
| INT12 | Cross-patient / cross-tenant object ID | 403/404, no data leak even when ID is valid |
| INT13 | OTP wrong/expired/reused/too many attempts | Deny, rate limit, no sensitive details |
| INT14 | Malicious upload / oversize / wrong MIME | Reject or quarantine; private storage and scanning |
| INT15 | Revoked session or disabled staff | Reject access; audit log |
| INT16 | Backup restore | Demonstrated restore and agreed RPO/RTO |
| INT17 | Critical result | LIS-authorised clinician escalation and acknowledgement; no reliance on website |
| INT18 | Analytics and third-party scripts | No patient/test/order/report IDs or sensitive URLs transmitted |
| INT19 | Clinical model disabled or missing input | No risk score or false reassurance |
| INT20 | Mobile/keyboard/error handling | Accessible validation, recoverable booking states |

## Required transaction pattern
Create booking and payment order on server; store amount in paise and currency; atomically reserve slots with expiry; use idempotency key scoped to authenticated actor + request hash; verify provider webhook against raw bytes using official SDK and compare order, amount and currency; enforce unique provider event ID; lock booking row in transaction; change state only if allowed; insert durable outbox message in same transaction. Worker submits to LIS using stable external reference and reconciles timeouts before resubmission. Never log raw medical data or payment secrets. Reports come only from authorised LIS, use short-lived authenticated download or proxy with object-level authorisation, Cache-Control: private, no-store. OTP alone must not bypass identity/access checks. Use a real transactional adapter and provider documentation; do not guess vendor API routes.

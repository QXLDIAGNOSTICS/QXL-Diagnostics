# Nettyfish / DLT SMS templates to register

India's TRAI DLT (Distributed Ledger Technology) regulation requires every
SMS sent to Indian mobile numbers to match a **pre-approved template**
registered against your Principal Entity ID (you already have one:
`NETTYFISH_PRINCIPLE_ENTITY_ID`). Sending text that doesn't match an
approved template gets silently dropped by the carrier (or rejected by
Nettyfish with an error code) — it does not "just work" with a single OTP
template like we currently use for login.

The appointments desk now sends 6 automatic message types + 1 generic
message staff can use for ad-hoc notes. **Each needs its own DLT template
ID**, submitted and approved separately. This document has the exact copy
to submit for each one, plus where to plug the resulting template ID into
the backend once approved.

## How to register a template with Nettyfish/your DLT operator

1. Log in to your telecom operator's DLT portal (Jio/Airtel/Vi DLT — the one
   you used to register your existing OTP template and Sender ID
   `QUALHE`/Principal Entity `1701172958278856319`).
2. Go to **Templates → Add Template**, choose category:
   - **Transactional** for Confirmation, Payment, Reminder, Reschedule,
     Cancellation, and Custom (these relate to a service the customer
     already engaged, not marketing).
   - **Promotional** or **Service Implicit** for the Offer template (check
     with your DLT operator which bucket fits "reminder to rebook" — some
     treat this as Transactional/Service Implicit since the recipient is an
     existing patient, others require Promotional consent).
3. Paste the exact template text below (including the `{#var#}` markers —
   these are literal placeholders DLT understands, not something to fill
   in yourself).
4. Submit for approval (usually 15 minutes–24 hours). You'll receive a
   **Template ID** (a long numeric string, same format as your existing
   `NETTYFISH_TEMPLATE_ID`).
5. Also register/link the template under your Nettyfish account so Nettyfish
   accepts it as a valid `TemplateId` in the `SendSMS` API call — ask
   Nettyfish support to sync/import the DLT template if it doesn't appear
   automatically in your Nettyfish dashboard.
6. Put the approved Template ID into `qxl-backend/.env` against the matching
   variable (see table below), then restart the backend.

## Templates to submit

> Sender ID: `QUALHE` — Principal Entity ID: `1701172958278856319`
> (reuse your existing registered values; only the template text below is new)

### 1. Appointment confirmation — `NETTYFISH_TEMPLATE_ID_CONFIRMATION`

```
Dear {#var#}, your {#var#} appointment with QXL Diagnostics is confirmed for {#var#}. For changes, call us. - QXL Diagnostics
```

Variables in order: patient first name, test/package name, date & time slot.

### 2. Payment received — `NETTYFISH_TEMPLATE_ID_PAYMENT`

```
Dear {#var#}, we have received your payment of Rs.{#var#} for {#var#} at QXL Diagnostics. Thank you. - QXL Diagnostics
```

Variables in order: patient first name, amount (numeric, no currency symbol), test/package name.

### 3. Appointment reminder — `NETTYFISH_TEMPLATE_ID_REMINDER`

```
Dear {#var#}, this is a reminder for your {#var#} appointment with QXL Diagnostics on {#var#}. See you soon. - QXL Diagnostics
```

Variables in order: patient first name, test/package name, date & time slot.

### 4. Appointment rescheduled — `NETTYFISH_TEMPLATE_ID_RESCHEDULE`

```
Dear {#var#}, your {#var#} appointment with QXL Diagnostics has been rescheduled to {#var#}. Call us for queries. - QXL Diagnostics
```

Variables in order: patient first name, test/package name, new date & time slot.

### 5. Appointment cancelled — `NETTYFISH_TEMPLATE_ID_CANCELLATION`

```
Dear {#var#}, your {#var#} appointment with QXL Diagnostics scheduled for {#var#} has been cancelled. Call us to rebook. - QXL Diagnostics
```

Variables in order: patient first name, test/package name, original date & time slot.

### 6. Offer / re-booking reminder — `NETTYFISH_TEMPLATE_ID_OFFER`

```
Dear {#var#}, QXL Diagnostics has a special offer on health checkup packages this month. Call us to book. - QXL Diagnostics
```

Variable: patient first name. (This one may need to go under the
**Promotional** category depending on your operator's classification —
if so, it can only be sent to numbers that haven't opted out via NDNC/DND.)

### 7. Custom staff message — `NETTYFISH_TEMPLATE_ID_CUSTOM`

```
Dear {#var#}, {#var#} - QXL Diagnostics
```

Variables: patient first name, free-text message typed by staff in the
Notify dialog. **Heads-up:** some DLT operators reject fully free-text
templates like this because the second `{#var#}` isn't a bounded value —
if it gets rejected, the practical workaround is to skip a generic
"custom" template and instead register 2–3 more fixed templates for your
most common ad-hoc scenarios (e.g. "report ready", "please call the lab",
"documents pending") and have staff pick the closest one instead of typing
free text. Until this template is approved, custom SMS sends will just be
skipped (logged only) — custom **email** is unaffected and always works
once SMTP is configured (see `GMAIL_SMTP_SETUP.md`), since DLT rules don't
apply to email.

## Where these plug into the backend

`qxl-backend/.env`:

```bash
NETTYFISH_TEMPLATE_ID_CONFIRMATION=<id from step 1>
NETTYFISH_TEMPLATE_ID_PAYMENT=<id from step 2>
NETTYFISH_TEMPLATE_ID_REMINDER=<id from step 3>
NETTYFISH_TEMPLATE_ID_RESCHEDULE=<id from step 4>
NETTYFISH_TEMPLATE_ID_CANCELLATION=<id from step 5>
NETTYFISH_TEMPLATE_ID_OFFER=<id from step 6>
NETTYFISH_TEMPLATE_ID_CUSTOM=<id from step 7, optional>
```

Until a given type's ID is filled in, that notification type is skipped for
SMS (logged as "no DLT-approved template ID configured") but **email still
sends normally** if SMTP is configured — so it's safe to roll these out one
at a time as each gets approved.

## Why the message wording can't just be edited freely

The backend builds these exact sentences in
`app/services/notification_templates.py` (`build_default()`). If you ever
change the wording there, the live SMS text will no longer match what's
registered on DLT, and Nettyfish/the carrier will reject the send with a
template-mismatch error — so any wording change must be submitted as a
*new* DLT template (and the corresponding `.env` value + code updated
together).

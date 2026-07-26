# Gmail SMTP setup guide (for booking/payment email notifications)

The backend sends OTP and appointment emails (confirmation, payment receipt,
reminders, reschedule, cancellation, offers, custom messages) through plain
SMTP. This guide shows how to use a Gmail (or Google Workspace) mailbox as
the sender, using an **App Password** — Google no longer allows plain
account passwords for SMTP apps.

Whenever `SMTP_HOST` is left blank, the backend just logs the email instead
of sending it, so nothing breaks if you skip this — but no real emails go
out until it's configured.

## 1. Requirements

- A Gmail address you're happy to send from (e.g. `notifications@qxldiagnostics.com`
  if it's a Google Workspace mailbox, or any `@gmail.com` account).
- **2-Step Verification must be turned on** for that account — App Passwords
  only appear once 2FA is enabled.

## 2. Turn on 2-Step Verification

1. Go to https://myaccount.google.com/security
2. Under "How you sign in to Google", click **2-Step Verification** and
   follow the prompts (phone number + code) to enable it.

## 3. Create an App Password

1. Go to https://myaccount.google.com/apppasswords (you may need to sign in
   again).
   - If that link 404s, it usually means 2-Step Verification isn't fully
     enabled yet, or your Workspace admin has disabled App Passwords —
     ask your Google Workspace admin to allow "Less secure apps / App
     Passwords" for your account, or use the admin's SMTP relay instead
     (see section 6 below).
2. Under "App name", type something recognizable, e.g. `QXL Backend`, and
   click **Create**.
3. Google shows a **16-character password** (four groups of four letters,
   e.g. `abcd efgh ijkl mnop`). Copy it now — it's only shown once.

## 4. Fill in the backend `.env`

Edit `qxl-backend/.env` (create it from `.env.example` if it doesn't exist)
and set:

```bash
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USERNAME=notifications@qxldiagnostics.com   # the Gmail/Workspace address
SMTP_PASSWORD=abcdefghijklmnop                   # the 16-char App Password, no spaces
SMTP_FROM_EMAIL=notifications@qxldiagnostics.com # must match SMTP_USERNAME for Gmail
SMTP_USE_TLS=true
```

Notes:

- Remove spaces from the App Password when pasting it in (`abcd efgh ijkl mnop`
  → `abcdefghijklmnop`).
- `SMTP_FROM_EMAIL` **must be the same mailbox** as `SMTP_USERNAME` (or an
  alias verified on that account) — Gmail rejects mail sent "from" an
  address it doesn't recognize as yours.
- Port `587` (STARTTLS, `SMTP_USE_TLS=true`) is what the backend uses by
  default. Gmail also accepts port `465` (implicit TLS), but the current
  code only implements STARTTLS, so stick with `587`.

## 5. Restart the backend and test

1. Restart the FastAPI process (or redeploy) so the new env vars are picked
   up.
2. Trigger any flow that sends an email — e.g. log in with OTP using an
   email address, or use the **Notify** button on an appointment in
   `admin.qxldiagnostics.com` → Appointments → choose channel "Email" or
   "Both".
3. Check the backend logs: a successful send has no "Email not sent" warning;
   a misconfigured one logs `Email not sent (SMTP not configured)` or a
   stack trace from `smtplib` (usually an auth error if the App Password is
   wrong, or "less secure app" if 2FA/App Passwords aren't set up).

## 6. Gmail sending limits & production alternative

- A personal Gmail account is capped at **500 emails/day**, and Google
  Workspace accounts at **2,000/day**. This is fine for a single diagnostic
  centre's transactional volume, but if you scale up (bulk marketing offers
  to thousands of patients at once), consider a dedicated transactional
  email provider (e.g. Amazon SES, Postmark, SendGrid, Brevo) — they use
  the exact same `SMTP_HOST`/`SMTP_PORT`/`SMTP_USERNAME`/`SMTP_PASSWORD`
  fields, so switching later is a one-line `.env` change, no code changes
  needed.
- If your Workspace admin disables App Passwords account-wide, ask them to
  either: (a) allowlist App Passwords for this one service account, or
  (b) give you SMTP relay credentials (Google Workspace SMTP relay), which
  also plug directly into the same `SMTP_*` settings.

## 7. Troubleshooting

| Symptom | Likely cause |
|---|---|
| "Email not sent (SMTP not configured)" in logs | `SMTP_HOST` or `SMTP_FROM_EMAIL` is blank |
| `smtplib.SMTPAuthenticationError` | Wrong App Password, or using your normal Gmail password instead of the App Password |
| `smtplib.SMTPSenderRefused` | `SMTP_FROM_EMAIL` doesn't match `SMTP_USERNAME`/its aliases |
| App Passwords page not showing | 2-Step Verification not fully enabled, or account is Workspace-managed with App Passwords disabled by admin |
| Emails land in Spam | Add an SPF/DKIM record for your domain in Google Workspace admin (Gmail Send-As), or switch to a dedicated transactional provider (see above) |

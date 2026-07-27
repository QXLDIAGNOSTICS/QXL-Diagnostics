# Razorpay webhook setup (5-minute guide)

The webhook is the **source of truth** for payment status — it confirms a payment
server-to-server even if the patient closes their browser right after paying, so
"payment done" always gets recorded correctly even when the client-side callback
never fires. The endpoint already exists in this codebase at:

```
POST /api/v1/payments/webhook
```

## 1. Get your public backend URL

Whatever domain your FastAPI backend is deployed on, e.g.:

```
https://api.qxldiagnostics.com/api/v1/payments/webhook
```

## 2. Add the webhook in the Razorpay Dashboard

1. Log in to the [Razorpay Dashboard](https://dashboard.razorpay.com/).
2. Go to **Settings → Webhooks → + Add New Webhook**.
3. **Webhook URL**: paste the URL from step 1.
4. **Secret**: click "generate" or type your own strong secret — copy it, you'll need it in step 3.
5. **Active events** — tick at least:
   - `payment.captured`
   - `payment.failed`
   - `order.paid`
   - `refund.processed` (optional, if you plan to issue refunds)
6. Click **Create Webhook**.

Do this once for **Test Mode** (while developing) and again for **Live Mode**
(before going to production) — they have separate secrets.

## 3. Add the secret to the backend

In `qxl-backend/.env` (and in your Vercel/hosting provider's environment
variables for production):

```
RAZORPAY_WEBHOOK_SECRET=<the secret you copied in step 2>
```

Restart the backend after setting it. Until this is set, the webhook endpoint
will safely reject all requests with `401 Unauthorized` and log a warning —
so nothing breaks, it just isn't verifying anything yet.

## 4. Test it

From the Razorpay Dashboard, open your webhook and click **Test Webhook** →
choose `payment.captured` → **Send Test Webhook**. You should see a `200 OK`
response and, in the backend logs:

```
Razorpay webhook processed: event=payment.captured order_id=...
```

For a real end-to-end check: make an actual ₹1 test payment in Test Mode and
confirm the booking's payment status flips to "paid" in the admin Appointments
page, and the "Payment received" toast/bell alert appears there.

## How it fits with the rest of the flow

- The **client-side checkout success callback** (`/payments/verify`) is the
  fast-path — it updates the UI instantly.
- The **webhook** (`/payments/webhook`) is the durable, server-verified
  confirmation — it fires independently and will still mark the booking paid
  even if the browser was closed before the fast-path callback ran.
- Both paths are idempotent: if the webhook and the client callback both
  confirm the same payment (or Razorpay retries the webhook), the patient
  only ever gets **one** "payment received" email/SMS, not a duplicate.
- If a payment is ever stuck (webhook missed for some reason), an admin can
  use **`POST /api/v1/payments/{payment_id}/reconcile`** to force a fresh
  status check directly against the Razorpay API.

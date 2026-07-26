# QXL Admin

Separate Next.js app for **admin.qxldiagnostics.com**.

Migrated from `qxl-frontend/src/app/admin` with role-based access:

| Role | Access |
|------|--------|
| `front_office` | Appointments, home collection, patients, reports |
| `admin` | Full CMS + appointments + create Front Office users |
| `super_admin` | Everything + create Administrators |

## Local development

```bash
cd qxl-admin
cp .env.local.example .env.local
npm install
npm run dev   # http://localhost:3001
```

Run the marketing site on `:3000` and this admin app on `:3001`. Both proxy `/api/*` to the same backend.

## Production deploy (Vercel)

1. Create a new Vercel project from `qxl-admin/`.
2. Set env `BACKEND_INTERNAL_URL` to the Railway API URL.
3. Attach domain `admin.qxldiagnostics.com`.
4. Add `https://admin.qxldiagnostics.com` to backend `CORS_ORIGINS`.
5. On the public site, set `NEXT_PUBLIC_ADMIN_URL=https://admin.qxldiagnostics.com` (legacy `/admin` redirects there).

## Staff login

Password → OTP, and that's it for regular staff (`front_office`, `staff`, `reception`,
`marketing`, `sales`, `admin`). Only the `super_admin` role is additionally asked for the
shared secret key (`ADMIN_ACCESS_KEY` on the backend) after the OTP step — the backend decides
this per-login and the UI only shows the field when it's actually required.

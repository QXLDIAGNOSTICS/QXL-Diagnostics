"use client";

import React, { useState } from "react";
import { Check, Copy, Loader2, ShieldAlert, UserPlus } from "lucide-react";
import { collectApi, type Collector, type FieldStaffCreate } from "@/lib/collectApi";
import { btnCls, btnGhostCls, Drawer, ErrorNote, errorText, inputCls } from "@/components/collect/ui";

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

function Field({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <label className="flex flex-col gap-1 text-sm">
      <span className="text-xs font-semibold uppercase text-slate-500">{label}</span>
      {children}
      {hint && <span className="text-xs text-slate-500">{hint}</span>}
    </label>
  );
}

/** Create a collector/courier login + field profile from the person's details. */
export function NewFieldStaffDrawer({
  onClose,
  onCreated,
}: {
  onClose: () => void;
  onCreated: (member: Collector, temporaryPassword: string) => void;
}) {
  const [form, setForm] = useState<FieldStaffCreate>({
    role: "collector",
    name: "",
    phone: "",
    email: "",
    date_of_birth: null,
    employee_code: "",
    zone: "default",
    shift_start: "07:00",
    shift_end: "15:00",
    working_days: [0, 1, 2, 3, 4, 5],
    competencies: [],
    qualification: null,
    max_daily_jobs: 12,
  });
  const [competencies, setCompetencies] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const set = (patch: Partial<FieldStaffCreate>) => setForm((f) => ({ ...f, ...patch }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (form.name.trim().length < 2) return setError("Enter the person's full name.");
    if (!/^\+?\d[\d\s-]{9,14}$/.test(form.phone.trim())) return setError("Enter a valid mobile number.");
    if (!/^\S+@\S+\.\S+$/.test(form.email.trim())) return setError("Enter a valid email — the second reset code goes there.");
    if (!form.employee_code.trim()) return setError("Employee code is required.");
    if (!form.working_days?.length) return setError("Choose at least one working day.");
    setBusy(true);
    setError(null);
    try {
      const r = await collectApi.createFieldStaff({
        ...form,
        name: form.name.trim(),
        phone: form.phone.trim(),
        email: form.email.trim().toLowerCase(),
        employee_code: form.employee_code.trim().toUpperCase(),
        zone: form.zone?.trim() || "default",
        date_of_birth: form.date_of_birth || null,
        qualification: form.qualification?.trim() || null,
        competencies: competencies
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean),
      });
      onCreated(r.member, r.temporary_password);
    } catch (err) {
      setError(errorText(err));
    } finally {
      setBusy(false);
    }
  };

  return (
    <Drawer open title="Add a collector or courier" onClose={onClose}>
      <form onSubmit={submit} className="space-y-4">
        <p className="text-sm text-slate-500">
          Creates their QXL Collector login and field profile. You&apos;ll get a one-time temporary password to hand
          over in person — they must replace it at first sign-in.
        </p>
        <ErrorNote message={error} />
        <div className="grid gap-3 sm:grid-cols-2">
          <Field label="Role">
            <select className={inputCls} value={form.role} onChange={(e) => set({ role: e.target.value as FieldStaffCreate["role"] })}>
              <option value="collector">Collector (phlebotomist)</option>
              <option value="courier">Courier</option>
            </select>
          </Field>
          <Field label="Employee code" hint="Printed on their QXL ID card">
            <input className={inputCls} value={form.employee_code} maxLength={20} onChange={(e) => set({ employee_code: e.target.value })} />
          </Field>
          <Field label="Full name (as on ID)">
            <input className={inputCls} value={form.name} maxLength={120} onChange={(e) => set({ name: e.target.value })} />
          </Field>
          <Field label="Date of birth">
            <input type="date" className={inputCls} value={form.date_of_birth ?? ""} onChange={(e) => set({ date_of_birth: e.target.value || null })} />
          </Field>
          <Field label="Mobile number" hint="Used to sign in and for the SMS code">
            <input className={inputCls} inputMode="tel" value={form.phone} onChange={(e) => set({ phone: e.target.value })} placeholder="+91 98765 43210" />
          </Field>
          <Field label="Email" hint="Also a sign-in name; receives the second reset code">
            <input className={inputCls} type="email" value={form.email} onChange={(e) => set({ email: e.target.value })} />
          </Field>
          <Field label="Zone" hint="Must match the zone of the PIN codes they serve">
            <input className={inputCls} value={form.zone} maxLength={40} onChange={(e) => set({ zone: e.target.value })} />
          </Field>
          <Field label="Max jobs per day">
            <input
              className={inputCls}
              inputMode="numeric"
              value={form.max_daily_jobs}
              onChange={(e) => set({ max_daily_jobs: Number(e.target.value.replace(/\D/g, "")) || 1 })}
            />
          </Field>
          <Field label="Shift start">
            <input type="time" className={inputCls} value={form.shift_start} onChange={(e) => set({ shift_start: e.target.value })} />
          </Field>
          <Field label="Shift end">
            <input type="time" className={inputCls} value={form.shift_end} onChange={(e) => set({ shift_end: e.target.value })} />
          </Field>
          <Field label="Qualification">
            <input className={inputCls} value={form.qualification ?? ""} maxLength={200} onChange={(e) => set({ qualification: e.target.value })} />
          </Field>
          <Field label="Competencies" hint="Comma separated, e.g. paediatric, geriatric">
            <input className={inputCls} value={competencies} onChange={(e) => setCompetencies(e.target.value)} />
          </Field>
        </div>
        <fieldset>
          <legend className="mb-1 text-xs font-semibold uppercase text-slate-500">Working days</legend>
          <div className="flex flex-wrap gap-3">
            {DAYS.map((d, i) => (
              <label key={d} className="flex items-center gap-1 text-sm">
                <input
                  type="checkbox"
                  checked={form.working_days?.includes(i) ?? false}
                  onChange={(e) =>
                    set({
                      working_days: e.target.checked
                        ? [...(form.working_days ?? []), i].sort()
                        : (form.working_days ?? []).filter((x) => x !== i),
                    })
                  }
                />
                {d}
              </label>
            ))}
          </div>
        </fieldset>
        <button className={btnCls} disabled={busy}>
          {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <UserPlus className="h-4 w-4" />} Create login
        </button>
      </form>
    </Drawer>
  );
}

/** Shows a temporary password once. It is never stored or shown again. */
export function CredentialsDialog({
  name,
  login,
  password,
  onClose,
}: {
  name: string;
  login: string;
  password: string;
  onClose: () => void;
}) {
  const [copied, setCopied] = useState(false);
  const [acknowledged, setAcknowledged] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(`QXL Collector login\nSign-in: ${login}\nTemporary password: ${password}`);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 p-4" role="dialog" aria-modal="true" aria-label="Temporary password">
      <div className="w-full max-w-md space-y-4 rounded-2xl bg-white p-6 shadow-2xl dark:bg-gray-900">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 text-amber-700">
            <ShieldAlert className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">Login for {name}</h2>
            <p className="text-xs text-slate-500">Shown once. Hand it over in person — don&apos;t send it by chat or email.</p>
          </div>
        </div>
        <dl className="space-y-2 rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-gray-800 dark:bg-gray-950">
          <div>
            <dt className="text-xs font-semibold uppercase text-slate-500">Sign in with</dt>
            <dd className="font-mono text-sm text-slate-900 dark:text-white">{login}</dd>
          </div>
          <div>
            <dt className="text-xs font-semibold uppercase text-slate-500">Temporary password</dt>
            <dd className="select-all font-mono text-2xl tracking-wider text-slate-900 dark:text-white">{password}</dd>
          </div>
        </dl>
        <ol className="list-decimal space-y-1 pl-5 text-sm text-slate-600 dark:text-slate-300">
          <li>They open QXL Collector and sign in with these details.</li>
          <li>They enter the one-time code sent to their phone.</li>
          <li>They choose their own password. This one then stops working.</li>
        </ol>
        <div className="flex flex-wrap gap-2">
          <button className={btnGhostCls} onClick={copy} type="button">
            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />} {copied ? "Copied" : "Copy"}
          </button>
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" checked={acknowledged} onChange={(e) => setAcknowledged(e.target.checked)} />
            I&apos;ve noted it down
          </label>
        </div>
        <button className={btnCls} disabled={!acknowledged} onClick={onClose} type="button">
          Done
        </button>
      </div>
    </div>
  );
}

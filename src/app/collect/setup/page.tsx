"use client";

import React, { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { KeyRound, Loader2, Pencil, Plus, Power, Save, UserPlus } from "lucide-react";
import { api, type Center } from "@/lib/api";
import { collectApi, human, rupees, type Collector, type FieldUser, type ServiceArea } from "@/lib/collectApi";
import { btnCls, btnGhostCls, Drawer, ErrorNote, errorText, inputCls, Panel, Pill } from "@/components/collect/ui";
import { CredentialsDialog, NewFieldStaffDrawer } from "@/components/collect/FieldStaff";
import { useAuth } from "@/lib/useAuth";
import { hasPermission } from "@/lib/roles";

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]; // index = Python weekday()

export default function CollectSetupPage() {
  const [collectors, setCollectors] = useState<Collector[]>([]);
  const [fieldUsers, setFieldUsers] = useState<FieldUser[]>([]);
  const [areas, setAreas] = useState<ServiceArea[]>([]);
  const [centers, setCenters] = useState<Center[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editing, setEditing] = useState<{ userId: string; existing: Collector | null; name: string } | null>(null);
  const [areaForm, setAreaForm] = useState<Omit<ServiceArea, "id"> | null>(null);
  const { user } = useAuth();
  const canManageLogins = hasPermission(user, "field_team.manage");
  const [creating, setCreating] = useState(false);
  const [credentials, setCredentials] = useState<{ name: string; login: string; password: string } | null>(null);
  const [busyId, setBusyId] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [c, f, a, centres] = await Promise.all([
        collectApi.collectors(true),
        collectApi.fieldUsers(),
        collectApi.serviceAreas(),
        api.centers.list().catch(() => [] as Center[]),
      ]);
      setCollectors(c);
      setFieldUsers(f);
      setAreas(a);
      setCenters(centres);
    } catch (e) {
      setError(errorText(e));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const withoutProfile = fieldUsers.filter((u) => !u.has_profile);

  const resetPassword = async (c: Collector) => {
    if (!window.confirm(`Issue a new temporary password for ${c.display_name}? They will be signed out on their phone.`)) return;
    setBusyId(c.user_id);
    setError(null);
    try {
      const r = await collectApi.resetFieldPassword(c.user_id);
      setCredentials({ name: c.display_name, login: c.email || c.login_phone || "", password: r.temporary_password });
      load();
    } catch (e) {
      setError(errorText(e));
    } finally {
      setBusyId(null);
    }
  };

  const toggleActive = async (c: Collector) => {
    const disabling = c.account_active !== false;
    let reason: string | undefined;
    if (disabling) {
      const r = window.prompt(
        `Disable ${c.display_name}'s login? They are signed out at once and their not-yet-started visits go back to the dispatch queue. Reason:`,
      );
      if (r === null) return;
      reason = r || undefined;
    }
    setBusyId(c.user_id);
    setError(null);
    try {
      await collectApi.setFieldStatus(c.user_id, !disabling, reason);
      load();
    } catch (e) {
      setError(errorText(e));
    } finally {
      setBusyId(null);
    }
  };
  const centreName = (id: string | null) => centers.find((c) => c.id === id)?.name ?? "—";

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Field team &amp; service areas</h1>
        <p className="text-sm text-slate-500">
          Field profiles, shifts and the PIN codes where home collection can be booked. Slot capacity = collectors on
          shift in a zone × visits per collector per slot.
        </p>
      </div>

      <ErrorNote message={error} />

      <Panel
        title="Field team"
        actions={
          canManageLogins ? (
            <button className={btnCls} onClick={() => setCreating(true)}>
              <UserPlus className="h-4 w-4" /> Add collector or courier
            </button>
          ) : undefined
        }
      >
        {loading ? (
          <Loader2 className="mx-auto h-5 w-5 animate-spin text-slate-400" />
        ) : (
          <>
            {withoutProfile.length > 0 && (
              <div className="mb-4 rounded-lg bg-amber-50 p-3 text-sm text-amber-900 dark:bg-amber-950/40 dark:text-amber-200">
                <p className="mb-2 font-semibold">Accounts without a field profile (cannot take jobs yet):</p>
                <div className="flex flex-wrap gap-2">
                  {withoutProfile.map((u) => (
                    <button
                      key={u.id}
                      className={btnGhostCls}
                      onClick={() => setEditing({ userId: u.id, existing: null, name: u.name || u.phone })}
                    >
                      <Plus className="h-4 w-4" /> {u.name || u.phone} ({human(u.role)})
                    </button>
                  ))}
                </div>
              </div>
            )}
            <p className="mb-3 text-xs text-slate-500">
              {canManageLogins
                ? "Add a person here: their QXL Collector login is created with a one-time temporary password you hand over in person. They set their own password at first sign-in and can reset it later with codes sent to their phone and email."
                : "Ask an administrator to create logins for new collectors and couriers."}{" "}
              Other staff accounts are on the{" "}
              <Link href="/users" className="font-semibold text-sky-700 hover:underline">
                Users
              </Link>{" "}
              page.
            </p>
            {collectors.length === 0 ? (
              <p className="text-sm text-slate-500">No field profiles yet.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="text-xs uppercase text-slate-500">
                    <tr>
                      <th className="py-2 pr-3">Name</th>
                      <th className="py-2 pr-3">Role</th>
                      <th className="py-2 pr-3">Zone</th>
                      <th className="py-2 pr-3">Shift</th>
                      <th className="py-2 pr-3">Days</th>
                      <th className="py-2 pr-3">Max/day</th>
                      <th className="py-2 pr-3">Status</th>
                      <th className="py-2" />
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-gray-800">
                    {collectors.map((c) => (
                      <tr key={c.user_id}>
                        <td className="py-2 pr-3">
                          <div className="font-semibold">{c.display_name}</div>
                          <div className="text-xs text-slate-500">
                            {c.employee_code}
                            {c.phone ? ` · ${c.phone}` : ""}
                          </div>
                        </td>
                        <td className="py-2 pr-3">{human(c.role)}</td>
                        <td className="py-2 pr-3">{c.zone}</td>
                        <td className="py-2 pr-3 whitespace-nowrap">
                          {c.shift_start}–{c.shift_end}
                        </td>
                        <td className="py-2 pr-3 text-xs">{c.working_days.map((d) => DAYS[d]).join(" ")}</td>
                        <td className="py-2 pr-3">{c.max_daily_jobs}</td>
                        <td className="py-2 pr-3">
                          <div className="flex flex-wrap gap-1">
                            {c.account_active === false ? (
                              <Pill tone="red">Login disabled</Pill>
                            ) : !c.is_active ? (
                              <Pill tone="red">Inactive</Pill>
                            ) : c.on_duty ? (
                              <Pill tone="green">On duty</Pill>
                            ) : (
                              <Pill>Off duty</Pill>
                            )}
                            {c.must_change_password && c.account_active !== false && <Pill tone="amber">Awaiting first sign-in</Pill>}
                            {c.locked && <Pill tone="red">Locked (wrong passwords)</Pill>}
                          </div>
                          {c.email && <div className="mt-1 text-xs text-slate-500">{c.email}</div>}
                        </td>
                        <td className="py-2">
                          <div className="flex justify-end gap-1.5">
                            <button
                              className={btnGhostCls}
                              onClick={() => setEditing({ userId: c.user_id, existing: c, name: c.display_name })}
                              aria-label={`Edit ${c.display_name}`}
                              title="Edit profile and shift"
                            >
                              <Pencil className="h-4 w-4" />
                            </button>
                            {canManageLogins && (
                              <>
                                <button
                                  className={btnGhostCls}
                                  disabled={busyId !== null || c.account_active === false}
                                  onClick={() => resetPassword(c)}
                                  aria-label={`New temporary password for ${c.display_name}`}
                                  title="New temporary password (also unlocks)"
                                >
                                  <KeyRound className="h-4 w-4" />
                                </button>
                                <button
                                  className={btnGhostCls}
                                  disabled={busyId !== null}
                                  onClick={() => toggleActive(c)}
                                  aria-label={`${c.account_active === false ? "Enable" : "Disable"} ${c.display_name}`}
                                  title={c.account_active === false ? "Enable login" : "Disable login"}
                                >
                                  {busyId === c.user_id ? <Loader2 className="h-4 w-4 animate-spin" /> : <Power className="h-4 w-4" />}
                                </button>
                              </>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </>
        )}
      </Panel>

      <Panel
        title={`Service areas (${areas.filter((a) => a.is_active).length} active PIN codes)`}
        actions={
          <button
            className={btnCls}
            onClick={() => setAreaForm({ pincode: "", locality: "", zone: "default", is_active: true, collection_fee_paise: null, lab_center_id: null })}
          >
            <Plus className="h-4 w-4" /> Add PIN code
          </button>
        }
      >
        {areaForm && (
          <AreaForm
            value={areaForm}
            centers={centers}
            onCancel={() => setAreaForm(null)}
            onSaved={() => {
              setAreaForm(null);
              load();
            }}
          />
        )}
        {areas.length === 0 ? (
          <p className="text-sm text-slate-500">
            No PIN codes yet — patients cannot book home collection until at least one is added.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="text-xs uppercase text-slate-500">
                <tr>
                  <th className="py-2 pr-3">PIN</th>
                  <th className="py-2 pr-3">Locality</th>
                  <th className="py-2 pr-3">Zone</th>
                  <th className="py-2 pr-3">Fee</th>
                  <th className="py-2 pr-3">Lab</th>
                  <th className="py-2 pr-3">Status</th>
                  <th className="py-2" />
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-gray-800">
                {areas.map((a) => (
                  <tr key={a.id}>
                    <td className="py-2 pr-3 font-semibold">{a.pincode}</td>
                    <td className="py-2 pr-3">{a.locality || "—"}</td>
                    <td className="py-2 pr-3">{a.zone}</td>
                    <td className="py-2 pr-3">{a.collection_fee_paise == null ? "Default rule" : rupees(a.collection_fee_paise)}</td>
                    <td className="py-2 pr-3">{centreName(a.lab_center_id)}</td>
                    <td className="py-2 pr-3">{a.is_active ? <Pill tone="green">Active</Pill> : <Pill>Disabled</Pill>}</td>
                    <td className="py-2">
                      <button className={btnGhostCls} onClick={() => setAreaForm({ ...a })} aria-label={`Edit ${a.pincode}`}>
                        <Pencil className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Panel>

      {creating && (
        <NewFieldStaffDrawer
          onClose={() => setCreating(false)}
          onCreated={(member, password) => {
            setCreating(false);
            setCredentials({ name: member.display_name, login: member.email || member.login_phone || "", password });
            load();
          }}
        />
      )}
      {credentials && <CredentialsDialog {...credentials} onClose={() => setCredentials(null)} />}

      {editing && (
        <CollectorDrawer
          key={editing.userId}
          userId={editing.userId}
          name={editing.name}
          existing={editing.existing}
          onClose={() => setEditing(null)}
          onSaved={() => {
            setEditing(null);
            load();
          }}
        />
      )}
    </div>
  );
}

function AreaForm({
  value,
  centers,
  onCancel,
  onSaved,
}: {
  value: Omit<ServiceArea, "id">;
  centers: Center[];
  onCancel: () => void;
  onSaved: () => void;
}) {
  const [form, setForm] = useState(value);
  const [fee, setFee] = useState(value.collection_fee_paise == null ? "" : String(value.collection_fee_paise / 100));
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const save = async () => {
    if (!/^\d{6}$/.test(form.pincode)) return setError("Enter a 6-digit PIN code.");
    const feeValue = fee.trim() === "" ? null : Math.round(Number(fee) * 100);
    if (feeValue !== null && (!Number.isFinite(feeValue) || feeValue < 0)) return setError("Enter a valid fee in rupees.");
    setBusy(true);
    setError(null);
    try {
      await collectApi.saveServiceArea({ ...form, locality: form.locality || null, collection_fee_paise: feeValue });
      onSaved();
    } catch (e) {
      setError(errorText(e));
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="mb-4 space-y-3 rounded-lg border border-slate-200 p-3 dark:border-gray-800">
      <ErrorNote message={error} />
      <div className="grid gap-3 sm:grid-cols-3">
        <Field label="PIN code">
          <input className={inputCls} inputMode="numeric" maxLength={6} value={form.pincode} onChange={(e) => setForm({ ...form, pincode: e.target.value.trim() })} />
        </Field>
        <Field label="Locality">
          <input className={inputCls} value={form.locality ?? ""} onChange={(e) => setForm({ ...form, locality: e.target.value })} />
        </Field>
        <Field label="Zone (matches collector zone)">
          <input className={inputCls} value={form.zone} onChange={(e) => setForm({ ...form, zone: e.target.value.trim() })} />
        </Field>
        <Field label="Collection fee override (₹, blank = default rule)">
          <input className={inputCls} inputMode="decimal" value={fee} onChange={(e) => setFee(e.target.value)} />
        </Field>
        <Field label="Receiving lab">
          <select className={inputCls} value={form.lab_center_id ?? ""} onChange={(e) => setForm({ ...form, lab_center_id: e.target.value || null })}>
            <option value="">Not set</option>
            {centers.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </Field>
        <label className="flex items-center gap-2 pt-6 text-sm">
          <input type="checkbox" checked={form.is_active} onChange={(e) => setForm({ ...form, is_active: e.target.checked })} />
          Accept bookings for this PIN
        </label>
      </div>
      <div className="flex gap-2">
        <button className={btnCls} onClick={save} disabled={busy}>
          {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />} Save
        </button>
        <button className={btnGhostCls} onClick={onCancel}>
          Cancel
        </button>
      </div>
    </div>
  );
}

function CollectorDrawer({
  userId,
  name,
  existing,
  onClose,
  onSaved,
}: {
  userId: string;
  name: string;
  existing: Collector | null;
  onClose: () => void;
  onSaved: () => void;
}) {
  const [employeeCode, setEmployeeCode] = useState(existing?.employee_code ?? "");
  const [displayName, setDisplayName] = useState(existing?.display_name ?? name);
  const [phone, setPhone] = useState(existing?.phone ?? "");
  const [zone, setZone] = useState(existing?.zone ?? "default");
  const [shiftStart, setShiftStart] = useState(existing?.shift_start ?? "07:00");
  const [shiftEnd, setShiftEnd] = useState(existing?.shift_end ?? "15:00");
  const [days, setDays] = useState<number[]>(existing?.working_days ?? [0, 1, 2, 3, 4, 5]);
  const [competencies, setCompetencies] = useState((existing?.competencies ?? []).join(", "));
  const [qualification, setQualification] = useState(existing?.qualification ?? "");
  const [maxJobs, setMaxJobs] = useState(String(existing?.max_daily_jobs ?? 12));
  const [active, setActive] = useState(existing?.is_active ?? true);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const save = async () => {
    if (!employeeCode.trim()) return setError("Employee code is required.");
    if (!days.length) return setError("Choose at least one working day.");
    setBusy(true);
    setError(null);
    try {
      await collectApi.saveCollector(userId, {
        employee_code: employeeCode.trim(),
        display_name: displayName.trim() || undefined,
        contact_phone: phone.trim() || null,
        zone: zone.trim() || "default",
        shift_start: shiftStart,
        shift_end: shiftEnd,
        working_days: [...days].sort(),
        competencies: competencies
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean),
        qualification: qualification.trim() || null,
        max_daily_jobs: Number(maxJobs) || 12,
        is_active: active,
      });
      onSaved();
    } catch (e) {
      setError(errorText(e));
    } finally {
      setBusy(false);
    }
  };

  return (
    <Drawer open title={existing ? `Edit ${existing.display_name}` : `Field profile for ${name}`} onClose={onClose}>
      <div className="space-y-4">
        <ErrorNote message={error} />
        <div className="grid gap-3 sm:grid-cols-2">
          <Field label="Employee code">
            <input className={inputCls} value={employeeCode} onChange={(e) => setEmployeeCode(e.target.value)} maxLength={20} />
          </Field>
          <Field label="Name shown to patients">
            <input className={inputCls} value={displayName} onChange={(e) => setDisplayName(e.target.value)} maxLength={120} />
          </Field>
          <Field label="Contact phone (shown to the patient)">
            <input className={inputCls} value={phone} onChange={(e) => setPhone(e.target.value)} inputMode="tel" />
          </Field>
          <Field label="Zone">
            <input className={inputCls} value={zone} onChange={(e) => setZone(e.target.value)} maxLength={40} />
          </Field>
          <Field label="Shift start">
            <input type="time" className={inputCls} value={shiftStart} onChange={(e) => setShiftStart(e.target.value)} />
          </Field>
          <Field label="Shift end">
            <input type="time" className={inputCls} value={shiftEnd} onChange={(e) => setShiftEnd(e.target.value)} />
          </Field>
          <Field label="Max jobs per day">
            <input className={inputCls} inputMode="numeric" value={maxJobs} onChange={(e) => setMaxJobs(e.target.value)} />
          </Field>
          <Field label="Qualification">
            <input className={inputCls} value={qualification} onChange={(e) => setQualification(e.target.value)} maxLength={200} />
          </Field>
        </div>
        <Field label="Competencies (comma separated, e.g. paediatric, geriatric)">
          <input className={inputCls} value={competencies} onChange={(e) => setCompetencies(e.target.value)} />
        </Field>
        <fieldset>
          <legend className="mb-1 text-xs font-semibold uppercase text-slate-500">Working days</legend>
          <div className="flex flex-wrap gap-2">
            {DAYS.map((d, i) => (
              <label key={d} className="flex items-center gap-1 text-sm">
                <input
                  type="checkbox"
                  checked={days.includes(i)}
                  onChange={(e) => setDays(e.target.checked ? [...days, i] : days.filter((x) => x !== i))}
                />
                {d}
              </label>
            ))}
          </div>
        </fieldset>
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" checked={active} onChange={(e) => setActive(e.target.checked)} />
          Active (can receive jobs)
        </label>
        <button className={btnCls} onClick={save} disabled={busy}>
          {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />} Save profile
        </button>
      </div>
    </Drawer>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="flex flex-col gap-1 text-sm">
      <span className="text-xs font-semibold uppercase text-slate-500">{label}</span>
      {children}
    </label>
  );
}

"use client";

import React, { useCallback, useEffect, useState } from "react";
import { AlertTriangle, Bot, CalendarClock, Loader2, RefreshCw, Search, UserCheck, XCircle } from "lucide-react";
import { collectApi, human, rupees, todayIso, when, type Alert, type Collector, type QueueVisit, type VisitDetail } from "@/lib/collectApi";
import { btnCls, btnGhostCls, Drawer, ErrorNote, errorText, inputCls, jobTone, Panel, Pill } from "@/components/collect/ui";

export default function DispatchPage() {
  const [date, setDate] = useState(todayIso());
  const [jobStatus, setJobStatus] = useState("");
  const [q, setQ] = useState("");
  const [visits, setVisits] = useState<QueueVisit[]>([]);
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [collectors, setCollectors] = useState<Collector[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState<string | null>(null);
  const [openId, setOpenId] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [v, a, c] = await Promise.all([
        collectApi.visits({ date, job_status: jobStatus || undefined, q: q || undefined, limit: 200 }),
        collectApi.alerts(),
        collectApi.collectors(),
      ]);
      setVisits(v.items);
      setAlerts(a);
      setCollectors(c);
    } catch (e) {
      setError(errorText(e));
    } finally {
      setLoading(false);
    }
  }, [date, jobStatus, q]);

  useEffect(() => {
    load();
    const t = setInterval(load, 30000);
    return () => clearInterval(t);
  }, [load]);

  const run = async (key: string, fn: () => Promise<unknown>) => {
    setBusy(key);
    setError(null);
    try {
      await fn();
      await load();
    } catch (e) {
      setError(errorText(e));
    } finally {
      setBusy(null);
    }
  };

  const unassigned = visits.filter((v) => v.status === "confirmed" && v.job?.status === "unassigned").length;

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Dispatch</h1>
          <p className="text-sm text-slate-500">Home collection queue, collector allocation and exceptions.</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className={inputCls} aria-label="Slot date" />
          <select value={jobStatus} onChange={(e) => setJobStatus(e.target.value)} className={inputCls} aria-label="Job status">
            <option value="">All jobs</option>
            {["unassigned", "assigned", "acknowledged", "en_route", "arrived", "collected", "partially_collected", "unsuccessful"].map((s) => (
              <option key={s} value={s}>
                {human(s)}
              </option>
            ))}
          </select>
          <div className="relative">
            <Search className="pointer-events-none absolute left-2.5 top-2.5 h-4 w-4 text-slate-400" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Ref, patient, phone, PIN"
              className={`${inputCls} pl-8`}
              aria-label="Search"
            />
          </div>
          <button className={btnGhostCls} onClick={load} disabled={loading}>
            <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} /> Refresh
          </button>
          <button
            className={btnCls}
            disabled={!unassigned || busy !== null}
            onClick={() =>
              run("day", async () => {
                const r = await collectApi.autoAssignDay(date);
                if (r.failed.length) setError(`Not assigned: ${r.failed.map((f) => `${f.reference} (${f.reason})`).join("; ")}`);
              })
            }
          >
            <Bot className="h-4 w-4" /> Auto-assign {unassigned || ""}
          </button>
        </div>
      </div>

      <ErrorNote message={error} />

      {alerts.length > 0 && (
        <Panel title={`Alerts (${alerts.length})`}>
          <ul className="divide-y divide-slate-100 dark:divide-gray-800">
            {alerts.slice(0, 12).map((a, i) => (
              <li key={i} className="flex items-center gap-3 py-2 text-sm">
                <AlertTriangle className={`h-4 w-4 ${a.severity === "high" ? "text-red-600" : "text-amber-600"}`} />
                <span className="font-semibold">{human(a.type)}</span>
                <span className="text-slate-600 dark:text-gray-300">
                  {[a.reference, a.patient_name, a.slot_label, a.barcode, a.minutes ? `${a.minutes} min` : null, a.note]
                    .filter(Boolean)
                    .join(" · ")}
                </span>
                {a.visit_id && (
                  <button className="ml-auto text-xs font-semibold text-sky-700 hover:underline" onClick={() => setOpenId(a.visit_id!)}>
                    Open
                  </button>
                )}
              </li>
            ))}
          </ul>
        </Panel>
      )}

      <Panel title={`Visits on ${date} (${visits.length})`}>
        {loading && visits.length === 0 ? (
          <div className="flex justify-center py-10">
            <Loader2 className="h-6 w-6 animate-spin text-slate-400" />
          </div>
        ) : visits.length === 0 ? (
          <p className="py-8 text-center text-sm text-slate-500">No home visits for this date.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="text-xs uppercase text-slate-500">
                <tr>
                  <th className="py-2 pr-3">Slot</th>
                  <th className="py-2 pr-3">Visit</th>
                  <th className="py-2 pr-3">Area</th>
                  <th className="py-2 pr-3">Tests</th>
                  <th className="py-2 pr-3">Job</th>
                  <th className="py-2 pr-3">Collector</th>
                  <th className="py-2" />
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-gray-800">
                {visits.map((v) => (
                  <tr key={v.id} className="align-top">
                    <td className="py-3 pr-3 whitespace-nowrap font-medium">{v.slot_label}</td>
                    <td className="py-3 pr-3">
                      <button className="font-semibold text-sky-700 hover:underline" onClick={() => setOpenId(v.id)}>
                        {v.reference}
                      </button>
                      <div>{v.patient_name}</div>
                      <div className="text-xs text-slate-500">
                        {v.payment_mode === "pay_on_visit" ? `Pay at visit ${rupees(v.total_paise)}` : human(v.status)}
                      </div>
                    </td>
                    <td className="py-3 pr-3">
                      {v.locality} · {v.pincode}
                      <div className="text-xs text-slate-500">
                        {v.zone}
                        {v.lat == null && " · no map pin"}
                      </div>
                    </td>
                    <td className="py-3 pr-3 max-w-56 text-xs">{v.tests.join(", ")}</td>
                    <td className="py-3 pr-3">
                      {v.job ? (
                        <div className="space-y-1">
                          <Pill tone={jobTone(v.job.status)}>{human(v.job.status)}</Pill>
                          {v.job.kind === "recollection" && <Pill tone="red">Recollection</Pill>}
                          {v.job.is_delayed && <Pill tone="amber">Delayed</Pill>}
                        </div>
                      ) : (
                        <Pill>{human(v.status)}</Pill>
                      )}
                    </td>
                    <td className="py-3 pr-3">{v.job?.collector_name || "—"}</td>
                    <td className="py-3 whitespace-nowrap">
                      {v.status === "confirmed" && v.job?.status === "unassigned" && (
                        <button
                          className={btnGhostCls}
                          disabled={busy !== null}
                          onClick={() => run(`auto-${v.id}`, () => collectApi.autoAssign(v.id))}
                        >
                          {busy === `auto-${v.id}` ? <Loader2 className="h-4 w-4 animate-spin" /> : <Bot className="h-4 w-4" />}
                          Auto
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Panel>

      <VisitDrawer id={openId} collectors={collectors} onClose={() => setOpenId(null)} onChanged={load} />
    </div>
  );
}

function VisitDrawer({
  id,
  collectors,
  onClose,
  onChanged,
}: {
  id: string | null;
  collectors: Collector[];
  onClose: () => void;
  onChanged: () => void;
}) {
  const [visit, setVisit] = useState<VisitDetail | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [collectorId, setCollectorId] = useState("");
  const [reason, setReason] = useState("");
  const [newDate, setNewDate] = useState("");
  const [slots, setSlots] = useState<{ label: string; available: boolean }[]>([]);
  const [newSlot, setNewSlot] = useState("");

  const load = useCallback(async () => {
    if (!id) return;
    setError(null);
    try {
      setVisit(await collectApi.visit(id));
    } catch (e) {
      setError(errorText(e));
    }
  }, [id]);

  useEffect(() => {
    setVisit(null);
    setCollectorId("");
    setNewDate("");
    setNewSlot("");
    load();
  }, [load]);

  useEffect(() => {
    if (!newDate || !visit) return;
    collectApi
      .slots(newDate, visit.address.pincode)
      .then((r) => setSlots(r.slots))
      .catch(() => setSlots([]));
  }, [newDate, visit]);

  const act = async (fn: () => Promise<unknown>) => {
    setBusy(true);
    setError(null);
    try {
      await fn();
      await load();
      onChanged();
    } catch (e) {
      setError(errorText(e));
    } finally {
      setBusy(false);
    }
  };

  const open = visit?.job && ["unassigned", "assigned", "acknowledged", "en_route", "arrived"].includes(visit.job.status);

  return (
    <Drawer open={!!id} title={visit ? `${visit.reference} · ${visit.patient.name}` : "Visit"} onClose={onClose}>
      <ErrorNote message={error} />
      {!visit ? (
        <Loader2 className="mx-auto mt-10 h-6 w-6 animate-spin text-slate-400" />
      ) : (
        <div className="space-y-5 text-sm">
          <div className="grid grid-cols-2 gap-3">
            <Info label="Stage" value={human(visit.stage)} />
            <Info label="Slot" value={`${visit.slot_date} · ${visit.slot_label}`} />
            <Info label="Patient" value={`${visit.patient.name} · ${visit.patient.date_of_birth ?? "—"} · ${visit.patient.phone}`} />
            <Info label="Payment" value={`${human(visit.payment_status)} · ${rupees(visit.total_paise)}`} />
            <Info label="Address" value={visit.address.line} wide />
            {visit.address.instructions && <Info label="Directions" value={visit.address.instructions} wide />}
            <Info label="Collector" value={visit.collector ? `${visit.collector.name} (${visit.collector.employee_code})` : "Not assigned"} />
            <Info label="Job" value={visit.job ? `${visit.job.reference} · ${human(visit.job.status)}` : "—"} />
          </div>

          {open && (
            <div className="space-y-2 rounded-lg border border-slate-200 p-3 dark:border-gray-800">
              <h3 className="font-semibold">Assign collector</h3>
              {visit.suggestions.length > 0 && (
                <p className="text-xs text-slate-500">
                  Suggested:{" "}
                  {visit.suggestions
                    .slice(0, 3)
                    .map(
                      (s) =>
                        `${s.display_name} (${s.jobs_in_slot} in slot, ${s.jobs_that_day} today${s.distance_m != null ? `, ${(s.distance_m / 1000).toFixed(1)} km` : ""})`,
                    )
                    .join(" · ")}
                </p>
              )}
              <div className="flex flex-wrap gap-2">
                <select className={inputCls} value={collectorId} onChange={(e) => setCollectorId(e.target.value)} aria-label="Collector">
                  <option value="">Choose collector…</option>
                  {collectors
                    .filter((c) => c.role === "collector" && c.is_active)
                    .map((c) => (
                      <option key={c.user_id} value={c.user_id}>
                        {c.display_name} · {c.zone} · {c.jobs_today} today{c.on_duty ? "" : " (off duty)"}
                      </option>
                    ))}
                </select>
                <input className={inputCls} placeholder="Reason (if reassigning)" value={reason} onChange={(e) => setReason(e.target.value)} />
                <button className={btnCls} disabled={!collectorId || busy} onClick={() => act(() => collectApi.assign(visit.id, collectorId, reason))}>
                  <UserCheck className="h-4 w-4" /> Assign
                </button>
                <button className={btnGhostCls} disabled={busy} onClick={() => act(() => collectApi.autoAssign(visit.id))}>
                  <Bot className="h-4 w-4" /> Auto
                </button>
                {visit.collector && (
                  <button className={btnGhostCls} disabled={busy} onClick={() => act(() => collectApi.unassign(visit.id, reason))}>
                    Unassign
                  </button>
                )}
              </div>
            </div>
          )}

          {visit.status !== "cancelled" && (
            <div className="space-y-2 rounded-lg border border-slate-200 p-3 dark:border-gray-800">
              <h3 className="font-semibold">Reschedule / cancel</h3>
              <div className="flex flex-wrap gap-2">
                <input type="date" className={inputCls} value={newDate} onChange={(e) => setNewDate(e.target.value)} aria-label="New date" />
                <select className={inputCls} value={newSlot} onChange={(e) => setNewSlot(e.target.value)} aria-label="New slot">
                  <option value="">Slot…</option>
                  {slots.map((s) => (
                    <option key={s.label} value={s.label} disabled={!s.available}>
                      {s.label}
                      {s.available ? "" : " (unavailable)"}
                    </option>
                  ))}
                </select>
                <button className={btnGhostCls} disabled={!newDate || !newSlot || busy} onClick={() => act(() => collectApi.reschedule(visit.id, newDate, newSlot))}>
                  <CalendarClock className="h-4 w-4" /> Reschedule
                </button>
                <button
                  className={btnGhostCls}
                  disabled={busy}
                  onClick={() => {
                    const why = window.prompt("Reason for cancelling this visit?");
                    if (why) act(() => collectApi.cancel(visit.id, why));
                  }}
                >
                  <XCircle className="h-4 w-4" /> Cancel visit
                </button>
                {!open && visit.job && ["unsuccessful", "partially_collected"].includes(visit.job.status) && (
                  <button
                    className={btnGhostCls}
                    disabled={busy}
                    onClick={() => {
                      const why = window.prompt("Reason for recollection?");
                      if (why) act(() => collectApi.recollect(visit.id, why));
                    }}
                  >
                    Open recollection
                  </button>
                )}
              </div>
            </div>
          )}

          <div>
            <h3 className="mb-1 font-semibold">Tests</h3>
            <ul className="space-y-1">
              {visit.tests.map((t) => (
                <li key={t.booking_id} className="flex justify-between">
                  <span>{t.name}</span>
                  <span className="text-slate-500">
                    {human(t.lab_status)} · {human(t.payment_status)}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {visit.specimens.length > 0 && (
            <div>
              <h3 className="mb-1 font-semibold">Specimens</h3>
              <ul className="space-y-1">
                {visit.specimens.map((s, i) => (
                  <li key={i} className="flex justify-between">
                    <span>
                      {s.barcode} · {s.container_type}
                    </span>
                    <span className="text-slate-500">
                      {human(s.status)}
                      {s.decision_reason ? ` (${human(s.decision_reason)})` : ""}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {visit.visit_payments.length > 0 && (
            <div>
              <h3 className="mb-1 font-semibold">Paid at visit</h3>
              {visit.visit_payments.map((p) => (
                <div key={p.id} className="flex items-center justify-between">
                  <span>
                    {rupees(p.amount_paise)} · {p.mode.toUpperCase()} {p.reference ? `· ${p.reference}` : ""} · {when(p.at)}
                  </span>
                  {p.reconciled_at ? (
                    <Pill tone="green">Reconciled</Pill>
                  ) : (
                    <button className={btnGhostCls} disabled={busy} onClick={() => act(() => collectApi.reconcile([p.id]))}>
                      Mark reconciled
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}

          <div>
            <h3 className="mb-1 font-semibold">History</h3>
            <ol className="space-y-1 border-l border-slate-200 pl-4 dark:border-gray-800">
              {visit.timeline.map((e, i) => (
                <li key={i}>
                  <span className="font-medium">{human(e.event)}</span>{" "}
                  <span className="text-slate-500">
                    {when(e.at)}
                    {e.details && Object.keys(e.details).length > 0
                      ? ` · ${Object.entries(e.details)
                          .filter(([, v]) => v !== null && v !== undefined && v !== "" && typeof v !== "object")
                          .map(([k, v]) => `${human(k)}: ${String(v)}`)
                          .join(", ")}`
                      : ""}
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      )}
    </Drawer>
  );
}

function Info({ label, value, wide }: { label: string; value: string; wide?: boolean }) {
  return (
    <div className={wide ? "col-span-2" : ""}>
      <div className="text-xs font-semibold uppercase text-slate-500">{label}</div>
      <div className="text-slate-900 dark:text-white">{value}</div>
    </div>
  );
}

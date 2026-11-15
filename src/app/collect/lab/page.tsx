"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { CheckCircle2, Loader2, PackageCheck, PauseCircle, ScanBarcode, XCircle } from "lucide-react";
import { collectApi, human, when, type ManifestView, type SpecimenView } from "@/lib/collectApi";
import { btnCls, btnGhostCls, ErrorNote, errorText, inputCls, Panel, Pill } from "@/components/collect/ui";

const specimenTone = (s: string) =>
  s === "accepted" ? "green" : s === "rejected" || s === "missing" || s === "damaged" ? "red" : s === "on_hold" ? "amber" : "blue";

export default function LabReceivingPage() {
  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Lab receiving</h1>
        <p className="text-sm text-slate-500">
          Scan each tube to check it in, confirm the patient on the label, then accept, reject or hold it. Rejecting a
          specimen opens a recollection for dispatch automatically.
        </p>
      </div>
      <SpecimenDesk />
      <Manifests />
    </div>
  );
}

function SpecimenDesk() {
  const [code, setCode] = useState("");
  const [specimen, setSpecimen] = useState<SpecimenView | null>(null);
  const [reasons, setReasons] = useState<string[]>([]);
  const [reason, setReason] = useState("");
  const [notes, setNotes] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [note, setNote] = useState<string | null>(null);
  const input = useRef<HTMLInputElement>(null);

  useEffect(() => {
    collectApi.rejectionReasons().then(setReasons).catch(() => setReasons([]));
    input.current?.focus();
  }, []);

  const lookup = async (barcode: string) => {
    const value = barcode.trim().toUpperCase();
    if (!value) return;
    setBusy(true);
    setError(null);
    setNote(null);
    setReason("");
    setNotes("");
    try {
      setSpecimen(await collectApi.specimen(value));
    } catch (e) {
      setSpecimen(null);
      setError(errorText(e));
    } finally {
      setBusy(false);
      setCode("");
      input.current?.focus();
    }
  };

  const act = async (fn: () => Promise<string | void>) => {
    if (!specimen) return;
    setBusy(true);
    setError(null);
    try {
      const msg = await fn();
      setSpecimen(await collectApi.specimen(specimen.barcode));
      setNote(msg || null);
    } catch (e) {
      setError(errorText(e));
    } finally {
      setBusy(false);
      input.current?.focus();
    }
  };

  const decide = (decision: "accept" | "reject" | "hold") =>
    act(async () => {
      const r = await collectApi.decide(specimen!.barcode, decision, reason || undefined, notes || undefined);
      return r.recollection_opened ? "Specimen rejected — a recollection job was opened for dispatch." : `Specimen ${human(r.status).toLowerCase()}.`;
    });

  const canReceive = specimen && ["collected", "handed_over", "in_transit"].includes(specimen.status);
  const canDecide = specimen && ["received", "on_hold"].includes(specimen.status);

  return (
    <Panel title="Scan a specimen">
      <form
        className="flex flex-wrap gap-2"
        onSubmit={(e) => {
          e.preventDefault();
          lookup(code);
        }}
      >
        <div className="relative">
          <ScanBarcode className="pointer-events-none absolute left-2.5 top-2.5 h-4 w-4 text-slate-400" />
          <input
            ref={input}
            className={`${inputCls} w-72 pl-8 font-mono`}
            placeholder="Scan or type the barcode"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            aria-label="Specimen barcode"
            autoComplete="off"
          />
        </div>
        <button className={btnCls} disabled={busy || !code.trim()}>
          {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : "Look up"}
        </button>
      </form>

      <div className="mt-3 space-y-3">
        <ErrorNote message={error} />
        {note && <p className="rounded-lg bg-emerald-50 px-3 py-2 text-sm text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300">{note}</p>}
      </div>

      {specimen && (
        <div className="mt-4 grid gap-5 lg:grid-cols-2">
          <div className="space-y-3 text-sm">
            <div className="flex items-center gap-3">
              <span className="font-mono text-lg font-bold">{specimen.barcode}</span>
              <Pill tone={specimenTone(specimen.status)}>{human(specimen.status)}</Pill>
            </div>
            <div className="rounded-lg border border-slate-200 p-3 dark:border-gray-800">
              <div className="text-xs font-semibold uppercase text-slate-500">Patient — check against the tube label</div>
              <div className="text-base font-semibold">{specimen.visit.patient_name}</div>
              <div className="text-slate-600 dark:text-gray-300">
                DOB {specimen.visit.patient_dob ?? "—"} · {human(specimen.visit.patient_gender) || "—"} · Visit {specimen.visit.reference}
              </div>
            </div>
            <div>
              <span className="font-semibold">{specimen.container_type}</span>
              {specimen.sample_type ? ` · ${specimen.sample_type}` : ""}
              {specimen.volume_ml ? ` · ${specimen.volume_ml} ml` : ""} · collected {when(specimen.collected_at)}
              {specimen.observations && <div className="text-slate-600 dark:text-gray-300">Collector note: {specimen.observations}</div>}
            </div>
            {specimen.manifest && (
              <div className="text-slate-600 dark:text-gray-300">
                Manifest {specimen.manifest.reference} ({human(specimen.manifest.status)})
                {specimen.manifest.seal_intact === false && <Pill tone="red">Seal broken</Pill>}
                {specimen.manifest.temperature_note ? ` · ${specimen.manifest.temperature_note}` : ""}
              </div>
            )}
            <div>
              <div className="mb-1 font-semibold">Tests on this tube</div>
              <ul className="space-y-0.5">
                {specimen.tests.map((t) => (
                  <li key={t.booking_id} className="flex justify-between">
                    <span>{t.name}</span>
                    <span className="text-slate-500">{human(t.lab_status)}</span>
                  </li>
                ))}
              </ul>
            </div>
            {specimen.decision_reason && (
              <p>
                Decision: {human(specimen.decision_reason)}
                {specimen.decision_notes ? ` — ${specimen.decision_notes}` : ""}
              </p>
            )}
          </div>

          <div className="space-y-3">
            {canReceive && (
              <button className={btnCls} disabled={busy} onClick={() => act(async () => { await collectApi.receiveSpecimen(specimen.barcode); return "Received at lab."; })}>
                <PackageCheck className="h-4 w-4" /> Receive at lab
              </button>
            )}
            {canDecide && (
              <div className="space-y-2 rounded-lg border border-slate-200 p-3 dark:border-gray-800">
                <div className="font-semibold">Quality check</div>
                <div className="flex flex-wrap gap-2">
                  <select className={inputCls} value={reason} onChange={(e) => setReason(e.target.value)} aria-label="Reason">
                    <option value="">Reason (for reject / hold)…</option>
                    {reasons.map((r) => (
                      <option key={r} value={r}>
                        {human(r)}
                      </option>
                    ))}
                  </select>
                  <input className={`${inputCls} flex-1`} placeholder="Notes" value={notes} onChange={(e) => setNotes(e.target.value)} />
                </div>
                <div className="flex flex-wrap gap-2">
                  <button className={btnCls} disabled={busy} onClick={() => decide("accept")}>
                    <CheckCircle2 className="h-4 w-4" /> Accept
                  </button>
                  <button className={btnGhostCls} disabled={busy || !reason} onClick={() => decide("hold")}>
                    <PauseCircle className="h-4 w-4" /> Hold
                  </button>
                  <button
                    className={btnGhostCls}
                    disabled={busy || !reason}
                    onClick={() => {
                      if (window.confirm(`Reject ${specimen.barcode} (${human(reason)})? The patient will be asked for a new sample.`)) decide("reject");
                    }}
                  >
                    <XCircle className="h-4 w-4" /> Reject
                  </button>
                </div>
              </div>
            )}
            <div>
              <div className="mb-1 text-sm font-semibold">Chain of custody</div>
              <ol className="space-y-1 border-l border-slate-200 pl-4 text-sm dark:border-gray-800">
                {specimen.history.map((h, i) => (
                  <li key={i}>
                    <span className="font-medium">{human(h.event)}</span>{" "}
                    <span className="text-slate-500">
                      {when(h.at)}
                      {h.actor_role ? ` · ${human(h.actor_role)}` : ""}
                      {h.to ? ` → ${human(h.to)}` : ""}
                    </span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      )}
    </Panel>
  );
}

function Manifests() {
  const [items, setItems] = useState<ManifestView[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [open, setOpen] = useState<ManifestView | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      setItems(await collectApi.labManifests("in_transit"));
      setError(null);
    } catch (e) {
      setError(errorText(e));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
    const t = setInterval(load, 60000);
    return () => clearInterval(t);
  }, [load]);

  return (
    <Panel title={`Incoming manifests (${items.length})`}>
      <ErrorNote message={error} />
      {loading && items.length === 0 ? (
        <Loader2 className="mx-auto h-5 w-5 animate-spin text-slate-400" />
      ) : items.length === 0 ? (
        <p className="text-sm text-slate-500">Nothing in transit to the lab.</p>
      ) : (
        <ul className="divide-y divide-slate-100 text-sm dark:divide-gray-800">
          {items.map((m) => (
            <li key={m.id} className="flex flex-wrap items-center justify-between gap-2 py-2">
              <span>
                <span className="font-semibold">{m.reference}</span> · {m.specimens.length} specimens ·{" "}
                {m.custodian ? `${m.custodian.name} (${m.custodian.employee_code})` : "—"} · {m.destination?.name ?? "—"} · dispatched{" "}
                {when(m.dispatched_at)}
                {m.container_ref ? ` · box ${m.container_ref}` : ""}
              </span>
              <button className={btnGhostCls} onClick={() => setOpen(m)}>
                Check in
              </button>
            </li>
          ))}
        </ul>
      )}
      {open && (
        <ManifestCheckIn
          key={open.id}
          manifest={open}
          onDone={() => {
            setOpen(null);
            load();
          }}
          onCancel={() => setOpen(null)}
        />
      )}
    </Panel>
  );
}

function ManifestCheckIn({ manifest, onDone, onCancel }: { manifest: ManifestView; onDone: () => void; onCancel: () => void }) {
  const [scanned, setScanned] = useState<string[]>([]);
  const [code, setCode] = useState("");
  const [seal, setSeal] = useState<"yes" | "no" | "">("");
  const [temp, setTemp] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<{ received: number; missing: string[]; unexpected: string[] } | null>(null);
  const expected = new Set(manifest.specimens.map((s) => s.barcode));

  const add = () => {
    const v = code.trim().toUpperCase();
    if (v && !scanned.includes(v)) setScanned([...scanned, v]);
    setCode("");
  };

  const submit = async () => {
    const missing = [...expected].filter((b) => !scanned.includes(b));
    if (missing.length && !window.confirm(`${missing.length} specimen(s) not scanned will be marked missing. Continue?`)) return;
    setBusy(true);
    setError(null);
    try {
      setResult(await collectApi.receiveManifest(manifest.id, scanned, seal === "" ? null : seal === "yes", temp.trim() || null));
    } catch (e) {
      setError(errorText(e));
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="mt-4 space-y-3 rounded-lg border border-slate-200 p-4 text-sm dark:border-gray-800">
      <h3 className="font-semibold">Check in {manifest.reference}</h3>
      <ErrorNote message={error} />
      {result ? (
        <div className="space-y-2">
          <p>
            Received {result.received} specimen(s).
            {result.missing.length > 0 && <span className="text-red-700"> Missing: {result.missing.join(", ")}.</span>}
            {result.unexpected.length > 0 && <span className="text-amber-700"> Not on this manifest: {result.unexpected.join(", ")}.</span>}
          </p>
          <p className="text-slate-500">Now accept or reject each tube from the scan box above.</p>
          <button className={btnCls} onClick={onDone}>
            Done
          </button>
        </div>
      ) : (
        <>
          <form
            className="flex gap-2"
            onSubmit={(e) => {
              e.preventDefault();
              add();
            }}
          >
            <input
              autoFocus
              className={`${inputCls} w-72 font-mono`}
              placeholder="Scan each tube"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              aria-label="Scan tube"
              autoComplete="off"
            />
            <button className={btnGhostCls}>Add</button>
          </form>
          <ul className="grid gap-1 sm:grid-cols-2">
            {manifest.specimens.map((s) => (
              <li key={s.barcode} className="flex items-center gap-2">
                {scanned.includes(s.barcode) ? (
                  <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                ) : (
                  <span className="inline-block h-4 w-4 rounded-full border border-slate-300" />
                )}
                <span className="font-mono">{s.barcode}</span> <span className="text-slate-500">{s.container_type}</span>
              </li>
            ))}
            {scanned
              .filter((b) => !expected.has(b))
              .map((b) => (
                <li key={b} className="flex items-center gap-2 text-amber-700">
                  <XCircle className="h-4 w-4" /> <span className="font-mono">{b}</span> not on manifest
                </li>
              ))}
          </ul>
          <div className="flex flex-wrap gap-3">
            <select className={inputCls} value={seal} onChange={(e) => setSeal(e.target.value as "yes" | "no" | "")} aria-label="Seal">
              <option value="">Seal — not checked</option>
              <option value="yes">Seal intact</option>
              <option value="no">Seal broken / tampered</option>
            </select>
            <input className={`${inputCls} flex-1`} placeholder="Temperature / condition note" value={temp} onChange={(e) => setTemp(e.target.value)} />
          </div>
          <div className="flex gap-2">
            <button className={btnCls} onClick={submit} disabled={busy || scanned.length === 0}>
              {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <PackageCheck className="h-4 w-4" />} Receive {scanned.filter((b) => expected.has(b)).length}/
              {expected.size}
            </button>
            <button className={btnGhostCls} onClick={onCancel}>
              Cancel
            </button>
          </div>
        </>
      )}
    </div>
  );
}

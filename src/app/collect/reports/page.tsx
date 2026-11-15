"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Eye, FilePlus2, Loader2, RefreshCw, RotateCcw, Send, ShieldOff } from "lucide-react";
import { collectApi, human, when, type LabReport, type LisTask, type WorklistItem } from "@/lib/collectApi";
import { btnCls, btnGhostCls, ErrorNote, errorText, inputCls, Panel, Pill } from "@/components/collect/ui";

// "authorized" is set only by releasing a report, so it is not offered here.
const SETTABLE_LAB_STATUSES = ["received", "in_progress", "under_review", "partial", "delayed", "on_hold"];

type UploadTarget = {
  visitId: string;
  label: string;
  tests: { booking_id: string; name: string }[];
  supersedes?: LabReport;
};

export default function LabReportsPage() {
  const [worklist, setWorklist] = useState<WorklistItem[]>([]);
  const [reports, setReports] = useState<LabReport[]>([]);
  const [statusFilter, setStatusFilter] = useState("draft");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [upload, setUpload] = useState<UploadTarget | null>(null);
  const [busy, setBusy] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [w, r] = await Promise.all([collectApi.worklist(), collectApi.reports({ status: statusFilter || undefined })]);
      setWorklist(w);
      setReports(r);
    } catch (e) {
      setError(errorText(e));
    } finally {
      setLoading(false);
    }
  }, [statusFilter]);

  useEffect(() => {
    load();
  }, [load]);

  const groups = useMemo(() => {
    const map = new Map<string, { visitId: string; ref: string; patient: string; items: WorklistItem[] }>();
    for (const w of worklist) {
      const g = map.get(w.visit_id) ?? { visitId: w.visit_id, ref: w.visit_reference ?? w.visit_id.slice(0, 8), patient: w.patient_name, items: [] };
      g.items.push(w);
      map.set(w.visit_id, g);
    }
    return [...map.values()];
  }, [worklist]);

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

  const preview = async (id: string) => {
    try {
      const { url } = await collectApi.previewReport(id);
      window.open(url, "_blank", "noopener,noreferrer");
    } catch (e) {
      setError(errorText(e));
    }
  };

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Lab reports</h1>
          <p className="text-sm text-slate-500">
            Track tests through the lab, upload the authorized PDF from ITDOSE and release it to the patient. A report
            can only be released once the authorizing pathologist and time are recorded.
          </p>
        </div>
        <button className={btnGhostCls} onClick={load} disabled={loading}>
          <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} /> Refresh
        </button>
      </div>

      <ErrorNote message={error} />

      {upload && (
        <UploadForm
          key={`${upload.visitId}-${upload.supersedes?.id ?? "new"}`}
          target={upload}
          onCancel={() => setUpload(null)}
          onUploaded={() => {
            setUpload(null);
            setStatusFilter("draft");
            load();
          }}
        />
      )}

      <Panel title={`In the lab (${worklist.length} tests)`}>
        {loading && worklist.length === 0 ? (
          <Loader2 className="mx-auto h-5 w-5 animate-spin text-slate-400" />
        ) : groups.length === 0 ? (
          <p className="text-sm text-slate-500">No home-collection tests waiting for a report.</p>
        ) : (
          <div className="space-y-4">
            {groups.map((g) => (
              <div key={g.visitId} className="rounded-lg border border-slate-200 p-3 text-sm dark:border-gray-800">
                <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
                  <span>
                    <span className="font-semibold">{g.ref}</span> · {g.patient}
                  </span>
                  <button
                    className={btnGhostCls}
                    onClick={() =>
                      setUpload({ visitId: g.visitId, label: `${g.ref} · ${g.patient}`, tests: g.items.map((i) => ({ booking_id: i.booking_id, name: i.test })) })
                    }
                  >
                    <FilePlus2 className="h-4 w-4" /> Upload report
                  </button>
                </div>
                <ul className="divide-y divide-slate-100 dark:divide-gray-800">
                  {g.items.map((i) => (
                    <WorklistRow key={i.booking_id} item={i} onSaved={load} onError={setError} />
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </Panel>

      <Panel
        title="Reports"
        actions={
          <select className={inputCls} value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} aria-label="Report status">
            <option value="draft">Drafts</option>
            <option value="released">Released</option>
            <option value="superseded">Superseded</option>
            <option value="revoked">Revoked</option>
            <option value="">All</option>
          </select>
        }
      >
        {reports.length === 0 ? (
          <p className="text-sm text-slate-500">No reports.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="text-xs uppercase text-slate-500">
                <tr>
                  <th className="py-2 pr-3">Report</th>
                  <th className="py-2 pr-3">Status</th>
                  <th className="py-2 pr-3">Authorized</th>
                  <th className="py-2 pr-3">Released</th>
                  <th className="py-2" />
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-gray-800">
                {reports.map((r) => (
                  <tr key={r.id} className="align-top">
                    <td className="py-2 pr-3">
                      <div className="font-semibold">
                        {r.title} <span className="text-xs text-slate-500">v{r.version}</span>
                      </div>
                      <div className="text-xs text-slate-500">
                        {r.reference}
                        {r.lis_accession ? ` · ${r.lis_accession}` : ""}
                        {r.is_partial ? " · partial" : ""}
                        {r.amendment_note ? ` · amended: ${r.amendment_note}` : ""}
                      </div>
                    </td>
                    <td className="py-2 pr-3">
                      <Pill tone={r.status === "released" ? "green" : r.status === "draft" ? "amber" : r.status === "revoked" ? "red" : "gray"}>
                        {human(r.status)}
                      </Pill>
                    </td>
                    <td className="py-2 pr-3 text-xs">
                      {r.authorized_by_name ? (
                        <>
                          {r.authorized_by_name}
                          <br />
                          {when(r.authorized_at)}
                        </>
                      ) : (
                        <span className="text-red-700">Not recorded</span>
                      )}
                    </td>
                    <td className="py-2 pr-3 text-xs">{when(r.released_at)}</td>
                    <td className="py-2">
                      <div className="flex flex-wrap justify-end gap-1.5">
                        <button className={btnGhostCls} onClick={() => preview(r.id)} aria-label="Preview PDF">
                          <Eye className="h-4 w-4" />
                        </button>
                        {r.status === "draft" && (
                          <button
                            className={btnCls}
                            disabled={busy !== null || !r.authorized_by_name}
                            title={r.authorized_by_name ? "" : "Authorization details missing — upload again with them"}
                            onClick={() => {
                              if (window.confirm(`Release "${r.title}" to the patient now?`)) run(`rel-${r.id}`, () => collectApi.releaseReport(r.id));
                            }}
                          >
                            {busy === `rel-${r.id}` ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />} Release
                          </button>
                        )}
                        {r.status === "released" && (
                          <>
                            <button
                              className={btnGhostCls}
                              onClick={() =>
                                setUpload({
                                  visitId: r.visit_id,
                                  label: `Amend ${r.reference} (v${r.version})`,
                                  tests: r.booking_ids.map((id) => ({ booking_id: id, name: `Test ${id.slice(0, 8)}` })),
                                  supersedes: r,
                                })
                              }
                            >
                              <RotateCcw className="h-4 w-4" /> Amend
                            </button>
                            <button
                              className={btnGhostCls}
                              disabled={busy !== null}
                              onClick={() => {
                                const why = window.prompt("Why is this report being withdrawn? The patient will lose access.");
                                if (why) run(`rev-${r.id}`, () => collectApi.revokeReport(r.id, why));
                              }}
                            >
                              <ShieldOff className="h-4 w-4" /> Revoke
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
      </Panel>

      <LisTasks />
    </div>
  );
}

function WorklistRow({ item, onSaved, onError }: { item: WorklistItem; onSaved: () => void; onError: (m: string) => void }) {
  const [status, setStatus] = useState(item.lab_status);
  const [accession, setAccession] = useState(item.lis_accession ?? "");
  const [busy, setBusy] = useState(false);
  const dirty = status !== item.lab_status || accession !== (item.lis_accession ?? "");

  const save = async () => {
    setBusy(true);
    try {
      await collectApi.setLabStatus(item.booking_id, status, accession.trim() || undefined);
      onSaved();
    } catch (e) {
      onError(errorText(e));
    } finally {
      setBusy(false);
    }
  };

  return (
    <li className="flex flex-wrap items-center gap-2 py-2">
      <span className="min-w-40 flex-1">{item.test}</span>
      <select className={inputCls} value={status} onChange={(e) => setStatus(e.target.value)} aria-label={`Lab status for ${item.test}`}>
        {SETTABLE_LAB_STATUSES.map((s) => (
          <option key={s} value={s}>
            {human(s)}
          </option>
        ))}
      </select>
      <input
        className={`${inputCls} w-40`}
        placeholder="ITDOSE accession"
        value={accession}
        onChange={(e) => setAccession(e.target.value)}
        aria-label={`ITDOSE accession for ${item.test}`}
      />
      <button className={btnGhostCls} disabled={!dirty || busy} onClick={save}>
        {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : "Save"}
      </button>
    </li>
  );
}

function UploadForm({ target, onCancel, onUploaded }: { target: UploadTarget; onCancel: () => void; onUploaded: () => void }) {
  const [selected, setSelected] = useState<string[]>(target.tests.map((t) => t.booking_id));
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState(target.supersedes?.title ?? "Laboratory report");
  const [accession, setAccession] = useState(target.supersedes?.lis_accession ?? "");
  const [authorizedBy, setAuthorizedBy] = useState("");
  const [authorizedAt, setAuthorizedAt] = useState("");
  const [partial, setPartial] = useState(false);
  const [amendment, setAmendment] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submit = async () => {
    if (!file) return setError("Choose the PDF exported from ITDOSE.");
    if (file.type !== "application/pdf") return setError("Reports must be PDF files.");
    if (!selected.length) return setError("Pick the tests this report covers.");
    if (!authorizedBy.trim() || !authorizedAt) return setError("Enter who authorized the report in ITDOSE and when.");
    const at = new Date(authorizedAt);
    if (at.getTime() > Date.now()) return setError("Authorization time can't be in the future.");
    if (target.supersedes && !amendment.trim()) return setError("Describe what was corrected.");
    const form = new FormData();
    form.append("file", file);
    form.append("visit_id", target.visitId);
    form.append("booking_ids", JSON.stringify(selected));
    form.append("title", title.trim() || "Laboratory report");
    if (accession.trim()) form.append("lis_accession", accession.trim());
    form.append("authorized_by_name", authorizedBy.trim());
    form.append("authorized_at", at.toISOString());
    form.append("is_partial", String(partial));
    if (target.supersedes) {
      form.append("supersedes_id", target.supersedes.id);
      form.append("amendment_note", amendment.trim());
    }
    setBusy(true);
    setError(null);
    try {
      await collectApi.uploadReport(form);
      onUploaded();
    } catch (e) {
      setError(errorText(e));
    } finally {
      setBusy(false);
    }
  };

  return (
    <Panel title={target.supersedes ? target.label : `Upload report · ${target.label}`}>
      <div className="space-y-3 text-sm">
        <ErrorNote message={error} />
        {!target.supersedes && (
          <fieldset>
            <legend className="mb-1 text-xs font-semibold uppercase text-slate-500">Tests covered</legend>
            <div className="flex flex-wrap gap-3">
              {target.tests.map((t) => (
                <label key={t.booking_id} className="flex items-center gap-1.5">
                  <input
                    type="checkbox"
                    checked={selected.includes(t.booking_id)}
                    onChange={(e) => setSelected(e.target.checked ? [...selected, t.booking_id] : selected.filter((x) => x !== t.booking_id))}
                  />
                  {t.name}
                </label>
              ))}
            </div>
          </fieldset>
        )}
        <div className="grid gap-3 sm:grid-cols-2">
          <label className="flex flex-col gap-1">
            <span className="text-xs font-semibold uppercase text-slate-500">PDF</span>
            <input type="file" accept="application/pdf" onChange={(e) => setFile(e.target.files?.[0] ?? null)} className="text-sm" />
          </label>
          <label className="flex flex-col gap-1">
            <span className="text-xs font-semibold uppercase text-slate-500">Title</span>
            <input className={inputCls} value={title} onChange={(e) => setTitle(e.target.value)} maxLength={200} />
          </label>
          <label className="flex flex-col gap-1">
            <span className="text-xs font-semibold uppercase text-slate-500">Authorized by (pathologist, as in ITDOSE)</span>
            <input className={inputCls} value={authorizedBy} onChange={(e) => setAuthorizedBy(e.target.value)} />
          </label>
          <label className="flex flex-col gap-1">
            <span className="text-xs font-semibold uppercase text-slate-500">Authorized at</span>
            <input type="datetime-local" className={inputCls} value={authorizedAt} onChange={(e) => setAuthorizedAt(e.target.value)} />
          </label>
          <label className="flex flex-col gap-1">
            <span className="text-xs font-semibold uppercase text-slate-500">ITDOSE accession</span>
            <input className={inputCls} value={accession} onChange={(e) => setAccession(e.target.value)} />
          </label>
          <label className="flex items-center gap-2 pt-5">
            <input type="checkbox" checked={partial} onChange={(e) => setPartial(e.target.checked)} />
            Partial report (more results to follow)
          </label>
        </div>
        {target.supersedes && (
          <label className="flex flex-col gap-1">
            <span className="text-xs font-semibold uppercase text-slate-500">What was corrected (shown in the audit trail)</span>
            <input className={inputCls} value={amendment} onChange={(e) => setAmendment(e.target.value)} />
          </label>
        )}
        <p className="text-xs text-slate-500">The upload is saved as a draft. Check the preview, then release it.</p>
        <div className="flex gap-2">
          <button className={btnCls} onClick={submit} disabled={busy}>
            {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <FilePlus2 className="h-4 w-4" />} Upload draft
          </button>
          <button className={btnGhostCls} onClick={onCancel}>
            Cancel
          </button>
        </div>
      </div>
    </Panel>
  );
}

function LisTasks() {
  const [data, setData] = useState<{ adapter: string; items: LisTask[] } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    try {
      setData(await collectApi.lisTasks());
      setError(null);
    } catch (e) {
      setError(errorText(e));
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  // "manual" tasks are expected when no ITDOSE API is configured; "synced" are done.
  const failing = data?.items.filter((t) => ["pending", "failed", "dead"].includes(t.status)) ?? [];

  return (
    <Panel title={`ITDOSE sync${data ? ` · ${data.adapter} adapter` : ""}`}>
      <ErrorNote message={error} />
      {data?.adapter === "manual" && (
        <p className="mb-2 text-sm text-slate-500">
          No ITDOSE API connection is configured, so accession numbers and lab status are entered by hand above.
        </p>
      )}
      {failing.length === 0 ? (
        <p className="text-sm text-slate-500">No pending or failed sync tasks.</p>
      ) : (
        <ul className="divide-y divide-slate-100 text-sm dark:divide-gray-800">
          {failing.map((t) => (
            <li key={t.id} className="flex flex-wrap items-center justify-between gap-2 py-2">
              <span>
                {human(t.kind)} · {human(t.status)} · {t.attempts} attempt(s)
                {t.last_error ? <span className="text-red-700"> · {t.last_error}</span> : ""}
              </span>
              <button
                className={btnGhostCls}
                onClick={async () => {
                  try {
                    await collectApi.retryLisTask(t.id);
                    load();
                  } catch (e) {
                    setError(errorText(e));
                  }
                }}
              >
                Retry
              </button>
            </li>
          ))}
        </ul>
      )}
    </Panel>
  );
}

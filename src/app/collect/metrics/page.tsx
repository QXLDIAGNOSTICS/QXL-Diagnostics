"use client";

import React, { useCallback, useEffect, useState } from "react";
import { FlaskConical, Home, IndianRupee, Loader2, RefreshCw, Truck } from "lucide-react";
import StatCard from "@/components/admin/StatCard";
import { collectApi, human, rupees, todayIso, type Metrics, type MetricsSummary } from "@/lib/collectApi";
import { btnGhostCls, ErrorNote, errorText, inputCls, Panel } from "@/components/collect/ui";

const daysAgoIso = (n: number) => {
  const d = new Date();
  d.setDate(d.getDate() - n);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
};

const mins = (s: MetricsSummary) =>
  s.count === 0 || s.median_minutes == null ? "—" : `${Math.round(s.median_minutes)} min median · ${Math.round(s.max_minutes ?? 0)} max · n=${s.count}`;

const pct = (v: number | null) => (v == null ? "—" : `${v.toFixed(1)}%`);

export default function CollectMetricsPage() {
  const [from, setFrom] = useState(daysAgoIso(6));
  const [to, setTo] = useState(todayIso());
  const [data, setData] = useState<Metrics | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      setData(await collectApi.metrics(from, to));
    } catch (e) {
      setError(errorText(e));
    } finally {
      setLoading(false);
    }
  }, [from, to]);

  useEffect(() => {
    load();
  }, [load]);

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Home collection dashboard</h1>
          <p className="text-sm text-slate-500">Bookings, field performance, transport and lab turnaround for the selected slot dates.</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <input type="date" className={inputCls} value={from} max={to} onChange={(e) => setFrom(e.target.value)} aria-label="From" />
          <span className="text-slate-500">to</span>
          <input type="date" className={inputCls} value={to} min={from} onChange={(e) => setTo(e.target.value)} aria-label="To" />
          <button className={btnGhostCls} onClick={load} disabled={loading}>
            <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} /> Refresh
          </button>
        </div>
      </div>

      <ErrorNote message={error} />

      {!data ? (
        <div className="flex justify-center py-16">
          <Loader2 className="h-6 w-6 animate-spin text-slate-400" />
        </div>
      ) : (
        <>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <StatCard title="Home visits" value={String(data.bookings.visits)} icon={Home} />
            <StatCard title="Tests booked" value={String(data.bookings.tests)} icon={FlaskConical} color="blue" />
            <StatCard
              title="Revenue (online + at visit)"
              value={rupees(data.revenue.online_verified_paise + data.revenue.collected_at_visit_paise)}
              icon={IndianRupee}
              color="purple"
            />
            <StatCard title="Recollections" value={String(data.field.recollections)} icon={Truck} color="orange" />
          </div>

          <div className="grid gap-5 lg:grid-cols-2">
            <Panel title="Bookings">
              <Rows
                rows={[
                  ["Paid or confirmed", pct(data.bookings.conversion_paid_or_confirmed_pct)],
                  ...Object.entries(data.bookings.by_status).map(([k, v]) => [human(k), String(v)] as [string, string]),
                ]}
              />
              <Breakdown title="By zone" values={data.bookings.by_zone} />
              <Breakdown title="By source" values={data.bookings.by_source} />
            </Panel>

            <Panel title="Money">
              <Rows
                rows={[
                  ["Online (verified)", rupees(data.revenue.online_verified_paise)],
                  ["Collected at visit", rupees(data.revenue.collected_at_visit_paise)],
                  ["Collected at visit, not yet reconciled", rupees(data.revenue.unreconciled_at_visit_paise)],
                  ["Pay-at-visit outstanding", rupees(data.revenue.pay_on_visit_outstanding_paise)],
                  ["Refunded", rupees(data.revenue.refunded_paise)],
                ]}
              />
            </Panel>

            <Panel title="Field performance">
              <Rows
                rows={[
                  ["Assignment → acknowledged", mins(data.field.assign_to_acknowledge)],
                  ["Travel time", mins(data.field.travel_time)],
                  ["Time at patient", mins(data.field.time_at_patient)],
                  ...Object.entries(data.field.job_outcomes).map(([k, v]) => [`Jobs ${human(k).toLowerCase()}`, String(v)] as [string, string]),
                ]}
              />
            </Panel>

            <Panel title="Transport & lab">
              <Rows
                rows={[
                  ["Collection → lab receipt", mins(data.transport.collection_to_lab_receipt)],
                  ["Missing specimens", String(data.transport.missing)],
                  ["Damaged specimens", String(data.transport.damaged)],
                  ["Rejection rate", pct(data.lab.rejection_rate_pct)],
                  ["Receipt → report release", mins(data.lab.receipt_to_report_release)],
                  ["Reports released", String(data.lab.reports_released)],
                  ["Amended reports", String(data.lab.amended_reports)],
                ]}
              />
              <Breakdown title="Rejection reasons" values={data.lab.rejection_reasons} />
            </Panel>
          </div>

          <Panel title="Collectors">
            {data.field.collectors.length === 0 ? (
              <p className="text-sm text-slate-500">No assigned jobs in this range.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="text-xs uppercase text-slate-500">
                    <tr>
                      <th className="py-2 pr-3">Collector</th>
                      <th className="py-2 pr-3">Assigned</th>
                      <th className="py-2 pr-3">Collected</th>
                      <th className="py-2 pr-3">Partial</th>
                      <th className="py-2 pr-3">Unsuccessful</th>
                      <th className="py-2">Success rate</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-gray-800">
                    {data.field.collectors.map((c) => (
                      <tr key={c.collector_id}>
                        <td className="py-2 pr-3 font-semibold">{c.name}</td>
                        <td className="py-2 pr-3">{c.assigned}</td>
                        <td className="py-2 pr-3">{c.collected}</td>
                        <td className="py-2 pr-3">{c.partial}</td>
                        <td className="py-2 pr-3">{c.unsuccessful}</td>
                        <td className="py-2">{c.assigned ? `${Math.round((c.collected / c.assigned) * 100)}%` : "—"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </Panel>
        </>
      )}
    </div>
  );
}

function Rows({ rows }: { rows: [string, string][] }) {
  return (
    <dl className="divide-y divide-slate-100 text-sm dark:divide-gray-800">
      {rows.map(([k, v]) => (
        <div key={k} className="flex justify-between gap-3 py-1.5">
          <dt className="text-slate-600 dark:text-gray-300">{k}</dt>
          <dd className="text-right font-semibold text-slate-900 dark:text-white">{v}</dd>
        </div>
      ))}
    </dl>
  );
}

function Breakdown({ title, values }: { title: string; values: Record<string, number> }) {
  const entries = Object.entries(values).sort((a, b) => b[1] - a[1]);
  if (!entries.length) return null;
  const max = Math.max(...entries.map(([, v]) => v), 1);
  return (
    <div className="mt-4">
      <div className="mb-1 text-xs font-semibold uppercase text-slate-500">{title}</div>
      <ul className="space-y-1 text-sm">
        {entries.map(([k, v]) => (
          <li key={k} className="grid grid-cols-[8rem_1fr_3rem] items-center gap-2">
            <span className="truncate">{human(k)}</span>
            <span className="h-2 rounded-full bg-slate-100 dark:bg-gray-800">
              <span className="block h-2 rounded-full bg-sky-600" style={{ width: `${(v / max) * 100}%` }} />
            </span>
            <span className="text-right font-semibold">{v}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

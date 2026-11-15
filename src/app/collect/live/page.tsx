"use client";

import React, { useCallback, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { Loader2, MapPin, RefreshCw } from "lucide-react";
import { collectApi, human, type Collector, type LiveJob } from "@/lib/collectApi";
import { btnGhostCls, ErrorNote, errorText, jobTone, Panel, Pill } from "@/components/collect/ui";
import type { FocusTarget } from "@/components/collect/LiveMap";

const LiveMap = dynamic(() => import("@/components/collect/LiveMap"), {
  ssr: false,
  loading: () => (
    <div className="flex h-[520px] items-center justify-center rounded-xl border border-slate-200 dark:border-gray-800">
      <Loader2 className="h-6 w-6 animate-spin text-slate-400" />
    </div>
  ),
});

const ago = (iso: string) => {
  const mins = Math.round((Date.now() - new Date(iso).getTime()) / 60000);
  return mins < 1 ? "just now" : `${mins} min ago`;
};

export default function LivePage() {
  const [jobs, setJobs] = useState<LiveJob[]>([]);
  const [collectors, setCollectors] = useState<Collector[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [updated, setUpdated] = useState<Date | null>(null);
  const [focus, setFocus] = useState<FocusTarget>(null);

  const load = useCallback(async () => {
    try {
      const r = await collectApi.live();
      setJobs(r.jobs);
      setCollectors(r.collectors);
      setUpdated(new Date());
      setError(null);
    } catch (e) {
      setError(errorText(e));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
    const t = setInterval(load, 15000);
    return () => clearInterval(t);
  }, [load]);

  const onDuty = collectors.filter((c) => c.on_duty);

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Live map</h1>
          <p className="text-sm text-slate-500">
            Collectors share location only while on duty with an active job. Refreshes every 15 seconds
            {updated ? ` · updated ${updated.toLocaleTimeString("en-IN", { timeStyle: "medium" })}` : ""}.
          </p>
        </div>
        <button className={btnGhostCls} onClick={load}>
          <RefreshCw className="h-4 w-4" /> Refresh
        </button>
      </div>

      <ErrorNote message={error} />

      <div className="grid gap-5 xl:grid-cols-[1fr_360px]">
        <div>
          <LiveMap jobs={jobs} collectors={collectors} focus={focus} />
          <p className="mt-2 flex flex-wrap gap-4 text-xs text-slate-500">
            <span className="inline-flex items-center gap-1">
              <span className="inline-block h-3 w-3 rounded-full bg-[#182A5C]" /> Collector
            </span>
            <span className="inline-flex items-center gap-1">
              <span className="inline-block h-3 w-3 rounded-full bg-[#D69A18]" /> Visit
            </span>
            <span className="inline-flex items-center gap-1">
              <span className="inline-block h-3 w-3 rounded-full bg-red-500" /> Delayed visit
            </span>
          </p>
        </div>

        <div className="space-y-5">
          <Panel title={`Active jobs (${jobs.length})`}>
            {loading ? (
              <Loader2 className="mx-auto h-5 w-5 animate-spin text-slate-400" />
            ) : jobs.length === 0 ? (
              <p className="text-sm text-slate-500">No jobs in progress.</p>
            ) : (
              <ul className="divide-y divide-slate-100 text-sm dark:divide-gray-800">
                {jobs.map((j) => (
                  <li key={j.job_id} className="py-2">
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-semibold">{j.visit_reference}</span>
                      <Pill tone={j.is_delayed ? "red" : jobTone(j.status)}>{j.is_delayed ? "Delayed" : human(j.status)}</Pill>
                    </div>
                    <div className="text-slate-600 dark:text-gray-300">
                      {j.slot_label} · {j.collector_name || "Unassigned"}
                    </div>
                    <div className="flex items-center justify-between text-xs text-slate-500">
                      <span>{j.location ? `Location ${ago(j.location.at)}` : "No recent location"}</span>
                      {j.destination.lat != null && j.destination.lng != null && (
                        <button
                          className="inline-flex items-center gap-1 font-semibold text-sky-700 hover:underline"
                          onClick={() => setFocus({ lat: j.destination.lat!, lng: j.destination.lng! })}
                        >
                          <MapPin className="h-3 w-3" /> Show
                        </button>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </Panel>

          <Panel title={`On duty (${onDuty.length})`}>
            {onDuty.length === 0 ? (
              <p className="text-sm text-slate-500">No collectors on duty.</p>
            ) : (
              <ul className="divide-y divide-slate-100 text-sm dark:divide-gray-800">
                {onDuty.map((c) => (
                  <li key={c.user_id} className="flex items-center justify-between py-2">
                    <span>
                      <span className="font-semibold">{c.display_name}</span>{" "}
                      <span className="text-xs text-slate-500">
                        {human(c.role)} · {c.zone} · {c.jobs_today} today
                      </span>
                    </span>
                    {c.last_location ? (
                      <button
                        className="text-xs font-semibold text-sky-700 hover:underline"
                        onClick={() => setFocus({ lat: c.last_location!.lat, lng: c.last_location!.lng })}
                      >
                        {ago(c.last_location.at)}
                      </button>
                    ) : (
                      <span className="text-xs text-slate-400">No location</span>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </Panel>
        </div>
      </div>
    </div>
  );
}

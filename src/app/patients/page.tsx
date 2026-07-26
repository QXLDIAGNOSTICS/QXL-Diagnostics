"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Users, Search, Mail, Phone, Loader2, X, ArrowUpDown, CalendarDays, Star } from "lucide-react";
import { api, type Booking } from "@/lib/api";

interface PatientRow {
  key: string;
  name: string;
  phone: string;
  email: string | null;
  age: number | null;
  gender: string | null;
  visits: number;
  lastDate: string | null;
  firstDate: string | null;
  bookings: Booking[];
}

type SortKey = "name" | "visits" | "lastDate";

function fmt(iso?: string | null) {
  if (!iso) return "—";
  try {
    return new Date(iso).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
  } catch {
    return iso;
  }
}

export default function PatientsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState<"all" | "new" | "returning">("all");
  const [sortKey, setSortKey] = useState<SortKey>("lastDate");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");
  const [selected, setSelected] = useState<PatientRow | null>(null);

  const refreshData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const { items } = await api.bookings.adminList(undefined, 500, 0);
      setBookings(items);
    } catch {
      setError("Failed to load patients from appointments.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshData();
  }, [refreshData]);

  const patients = useMemo(() => {
    const map = new Map<string, PatientRow>();
    for (const b of bookings) {
      const key = b.patient_phone;
      const existing = map.get(key);
      const d = b.preferred_date || b.created_at || null;
      if (!existing) {
        map.set(key, {
          key,
          name: b.patient_name,
          phone: b.patient_phone,
          email: b.patient_email,
          age: b.patient_age,
          gender: b.patient_gender,
          visits: 1,
          lastDate: d,
          firstDate: d,
          bookings: [b],
        });
      } else {
        existing.visits += 1;
        existing.bookings.push(b);
        if (b.patient_email && !existing.email) existing.email = b.patient_email;
        if (b.patient_age && !existing.age) existing.age = b.patient_age;
        if (d && (!existing.lastDate || d > existing.lastDate)) existing.lastDate = d;
        if (d && (!existing.firstDate || d < existing.firstDate)) existing.firstDate = d;
      }
    }
    return Array.from(map.values());
  }, [bookings]);

  const filtered = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    let rows = patients.filter((p) => {
      if (filter === "new" && p.visits !== 1) return false;
      if (filter === "returning" && p.visits < 2) return false;
      if (!q) return true;
      return (
        p.name.toLowerCase().includes(q) ||
        p.phone.includes(q) ||
        (p.email || "").toLowerCase().includes(q)
      );
    });
    rows = [...rows].sort((a, b) => {
      const dir = sortDir === "asc" ? 1 : -1;
      if (sortKey === "visits") return (a.visits - b.visits) * dir;
      if (sortKey === "lastDate") return ((a.lastDate || "").localeCompare(b.lastDate || "")) * dir;
      return a.name.localeCompare(b.name) * dir;
    });
    return rows;
  }, [patients, searchQuery, filter, sortKey, sortDir]);

  const toggleSort = (key: SortKey) => {
    if (sortKey === key) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else {
      setSortKey(key);
      setSortDir(key === "name" ? "asc" : "desc");
    }
  };

  const newCount = patients.filter((p) => p.visits === 1).length;
  const returningCount = patients.length - newCount;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
          <Users className="w-6 h-6 text-sky-600" />
          Patients
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1 text-sm">
          Unique patients derived from appointment history — view full visit history, call, or email
          directly.
        </p>
      </div>

      {error && (
        <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-600 text-sm">{error}</div>
      )}

      <div className="grid grid-cols-3 gap-3 max-w-md">
        {[
          { key: "all" as const, label: "All patients", value: patients.length },
          { key: "new" as const, label: "New", value: newCount },
          { key: "returning" as const, label: "Returning", value: returningCount },
        ].map((chip) => (
          <button
            key={chip.key}
            type="button"
            onClick={() => setFilter(chip.key)}
            className={`text-left rounded-xl border px-3 py-3 cursor-pointer ${
              filter === chip.key
                ? "border-sky-500 bg-sky-50 dark:bg-sky-950/30"
                : "border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900"
            }`}
          >
            <p className="text-[10px] font-bold uppercase text-slate-500">{chip.label}</p>
            <p className="text-xl font-extrabold text-slate-900 dark:text-white mt-0.5">{chip.value}</p>
          </button>
        ))}
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-gray-100 dark:border-gray-800">
          <div className="relative max-w-sm w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="search"
              placeholder="Search patients…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-sm bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg"
            />
          </div>
        </div>

        {loading ? (
          <div className="p-12 flex justify-center text-gray-400">
            <Loader2 className="w-6 h-6 animate-spin" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="p-12 text-center text-sm text-gray-500">No patients yet.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="bg-slate-50 text-[10px] uppercase tracking-wider text-gray-400 font-black border-b">
                  <th className="px-4 py-3">
                    <button type="button" onClick={() => toggleSort("name")} className="inline-flex items-center gap-1 cursor-pointer">
                      Name <ArrowUpDown className="w-3 h-3" />
                    </button>
                  </th>
                  <th className="px-4 py-3">Phone</th>
                  <th className="px-4 py-3">Email</th>
                  <th className="px-4 py-3">
                    <button type="button" onClick={() => toggleSort("visits")} className="inline-flex items-center gap-1 cursor-pointer">
                      Visits <ArrowUpDown className="w-3 h-3" />
                    </button>
                  </th>
                  <th className="px-4 py-3">
                    <button type="button" onClick={() => toggleSort("lastDate")} className="inline-flex items-center gap-1 cursor-pointer">
                      Last slot <ArrowUpDown className="w-3 h-3" />
                    </button>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filtered.map((p) => (
                  <tr key={p.key} className="hover:bg-slate-50/80 cursor-pointer" onClick={() => setSelected(p)}>
                    <td className="px-4 py-3 font-bold text-slate-900 dark:text-white">
                      {p.name}
                      {p.visits === 1 ? (
                        <span className="ml-2 text-[9px] font-bold uppercase px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-700">New</span>
                      ) : (
                        <span className="ml-2 text-[9px] font-bold uppercase px-1.5 py-0.5 rounded bg-indigo-100 text-indigo-700 inline-flex items-center gap-0.5">
                          <Star className="w-2.5 h-2.5" /> Returning
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <a href={`tel:${p.phone}`} onClick={(e) => e.stopPropagation()} className="text-sky-700 inline-flex items-center gap-1 hover:underline">
                        <Phone className="w-3.5 h-3.5" />
                        {p.phone}
                      </a>
                    </td>
                    <td className="px-4 py-3">
                      {p.email ? (
                        <a href={`mailto:${p.email}`} onClick={(e) => e.stopPropagation()} className="inline-flex items-center gap-1 hover:underline text-slate-600">
                          <Mail className="w-3.5 h-3.5" />
                          {p.email}
                        </a>
                      ) : (
                        "—"
                      )}
                    </td>
                    <td className="px-4 py-3 font-semibold">{p.visits}</td>
                    <td className="px-4 py-3 text-gray-500 text-xs">{fmt(p.lastDate)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {selected && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/40 backdrop-blur-[2px]">
          <button type="button" className="flex-1 cursor-default" aria-label="Close" onClick={() => setSelected(null)} />
          <div className="w-full max-w-lg h-full bg-white dark:bg-gray-900 shadow-2xl border-l border-gray-200 dark:border-gray-800 flex flex-col">
            <div className="p-5 border-b border-gray-100 dark:border-gray-800 flex items-start justify-between gap-3">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-wide text-sky-600">Patient</p>
                <h2 className="text-xl font-bold text-slate-900 dark:text-white mt-0.5">{selected.name}</h2>
                <p className="text-xs text-gray-400 mt-1">{selected.phone}</p>
              </div>
              <button type="button" onClick={() => setSelected(null)} className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer">
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              <dl className="grid grid-cols-2 gap-3 text-sm">
                {[
                  ["Email", selected.email || "—"],
                  ["Age / Gender", `${selected.age ?? "—"} / ${selected.gender ?? "—"}`],
                  ["Total visits", String(selected.visits)],
                  ["First visit", fmt(selected.firstDate)],
                ].map(([label, value]) => (
                  <div key={label} className="rounded-xl bg-slate-50 dark:bg-gray-800/60 px-3.5 py-2.5">
                    <dt className="text-[10px] font-bold uppercase tracking-wide text-slate-400">{label}</dt>
                    <dd className="mt-0.5 font-medium text-slate-800 dark:text-slate-100 break-words">{value}</dd>
                  </div>
                ))}
              </dl>
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wide text-slate-400 mb-2 flex items-center gap-1.5">
                  <CalendarDays className="w-3.5 h-3.5" /> Visit history
                </h3>
                <div className="space-y-2">
                  {selected.bookings
                    .slice()
                    .sort((a, b) => (b.preferred_date || "").localeCompare(a.preferred_date || ""))
                    .map((b) => (
                      <div key={b.id} className="rounded-lg border border-gray-100 dark:border-gray-800 px-3 py-2 text-xs">
                        <div className="flex justify-between font-semibold text-slate-700 dark:text-slate-200">
                          <span>{b.test_name || "—"}</span>
                          <span className="capitalize">{b.status.replace(/_/g, " ")}</span>
                        </div>
                        <p className="text-gray-400 mt-0.5">
                          {b.preferred_date || "—"} {b.preferred_time || ""} · {b.payment_status}
                        </p>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

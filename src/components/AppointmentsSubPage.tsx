"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Calendar, Clock, Filter, Search, ArrowRight, Loader2, CheckCircle, XCircle } from "lucide-react";
import { api, Booking } from "@/lib/api";

interface AppointmentsSubPageProps {
  title: string;
  subtitle: string;
  statusFilterTarget?: string;
  dateFilterTarget?: "today" | "upcoming" | "history";
}

export default function AppointmentsSubPage({
  title,
  subtitle,
  statusFilterTarget,
  dateFilterTarget,
}: AppointmentsSubPageProps) {
  const [appointments, setAppointments] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    let cancelled = false;
    api.bookings
      .adminList()
      .then((res) => {
        if (cancelled) return;
        setAppointments(res.items || []);
      })
      .catch(() => setAppointments([]))
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const todayStr = new Date().toISOString().split("T")[0];

  const filtered = appointments.filter((a) => {
    const matchesSearch =
      !searchQuery ||
      a.patient_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.patient_phone?.includes(searchQuery) ||
      a.test_name?.toLowerCase().includes(searchQuery.toLowerCase());

    let matchesStatus = true;
    if (statusFilterTarget) {
      matchesStatus = a.status === statusFilterTarget;
    }

    let matchesDate = true;
    if (dateFilterTarget === "today") {
      matchesDate = a.preferred_date === todayStr;
    } else if (dateFilterTarget === "upcoming") {
      matchesDate = !!a.preferred_date && a.preferred_date >= todayStr;
    } else if (dateFilterTarget === "history") {
      matchesDate = !!a.preferred_date && a.preferred_date < todayStr;
    }

    return matchesSearch && matchesStatus && matchesDate;
  });

  return (
    <div className="min-h-screen bg-[#f8faff] text-[#0f2d5e] py-10 px-4">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Navigation & Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-sky-200/60 shadow-sm">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-[#2563eb] mb-1">
              <Calendar className="w-4 h-4" />
              <Link href="/appointments" className="hover:underline">Appointments Portal</Link>
            </div>
            <h1 className="text-2xl font-extrabold text-[#0f2d5e]">{title}</h1>
            <p className="text-xs font-semibold text-slate-500">{subtitle}</p>
          </div>

          <div className="flex gap-2">
            <Link
              href="/appointments/book"
              className="px-5 py-2.5 rounded-2xl bg-[#2563eb] text-white text-xs font-extrabold uppercase tracking-wider hover:bg-[#1d4ed8] transition-all shadow-sm flex items-center gap-1.5"
            >
              Book Test <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Filter Navigation Bar */}
        <div className="flex flex-wrap gap-2 bg-white p-2 rounded-2xl border border-sky-200/60 shadow-sm">
          {[
            { label: "Admin Portal", href: "/appointments" },
            { label: "Today's Schedule", href: "/appointments/today" },
            { label: "Upcoming", href: "/appointments/upcoming" },
            { label: "Completed", href: "/appointments/completed" },
            { label: "Pending", href: "/appointments/pending" },
            { label: "Calendar", href: "/appointments/calendar" },
            { label: "History", href: "/appointments/history" },
          ].map((tab) => (
            <Link
              key={tab.href}
              href={tab.href}
              className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-sky-50 hover:text-[#2563eb] transition-all"
            >
              {tab.label}
            </Link>
          ))}
        </div>

        {/* Search Bar */}
        <div className="relative bg-white rounded-2xl border border-sky-200/60 shadow-sm p-3 flex items-center gap-3">
          <Search className="w-4 h-4 text-slate-400 ml-2" />
          <input
            type="text"
            placeholder="Search appointments by patient name, phone, or test..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 bg-transparent text-xs font-semibold outline-none text-[#0f2d5e]"
          />
        </div>

        {/* Appointments List */}
        <div className="bg-white rounded-3xl p-6 border border-sky-200/60 shadow-xl space-y-4">
          {loading ? (
            <div className="flex items-center justify-center py-16 text-slate-400">
              <Loader2 className="w-6 h-6 animate-spin" />
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-12 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
              <Calendar className="w-10 h-10 text-slate-300 mx-auto mb-3" />
              <p className="text-xs font-bold text-slate-500">No appointments found matching this filter.</p>
              <Link href="/appointments/book" className="inline-block mt-4 px-5 py-2.5 rounded-full bg-[#2563eb] text-white text-xs font-extrabold uppercase">
                Schedule New Appointment
              </Link>
            </div>
          ) : (
            <div className="space-y-3">
              {filtered.map((appt) => (
                <div
                  key={appt.id}
                  className="p-5 rounded-2xl border border-sky-100 bg-sky-50/20 hover:bg-sky-50/50 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-extrabold text-[#0f2d5e]">{appt.patient_name}</span>
                      <span className="text-[10px] font-mono font-bold text-slate-400">({appt.id})</span>
                    </div>
                    <p className="text-xs font-extrabold text-[#2563eb]">{appt.test_name || "Diagnostic Checkup Package"}</p>
                    <p className="text-[11px] font-medium text-slate-500">
                      📞 {appt.patient_phone} · 📅 {appt.preferred_date || "Flexible Date"} · 🏠 {appt.collection_type === "home" ? "Home Collection" : "Center Visit"}
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-[10px] font-extrabold uppercase px-3 py-1 rounded-full bg-blue-100 text-blue-700">
                      {appt.status}
                    </span>
                    <Link
                      href="/appointments/reschedule"
                      className="px-3 py-1.5 rounded-xl border border-slate-200 text-slate-600 text-[11px] font-bold hover:bg-white"
                    >
                      Reschedule
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

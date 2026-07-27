"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ShieldCheck,
  UserCheck,
  Truck,
  FlaskConical,
  Building,
  BarChart3,
  CheckCircle,
  Clock,
  ArrowRight,
  Search,
  Lock,
} from "lucide-react";

interface PortalPageProps {
  portalName: string;
  portalRole: string;
  description: string;
  activeTabKey: string;
}

export default function PortalPage({
  portalName,
  portalRole,
  description,
  activeTabKey,
}: PortalPageProps) {
  const [authenticated, setAuthenticated] = useState(true);
  const [search, setSearch] = useState("");

  const sampleTasks = [
    { id: "JOB-4019", patient: "Ramesh Kumar", test: "Complete Blood Count", time: "08:30 AM", status: "Assigned" },
    { id: "JOB-4020", patient: "Priya Nair", test: "Thyroid Profile (TSH, T3, T4)", time: "09:15 AM", status: "In Transit" },
    { id: "JOB-4021", patient: "Ananya Sharma", test: "Q-Master Health Pro Package", time: "10:00 AM", status: "Completed" },
  ];

  return (
    <div className="min-h-screen bg-[#f8faff] text-[#0f2d5e] py-8 px-4">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Portal Header */}
        <div className="bg-gradient-to-r from-[#e0f2fe] via-[#f0f9ff] to-[#e8f4fd] p-6 rounded-3xl border border-sky-200/60 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#2563eb] bg-white px-3 py-1 rounded-full border border-sky-200">
              QXL Operations Portal · {portalRole}
            </span>
            <h1 className="text-2xl font-extrabold text-[#0f2d5e] mt-2">{portalName}</h1>
            <p className="text-xs font-semibold text-slate-500 mt-1">{description}</p>
          </div>

          <div className="flex gap-2">
            <Link href="/login" className="px-4 py-2 rounded-xl bg-white border border-sky-200 text-xs font-bold text-[#2563eb]">
              Switch Account
            </Link>
          </div>
        </div>

        {/* Portal Dashboard Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-sky-100 shadow-sm space-y-1">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">Assigned Tasks</span>
            <p className="text-2xl font-black text-[#0f2d5e]">12 Active</p>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-sky-100 shadow-sm space-y-1">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">Completed Today</span>
            <p className="text-2xl font-black text-emerald-600">8 Orders</p>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-sky-100 shadow-sm space-y-1">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">System Status</span>
            <p className="text-2xl font-black text-[#2563eb]">NABL Online</p>
          </div>
        </div>

        {/* Task List */}
        <div className="bg-white rounded-3xl p-6 border border-sky-200/60 shadow-xl space-y-4">
          <div className="flex items-center justify-between gap-4 flex-wrap pb-4 border-b border-slate-100">
            <h2 className="text-sm font-extrabold text-[#0f2d5e] uppercase tracking-wider">
              Assigned Operational Orders
            </h2>
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search job ID or patient..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold outline-none"
              />
            </div>
          </div>

          <div className="space-y-3">
            {sampleTasks.map((t) => (
              <div key={t.id} className="p-4 rounded-2xl border border-sky-100 bg-sky-50/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-extrabold text-[#0f2d5e]">{t.patient}</span>
                    <span className="text-[10px] font-mono font-bold text-slate-400">({t.id})</span>
                  </div>
                  <p className="text-xs font-extrabold text-[#2563eb]">{t.test}</p>
                  <p className="text-[11px] font-semibold text-slate-500">Scheduled Time: {t.time}</p>
                </div>

                <span className="text-[10px] font-extrabold uppercase px-3 py-1 rounded-full bg-blue-100 text-blue-700 w-fit">
                  {t.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

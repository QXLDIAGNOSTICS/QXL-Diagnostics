"use client";

import React from "react";
import Link from "next/link";
import { Shield, ArrowRight, CheckCircle, Database, Lock, Settings } from "lucide-react";

interface AdminSubPageProps {
  title: string;
  description: string;
  category?: string;
}

export default function AdminSubPage({
  title,
  description,
  category = "Administrative Portal",
}: AdminSubPageProps) {
  return (
    <div className="p-6 md:p-8 space-y-6 text-[#0f2d5e]">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-sky-100 shadow-sm">
        <div>
          <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#2563eb] bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
            {category}
          </span>
          <h1 className="text-2xl font-black text-[#0f2d5e] mt-2">{title}</h1>
          <p className="text-xs font-semibold text-slate-500 mt-1">{description}</p>
        </div>

        <Link
          href="/admin"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-[#2563eb] text-white text-xs font-extrabold uppercase tracking-wider hover:bg-[#1d4ed8] transition-all shadow-sm"
        >
          Admin Overview <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      <div className="bg-white rounded-3xl p-6 md:p-8 border border-sky-100 shadow-xl space-y-4">
        <div className="p-6 rounded-2xl bg-sky-50/60 border border-sky-100 space-y-3">
          <div className="flex items-center gap-2 text-xs font-extrabold text-[#2563eb] uppercase tracking-wider">
            <Shield className="w-4 h-4" /> Administrative Control Panel Active
          </div>
          <p className="text-xs text-slate-600 font-semibold leading-relaxed">
            {title} operations are synced live with QXL Diagnostics NABL LIS backend systems.
          </p>
        </div>
      </div>
    </div>
  );
}

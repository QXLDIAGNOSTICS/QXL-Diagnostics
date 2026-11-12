'use client';

import React from 'react';
import Link from 'next/link';
import {
  ShieldCheck,
  Phone,
  Activity,
  Calendar,
  Radio,
  Truck,
  FlaskConical,
  Award,
  Lock,
  BarChart3,
  History,
  CheckCircle2
} from 'lucide-react';

export type CollectActiveRole =
  | 'PATIENT'
  | 'DISPATCHER'
  | 'PHLEBOTOMIST'
  | 'LOGISTICS'
  | 'LAB'
  | 'CLINICAL_LIS'
  | 'REPORTS'
  | 'EXECUTIVE'
  | 'AUDIT';

interface CollectRoleHeaderProps {
  activeRole: CollectActiveRole;
  onSelectRole: (role: CollectActiveRole) => void;
  pendingCount?: number;
}

export const CollectRoleHeader: React.FC<CollectRoleHeaderProps> = ({
  activeRole,
  onSelectRole,
  pendingCount = 2
}) => {
  const roles: Array<{
    id: CollectActiveRole;
    label: string;
    icon: React.ComponentType<{ className?: string }>;
    stage: string;
    badge?: number;
  }> = [
    { id: 'PATIENT', label: 'Patient Booking & Tracker', icon: Calendar, stage: 'Stage 01–02' },
    { id: 'DISPATCHER', label: 'Dispatch Control Room', icon: Radio, stage: 'Stage 03', badge: pendingCount },
    { id: 'PHLEBOTOMIST', label: 'Field Mobile Bedside', icon: Activity, stage: 'Stage 04' },
    { id: 'LOGISTICS', label: 'Logistics & Custody', icon: Truck, stage: 'Stage 05' },
    { id: 'LAB', label: 'Lab Accession Desk', icon: FlaskConical, stage: 'Stage 06' },
    { id: 'CLINICAL_LIS', label: 'ITDOSE Signoff (LIS)', icon: Award, stage: 'Stage 07' },
    { id: 'REPORTS', label: 'Secure Report Portal', icon: Lock, stage: 'Stage 08' },
    { id: 'EXECUTIVE', label: 'CEO Cockpit & KPIs', icon: BarChart3, stage: 'Executive' },
    { id: 'AUDIT', label: 'Forensic Audit Log', icon: History, stage: 'QMS Trail' }
  ];

  return (
    <header className="bg-[#082142] text-white border-b border-[#D69A18]/30 sticky top-[102px] lg:top-[125px] z-40 shadow-md">
      {/* Top Brand & Compliance Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2.5 flex flex-wrap items-center justify-between gap-3 border-b border-white/10 text-xs">
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#D69A18] to-[#b37e0e] flex items-center justify-center font-black text-[#082142] text-lg shadow-sm">
              Q
            </div>
            <div>
              <span className="font-extrabold text-sm tracking-tight text-white group-hover:text-[#D69A18] transition">
                QXL COLLECT
              </span>
              <span className="hidden sm:inline-block text-[10px] text-gray-300 ml-2 font-mono">
                v1.0 • 8-Stage Platform
              </span>
            </div>
          </Link>

          <span className="hidden md:inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-medium text-[11px]">
            <ShieldCheck className="w-3.5 h-3.5" />
            NABL Accredited (MC-6849)
          </span>

          <span className="hidden lg:inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-blue-500/20 text-blue-200 text-[10px] font-mono">
            Bengaluru Central Dispatch
          </span>
        </div>

        <div className="flex items-center gap-3">
          <a
            href="tel:+919964639639"
            className="flex items-center gap-1.5 text-xs text-amber-200 hover:text-white transition font-medium"
          >
            <Phone className="w-3.5 h-3.5 text-[#D69A18]" />
            <span>Central Support: +91 9964 639 639</span>
          </a>

          <div className="h-3 w-px bg-white/20 hidden sm:block" />

          <span className="hidden sm:inline-flex items-center gap-1 text-[11px] text-emerald-400">
            <CheckCircle2 className="w-3 h-3" />
            ITDOSE Connected
          </span>
        </div>
      </div>

      {/* Role Navigation Stepper Bar */}
      <div className="max-w-7xl mx-auto px-2 sm:px-6 overflow-x-auto scrollbar-none py-2">
        <nav className="flex items-center gap-1.5 min-w-max" aria-label="Role switcher">
          {roles.map(r => {
            const Icon = r.icon;
            const isActive = activeRole === r.id;
            return (
              <button
                key={r.id}
                onClick={() => onSelectRole(r.id)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'bg-[#D69A18] text-[#082142] shadow-sm ring-2 ring-[#D69A18]/50 font-bold'
                    : 'bg-white/5 text-gray-200 hover:bg-white/10 hover:text-white'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#082142]' : 'text-[#D69A18]'}`} />
                <span>{r.label}</span>
                <span
                  className={`text-[9px] px-1.5 py-0.2 rounded font-mono ${
                    isActive ? 'bg-[#082142]/20 text-[#082142]' : 'bg-black/30 text-gray-400'
                  }`}
                >
                  {r.stage}
                </span>
                {r.badge !== undefined && r.badge > 0 && (
                  <span className="w-4 h-4 rounded-full bg-red-500 text-white text-[10px] flex items-center justify-center font-bold">
                    {r.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
};


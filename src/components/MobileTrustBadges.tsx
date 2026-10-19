"use client";
import React from 'react';
import { Award, UserCheck, Clock, Users } from 'lucide-react';

export default function MobileTrustBadges() {
  const badges = [
    {
      icon: Award,
      title: "NABL Accredited",
      subtitle: "Laboratory"
    },
    {
      icon: UserCheck,
      title: "Doctor Led",
      subtitle: "Interpretation"
    },
    {
      icon: Clock,
      title: "Accurate Reports",
      subtitle: "On Time"
    },
    {
      icon: Users,
      title: "Trusted by Doctors",
      subtitle: "& Patients"
    }
  ];

  return (
    <div className="w-full bg-[#EFF6FF] border-t border-[#BFDBFE] py-4 px-3 lg:hidden mt-6 mb-2">
      <div className="grid grid-cols-4 gap-1.5 max-w-md mx-auto text-center">
        {badges.map((b, idx) => {
          const Icon = b.icon;
          return (
            <div key={idx} className="flex flex-col items-center justify-center p-1">
              <div className="w-10 h-10 rounded-full bg-[#E0EFFE] border border-[#BAE0FD] flex items-center justify-center mb-1.5 shadow-xs">
                <Icon className="w-5 h-5 text-[#2563EB]" />
              </div>
              <span className="text-[10px] font-black text-slate-800 leading-tight block">{b.title}</span>
              <span className="text-[9px] font-bold text-amber-900/70 leading-none block mt-0.5">{b.subtitle}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

"use client";
import React from 'react';
import { Award, UserCheck, Clock, Users } from 'lucide-react';

export default function MobileTrustBadges() {
  const badges = [
    {
      icon: Award,
      title: "NABL Certified",
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
    <div className="w-full bg-[#FFF8EB] border-t border-[#F3DBA7] py-4 px-3 lg:hidden mt-6 mb-2">
      <div className="grid grid-cols-4 gap-1.5 max-w-md mx-auto text-center">
        {badges.map((b, idx) => {
          const Icon = b.icon;
          return (
            <div key={idx} className="flex flex-col items-center justify-center p-1">
              <div className="w-10 h-10 rounded-full bg-[#FDF0D5] border border-[#E9C47A] flex items-center justify-center mb-1.5 shadow-xs">
                <Icon className="w-5 h-5 text-[#D69A18]" />
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

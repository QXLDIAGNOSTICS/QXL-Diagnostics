import React from 'react';
import Link from 'next/link';
import { ShieldCheck, BookOpen, Activity } from 'lucide-react';

interface Props {
  currentPath?: string;
}

export default function SexualHealthNav({ currentPath }: Props) {
  const testPages = [
    { title: "HIV Test Bangalore", href: "/tests/hiv-test-bangalore" },
    { title: "HIV 4th Gen Duo Test", href: "/tests/hiv-4th-generation-test" },
    { title: "VDRL & RPR Syphilis", href: "/tests/vdrl-rpr-test" },
    { title: "STD/STI Diagnostic Panels", href: "/tests/std-sti-panel" },
    { title: "Chlamydia & Gonorrhea PCR", href: "/tests/chlamydia-gonorrhea-pcr" },
    { title: "Syphilis Dual Serology", href: "/tests/syphilis-test" },
    { title: "Genital Herpes (HSV PCR)", href: "/tests/hsv-herpes-test" },
  ];

  const packagePages = [
    { title: "All 10 STI Packages Directory", href: "/sexual-health/packages" },
    { title: "Triple STI Multiplex PCR Screen", href: "/packages/triple-sti-pcr-screen" },
    { title: "Essential Blood-Borne STI Screen", href: "/packages/essential-sti-screening" },
    { title: "Vaginal Infection Diagnostic Profile", href: "/packages/vaginal-infection-profile" },
    { title: "Oral & Rectal Extragenital STI NAAT", href: "/packages/oral-rectal-sti-screening" },
  ];

  const guidePages = [
    { title: "HIV Test Window Period & Calculator", href: "/health-hub/hiv-test-window-period" },
    { title: "After Unprotected Sex & PEP Protocol", href: "/health-hub/after-unprotected-sex" },
    { title: "Genital Sores Differential (Herpes vs Syphilis)", href: "/health-hub/genital-sores-causes" },
    { title: "STI Testing After Oral Sex", href: "/health-hub/sti-testing-after-oral-sex" },
  ];

  return (
    <div className="bg-slate-50 border-y border-slate-200 py-10 my-12">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-black uppercase tracking-widest text-[#2563eb]">
              Sexual Health &amp; Infectious Disease Knowledge Hub
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-[#0c4a6e] mt-1">
              Explore All 17 Confidential STI Testing, Package &amp; Guide Pages
            </h3>
          </div>
          <div className="flex items-center gap-2.5 flex-wrap">
            <Link
              href="/sexual-health"
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                currentPath === '/sexual-health'
                  ? 'bg-[#0f2d5e] text-white shadow-sm'
                  : 'bg-white border border-slate-300 text-slate-800 hover:border-[#2563eb]'
              }`}
            >
              Hub Overview
            </Link>
            <Link
              href="/sexual-health/packages"
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                currentPath === '/sexual-health/packages'
                  ? 'bg-[#0f2d5e] text-white shadow-sm'
                  : 'bg-white border border-slate-300 text-slate-800 hover:border-[#2563eb]'
              }`}
            >
              All 10 Packages
            </Link>
            <Link
              href="/specialities/infectious-diseases"
              className="px-4 py-2 rounded-xl text-xs font-bold bg-white border border-slate-300 text-slate-800 hover:border-[#2563eb] transition-all"
            >
              Infectious Diseases Speciality
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Test Pages */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-3">
            <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
              <Activity className="w-4 h-4 text-[#2563eb]" />
              <h4 className="font-extrabold text-xs text-slate-900 uppercase tracking-wider">
                Laboratory Diagnostic Tests (7)
              </h4>
            </div>
            <ul className="space-y-1 text-xs">
              {testPages.map((tp) => (
                <li key={tp.href}>
                  <Link
                    href={tp.href}
                    className={`block p-2 rounded-lg transition-all ${
                      currentPath === tp.href
                        ? 'bg-blue-50 text-[#2563eb] font-extrabold border border-blue-200'
                        : 'text-slate-700 hover:bg-slate-50 hover:text-[#2563eb] font-medium'
                    }`}
                  >
                    {tp.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Package Pages */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-3">
            <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <h4 className="font-extrabold text-xs text-slate-900 uppercase tracking-wider">
                Diagnostic STI Packages (5)
              </h4>
            </div>
            <ul className="space-y-1 text-xs">
              {packagePages.map((pp) => (
                <li key={pp.href}>
                  <Link
                    href={pp.href}
                    className={`block p-2 rounded-lg transition-all ${
                      currentPath === pp.href
                        ? 'bg-emerald-50 text-emerald-900 font-extrabold border border-emerald-200'
                        : 'text-slate-700 hover:bg-slate-50 hover:text-[#2563eb] font-medium'
                    }`}
                  >
                    {pp.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Clinical Guides */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-3">
            <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
              <BookOpen className="w-4 h-4 text-[#f59e0b]" />
              <h4 className="font-extrabold text-xs text-slate-900 uppercase tracking-wider">
                Patient Clinical Guides (4)
              </h4>
            </div>
            <ul className="space-y-1 text-xs">
              {guidePages.map((gp) => (
                <li key={gp.href}>
                  <Link
                    href={gp.href}
                    className={`block p-2 rounded-lg transition-all ${
                      currentPath === gp.href
                        ? 'bg-amber-50 text-amber-900 font-extrabold border border-amber-200'
                        : 'text-slate-700 hover:bg-slate-50 hover:text-[#2563eb] font-medium'
                    }`}
                  >
                    {gp.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}


import React from 'react';
import Link from 'next/link';
import { Phone, MessageSquare, ArrowRight, ShieldAlert } from 'lucide-react';
import { PHONE_DISPLAY, PHONE_E164, WHATSAPP_LINK } from '@/lib/businessInfo';

export default function PepUrgentBanner() {
  return (
    <div className="bg-gradient-to-r from-red-700 via-rose-700 to-red-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-red-500/40 relative overflow-hidden">
      <div className="absolute top-0 right-0 -mt-10 -mr-10 w-48 h-48 bg-white/5 rounded-full blur-2xl pointer-events-none" />
      <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
        <div className="space-y-3 max-w-2xl">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-wider text-rose-100 border border-white/30">
            <ShieldAlert className="w-3.5 h-3.5 text-amber-300" />
            72-Hour Emergency Protocol
          </div>
          <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-snug">
            Possible HIV Exposure Within the Last 72 Hours?
          </h3>
          <p className="text-sm sm:text-base text-rose-100 leading-relaxed font-medium">
            Post-Exposure Prophylaxis (PEP) is a short course of antiretroviral drugs that can stop HIV infection after exposure.
            <strong> PEP is most effective when started within 24 hours, and must be initiated within 72 hours.</strong> Do not wait for test results before seeking a physician consultation.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row lg:flex-col gap-3 w-full sm:w-auto shrink-0">
          <a
            href={`tel:${PHONE_E164}`}
            className="inline-flex items-center justify-center gap-2.5 bg-white hover:bg-blue-50 font-black text-xs sm:text-[13px] uppercase tracking-wider px-6 py-3.5 rounded-full transition-all shadow-lg active:scale-95 border border-white"
            style={{ backgroundColor: '#ffffff', color: '#1d4ed8' }}
          >
            <Phone className="w-4.5 h-4.5 text-rose-600 shrink-0" style={{ color: '#e11d48' }} />
            <span className="font-extrabold tracking-wider" style={{ color: '#1d4ed8' }}>
              CALL URGENT HELPLINE ({PHONE_DISPLAY})
            </span>
          </a>
          <a
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2.5 bg-emerald-600 hover:bg-emerald-500 font-black text-xs sm:text-[13px] uppercase tracking-wider px-6 py-3.5 rounded-full transition-all shadow-md active:scale-95"
            style={{ backgroundColor: '#2e9d56', color: '#ffffff' }}
          >
            <MessageSquare className="w-4.5 h-4.5 text-white shrink-0" style={{ color: '#ffffff' }} />
            <span className="font-extrabold tracking-wider" style={{ color: '#ffffff' }}>
              WHATSAPP EMERGENCY CONSULTATION
            </span>
          </a>
          <Link
            href="/health-hub/after-unprotected-sex"
            className="inline-flex items-center justify-center gap-1.5 text-xs font-bold text-rose-100 hover:text-white underline underline-offset-4 text-center mt-1 group"
            style={{ color: '#ffffff' }}
          >
            <span style={{ color: '#ffffff' }}>Read Complete After Unprotected Sex Guide</span>
            <ArrowRight className="w-3.5 h-3.5 text-white group-hover:translate-x-0.5 transition-transform" style={{ color: '#ffffff' }} />
          </Link>
        </div>
      </div>
    </div>
  );
}


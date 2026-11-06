'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, ShieldCheck } from 'lucide-react';
import { SecureReportPortalView } from '@/components/collect/SecureReportPortalView';
import { collectStore } from '@/lib/collect/store';
import { BookingRecord, DiagnosticReportMetadata } from '@/lib/collect/types';

export default function CollectReportsDirectPage() {
  const [bookings, setBookings] = useState<BookingRecord[]>([]);
  const [reports, setReports] = useState<DiagnosticReportMetadata[]>([]);

  useEffect(() => {
    setBookings(collectStore.getAllBookings());
    setReports(collectStore.getAllReports());
  }, []);

  return (
    <div className="min-h-screen bg-[#f8faff] py-8 px-4 sm:px-6">
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="flex items-center justify-between border-b border-gray-200 pb-3">
          <Link
            href="/collect"
            className="flex items-center gap-1.5 text-xs font-semibold text-gray-600 hover:text-black"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to QXL Collect</span>
          </Link>

          <span className="text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
            NABL Accredited (MC-6849)
          </span>
        </div>

        <SecureReportPortalView bookings={bookings} reports={reports} />
      </div>
    </div>
  );
}


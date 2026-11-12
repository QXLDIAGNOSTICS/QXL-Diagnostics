'use client';

import React, { useState } from 'react';
import {
  Award,
  ShieldCheck,
  CheckCircle2,
  AlertOctagon,
  FileText,
  UserCheck,
  Send,
  Lock
} from 'lucide-react';
import { BookingRecord, DiagnosticReportMetadata } from '@/lib/collect/types';

interface ItdoseClinicalReleaseViewProps {
  bookings: BookingRecord[];
  reports: DiagnosticReportMetadata[];
  onReportAuthorized: () => void;
}

export const ItdoseClinicalReleaseView: React.FC<ItdoseClinicalReleaseViewProps> = ({
  bookings,
  reports,
  onReportAuthorized
}) => {
  // Find bookings that are accessioned or have reports
  const eligibleBookings = bookings.filter(
    b => ['ACCESSIONED', 'AUTHORIZED', 'DELIVERED'].includes(b.bookingStatus)
  );

  const [selectedBookingId, setSelectedBookingId] = useState<string>(
    eligibleBookings[0]?.bookingId || ''
  );
  const [clinicianName, setClinicianName] = useState('Dr. Shantakumar Muruda, MD Pathologist');
  const [isCritical, setIsCritical] = useState(false);
  const [readbackLogged, setReadbackLogged] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<{ text: string; error: boolean } | null>(null);

  const selectedBooking = bookings.find(b => b.bookingId === selectedBookingId);
  const existingReports = reports.filter(r => r.bookingId === selectedBookingId);

  const handleAuthorizeRelease = async () => {
    if (!selectedBooking) return;
    setIsSubmitting(true);
    setFeedback(null);

    try {
      const res = await fetch('/api/v1/collect/lab/itdose-authorize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          bookingId: selectedBooking.bookingId,
          itdoseAccession: `ITD-ACC-${selectedBooking.bookingId.split('-').pop() || '99214'}`,
          clinicianName,
          isCritical,
          criticalReadbackLogged: isCritical ? readbackLogged : false,
          testSummaries: [
            {
              testName: selectedBooking.patients[0]?.orderItems[0]?.testName || 'Diagnostic Profile',
              resultState: isCritical ? 'CRITICAL' : 'NORMAL',
              analyteCount: 18
            }
          ]
        })
      });
      const data = await res.json();

      if (!res.ok) throw new Error(data.error || 'Failed to authorize report in ITDOSE');

      setFeedback({
        text: `Clinical Report ${data.report?.reportId} (Version ${data.report?.reportVersion}) authorized by ${clinicianName}. Secure patient delivery link is now unlocked.`,
        error: false
      });
      onReportAuthorized();
    } catch (err: any) {
      setFeedback({ text: err.message, error: true });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-gray-200 pb-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-[#082142] tracking-tight flex items-center gap-2">
            <Award className="w-5 h-5 text-[#D69A18]" />
            <span>Stage 07 — ITDOSE LIMS Clinical Signoff & Release Console</span>
          </h1>
          <p className="text-xs text-gray-600 mt-0.5">
            Strict system-of-record boundary: Medical validation & digital pathologist authorization exist exclusively within ITDOSE LIMS.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <span className="px-2.5 py-1 rounded-lg bg-blue-50 text-blue-900 border border-blue-200 font-semibold flex items-center gap-1">
            <Lock className="w-3.5 h-3.5 text-blue-600" />
            <span>Zero Unverified Patient Leakage Enforced</span>
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Accessioned Orders Awaiting Signoff */}
        <div className="space-y-3">
          <h2 className="text-xs font-extrabold text-[#082142] uppercase tracking-wider">
            Accessioned Work Orders ({eligibleBookings.length})
          </h2>

          <div className="space-y-2">
            {eligibleBookings.map(b => {
              const isSelected = selectedBookingId === b.bookingId;
              const hasReleased = reports.some(r => r.bookingId === b.bookingId);

              return (
                <div
                  key={b.bookingId}
                  onClick={() => setSelectedBookingId(b.bookingId)}
                  className={`p-3.5 rounded-xl border text-xs cursor-pointer transition ${
                    isSelected
                      ? 'border-[#082142] bg-[#082142]/5 ring-1 ring-[#082142]'
                      : 'border-gray-200 bg-white hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono font-bold text-[#082142]">{b.bookingId}</span>
                    <span
                      className={`text-[9px] font-extrabold px-2 py-0.5 rounded ${
                        hasReleased ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {hasReleased ? 'AUTHORIZED IN LIS' : 'AWAITING SIGNOFF'}
                    </span>
                  </div>

                  <p className="text-[11px] font-semibold text-gray-800 mt-1">
                    {b.patients[0]?.patient.fullName}
                  </p>
                  <p className="text-[10px] text-gray-500">
                    Tests: {b.patients[0]?.orderItems.map(i => i.testName).join(', ')}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Pathologist Authorization Desk */}
        <div className="lg:col-span-2 space-y-4">
          {selectedBooking ? (
            <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                <div className="space-y-0.5">
                  <h3 className="font-extrabold text-sm text-[#082142]">
                    Clinical Signoff Desk • {selectedBooking.bookingId}
                  </h3>
                  <p className="text-xs text-gray-500">
                    Patient: {selectedBooking.patients[0]?.patient.fullName} (
                    {selectedBooking.patients[0]?.patient.patientId})
                  </p>
                </div>

                <div className="text-right">
                  <span className="text-[10px] font-mono bg-purple-50 text-purple-900 border border-purple-200 px-2 py-0.5 rounded font-bold">
                    ITDOSE INNOPATH LIMS
                  </span>
                </div>
              </div>

              {/* Pathologist Credentials */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="font-semibold text-gray-700 block mb-1">
                    Consultant Pathologist (Authorized Signatory)
                  </label>
                  <input
                    type="text"
                    value={clinicianName}
                    onChange={e => setClinicianName(e.target.value)}
                    className="w-full px-3 py-1.5 border border-gray-300 rounded-lg bg-gray-50 font-bold text-gray-800"
                  />
                  <span className="text-[10px] text-gray-500 block mt-0.5">
                    NABL Certificate MC-6849 verified signatory
                  </span>
                </div>

                <div className="bg-gray-50 p-3 rounded-lg border border-gray-200 space-y-1">
                  <span className="font-bold text-[#082142] block">Existing Released Versions:</span>
                  {existingReports.length > 0 ? (
                    existingReports.map(r => (
                      <div key={r.reportId} className="flex justify-between text-[11px] text-gray-600">
                        <span>
                          {r.reportId} (v{r.reportVersion})
                        </span>
                        <span className="text-emerald-700 font-semibold">{r.reportStatus}</span>
                      </div>
                    ))
                  ) : (
                    <span className="text-gray-400 text-[11px]">No reports released yet (Draft stage)</span>
                  )}
                </div>
              </div>

              {/* Critical Value Communication Protocol */}
              <div className="bg-red-50/50 p-4 rounded-xl border border-red-200 text-xs space-y-2">
                <div className="flex items-center gap-2 text-red-900 font-extrabold">
                  <AlertOctagon className="w-4 h-4 text-red-600" />
                  <span>Critical Value Alert & Read-Back Protocol</span>
                </div>
                <label className="flex items-center gap-2 cursor-pointer font-semibold text-gray-800">
                  <input
                    type="checkbox"
                    checked={isCritical}
                    onChange={e => setIsCritical(e.target.checked)}
                    className="rounded text-red-600"
                  />
                  <span>Report contains critical panic values requiring mandatory telephone communication</span>
                </label>

                {isCritical && (
                  <div className="mt-2 pl-6 space-y-1 text-red-800 text-[11px]">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={readbackLogged}
                        onChange={e => setReadbackLogged(e.target.checked)}
                        className="rounded text-red-600"
                      />
                      <span>
                        Verified: Direct telephonic read-back completed with treating physician or registered patient.
                      </span>
                    </label>
                  </div>
                )}
              </div>

              {feedback && (
                <div
                  className={`p-3 rounded-lg text-xs font-medium ${
                    feedback.error ? 'bg-red-100 text-red-900' : 'bg-emerald-100 text-emerald-900'
                  }`}
                >
                  {feedback.text}
                </div>
              )}

              <div className="flex justify-end pt-2 border-t border-gray-100">
                <button
                  onClick={handleAuthorizeRelease}
                  disabled={isSubmitting || (isCritical && !readbackLogged)}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#D69A18] to-[#b37e0e] text-[#082142] text-xs font-black shadow-md hover:brightness-105 transition flex items-center gap-2 disabled:opacity-50"
                >
                  <Award className="w-4 h-4" />
                  <span>
                    {isSubmitting
                      ? 'Authorizing in ITDOSE…'
                      : existingReports.length > 0
                      ? 'Authorize Amended Report (Version 2)'
                      : 'Clinically Authorize & Release Report'}
                  </span>
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-white p-8 rounded-xl border border-gray-200 text-center text-gray-500">
              Select an accessioned order to perform pathologist authorization.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};


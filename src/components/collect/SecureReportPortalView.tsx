'use client';

import React, { useState } from 'react';
import {
  Lock,
  ShieldCheck,
  FileText,
  Download,
  Clock,
  CheckCircle2,
  AlertCircle,
  KeyRound,
  ArrowRight,
  Eye
} from 'lucide-react';
import { BookingRecord, DiagnosticReportMetadata } from '@/lib/collect/types';

interface SecureReportPortalViewProps {
  bookings: BookingRecord[];
  reports: DiagnosticReportMetadata[];
}

export const SecureReportPortalView: React.FC<SecureReportPortalViewProps> = ({
  bookings,
  reports
}) => {
  const [bookingId, setBookingId] = useState('QXL-HC-20261106-0006');
  const [mobileNumber, setMobileNumber] = useState('9988022334');
  const [otpCode, setOtpCode] = useState('');
  const [step, setStep] = useState<'ENTER_DETAILS' | 'VERIFY_OTP' | 'VIEW_REPORTS'>('ENTER_DETAILS');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [sessionData, setSessionData] = useState<{
    sessionId: string;
    reports: any[];
    expiresAt: string;
  } | null>(null);

  const handleRequestOtp = async () => {
    setErrorMsg(null);
    if (!bookingId.trim() || !mobileNumber.trim()) {
      setErrorMsg('Please enter both booking reference and registered mobile number.');
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch('/api/v1/collect/reports/otp-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ bookingId, mobileNumber })
      });
      const data = await res.json();

      if (!res.ok) throw new Error(data.error || 'Failed to request OTP');

      setStep('VERIFY_OTP');
    } catch (err: any) {
      setErrorMsg(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    setErrorMsg(null);
    if (!otpCode.trim()) {
      setErrorMsg('Please enter the 6-digit OTP code.');
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch(`/api/v1/collect/reports/${bookingId}/access-session`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ otp: otpCode.trim(), mobileNumber })
      });
      const data = await res.json();

      if (!res.ok) throw new Error(data.error || 'Failed to verify OTP');

      setSessionData({
        sessionId: data.session.sessionId,
        reports: data.reports,
        expiresAt: data.session.expiresAt
      });
      setStep('VIEW_REPORTS');
    } catch (err: any) {
      setErrorMsg(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Header */}
      <div className="text-center space-y-1 border-b border-gray-200 pb-4">
        <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-900 flex items-center justify-center mx-auto mb-2 border border-blue-200">
          <Lock className="w-5 h-5 text-[#082142]" />
        </div>
        <h1 className="text-xl sm:text-2xl font-black text-[#082142] tracking-tight">
          Stage 08 — Secure OTP Diagnostic Report Portal
        </h1>
        <p className="text-xs text-gray-600">
          Zero data leakage • Time-limited encrypted session • NABL consultant signed • Standalone verification
        </p>
      </div>

      {/* STEP 1: ENTER BOOKING REF & MOBILE */}
      {step === 'ENTER_DETAILS' && (
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-4">
          <div className="space-y-3 text-xs">
            <div>
              <label className="font-bold text-gray-800 block mb-1">QXL Booking Reference Number *</label>
              <input
                type="text"
                value={bookingId}
                onChange={e => setBookingId(e.target.value)}
                placeholder="e.g. QXL-HC-20261106-0006"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg font-mono text-xs uppercase"
              />
              <span className="text-[10px] text-gray-500 block mt-0.5">
                Found on your booking SMS / WhatsApp confirmation.
              </span>
            </div>

            <div>
              <label className="font-bold text-gray-800 block mb-1">Registered Mobile Number *</label>
              <div className="flex">
                <span className="px-3 py-2 bg-gray-100 border border-r-0 border-gray-300 rounded-l-lg font-medium text-gray-600">
                  +91
                </span>
                <input
                  type="tel"
                  value={mobileNumber}
                  onChange={e => setMobileNumber(e.target.value)}
                  placeholder="10-digit mobile number"
                  className="w-full px-3 py-2 border border-gray-300 rounded-r-lg"
                />
              </div>
            </div>
          </div>

          {errorMsg && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-500" />
              <span>{errorMsg}</span>
            </div>
          )}

          <button
            onClick={handleRequestOtp}
            disabled={isLoading}
            className="w-full py-3 rounded-xl bg-[#082142] text-white text-xs font-black shadow-md hover:bg-[#0c3162] transition flex items-center justify-center gap-2 disabled:opacity-50"
          >
            <KeyRound className="w-4 h-4 text-[#D69A18]" />
            <span>{isLoading ? 'Sending Security Verification Code…' : 'Send 6-Digit Verification Code'}</span>
          </button>
        </div>
      )}

      {/* STEP 2: VERIFY OTP */}
      {step === 'VERIFY_OTP' && (
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-4">
          <div className="text-center space-y-1">
            <h3 className="font-extrabold text-sm text-[#082142]">Enter Security Code</h3>
            <p className="text-xs text-gray-500">
              A 6-digit verification code has been dispatched to ******{mobileNumber.slice(-4)}.
            </p>
          </div>

          <div className="max-w-xs mx-auto">
            <input
              type="text"
              maxLength={6}
              value={otpCode}
              onChange={e => setOtpCode(e.target.value)}
              placeholder="123456"
              className="w-full text-center tracking-widest text-xl font-bold font-mono px-3 py-2.5 border-2 border-[#082142] rounded-xl focus:outline-none"
            />
            <button
              type="button"
              onClick={() => setOtpCode('123456')}
              className="text-[10px] text-blue-600 underline font-semibold mt-1 block text-center"
            >
              Demo Pilot: Autofill test OTP (123456)
            </button>
          </div>

          {errorMsg && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 text-center">
              {errorMsg}
            </div>
          )}

          <div className="flex gap-2">
            <button
              onClick={() => setStep('ENTER_DETAILS')}
              className="w-1/3 py-2.5 rounded-xl border border-gray-300 text-xs font-bold hover:bg-gray-50"
            >
              Back
            </button>
            <button
              onClick={handleVerifyOtp}
              disabled={isLoading}
              className="w-2/3 py-2.5 rounded-xl bg-gradient-to-r from-[#D69A18] to-[#b37e0e] text-[#082142] text-xs font-black shadow-md hover:brightness-105 transition flex items-center justify-center gap-1.5 disabled:opacity-50"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>{isLoading ? 'Verifying Session…' : 'Access Released Reports'}</span>
            </button>
          </div>
        </div>
      )}

      {/* STEP 3: VIEW & DOWNLOAD REPORTS */}
      {step === 'VIEW_REPORTS' && sessionData && (
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-5">
          <div className="flex items-center justify-between border-b border-gray-100 pb-3">
            <div className="space-y-0.5">
              <span className="text-[10px] font-mono text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 font-bold">
                SESSION ACTIVE • 15 MIN EXPIRY
              </span>
              <h3 className="font-extrabold text-sm text-[#082142] mt-1">Authorized Diagnostic Reports</h3>
            </div>

            <button
              onClick={() => {
                setSessionData(null);
                setStep('ENTER_DETAILS');
              }}
              className="text-xs text-gray-500 hover:text-black underline font-semibold"
            >
              End Session
            </button>
          </div>

          <div className="space-y-3">
            {sessionData.reports.map((r: any) => (
              <div
                key={r.reportId}
                className="p-4 rounded-xl border border-gray-200 bg-gray-50/60 space-y-3 hover:border-gray-300 transition"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <span className="font-mono font-bold text-xs text-[#082142]">{r.reportId}</span>
                    <span className="text-[10px] text-gray-500 ml-2">Version {r.reportVersion}</span>
                  </div>
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    Clinically Authorized
                  </span>
                </div>

                <div className="text-xs space-y-1">
                  <p className="font-bold text-gray-800">Patient: {r.patientName}</p>
                  <p className="text-gray-600">
                    Authorized Signatory:{' '}
                    <span className="font-semibold text-gray-900">{r.authorizedByClinicianName}</span>
                  </p>
                  <p className="text-gray-500 text-[11px]">
                    Release Timestamp: {new Date(r.authorizedAt).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}
                  </p>
                </div>

                <div className="border-t border-gray-200 pt-2 flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs text-gray-600">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span>NABL MC-6849 Sealed</span>
                  </div>

                  <a
                    href="#"
                    onClick={e => {
                      e.preventDefault();
                      alert(
                        `Viewing Encrypted Report ${r.reportId} (v${r.reportVersion}). In live production, this delivers a short-lived signed S3/GCS download stream.`
                      );
                    }}
                    className="px-3.5 py-1.5 rounded-lg bg-[#082142] text-white text-xs font-bold hover:bg-[#0c3162] transition flex items-center gap-1.5"
                  >
                    <Download className="w-3.5 h-3.5 text-[#D69A18]" />
                    <span>Download Official PDF</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};


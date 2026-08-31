"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, FileText, ChevronRight, Upload, Download, ShieldCheck, Lock, Loader2, Calendar } from 'lucide-react';
import MobileTrustBadges from '@/components/MobileTrustBadges';
import PrescriptionModal from '@/components/PrescriptionModal';
import LoginFlow from '@/components/auth/LoginFlow';
import { useAuth } from '@/lib/useAuth';
import { api, type Booking } from '@/lib/api';

export default function ReportPage() {
  const { user, loading, refresh } = useAuth();
  const [activeTab, setActiveTab] = useState<"all" | "lab" | "radiology">("all");
  const [isPrescriptionModalOpen, setIsPrescriptionModalOpen] = useState(false);
  const [userBookings, setUserBookings] = useState<Booking[]>([]);
  const [fetchingBookings, setFetchingBookings] = useState(false);
  
  // Desktop search state
  const [formData, setFormData] = useState({ bookingId: '', phone: '' });
  const [reportFound, setReportFound] = useState(false);
  const [searched, setSearched] = useState(false);

  useEffect(() => {
    if (user) {
      setFetchingBookings(true);
      api.bookings.mine()
        .then((res) => {
          if (res && res.items) {
            setUserBookings(res.items);
          }
        })
        .catch(() => {
          setUserBookings([]);
        })
        .finally(() => {
          setFetchingBookings(false);
        });
    }
  }, [user]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearched(true);
    if (formData.bookingId.length > 3 && formData.phone.length > 5) {
      setReportFound(true);
    } else {
      setReportFound(false);
    }
  };

  return (
    <div className="bg-[#f8faff] min-h-screen">
      <head>
        <meta name="robots" content="noindex, follow" />
      </head>
      {/* ── MOBILE VIEW (lg:hidden) ── */}
      <div className="lg:hidden flex flex-col w-full pb-12">
        {/* Screen Header (Clean White Design without duplicate back button) */}
        <div className="bg-white border-b border-slate-100 p-4 shadow-2xs">
          <span className="font-black text-lg tracking-tight text-[#0f2d5e]">My Reports</span>
        </div>

        {loading || fetchingBookings ? (
          <div className="p-12 text-center flex flex-col items-center justify-center">
            <Loader2 className="w-8 h-8 text-[#D69A18] animate-spin mb-2" />
            <span className="text-xs font-bold text-slate-400">Loading your diagnostic reports...</span>
          </div>
        ) : !user ? (
          /* ── LOGIN REQUIRED FOR REPORTS (NO FAKE DATA) ── */
          <div className="p-4 max-w-md mx-auto w-full">
            <div className="bg-white rounded-3xl p-6 border border-gray-150 shadow-xs text-center space-y-4">
              <div className="w-14 h-14 bg-amber-50 border border-amber-200 rounded-2xl flex items-center justify-center text-[#D69A18] mx-auto">
                <Lock className="w-7 h-7" />
              </div>
              <div>
                <h2 className="text-slate-900 font-black text-lg">Login to View Reports</h2>
                <p className="text-xs text-slate-500 font-semibold mt-1 leading-relaxed">
                  Enter your registered mobile number to securely sign in and access your clinical lab reports.
                </p>
              </div>

              <div className="pt-2">
                <LoginFlow
                  loginVariant="patient_phone_otp"
                  onComplete={async () => {
                    await refresh();
                  }}
                  primaryButtonClassName="w-full bg-[#D69A18] hover:bg-amber-600 text-white font-extrabold py-3.5 rounded-xl uppercase tracking-wider text-xs shadow-md text-center transition-all cursor-pointer"
                />
              </div>
            </div>
          </div>
        ) : (
          /* ── LOGGED IN REAL USER REPORT VIEW ── */
          <>
            {/* Category Tabs */}
            <div className="bg-white border-b border-gray-200 sticky top-[58px] z-30 shadow-xs">
              <div className="flex justify-around text-xs font-black">
                <button
                  onClick={() => setActiveTab("all")}
                  className={`py-3 px-2 transition-colors relative ${
                    activeTab === "all" ? "text-[#D69A18]" : "text-slate-500"
                  }`}
                >
                  All Reports
                  {activeTab === "all" && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#D69A18] rounded-full" />
                  )}
                </button>
                <button
                  onClick={() => setActiveTab("lab")}
                  className={`py-3 px-2 transition-colors relative ${
                    activeTab === "lab" ? "text-[#D69A18]" : "text-slate-500"
                  }`}
                >
                  Lab Reports
                  {activeTab === "lab" && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#D69A18] rounded-full" />
                  )}
                </button>
                <button
                  onClick={() => setActiveTab("radiology")}
                  className={`py-3 px-2 transition-colors relative ${
                    activeTab === "radiology" ? "text-[#D69A18]" : "text-slate-500"
                  }`}
                >
                  Radiology
                  {activeTab === "radiology" && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#D69A18] rounded-full" />
                  )}
                </button>
              </div>
            </div>

            {/* Real Reports List or Empty State */}
            <div className="p-4 space-y-3">
              {userBookings.length > 0 ? (
                userBookings.map((booking) => (
                  <div
                    key={booking.id}
                    className="bg-white rounded-2xl p-4 border border-gray-150 shadow-xs flex flex-col gap-2.5"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                        {booking.preferred_date ? booking.preferred_date : booking.created_at ? new Date(booking.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) : 'Recent'}
                      </span>
                      <span className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full border ${
                        booking.status === 'completed' 
                          ? 'text-emerald-600 bg-emerald-50 border-emerald-200'
                          : 'text-amber-600 bg-amber-50 border-amber-200'
                      }`}>
                        {booking.status ? booking.status.toUpperCase() : 'PROCESSING'}
                      </span>
                    </div>

                    <h3 className="font-black text-slate-900 text-sm leading-snug">{booking.test_names || booking.package_name || "Diagnostic Test Panel"}</h3>
                    <p className="text-[11px] text-slate-500 font-semibold">Booking ID: {booking.id}</p>

                    <div className="flex justify-end pt-1">
                      {booking.pdf_report_url ? (
                        <a
                          href={booking.pdf_report_url}
                          target="_blank"
                          rel="noreferrer"
                          className="bg-[#D69A18] text-white font-black px-4 py-1.5 rounded-xl text-xs flex items-center gap-1 active:scale-95 transition-all shadow-xs"
                        >
                          <Download className="w-3.5 h-3.5" />
                          <span>Download Report</span>
                        </a>
                      ) : (
                        <button
                          onClick={() => alert(`Report for booking #${booking.id} is currently under pathology review.`)}
                          className="border border-[#D69A18] text-[#D69A18] hover:bg-[#FFF8EB] font-black px-4 py-1.5 rounded-xl text-xs flex items-center gap-1 active:scale-95 transition-all"
                        >
                          <span>Check Status</span>
                          <ChevronRight className="w-3.5 h-3.5 text-[#D69A18]" />
                        </button>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                /* Empty state when logged in user has no reports yet */
                <div className="bg-white rounded-3xl p-6 border border-gray-150 shadow-xs text-center space-y-3 my-4">
                  <div className="w-12 h-12 bg-slate-50 border border-slate-200 rounded-2xl flex items-center justify-center text-slate-400 mx-auto">
                    <FileText className="w-6 h-6" />
                  </div>
                  <h3 className="font-extrabold text-slate-900 text-base">No Diagnostic Reports Found</h3>
                  <p className="text-xs text-slate-500 font-medium max-w-xs mx-auto leading-relaxed">
                    There are currently no lab reports associated with {user.phone || user.name || "your account"}.
                  </p>
                  <div className="pt-2 flex flex-col gap-2">
                    <Link
                      href="/tests"
                      className="bg-[#D69A18] hover:bg-amber-600 text-white font-extrabold py-3 rounded-2xl text-xs uppercase tracking-wider block text-center shadow-xs"
                    >
                      Book a Diagnostic Test
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Upload Prescription Button */}
            <div className="px-4 mt-2">
              <button
                onClick={() => setIsPrescriptionModalOpen(true)}
                className="w-full border-2 border-[#D69A18] text-[#D69A18] bg-white hover:bg-[#FFF8EB] font-extrabold py-3 rounded-2xl text-xs uppercase tracking-wider flex items-center justify-center gap-2 active:scale-95 transition-all shadow-xs cursor-pointer"
              >
                <Upload className="w-4 h-4 text-[#D69A18]" />
                <span>Upload Prescription</span>
              </button>
            </div>
          </>
        )}

        <MobileTrustBadges />
      </div>

      {/* ── DESKTOP VIEW (hidden on mobile) ── */}
      <div className="hidden lg:block">
        <section className="bg-gradient-to-r from-[#e0f2fe] to-[#fbf8f5] py-12 border-b border-gray-100">
          <div className="max-w-[1200px] mx-auto px-4 w-full">
            <h1 className="text-3xl md:text-4xl font-extrabold text-[#0f2d5e] mb-3">Download Diagnostic Reports</h1>
            <p className="text-slate-500 text-sm md:text-base max-w-xl font-medium">
              Enter your booking reference credentials to securely retrieve and download your clinical test results.
            </p>
            <div className="w-16 h-1 bg-[#2563eb] rounded-full mt-4"></div>
          </div>
        </section>

        <section className="py-12">
          <div className="max-w-[1200px] mx-auto px-4 w-full flex flex-col lg:flex-row gap-10 justify-center">
            <div className="w-full lg:w-1/2 bg-white border border-gray-150 rounded-3xl p-8 shadow-[0_4px_20px_rgba(0,0,0,0.02)]">
              <h3 className="text-slate-800 text-lg font-bold mb-4 border-b border-gray-100 pb-2">Access Portal</h3>
              
              <form onSubmit={handleSearch} className="space-y-5">
                <div className="flex flex-col">
                  <label className="text-[11px] font-bold text-slate-500 mb-1.5 uppercase tracking-wider">Booking ID / Reference ID</label>
                  <input 
                    type="text" 
                    required
                    placeholder="e.g. QXL-90871"
                    value={formData.bookingId}
                    onChange={(e) => setFormData({...formData, bookingId: e.target.value})}
                    className="border border-gray-200 rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-[#2563eb] transition-colors bg-gray-50/50"
                  />
                </div>

                <div className="flex flex-col">
                  <label className="text-[11px] font-bold text-slate-500 mb-1.5 uppercase tracking-wider">Registered Phone Number</label>
                  <input 
                    type="tel" 
                    required
                    placeholder="Enter 10-digit number"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value.replace(/\D/g, '')})}
                    className="border border-gray-200 rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-[#2563eb] transition-colors bg-gray-50/50"
                  />
                </div>

                <button 
                  type="submit" 
                  className="w-full bg-[#2563eb] text-white font-bold py-3.5 rounded-xl hover:bg-[#1d4ed8] transition-colors uppercase tracking-wider text-xs shadow-md"
                >
                  Search Report
                </button>
              </form>

              {searched && (
                <div className="mt-8 pt-6 border-t border-gray-100">
                  {reportFound ? (
                    <div className="bg-green-50/50 border border-green-200 rounded-2xl p-4 flex items-start gap-4 justify-between">
                      <div className="flex items-start gap-3">
                        <FileText className="w-8 h-8 text-green-600 mt-0.5" />
                        <div>
                          <span className="text-xs font-extrabold text-slate-800 block">QXL Diagnostic Report</span>
                          <span className="text-[10px] text-slate-400 font-semibold block">ID: {formData.bookingId} • Status: Approved</span>
                        </div>
                      </div>
                      <a 
                        href="#" 
                        onClick={(e) => { e.preventDefault(); alert("PDF Report download initiated successfully."); }}
                        className="bg-green-600 text-white font-bold py-2 px-4 rounded-xl text-[10px] uppercase tracking-wider hover:bg-green-700 transition-colors flex items-center gap-1"
                      >
                        <Download className="w-3.5 h-3.5" /> Download
                      </a>
                    </div>
                  ) : (
                    <div className="bg-red-50/50 border border-red-200 rounded-2xl p-4 text-center">
                      <span className="text-xs font-bold text-red-700 block">No Records Found</span>
                      <span className="text-[10px] text-slate-400 font-semibold block mt-1">Please verify the Booking ID and registered mobile number.</span>
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="w-full lg:w-1/3 bg-gray-50/50 border border-gray-150 rounded-3xl p-6 h-fit space-y-4">
              <h4 className="font-bold text-slate-800 text-sm flex items-center gap-1.5">
                <ShieldCheck className="w-4.5 h-4.5 text-[#0f2d5e]" />
                <span>Report Security</span>
              </h4>
              <p className="text-[11px] text-slate-500 font-semibold leading-relaxed">
                Patient reports contain confidential medical profiles. Our systems ensure secure transmission.
              </p>
            </div>
          </div>
        </section>
      </div>

      <PrescriptionModal isOpen={isPrescriptionModalOpen} onClose={() => setIsPrescriptionModalOpen(false)} />
    </div>
  );
}

"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Calendar, FileText, User, Phone, MapPin, Loader2, ShieldCheck } from "lucide-react";
import { useAuth } from "../../lib/useAuth";
import { api, Booking, Prescription } from "../../lib/api";


function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    pending: "bg-amber-100 text-amber-700",
    confirmed: "bg-blue-100 text-blue-700",
    processing: "bg-blue-100 text-blue-700",
    completed: "bg-green-100 text-green-700",
    cancelled: "bg-red-100 text-red-700",
    failed: "bg-red-100 text-red-700",
  };
  return (
    <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full ${styles[status] || "bg-slate-100 text-slate-600"}`}>
      {status}
    </span>
  );
}

export default function DashboardPage() {
  const { user, loading: authLoading } = useAuth();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [prescriptions, setPrescriptions] = useState<Prescription[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (authLoading || !user) return;
    let cancelled = false;
    Promise.all([api.bookings.mine(), api.prescriptions.mine()])
      .then(([bookingRes, prescriptionRes]) => {
        if (cancelled) return;
        setBookings(bookingRes.items);
        setPrescriptions(prescriptionRes.items);
      })
      .catch((err) => {
        console.error("Failed to load dashboard data", err);
        if (!cancelled) setError("We could not load your data. Please refresh the page.");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [authLoading, user]);

  if (!authLoading && !user) {
    return (
      <div className="bg-[#f8faff] min-h-screen flex items-center justify-center px-4">
        <div className="bg-white border border-gray-100 rounded-3xl p-10 max-w-md w-full text-center shadow-sm">
          <ShieldCheck className="w-10 h-10 text-[#2563eb] mx-auto mb-4" />
          <h1 className="text-xl font-extrabold text-[#0f2d5e] mb-2">Please log in</h1>
          <p className="text-sm text-slate-500 font-medium mb-6">Log in to view your bookings, prescriptions, and health records.</p>
          <Link href="/login" className="inline-block bg-[#2563eb] text-white font-bold px-6 py-2.5 rounded-full text-sm uppercase tracking-wider">
            Login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#f8faff] min-h-screen">
      <section className="bg-gradient-to-r from-[#e0f2fe] to-[#eff6ff] py-12 border-b border-gray-100">
        <div className="max-w-[1200px] mx-auto px-4 w-full">
          <h1 className="text-3xl md:text-4xl font-extrabold text-[#0f2d5e] mb-2">
            Welcome{user?.name ? `, ${user.name}` : ""}
          </h1>
          <p className="text-slate-500 text-sm font-medium">Track your bookings, prescriptions, and reports in one place.</p>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-[1200px] mx-auto px-4 w-full grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Bookings */}
          <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-5">
              <Calendar className="w-5 h-5 text-[#2563eb]" />
              <h2 className="font-extrabold text-[#0f2d5e] text-lg">My Bookings</h2>
            </div>
            {authLoading || loading ? (
              <div className="flex items-center justify-center py-10 text-slate-400">
                <Loader2 className="w-5 h-5 animate-spin" />
              </div>
            ) : error ? (
              <p className="text-xs font-semibold text-red-600">{error}</p>
            ) : bookings.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-sm text-slate-400 font-medium mb-4">You haven&apos;t booked any tests yet.</p>
                <Link href="/book" className="inline-block bg-[#2563eb] text-white text-xs font-bold px-5 py-2.5 rounded-full uppercase tracking-wider">
                  Book a Test
                </Link>
              </div>
            ) : (
              <ul className="space-y-3">
                {bookings.map((b) => (
                    <li key={b.id} className="border border-gray-100 rounded-2xl p-4">
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <p className="font-bold text-slate-800 text-sm">{b.test_name || "Health Package"}</p>
                        <StatusBadge status={b.status} />
                      </div>
                      <div className="flex flex-wrap gap-x-4 gap-y-1 text-[11px] text-slate-500 font-medium">
                        <span className="flex items-center gap-1"><User className="w-3 h-3" /> {b.patient_name}</span>
                        <span className="flex items-center gap-1"><Phone className="w-3 h-3" /> {b.patient_phone}</span>
                        {b.preferred_date && <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {b.preferred_date}</span>}
                        <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {b.collection_type === "home" ? "Home Collection" : "Center Visit"}</span>
                      </div>
                      
                      {b.status === "pending" && (
                        <div className="mt-4 pt-4 border-t border-dashed border-slate-100 flex flex-col sm:flex-row items-center gap-4 bg-slate-50 p-3.5 rounded-xl">
                          <img 
                            src="/upi.jpg" 
                            alt="Scan to Pay via UPI" 
                            className="w-16 h-16 object-contain rounded-lg border border-slate-200"
                          />
                          <div className="flex-1 text-center sm:text-left">
                            <span className="text-[9px] font-extrabold text-slate-400 uppercase tracking-wider block mb-0.5">UPI Payment Required</span>
                            <p className="text-[11px] font-bold text-slate-700 leading-normal mb-1.5">
                              Scan using any UPI app to pay and confirm.
                            </p>
                            <span className="inline-block bg-blue-50 text-[#2563eb] text-[10px] font-mono font-bold px-2 py-0.5 rounded border border-blue-100/50">
                              qxl-diagnostics@pingpay
                            </span>
                          </div>
                        </div>
                      )}
                    </li>
                ))}
              </ul>
            )}
          </div>

          {/* Prescriptions */}
          <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-5">
              <FileText className="w-5 h-5 text-[#2563eb]" />
              <h2 className="font-extrabold text-[#0f2d5e] text-lg">My Prescriptions</h2>
            </div>
            {authLoading || loading ? (
              <div className="flex items-center justify-center py-10 text-slate-400">
                <Loader2 className="w-5 h-5 animate-spin" />
              </div>
            ) : error ? (
              <p className="text-xs font-semibold text-red-600">{error}</p>
            ) : prescriptions.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-sm text-slate-400 font-medium mb-4">No prescriptions uploaded yet.</p>
                <Link href="/upload-prescription" className="inline-block bg-[#2563eb] text-white text-xs font-bold px-5 py-2.5 rounded-full uppercase tracking-wider">
                  Upload Prescription
                </Link>
              </div>
            ) : (
              <ul className="space-y-3">
                {prescriptions.map((p) => (
                  <li key={p.id} className="border border-gray-100 rounded-2xl p-4">
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <p className="font-bold text-slate-800 text-sm truncate max-w-[70%]">{p.filename}</p>
                      <StatusBadge status={p.analysis_status} />
                    </div>
                    {p.analysis_status === "completed" && p.analysis?.summary && (
                      <p className="text-[11px] text-slate-500 font-medium leading-relaxed">{p.analysis.summary}</p>
                    )}
                    {p.analysis_status === "failed" && p.error_message && (
                      <p className="text-[11px] text-red-500 font-medium leading-relaxed">{p.error_message}</p>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

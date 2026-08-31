"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import { api, ApiError } from "@/lib/api";
import { useAuth } from "@/lib/useAuth";
import { ArrowLeft } from "lucide-react";
import LoginFlow from "@/components/auth/LoginFlow";
import ProfileForm from "@/components/ProfileForm";

export default function LoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginPageInner />
    </Suspense>
  );
}

function LoginPageInner() {
  const { user, loading, refresh } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loggingOut, setLoggingOut] = useState(false);

  const returnTo = searchParams.get("return_to") || searchParams.get("redirect") || "/";
  const profileReturnTo = `/profile?first_login=1&return_to=${encodeURIComponent(returnTo)}`;

  async function handleLogout() {
    setLoggingOut(true);
    try {
      await api.auth.logout();
    } catch (err) {
      if (!(err instanceof ApiError)) throw err;
    } finally {
      await refresh();
      setLoggingOut(false);
    }
  }

  return (
    <div className="bg-gradient-to-b from-[#f0f9ff] via-[#f8faff] to-white min-h-[85vh] flex flex-col items-center justify-center px-4 py-8 sm:py-16 selection:bg-teal-100 selection:text-teal-900">
      <head>
        <meta name="robots" content="noindex, follow" />
      </head>
      <div className="w-full max-w-md">
        
        {/* Main Card Container */}
        <div className="w-full bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-8 shadow-xl shadow-sky-900/5 relative overflow-hidden">
          
          {/* Top Brand & NABL Badge Header */}
          <div className="text-center mb-6 space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-[#00A8A8] text-[10.5px] font-extrabold uppercase tracking-wider">
              <span>NABL certified lab (MC-6849)</span>
            </div>
            
            <h1 className="text-2xl sm:text-3xl font-black text-[#0f2d5e] tracking-tight">
              Patient Portal Login
            </h1>
            
            <p className="text-slate-500 text-xs font-semibold leading-relaxed max-w-xs mx-auto">
              Access your digital lab reports, track sample collection, & manage your health bookings.
            </p>
          </div>

          {loading ? (
            <div className="py-12 text-center text-sm font-semibold text-slate-400 flex flex-col items-center gap-2">
              <div className="w-6 h-6 border-2 border-[#0A5DAA] border-t-transparent rounded-full animate-spin" />
              <span>Verifying secure session…</span>
            </div>
          ) : !user ? (
            <LoginFlow
              onComplete={(signedInUser) => {
                router.push(signedInUser?.name ? returnTo : profileReturnTo);
              }}
              loginVariant="patient_phone_otp"
            />
          ) : (
            <div className="space-y-4">
              <div className="bg-sky-50/80 border border-sky-200/60 rounded-2xl p-4 text-sm text-left">
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-0.5">Signed In As</p>
                <p className="font-extrabold text-[#0f2d5e] text-base">
                  {user.name || user.phone || "QXL Patient"}
                </p>
              </div>

              <ProfileForm firstLogin={!user.name} />

              <button
                onClick={handleLogout}
                disabled={loggingOut}
                className="w-full py-3.5 px-6 bg-gradient-to-r from-[#0A5DAA] to-[#00A8A8] hover:from-[#084b8a] hover:to-[#008f8f] text-white font-extrabold rounded-2xl shadow-lg transition-all uppercase tracking-wider text-xs flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                <span>{loggingOut ? "Logging Out..." : "Sign Out"}</span>
              </button>
            </div>
          )}

          {/* Footer Assistance & Privacy */}
          <div className="mt-6 pt-5 border-t border-slate-100 space-y-3">
            <div className="bg-[#FFF8EB] border border-[#F3DBA7] rounded-2xl p-3.5 text-left flex items-start gap-2.5 text-xs text-slate-700 font-medium">
              <span className="text-base leading-none">📞</span>
              <div>
                <span className="font-extrabold text-[#D69A18] block mb-0.5">Senior Citizen &amp; Patient Assistance</span>
                <span className="text-slate-600">Need help with login or PDF reports? Call <a href="tel:+919964639639" className="text-[#0A5DAA] font-extrabold hover:underline">+91 9964 639 639</a> — reports can be sent directly via WhatsApp.</span>
              </div>
            </div>

            <p className="text-[10.5px] text-slate-400 font-semibold leading-relaxed text-center">
              🔒 100% Safe &amp; Secure • No password needed. Instant SMS / WhatsApp OTP authentication.
            </p>
          </div>

        </div>

      </div>
    </div>
  );
}

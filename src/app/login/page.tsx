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
    <div className="bg-[#f8faff] min-h-[85vh] flex flex-col items-center justify-center px-4 py-6 sm:py-12">
      <head>
        <meta name="robots" content="noindex, follow" />
      </head>
      <div className="w-full max-w-md">
        
        {/* White Form Container */}
        <div className="w-full bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm">
          <div className="text-center mb-5">
            <h2 className="text-[#0f2d5e] text-xl font-black mb-1">Patient Portal</h2>
            <p className="text-slate-500 text-xs font-semibold">
              Secure sign in with phone number + 8-digit OTP
            </p>
          </div>

          {loading ? (
            <div className="py-6 text-center text-sm text-slate-400">Checking session…</div>
          ) : !user ? (
            <LoginFlow
              onComplete={(signedInUser) => {
                router.push(signedInUser?.name ? returnTo : profileReturnTo);
              }}
              loginVariant="patient_phone_otp"
            />
          ) : (
            <div className="space-y-4">
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-sm">
                <p className="font-semibold text-slate-700">
                  Logged in as: {user.name || user.phone || "QXL patient"}
                </p>
              </div>
              <ProfileForm firstLogin={!user.name} />
              <button
                onClick={handleLogout}
                disabled={loggingOut}
                className="block w-full bg-[#D69A18] hover:bg-[#b88313] !text-white font-black py-3.5 rounded-xl transition-colors uppercase tracking-wider text-xs shadow-md text-center disabled:opacity-50"
                style={{ color: '#ffffff' }}
              >
                <span className="!text-white font-black" style={{ color: '#ffffff' }}>
                  {loggingOut ? "Logging out…" : "Log Out"}
                </span>
              </button>
            </div>
          )}

          <div className="mt-6 pt-4 border-t border-gray-100 text-center">
            <p className="text-[10px] text-slate-400 font-semibold leading-relaxed">
              By signing in, you agree to QXL's Terms of Use and Privacy Policy.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}

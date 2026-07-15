"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import { api, ApiError } from "@/lib/api";
import { useAuth } from "@/lib/useAuth";
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

  const returnTo = searchParams.get("return_to") || "/";
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
    <div className="bg-[#f8faff] min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-140 bg-white border border-gray-150 rounded-3xl p-8 shadow-[0_4px_25px_rgba(0,0,0,0.02)]">
        <div className="text-center mb-6">
          <img
            src="https://res.cloudinary.com/btjglif5/image/upload/v1784150021/Assets-QXL/legacy-assets/image/Logo_1.png"
            alt="QXL Diagnostics Logo"
            className="h-12 mx-auto mb-4 object-contain"
          />
          <h2 className="text-[#0f2d5e] text-xl font-bold mb-1">Patient Portal</h2>
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
              className="block w-full bg-[#0f2d5e] text-white font-bold py-3.5 rounded-xl hover:bg-[#0c254c] transition-colors uppercase tracking-wider text-xs shadow-md text-center disabled:opacity-50"
            >
              {loggingOut ? "Logging out…" : "Log Out"}
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
  );
}

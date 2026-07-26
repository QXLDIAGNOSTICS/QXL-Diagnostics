"use client";

import { ShieldCheck } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import LoginFlow from "@/components/auth/LoginFlow";
import { useAuth } from "@/lib/useAuth";
import { isAdmin, isStaff } from "@/lib/roles";

const inputClass =
  "w-full border border-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/40 focus:border-sky-500";
const buttonClass =
  "block w-full text-center py-3.5 bg-sky-600 hover:bg-sky-700 text-white font-bold rounded-xl shadow-lg shadow-sky-600/30 transition-all active:scale-[0.98] text-sm disabled:opacity-50 disabled:cursor-not-allowed";

export default function AdminLogin() {
  const router = useRouter();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (loading) return;
    if (!isStaff(user)) return;
    router.replace(isAdmin(user) ? "/" : "/appointments");
  }, [loading, user, router]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white dark:bg-gray-900 rounded-3xl shadow-xl overflow-hidden border border-gray-100 dark:border-gray-800">
        <div className="bg-sky-600 p-8 text-center">
          <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4 backdrop-blur-sm">
            <ShieldCheck className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-white">QXL Staff Login</h2>
          <p className="text-sky-100 mt-1 text-sm">
            Administrators &amp; Front Office — appointments and management panel
          </p>
        </div>

        <div className="p-8 space-y-4">
          {isStaff(user) ? (
            <div className="text-sm text-gray-500 dark:text-gray-400 text-center space-y-3">
              <p>You&apos;re signed in. Continuing…</p>
            </div>
          ) : (
            <>
              <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
                Sign in with your staff account (email/phone + password), then verify with a
                one-time code sent to you. Super Admin accounts will additionally be asked for
                the secret key.
              </p>
              <LoginFlow
                loginVariant="password_otp"
                onComplete={(u) => router.push(u && isAdmin(u) ? "/" : "/appointments")}
                inputClassName={inputClass}
                primaryButtonClassName={buttonClass}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}

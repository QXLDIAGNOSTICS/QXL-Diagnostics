"use client";

import { ShieldCheck } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import LoginFlow from "@/components/auth/LoginFlow";
import { useAuth } from "@/lib/useAuth";

const inputClass =
  "w-full border border-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/40 focus:border-teal-500";
const buttonClass =
  "block w-full text-center py-3.5 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-xl shadow-lg shadow-teal-600/30 transition-all active:scale-[0.98] text-sm disabled:opacity-50 disabled:cursor-not-allowed";

export default function AdminLogin() {
  const router = useRouter();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (loading) return;
    if (user?.role === "admin") {
      router.replace("/admin");
    }
  }, [loading, user, router]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white dark:bg-gray-900 rounded-3xl shadow-xl overflow-hidden border border-gray-100 dark:border-gray-800">
        <div className="bg-teal-600 p-8 text-center">
          <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4 backdrop-blur-sm">
            <ShieldCheck className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-white">Admin Secure Login</h2>
          <p className="text-teal-100 mt-1 text-sm">Access the QXL Diagnostics management dashboard</p>
        </div>

        <div className="p-8 space-y-4">
          {user?.role === "admin" ? (
            <div className="text-sm text-gray-500 dark:text-gray-400 text-center space-y-3">
              <p>You're signed in as an admin. Continuing to the dashboard…</p>
            </div>
          ) : (
            <>
              <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
                Sign in with your admin account (password + email code + SMS link). A separate
                secret key will be required once inside before any admin action is allowed.
              </p>
              <LoginFlow
                allowRegister={false}
                onComplete={() => router.push("/admin")}
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


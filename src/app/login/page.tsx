"use client";

import { useAuth } from "@/lib/useAuth";

export default function LoginPage() {
  const { user, loading } = useAuth();

  return (
    <div className="bg-[#f8faff] min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-140 bg-white border border-gray-150 rounded-3xl p-8 shadow-[0_4px_25px_rgba(0,0,0,0.02)]">
        <div className="text-center mb-6">
          <img
            src="/image/Logo (1).png"
            alt="QXL Diagnostics Logo"
            className="h-12 mx-auto mb-4 object-contain"
          />
          <h2 className="text-[#0f2d5e] text-xl font-bold mb-1">Patient Portal</h2>
          <p className="text-slate-500 text-xs font-semibold">
            Secure sign in powered by Auth0
          </p>
        </div>

        {loading ? (
          <div className="py-6 text-center text-sm text-slate-400">Checking session…</div>
        ) : !user ? (
          <div className="space-y-3">
            <a
              href="/api/v1/auth/login?return_to=/login"
              className="block w-full bg-[#2563eb] text-white font-bold py-3.5 rounded-xl hover:bg-[#1d4ed8] transition-colors uppercase tracking-wider text-xs shadow-md text-center"
            >
              Log In
            </a>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-sm">
              <p className="font-semibold text-slate-700">
                Logged in as: {user.email || user.name || "Authenticated user"}
              </p>
            </div>
            <a
              href="/api/v1/auth/logout"
              className="block w-full bg-[#0f2d5e] text-white font-bold py-3.5 rounded-xl hover:bg-[#0c254c] transition-colors uppercase tracking-wider text-xs shadow-md text-center"
            >
              Log Out
            </a>
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

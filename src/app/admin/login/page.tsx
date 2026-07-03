"use client";

import { ShieldCheck } from "lucide-react";

export default function AdminLogin() {
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
          <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
            Admin access is verified through Auth0 and your account&apos;s role in our system.
            Sign in with your admin account to continue.
          </p>
          <a
            href="/api/v1/auth/login?return_to=/admin"
            className="block w-full text-center py-3.5 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-xl shadow-lg shadow-teal-600/30 transition-all active:scale-[0.98] text-sm"
          >
            Sign In to Dashboard
          </a>
        </div>
      </div>
    </div>
  );
}

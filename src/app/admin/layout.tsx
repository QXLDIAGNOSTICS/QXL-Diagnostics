"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { KeyRound } from "lucide-react";
import AdminSidebar from "@/components/admin/Sidebar";
import AdminHeader from "@/components/admin/Header";
import { useAuth } from "@/lib/useAuth";
import { api, ApiError } from "@/lib/api";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const isLoginPage = pathname === "/admin/login";
  const { user, loading } = useAuth();
  const [checked, setChecked] = useState(false);
  const [elevated, setElevated] = useState(false);
  const [elevationChecked, setElevationChecked] = useState(false);
  const [secretKey, setSecretKey] = useState("");
  const [elevating, setElevating] = useState(false);
  const [elevateError, setElevateError] = useState<string | null>(null);

  useEffect(() => {
    if (loading) return;
    const isAdmin = user?.role === "admin";
    if (!isAdmin && !isLoginPage) {
      router.push("/admin/login");
    }
    setChecked(true);
  }, [loading, user, isLoginPage, router]);

  useEffect(() => {
    if (loading || isLoginPage || user?.role !== "admin") return;
    let cancelled = false;
    api.auth
      .adminElevationStatus()
      .then((status) => {
        if (!cancelled) setElevated(status.elevated);
      })
      .catch(() => {
        if (!cancelled) setElevated(false);
      })
      .finally(() => {
        if (!cancelled) setElevationChecked(true);
      });
    return () => {
      cancelled = true;
    };
  }, [loading, isLoginPage, user]);

  async function handleElevate(e: React.FormEvent) {
    e.preventDefault();
    setElevateError(null);
    setElevating(true);
    try {
      const status = await api.auth.adminElevate(secretKey);
      setElevated(status.elevated);
      setSecretKey("");
    } catch (err) {
      setElevateError(err instanceof ApiError ? err.message : "Verification failed");
    } finally {
      setElevating(false);
    }
  }

  if (isLoginPage) {
    return <>{children}</>;
  }

  if (loading || !checked || user?.role !== "admin" || !elevationChecked) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-teal-600"></div>
      </div>
    );
  }

  if (!elevated) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white dark:bg-gray-900 rounded-3xl shadow-xl overflow-hidden border border-gray-100 dark:border-gray-800">
          <div className="bg-teal-600 p-8 text-center">
            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4 backdrop-blur-sm">
              <KeyRound className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-xl font-bold text-white">Additional Verification Required</h2>
            <p className="text-teal-100 mt-1 text-sm">
              Enter the admin secret key to unlock dashboard actions
            </p>
          </div>
          <form onSubmit={handleElevate} className="p-8 space-y-4">
            <input
              type="password"
              value={secretKey}
              onChange={(e) => setSecretKey(e.target.value)}
              placeholder="Secret key"
              autoComplete="off"
              className="w-full border border-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/40 focus:border-teal-500"
              required
            />
            {elevateError && <p className="text-xs text-red-600">{elevateError}</p>}
            <button
              type="submit"
              disabled={elevating}
              className="block w-full text-center py-3.5 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-xl shadow-lg shadow-teal-600/30 transition-all active:scale-[0.98] text-sm disabled:opacity-50"
            >
              {elevating ? "Verifying…" : "Unlock"}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-950 font-sans">
      <AdminSidebar />
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <AdminHeader />
        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8 custom-scrollbar">
          {children}
        </main>
      </div>
    </div>
  );
}


"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import { Calendar, FileText, Loader2, LogOut, ShieldCheck } from "lucide-react";
import ProfileForm from "@/components/ProfileForm";
import { api, ApiError } from "@/lib/api";
import { useAuth } from "@/lib/useAuth";

export default function ProfilePage() {
  return (
    <Suspense fallback={null}>
      <ProfilePageInner />
    </Suspense>
  );
}

function ProfilePageInner() {
  const { user, loading, refresh } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const firstLogin = searchParams.get("first_login") === "1" || Boolean(user && !user.name);
  const returnTo = searchParams.get("return_to") || "/";
  const [loggingOut, setLoggingOut] = useState(false);

  async function handleLogout() {
    setLoggingOut(true);
    try {
      await api.auth.logout();
    } catch (err) {
      if (!(err instanceof ApiError)) throw err;
    } finally {
      await refresh();
      setLoggingOut(false);
      router.push("/");
    }
  }

  if (loading) {
    return (
      <div className="bg-[#f8faff] min-h-[80vh] flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-[#2563eb] animate-spin" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="bg-[#f8faff] min-h-[80vh] flex items-center justify-center px-4">
        <div className="bg-white border border-gray-100 rounded-3xl p-10 max-w-md w-full text-center shadow-sm">
          <ShieldCheck className="w-10 h-10 text-[#2563eb] mx-auto mb-4" />
          <h1 className="text-xl font-extrabold text-[#0f2d5e] mb-2">Please log in</h1>
          <p className="text-sm text-slate-500 font-medium mb-6">Log in to view and edit your profile.</p>
          <Link
            href={`/login?return_to=${encodeURIComponent("/profile")}`}
            className="inline-block bg-[#2563eb] text-white font-bold px-6 py-2.5 rounded-full text-sm uppercase tracking-wider"
          >
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
            {firstLogin ? "Complete Your Profile" : "My Profile"}
          </h1>
          <p className="text-slate-500 text-sm font-medium">
            Signed in as {user.name || user.phone || "QXL patient"}.
          </p>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-[1200px] mx-auto px-4 grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-white border border-gray-100 rounded-3xl p-6 md:p-8 shadow-sm">
            <ProfileForm
              firstLogin={firstLogin}
              onSaved={() => {
                if (firstLogin) router.push(returnTo);
              }}
            />
          </div>

          <aside className="space-y-5">
            <Link
              href="/dashboard"
              className="bg-white border border-gray-100 rounded-3xl p-5 shadow-sm flex items-center gap-3 hover:border-[#2563eb]/40 transition-colors"
            >
              <div className="w-10 h-10 rounded-full bg-[#dbeafe] flex items-center justify-center">
                <Calendar className="w-5 h-5 text-[#2563eb]" />
              </div>
              <div>
                <p className="font-extrabold text-sm text-[#0f2d5e]">Bookings</p>
                <p className="text-xs text-slate-500 font-semibold">View your test bookings</p>
              </div>
            </Link>

            <Link
              href="/upload-prescription"
              className="bg-white border border-gray-100 rounded-3xl p-5 shadow-sm flex items-center gap-3 hover:border-[#2563eb]/40 transition-colors"
            >
              <div className="w-10 h-10 rounded-full bg-[#dbeafe] flex items-center justify-center">
                <FileText className="w-5 h-5 text-[#2563eb]" />
              </div>
              <div>
                <p className="font-extrabold text-sm text-[#0f2d5e]">Prescriptions</p>
                <p className="text-xs text-slate-500 font-semibold">Upload and review analysis</p>
              </div>
            </Link>

            <button
              type="button"
              onClick={handleLogout}
              disabled={loggingOut}
              className="w-full bg-white border border-red-100 text-red-600 rounded-3xl p-5 shadow-sm flex items-center gap-3 hover:bg-red-50 transition-colors disabled:opacity-60"
            >
              <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center">
                <LogOut className="w-5 h-5" />
              </div>
              <div className="text-left">
                <p className="font-extrabold text-sm">{loggingOut ? "Logging out..." : "Log Out"}</p>
                <p className="text-xs text-red-400 font-semibold">End this patient session</p>
              </div>
            </button>
          </aside>
        </div>
      </section>
    </div>
  );
}

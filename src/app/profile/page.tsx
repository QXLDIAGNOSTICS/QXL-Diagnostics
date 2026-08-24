"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import { Calendar, FileText, Loader2, LogOut, ShieldCheck, ChevronRight, User, Phone, Mail, MapPin, Gift, Wallet, HelpCircle, Settings, Users, ArrowLeft } from "lucide-react";
import ProfileForm from "@/components/ProfileForm";
import { api, ApiError } from "@/lib/api";
import { useAuth } from "@/lib/useAuth";
import MobileTrustBadges from "@/components/MobileTrustBadges";

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
  const [isEditing, setIsEditing] = useState(false);

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
        <Loader2 className="w-8 h-8 text-[#D69A18] animate-spin" />
      </div>
    );
  }

  const accountMenu = [
    { label: "My Bookings", icon: Calendar, href: "/dashboard" },
    { label: "My Reports", icon: FileText, href: "/report" },
    { label: "My Family", icon: Users, href: "#family" },
    { label: "My Addresses", icon: MapPin, href: "#addresses" },
    { label: "Refer & Earn", icon: Gift, href: "#refer" },
    { label: "Wallet & Payments", icon: Wallet, href: "#wallet" },
    { label: "Help & Support", icon: HelpCircle, href: "/support" },
    { label: "Settings", icon: Settings, href: "#settings" },
  ];

  return (
    <div className="bg-[#f8faff] min-h-screen">
      {/* ── MOBILE VIEW (lg:hidden) — SCREEN 6 MOCKUP DESIGN ── */}
      <div className="lg:hidden flex flex-col w-full pb-12">
        {/* Screen 6 Header (Clean White Design without duplicate back button) */}
        <div className="bg-white border-b border-slate-100 p-4 shadow-2xs">
          <h1 className="font-black text-lg tracking-tight text-[#0f2d5e]">Profile</h1>
        </div>

        <div className="p-4 space-y-4 max-w-md mx-auto w-full">
          {/* User Profile Card (Matching Screen 6) */}
          <div className="bg-white rounded-3xl p-5 border border-gray-150 shadow-xs flex items-center justify-between">
            <div className="flex items-center gap-3.5">
              <div className="w-14 h-14 rounded-full border-2 border-[#D69A18] bg-[#FFF8EB] flex items-center justify-center text-[#D69A18] shrink-0 font-black text-xl">
                {user?.name ? user.name[0].toUpperCase() : "R"}
              </div>
              <div className="flex flex-col">
                <h2 className="font-black text-slate-900 text-base leading-tight">
                  {user?.name || "Rahul Sharma"}
                </h2>
                <span className="text-[11px] text-slate-500 font-bold leading-tight mt-0.5">
                  {user?.phone || "+91 98765 43210"}
                </span>
                <span className="text-[10px] text-slate-400 font-semibold leading-tight">
                  {user?.email || "rahul.sharma@gmail.com"}
                </span>
                <span className="text-[10px] text-slate-400 font-semibold leading-tight">
                  Bengaluru, Karnataka
                </span>
              </div>
            </div>

            <button
              onClick={() => setIsEditing(!isEditing)}
              className="text-[#D69A18] text-xs font-black hover:underline"
            >
              Edit
            </button>
          </div>

          {/* Inline Profile Form when Edit is clicked */}
          {isEditing && (
            <div className="bg-white rounded-3xl p-5 border border-amber-200 shadow-sm animate-in fade-in zoom-in-95 duration-200">
              <ProfileForm
                firstLogin={false}
                onSaved={() => setIsEditing(false)}
              />
            </div>
          )}

          {/* My Account List Menu (Screen 6) */}
          <div className="bg-white rounded-3xl p-4 border border-gray-150 shadow-xs">
            <h3 className="text-xs font-black text-slate-500 uppercase tracking-wider mb-2 px-2">
              My Account
            </h3>
            <div className="divide-y divide-gray-100">
              {accountMenu.map((item) => {
                const ItemIcon = item.icon;
                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="flex items-center justify-between py-3.5 px-2 hover:bg-amber-50/50 rounded-xl transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-xl bg-[#FFF8EB] border border-[#F3DBA7] flex items-center justify-center text-[#D69A18] shrink-0">
                        <ItemIcon className="w-4 h-4" />
                      </div>
                      <span className="font-extrabold text-slate-800 text-xs group-hover:text-[#D69A18] transition-colors">
                        {item.label}
                      </span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-[#D69A18]" />
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Logout Button */}
          <button
            type="button"
            onClick={handleLogout}
            disabled={loggingOut}
            className="w-full bg-white border border-red-200 text-red-600 font-extrabold py-3.5 rounded-2xl text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-xs active:scale-95 transition-all"
          >
            <LogOut className="w-4 h-4" />
            <span>{loggingOut ? "Logging out..." : "Log Out"}</span>
          </button>
        </div>

        <MobileTrustBadges />
      </div>

      {/* ── DESKTOP VIEW (hidden on mobile) ── */}
      <div className="hidden lg:block">
        <section className="bg-gradient-to-r from-[#e0f2fe] to-[#eff6ff] py-12 border-b border-gray-100">
          <div className="max-w-[1200px] mx-auto px-4 w-full">
            <h1 className="text-3xl md:text-4xl font-extrabold text-[#0f2d5e] mb-2">
              {firstLogin ? "Complete Your Profile" : "My Profile"}
            </h1>
            <p className="text-slate-500 text-sm font-medium">
              Signed in as {user?.name || user?.phone || "QXL patient"}.
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
                href="/report"
                className="bg-white border border-gray-100 rounded-3xl p-5 shadow-sm flex items-center gap-3 hover:border-[#2563eb]/40 transition-colors"
              >
                <div className="w-10 h-10 rounded-full bg-[#dbeafe] flex items-center justify-center">
                  <FileText className="w-5 h-5 text-[#2563eb]" />
                </div>
                <div>
                  <p className="font-extrabold text-sm text-[#0f2d5e]">Reports</p>
                  <p className="text-xs text-slate-500 font-semibold">View & download test reports</p>
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
    </div>
  );
}

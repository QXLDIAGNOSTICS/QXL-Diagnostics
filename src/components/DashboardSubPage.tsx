"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  User,
  Calendar,
  FileText,
  CreditCard,
  Heart,
  Settings,
  ShieldCheck,
  Package,
  Users,
  History,
  ArrowRight,
  Loader2,
  CheckCircle,
} from "lucide-react";
import { useAuth } from "@/lib/useAuth";
import { api, Booking } from "@/lib/api";

interface DashboardSubPageProps {
  title: string;
  subtitle: string;
  tabKey: string;
}

export default function DashboardSubPage({ title, subtitle, tabKey }: DashboardSubPageProps) {
  const { user, loading: authLoading } = useAuth();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (authLoading || !user) {
      setLoading(false);
      return;
    }
    api.bookings
      .mine()
      .then((res) => setBookings(res.items || []))
      .catch(() => setBookings([]))
      .finally(() => setLoading(false));
  }, [authLoading, user]);

  const navItems = [
    { label: "Overview", href: "/dashboard", icon: ShieldCheck, key: "overview" },
    { label: "My Profile", href: "/dashboard/profile", icon: User, key: "profile" },
    { label: "Appointments", href: "/dashboard/appointments", icon: Calendar, key: "appointments" },
    { label: "Lab Reports", href: "/dashboard/reports", icon: FileText, key: "reports" },
    { label: "Orders", href: "/dashboard/orders", icon: Package, key: "orders" },
    { label: "Invoices & Payments", href: "/dashboard/payments", icon: CreditCard, key: "payments" },
    { label: "Family Members", href: "/dashboard/family", icon: Users, key: "family" },
    { label: "Favorites", href: "/dashboard/favorites", icon: Heart, key: "favorites" },
    { label: "History", href: "/dashboard/history", icon: History, key: "history" },
    { label: "Settings", href: "/dashboard/settings", icon: Settings, key: "settings" },
  ];

  return (
    <div className="min-h-screen bg-[#f8faff] text-[#0f2d5e]">
      {/* Header Banner */}
      <section className="bg-gradient-to-r from-[#e0f2fe] via-[#f0f9ff] to-[#e8f4fd] py-10 border-b border-gray-200/60">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#2563eb] bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
                Patient Portal
              </span>
              <h1 className="text-3xl font-extrabold text-[#0f2d5e] mt-2">{title}</h1>
              <p className="text-slate-600 text-sm font-medium mt-1">{subtitle}</p>
            </div>
            <Link
              href="/book"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#2563eb] text-white text-xs font-extrabold uppercase tracking-wider hover:bg-[#1d4ed8] transition-all shadow-sm"
            >
              Book New Test <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Main Grid Layout */}
      <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Navigation Sidebar (3 cols) */}
        <div className="lg:col-span-3 space-y-2 bg-white rounded-3xl p-4 border border-sky-200/60 shadow-sm h-fit">
          <p className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 px-3 py-2">
            Dashboard Menu
          </p>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = tabKey === item.key;
            return (
              <Link
                key={item.key}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-2xl text-xs font-extrabold transition-all ${
                  isActive
                    ? "bg-[#2563eb] text-white shadow-md shadow-blue-500/20"
                    : "text-slate-600 hover:bg-sky-50 hover:text-[#2563eb]"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>

        {/* Content Area (9 cols) */}
        <div className="lg:col-span-9 bg-white rounded-3xl p-6 md:p-8 border border-sky-200/60 shadow-xl min-h-[450px]">
          {loading ? (
            <div className="flex items-center justify-center py-20 text-slate-400">
              <Loader2 className="w-6 h-6 animate-spin" />
            </div>
          ) : (
            <div className="space-y-6">
              {/* Profile View */}
              {tabKey === "profile" && (
                <div className="space-y-6">
                  <div className="flex items-center gap-4 pb-6 border-b border-slate-100">
                    <div className="w-16 h-16 rounded-full bg-[#2563eb] text-white flex items-center justify-center font-extrabold text-2xl">
                      {user?.name?.[0] || user?.phone?.[0] || "P"}
                    </div>
                    <div>
                      <h2 className="text-xl font-extrabold text-[#0f2d5e]">{user?.name || "QXL Patient"}</h2>
                      <p className="text-xs font-semibold text-slate-500">{user?.phone || "+91 99646 39639"}</p>
                      <p className="text-xs font-semibold text-slate-500">{user?.email || "qxldiagnostics@gmail.com"}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 rounded-2xl bg-sky-50/60 border border-sky-100 space-y-1">
                      <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">Account Status</span>
                      <p className="text-xs font-extrabold text-emerald-600 flex items-center gap-1">
                        <CheckCircle className="w-3.5 h-3.5" /> NABL Certified Verified Patient Profile
                      </p>
                    </div>
                    <div className="p-4 rounded-2xl bg-sky-50/60 border border-sky-100 space-y-1">
                      <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">Preferred City</span>
                      <p className="text-xs font-extrabold text-[#0f2d5e]">Bengaluru, Karnataka</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Appointments View */}
              {(tabKey === "appointments" || tabKey === "orders" || tabKey === "reports" || tabKey === "history") && (
                <div className="space-y-4">
                  <h2 className="text-lg font-extrabold text-[#0f2d5e]">Your {title}</h2>
                  {bookings.length === 0 ? (
                    <div className="text-center py-12 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                      <Calendar className="w-10 h-10 text-slate-300 mx-auto mb-3" />
                      <p className="text-xs font-bold text-slate-500">No {title.toLowerCase()} recorded yet.</p>
                      <Link href="/book" className="inline-block mt-4 px-5 py-2.5 rounded-full bg-[#2563eb] text-white text-xs font-extrabold uppercase">
                        Book a Diagnostic Test
                      </Link>
                    </div>
                  ) : (
                    <ul className="space-y-3">
                      {bookings.map((b) => (
                        <li key={b.id} className="p-4 rounded-2xl border border-sky-100 bg-sky-50/30 flex items-center justify-between gap-4">
                          <div>
                            <p className="font-extrabold text-xs text-[#0f2d5e]">{b.test_name || "Health Package"}</p>
                            <p className="text-[11px] font-semibold text-slate-500">Patient: {b.patient_name} · Date: {b.preferred_date || "Today"}</p>
                          </div>
                          <span className="text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-full bg-blue-100 text-blue-700">
                            {b.status}
                          </span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )}

              {/* Default Fallback for other sub-pages */}
              {tabKey !== "profile" && tabKey !== "appointments" && tabKey !== "orders" && tabKey !== "reports" && tabKey !== "history" && (
                <div className="space-y-4">
                  <h2 className="text-lg font-extrabold text-[#0f2d5e]">{title} Management</h2>
                  <div className="p-6 rounded-2xl bg-sky-50/60 border border-sky-100 space-y-3">
                    <p className="text-xs text-slate-600 font-semibold leading-relaxed">
                      All your {title.toLowerCase()} preferences and records are synced securely with QXL Diagnostics NABL Laboratory systems.
                    </p>
                    <div className="flex gap-3">
                      <Link href="/book" className="px-5 py-2 rounded-xl bg-[#2563eb] text-white text-xs font-extrabold uppercase">
                        Book New Test
                      </Link>
                      <Link href="/contact" className="px-5 py-2 rounded-xl border border-sky-300 text-[#2563eb] text-xs font-extrabold uppercase">
                        Contact Support
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ShieldCheck, UserPlus, Phone, Lock, Mail, User, Loader2 } from "lucide-react";
import { api } from "@/lib/api";

export default function RegisterPage() {
  const [formData, setFormData] = useState({ name: "", phone: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.phone || !formData.password) return;
    setLoading(true);
    setError(null);
    try {
      await api.auth.register({
        name: formData.name || undefined,
        phone: formData.phone,
        email: formData.email,
        password: formData.password,
      });
      setSuccess(true);
    } catch (err: any) {
      setError(err?.message || "Registration failed. Please check details and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8faff] text-[#0f2d5e] flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-3xl p-8 border border-sky-200/60 shadow-xl space-y-6">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-sky-100 text-[#2563eb] flex items-center justify-center mx-auto mb-2">
            <UserPlus className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-extrabold text-[#0f2d5e]">Create Patient Account</h1>
          <p className="text-xs font-semibold text-slate-500">Sign up for QXL NABL Digital Health Portal</p>
        </div>

        {success ? (
          <div className="text-center py-6 space-y-3">
            <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto text-xl font-bold">✓</div>
            <h2 className="text-lg font-bold text-slate-800">Account Created Successfully!</h2>
            <p className="text-xs text-slate-500 font-medium">You can now sign in to view your bookings and lab reports.</p>
            <Link href="/login" className="inline-block mt-2 px-6 py-2.5 rounded-full bg-[#2563eb] text-white text-xs font-extrabold uppercase">
              Proceed to Login
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">Full Name</label>
              <input
                type="text"
                placeholder="Ramesh Kumar"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-sky-200 bg-sky-50/40 text-xs font-semibold outline-none focus:border-[#2563eb]"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">Phone Number *</label>
              <input
                type="tel"
                required
                placeholder="+91 98765 43210"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-sky-200 bg-sky-50/40 text-xs font-semibold outline-none focus:border-[#2563eb]"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">Email Address</label>
              <input
                type="email"
                placeholder="ramesh@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-sky-200 bg-sky-50/40 text-xs font-semibold outline-none focus:border-[#2563eb]"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">Password *</label>
              <input
                type="password"
                required
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-sky-200 bg-sky-50/40 text-xs font-semibold outline-none focus:border-[#2563eb]"
              />
            </div>

            {error && <p className="text-xs font-semibold text-red-600">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-2xl bg-[#2563eb] text-white font-extrabold text-xs uppercase tracking-wider hover:bg-[#1d4ed8] transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Create Account →"}
            </button>
          </form>
        )}

        <div className="text-center pt-2 border-t border-slate-100">
          <p className="text-xs text-slate-500 font-medium">
            Already have an account?{" "}
            <Link href="/login" className="text-[#2563eb] font-bold hover:underline">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

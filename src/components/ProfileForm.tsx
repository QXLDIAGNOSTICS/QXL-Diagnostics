"use client";

import { FormEvent, useEffect, useState } from "react";
import { Calendar, CheckCircle2, Loader2, Mail, Phone, Save, User } from "lucide-react";
import { api, ApiError, type AuthMeResponse } from "@/lib/api";
import { useAuth } from "@/lib/useAuth";

interface ProfileFormProps {
  firstLogin?: boolean;
  onSaved?: (user: AuthMeResponse) => void;
}

export default function ProfileForm({ firstLogin = false, onSaved }: ProfileFormProps) {
  const { user, refresh } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setName(user?.name || "");
    setEmail(user?.email || "");
    setDateOfBirth(user?.date_of_birth || "");
  }, [user]);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    const trimmedName = name.trim();
    if (!trimmedName) {
      setError("Please enter your name.");
      return;
    }

    setSaving(true);
    setSaved(false);
    setError(null);
    try {
      const updated = await api.users.updateMe({
        name: trimmedName,
        email: email.trim() || null,
        date_of_birth: dateOfBirth || null,
      });
      await refresh();
      setSaved(true);
      onSaved?.(updated);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Could not save your profile.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <h2 className="text-xl font-extrabold text-[#0f2d5e]">
          {firstLogin ? "Complete Your Profile" : "Profile Details"}
        </h2>
        <p className="mt-1 text-xs font-semibold text-slate-500">
          {firstLogin
            ? "Add your details once so bookings, prescriptions, and chat support can identify you."
            : "Update the details used for bookings, prescription uploads, and support."}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <label className="flex flex-col gap-2">
          <span className="text-xs font-bold text-slate-600 uppercase tracking-wider flex items-center gap-1.5">
            <User className="w-3.5 h-3.5 text-[#2563eb]" /> Name
          </span>
          <input
            value={name}
            onChange={(event) => setName(event.target.value)}
            required
            placeholder="Patient full name"
            className="border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#2563eb] transition-colors bg-gray-50/50"
          />
        </label>

        <label className="flex flex-col gap-2">
          <span className="text-xs font-bold text-slate-600 uppercase tracking-wider flex items-center gap-1.5">
            <Phone className="w-3.5 h-3.5 text-[#2563eb]" /> Phone
          </span>
          <input
            value={user?.phone || ""}
            disabled
            className="border border-gray-200 rounded-xl px-4 py-3 text-sm bg-slate-100 text-slate-500"
          />
        </label>

        <label className="flex flex-col gap-2">
          <span className="text-xs font-bold text-slate-600 uppercase tracking-wider flex items-center gap-1.5">
            <Mail className="w-3.5 h-3.5 text-[#2563eb]" /> Email
          </span>
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="Optional email"
            className="border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#2563eb] transition-colors bg-gray-50/50"
          />
        </label>

        <label className="flex flex-col gap-2">
          <span className="text-xs font-bold text-slate-600 uppercase tracking-wider flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-[#2563eb]" /> Date of Birth
          </span>
          <input
            type="date"
            value={dateOfBirth}
            onChange={(event) => setDateOfBirth(event.target.value)}
            className="border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#2563eb] transition-colors bg-gray-50/50 text-slate-600"
          />
        </label>
      </div>

      {error && (
        <p className="text-xs font-semibold text-red-600 bg-red-50 border border-red-100 rounded-lg px-4 py-3">
          {error}
        </p>
      )}

      {saved && (
        <p className="text-xs font-semibold text-green-700 bg-green-50 border border-green-100 rounded-lg px-4 py-3 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" /> Profile saved.
        </p>
      )}

      <button
        type="submit"
        disabled={saving}
        className="inline-flex w-full md:w-auto items-center justify-center gap-2 bg-[#2563eb] text-white font-extrabold px-6 py-3 rounded-xl text-xs hover:bg-[#1d4ed8] transition-colors shadow-md uppercase tracking-wider disabled:opacity-60"
      >
        {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
        {saving ? "Saving..." : "Save Profile"}
      </button>
    </form>
  );
}

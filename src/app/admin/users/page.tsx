"use client";

import React, { useState, useEffect, useCallback } from "react";
import { UserCog, Search, ShieldAlert, BadgeCheck, Loader2, UserPlus } from "lucide-react";
import { api, type AdminUser } from "@/lib/api";
import { useAuth } from "@/lib/useAuth";

export default function UsersPage() {
  const { user } = useAuth();
  const isSuperAdmin = user?.role === "super_admin";
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [creating, setCreating] = useState(false);
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newRole, setNewRole] = useState<"patient" | "admin">("patient");

  const refreshData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const { items } = await api.admin.users(undefined, 200, 0);
      setUsers(items);
    } catch {
      setError("Failed to load platform users.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshData();
  }, [refreshData]);

  const handleToggleRole = async (usr: AdminUser) => {
    if (!isSuperAdmin) return;
    const newRole = usr.role === "admin" ? "patient" : "admin";
    if (!confirm(`Change ${usr.name || usr.email || usr.phone}'s role to "${newRole}"?`)) return;
    setUpdatingId(usr.id);
    try {
      await api.admin.updateUserRole(usr.id, newRole);
      await refreshData();
    } catch {
      setError("Failed to update user role.");
    } finally {
      setUpdatingId(null);
    }
  };

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isSuperAdmin) return;
    setError(null);
    setCreating(true);
    try {
      await api.admin.createUser({
        name: newName || null,
        email: newEmail,
        phone: newPhone,
        password: newPassword,
        role: newRole,
      });
      setNewName("");
      setNewEmail("");
      setNewPhone("");
      setNewPassword("");
      setNewRole("patient");
      await refreshData();
    } catch {
      setError("Failed to create user.");
    } finally {
      setCreating(false);
    }
  };

  const filtered = users.filter(u => 
    (u.name || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
    (u.email || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
    u.phone.toLowerCase().includes(searchQuery.toLowerCase()) ||
    u.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <UserCog className="w-6 h-6 text-teal-600 dark:text-teal-400" />
            Platform Users & Roles
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mt-1">View registered accounts and assign the admin role. Users self-register via the public site.</p>
        </div>
      </div>

      {isSuperAdmin && (
        <form onSubmit={handleCreateUser} className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-150 dark:border-gray-800 p-4 shadow-sm">
          <div className="flex items-center gap-2 mb-3 text-sm font-bold text-slate-700 dark:text-slate-200">
            <UserPlus className="w-4 h-4 text-teal-600" />
            Create User
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3">
            <input
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              placeholder="Name"
              className="px-3 py-2 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm"
            />
            <input
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
              placeholder="Email"
              type="email"
              className="px-3 py-2 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm"
              required
            />
            <input
              value={newPhone}
              onChange={(e) => setNewPhone(e.target.value)}
              placeholder="Phone (e.g. +919876543210)"
              className="px-3 py-2 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm"
              required
            />
            <input
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Temporary password"
              type="password"
              className="px-3 py-2 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm"
              required
            />
            <div className="flex items-center gap-2">
              <select
                value={newRole}
                onChange={(e) => setNewRole((e.target.value as "patient" | "admin"))}
                className="flex-1 px-3 py-2 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm"
              >
                <option value="patient">patient</option>
                <option value="admin">admin</option>
              </select>
              <button
                type="submit"
                disabled={creating}
                className="px-4 py-2 rounded-lg bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold disabled:opacity-50"
              >
                {creating ? "Creating..." : "Create"}
              </button>
            </div>
          </div>
        </form>
      )}

      {error && (
        <div className="p-3 rounded-lg bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900 text-red-600 dark:text-red-400 text-sm">
          {error}
        </div>
      )}

      {/* Main Table */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-150 dark:border-gray-800 shadow-sm overflow-hidden">
        
        <div className="p-4 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
          <div className="relative max-w-sm w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search user profiles..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-sm bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all text-slate-800 dark:text-slate-100"
            />
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Showing {filtered.length} accounts
          </div>
        </div>

        {loading ? (
          <div className="p-12 flex items-center justify-center text-gray-400">
            <Loader2 className="w-6 h-6 animate-spin" />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-slate-800 dark:text-slate-200">
              <thead>
                <tr className="bg-slate-50/50 dark:bg-slate-950/20 text-gray-400 uppercase text-[10px] font-black tracking-wider border-b border-gray-100 dark:border-gray-800">
                  <th className="px-6 py-4">Name</th>
                  <th className="px-6 py-4">Email / Phone</th>
                  <th className="px-6 py-4">Role</th>
                  <th className="px-6 py-4">Verification</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800 text-xs">
                {filtered.map((usr) => (
                  <tr key={usr.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-950/10">
                    <td className="px-6 py-4 font-extrabold text-slate-900 dark:text-white flex items-center gap-1.5">
                      {usr.role === "admin" && <BadgeCheck className="w-4 h-4 text-[#2563eb]" />}
                      {usr.name || "—"}
                    </td>
                    <td className="px-6 py-4 font-medium">
                      <div>{usr.email || <span className="text-gray-400">No email</span>}</div>
                      <div className="text-gray-400">{usr.phone}</div>
                    </td>
                    <td className="px-6 py-4 font-bold text-teal-650 dark:text-teal-400 uppercase">{usr.role}</td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col gap-1">
                        <span className={`px-2 py-0.5 rounded-full text-[9px] font-black uppercase w-fit ${
                          usr.is_email_verified ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-700"
                        }`}>
                          Email {usr.is_email_verified ? "Verified" : "Unverified"}
                        </span>
                        <span className={`px-2 py-0.5 rounded-full text-[9px] font-black uppercase w-fit ${
                          usr.is_phone_verified ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-700"
                        }`}>
                          Phone {usr.is_phone_verified ? "Verified" : "Unverified"}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button 
                        onClick={() => handleToggleRole(usr)}
                        disabled={updatingId === usr.id || !isSuperAdmin}
                        className="inline-flex items-center gap-1 p-1.5 text-slate-500 hover:text-teal-650 hover:bg-slate-100 rounded-md cursor-pointer disabled:opacity-50 text-[10px] font-bold"
                        title={usr.role === "admin" ? "Revoke admin role" : "Grant admin role"}
                      >
                        {updatingId === usr.id ? <Loader2 className="w-4 h-4 animate-spin" /> : <ShieldAlert className="w-4 h-4" />}
                        {!isSuperAdmin ? "View Only" : usr.role === "admin" ? "Revoke Admin" : "Make Admin"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

    </div>
  );
}

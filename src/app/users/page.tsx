"use client";

import React, { useCallback, useEffect, useState } from "react";
import { UserCog, Search, Loader2, UserPlus, Shield } from "lucide-react";
import { api, type AdminUser, type RoleRecord } from "@/lib/api";
import { useAuth } from "@/lib/useAuth";
import {
  canManageUsers,
  creatableRolesFor,
  isSuperAdmin,
  ROLE_FRONT_OFFICE,
  ROLE_LABELS,
  ROLE_SUPER_ADMIN,
} from "@/lib/roles";

export default function UsersPage() {
  const { user } = useAuth();
  const canManage = canManageUsers(user?.role);
  const [roleDefs, setRoleDefs] = useState<RoleRecord[]>([]);
  const staticAllow = creatableRolesFor(user?.role);
  // Prefer live roles from the API (includes any super-admin-created custom
  // roles); fall back to the static list until that request resolves.
  const allowCreate =
    roleDefs.length > 0
      ? roleDefs
          .filter((r) => r.key !== ROLE_SUPER_ADMIN && (isSuperAdmin(user?.role) || r.tier === "staff"))
          .map((r) => r.key)
      : staticAllow;
  const roleLabels: Record<string, string> = {
    ...ROLE_LABELS,
    ...Object.fromEntries(roleDefs.map((r) => [r.key, r.label])),
  };
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
  const [newRole, setNewRole] = useState(allowCreate[0] || ROLE_FRONT_OFFICE);

  const refreshData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const { items } = await api.admin.users(undefined, 200, 0);
      setUsers(items);
    } catch {
      setError("Failed to load users. Administrators only.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (canManage) refreshData();
    else setLoading(false);
  }, [canManage, refreshData]);

  useEffect(() => {
    if (!canManage) return;
    api.roles
      .list()
      .then(setRoleDefs)
      .catch(() => {
        /* fall back to static role list */
      });
  }, [canManage]);

  useEffect(() => {
    if (allowCreate.length && !allowCreate.includes(newRole)) {
      setNewRole(allowCreate[0]);
    }
  }, [allowCreate, newRole]);

  const handleRoleChange = async (usr: AdminUser, role: string) => {
    if (!canManage || !allowCreate.includes(role)) return;
    if (!confirm(`Set ${usr.name || usr.email || usr.phone} to "${roleLabels[role] || role}"?`)) return;
    setUpdatingId(usr.id);
    try {
      await api.admin.updateUserRole(usr.id, role);
      await refreshData();
    } catch {
      setError("Failed to update user role.");
    } finally {
      setUpdatingId(null);
    }
  };

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canManage || !allowCreate.includes(newRole)) return;
    setError(null);
    setCreating(true);
    try {
      await api.admin.createUser({
        name: newName || null,
        email: newEmail,
        phone: newPhone,
        password: newPassword,
        role: newRole as "patient" | "front_office" | "staff" | "reception" | "marketing" | "sales" | "admin",
      });
      setNewName("");
      setNewEmail("");
      setNewPhone("");
      setNewPassword("");
      setNewRole(allowCreate[0] || ROLE_FRONT_OFFICE);
      await refreshData();
    } catch {
      setError("Failed to create user. Check email/phone are unique and password has letters + numbers.");
    } finally {
      setCreating(false);
    }
  };

  if (!canManage) {
    return (
      <div className="rounded-2xl border border-amber-200 dark:border-amber-900 bg-amber-50 dark:bg-amber-950/20 p-8 text-amber-900 dark:text-amber-300">
        <h2 className="text-lg font-bold">Administrators only</h2>
        <p className="text-sm mt-1">Front Office staff cannot manage user accounts.</p>
      </div>
    );
  }

  const filtered = users.filter(
    (u) =>
      (u.name || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
      (u.email || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.phone.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const staffUsers = filtered.filter((u) => u.role !== "patient");
  const patientUsers = filtered.filter((u) => u.role === "patient");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
          <UserCog className="w-6 h-6 text-sky-600" />
          Staff &amp; users
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1 text-sm max-w-2xl">
          Create Front Office, Staff, Reception, Marketing, or Sales accounts for the appointments desk
          {isSuperAdmin(user?.role) ? ", or promote Administrators" : ""}. Patients who register on
          the public site appear below but usually stay as Patient.
        </p>
      </div>

      {error && (
        <div className="p-3 rounded-lg bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900 text-red-600 dark:text-red-400 text-sm">{error}</div>
      )}

      {allowCreate.length > 0 && (
        <form
          onSubmit={handleCreateUser}
          className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-5 shadow-sm space-y-4"
        >
          <div className="flex items-center gap-2 text-sm font-bold text-slate-700 dark:text-slate-200">
            <UserPlus className="w-4 h-4 text-sky-600" />
            Create staff account
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            <input
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              placeholder="Full name"
              className="px-3 py-2.5 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 text-sm"
            />
            <input
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
              placeholder="Email"
              type="email"
              required
              className="px-3 py-2.5 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 text-sm"
            />
            <input
              value={newPhone}
              onChange={(e) => setNewPhone(e.target.value)}
              placeholder="Phone (10 digits)"
              required
              className="px-3 py-2.5 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 text-sm"
            />
            <input
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Password (letters + numbers)"
              type="password"
              required
              minLength={8}
              className="px-3 py-2.5 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 text-sm"
            />
            <select
              value={newRole}
              onChange={(e) => setNewRole(e.target.value)}
              className="px-3 py-2.5 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-slate-900 dark:text-slate-100 text-sm font-medium"
            >
              {allowCreate.map((r) => (
                <option key={r} value={r}>
                  {roleLabels[r] || r}
                </option>
              ))}
            </select>
            <button
              type="submit"
              disabled={creating}
              className="px-4 py-2.5 bg-sky-600 hover:bg-sky-700 text-white rounded-lg text-sm font-bold disabled:opacity-60 inline-flex items-center justify-center gap-2 cursor-pointer"
            >
              {creating && <Loader2 className="w-4 h-4 animate-spin" />}
              Create account
            </button>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Front Office, Staff, Reception, Marketing, and Sales accounts can open Appointments only.
            Administrators get the full CMS. Everyone signs in with just email/phone, password and
            an OTP — only the Super Admin is additionally asked for the secret key.
          </p>
        </form>
      )}

      <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-gray-100 dark:border-gray-800 flex flex-col sm:flex-row gap-3 sm:items-center justify-between">
          <div className="relative max-w-sm w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-gray-500" />
            <input
              type="search"
              placeholder="Search users…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-sm bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 rounded-lg"
            />
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {staffUsers.length} staff · {patientUsers.length} patients
          </p>
        </div>

        {loading ? (
          <div className="p-12 flex justify-center text-gray-400 dark:text-gray-600">
            <Loader2 className="w-6 h-6 animate-spin" />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-950/30 text-[10px] uppercase tracking-wider text-gray-400 dark:text-gray-500 font-black border-b border-gray-100 dark:border-gray-800">
                  <th className="px-4 py-3">Name</th>
                  <th className="px-4 py-3">Contact</th>
                  <th className="px-4 py-3">Role</th>
                  <th className="px-4 py-3 text-right">Change role</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                {[...staffUsers, ...patientUsers].map((usr) => (
                  <tr key={usr.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-950/20">
                    <td className="px-4 py-3 font-semibold text-slate-900 dark:text-white">
                      {usr.name || "—"}
                    </td>
                    <td className="px-4 py-3 text-slate-600 dark:text-slate-300">
                      <div>{usr.email || "—"}</div>
                      <div className="text-xs text-gray-400 dark:text-gray-500">{usr.phone}</div>
                    </td>
                    <td className="px-4 py-3">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-sky-50 dark:bg-sky-950/40 text-sky-800 dark:text-sky-300 border border-sky-100 dark:border-sky-900">
                        <Shield className="w-3 h-3" />
                        {roleLabels[usr.role] || usr.role}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      {usr.role === "super_admin" ? (
                        <span className="text-xs text-gray-400 dark:text-gray-500">Protected</span>
                      ) : (
                        <select
                          disabled={updatingId === usr.id || allowCreate.length === 0}
                          value={usr.role}
                          onChange={(e) => handleRoleChange(usr, e.target.value)}
                          className="text-xs font-medium px-2 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-slate-800 dark:text-slate-100 disabled:opacity-50"
                        >
                          {!allowCreate.includes(usr.role) && (
                            <option value={usr.role}>{roleLabels[usr.role] || usr.role}</option>
                          )}
                          {allowCreate.map((r) => (
                            <option key={r} value={r}>
                              {roleLabels[r]}
                            </option>
                          ))}
                        </select>
                      )}
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

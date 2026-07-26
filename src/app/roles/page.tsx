"use client";

import { Check, Lock, Plus, ShieldCheck, Trash2, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { api, type PermissionCatalogItem, type RoleRecord } from "@/lib/api";
import { useAuth } from "@/lib/useAuth";
import { isSuperAdmin } from "@/lib/roles";

function groupCatalog(catalog: PermissionCatalogItem[]) {
  const groups = new Map<string, PermissionCatalogItem[]>();
  for (const item of catalog) {
    if (!groups.has(item.group)) groups.set(item.group, []);
    groups.get(item.group)!.push(item);
  }
  return Array.from(groups.entries());
}

function slugify(v: string) {
  return v
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "")
    .slice(0, 40);
}

interface DraftState {
  [roleId: string]: string[];
}

export default function RolesPage() {
  const { user } = useAuth();
  const canManage = isSuperAdmin(user);

  const [catalog, setCatalog] = useState<PermissionCatalogItem[]>([]);
  const [roles, setRoles] = useState<RoleRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [drafts, setDrafts] = useState<DraftState>({});
  const [savingId, setSavingId] = useState<string | null>(null);
  const [showCreate, setShowCreate] = useState(false);
  const [creating, setCreating] = useState(false);
  const [newLabel, setNewLabel] = useState("");
  const [newTier, setNewTier] = useState<"staff" | "admin">("staff");
  const [newPerms, setNewPerms] = useState<string[]>([]);

  const grouped = useMemo(() => groupCatalog(catalog), [catalog]);

  const load = async () => {
    setLoading(true);
    setError(null);
    try {
      const [cat, roleList] = await Promise.all([api.roles.permissionsCatalog(), api.roles.list()]);
      setCatalog(cat);
      setRoles(roleList);
      const initialDrafts: DraftState = {};
      roleList.forEach((r) => {
        initialDrafts[r.id] = r.permissions;
      });
      setDrafts(initialDrafts);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load roles");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const togglePerm = (roleId: string, key: string) => {
    setDrafts((prev) => {
      const current = prev[roleId] || [];
      const next = current.includes(key) ? current.filter((k) => k !== key) : [...current, key];
      return { ...prev, [roleId]: next };
    });
  };

  const isDirty = (role: RoleRecord) => {
    const draft = drafts[role.id] || [];
    if (draft.length !== role.permissions.length) return true;
    const a = [...draft].sort();
    const b = [...role.permissions].sort();
    return a.some((v, i) => v !== b[i]);
  };

  const savePermissions = async (role: RoleRecord) => {
    setSavingId(role.id);
    try {
      const updated = await api.roles.update(role.id, { permissions: drafts[role.id] || [] });
      setRoles((prev) => prev.map((r) => (r.id === role.id ? updated : r)));
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to save role");
    } finally {
      setSavingId(null);
    }
  };

  const deleteRole = async (role: RoleRecord) => {
    if (!window.confirm(`Delete the "${role.label}" role? Users currently assigned to it will keep the role key but lose panel access.`)) return;
    try {
      await api.roles.remove(role.id);
      setRoles((prev) => prev.filter((r) => r.id !== role.id));
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to delete role");
    }
  };

  const createRole = async () => {
    if (!newLabel.trim()) {
      setError("Give the new role a name first");
      return;
    }
    setCreating(true);
    setError(null);
    try {
      const created = await api.roles.create({
        key: slugify(newLabel),
        label: newLabel.trim(),
        tier: newTier,
        permissions: newPerms,
      });
      setRoles((prev) => [...prev, created]);
      setDrafts((prev) => ({ ...prev, [created.id]: created.permissions }));
      setShowCreate(false);
      setNewLabel("");
      setNewTier("staff");
      setNewPerms([]);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to create role");
    } finally {
      setCreating(false);
    }
  };

  return (
    <div className="space-y-6 max-w-5xl">
      <div className="flex items-start justify-between gap-3 flex-wrap">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <ShieldCheck className="w-6 h-6 text-blue-600" />
            Roles &amp; permissions
          </h1>
          <p className="text-sm text-gray-500 dark:text-slate-400 mt-1 max-w-2xl">
            {canManage
              ? "Create roles and choose exactly which admin-panel features each one can access. Assign roles to staff from the Users page."
              : "These roles are enforced by the API. Only a Super Admin can create roles or change permissions."}
          </p>
        </div>
        {canManage && (
          <button
            onClick={() => setShowCreate(true)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold shadow-sm shadow-blue-600/20 cursor-pointer"
          >
            <Plus className="w-4 h-4" /> New role
          </button>
        )}
      </div>

      {error && (
        <div className="text-sm text-red-700 dark:text-red-400 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900 rounded-xl px-4 py-3 flex items-center justify-between">
          {error}
          <button onClick={() => setError(null)} className="cursor-pointer">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {loading ? (
        <div className="py-16 text-center text-sm text-slate-400 dark:text-slate-500">Loading roles…</div>
      ) : (
        <div className="grid gap-4">
          {roles.map((role) => {
            const draft = drafts[role.id] || [];
            const dirty = isDirty(role);
            return (
              <article
                key={role.id}
                className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-5 shadow-sm"
              >
                <div className="flex items-start justify-between gap-3 flex-wrap">
                  <div>
                    <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                      {role.label}
                      {role.is_system && (
                        <span title="Built-in role" className="text-slate-400 dark:text-slate-500">
                          <Lock className="w-3.5 h-3.5" />
                        </span>
                      )}
                    </h2>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 font-mono">{role.key}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-[10px] font-black uppercase tracking-wide px-2 py-1 rounded-full border shrink-0 ${
                        role.tier === "admin"
                          ? "bg-blue-50 dark:bg-blue-950/40 text-blue-800 dark:text-blue-300 border-blue-100 dark:border-blue-900"
                          : "bg-sky-50 dark:bg-sky-950/40 text-sky-800 dark:text-sky-300 border-sky-100 dark:border-sky-900"
                      }`}
                    >
                      {role.tier} tier
                    </span>
                    {canManage && !role.is_system && (
                      <button
                        onClick={() => deleteRole(role)}
                        title="Delete role"
                        className="p-1.5 rounded-lg text-slate-400 dark:text-slate-500 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/20 cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-4 mt-5">
                  {grouped.map(([group, items]) => (
                    <div key={group}>
                      <p className="text-[11px] font-bold uppercase tracking-wide text-slate-400 dark:text-slate-500 mb-2">{group}</p>
                      <ul className="space-y-1.5">
                        {items.map((item) => {
                          const checked = draft.includes(item.key);
                          return (
                            <li key={item.key}>
                              <label
                                className={`flex items-start gap-2 text-xs ${
                                  canManage ? "cursor-pointer" : "cursor-default"
                                }`}
                              >
                                <span
                                  onClick={() => canManage && togglePerm(role.id, item.key)}
                                  className={`mt-0.5 w-4 h-4 rounded flex items-center justify-center shrink-0 border transition-colors ${
                                    checked
                                      ? "bg-blue-600 border-blue-600 text-white"
                                      : "border-slate-300 dark:border-gray-600"
                                  }`}
                                >
                                  {checked && <Check className="w-3 h-3" />}
                                </span>
                                <span
                                  onClick={() => canManage && togglePerm(role.id, item.key)}
                                  className={checked ? "text-slate-700 dark:text-slate-200" : "text-slate-400 dark:text-slate-500"}
                                >
                                  {item.label}
                                </span>
                              </label>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  ))}
                </div>

                {canManage && (
                  <div className="flex justify-end mt-4">
                    <button
                      disabled={!dirty || savingId === role.id}
                      onClick={() => savePermissions(role)}
                      className="px-4 py-2 rounded-lg bg-slate-900 dark:bg-white dark:text-slate-900 text-white text-xs font-bold disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                    >
                      {savingId === role.id ? "Saving…" : "Save permissions"}
                    </button>
                  </div>
                )}
              </article>
            );
          })}
        </div>
      )}

      {showCreate && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-lg max-h-[85vh] overflow-y-auto custom-scrollbar">
            <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100 dark:border-gray-800">
              <h3 className="font-bold text-slate-900 dark:text-white">Create role</h3>
              <button onClick={() => setShowCreate(false)} className="cursor-pointer text-slate-400 dark:text-slate-500 hover:text-slate-700 dark:hover:text-slate-200">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-5 space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide">Role name</label>
                <input
                  value={newLabel}
                  onChange={(e) => setNewLabel(e.target.value)}
                  placeholder="e.g. Billing Desk"
                  className="mt-1 w-full px-3 py-2 text-sm border border-slate-300 dark:border-gray-700 dark:bg-gray-800 dark:text-slate-100 dark:placeholder-slate-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {newLabel && <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-1">Key: {slugify(newLabel)}</p>}
              </div>
              <div>
                <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide">Access tier</label>
                <div className="mt-1 flex gap-2">
                  {(["staff", "admin"] as const).map((t) => (
                    <button
                      key={t}
                      onClick={() => setNewTier(t)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold border cursor-pointer capitalize ${
                        newTier === t
                          ? "bg-blue-600 border-blue-600 text-white"
                          : "border-slate-300 dark:border-gray-700 text-slate-600 dark:text-slate-300"
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
                <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-1">
                  Staff tier = front-desk / appointments-only access. Admin tier = full CMS + user management.
                </p>
              </div>
              <div>
                <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide">Permissions</label>
                <div className="mt-2 grid sm:grid-cols-2 gap-x-4 gap-y-3 max-h-64 overflow-y-auto custom-scrollbar pr-1">
                  {grouped.map(([group, items]) => (
                    <div key={group}>
                      <p className="text-[10px] font-bold uppercase tracking-wide text-slate-400 dark:text-slate-500 mb-1.5">{group}</p>
                      <ul className="space-y-1">
                        {items.map((item) => {
                          const checked = newPerms.includes(item.key);
                          return (
                            <li key={item.key}>
                              <label className="flex items-start gap-2 text-xs cursor-pointer">
                                <span
                                  onClick={() =>
                                    setNewPerms((prev) =>
                                      prev.includes(item.key) ? prev.filter((k) => k !== item.key) : [...prev, item.key]
                                    )
                                  }
                                  className={`mt-0.5 w-4 h-4 rounded flex items-center justify-center shrink-0 border ${
                                    checked ? "bg-blue-600 border-blue-600 text-white" : "border-slate-300 dark:border-gray-600"
                                  }`}
                                >
                                  {checked && <Check className="w-3 h-3" />}
                                </span>
                                <span className={checked ? "text-slate-700 dark:text-slate-200" : "text-slate-400 dark:text-slate-500"}>
                                  {item.label}
                                </span>
                              </label>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-2 px-5 py-4 border-t border-slate-100 dark:border-gray-800">
              <button
                onClick={() => setShowCreate(false)}
                className="px-4 py-2 rounded-lg text-sm font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-gray-800 cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={createRole}
                disabled={creating}
                className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold disabled:opacity-50 cursor-pointer"
              >
                {creating ? "Creating…" : "Create role"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

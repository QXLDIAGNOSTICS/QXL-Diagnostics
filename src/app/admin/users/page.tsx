"use client";

import React, { useState, useEffect } from "react";
import { UserCog, Plus, Search, Trash2, Edit2, X, ShieldAlert, BadgeCheck } from "lucide-react";
import { cmsStore } from "@/lib/cmsStore";

export default function UsersPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form states
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("Editor");
  const [status, setStatus] = useState("Active");

  useEffect(() => {
    const refreshData = () => {
      let data = cmsStore.getAll("users");
      if (data.length === 0) {
        const defaultUsers = [
          { id: "usr-1", name: "Super Admin", email: "admin@qxldiagnostics.com", role: "Super Admin", status: "Active" },
          { id: "usr-2", name: "Dr. Muruda", email: "muruda@qxldiagnostics.com", role: "Lab Manager", status: "Active" },
          { id: "usr-3", name: "Karan Johar", email: "frontdesk@qxldiagnostics.com", role: "Receptionist", status: "Active" }
        ];
        cmsStore.saveState("users", defaultUsers);
        data = defaultUsers;
      }
      setUsers(data);
    };
    refreshData();
    window.addEventListener("cms-update", refreshData);
    return () => window.removeEventListener("cms-update", refreshData);
  }, []);

  const openAddModal = () => {
    setEditingId(null);
    setName("");
    setEmail("");
    setRole("Editor");
    setStatus("Active");
    setIsModalOpen(true);
  };

  const openEditModal = (usr: any) => {
    setEditingId(usr.id);
    setName(usr.name);
    setEmail(usr.email);
    setRole(usr.role);
    setStatus(usr.status || "Active");
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;

    const payload = {
      name,
      email,
      role,
      status
    };

    if (editingId) {
      cmsStore.updateItem("users", editingId, payload);
    } else {
      cmsStore.addItem("users", payload);
    }
    setIsModalOpen(false);
  };

  const handleDelete = (id: string) => {
    if (id === "usr-1") {
      alert("Cannot delete primary Super Admin account!");
      return;
    }
    if (confirm("Are you sure you want to delete this administrative user?")) {
      cmsStore.deleteItem("users", id);
    }
  };

  const filtered = users.filter(u => 
    u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    u.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    u.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <UserCog className="w-6 h-6 text-teal-600 dark:text-teal-400" />
            Super Admin & Users
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Provision staff access accounts, reset profile parameters, and assign security roles.</p>
        </div>
        
        <button 
          onClick={openAddModal}
          className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-lg transition-colors flex items-center gap-2 text-sm font-medium shadow-sm cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          Add User Access
        </button>
      </div>

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
            Showing {filtered.length} staff records
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-slate-800 dark:text-slate-200">
            <thead>
              <tr className="bg-slate-50/50 dark:bg-slate-950/20 text-gray-400 uppercase text-[10px] font-black tracking-wider border-b border-gray-100 dark:border-gray-800">
                <th className="px-6 py-4">Staff Name</th>
                <th className="px-6 py-4">Email Address</th>
                <th className="px-6 py-4">Security Role</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800 text-xs">
              {filtered.map((usr) => (
                <tr key={usr.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-950/10">
                  <td className="px-6 py-4 font-extrabold text-slate-900 dark:text-white flex items-center gap-1.5">
                    {usr.role.includes("Super") && <BadgeCheck className="w-4 h-4 text-[#2563eb]" />}
                    {usr.name}
                  </td>
                  <td className="px-6 py-4 font-medium">{usr.email}</td>
                  <td className="px-6 py-4 font-bold text-teal-650 dark:text-teal-400">{usr.role}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-black uppercase ${
                      usr.status === "Active" ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-700"
                    }`}>
                      {usr.status || "Active"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right flex items-center justify-end gap-1.5 mt-1">
                    <button 
                      onClick={() => openEditModal(usr)}
                      className="p-1.5 text-slate-500 hover:text-teal-650 hover:bg-slate-100 rounded-md cursor-pointer"
                      title="Edit User Profile"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => handleDelete(usr.id)}
                      className="p-1.5 text-slate-400 hover:text-red-650 hover:bg-red-50 rounded-md cursor-pointer"
                      title="Revoke Access"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Editor Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/55 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
          <div className="bg-white dark:bg-gray-900 rounded-2xl max-w-md w-full shadow-2xl border border-gray-150 dark:border-gray-800 overflow-hidden">
            <div className="p-6 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
              <h3 className="text-base font-bold text-gray-900 dark:text-white">
                {editingId ? "Edit User Permissions" : "Add Admin Portal User"}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="p-2 text-gray-400 hover:text-gray-650 rounded-lg">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">Staff Name</label>
                <input 
                  type="text" 
                  required
                  value={name} 
                  onChange={(e) => setName(e.target.value)} 
                  placeholder="Karan Johar" 
                  className="w-full px-3.5 py-2.5 text-sm bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">Email Address</label>
                <input 
                  type="email" 
                  required
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                  placeholder="karan@qxldiagnostics.com" 
                  className="w-full px-3.5 py-2.5 text-sm bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-slate-800 dark:text-slate-100 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">Security Role</label>
                  <select 
                    value={role} 
                    onChange={(e) => setRole(e.target.value)} 
                    className="w-full px-3.5 py-2.5 text-sm bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-slate-655 dark:text-slate-100 focus:outline-none"
                  >
                    <option value="Super Admin">Super Admin</option>
                    <option value="Lab Manager">Lab Manager</option>
                    <option value="Receptionist">Receptionist</option>
                    <option value="Editor">Editor</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">Status</label>
                  <select 
                    value={status} 
                    onChange={(e) => setStatus(e.target.value)} 
                    className="w-full px-3.5 py-2.5 text-sm bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-slate-655 dark:text-slate-100 focus:outline-none"
                  >
                    <option value="Active">Active</option>
                    <option value="Suspended">Suspended</option>
                  </select>
                </div>
              </div>

              <div className="pt-4 flex justify-end gap-3 border-t border-gray-100 dark:border-gray-800">
                <button 
                  type="button" 
                  onClick={() => setIsModalOpen(false)} 
                  className="px-4 py-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 text-xs font-medium cursor-pointer"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="px-5 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-lg text-xs font-medium shadow-sm cursor-pointer"
                >
                  Save User Account
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}

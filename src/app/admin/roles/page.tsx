"use client";

import React, { useState, useEffect } from "react";
import { ShieldCheck, Plus, Search, Trash2, Edit2, X, ShieldAlert } from "lucide-react";
import { cmsStore } from "@/lib/cmsStore";

export default function RolesPage() {
  const [roles, setRoles] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form states
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [modules, setModules] = useState<string[]>(["Website Management", "Packages & Tests"]);

  const availableModules = [
    "Dashboard Overview",
    "Website Management",
    "Banners CMS",
    "Packages & Tests",
    "Appointments Coordinator",
    "Diagnostic Reports release",
    "Feedback Moderator",
    "Franchise & Careers",
    "Security Settings"
  ];

  useEffect(() => {
    const refreshData = () => {
      let data = cmsStore.getAll("roles");
      if (data.length === 0) {
        const defaultRoles = [
          { id: "rol-1", name: "Super Admin", desc: "Full root control of all panels and system parameters.", modules: [...availableModules] },
          { id: "rol-2", name: "Lab Manager", desc: "Release diagnostic report PDFs and manage tests.", modules: ["Dashboard Overview", "Packages & Tests", "Diagnostic Reports release"] },
          { id: "rol-3", name: "Receptionist", desc: "Schedule visits, patient register, and request logs.", modules: ["Dashboard Overview", "Appointments Coordinator", "Feedback Moderator"] }
        ];
        cmsStore.saveState("roles", defaultRoles);
        data = defaultRoles;
      }
      setRoles(data);
    };
    refreshData();
    window.addEventListener("cms-update", refreshData);
    return () => window.removeEventListener("cms-update", refreshData);
  }, []);

  const openAddModal = () => {
    setEditingId(null);
    setName("");
    setDesc("");
    setModules(["Dashboard Overview"]);
    setIsModalOpen(true);
  };

  const openEditModal = (rol: any) => {
    setEditingId(rol.id);
    setName(rol.name);
    setDesc(rol.desc);
    setModules(rol.modules || []);
    setIsModalOpen(true);
  };

  const handleModuleToggle = (mod: string) => {
    if (modules.includes(mod)) {
      setModules(modules.filter(m => m !== mod));
    } else {
      setModules([...modules, mod]);
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !desc) return;

    const payload = {
      name,
      desc,
      modules
    };

    if (editingId) {
      cmsStore.updateItem("roles", editingId, payload);
    } else {
      cmsStore.addItem("roles", payload);
    }
    setIsModalOpen(false);
  };

  const handleDelete = (id: string) => {
    if (id === "rol-1") {
      alert("Cannot delete primary Super Admin root role!");
      return;
    }
    if (confirm("Are you sure you want to delete this custom security group?")) {
      cmsStore.deleteItem("roles", id);
    }
  };

  const filtered = roles.filter(r => 
    r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    r.desc.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <ShieldCheck className="w-6 h-6 text-teal-600 dark:text-teal-400" />
            Roles & Privileges
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Configure customized permission groups and toggle module-wise permissions.</p>
        </div>
        
        <button 
          onClick={openAddModal}
          className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-lg transition-colors flex items-center gap-2 text-sm font-medium shadow-sm cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          Create Custom Role
        </button>
      </div>

      {/* Main Table */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-150 dark:border-gray-800 shadow-sm overflow-hidden">
        
        <div className="p-4 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
          <div className="relative max-w-sm w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search roles..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-sm bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all text-slate-800 dark:text-slate-100"
            />
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400 font-bold">
            {filtered.length} privilege groups
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-slate-800 dark:text-slate-200">
            <thead>
              <tr className="bg-slate-50/50 dark:bg-slate-950/20 text-gray-400 uppercase text-[10px] font-black tracking-wider border-b border-gray-100 dark:border-gray-800">
                <th className="px-6 py-4">Security Group Name</th>
                <th className="px-6 py-4">Description</th>
                <th className="px-6 py-4">Granted Modules Access</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800 text-xs">
              {filtered.map((rol) => (
                <tr key={rol.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-950/10">
                  <td className="px-6 py-4 font-extrabold text-slate-900 dark:text-white">{rol.name}</td>
                  <td className="px-6 py-4 font-medium text-gray-500 dark:text-gray-400 max-w-[240px] truncate">{rol.desc}</td>
                  <td className="px-6 py-4 font-medium">
                    <div className="flex flex-wrap gap-1 max-w-[400px]">
                      {(rol.modules || []).map((m: string) => (
                        <span key={m} className="bg-teal-50 dark:bg-teal-950/30 text-teal-600 border border-teal-100 px-2 py-0.5 rounded text-[8px] font-extrabold tracking-wide uppercase">
                          {m}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right flex items-center justify-end gap-1.5 mt-1.5">
                    <button 
                      onClick={() => openEditModal(rol)}
                      className="p-1.5 text-slate-500 hover:text-teal-650 hover:bg-slate-100 rounded-md cursor-pointer"
                      title="Configure Permissions"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => handleDelete(rol.id)}
                      className="p-1.5 text-slate-400 hover:text-red-650 hover:bg-red-50 rounded-md cursor-pointer"
                      title="Revoke Permission Group"
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
          <div className="bg-white dark:bg-gray-900 rounded-2xl max-w-lg w-full shadow-2xl border border-gray-150 dark:border-gray-800 overflow-hidden">
            <div className="p-6 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
              <h3 className="text-base font-bold text-gray-900 dark:text-white">
                {editingId ? "Configure Access Permissions" : "Create Security Role"}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="p-2 text-gray-400 hover:text-gray-650 rounded-lg">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">Role Title</label>
                <input 
                  type="text" 
                  required
                  value={name} 
                  onChange={(e) => setName(e.target.value)} 
                  placeholder="Billing Officer" 
                  className="w-full px-3.5 py-2.5 text-sm bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">Role Description</label>
                <input 
                  type="text" 
                  required
                  value={desc} 
                  onChange={(e) => setDesc(e.target.value)} 
                  placeholder="Privilege group for handling invoicing and logs." 
                  className="w-full px-3.5 py-2.5 text-sm bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-slate-800 dark:text-slate-100 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-2 uppercase">Granted Modules Access</label>
                <div className="grid grid-cols-2 gap-2 max-h-[180px] overflow-y-auto p-3 bg-slate-50 dark:bg-slate-950/20 border border-gray-150 dark:border-gray-850 rounded-lg custom-scrollbar">
                  {availableModules.map(mod => (
                    <label key={mod} className="flex items-center gap-2 text-xs font-bold text-slate-750 dark:text-slate-200 cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={modules.includes(mod)}
                        onChange={() => handleModuleToggle(mod)}
                        className="rounded border-gray-350 dark:border-gray-705 text-teal-650 focus:ring-teal-505"
                      />
                      {mod}
                    </label>
                  ))}
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
                  Save Privilege Group
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <style dangerouslySetInnerHTML={{__html: `
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 10px; }
        .dark .custom-scrollbar::-webkit-scrollbar-thumb { background: #334155; }
      `}} />
    </div>
  );
}

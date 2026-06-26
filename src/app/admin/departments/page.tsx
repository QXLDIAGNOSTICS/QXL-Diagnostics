"use client";

import React, { useState, useEffect } from "react";
import { Building2, Plus, Search, Trash2, Edit2, X, Info } from "lucide-react";
import { cmsStore } from "@/lib/cmsStore";

export default function DepartmentsPage() {
  const [departments, setDepartments] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form states
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [href, setHref] = useState("");
  const [iconName, setIconName] = useState("Microscope");

  useEffect(() => {
    const refreshData = () => {
      setDepartments(cmsStore.getAll("departments"));
    };
    refreshData();
    window.addEventListener("cms-update", refreshData);
    return () => window.removeEventListener("cms-update", refreshData);
  }, []);

  const openAddModal = () => {
    setEditingId(null);
    setTitle("");
    setDesc("");
    setHref("/specialities/");
    setIconName("Microscope");
    setIsModalOpen(true);
  };

  const openEditModal = (dept: any) => {
    setEditingId(dept.id);
    setTitle(dept.title);
    setDesc(dept.desc);
    setHref(dept.href);
    setIconName(dept.iconName || "Microscope");
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !desc || !href) return;

    const payload = {
      title: title.toUpperCase(),
      desc,
      href,
      iconName
    };

    if (editingId) {
      cmsStore.updateItem("departments", editingId, payload);
    } else {
      cmsStore.addItem("departments", payload);
    }
    setIsModalOpen(false);
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this clinical department?")) {
      cmsStore.deleteItem("departments", id);
    }
  };

  const filtered = departments.filter(d => 
    d.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    d.desc.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <Building2 className="w-6 h-6 text-teal-600 dark:text-teal-400" />
            Specialities & Departments
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Manage laboratory departments and homepage specialty panels.</p>
        </div>
        
        <button 
          onClick={openAddModal}
          className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-lg transition-colors flex items-center gap-2 text-sm font-medium shadow-sm cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          Add Specialty
        </button>
      </div>

      {/* Main Table */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-150 dark:border-gray-800 shadow-sm overflow-hidden">
        
        <div className="p-4 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
          <div className="relative max-w-sm w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search departments..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-sm bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all text-slate-800 dark:text-slate-100"
            />
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Showing {filtered.length} departments
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="p-12 text-center flex flex-col items-center justify-center">
            <Building2 className="w-12 h-12 text-gray-300 mb-3" />
            <h3 className="text-base font-semibold text-gray-955 dark:text-white">No departments found</h3>
            <p className="text-sm text-gray-500 max-w-xs mt-1 mb-4">Add your specialties here.</p>
            <button onClick={openAddModal} className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold rounded-lg cursor-pointer">
              Add First specialty
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-slate-800 dark:text-slate-200">
              <thead>
                <tr className="bg-slate-50/50 dark:bg-slate-950/20 text-gray-400 uppercase text-[10px] font-black tracking-wider border-b border-gray-100 dark:border-gray-800">
                  <th className="px-6 py-4">Icon Type</th>
                  <th className="px-6 py-4">Title / Label</th>
                  <th className="px-6 py-4">Description Info</th>
                  <th className="px-6 py-4">URL Slug Target</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800 text-xs">
                {filtered.map((dept) => (
                  <tr key={dept.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-950/10">
                    <td className="px-6 py-4 font-bold text-[#2563eb]">
                      <span className="bg-blue-50 dark:bg-blue-950/30 px-2.5 py-1.5 rounded-lg border border-blue-100/50">
                        {dept.iconName || "Microscope"}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-extrabold text-slate-900 dark:text-white">{dept.title}</td>
                    <td className="px-6 py-4 font-medium text-gray-500 dark:text-gray-400">{dept.desc}</td>
                    <td className="px-6 py-4 font-mono text-gray-400">{dept.href}</td>
                    <td className="px-6 py-4 text-right flex items-center justify-end gap-1.5 mt-1">
                      <button 
                        onClick={() => openEditModal(dept)}
                        className="p-1.5 text-slate-500 hover:text-teal-650 hover:bg-slate-100 rounded-md cursor-pointer"
                        title="Edit Department"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleDelete(dept.id)}
                        className="p-1.5 text-slate-400 hover:text-red-650 hover:bg-red-50 rounded-md cursor-pointer"
                        title="Delete Record"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Editor Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/55 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
          <div className="bg-white dark:bg-gray-900 rounded-2xl max-w-md w-full shadow-2xl border border-gray-150 dark:border-gray-800 overflow-hidden">
            <div className="p-6 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
              <h3 className="text-base font-bold text-gray-900 dark:text-white">
                {editingId ? "Edit clinical Department" : "Add clinical Department"}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="p-2 text-gray-400 hover:text-gray-650 rounded-lg">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">Specialty Name</label>
                <input 
                  type="text" 
                  required
                  value={title} 
                  onChange={(e) => setTitle(e.target.value)} 
                  placeholder="NEUROLOGY" 
                  className="w-full px-3.5 py-2.5 text-sm bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">Description / Summary</label>
                <input 
                  type="text" 
                  required
                  value={desc} 
                  onChange={(e) => setDesc(e.target.value)} 
                  placeholder="Brain & Nervous System clinical diagnostics" 
                  className="w-full px-3.5 py-2.5 text-sm bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-slate-800 dark:text-slate-100 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">URL Slug</label>
                  <input 
                    type="text" 
                    required
                    value={href} 
                    onChange={(e) => setHref(e.target.value)} 
                    placeholder="/specialities/neurology" 
                    className="w-full px-3.5 py-2.5 text-sm bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-slate-800 dark:text-slate-100 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">Icon type</label>
                  <select 
                    value={iconName} 
                    onChange={(e) => setIconName(e.target.value)} 
                    className="w-full px-3.5 py-2.5 text-sm bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-slate-600 dark:text-slate-100 focus:outline-none"
                  >
                    <option value="Brain">Brain (Neurology)</option>
                    <option value="Droplet">Droplet (Hematology)</option>
                    <option value="Heart">Heart (Cardiology)</option>
                    <option value="Shield">Shield (Urology)</option>
                    <option value="Activity">Activity (Endocrinology)</option>
                    <option value="Microscope">Microscope (Default)</option>
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
                  Save specialty
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}

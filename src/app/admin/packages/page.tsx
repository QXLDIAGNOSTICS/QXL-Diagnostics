"use client";

import React, { useState, useEffect } from "react";
import { Briefcase, Plus, Search, Edit2, Trash2, X } from "lucide-react";
import { cmsStore } from "@/lib/cmsStore";

export default function PackagesAdminPage() {
  const [packages, setPackages] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form states
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [oldPrice, setOldPrice] = useState("");
  const [includes, setIncludes] = useState("");
  const [parameters, setParameters] = useState("");
  const [tag, setTag] = useState("");

  useEffect(() => {
    const refreshData = () => {
      setPackages(cmsStore.getAll("packages"));
    };
    refreshData();
    window.addEventListener("cms-update", refreshData);
    return () => window.removeEventListener("cms-update", refreshData);
  }, []);

  const openAddModal = () => {
    setEditingId(null);
    setName("");
    setPrice("");
    setOldPrice("");
    setIncludes("");
    setParameters("10+ Parameters");
    setTag("WELLNESS");
    setIsModalOpen(true);
  };

  const openEditModal = (pkg: any) => {
    setEditingId(pkg.id);
    setName(pkg.name);
    setPrice(pkg.price);
    setOldPrice(pkg.old_price);
    setIncludes(pkg.includes);
    setParameters(pkg.parameters);
    setTag(pkg.tag || "");
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !price || !oldPrice) return;

    const payload = {
      name,
      price,
      old_price: oldPrice,
      includes,
      parameters,
      tag
    };

    if (editingId) {
      cmsStore.updateItem("packages", editingId, payload);
    } else {
      cmsStore.addItem("packages", payload);
    }
    setIsModalOpen(false);
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this health package?")) {
      cmsStore.deleteItem("packages", id);
    }
  };

  const filteredPackages = packages.filter(pkg =>
    pkg.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    pkg.includes.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <Briefcase className="w-6 h-6 text-teal-600 dark:text-teal-400" />
            Health Packages
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Configure diagnostic packages and prices.</p>
        </div>
        
        <button 
          onClick={openAddModal}
          className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-lg transition-colors flex items-center gap-2 text-sm font-medium shadow-sm cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          Add Package
        </button>
      </div>

      {/* Grid */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-150 dark:border-gray-800 shadow-sm overflow-hidden">
        
        <div className="p-4 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
          <div className="relative max-w-sm w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search packages..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-sm bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all text-slate-800 dark:text-slate-100"
            />
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Showing {filteredPackages.length} packages
          </div>
        </div>

        {filteredPackages.length === 0 ? (
          <div className="p-12 text-center flex flex-col items-center justify-center">
            <Briefcase className="w-12 h-12 text-gray-300 mb-3" />
            <h3 className="text-base font-semibold text-gray-950 dark:text-white">No packages found</h3>
            <p className="text-sm text-gray-500 max-w-xs mt-1 mb-4">Add your diagnostic panels here.</p>
            <button onClick={openAddModal} className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold rounded-lg cursor-pointer">
              Add First Package
            </button>
          </div>
        ) : (
          <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPackages.map((pkg) => (
              <div key={pkg.id} className="border border-gray-200 dark:border-gray-800 rounded-xl p-5 flex flex-col justify-between bg-slate-50/50 dark:bg-slate-950/20 relative">
                <div>
                  <div className="flex justify-between items-start gap-2 mb-3">
                    <h4 className="font-extrabold text-slate-800 dark:text-white text-sm line-clamp-1">{pkg.name}</h4>
                    {pkg.tag && <span className="bg-teal-550/10 text-teal-600 dark:text-teal-400 px-2 py-0.5 rounded-md text-[9px] font-black uppercase tracking-wider">{pkg.tag}</span>}
                  </div>
                  <p className="text-xs text-[#2563eb] font-bold mb-2">📋 {pkg.parameters}</p>
                  <p className="text-[11px] text-gray-500 dark:text-gray-400 line-clamp-3 bg-white dark:bg-gray-900 p-2 border border-gray-100 dark:border-gray-800 rounded-lg">{pkg.includes}</p>
                </div>

                <div className="mt-4 pt-3 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between">
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-base font-black text-slate-900 dark:text-white">₹{pkg.price}</span>
                    <span className="text-xs text-slate-400 line-through">₹{pkg.old_price}</span>
                  </div>

                  <div className="flex gap-2">
                    <button 
                      onClick={() => openEditModal(pkg)}
                      className="p-1.5 text-slate-500 hover:text-teal-600 dark:hover:text-teal-400 hover:bg-slate-100 dark:hover:bg-gray-800 rounded-md transition-colors cursor-pointer"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button 
                      onClick={() => handleDelete(pkg.id)}
                      className="p-1.5 text-slate-500 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/20 rounded-md transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/55 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
          <div className="bg-white dark:bg-gray-900 rounded-2xl max-w-lg w-full shadow-2xl border border-gray-150 dark:border-gray-800 overflow-hidden">
            <div className="p-6 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
              <h3 className="text-base font-bold text-gray-900 dark:text-white">
                {editingId ? "Edit Health Package" : "Add Health Package"}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="p-2 text-gray-400 hover:text-gray-600 rounded-lg">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">Package Name</label>
                <input 
                  type="text" 
                  required
                  value={name} 
                  onChange={(e) => setName(e.target.value)} 
                  placeholder="Q-Screen Diabetes Package" 
                  className="w-full px-3.5 py-2.5 text-sm bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">Offer Price (₹)</label>
                  <input 
                    type="number" 
                    required
                    value={price} 
                    onChange={(e) => setPrice(e.target.value)} 
                    placeholder="1900" 
                    className="w-full px-3.5 py-2.5 text-sm bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">Original Price (₹)</label>
                  <input 
                    type="number" 
                    required
                    value={oldPrice} 
                    onChange={(e) => setOldPrice(e.target.value)} 
                    placeholder="4960" 
                    className="w-full px-3.5 py-2.5 text-sm bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">Parameters Covered</label>
                  <input 
                    type="text" 
                    value={parameters} 
                    onChange={(e) => setParameters(e.target.value)} 
                    placeholder="15+ Parameters" 
                    className="w-full px-3.5 py-2.5 text-sm bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">Category Tag</label>
                  <input 
                    type="text" 
                    value={tag} 
                    onChange={(e) => setTag(e.target.value)} 
                    placeholder="DIABETES" 
                    className="w-full px-3.5 py-2.5 text-sm bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">Includes (Comma separated list of tests)</label>
                <textarea 
                  rows={3}
                  value={includes} 
                  onChange={(e) => setIncludes(e.target.value)} 
                  placeholder="FBS, HbA1c, eAG, Lipid Profile..." 
                  className="w-full px-3.5 py-2.5 text-sm bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-teal-500 resize-none"
                ></textarea>
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
                  Save Package
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}

"use client";

import React, { useState, useEffect } from "react";
import { Megaphone, Plus, Search, Edit2, Trash2, X, Check, ToggleLeft, ToggleRight } from "lucide-react";
import { cmsStore } from "@/lib/cmsStore";

export default function MarketingAdminPage() {
  const [coupons, setCoupons] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form states
  const [code, setCode] = useState("");
  const [discount, setDiscount] = useState("");
  const [type, setType] = useState("Percentage");
  const [active, setActive] = useState(true);

  useEffect(() => {
    const refreshData = () => {
      setCoupons(cmsStore.getAll("marketing"));
    };
    refreshData();
    window.addEventListener("cms-update", refreshData);
    return () => window.removeEventListener("cms-update", refreshData);
  }, []);

  const openAddModal = () => {
    setEditingId(null);
    setCode("");
    setDiscount("10% OFF");
    setType("Percentage");
    setActive(true);
    setIsModalOpen(true);
  };

  const openEditModal = (coupon: any) => {
    setEditingId(coupon.id);
    setCode(coupon.code);
    setDiscount(coupon.discount);
    setType(coupon.type);
    setActive(coupon.active);
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!code || !discount) return;

    const payload = { code: code.toUpperCase(), discount, type, active };

    if (editingId) {
      cmsStore.updateItem("marketing", editingId, payload);
    } else {
      cmsStore.addItem("marketing", payload);
    }
    setIsModalOpen(false);
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this coupon?")) {
      cmsStore.deleteItem("marketing", id);
    }
  };

  const toggleCouponStatus = (coupon: any) => {
    cmsStore.updateItem("marketing", coupon.id, { active: !coupon.active });
  };

  const filtered = coupons.filter(coupon =>
    coupon.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
    coupon.discount.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <Megaphone className="w-6 h-6 text-teal-600 dark:text-teal-400" />
            Marketing & Coupons
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Configure active promotional discounts and BOGO test offers.</p>
        </div>
        
        <button 
          onClick={openAddModal}
          className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-lg transition-colors flex items-center gap-2 text-sm font-medium shadow-sm cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          Create Promo
        </button>
      </div>

      {/* Grid */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-150 dark:border-gray-800 shadow-sm overflow-hidden">
        
        <div className="p-4 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
          <div className="relative max-w-sm w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search coupon codes..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-sm bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all text-slate-800 dark:text-slate-100"
            />
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="p-12 text-center text-gray-400">No campaigns found.</div>
        ) : (
          <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((c) => (
              <div key={c.id} className="border border-gray-150 dark:border-gray-800 rounded-xl p-5 flex flex-col justify-between bg-slate-50/50 dark:bg-slate-950/20 relative">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-mono font-black text-sm tracking-wider text-teal-700 dark:text-teal-400 bg-white dark:bg-gray-900 border border-teal-100 px-3 py-1 rounded-lg">
                      {c.code}
                    </span>
                    <button onClick={() => toggleCouponStatus(c)} className="cursor-pointer">
                      {c.active ? (
                        <ToggleRight className="w-8 h-8 text-emerald-600" />
                      ) : (
                        <ToggleLeft className="w-8 h-8 text-gray-300" />
                      )}
                    </button>
                  </div>
                  <h4 className="font-extrabold text-slate-800 dark:text-white text-base mt-2">{c.discount}</h4>
                  <p className="text-xs text-gray-400 mt-1">Campaign Type: {c.type}</p>
                </div>

                <div className="mt-6 pt-3 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between">
                  <span className="text-[10px] text-gray-400 font-mono">ID: {c.id}</span>

                  <div className="flex gap-2">
                    <button 
                      onClick={() => openEditModal(c)}
                      className="p-1.5 text-slate-400 hover:text-teal-600 rounded-md cursor-pointer"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button 
                      onClick={() => handleDelete(c.id)}
                      className="p-1.5 text-slate-400 hover:text-red-600 rounded-md cursor-pointer"
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

      {/* Editor Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/55 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
          <div className="bg-white dark:bg-gray-900 rounded-2xl max-w-md w-full shadow-2xl border border-gray-150 dark:border-gray-800 overflow-hidden">
            <div className="p-6 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
              <h3 className="text-base font-bold text-gray-900 dark:text-white">
                {editingId ? "Edit Promo Code" : "Create Promo Code"}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="p-2 text-gray-400 hover:text-gray-650 rounded-lg">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">Coupon Promo Code (uppercase)</label>
                <input 
                  type="text" 
                  required
                  value={code} 
                  onChange={(e) => setCode(e.target.value)} 
                  placeholder="QXLHEALTH50" 
                  className="w-full px-3.5 py-2.5 text-sm bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-teal-500 font-mono tracking-widest uppercase"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">Discount Description</label>
                <input 
                  type="text" 
                  required
                  value={discount} 
                  onChange={(e) => setDiscount(e.target.value)} 
                  placeholder="50% OFF on all lipid panels" 
                  className="w-full px-3.5 py-2.5 text-sm bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">Promo Type</label>
                  <select
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-slate-700 dark:text-slate-350 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  >
                    <option value="Percentage">Percentage</option>
                    <option value="Flat Discount">Flat Discount</option>
                    <option value="Free Test">Free Test</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">Active campaign</label>
                  <select
                    value={active ? "true" : "false"}
                    onChange={(e) => setActive(e.target.value === "true")}
                    className="w-full px-3.5 py-2.5 text-sm bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-slate-700 dark:text-slate-350 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  >
                    <option value="true">Active (Live)</option>
                    <option value="false">Inactive</option>
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
                  Save Campaign
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}

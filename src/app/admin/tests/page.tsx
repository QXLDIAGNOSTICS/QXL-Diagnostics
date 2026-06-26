"use client";

import React, { useState, useEffect } from "react";
import { Activity, Plus, Search, Trash2, Edit2, X, FlaskConical, Hourglass } from "lucide-react";
import { cmsStore } from "@/lib/cmsStore";

export default function TestsPage() {
  const [tests, setTests] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form states
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [oldPrice, setOldPrice] = useState("");
  const [parameters, setParameters] = useState("Single Parameter");
  const [sampleType, setSampleType] = useState("Blood / Serum");
  const [reportTime, setReportTime] = useState("12 Hours");

  useEffect(() => {
    const refreshData = () => {
      setTests(cmsStore.getAll("tests"));
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
    setParameters("Single Parameter");
    setSampleType("Blood / Serum");
    setReportTime("12 Hours");
    setIsModalOpen(true);
  };

  const openEditModal = (tst: any) => {
    setEditingId(tst.id);
    setName(tst.name);
    setPrice(tst.price);
    setOldPrice(tst.old_price);
    setParameters(tst.parameters);
    setSampleType(tst.sampleType || "Blood / Serum");
    setReportTime(tst.reportTime || "12 Hours");
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !price || !oldPrice) return;

    const payload = {
      name: name.toUpperCase(),
      price,
      old_price: oldPrice,
      parameters,
      sampleType,
      reportTime
    };

    if (editingId) {
      cmsStore.updateItem("tests", editingId, payload);
    } else {
      cmsStore.addItem("tests", payload);
    }
    setIsModalOpen(false);
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this test?")) {
      cmsStore.deleteItem("tests", id);
    }
  };

  const filtered = tests.filter(t => 
    t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.parameters.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <Activity className="w-6 h-6 text-teal-600 dark:text-teal-400" />
            Lab Tests Catalog
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Manage individual tests, sample requirements, turnaround times, and catalog prices.</p>
        </div>
        
        <button 
          onClick={openAddModal}
          className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-lg transition-colors flex items-center gap-2 text-sm font-medium shadow-sm cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          Add Lab Test
        </button>
      </div>

      {/* Main Card */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-150 dark:border-gray-800 shadow-sm overflow-hidden">
        
        <div className="p-4 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
          <div className="relative max-w-sm w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search tests catalog..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-sm bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all text-slate-800 dark:text-slate-100"
            />
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Showing {filtered.length} tests
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="p-12 text-center flex flex-col items-center justify-center">
            <Activity className="w-12 h-12 text-gray-300 mb-3" />
            <h3 className="text-base font-semibold text-gray-955 dark:text-white">No tests found</h3>
            <p className="text-sm text-gray-500 max-w-xs mt-1 mb-4">Add your diagnostic lab tests here.</p>
            <button onClick={openAddModal} className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold rounded-lg cursor-pointer">
              Add First Test
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-slate-800 dark:text-slate-200">
              <thead>
                <tr className="bg-slate-50/50 dark:bg-slate-950/20 text-gray-400 uppercase text-[10px] font-black tracking-wider border-b border-gray-100 dark:border-gray-800">
                  <th className="px-6 py-4">Test Name</th>
                  <th className="px-6 py-4">Parameters</th>
                  <th className="px-6 py-4">Sample Required</th>
                  <th className="px-6 py-4">Turnaround Time</th>
                  <th className="px-6 py-4">Catalog Pricing</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800 text-xs">
                {filtered.map((tst) => (
                  <tr key={tst.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-950/10">
                    <td className="px-6 py-4 font-extrabold text-slate-900 dark:text-white">{tst.name}</td>
                    <td className="px-6 py-4 font-bold text-teal-650 dark:text-teal-400">{tst.parameters}</td>
                    <td className="px-6 py-4 font-medium flex items-center gap-1.5 mt-2">
                      <FlaskConical className="w-3.5 h-3.5 text-gray-450" />
                      {tst.sampleType || "Blood / Serum"}
                    </td>
                    <td className="px-6 py-4 font-medium">
                      <span className="inline-flex items-center gap-1">
                        <Hourglass className="w-3.5 h-3.5 text-slate-450" />
                        {tst.reportTime || "12 Hours"}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-black">
                      <div className="flex items-baseline gap-1.5">
                        <span className="text-slate-905 dark:text-white font-extrabold">₹{tst.price}</span>
                        <span className="text-gray-400 line-through text-[10px]">₹{tst.old_price}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right flex items-center justify-end gap-1.5 mt-1">
                      <button 
                        onClick={() => openEditModal(tst)}
                        className="p-1.5 text-slate-500 hover:text-teal-650 hover:bg-slate-100 rounded-md cursor-pointer"
                        title="Edit Test"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleDelete(tst.id)}
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
                {editingId ? "Edit Laboratory Test" : "Add Laboratory Test"}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="p-2 text-gray-400 hover:text-gray-600 rounded-lg">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">Test Name</label>
                <input 
                  type="text" 
                  required
                  value={name} 
                  onChange={(e) => setName(e.target.value)} 
                  placeholder="COMPLETE BLOOD COUNT (CBC)" 
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
                    placeholder="395" 
                    className="w-full px-3.5 py-2.5 text-sm bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-slate-800 dark:text-slate-100 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">Original Price (₹)</label>
                  <input 
                    type="number" 
                    required
                    value={oldPrice} 
                    onChange={(e) => setOldPrice(e.target.value)} 
                    placeholder="527" 
                    className="w-full px-3.5 py-2.5 text-sm bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-slate-800 dark:text-slate-100 focus:outline-none"
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
                    placeholder="24 Parameters" 
                    className="w-full px-3.5 py-2.5 text-sm bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-slate-800 dark:text-slate-100 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">Sample type</label>
                  <input 
                    type="text" 
                    value={sampleType} 
                    onChange={(e) => setSampleType(e.target.value)} 
                    placeholder="Blood / Serum" 
                    className="w-full px-3.5 py-2.5 text-sm bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-slate-800 dark:text-slate-100 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">Report Delivery Time</label>
                <input 
                  type="text" 
                  value={reportTime} 
                  onChange={(e) => setReportTime(e.target.value)} 
                  placeholder="12 Hours" 
                  className="w-full px-3.5 py-2.5 text-sm bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-slate-800 dark:text-slate-100 focus:outline-none"
                />
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
                  Save Test
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}

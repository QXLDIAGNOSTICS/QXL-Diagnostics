"use client";

import React, { useState, useEffect } from "react";
import { Truck, Plus, Search, Trash2, Edit2, X, Check, MapPin, Calendar } from "lucide-react";
import { cmsStore } from "@/lib/cmsStore";

export default function HomeCollectionPage() {
  const [homeCollections, setHomeCollections] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form states
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [tests, setTests] = useState("");
  const [date, setDate] = useState("");
  const [status, setStatus] = useState("Scheduled");

  useEffect(() => {
    const refreshData = () => {
      setHomeCollections(cmsStore.getAll("homeCollection"));
    };
    refreshData();
    window.addEventListener("cms-update", refreshData);
    return () => window.removeEventListener("cms-update", refreshData);
  }, []);

  const openAddModal = () => {
    setEditingId(null);
    setName("");
    setPhone("");
    setAddress("");
    setTests("Lipid Profile, HbA1c");
    setDate(new Date().toISOString().split("T")[0]);
    setStatus("Scheduled");
    setIsModalOpen(true);
  };

  const openEditModal = (hc: any) => {
    setEditingId(hc.id);
    setName(hc.name);
    setPhone(hc.phone);
    setAddress(hc.address);
    setTests(hc.tests);
    setDate(hc.date);
    setStatus(hc.status);
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !address) return;

    const payload = {
      name,
      phone,
      address,
      tests,
      date,
      status
    };

    if (editingId) {
      cmsStore.updateItem("homeCollection", editingId, payload);
    } else {
      cmsStore.addItem("homeCollection", payload);
    }
    setIsModalOpen(false);
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this home collection request?")) {
      cmsStore.deleteItem("homeCollection", id);
    }
  };

  const updateStatus = (id: string, nextStatus: string) => {
    cmsStore.updateItem("homeCollection", id, { status: nextStatus });
  };

  const filtered = homeCollections.filter(hc => 
    hc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    hc.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
    hc.tests.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <Truck className="w-6 h-6 text-teal-600 dark:text-teal-400" />
            Home Collections
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Coordinate phlebotomist visits, sample collections, patient addresses, and update processing statuses.</p>
        </div>
        
        <button 
          onClick={openAddModal}
          className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-lg transition-colors flex items-center gap-2 text-sm font-medium shadow-sm cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          Schedule collection
        </button>
      </div>

      {/* Main Table */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-150 dark:border-gray-800 shadow-sm overflow-hidden">
        
        <div className="p-4 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
          <div className="relative max-w-sm w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search address or patient..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-sm bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all text-slate-800 dark:text-slate-100"
            />
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Showing {filtered.length} scheduled visits
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="p-12 text-center flex flex-col items-center justify-center">
            <Truck className="w-12 h-12 text-gray-300 mb-3" />
            <h3 className="text-base font-semibold text-gray-955 dark:text-white">No collections scheduled</h3>
            <p className="text-sm text-gray-500 max-w-xs mt-1 mb-4">Add your home visits coordinator data here.</p>
            <button onClick={openAddModal} className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold rounded-lg cursor-pointer">
              Schedule First Visit
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-slate-800 dark:text-slate-200">
              <thead>
                <tr className="bg-slate-50/50 dark:bg-slate-950/20 text-gray-400 uppercase text-[10px] font-black tracking-wider border-b border-gray-100 dark:border-gray-800">
                  <th className="px-6 py-4">Patient & Phone</th>
                  <th className="px-6 py-4">Visit Address</th>
                  <th className="px-6 py-4">Required Tests</th>
                  <th className="px-6 py-4">Schedule Date</th>
                  <th className="px-6 py-4">Collection Status</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800 text-xs">
                {filtered.map((hc) => (
                  <tr key={hc.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-950/10">
                    <td className="px-6 py-4 font-extrabold text-slate-900 dark:text-white">
                      <div>{hc.name}</div>
                      <div className="text-[10px] text-gray-450 dark:text-gray-500 mt-0.5">{hc.phone}</div>
                    </td>
                    <td className="px-6 py-4 font-medium text-slate-650 dark:text-slate-300">
                      <div className="flex items-center gap-1.5 max-w-[200px] truncate">
                        <MapPin className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                        {hc.address}
                      </div>
                    </td>
                    <td className="px-6 py-4 font-bold text-teal-650 dark:text-teal-400">{hc.tests}</td>
                    <td className="px-6 py-4 font-medium flex items-center gap-1.5 mt-2">
                      <Calendar className="w-3.5 h-3.5 text-gray-400" />
                      {hc.date}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-black uppercase ${
                        hc.status === "Completed" ? "bg-emerald-100 text-emerald-700" :
                        hc.status === "Cancelled" ? "bg-red-100 text-red-700" :
                        "bg-orange-100 text-orange-700"
                      }`}>
                        {hc.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right flex items-center justify-end gap-1.5 mt-1.5">
                      {hc.status !== "Completed" && (
                        <button 
                          onClick={() => updateStatus(hc.id, "Completed")}
                          className="p-1.5 text-emerald-600 hover:bg-emerald-50 rounded-md cursor-pointer"
                          title="Complete collection"
                        >
                          <Check className="w-4 h-4" />
                        </button>
                      )}
                      <button 
                        onClick={() => openEditModal(hc)}
                        className="p-1.5 text-slate-500 hover:text-teal-650 hover:bg-slate-100 rounded-md cursor-pointer"
                        title="Edit Details"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleDelete(hc.id)}
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
                {editingId ? "Edit Collection details" : "Schedule collection details"}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="p-2 text-gray-400 hover:text-gray-650 rounded-lg">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">Patient Name</label>
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
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">Contact Phone</label>
                <input 
                  type="tel" 
                  required
                  value={phone} 
                  onChange={(e) => setPhone(e.target.value)} 
                  placeholder="9911882277" 
                  className="w-full px-3.5 py-2.5 text-sm bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-slate-800 dark:text-slate-100 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">Full Home Address</label>
                <input 
                  type="text" 
                  required
                  value={address} 
                  onChange={(e) => setAddress(e.target.value)} 
                  placeholder="Flat 402, Oakwood Apts, Indiranagar, Bengaluru" 
                  className="w-full px-3.5 py-2.5 text-sm bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-slate-800 dark:text-slate-100 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">Requested Tests</label>
                <input 
                  type="text" 
                  required
                  value={tests} 
                  onChange={(e) => setTests(e.target.value)} 
                  placeholder="HbA1c, Lipid Profile" 
                  className="w-full px-3.5 py-2.5 text-sm bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-slate-800 dark:text-slate-100 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">Visit Date</label>
                  <input 
                    type="date" 
                    required
                    value={date} 
                    onChange={(e) => setDate(e.target.value)} 
                    className="w-full px-3.5 py-2.5 text-sm bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-slate-800 dark:text-slate-100 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">Status</label>
                  <select 
                    value={status} 
                    onChange={(e) => setStatus(e.target.value)} 
                    className="w-full px-3.5 py-2.5 text-sm bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-slate-655 dark:text-slate-100 focus:outline-none"
                  >
                    <option value="Scheduled">Scheduled</option>
                    <option value="Completed">Completed</option>
                    <option value="Cancelled">Cancelled</option>
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
                  Save Schedule
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}

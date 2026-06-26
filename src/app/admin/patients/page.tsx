"use client";

import React, { useState, useEffect } from "react";
import { Users, Plus, Search, Trash2, Edit2, X, Mail, Phone, UserRound } from "lucide-react";
import { cmsStore } from "@/lib/cmsStore";

export default function PatientsPage() {
  const [patients, setPatients] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form states
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("Male");
  const [age, setAge] = useState("");

  useEffect(() => {
    const refreshData = () => {
      setPatients(cmsStore.getAll("patients"));
    };
    refreshData();
    window.addEventListener("cms-update", refreshData);
    return () => window.removeEventListener("cms-update", refreshData);
  }, []);

  const openAddModal = () => {
    setEditingId(null);
    setName("");
    setPhone("");
    setEmail("");
    setGender("Male");
    setAge("");
    setIsModalOpen(true);
  };

  const openEditModal = (pat: any) => {
    setEditingId(pat.id);
    setName(pat.name);
    setPhone(pat.phone);
    setEmail(pat.email);
    setGender(pat.gender || "Male");
    setAge(pat.age?.toString() || "");
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !email) return;

    const payload = {
      name,
      phone,
      email,
      gender,
      age: Number(age) || 30
    };

    if (editingId) {
      cmsStore.updateItem("patients", editingId, payload);
    } else {
      cmsStore.addItem("patients", payload);
    }
    setIsModalOpen(false);
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this patient profile?")) {
      cmsStore.deleteItem("patients", id);
    }
  };

  const filtered = patients.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.phone.includes(searchQuery) ||
    p.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <Users className="w-6 h-6 text-teal-600 dark:text-teal-400" />
            Patients Registry
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Manage demographic profiles, emails, phone lists, and laboratory visit logs.</p>
        </div>
        
        <button 
          onClick={openAddModal}
          className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-lg transition-colors flex items-center gap-2 text-sm font-medium shadow-sm cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          Register Patient
        </button>
      </div>

      {/* Main Table */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-150 dark:border-gray-800 shadow-sm overflow-hidden">
        
        <div className="p-4 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
          <div className="relative max-w-sm w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search patients registry..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-sm bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all text-slate-800 dark:text-slate-100"
            />
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Showing {filtered.length} patients
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="p-12 text-center flex flex-col items-center justify-center">
            <Users className="w-12 h-12 text-gray-300 mb-3" />
            <h3 className="text-base font-semibold text-gray-955 dark:text-white">No patients found</h3>
            <p className="text-sm text-gray-500 max-w-xs mt-1 mb-4">Register your first patient here.</p>
            <button onClick={openAddModal} className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold rounded-lg cursor-pointer">
              Register First Patient
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-slate-800 dark:text-slate-200">
              <thead>
                <tr className="bg-slate-50/50 dark:bg-slate-950/20 text-gray-400 uppercase text-[10px] font-black tracking-wider border-b border-gray-100 dark:border-gray-800">
                  <th className="px-6 py-4">Patient Name</th>
                  <th className="px-6 py-4">Age / Gender</th>
                  <th className="px-6 py-4">Contact Phone</th>
                  <th className="px-6 py-4">Email Address</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800 text-xs">
                {filtered.map((pat) => (
                  <tr key={pat.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-950/10">
                    <td className="px-6 py-4 font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-slate-100 dark:bg-gray-800 flex items-center justify-center text-slate-500">
                        <UserRound className="w-4 h-4" />
                      </div>
                      {pat.name}
                    </td>
                    <td className="px-6 py-4 font-bold">
                      <span className="bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded-md text-[10px]">
                        {pat.age} yrs / {pat.gender || "Male"}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-medium flex items-center gap-1.5 mt-1">
                      <Phone className="w-3.5 h-3.5 text-gray-450" />
                      {pat.phone}
                    </td>
                    <td className="px-6 py-4 font-medium flex items-center gap-1.5 mt-1">
                      <Mail className="w-3.5 h-3.5 text-gray-450" />
                      {pat.email}
                    </td>
                    <td className="px-6 py-4 text-right flex items-center justify-end gap-1.5">
                      <button 
                        onClick={() => openEditModal(pat)}
                        className="p-1.5 text-slate-500 hover:text-teal-650 hover:bg-slate-100 rounded-md cursor-pointer"
                        title="Edit Patient Info"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleDelete(pat.id)}
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
                {editingId ? "Edit Patient Details" : "Register New Patient"}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="p-2 text-gray-400 hover:text-gray-605 rounded-lg">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">Full Name</label>
                <input 
                  type="text" 
                  required
                  value={name} 
                  onChange={(e) => setName(e.target.value)} 
                  placeholder="Rahul Verma" 
                  className="w-full px-3.5 py-2.5 text-sm bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">Age (Years)</label>
                  <input 
                    type="number" 
                    required
                    value={age} 
                    onChange={(e) => setAge(e.target.value)} 
                    placeholder="34" 
                    className="w-full px-3.5 py-2.5 text-sm bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-slate-800 dark:text-slate-100 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">Gender</label>
                  <select 
                    value={gender} 
                    onChange={(e) => setGender(e.target.value)} 
                    className="w-full px-3.5 py-2.5 text-sm bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-slate-600 dark:text-slate-100 focus:outline-none"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">Contact Phone</label>
                <input 
                  type="tel" 
                  required
                  value={phone} 
                  onChange={(e) => setPhone(e.target.value)} 
                  placeholder="9876543210" 
                  className="w-full px-3.5 py-2.5 text-sm bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-slate-800 dark:text-slate-100 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">Email Address</label>
                <input 
                  type="email" 
                  required
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                  placeholder="rahul@gmail.com" 
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
                  Save Profile
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}

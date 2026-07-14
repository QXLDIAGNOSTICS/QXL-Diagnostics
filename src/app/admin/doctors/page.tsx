"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Stethoscope, Plus, Search, Edit2, Trash2, X, Loader2 } from "lucide-react";
import { api, type Doctor } from "@/lib/api";
import ImageUploadField from "@/components/admin/ImageUploadField";

export default function DoctorsAdminPage() {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form states
  const [name, setName] = useState("");
  const [qual, setQual] = useState("");
  const [image, setImage] = useState("");

  const refreshData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const items = await api.doctors.adminList(200, 0);
      setDoctors(items);
    } catch {
      setError("Failed to load doctors.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshData();
  }, [refreshData]);

  const openAddModal = () => {
    setEditingId(null);
    setName("");
    setQual("");
    setImage("/image/dr_pritilata_v4.jpg");
    setIsModalOpen(true);
  };

  const openEditModal = (doc: Doctor) => {
    setEditingId(doc.id);
    setName(doc.name);
    setQual(doc.qualification || "");
    setImage(doc.image_url || "");
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !qual) return;

    setSaving(true);
    setError(null);
    try {
      if (editingId) {
        await api.doctors.update(editingId, {
          name,
          qualification: qual,
          image_url: image,
        });
      } else {
        await api.doctors.create({
          name,
          qualification: qual,
          image_url: image,
          is_active: true,
        });
      }
      setIsModalOpen(false);
      await refreshData();
    } catch {
      setError("Failed to save the doctor profile.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this doctor profile?")) return;
    try {
      await api.doctors.remove(id);
      await refreshData();
    } catch {
      setError("Failed to delete the doctor profile.");
    }
  };

  const filteredDoctors = doctors.filter(doc =>
    doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (doc.qualification || "").toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <Stethoscope className="w-6 h-6 text-teal-600 dark:text-teal-400" />
            Doctors Management
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Manage the medical experts shown on your homepage.</p>
        </div>
        
        <button 
          onClick={openAddModal}
          className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-lg transition-colors flex items-center gap-2 text-sm font-medium shadow-sm cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          Add Expert
        </button>
      </div>

      {error && (
        <div className="p-3 rounded-lg bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900 text-red-600 dark:text-red-400 text-sm">
          {error}
        </div>
      )}

      {/* Main Grid */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-150 dark:border-gray-800 shadow-sm overflow-hidden">
        
        <div className="p-4 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
          <div className="relative max-w-sm w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search doctors..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-sm bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all text-slate-800 dark:text-slate-100"
            />
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Showing {filteredDoctors.length} doctors
          </div>
        </div>

        {loading ? (
          <div className="p-12 flex items-center justify-center text-gray-400">
            <Loader2 className="w-6 h-6 animate-spin" />
          </div>
        ) : filteredDoctors.length === 0 ? (
          <div className="p-12 text-center flex flex-col items-center justify-center">
            <Stethoscope className="w-12 h-12 text-gray-300 dark:text-gray-600 mb-3" />
            <h3 className="text-base font-semibold text-gray-950 dark:text-white">No doctors found</h3>
            <p className="text-sm text-gray-500 max-w-xs mt-1 mb-4">Add experts to build your diagnostic review board.</p>
            <button onClick={openAddModal} className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold rounded-lg cursor-pointer">
              Add First Expert
            </button>
          </div>
        ) : (
          <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredDoctors.map((doc) => (
              <div key={doc.id} className="border border-gray-100 dark:border-gray-800 rounded-xl p-4 flex flex-col items-center text-center bg-slate-50/50 dark:bg-slate-950/20 relative group">
                <div className="w-32 h-32 rounded-full overflow-hidden bg-teal-50 dark:bg-teal-950/20 flex items-center justify-center mb-4 border border-gray-100 dark:border-gray-800">
                  <img src={doc.image_url || ""} alt={doc.name} className="w-full h-full object-cover" />
                </div>
                <h4 className="font-extrabold text-slate-800 dark:text-white text-sm line-clamp-1">{doc.name}</h4>
                <p className="text-xs text-teal-600 dark:text-teal-400 font-bold mt-1 uppercase tracking-wider">{doc.qualification}</p>
                <p className="text-[10px] text-gray-400 mt-0.5">ID: {doc.id}</p>

                <div className="flex gap-2 mt-4 pt-3 border-t border-gray-100 dark:border-gray-800 w-full justify-center opacity-100">
                  <button 
                    onClick={() => openEditModal(doc)}
                    className="p-1.5 text-slate-500 hover:text-teal-600 dark:hover:text-teal-400 hover:bg-slate-100 dark:hover:bg-gray-800 rounded-md transition-colors cursor-pointer"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button 
                    onClick={() => handleDelete(doc.id)}
                    className="p-1.5 text-slate-500 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/20 rounded-md transition-colors cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
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
                {editingId ? "Edit Doctor Profile" : "Add Doctor Profile"}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="p-2 text-gray-400 hover:text-gray-600 rounded-lg">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">Doctor Name</label>
                <input 
                  type="text" 
                  required
                  value={name} 
                  onChange={(e) => setName(e.target.value)} 
                  placeholder="Dr. Pritilata Rout" 
                  className="w-full px-3.5 py-2.5 text-sm bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">Qualifications / Specialty</label>
                <input 
                  type="text" 
                  required
                  value={qual} 
                  onChange={(e) => setQual(e.target.value)} 
                  placeholder="MD, PATHOLOGY" 
                  className="w-full px-3.5 py-2.5 text-sm bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <ImageUploadField
                label="Profile Image"
                value={image}
                onChange={setImage}
                required
                placeholder="/image/dr_pritilata_v4.jpg"
              />

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
                  disabled={saving}
                  className="px-5 py-2 bg-teal-600 hover:bg-teal-700 disabled:opacity-60 text-white rounded-lg text-xs font-medium shadow-sm cursor-pointer flex items-center gap-2"
                >
                  {saving && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
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

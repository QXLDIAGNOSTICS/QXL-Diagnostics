"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Stethoscope, Plus, Search, Edit2, Trash2, X, Loader2 } from "lucide-react";
import { api, type Doctor } from "@/lib/api";
import ImageUploadField from "@/components/admin/ImageUploadField";

interface DoctorForm {
  name: string;
  qualification: string;
  image_url: string;
  is_active: boolean;
  sort_order: string;
  bio: string;
  title: string;
  is_founder: boolean;
  experience: string;
  expertise: string;
  achievements: string;
  contribution: string;
  department: string;
  registration_number: string;
  profile_path: string;
  image_position: string;
  card_qualification: string;
  card_image_url: string;
  short_title: string;
}

const DEFAULT_PHOTO =
  "https://res.cloudinary.com/btjglif5/image/upload/v1784150144/Assets-QXL/legacy-assets/image/dr_pritilata_v4.png";

const emptyDoctorForm = (): DoctorForm => ({
  name: "", qualification: "", image_url: DEFAULT_PHOTO, is_active: true, sort_order: "0", bio: "", title: "",
  is_founder: false, experience: "", expertise: "", achievements: "", contribution: "", department: "",
  registration_number: "", profile_path: "", image_position: "", card_qualification: "", card_image_url: "", short_title: "",
});

const doctorToForm = (d: Doctor): DoctorForm => ({
  name: d.name,
  qualification: d.qualification || "",
  image_url: d.image_url || "",
  is_active: d.is_active,
  sort_order: String(d.sort_order),
  bio: d.bio || "",
  title: d.title || "",
  is_founder: d.is_founder,
  experience: d.experience || "",
  expertise: d.expertise || "",
  achievements: d.achievements || "",
  contribution: d.contribution || "",
  department: d.department || "",
  registration_number: d.registration_number || "",
  profile_path: d.profile_path || "",
  image_position: d.image_position || "",
  card_qualification: d.card_qualification || "",
  card_image_url: d.card_image_url || "",
  short_title: d.short_title || "",
});

// Empty strings (not null) so a cleared field really clears it: the API keeps a field when it gets null.
const doctorPayload = (f: DoctorForm) => ({
  name: f.name.trim(),
  qualification: f.qualification.trim(),
  image_url: f.image_url.trim(),
  is_active: f.is_active,
  sort_order: Number.isNaN(Number(f.sort_order)) ? 0 : Math.round(Number(f.sort_order)),
  bio: f.bio.trim(),
  title: f.title.trim(),
  is_founder: f.is_founder,
  experience: f.experience.trim(),
  expertise: f.expertise.trim(),
  achievements: f.achievements.trim(),
  contribution: f.contribution.trim(),
  department: f.department.trim(),
  registration_number: f.registration_number.trim(),
  profile_path: f.profile_path.trim(),
  image_position: f.image_position.trim(),
  card_qualification: f.card_qualification.trim(),
  card_image_url: f.card_image_url.trim(),
  short_title: f.short_title.trim(),
});

const inputCls =
  "w-full px-3.5 py-2.5 text-sm bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-sky-500";
const labelCls = "block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1";

export default function DoctorsAdminPage() {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form state
  const [form, setForm] = useState<DoctorForm>(emptyDoctorForm());
  const set = <K extends keyof DoctorForm>(key: K, value: DoctorForm[K]) => setForm((f) => ({ ...f, [key]: value }));

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
    setForm(emptyDoctorForm());
    setIsModalOpen(true);
  };

  const openEditModal = (doc: Doctor) => {
    setEditingId(doc.id);
    setForm(doctorToForm(doc));
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.qualification) return;

    setSaving(true);
    setError(null);
    try {
      const payload = doctorPayload(form);
      if (editingId) {
        await api.doctors.update(editingId, payload);
      } else {
        await api.doctors.create(payload);
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
            <Stethoscope className="w-6 h-6 text-sky-600 dark:text-sky-400" />
            Doctors Management
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Manage the medical experts shown on your homepage.</p>
        </div>
        
        <button 
          onClick={openAddModal}
          className="px-4 py-2 bg-sky-600 hover:bg-sky-700 text-white rounded-lg transition-colors flex items-center gap-2 text-sm font-medium shadow-sm cursor-pointer"
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
              className="w-full pl-9 pr-4 py-2 text-sm bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 transition-all text-slate-800 dark:text-slate-100"
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
            <button onClick={openAddModal} className="px-4 py-2 bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold rounded-lg cursor-pointer">
              Add First Expert
            </button>
          </div>
        ) : (
          <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredDoctors.map((doc) => (
              <div key={doc.id} className="border border-gray-100 dark:border-gray-800 rounded-xl p-4 flex flex-col items-center text-center bg-slate-50/50 dark:bg-slate-950/20 relative group">
                <div className="w-32 h-32 rounded-full overflow-hidden bg-sky-50 dark:bg-sky-950/20 flex items-center justify-center mb-4 border border-gray-100 dark:border-gray-800">
                  <img src={doc.image_url || ""} alt={doc.name} className="w-full h-full object-cover" />
                </div>
                <h4 className="font-extrabold text-slate-800 dark:text-white text-sm line-clamp-1">{doc.name}</h4>
                <p className="text-xs text-sky-600 dark:text-sky-400 font-bold mt-1 uppercase tracking-wider">{doc.qualification}</p>
                {doc.title && <p className="text-[11px] text-slate-500 mt-0.5">{doc.is_founder ? "★ " : ""}{doc.title}</p>}
                {!doc.is_active && <p className="text-[10px] font-bold text-gray-400 mt-0.5">HIDDEN</p>}
                <p className="text-[10px] text-gray-400 mt-0.5">ID: {doc.id}</p>

                <div className="flex gap-2 mt-4 pt-3 border-t border-gray-100 dark:border-gray-800 w-full justify-center opacity-100">
                  <button 
                    onClick={() => openEditModal(doc)}
                    className="p-1.5 text-slate-500 hover:text-sky-600 dark:hover:text-sky-400 hover:bg-slate-100 dark:hover:bg-gray-800 rounded-md transition-colors cursor-pointer"
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
          <div className="bg-white dark:bg-gray-900 rounded-2xl max-w-2xl w-full shadow-2xl max-h-[92vh] overflow-y-auto border border-gray-150 dark:border-gray-800 overflow-hidden">
            <div className="p-6 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
              <h3 className="text-base font-bold text-gray-900 dark:text-white">
                {editingId ? "Edit Doctor Profile" : "Add Doctor Profile"}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="p-2 text-gray-400 hover:text-gray-600 rounded-lg">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="p-6 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className={labelCls}>Doctor Name</label>
                  <input type="text" required value={form.name} onChange={(e) => set("name", e.target.value)} placeholder="Dr. Pritilata Rout" className={inputCls} />
                </div>
                <div>
                  <label className={labelCls}>Qualifications</label>
                  <input type="text" required value={form.qualification} onChange={(e) => set("qualification", e.target.value)} placeholder="MD (PATHOLOGY), PDF (NEUROPATH)" className={inputCls} />
                </div>
              </div>

              <ImageUploadField
                label="Profile Image"
                value={form.image_url}
                onChange={(v) => set("image_url", v)}
                required
                placeholder={DEFAULT_PHOTO}
              />

              <div className="rounded-xl border border-gray-100 dark:border-gray-800 p-4 space-y-4">
                <div>
                  <h4 className="text-sm font-bold text-gray-800 dark:text-gray-200">Founder &amp; Consultants page</h4>
                  <p className="text-[11px] text-gray-400">A doctor is listed on the website&apos;s Founder &amp; Consultants page once a role is entered below.</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className={labelCls}>Role</label>
                    <input type="text" value={form.title} onChange={(e) => set("title", e.target.value)} placeholder="Senior Consultant Histopathologist" className={inputCls} />
                  </div>
                  <label className="flex items-center gap-2.5 p-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg cursor-pointer self-end">
                    <input type="checkbox" checked={form.is_founder} onChange={(e) => set("is_founder", e.target.checked)} className="w-4 h-4 accent-sky-600" />
                    <span className="text-xs font-bold text-gray-700 dark:text-gray-300">Founder (shown as the featured card)</span>
                  </label>
                  <div>
                    <label className={labelCls}>Experience</label>
                    <input type="text" value={form.experience} onChange={(e) => set("experience", e.target.value)} placeholder="Over 20 years" className={inputCls} />
                  </div>
                  <div>
                    <label className={labelCls}>Department</label>
                    <input type="text" value={form.department} onChange={(e) => set("department", e.target.value)} placeholder="Clinical Biochemistry" className={inputCls} />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className={labelCls}>Full qualifications (this page)</label>
                    <input type="text" value={form.card_qualification} onChange={(e) => set("card_qualification", e.target.value)} placeholder="Leave empty to use the qualifications above" className={inputCls} />
                  </div>
                  <div>
                    <label className={labelCls}>Short role (homepage)</label>
                    <input type="text" value={form.short_title} onChange={(e) => set("short_title", e.target.value)} placeholder="Leave empty to use the role above" className={inputCls} />
                  </div>
                </div>
                <ImageUploadField
                  label="Large photo (this page)"
                  value={form.card_image_url}
                  onChange={(v) => set("card_image_url", v)}
                  placeholder="Leave empty to use the profile image above"
                />
                <div>
                  <label className={labelCls}>Expertise</label>
                  <textarea rows={2} value={form.expertise} onChange={(e) => set("expertise", e.target.value)} className={inputCls} />
                </div>
                <div>
                  <label className={labelCls}>Achievements</label>
                  <textarea rows={2} value={form.achievements} onChange={(e) => set("achievements", e.target.value)} className={inputCls} />
                </div>
                <div>
                  <label className={labelCls}>Contribution to QXL</label>
                  <textarea rows={2} value={form.contribution} onChange={(e) => set("contribution", e.target.value)} className={inputCls} />
                </div>
                <div>
                  <label className={labelCls}>Short biography</label>
                  <textarea rows={3} value={form.bio} onChange={(e) => set("bio", e.target.value)} className={inputCls} />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className={labelCls}>Registration number</label>
                    <input type="text" value={form.registration_number} onChange={(e) => set("registration_number", e.target.value)} placeholder="KMC-12345" className={inputCls} />
                  </div>
                  <div>
                    <label className={labelCls}>Profile page address</label>
                    <input type="text" value={form.profile_path} onChange={(e) => set("profile_path", e.target.value)} placeholder="/dr-ajitha-pillai" className={inputCls} />
                  </div>
                  <div>
                    <label className={labelCls}>Photo focus (CSS position)</label>
                    <input type="text" value={form.image_position} onChange={(e) => set("image_position", e.target.value)} placeholder="center 15%" className={inputCls} />
                  </div>
                  <div>
                    <label className={labelCls}>Display order</label>
                    <input type="number" value={form.sort_order} onChange={(e) => set("sort_order", e.target.value)} className={inputCls} />
                  </div>
                </div>
                <label className="flex items-center gap-2.5 cursor-pointer">
                  <input type="checkbox" checked={form.is_active} onChange={(e) => set("is_active", e.target.checked)} className="w-4 h-4 accent-sky-600" />
                  <span className="text-xs font-bold text-gray-700 dark:text-gray-300">Show on the website</span>
                </label>
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
                  disabled={saving}
                  className="px-5 py-2 bg-sky-600 hover:bg-sky-700 disabled:opacity-60 text-white rounded-lg text-xs font-medium shadow-sm cursor-pointer flex items-center gap-2"
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

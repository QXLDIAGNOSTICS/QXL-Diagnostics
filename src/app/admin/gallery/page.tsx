"use client";

import React, { useState, useEffect } from "react";
import { ImagePlay, Plus, Search, Trash2, X, Link as LinkIcon, Eye } from "lucide-react";
import { cmsStore } from "@/lib/cmsStore";

export default function GalleryPage() {
  const [gallery, setGallery] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Form states
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("Lab Facilities");

  useEffect(() => {
    const refreshData = () => {
      setGallery(cmsStore.getAll("gallery"));
    };
    refreshData();
    window.addEventListener("cms-update", refreshData);
    return () => window.removeEventListener("cms-update", refreshData);
  }, []);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !image) return;

    cmsStore.addItem("gallery", {
      title,
      image,
      category
    });
    
    setIsModalOpen(false);
    setTitle("");
    setImage("");
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this media item?")) {
      cmsStore.deleteItem("gallery", id);
    }
  };

  const filtered = gallery.filter(item => 
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (item.category || "").toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <ImagePlay className="w-6 h-6 text-teal-600 dark:text-teal-400" />
            Media Gallery
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Manage public photos of laboratory equipment, diagnostic chambers, and advisory board milestones.</p>
        </div>
        
        <button 
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-lg transition-colors flex items-center gap-2 text-sm font-medium shadow-sm cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          Add Media
        </button>
      </div>

      {/* Action Bar */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-150 dark:border-gray-800 shadow-sm p-4 flex items-center justify-between">
        <div className="relative max-w-sm w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search media items..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-sm bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all text-slate-800 dark:text-slate-100"
          />
        </div>
        <div className="text-sm text-gray-500 dark:text-gray-400 font-bold">
          {filtered.length} items catalogued
        </div>
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-150 dark:border-gray-800 shadow-sm p-12 text-center flex flex-col items-center justify-center">
          <ImagePlay className="w-12 h-12 text-gray-300 mb-3" />
          <h3 className="text-base font-semibold text-gray-955 dark:text-white">No gallery items found</h3>
          <p className="text-sm text-gray-500 max-w-xs mt-1 mb-4">Add your diagnostic equipment photos here.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filtered.map((item) => (
            <div key={item.id} className="bg-white dark:bg-gray-900 border border-gray-150 dark:border-gray-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all group relative">
              <div className="aspect-video w-full bg-slate-100 dark:bg-slate-950 relative overflow-hidden flex items-center justify-center">
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-350"
                  onError={(e) => { e.currentTarget.src = "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=300&auto=format&fit=crop"; }}
                />
                <span className="absolute top-2 left-2 bg-[#2563eb] text-white text-[9px] font-black uppercase px-2 py-0.5 rounded shadow-sm">
                  {item.category || "General"}
                </span>
              </div>
              <div className="p-4 flex items-center justify-between">
                <div>
                  <h4 className="font-extrabold text-slate-800 dark:text-white text-xs line-clamp-1">{item.title}</h4>
                  <p className="text-[10px] text-gray-400 dark:text-gray-500 font-mono mt-0.5 truncate max-w-[140px]">{item.image}</p>
                </div>
                <button 
                  onClick={() => handleDelete(item.id)}
                  className="p-1.5 text-slate-400 hover:text-red-650 hover:bg-red-50 rounded-md transition-colors cursor-pointer"
                  title="Delete media"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Editor Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/55 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
          <div className="bg-white dark:bg-gray-900 rounded-2xl max-w-md w-full shadow-2xl border border-gray-150 dark:border-gray-800 overflow-hidden">
            <div className="p-6 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
              <h3 className="text-base font-bold text-gray-900 dark:text-white">Upload Media Item</h3>
              <button onClick={() => setIsModalOpen(false)} className="p-2 text-gray-400 hover:text-gray-650 rounded-lg">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">Title / Caption</label>
                <input 
                  type="text" 
                  required
                  value={title} 
                  onChange={(e) => setTitle(e.target.value)} 
                  placeholder="Automated Pathology Analysers" 
                  className="w-full px-3.5 py-2.5 text-sm bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">Media Image URL</label>
                <input 
                  type="text" 
                  required
                  value={image} 
                  onChange={(e) => setImage(e.target.value)} 
                  placeholder="/image/lab_equipment.jpg" 
                  className="w-full px-3.5 py-2.5 text-sm bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-slate-800 dark:text-slate-100 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">Category / Section</label>
                <select 
                  value={category} 
                  onChange={(e) => setCategory(e.target.value)} 
                  className="w-full px-3.5 py-2.5 text-sm bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-slate-655 dark:text-slate-100 focus:outline-none"
                >
                  <option value="Lab Facilities">Lab Facilities</option>
                  <option value="Speciality Banners">Speciality Banners</option>
                  <option value="Corporate Events">Corporate Events</option>
                  <option value="Other">Other Assets</option>
                </select>
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
                  Add to Gallery
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}

"use client";

import React, { useState, useEffect } from "react";
import { Search, Edit2, Sparkles, X, Check, Save } from "lucide-react";
import { cmsStore } from "@/lib/cmsStore";
import { aiHelper } from "@/lib/aiHelper";

export default function SEOAdminPage() {
  const [seoList, setSeoList] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [editingItem, setEditingItem] = useState<any | null>(null);

  // Form states
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [keywords, setKeywords] = useState("");

  // AI states
  const [isAiGenerating, setIsAiGenerating] = useState(false);

  useEffect(() => {
    const refreshData = () => {
      setSeoList(cmsStore.getAll("seo"));
    };
    refreshData();
    window.addEventListener("cms-update", refreshData);
    return () => window.removeEventListener("cms-update", refreshData);
  }, []);

  const openEditModal = (item: any) => {
    setEditingItem(item);
    setTitle(item.title);
    setDescription(item.description);
    setKeywords(item.keywords);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem) return;

    cmsStore.updateItem("seo", editingItem.id, {
      title,
      description,
      keywords
    });
    setEditingItem(null);
  };

  const handleAiGenerate = async () => {
    if (!editingItem) return;
    setIsAiGenerating(true);
    try {
      const result = await aiHelper.generateSEO(editingItem.page);
      setTitle(result.title);
      setDescription(result.description);
      setKeywords(result.keywords);
    } catch (e) {
      console.error(e);
    } finally {
      setIsAiGenerating(false);
    }
  };

  const filtered = seoList.filter(item =>
    item.page.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
          <Search className="w-6 h-6 text-teal-600 dark:text-teal-400" />
          SEO Meta Tags
        </h2>
        <p className="text-gray-500 dark:text-gray-400 mt-1">Configure page titles, SEO keywords, and social descriptions with AI help.</p>
      </div>

      {/* Grid */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-150 dark:border-gray-800 shadow-sm overflow-hidden">
        
        <div className="p-4 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
          <div className="relative max-w-sm w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search pages..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-sm bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all text-slate-800 dark:text-slate-100"
            />
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="p-12 text-center text-gray-400">
            No page metadata found.
          </div>
        ) : (
          <div className="p-6 divide-y divide-gray-150 dark:divide-gray-800 space-y-6">
            {filtered.map((item) => (
              <div key={item.id} className="pt-6 first:pt-0 flex flex-col md:flex-row md:items-start justify-between gap-4">
                <div className="space-y-2 flex-1 max-w-3xl">
                  <span className="bg-teal-50 text-teal-700 dark:bg-teal-950/20 dark:text-teal-400 px-2.5 py-0.5 rounded-md text-[10px] font-extrabold uppercase tracking-wider">
                    {item.page}
                  </span>
                  <h4 className="font-extrabold text-sm text-slate-800 dark:text-white">{item.title}</h4>
                  <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">{item.description}</p>
                  <div className="text-[10px] text-gray-400 font-mono">Keywords: {item.keywords}</div>
                </div>

                <button 
                  onClick={() => openEditModal(item)}
                  className="px-3.5 py-1.5 bg-slate-50 hover:bg-slate-100 dark:bg-gray-800 dark:hover:bg-gray-750 text-slate-700 dark:text-slate-200 border border-gray-200 dark:border-gray-700 rounded-lg text-xs font-bold flex items-center gap-1.5 cursor-pointer self-start"
                >
                  <Edit2 className="w-3.5 h-3.5" /> Edit Tags
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Editor Modal */}
      {editingItem && (
        <div className="fixed inset-0 bg-black/55 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
          <div className="bg-white dark:bg-gray-900 rounded-2xl max-w-lg w-full shadow-2xl border border-gray-150 dark:border-gray-800 overflow-hidden">
            <div className="p-6 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-gray-900 dark:text-white">
                  Edit Metadata: {editingItem.page}
                </h3>
              </div>
              <button onClick={() => setEditingItem(null)} className="p-2 text-gray-400 hover:text-gray-600 rounded-lg">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* AI SEO Assistant */}
            <div className="px-6 py-3 bg-teal-50/50 dark:bg-teal-950/10 border-b border-teal-100/50 dark:border-teal-900/10 flex items-center justify-between gap-4">
              <span className="text-xs font-bold text-teal-800 dark:text-teal-400 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" /> Need keyword-optimized copy?
              </span>
              <button 
                type="button" 
                onClick={handleAiGenerate}
                disabled={isAiGenerating}
                className="px-3 py-1 bg-teal-600 text-white rounded-lg text-[10px] font-black uppercase tracking-wider flex items-center gap-1 shadow-xs cursor-pointer"
              >
                <Sparkles className="w-3 h-3" /> {isAiGenerating ? "Writing..." : "Generate with AI"}
              </button>
            </div>

            <form onSubmit={handleSave} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">Page Title Tag</label>
                <input 
                  type="text" 
                  required
                  value={title} 
                  onChange={(e) => setTitle(e.target.value)} 
                  className="w-full px-3.5 py-2.5 text-sm bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">Meta Description</label>
                <textarea 
                  rows={3}
                  required
                  value={description} 
                  onChange={(e) => setDescription(e.target.value)} 
                  className="w-full px-3.5 py-2.5 text-sm bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-teal-500 resize-none"
                ></textarea>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">SEO Keywords (Comma separated)</label>
                <input 
                  type="text" 
                  required
                  value={keywords} 
                  onChange={(e) => setKeywords(e.target.value)} 
                  className="w-full px-3.5 py-2.5 text-sm bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div className="pt-4 flex justify-end gap-3 border-t border-gray-100 dark:border-gray-800">
                <button 
                  type="button" 
                  onClick={() => setEditingItem(null)} 
                  className="px-4 py-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 text-xs font-medium cursor-pointer"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="px-5 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-lg text-xs font-medium shadow-sm cursor-pointer"
                >
                  Save Tags
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}

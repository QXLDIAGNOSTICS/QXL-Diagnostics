"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Image as ImageIcon, Plus, Search, Edit2, Trash2, Sparkles, X, Eye, Loader2 } from "lucide-react";
import { api, type Banner } from "@/lib/api";
import { aiHelper } from "@/lib/aiHelper";
import ImageUploadField from "@/components/admin/ImageUploadField";

export default function BannerManagementPage() {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  
  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form states
  const [imageOnly, setImageOnly] = useState(false);
  const [image, setImage] = useState("");
  const [bgFrom, setBgFrom] = useState("#eff6ff");
  const [bgTo, setBgTo] = useState("#dbeafe");
  const [badge, setBadge] = useState("");
  const [title, setTitle] = useState("");
  const [titleAccent, setTitleAccent] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [subtitleAccent, setSubtitleAccent] = useState("");
  const [description, setDescription] = useState("");
  const [cta, setCta] = useState("");
  const [ctaLink, setCtaLink] = useState("");
  const [featuresText, setFeaturesText] = useState("");

  // AI states
  const [aiPrompt, setAiPrompt] = useState("");
  const [isAiGenerating, setIsAiGenerating] = useState(false);
  const [showAiInput, setShowAiInput] = useState(false);

  const refreshData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const items = await api.banners.adminList(200, 0);
      setBanners(items);
    } catch {
      setError("Failed to load banners.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshData();
  }, [refreshData]);

  const openAddModal = () => {
    setEditingId(null);
    setImageOnly(false);
    setImage("/image/food_intolerance_banner.png");
    setBgFrom("#eff6ff");
    setBgTo("#dbeafe");
    setBadge("NEW OFFER");
    setTitle("ANNUAL COMPREHENSIVE");
    setTitleAccent("HEALTH ASSESSMENT");
    setSubtitle("Check 86+ Parameters");
    setSubtitleAccent("Starting @ just ₹1999");
    setDescription("Full body screening including liver, kidney, sugar, vitamins, and cardiac markers. Free home blood collection.");
    setCta("Book Now");
    setCtaLink("/book");
    setFeaturesText("NABL Accredited, 6-Hour Reports, Doctor Consult, Save 50%");
    setIsModalOpen(true);
    setShowAiInput(false);
    setAiPrompt("");
  };

  const openEditModal = (banner: Banner) => {
    setEditingId(banner.id);
    setImageOnly(banner.image_only || false);
    setImage(banner.image_url || "");
    setBgFrom(banner.bg_from || "#ffffff");
    setBgTo(banner.bg_to || "#ffffff");
    setBadge(banner.badge || "");
    setTitle(banner.title || "");
    setTitleAccent(banner.title_accent || "");
    setSubtitle(banner.subtitle || "");
    setSubtitleAccent(banner.subtitle_accent || "");
    setDescription(banner.description || "");
    setCta(banner.cta_label || "");
    setCtaLink(banner.cta_link || "");
    let features: string[] = [];
    try {
      features = banner.features ? JSON.parse(banner.features) : [];
    } catch {
      features = [];
    }
    setFeaturesText(features.join(", "));
    setIsModalOpen(true);
    setShowAiInput(false);
    setAiPrompt("");
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();

    setSaving(true);
    setError(null);
    try {
      const featuresArray = featuresText ? featuresText.split(",").map(f => f.trim()).filter(Boolean) : [];
      const payload = {
        image_only: imageOnly,
        image_url: image,
        bg_from: bgFrom,
        bg_to: bgTo,
        badge,
        title,
        title_accent: titleAccent,
        subtitle,
        subtitle_accent: subtitleAccent,
        description,
        cta_label: cta,
        cta_link: ctaLink,
        image_fit: "cover",
        features: JSON.stringify(featuresArray),
      };

      if (editingId) {
        await api.banners.update(editingId, payload);
      } else {
        await api.banners.create({ ...payload, is_active: true });
      }
      setIsModalOpen(false);
      await refreshData();
    } catch {
      setError("Failed to save the banner.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this banner?")) return;
    try {
      await api.banners.remove(id);
      await refreshData();
    } catch {
      setError("Failed to delete the banner.");
    }
  };

  const handleAiGenerate = async () => {
    if (!aiPrompt) return;
    setIsAiGenerating(true);
    try {
      const result = await aiHelper.generateBanner(aiPrompt);
      setBadge(result.badge);
      setTitle(result.title);
      setTitleAccent(result.titleAccent);
      setSubtitle(result.subtitle);
      setSubtitleAccent(result.subtitleAccent);
      setDescription(result.description);
      setBgFrom(result.bgFrom);
      setBgTo(result.bgTo);
      setCta(result.cta);
      setCtaLink(result.ctaLink);
      setFeaturesText(result.features.join(", "));
      setShowAiInput(false);
    } catch (e) {
      console.error(e);
    } finally {
      setIsAiGenerating(false);
    }
  };

  const filteredBanners = banners.filter(banner => {
    const term = searchQuery.toLowerCase();
    return (
      (banner.title && banner.title.toLowerCase().includes(term)) ||
      (banner.badge && banner.badge.toLowerCase().includes(term)) ||
      (banner.description && banner.description.toLowerCase().includes(term))
    );
  });

  return (
    <div className="space-y-6">
      
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <ImageIcon className="w-6 h-6 text-teal-600 dark:text-teal-400" />
            Banner Management
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Configure and generate homepage promotional sliders.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <button 
            onClick={openAddModal}
            className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-lg transition-colors flex items-center gap-2 text-sm font-medium shadow-sm cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            Add New Banner
          </button>
        </div>
      </div>

      {error && (
        <div className="p-3 rounded-lg bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900 text-red-600 dark:text-red-400 text-sm">
          {error}
        </div>
      )}

      {/* Main Content Area */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-150 dark:border-gray-800 shadow-sm overflow-hidden">
        
        {/* Table Action Bar */}
        <div className="p-4 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
          <div className="relative max-w-sm w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search banners..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-sm bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all text-slate-800 dark:text-slate-100"
            />
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Showing {filteredBanners.length} results
          </div>
        </div>

        {filteredBanners.length === 0 ? (
          /* Empty State */
          <div className="p-12 flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 bg-gray-50 dark:bg-gray-800 rounded-full flex items-center justify-center mb-4">
              <ImageIcon className="w-8 h-8 text-gray-400 dark:text-gray-500" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">No banners found</h3>
            <p className="text-gray-500 dark:text-gray-400 max-w-sm mb-6">
              Get started by creating a new entry or try searching for something else.
            </p>
            <button 
              onClick={openAddModal}
              className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-lg transition-colors flex items-center gap-2 text-sm font-medium shadow-sm cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              Create First Banner
            </button>
          </div>
        ) : (
          /* Cards Grid & Previews */
          <div className="p-6 grid grid-cols-1 gap-6">
            {loading ? (
              <div className="p-12 flex items-center justify-center text-gray-400">
                <Loader2 className="w-6 h-6 animate-spin" />
              </div>
            ) : filteredBanners.map((banner) => (
              <div 
                key={banner.id} 
                className="border border-gray-200 dark:border-gray-800 rounded-xl overflow-hidden shadow-xs flex flex-col lg:flex-row bg-slate-50/50 dark:bg-slate-950/20"
              >
                {/* Visual Preview */}
                <div className="lg:w-1/2 p-4 border-r border-gray-100 dark:border-gray-800 flex flex-col justify-center bg-gray-100 dark:bg-gray-950">
                  <span className="text-xs font-bold text-gray-400 mb-2 flex items-center gap-1.5"><Eye className="w-3.5 h-3.5" /> Render Preview:</span>
                  <div 
                    className="relative rounded-xl p-6 h-[200px] flex flex-col justify-center overflow-hidden border border-gray-200 dark:border-gray-800"
                    style={{ background: `linear-gradient(135deg, ${banner.bg_from} 0%, ${banner.bg_to} 100%)` }}
                  >
                    {banner.image_only ? (
                      <div className="w-full h-full flex items-center justify-center text-slate-400 font-bold bg-white/80 rounded-lg">
                        [Pure Banner Image Only]
                      </div>
                    ) : (
                      <div className="max-w-[70%]">
                        {banner.badge && (
                          <span className="inline-block bg-[#2563eb] text-white text-[8px] font-extrabold px-2 py-0.5 rounded-full tracking-widest uppercase mb-1.5 w-fit">
                            {banner.badge}
                          </span>
                        )}
                        <h4 className="text-[12px] font-black text-[#0d2e42] leading-tight">
                          {banner.title}
                        </h4>
                        <h4 className="text-[12px] font-black text-[#2563eb] leading-tight mb-1">
                          {banner.title_accent}
                        </h4>
                        <p className="text-[9px] text-slate-500 line-clamp-2 leading-relaxed">
                          {banner.description}
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Banner Metadata & Actions */}
                <div className="lg:w-1/2 p-6 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="bg-slate-100 dark:bg-gray-800 text-slate-600 dark:text-slate-300 text-xs font-bold px-2.5 py-1 rounded-md">
                        {banner.image_only ? "Image Banner" : "Layout Banner"}
                      </span>
                      <span className="text-[11px] text-gray-400 font-medium">ID: {banner.id}</span>
                    </div>

                    {!banner.image_only && (
                      <div>
                        <h3 className="font-extrabold text-slate-800 dark:text-white text-base leading-tight">
                          {banner.title} <span className="text-[#2563eb]">{banner.title_accent}</span>
                        </h3>
                        <p className="text-xs text-slate-500 dark:text-gray-400 line-clamp-2 mt-1">
                          {banner.description}
                        </p>
                      </div>
                    )}

                    <div className="text-xs text-slate-400 dark:text-gray-500 flex flex-wrap gap-2 pt-1">
                      <span>Bg: {banner.bg_from} → {banner.bg_to}</span>
                      <span>•</span>
                      <span>CTA: {banner.cta_label || "None"}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-end gap-3 mt-6 border-t border-gray-100 dark:border-gray-850 pt-4">
                    <button 
                      onClick={() => openEditModal(banner)}
                      className="p-2 text-slate-600 dark:text-slate-400 hover:text-teal-600 dark:hover:text-teal-400 hover:bg-slate-100 dark:hover:bg-gray-800 rounded-lg transition-colors cursor-pointer"
                      title="Edit Banner"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => handleDelete(banner.id)}
                      className="p-2 text-slate-600 dark:text-slate-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/20 rounded-lg transition-colors cursor-pointer"
                      title="Delete Banner"
                    >
                      <Trash2 className="w-4 h-4" />
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
          <div className="bg-white dark:bg-gray-900 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-gray-100 dark:border-gray-800 flex flex-col">
            
            {/* Modal Header */}
            <div className="p-6 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between sticky top-0 bg-white dark:bg-gray-900 z-10">
              <div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                  {editingId ? "Edit Homepage Banner" : "Create Homepage Banner"}
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Configure layout, image, typography, and action links.</p>
              </div>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-250 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* AI Generator Integration */}
            <div className="px-6 py-4 bg-teal-50/50 dark:bg-teal-950/10 border-b border-teal-100/50 dark:border-teal-900/10">
              {!showAiInput ? (
                <button
                  type="button"
                  onClick={() => setShowAiInput(true)}
                  className="w-full py-2 bg-gradient-to-r from-teal-500 to-emerald-600 text-white rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 hover:opacity-95 shadow-sm cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 animate-pulse" />
                  Generate banner with AI Assistant
                </button>
              ) : (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-extrabold text-teal-800 dark:text-teal-400 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5" /> AI Banner Assistant
                    </span>
                    <button 
                      type="button" 
                      onClick={() => setShowAiInput(false)}
                      className="text-xs text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                    >
                      Cancel
                    </button>
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="E.g., Heart checkup packages 50% discount..."
                      value={aiPrompt}
                      onChange={(e) => setAiPrompt(e.target.value)}
                      className="flex-1 px-3 py-2 text-xs bg-white dark:bg-gray-800 border border-teal-200 dark:border-teal-900 rounded-lg text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-teal-500"
                    />
                    <button
                      type="button"
                      disabled={isAiGenerating || !aiPrompt}
                      onClick={handleAiGenerate}
                      className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold rounded-lg disabled:opacity-50 flex items-center gap-1 cursor-pointer"
                    >
                      {isAiGenerating ? "Generating..." : "Write"}
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Form Fields */}
            <form onSubmit={handleSave} className="p-6 space-y-4 flex-1">
              
              <div className="flex items-center gap-2 mb-2">
                <input 
                  type="checkbox" 
                  id="imageOnly" 
                  checked={imageOnly} 
                  onChange={(e) => setImageOnly(e.target.checked)} 
                  className="rounded border-gray-300 text-teal-600 focus:ring-teal-500"
                />
                <label htmlFor="imageOnly" className="text-sm font-bold text-gray-700 dark:text-gray-300">
                  Image-Only Banner (Hides text layouts)
                </label>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <ImageUploadField
                  label="Banner Image"
                  value={image}
                  onChange={setImage}
                  required
                  placeholder="/image/my_banner.png"
                />
                
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">Gradient Bg From</label>
                    <input 
                      type="text" 
                      required
                      value={bgFrom} 
                      onChange={(e) => setBgFrom(e.target.value)} 
                      placeholder="#eff6ff" 
                      className="w-full px-3.5 py-2.5 text-sm bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">Gradient Bg To</label>
                    <input 
                      type="text" 
                      required
                      value={bgTo} 
                      onChange={(e) => setBgTo(e.target.value)} 
                      placeholder="#dbeafe" 
                      className="w-full px-3.5 py-2.5 text-sm bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                  </div>
                </div>
              </div>

              {!imageOnly && (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">Top Badge text</label>
                      <input 
                        type="text" 
                        value={badge} 
                        onChange={(e) => setBadge(e.target.value)} 
                        placeholder="LEADER IN DIAGNOSTICS" 
                        className="w-full px-3.5 py-2.5 text-sm bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-teal-500"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">Main Title Text</label>
                      <input 
                        type="text" 
                        required={!imageOnly}
                        value={title} 
                        onChange={(e) => setTitle(e.target.value)} 
                        placeholder="BENGALURU'S MOST ADVANCED" 
                        className="w-full px-3.5 py-2.5 text-sm bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-teal-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">Title Accent (Highlighted color text)</label>
                      <input 
                        type="text" 
                        value={titleAccent} 
                        onChange={(e) => setTitleAccent(e.target.value)} 
                        placeholder="CERTIFIED DIAGNOSTICS LAB" 
                        className="w-full px-3.5 py-2.5 text-sm bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-teal-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">Subtitle Text</label>
                      <input 
                        type="text" 
                        value={subtitle} 
                        onChange={(e) => setSubtitle(e.target.value)} 
                        placeholder="Experience cutting-edge diagnostics" 
                        className="w-full px-3.5 py-2.5 text-sm bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-teal-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">Subtitle Accent</label>
                      <input 
                        type="text" 
                        value={subtitleAccent} 
                        onChange={(e) => setSubtitleAccent(e.target.value)} 
                        placeholder="with unparalleled efficiency" 
                        className="w-full px-3.5 py-2.5 text-sm bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-teal-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">Features (Comma-separated)</label>
                      <input 
                        type="text" 
                        value={featuresText} 
                        onChange={(e) => setFeaturesText(e.target.value)} 
                        placeholder="NABL Certified, 100% Accurate, Free Home Visit" 
                        className="w-full px-3.5 py-2.5 text-sm bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-teal-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">Detailed Description Copy</label>
                    <textarea 
                      rows={2}
                      value={description} 
                      onChange={(e) => setDescription(e.target.value)} 
                      placeholder="Supported by state-of-the-art pathology automated systems..." 
                      className="w-full px-3.5 py-2.5 text-sm bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-teal-500 resize-none"
                    ></textarea>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">CTA Action Button Text</label>
                      <input 
                        type="text" 
                        value={cta} 
                        onChange={(e) => setCta(e.target.value)} 
                        placeholder="Book Now" 
                        className="w-full px-3.5 py-2.5 text-sm bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-teal-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">CTA Action Link</label>
                      <input 
                        type="text" 
                        value={ctaLink} 
                        onChange={(e) => setCtaLink(e.target.value)} 
                        placeholder="/book" 
                        className="w-full px-3.5 py-2.5 text-sm bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-teal-500"
                      />
                    </div>
                  </div>
                </>
              )}

              {/* Action Buttons */}
              <div className="pt-6 border-t border-gray-100 dark:border-gray-800 flex justify-end gap-3 sticky bottom-0 bg-white dark:bg-gray-900 py-4 z-10">
                <button 
                  type="button" 
                  onClick={() => setIsModalOpen(false)} 
                  className="px-4 py-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 text-sm font-medium cursor-pointer"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  disabled={saving}
                  className="px-6 py-2 bg-teal-600 hover:bg-teal-700 disabled:opacity-60 text-white rounded-lg text-sm font-medium shadow-sm cursor-pointer flex items-center gap-2"
                >
                  {saving && <Loader2 className="w-4 h-4 animate-spin" />}
                  Save Changes
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
}

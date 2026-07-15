"use client";

import React, { useState, useEffect } from "react";
import { Globe, Save, CheckCircle, Navigation, Layout, Info, Plus, Trash2, Edit2, ShieldAlert } from "lucide-react";
import { cmsStore } from "@/lib/cmsStore";
import ImageUploadField from "@/components/admin/ImageUploadField";

export default function WebsiteManagementPage() {
  const [settings, setSettings] = useState<any>({
    siteName: "",
    logoText: "",
    logoImage: "",
    faviconImage: "",
    contactPhone: "",
    supportEmail: "",
    hqAddress: "",
    northHubAddress: "",
    workingHours: "",
    whatsappNumber: "",
    copyrightText: "",
    footerDesc: "",
    searchPlaceholder: "",
    navItems: [],
    quickActionCards: [],
    aboutStory: "",
    aboutMission: "",
    aboutVision: "",
    aboutValues: "",
    timeline: []
  });

  const [activeTab, setActiveTab] = useState("branding");
  const [isSaved, setIsSaved] = useState(false);

  // Modal / Temp item states for arrays
  const [navLabel, setNavLabel] = useState("");
  const [navHref, setNavHref] = useState("");
  const [timelineYear, setTimelineYear] = useState("");
  const [timelineEvent, setTimelineEvent] = useState("");

  useEffect(() => {
    setSettings(cmsStore.getSettings());
  }, []);

  const handleChange = (key: string, value: any) => {
    setSettings((prev: any) => ({
      ...prev,
      [key]: value
    }));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    cmsStore.saveSettings(settings);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  // Nav Item handlers
  const addNavItem = () => {
    if (!navLabel || !navHref) return;
    const items = [...(settings.navItems || []), { label: navLabel, href: navHref, visible: true }];
    handleChange("navItems", items);
    setNavLabel("");
    setNavHref("");
  };

  const removeNavItem = (index: number) => {
    const items = (settings.navItems || []).filter((_: any, idx: number) => idx !== index);
    handleChange("navItems", items);
  };

  const toggleNavVisibility = (index: number) => {
    const items = (settings.navItems || []).map((item: any, idx: number) => {
      if (idx === index) {
        return { ...item, visible: !item.visible };
      }
      return item;
    });
    handleChange("navItems", items);
  };

  // Timeline handlers
  const addTimelineEvent = () => {
    if (!timelineYear || !timelineEvent) return;
    const events = [...(settings.timeline || []), { year: timelineYear, event: timelineEvent }];
    handleChange("timeline", events);
    setTimelineYear("");
    setTimelineEvent("");
  };

  const removeTimelineEvent = (index: number) => {
    const events = (settings.timeline || []).filter((_: any, idx: number) => idx !== index);
    handleChange("timeline", events);
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <Globe className="w-6 h-6 text-teal-600 dark:text-teal-400" />
            Website Settings CMS
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Configure global text, header menus, action cards, and milestone timelines.</p>
        </div>
      </div>

      {/* Tabs list */}
      <div className="flex gap-2 border-b border-gray-200 dark:border-gray-800 pb-px">
        {[
          { id: "branding", label: "Branding & Contacts", icon: Globe },
          { id: "navigation", label: "Navigation Menu", icon: Navigation },
          { id: "actions", label: "Homepage Actions", icon: Layout },
          { id: "about", label: "About & History", icon: Info }
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2.5 font-semibold text-xs flex items-center gap-2 border-b-2 transition-all cursor-pointer ${
                activeTab === tab.id
                  ? "border-teal-600 text-teal-600 dark:border-teal-400 dark:text-teal-400"
                  : "border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
              }`}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-150 dark:border-gray-800 shadow-sm overflow-hidden p-6 max-w-4xl">
        <form onSubmit={handleSave} className="space-y-6">
          
          {/* TAB 1: Branding */}
          {activeTab === "branding" && (
            <div className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1.5 uppercase">Site Brand Name</label>
                  <input 
                    type="text" 
                    required
                    value={settings.siteName || ""} 
                    onChange={(e) => handleChange("siteName", e.target.value)} 
                    className="w-full px-3.5 py-2.5 text-sm bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1.5 uppercase">Header Logo Text</label>
                  <input 
                    type="text" 
                    required
                    value={settings.logoText || ""} 
                    onChange={(e) => handleChange("logoText", e.target.value)} 
                    className="w-full px-3.5 py-2.5 text-sm bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <ImageUploadField
                  label="Logo Image"
                  value={settings.logoImage || ""}
                  onChange={(url) => handleChange("logoImage", url)}
                  placeholder="Logo image URL, or upload a file"
                />
                <ImageUploadField
                  label="Favicon Image"
                  value={settings.faviconImage || ""}
                  onChange={(url) => handleChange("faviconImage", url)}
                  placeholder="Favicon image URL, or upload a file"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1.5 uppercase">Support Contact Number</label>
                  <input 
                    type="text" 
                    required
                    value={settings.contactPhone || ""} 
                    onChange={(e) => handleChange("contactPhone", e.target.value)} 
                    className="w-full px-3.5 py-2.5 text-sm bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1.5 uppercase">WhatsApp Hotline Number</label>
                  <input 
                    type="text" 
                    required
                    value={settings.whatsappNumber || ""} 
                    onChange={(e) => handleChange("whatsappNumber", e.target.value)} 
                    className="w-full px-3.5 py-2.5 text-sm bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1.5 uppercase">Support Email Address</label>
                  <input 
                    type="email" 
                    required
                    value={settings.supportEmail || ""} 
                    onChange={(e) => handleChange("supportEmail", e.target.value)} 
                    className="w-full px-3.5 py-2.5 text-sm bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1.5 uppercase">Working hours info</label>
                  <input 
                    type="text" 
                    required
                    value={settings.workingHours || ""} 
                    onChange={(e) => handleChange("workingHours", e.target.value)} 
                    className="w-full px-3.5 py-2.5 text-sm bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1.5 uppercase">HQ Branch Address</label>
                  <input 
                    type="text" 
                    required
                    value={settings.hqAddress || ""} 
                    onChange={(e) => handleChange("hqAddress", e.target.value)} 
                    className="w-full px-3.5 py-2.5 text-sm bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1.5 uppercase">North Hub Address</label>
                  <input 
                    type="text" 
                    value={settings.northHubAddress || ""} 
                    onChange={(e) => handleChange("northHubAddress", e.target.value)} 
                    className="w-full px-3.5 py-2.5 text-sm bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1.5 uppercase">Search Placeholder Text</label>
                  <input 
                    type="text" 
                    value={settings.searchPlaceholder || ""} 
                    onChange={(e) => handleChange("searchPlaceholder", e.target.value)} 
                    className="w-full px-3.5 py-2.5 text-sm bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1.5 uppercase">Announcement Bar Alert</label>
                  <input 
                    type="text" 
                    value={settings.announcement || ""} 
                    onChange={(e) => handleChange("announcement", e.target.value)} 
                    className="w-full px-3.5 py-2.5 text-sm bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1.5 uppercase">Footer Copyright Text</label>
                <input 
                  type="text" 
                  required
                  value={settings.copyrightText || ""} 
                  onChange={(e) => handleChange("copyrightText", e.target.value)} 
                  className="w-full px-3.5 py-2.5 text-sm bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1.5 uppercase">Footer Brand Description</label>
                <textarea 
                  rows={2}
                  value={settings.footerDesc || ""} 
                  onChange={(e) => handleChange("footerDesc", e.target.value)} 
                  className="w-full px-3.5 py-2.5 text-sm bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-teal-500 resize-none"
                />
              </div>
            </div>
          )}

          {/* TAB 2: Navigation Menu */}
          {activeTab === "navigation" && (
            <div className="space-y-5">
              <div className="bg-slate-50 dark:bg-slate-950/20 p-4 rounded-xl border border-gray-150 dark:border-gray-800">
                <h4 className="text-sm font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-1.5">Add Menu Link</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 items-end">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 mb-1 uppercase">Link Label</label>
                    <input 
                      type="text" 
                      value={navLabel} 
                      onChange={(e) => setNavLabel(e.target.value)} 
                      placeholder="Careers" 
                      className="w-full px-3.5 py-2 text-xs bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 mb-1 uppercase">Link Destination (href)</label>
                    <input 
                      type="text" 
                      value={navHref} 
                      onChange={(e) => setNavHref(e.target.value)} 
                      placeholder="/careers" 
                      className="w-full px-3.5 py-2 text-xs bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                  </div>
                  <button 
                    type="button" 
                    onClick={addNavItem}
                    className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-lg text-xs flex items-center justify-center gap-1.5 cursor-pointer h-10 shadow-sm"
                  >
                    <Plus className="w-3.5 h-3.5" /> Add Link
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 uppercase">Existing Menu Items</label>
                <div className="border border-gray-150 dark:border-gray-800 rounded-xl divide-y divide-gray-150 dark:divide-gray-800 overflow-hidden">
                  {(settings.navItems || []).map((item: any, idx: number) => (
                    <div key={idx} className="px-4 py-3 flex items-center justify-between text-xs bg-white dark:bg-gray-900 hover:bg-slate-50 dark:hover:bg-slate-950/20">
                      <div>
                        <span className="font-extrabold text-slate-900 dark:text-white mr-3">{item.label}</span>
                        <code className="text-gray-400 dark:text-gray-500 font-mono">{item.href}</code>
                      </div>
                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          onClick={() => toggleNavVisibility(idx)}
                          className={`px-2.5 py-1 rounded-md font-bold text-[10px] cursor-pointer ${
                            item.visible !== false 
                              ? "bg-emerald-50 text-emerald-600 border border-emerald-100" 
                              : "bg-gray-100 text-gray-500 border border-gray-200"
                          }`}
                        >
                          {item.visible !== false ? "Visible" : "Hidden"}
                        </button>
                        <button 
                          type="button"
                          onClick={() => removeNavItem(idx)}
                          className="p-1 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-md cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: Action Cards */}
          {activeTab === "actions" && (
            <div className="space-y-6">
              {(settings.quickActionCards || []).map((card: any, idx: number) => (
                <div key={card.id} className="p-4 border border-gray-150 dark:border-gray-800 rounded-xl bg-slate-50/50 dark:bg-slate-950/10 space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-black text-[#2563eb] uppercase tracking-wider">Quick Action #{idx + 1} ({card.type})</span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 mb-1 uppercase">Card Title</label>
                      <input 
                        type="text" 
                        value={card.title} 
                        onChange={(e) => {
                          const updated = [...settings.quickActionCards];
                          updated[idx].title = e.target.value;
                          handleChange("quickActionCards", updated);
                        }}
                        className="w-full px-3 py-2 text-xs bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-slate-800 dark:text-slate-100 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 mb-1 uppercase">Redirection Link (URL)</label>
                      <input 
                        type="text" 
                        value={card.url} 
                        onChange={(e) => {
                          const updated = [...settings.quickActionCards];
                          updated[idx].url = e.target.value;
                          handleChange("quickActionCards", updated);
                        }}
                        className="w-full px-3 py-2 text-xs bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-slate-800 dark:text-slate-100 focus:outline-none"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 mb-1 uppercase">Description text</label>
                      <input 
                        type="text" 
                        value={card.desc} 
                        onChange={(e) => {
                          const updated = [...settings.quickActionCards];
                          updated[idx].desc = e.target.value;
                          handleChange("quickActionCards", updated);
                        }}
                        className="w-full px-3 py-2 text-xs bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-slate-800 dark:text-slate-100 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 mb-1 uppercase">Icon Code (Lucide Name)</label>
                      <input 
                        type="text" 
                        value={card.icon} 
                        onChange={(e) => {
                          const updated = [...settings.quickActionCards];
                          updated[idx].icon = e.target.value;
                          handleChange("quickActionCards", updated);
                        }}
                        className="w-full px-3 py-2 text-xs bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-slate-800 dark:text-slate-100 focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* TAB 4: About Us */}
          {activeTab === "about" && (
            <div className="space-y-6">
              <div className="space-y-4 border-b border-gray-100 dark:border-gray-800 pb-5">
                <h4 className="text-xs font-bold text-gray-700 dark:text-gray-300 uppercase">Profile Settings</h4>
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 mb-1 uppercase">Company Story biography</label>
                  <textarea 
                    rows={3}
                    value={settings.aboutStory || ""} 
                    onChange={(e) => handleChange("aboutStory", e.target.value)} 
                    className="w-full px-3.5 py-2.5 text-sm bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-teal-500 resize-none"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 mb-1 uppercase">Company Mission</label>
                    <textarea 
                      rows={2}
                      value={settings.aboutMission || ""} 
                      onChange={(e) => handleChange("aboutMission", e.target.value)} 
                      className="w-full px-3.5 py-2 text-xs bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-slate-800 dark:text-slate-100 focus:outline-none resize-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 mb-1 uppercase">Company Vision</label>
                    <textarea 
                      rows={2}
                      value={settings.aboutVision || ""} 
                      onChange={(e) => handleChange("aboutVision", e.target.value)} 
                      className="w-full px-3.5 py-2 text-xs bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-slate-800 dark:text-slate-100 focus:outline-none resize-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 mb-1 uppercase">Corporate Values</label>
                    <textarea 
                      rows={2}
                      value={settings.aboutValues || ""} 
                      onChange={(e) => handleChange("aboutValues", e.target.value)} 
                      className="w-full px-3.5 py-2 text-xs bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-slate-800 dark:text-slate-100 focus:outline-none resize-none"
                    />
                  </div>
                </div>
              </div>

              {/* Timeline list */}
              <div className="space-y-4">
                <h4 className="text-xs font-bold text-gray-700 dark:text-gray-300 uppercase">History Milestones Timeline</h4>
                <div className="bg-slate-50 dark:bg-slate-950/20 p-4 rounded-xl border border-gray-150 dark:border-gray-800">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 items-end">
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 mb-1 uppercase">Milestone Year</label>
                      <input 
                        type="text" 
                        value={timelineYear} 
                        onChange={(e) => setTimelineYear(e.target.value)} 
                        placeholder="2026" 
                        className="w-full px-3.5 py-2 text-xs bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-slate-800 dark:text-slate-100 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 mb-1 uppercase">Achievement / Event</label>
                      <input 
                        type="text" 
                        value={timelineEvent} 
                        onChange={(e) => setTimelineEvent(e.target.value)} 
                        placeholder="Expanded main lab by 5,000 sq ft" 
                        className="w-full px-3.5 py-2 text-xs bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-slate-800 dark:text-slate-100 focus:outline-none"
                      />
                    </div>
                    <button 
                      type="button" 
                      onClick={addTimelineEvent}
                      className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-lg text-xs flex items-center justify-center gap-1.5 cursor-pointer h-10 shadow-sm"
                    >
                      <Plus className="w-3.5 h-3.5" /> Add Milestone
                    </button>
                  </div>
                </div>

                <div className="border border-gray-150 dark:border-gray-800 rounded-xl divide-y divide-gray-150 dark:divide-gray-800 overflow-hidden bg-white dark:bg-gray-900">
                  {(settings.timeline || []).map((t: any, idx: number) => (
                    <div key={idx} className="px-4 py-3 flex items-center justify-between text-xs hover:bg-slate-50/50">
                      <div>
                        <span className="font-extrabold text-teal-650 dark:text-teal-400 bg-teal-50 dark:bg-teal-950/20 px-2 py-0.5 rounded-md mr-3">{t.year}</span>
                        <span className="font-medium text-slate-800 dark:text-slate-200">{t.event}</span>
                      </div>
                      <button 
                        type="button"
                        onClick={() => removeTimelineEvent(idx)}
                        className="p-1 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-md cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Footer Save Button */}
          <div className="pt-5 border-t border-gray-150 dark:border-gray-850 flex items-center justify-between">
            {isSaved && (
              <span className="text-emerald-600 dark:text-emerald-400 text-xs font-bold flex items-center gap-1.5 animate-bounce">
                <CheckCircle className="w-4 h-4" /> Changes applied dynamically to header & footer!
              </span>
            )}
            {!isSaved && <div />}
            <button 
              type="submit" 
              className="px-6 py-2.5 bg-teal-600 hover:bg-teal-700 text-white rounded-lg text-xs font-bold flex items-center gap-2 shadow-md hover:scale-[1.01] transition-all cursor-pointer ml-auto"
            >
              <Save className="w-4 h-4" /> Save Website configuration
            </button>
          </div>

        </form>
      </div>

    </div>
  );
}

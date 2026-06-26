"use client";

import React, { useState, useEffect } from "react";
import { Settings, Save, CheckCircle, Flame, Moon, Sun, ToggleLeft, ToggleRight, Laptop } from "lucide-react";
import { cmsStore } from "@/lib/cmsStore";

export default function SystemSettingsPage() {
  const [settings, setSettings] = useState<any>({
    themePrimary: "#2563eb",
    themeSecondary: "#0d2e42",
    maintenanceMode: false,
    announcement: "Free Home Collection available across Bengaluru!",
    cookieBanner: true,
    aiChatEnabled: true,
    customScripts: "",
    liveChatWidgetId: ""
  });

  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const activeSettings = cmsStore.getSettings();
    setSettings({
      ...settings,
      ...activeSettings
    });
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

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
          <Settings className="w-6 h-6 text-teal-600 dark:text-teal-400" />
          System Preferences
        </h2>
        <p className="text-gray-500 dark:text-gray-400 mt-1">Configure advanced configurations, maintenance toggles, and visual system themes.</p>
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-150 dark:border-gray-800 shadow-sm overflow-hidden p-6 max-w-3xl">
        <form onSubmit={handleSave} className="space-y-6">
          
          {/* Theme Colors */}
          <div className="space-y-4 border-b border-gray-100 dark:border-gray-800 pb-5">
            <h3 className="text-xs font-bold text-gray-950 dark:text-white uppercase tracking-wider">Visual Theme branding</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1.5 uppercase">Primary Accent Color</label>
                <div className="flex gap-2 items-center">
                  <input 
                    type="color" 
                    value={settings.themePrimary || "#2563eb"} 
                    onChange={(e) => handleChange("themePrimary", e.target.value)} 
                    className="w-10 h-10 border border-gray-200 dark:border-gray-700 rounded cursor-pointer p-0"
                  />
                  <input 
                    type="text" 
                    value={settings.themePrimary || "#2563eb"} 
                    onChange={(e) => handleChange("themePrimary", e.target.value)}
                    className="flex-1 px-3.5 py-2 text-sm bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-slate-800 dark:text-slate-100 focus:outline-none"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1.5 uppercase">Secondary Base Color</label>
                <div className="flex gap-2 items-center">
                  <input 
                    type="color" 
                    value={settings.themeSecondary || "#0d2e42"} 
                    onChange={(e) => handleChange("themeSecondary", e.target.value)} 
                    className="w-10 h-10 border border-gray-200 dark:border-gray-700 rounded cursor-pointer p-0"
                  />
                  <input 
                    type="text" 
                    value={settings.themeSecondary || "#0d2e42"} 
                    onChange={(e) => handleChange("themeSecondary", e.target.value)}
                    className="flex-1 px-3.5 py-2 text-sm bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-slate-800 dark:text-slate-100 focus:outline-none"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Feature Toggles */}
          <div className="space-y-4 border-b border-gray-100 dark:border-gray-800 pb-5">
            <h3 className="text-xs font-bold text-gray-955 dark:text-white uppercase tracking-wider">Feature Swapping Toggles</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              <div className="flex items-center justify-between p-3 border border-gray-150 dark:border-gray-850 rounded-xl bg-slate-50/50 dark:bg-slate-950/10">
                <div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white">Maintenance Mode</h4>
                  <p className="text-[10px] text-gray-400 mt-0.5">Locks public site layout behind lock screen.</p>
                </div>
                <button
                  type="button"
                  onClick={() => handleChange("maintenanceMode", !settings.maintenanceMode)}
                  className="p-1 focus:outline-none cursor-pointer"
                >
                  {settings.maintenanceMode ? (
                    <ToggleRight className="w-8 h-8 text-teal-600" />
                  ) : (
                    <ToggleLeft className="w-8 h-8 text-gray-400" />
                  )}
                </button>
              </div>

              <div className="flex items-center justify-between p-3 border border-gray-150 dark:border-gray-850 rounded-xl bg-slate-50/50 dark:bg-slate-950/10">
                <div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white">Cookie Consent Banner</h4>
                  <p className="text-[10px] text-gray-400 mt-0.5">Toggle tracking notice popups for GDPR.</p>
                </div>
                <button
                  type="button"
                  onClick={() => handleChange("cookieBanner", !settings.cookieBanner)}
                  className="p-1 focus:outline-none cursor-pointer"
                >
                  {settings.cookieBanner ? (
                    <ToggleRight className="w-8 h-8 text-teal-600" />
                  ) : (
                    <ToggleLeft className="w-8 h-8 text-gray-400" />
                  )}
                </button>
              </div>

              <div className="flex items-center justify-between p-3 border border-gray-150 dark:border-gray-850 rounded-xl bg-slate-50/50 dark:bg-slate-950/10">
                <div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white">Gemini AI Diagnostics Chatbot</h4>
                  <p className="text-[10px] text-gray-400 mt-0.5">Toggle AI support widget on public homepage.</p>
                </div>
                <button
                  type="button"
                  onClick={() => handleChange("aiChatEnabled", !settings.aiChatEnabled)}
                  className="p-1 focus:outline-none cursor-pointer"
                >
                  {settings.aiChatEnabled ? (
                    <ToggleRight className="w-8 h-8 text-teal-600" />
                  ) : (
                    <ToggleLeft className="w-8 h-8 text-gray-400" />
                  )}
                </button>
              </div>

            </div>
          </div>

          {/* Third party scripts */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold text-gray-955 dark:text-white uppercase tracking-wider">Integrations & External Scripts</h3>
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">Live Chat Widget ID (Tawk.to / Intercom)</label>
                <input 
                  type="text" 
                  value={settings.liveChatWidgetId || ""}
                  onChange={(e) => handleChange("liveChatWidgetId", e.target.value)}
                  placeholder="615a2eb7c1213f..."
                  className="w-full px-3.5 py-2 text-xs bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-slate-800 dark:text-slate-100 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">Custom Analytics Headers (Google Analytics / Facebook Pixel)</label>
                <textarea 
                  rows={3}
                  value={settings.customScripts || ""}
                  onChange={(e) => handleChange("customScripts", e.target.value)}
                  placeholder="<!-- Global site tag (gtag.js) - Google Analytics -->"
                  className="w-full px-3.5 py-2.5 text-xs bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-slate-800 dark:text-slate-100 focus:outline-none resize-none font-mono"
                />
              </div>
            </div>
          </div>

          {/* Footer Save Button */}
          <div className="pt-5 border-t border-gray-150 dark:border-gray-850 flex items-center justify-between">
            {isSaved && (
              <span className="text-emerald-600 dark:text-emerald-400 text-xs font-bold flex items-center gap-1.5 animate-bounce">
                <CheckCircle className="w-4 h-4" /> System Preferences saved!
              </span>
            )}
            {!isSaved && <div />}
            <button 
              type="submit" 
              className="px-6 py-2.5 bg-teal-600 hover:bg-teal-700 text-white rounded-lg text-xs font-bold flex items-center gap-2 shadow-md hover:scale-[1.01] transition-all cursor-pointer ml-auto"
            >
              <Save className="w-4 h-4" /> Save System settings
            </button>
          </div>

        </form>
      </div>

    </div>
  );
}

"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Settings, Save, CheckCircle, ToggleLeft, ToggleRight, Loader2, AlertTriangle } from "lucide-react";
import { api, type SiteSettings, ApiError } from "@/lib/api";

export default function SystemSettingsPage() {
  const [settings, setSettings] = useState<SiteSettings>({
    theme_primary: "#2563eb",
    theme_secondary: "#0d2e42",
    maintenance_mode: false,
    announcement: "",
    cookie_banner: true,
    ai_chat_enabled: true,
    custom_scripts: "",
    live_chat_widget_id: ""
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSaved, setIsSaved] = useState(false);

  const refreshData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await api.settings.get();
      setSettings(data);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Failed to load settings.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshData();
  }, [refreshData]);

  const handleChange = (key: keyof SiteSettings, value: string | boolean | null) => {
    setSettings((prev) => ({
      ...prev,
      [key]: value
    }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    try {
      const updated = await api.settings.update(settings);
      setSettings(updated);
      setIsSaved(true);
      setTimeout(() => setIsSaved(false), 3000);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Failed to save settings.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-20">
        <Loader2 className="w-6 h-6 animate-spin text-gray-400" />
      </div>
    );
  }

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

      {error && (
        <div className="p-3 rounded-lg bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900 text-red-600 dark:text-red-400 text-sm flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 flex-shrink-0" /> {error}
        </div>
      )}

      <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-150 dark:border-gray-800 shadow-sm overflow-hidden p-6 max-w-3xl">
        <form onSubmit={handleSave} className="space-y-6">

          {/* Theme Colors */}
          <div className="space-y-4 border-b border-gray-100 dark:border-gray-800 pb-5">
            <h3 className="text-xs font-bold text-gray-950 dark:text-white uppercase tracking-wider">Visual Theme Branding</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1.5 uppercase">Primary Accent Color</label>
                <div className="flex gap-2 items-center">
                  <input
                    type="color"
                    value={settings.theme_primary || "#2563eb"}
                    onChange={(e) => handleChange("theme_primary", e.target.value)}
                    className="w-10 h-10 border border-gray-200 dark:border-gray-700 rounded cursor-pointer p-0"
                  />
                  <input
                    type="text"
                    value={settings.theme_primary || "#2563eb"}
                    onChange={(e) => handleChange("theme_primary", e.target.value)}
                    className="flex-1 px-3.5 py-2 text-sm bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-slate-800 dark:text-slate-100 focus:outline-none"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1.5 uppercase">Secondary Base Color</label>
                <div className="flex gap-2 items-center">
                  <input
                    type="color"
                    value={settings.theme_secondary || "#0d2e42"}
                    onChange={(e) => handleChange("theme_secondary", e.target.value)}
                    className="w-10 h-10 border border-gray-200 dark:border-gray-700 rounded cursor-pointer p-0"
                  />
                  <input
                    type="text"
                    value={settings.theme_secondary || "#0d2e42"}
                    onChange={(e) => handleChange("theme_secondary", e.target.value)}
                    className="flex-1 px-3.5 py-2 text-sm bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-slate-800 dark:text-slate-100 focus:outline-none"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Announcement Bar */}
          <div className="space-y-4 border-b border-gray-100 dark:border-gray-800 pb-5">
            <h3 className="text-xs font-bold text-gray-950 dark:text-white uppercase tracking-wider">Announcement Banner</h3>
            <div>
              <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">Announcement Text (shown on frontend header)</label>
              <input
                type="text"
                value={settings.announcement || ""}
                onChange={(e) => handleChange("announcement", e.target.value || null)}
                placeholder="Free Home Collection available across India!"
                className="w-full px-3.5 py-2.5 text-sm bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-slate-800 dark:text-slate-100 focus:outline-none"
              />
            </div>
          </div>

          {/* Feature Toggles */}
          <div className="space-y-4 border-b border-gray-100 dark:border-gray-800 pb-5">
            <h3 className="text-xs font-bold text-gray-950 dark:text-white uppercase tracking-wider">Feature Toggles</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              <div className="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-700 rounded-xl bg-slate-50/50 dark:bg-gray-800/50">
                <div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white">Maintenance Mode</h4>
                  <p className="text-[10px] text-gray-500 dark:text-gray-400 mt-0.5">Locks public site layout behind lock screen.</p>
                </div>
                <button
                  type="button"
                  onClick={() => handleChange("maintenance_mode", !settings.maintenance_mode)}
                  className="p-1 focus:outline-none cursor-pointer"
                >
                  {settings.maintenance_mode ? (
                    <ToggleRight className="w-8 h-8 text-teal-600" />
                  ) : (
                    <ToggleLeft className="w-8 h-8 text-gray-400" />
                  )}
                </button>
              </div>

              <div className="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-700 rounded-xl bg-slate-50/50 dark:bg-gray-800/50">
                <div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white">Cookie Consent Banner</h4>
                  <p className="text-[10px] text-gray-500 dark:text-gray-400 mt-0.5">Toggle tracking notice popups for GDPR.</p>
                </div>
                <button
                  type="button"
                  onClick={() => handleChange("cookie_banner", !settings.cookie_banner)}
                  className="p-1 focus:outline-none cursor-pointer"
                >
                  {settings.cookie_banner ? (
                    <ToggleRight className="w-8 h-8 text-teal-600" />
                  ) : (
                    <ToggleLeft className="w-8 h-8 text-gray-400" />
                  )}
                </button>
              </div>

              <div className="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-700 rounded-xl bg-slate-50/50 dark:bg-gray-800/50">
                <div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white">AI Diagnostics Chatbot</h4>
                  <p className="text-[10px] text-gray-500 dark:text-gray-400 mt-0.5">Toggle AI support widget on public homepage.</p>
                </div>
                <button
                  type="button"
                  onClick={() => handleChange("ai_chat_enabled", !settings.ai_chat_enabled)}
                  className="p-1 focus:outline-none cursor-pointer"
                >
                  {settings.ai_chat_enabled ? (
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
            <h3 className="text-xs font-bold text-gray-950 dark:text-white uppercase tracking-wider">Integrations & External Scripts</h3>
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">Live Chat Widget ID (Tawk.to / Intercom)</label>
                <input
                  type="text"
                  value={settings.live_chat_widget_id || ""}
                  onChange={(e) => handleChange("live_chat_widget_id", e.target.value || null)}
                  placeholder="615a2eb7c1213f..."
                  className="w-full px-3.5 py-2 text-xs bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-slate-800 dark:text-slate-100 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">Custom Analytics Headers (Google Analytics / Facebook Pixel)</label>
                <textarea
                  rows={3}
                  value={settings.custom_scripts || ""}
                  onChange={(e) => handleChange("custom_scripts", e.target.value || null)}
                  placeholder="<!-- Global site tag (gtag.js) - Google Analytics -->"
                  className="w-full px-3.5 py-2.5 text-xs bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-slate-800 dark:text-slate-100 focus:outline-none resize-none font-mono"
                />
              </div>
            </div>
          </div>

          {/* Footer Save Button */}
          <div className="pt-5 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between">
            {isSaved && (
              <span className="text-emerald-600 dark:text-emerald-400 text-xs font-bold flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4" /> System Preferences saved!
              </span>
            )}
            {!isSaved && <div />}
            <button
              type="submit"
              disabled={saving}
              className="px-6 py-2.5 bg-teal-600 hover:bg-teal-700 disabled:opacity-60 text-white rounded-lg text-xs font-bold flex items-center gap-2 shadow-md hover:scale-[1.01] transition-all cursor-pointer ml-auto"
            >
              {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              Save System Settings
            </button>
          </div>

        </form>
      </div>

    </div>
  );
}

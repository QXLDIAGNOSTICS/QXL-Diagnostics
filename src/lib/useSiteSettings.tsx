"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { api, type SiteSettings } from "@/lib/api";

const defaultSettings: SiteSettings = {
  theme_primary: "#2563eb",
  theme_secondary: "#0d2e42",
  maintenance_mode: false,
  cookie_banner: true,
  ai_chat_enabled: true,
  announcement: null,
  custom_scripts: null,
  live_chat_widget_id: null,
};

const SiteSettingsContext = createContext<SiteSettings>(defaultSettings);

export function useSiteSettings() {
  return useContext(SiteSettingsContext);
}

export function SiteSettingsProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<SiteSettings>(defaultSettings);

  useEffect(() => {
    let cancelled = false;
    api.settings
      .get()
      .then((data) => {
        if (!cancelled) setSettings(data);
      })
      .catch((err) => {
        console.error("Failed to load site settings:", err);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  // Apply theme colors as CSS custom properties so all frontend components
  // can use them via var(--theme-primary) etc.
  useEffect(() => {
    const root = document.documentElement;
    if (settings.theme_primary) {
      root.style.setProperty("--theme-primary", settings.theme_primary);
    }
    if (settings.theme_secondary) {
      root.style.setProperty("--theme-secondary", settings.theme_secondary);
    }
  }, [settings.theme_primary, settings.theme_secondary]);

  return (
    <SiteSettingsContext.Provider value={settings}>
      {children}
    </SiteSettingsContext.Provider>
  );
}

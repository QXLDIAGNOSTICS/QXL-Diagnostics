"use client";
import { useEffect } from 'react';
import { cmsStore } from '../lib/cmsStore';

/**
 * Initializes app by syncing settings from backend API.
 * Runs once on first load and merges admin-configured values with defaults.
 * Should be placed near root of layout for early execution.
 */
export default function InitializeApp() {
  useEffect(() => {
    // Sync settings from API on first load
    cmsStore.syncSettingsFromAPI();
  }, []);

  return null; // Invisible component
}

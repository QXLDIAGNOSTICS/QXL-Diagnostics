"use client";

import { Bell, Search, Moon, Sun, Maximize, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/useAuth";
import { api } from "@/lib/api";
import { useEffect, useState } from "react";

export default function AdminHeader() {
  const { user } = useAuth();
  const router = useRouter();
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    setIsDark(root.classList.contains("dark"));
  }, []);

  const toggleDarkMode = () => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.remove("dark");
      setIsDark(false);
      localStorage.setItem("qxl_admin_theme", "light");
    } else {
      root.classList.add("dark");
      setIsDark(true);
      localStorage.setItem("qxl_admin_theme", "dark");
    }
  };

  // Restore theme on mount
  useEffect(() => {
    const saved = localStorage.getItem("qxl_admin_theme");
    if (saved === "dark") {
      document.documentElement.classList.add("dark");
      setIsDark(true);
    }
  }, []);

  const handleLogout = async () => {
    try {
      await api.auth.logout();
    } catch {
      // Even if the request fails, force the client back to login.
    }
    router.push("/admin/login");
  };

  const initial = (user?.name || user?.email || "A").charAt(0).toUpperCase();

  return (
    <header className="h-16 bg-white dark:bg-gray-900 border-b border-slate-200 dark:border-gray-800 flex items-center justify-between px-6 sticky top-0 z-10 shrink-0">
      
      {/* Search Bar */}
      <div className="flex-1 max-w-md">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 dark:text-slate-400" />
          <input 
            type="text" 
            placeholder="Search..." 
            className="w-full pl-10 pr-4 py-2 text-sm bg-slate-50 dark:bg-gray-800 border border-slate-300 dark:border-gray-700 rounded-full focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all text-slate-900 dark:text-slate-100 placeholder:text-slate-500 dark:placeholder:text-slate-400"
          />
        </div>
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-4">
        
        {/* Fullscreen */}
        <button className="p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-gray-800 rounded-full transition-colors hidden sm:block cursor-pointer">
          <Maximize className="w-5 h-5" />
        </button>

        {/* Theme Toggle */}
        <button
          onClick={toggleDarkMode}
          className="p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-gray-800 rounded-full transition-colors cursor-pointer"
          title={isDark ? "Switch to light mode" : "Switch to dark mode"}
        >
          {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>

        {/* Notifications */}
        <button className="relative p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-gray-800 rounded-full transition-colors cursor-pointer">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        <div className="h-6 w-px bg-slate-200 dark:bg-gray-700 mx-1"></div>

        {/* Profile */}
        <div className="flex items-center gap-3 p-1 pr-2 rounded-full">
          <div className="w-8 h-8 rounded-full bg-linear-to-br from-teal-500 to-emerald-600 flex items-center justify-center text-white font-bold text-sm shrink-0">
            {initial}
          </div>
          <div className="hidden sm:block text-sm">
            <p className="font-medium text-slate-800 dark:text-white leading-none">{user?.name || user?.email || "Admin"}</p>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 capitalize">{user?.role || "admin"}</p>
          </div>
        </div>

        <button
          onClick={handleLogout}
          title="Log out"
          className="p-2 text-slate-600 dark:text-slate-300 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/20 rounded-full transition-colors cursor-pointer"
        >
          <LogOut className="w-5 h-5" />
        </button>

      </div>
    </header>
  );
}

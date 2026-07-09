"use client";

import { Bell, Search, Moon, Maximize, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/useAuth";
import { api } from "@/lib/api";

export default function AdminHeader() {
  const { user } = useAuth();
  const router = useRouter();

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
    <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 sticky top-0 z-10 shrink-0">
      
      {/* Search Bar */}
      <div className="flex-1 max-w-md">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input 
            type="text" 
            placeholder="Search..." 
            className="w-full pl-10 pr-4 py-2 text-sm bg-slate-50 border border-slate-300 rounded-full focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all text-slate-900 placeholder:text-slate-500"
          />
        </div>
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-4">
        
        {/* Fullscreen */}
        <button className="p-2 text-slate-600 hover:bg-slate-100 rounded-full transition-colors hidden sm:block">
          <Maximize className="w-5 h-5" />
        </button>

        {/* Theme Toggle placeholder */}
        <button className="p-2 text-slate-600 hover:bg-slate-100 rounded-full transition-colors">
          <Moon className="w-5 h-5" />
        </button>

        {/* Notifications */}
        <button className="relative p-2 text-slate-600 hover:bg-slate-100 rounded-full transition-colors">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        <div className="h-6 w-px bg-slate-200 mx-1"></div>

        {/* Profile */}
        <div className="flex items-center gap-3 p-1 pr-2 rounded-full">
          <div className="w-8 h-8 rounded-full bg-linear-to-br from-teal-500 to-emerald-600 flex items-center justify-center text-white font-bold text-sm shrink-0">
            {initial}
          </div>
          <div className="hidden sm:block text-sm">
            <p className="font-medium text-slate-800 leading-none">{user?.name || user?.email || "Admin"}</p>
            <p className="text-xs text-slate-500 mt-1 capitalize">{user?.role || "admin"}</p>
          </div>
        </div>

        <button
          onClick={handleLogout}
          title="Log out"
          className="p-2 text-slate-600 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors cursor-pointer"
        >
          <LogOut className="w-5 h-5" />
        </button>

      </div>
    </header>
  );
}


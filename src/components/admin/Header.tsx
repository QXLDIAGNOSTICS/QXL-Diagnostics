import { Bell, Search, Moon, Sun, Maximize, User, LogOut } from "lucide-react";

export default function AdminHeader() {
  return (
    <header className="h-16 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between px-6 sticky top-0 z-10 shrink-0">
      
      {/* Search Bar */}
      <div className="flex-1 max-w-md">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search..." 
            className="w-full pl-10 pr-4 py-2 text-sm bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all"
          />
        </div>
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-4">
        
        {/* Fullscreen */}
        <button className="p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors hidden sm:block">
          <Maximize className="w-5 h-5" />
        </button>

        {/* Theme Toggle placeholder */}
        <button className="p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors">
          <Moon className="w-5 h-5" />
        </button>

        {/* Notifications */}
        <button className="relative p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        <div className="h-6 w-px bg-gray-200 dark:bg-gray-700 mx-1"></div>

        {/* Profile Dropdown Placeholder */}
        <div className="flex items-center gap-3 cursor-pointer p-1 pr-2 rounded-full hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
          <div className="w-8 h-8 rounded-full bg-teal-100 dark:bg-teal-900 flex items-center justify-center text-teal-600 dark:text-teal-400 font-bold text-sm">
            A
          </div>
          <div className="hidden sm:block text-sm">
            <p className="font-medium text-gray-700 dark:text-gray-200 leading-none">Admin User</p>
            <p className="text-xs text-gray-500 mt-1">Super Admin</p>
          </div>
        </div>

      </div>
    </header>
  );
}

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Globe,
  Image as ImageIcon,
  Users,
  Building2,
  Stethoscope,
  Activity,
  CalendarDays,
  FileText,
  MessageSquare,
  ImagePlay,
  HelpCircle,
  Star,
  Briefcase,
  Store,
  Mail,
  MapPin,
  UserCog,
  ShieldCheck,
  Search,
  BarChart3,
  Megaphone,
  Settings,
  ListTodo,
  Truck,
  BrainCircuit,
  type LucideIcon,
} from "lucide-react";
import { useAuth } from "@/lib/useAuth";
import { canAccessNav, type NavAccess, ROLE_LABELS } from "@/lib/roles";

interface NavLink {
  name: string;
  href: string;
  icon: LucideIcon;
  access: NavAccess;
}

const sidebarLinks: NavLink[] = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard, access: "admin" },
  { name: "Appointments", href: "/appointments", icon: CalendarDays, access: "staff" },
  { name: "Home Collection", href: "/home-collection", icon: Truck, access: "staff" },
  { name: "Patients", href: "/patients", icon: Users, access: "staff" },
  { name: "Reports", href: "/reports", icon: FileText, access: "staff" },
  { name: "Website Mgt", href: "/website", icon: Globe, access: "admin" },
  { name: "Banners", href: "/banners", icon: ImageIcon, access: "admin" },
  { name: "Doctors", href: "/doctors", icon: Stethoscope, access: "admin" },
  { name: "Departments", href: "/departments", icon: Building2, access: "admin" },
  { name: "Tests", href: "/tests", icon: Activity, access: "admin" },
  { name: "Packages", href: "/packages", icon: Briefcase, access: "admin" },
  { name: "Blog", href: "/blog", icon: MessageSquare, access: "admin" },
  { name: "Gallery", href: "/gallery", icon: ImagePlay, access: "admin" },
  { name: "Testimonials", href: "/testimonials", icon: Star, access: "admin" },
  { name: "FAQ", href: "/faq", icon: HelpCircle, access: "admin" },
  { name: "Reviews", href: "/reviews", icon: Star, access: "admin" },
  { name: "Careers", href: "/careers", icon: Briefcase, access: "admin" },
  { name: "Collaboration", href: "/franchise", icon: Store, access: "admin" },
  { name: "Enquiries", href: "/enquiries", icon: Mail, access: "admin" },
  { name: "Locations", href: "/locations", icon: MapPin, access: "admin" },
  { name: "Chatbot Knowledge Base", href: "/knowledge-base", icon: BrainCircuit, access: "admin" },
  { name: "Users", href: "/users", icon: UserCog, access: "admin" },
  { name: "Roles", href: "/roles", icon: ShieldCheck, access: "admin" },
  { name: "SEO", href: "/seo", icon: Search, access: "admin" },
  { name: "Analytics", href: "/analytics", icon: BarChart3, access: "admin" },
  { name: "Marketing", href: "/marketing", icon: Megaphone, access: "admin" },
  { name: "Settings", href: "/settings", icon: Settings, access: "admin" },
  { name: "Activity Logs", href: "/logs", icon: ListTodo, access: "admin" },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const { user } = useAuth();
  const role = user?.role;
  const visible = sidebarLinks.filter((link) => canAccessNav(role, link.access));

  return (
    <aside className="w-64 bg-white dark:bg-gray-900 border-r border-slate-200 dark:border-gray-800 hidden md:flex flex-col h-screen sticky top-0 overflow-hidden shrink-0">
      <div className="h-16 flex items-center gap-2.5 px-6 border-b border-slate-200 dark:border-gray-800">
        <div className="w-8 h-8 rounded-lg bg-linear-to-br from-sky-400 to-blue-600 flex items-center justify-center text-white font-black text-sm shadow-sm shadow-sky-500/30">
          Q
        </div>
        <div>
          <h1 className="text-lg font-bold text-slate-900 dark:text-white leading-tight">
            QXL <span className="text-sky-700 dark:text-sky-400">Admin</span>
          </h1>
          <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">
            {ROLE_LABELS[role || ""] || "Staff"}
          </p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto py-4 px-3 space-y-1 custom-scrollbar">
        {visible.map((link) => {
          const Icon = link.icon;
          const isActive =
            link.href === "/"
              ? pathname === "/"
              : pathname === link.href || pathname?.startsWith(`${link.href}/`);
          return (
            <Link
              key={link.name}
              href={link.href}
              className={`flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                isActive
                  ? "bg-sky-100 dark:bg-sky-950/30 text-sky-800 dark:text-sky-300 font-semibold"
                  : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-gray-800 hover:text-sky-700 dark:hover:text-sky-400"
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? "opacity-100" : "opacity-75"}`} />
              {link.name}
              {isActive && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-sky-500" />}
            </Link>
          );
        })}
      </div>

      <style
        dangerouslySetInnerHTML={{
          __html: `
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 10px; }
        .dark .custom-scrollbar::-webkit-scrollbar-thumb { background: #374151; }
      `,
        }}
      />
    </aside>
  );
}

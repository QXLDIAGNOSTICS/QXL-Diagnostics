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
  BrainCircuit
} from "lucide-react";

const sidebarLinks = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Website Mgt", href: "/admin/website", icon: Globe },
  { name: "Banners", href: "/admin/banners", icon: ImageIcon },
  { name: "Doctors", href: "/admin/doctors", icon: Stethoscope },
  { name: "Departments", href: "/admin/departments", icon: Building2 },
  { name: "Tests", href: "/admin/tests", icon: Activity },
  { name: "Packages", href: "/admin/packages", icon: Briefcase },
  { name: "Appointments", href: "/admin/appointments", icon: CalendarDays },
  { name: "Patients", href: "/admin/patients", icon: Users },
  { name: "Reports", href: "/admin/reports", icon: FileText },
  { name: "Blog", href: "/admin/blog", icon: MessageSquare },
  { name: "Gallery", href: "/admin/gallery", icon: ImagePlay },
  { name: "Testimonials", href: "/admin/testimonials", icon: Star },
  { name: "FAQ", href: "/admin/faq", icon: HelpCircle },
  { name: "Reviews", href: "/admin/reviews", icon: Star },
  { name: "Careers", href: "/admin/careers", icon: Briefcase },
  { name: "Collaboration", href: "/admin/franchise", icon: Store },
  { name: "Enquiries", href: "/admin/enquiries", icon: Mail },
  { name: "Home Collection", href: "/admin/home-collection", icon: Truck },
  { name: "Locations", href: "/admin/locations", icon: MapPin },
  { name: "Chatbot Knowledge Base", href: "/admin/knowledge-base", icon: BrainCircuit },
  { name: "Users", href: "/admin/users", icon: UserCog },
  { name: "Roles", href: "/admin/roles", icon: ShieldCheck },
  { name: "SEO", href: "/admin/seo", icon: Search },
  { name: "Analytics", href: "/admin/analytics", icon: BarChart3 },
  { name: "Marketing", href: "/admin/marketing", icon: Megaphone },
  { name: "Settings", href: "/admin/settings", icon: Settings },
  { name: "Activity Logs", href: "/admin/logs", icon: ListTodo },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 hidden md:flex flex-col h-screen sticky top-0 overflow-hidden shrink-0">
      <div className="h-16 flex items-center gap-2.5 px-6 border-b border-gray-200 dark:border-gray-800">
        <div className="w-8 h-8 rounded-lg bg-linear-to-br from-teal-500 to-emerald-600 flex items-center justify-center text-white font-black text-sm shadow-sm shadow-teal-500/30">
          Q
        </div>
        <h1 className="text-lg font-bold text-gray-900 dark:text-white">
          QXL <span className="text-teal-600 dark:text-teal-400">Admin</span>
        </h1>
      </div>
      
      <div className="flex-1 overflow-y-auto py-4 px-3 space-y-1 custom-scrollbar">
        {sidebarLinks.map((link) => {
          const Icon = link.icon;
          const isActive = link.href === "/admin" ? pathname === "/admin" : pathname?.startsWith(link.href);
          return (
            <Link
              key={link.name}
              href={link.href}
              className={`flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                isActive
                  ? "bg-teal-50 text-teal-700 dark:bg-teal-500/10 dark:text-teal-400 font-semibold"
                  : "text-gray-700 hover:bg-gray-100 hover:text-teal-600 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-teal-400"
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? "opacity-100" : "opacity-75"}`} />
              {link.name}
              {isActive && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-teal-500" />}
            </Link>
          );
        })}
      </div>
      
      <style dangerouslySetInnerHTML={{__html: `
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 10px; }
        .dark .custom-scrollbar::-webkit-scrollbar-thumb { background: #334155; }
      `}} />
    </aside>
  );
}

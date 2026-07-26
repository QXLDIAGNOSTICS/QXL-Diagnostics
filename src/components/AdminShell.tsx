"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import AdminSidebar from "@/components/admin/Sidebar";
import AdminHeader from "@/components/admin/Header";
import { useAuth } from "@/lib/useAuth";
import { isStaff } from "@/lib/roles";

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const isLoginPage = pathname === "/login";
  const { user, loading } = useAuth();
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    if (loading) return;
    if (!isStaff(user?.role) && !isLoginPage) {
      router.push("/login");
    }
    // Front-office staff landing on the CMS dashboard → send them to appointments.
    if (user?.role === "front_office" && pathname === "/") {
      router.replace("/appointments");
      return;
    }
    setChecked(true);
  }, [loading, user, isLoginPage, router, pathname]);

  if (isLoginPage) {
    return <>{children}</>;
  }

  if (loading || !checked || !isStaff(user?.role)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f4f8ff] dark:bg-gray-950">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-sky-600" />
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-[#f4f8ff] dark:bg-gray-950 font-sans text-slate-900 dark:text-slate-100">
      <AdminSidebar />
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <AdminHeader />
        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8 custom-scrollbar bg-[#f4f8ff] dark:bg-gray-950">
          {children}
        </main>
      </div>
    </div>
  );
}

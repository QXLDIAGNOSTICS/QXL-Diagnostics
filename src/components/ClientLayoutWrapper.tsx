"use client";

import { usePathname } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AiChat from "@/components/AiChat";
import StickyMobileCTA from "@/components/StickyMobileCTA";
import { AuthProvider } from "@/lib/useAuth";
import { SiteSettingsProvider } from "@/lib/useSiteSettings";

export default function ClientLayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith("/admin");

  return (
    <AuthProvider>
      <SiteSettingsProvider>
        {!isAdminRoute && <Header />}
        <main className={!isAdminRoute ? "pb-[60px] md:pb-0" : ""}>{children}</main>
        {!isAdminRoute && <Footer />}
        {!isAdminRoute && <AiChat />}
        {!isAdminRoute && <StickyMobileCTA />}
      </SiteSettingsProvider>
    </AuthProvider>
  );
}

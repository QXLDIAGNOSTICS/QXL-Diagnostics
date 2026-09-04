"use client";

import { usePathname } from "next/navigation";
import dynamic from "next/dynamic";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { AuthProvider } from "@/lib/useAuth";
import { SiteSettingsProvider } from "@/lib/useSiteSettings";

import WhatsAppButton from "@/components/WhatsAppButton";

const AiChat = dynamic(() => import("@/components/AiChat"), { ssr: false });

export default function ClientLayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith("/admin");
  const isNoFooterRoute = pathname === "/login" || pathname === "/tests";

  return (
    <AuthProvider>
      <SiteSettingsProvider>
        {!isAdminRoute && <Header />}
        <main className={!isAdminRoute ? "pb-[60px] md:pb-0" : ""}>{children}</main>
        {!isAdminRoute && !isNoFooterRoute && <Footer />}
        {!isAdminRoute && !isNoFooterRoute && <AiChat />}
        {!isAdminRoute && <WhatsAppButton />}
      </SiteSettingsProvider>
    </AuthProvider>
  );
}

"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";
import { Loader2 } from "lucide-react";

export default function LogoutPage() {
  const router = useRouter();

  useEffect(() => {
    api.auth
      .logout()
      .catch(() => {})
      .finally(() => {
        router.push("/login");
      });
  }, [router]);

  return (
    <div className="min-h-screen bg-[#f8faff] flex items-center justify-center p-4">
      <div className="flex items-center gap-3 text-slate-500 font-bold text-sm">
        <Loader2 className="w-5 h-5 animate-spin text-[#2563eb]" />
        Signing out of QXL Diagnostics...
      </div>
    </div>
  );
}

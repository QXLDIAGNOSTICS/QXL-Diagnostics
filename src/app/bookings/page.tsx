"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function BookingsPluralPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/dashboard");
  }, [router]);

  return (
    <div className="bg-[#f8faff] min-h-screen flex items-center justify-center p-6">
      <div className="text-center space-y-3">
        <div className="w-8 h-8 border-2 border-[#D69A18] border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="text-xs font-bold text-[#0f2d5e]">Loading your bookings dashboard…</p>
      </div>
    </div>
  );
}

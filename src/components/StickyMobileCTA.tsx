"use client";
import Link from "next/link";
import { Phone, CalendarCheck, FileText } from "lucide-react";
import { motion } from "framer-motion";

export default function StickyMobileCTA() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-[999] md:hidden bg-white border-t border-gray-200 shadow-[0_-4px_24px_rgba(0,0,0,0.10)] safe-area-pb">
      <div className="grid grid-cols-3 divide-x divide-gray-200">
        {/* Call */}
        <motion.a
          whileTap={{ scale: 0.95 }}
          href="tel:+919964639639"
          className="flex flex-col items-center justify-center py-3 gap-1 text-sky-700 hover:bg-sky-50 active:bg-sky-100 transition-colors"
          aria-label="Call QXL Diagnostics"
        >
          <Phone className="w-5 h-5" strokeWidth={2.2} />
          <span className="text-[10px] font-bold tracking-tight leading-none">Call Now</span>
        </motion.a>

        {/* Book Test */}
        <motion.div whileTap={{ scale: 0.95 }} className="w-full h-full">
          <Link
            href="/book"
            className="flex flex-col items-center justify-center py-3 gap-1 bg-[#2563eb] text-white hover:bg-[#1d4ed8] active:bg-[#1e40af] transition-colors h-full relative"
            aria-label="Book a Test at QXL Diagnostics"
          >
            <CalendarCheck className="w-5 h-5 z-10" strokeWidth={2.2} />
            <span className="text-[10px] font-bold tracking-tight leading-none z-10">Book Test</span>
          </Link>
        </motion.div>

        {/* Upload Prescription */}
        <motion.div whileTap={{ scale: 0.95 }} className="w-full h-full">
          <Link
            href="/upload-prescription"
            className="flex flex-col items-center justify-center py-3 gap-1 text-sky-700 hover:bg-sky-50 active:bg-sky-100 transition-colors h-full"
            aria-label="Upload Prescription to QXL Diagnostics"
          >
            <FileText className="w-5 h-5" strokeWidth={2.2} />
            <span className="text-[10px] font-bold tracking-tight leading-none">Prescription</span>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}


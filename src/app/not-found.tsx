import Link from "next/link";
import { Home, Search, Phone } from "lucide-react";

export default function NotFound() {
  return (
    <div className="bg-[#f8faff] min-h-[70vh] flex items-center justify-center px-4 py-20">
      <div className="text-center max-w-lg">
        <p className="text-7xl font-black text-[#2563eb] mb-2">404</p>
        <h1 className="text-2xl md:text-3xl font-extrabold text-[#0f2d5e] mb-3">
          Page Not Found
        </h1>
        <p className="text-slate-500 text-sm md:text-base font-medium mb-8 leading-relaxed">
          The page you&apos;re looking for doesn&apos;t exist or may have been moved. Let&apos;s get you back on track.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-[#2563eb] text-white font-bold px-6 py-3 rounded-full text-sm uppercase tracking-wider hover:bg-[#1d4ed8] transition-colors"
          >
            <Home className="w-4 h-4" /> Go Home
          </Link>
          <Link
            href="/packages"
            className="inline-flex items-center gap-2 bg-white border border-gray-200 text-slate-700 font-bold px-6 py-3 rounded-full text-sm uppercase tracking-wider hover:bg-gray-50 transition-colors"
          >
            <Search className="w-4 h-4" /> Browse Packages
          </Link>
          <a
            href="tel:+919964639639"
            className="inline-flex items-center gap-2 bg-white border border-gray-200 text-slate-700 font-bold px-6 py-3 rounded-full text-sm uppercase tracking-wider hover:bg-gray-50 transition-colors"
          >
            <Phone className="w-4 h-4" /> Call Us
          </a>
        </div>
      </div>
    </div>
  );
}

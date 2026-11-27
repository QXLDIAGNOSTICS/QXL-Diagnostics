"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { KN_TO_EN } from "@/content/kn/common";

/** English | ಕನ್ನಡ switch shown on every Kannada page. Also marks the document as Kannada. */
export default function KnLanguageBar() {
  const pathname = usePathname() ?? "/kn";
  const path = pathname.replace(/\/$/, "") || "/kn";
  const enHref = KN_TO_EN[path] ?? (path.startsWith("/kn/blog") ? "/blog" : "/");

  useEffect(() => {
    const html = document.documentElement;
    const prev = html.lang;
    html.lang = "kn-IN";
    return () => {
      html.lang = prev || "en-IN";
    };
  }, []);

  return (
    <div className="border-b border-blue-100 bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-2 text-sm">
        <span className="text-slate-600">ನೀವು ಕನ್ನಡ ಆವೃತ್ತಿಯನ್ನು ನೋಡುತ್ತಿದ್ದೀರಿ</span>
        <nav aria-label="ಭಾಷೆ / Language" className="flex items-center gap-1 rounded-full border border-slate-200 p-0.5">
          <Link href={enHref} hrefLang="en-IN" lang="en" className="rounded-full px-3 py-1 font-semibold text-slate-600 hover:text-[#2563eb]">
            English
          </Link>
          <span aria-current="page" className="rounded-full bg-[#2563eb] px-3 py-1 font-bold text-white">
            ಕನ್ನಡ
          </span>
        </nav>
      </div>
    </div>
  );
}

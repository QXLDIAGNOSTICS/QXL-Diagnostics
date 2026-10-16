"use client";

import React, { useState, useEffect } from "react";
import { Share2, Check, Copy, Printer, MessageCircle } from "lucide-react";

interface BlogShareBarProps {
  title: string;
  slug: string;
  author?: string;
}

export default function BlogShareBar({ title, slug, author }: BlogShareBarProps) {
  const [copied, setCopied] = useState(false);
  const [currentUrl, setCurrentUrl] = useState(`https://qxldiagnostics.com/blog/${slug}`);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setCurrentUrl(window.location.href);
    }
  }, []);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(currentUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback
    }
  };

  const handleNativeShare = async () => {
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({
          title,
          text: `Check out this clinical guide from QXL Diagnostics: ${title}`,
          url: currentUrl,
        });
        return;
      } catch {
        // Fall back to copy
      }
    }
    handleCopy();
  };

  const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(
    `*${title}* - QXL Diagnostics Clinical Guide\n\nRead here: ${currentUrl}`
  )}`;

  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
    title
  )}&url=${encodeURIComponent(currentUrl)}&via=qxldiagnostics`;

  const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
    currentUrl
  )}`;

  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 py-3 px-4 rounded-xl bg-slate-50 border border-slate-200/80 my-6 not-prose">
      <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
        <Share2 className="w-4 h-4 text-blue-600" />
        <span>Share Clinical Guide:</span>
      </div>

      <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
        {/* WhatsApp Share */}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#25D366]/10 hover:bg-[#25D366]/20 text-[#128C7E] font-bold text-xs rounded-lg transition-colors"
          title="Share on WhatsApp"
        >
          <MessageCircle className="w-3.5 h-3.5 fill-current" />
          <span className="hidden sm:inline">WhatsApp</span>
        </a>

        {/* LinkedIn Share */}
        <a
          href={linkedinUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-[#0077b5] font-bold text-xs rounded-lg transition-colors"
          title="Share on LinkedIn"
        >
          <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76c-.95 0-1.72-.78-1.72-1.73a1.73 1.73 0 0 1 1.72-1.73 1.73 1.73 0 0 1 1.73 1.73c0 .95-.78 1.73-1.73 1.73m1.4 9.74v-8.37H5.06v8.37h2.8z" />
          </svg>
          <span className="hidden sm:inline">LinkedIn</span>
        </a>

        {/* Twitter/X Share */}
        <a
          href={twitterUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs rounded-lg transition-colors"
          title="Share on X"
        >
          <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
          <span className="hidden sm:inline">X</span>
        </a>

        {/* Copy Link */}
        <button
          onClick={handleCopy}
          type="button"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 font-bold text-xs rounded-lg transition-colors shadow-2xs cursor-pointer"
          title="Copy direct link"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-600" />
              <span className="text-emerald-700">Copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span>Copy Link</span>
            </>
          )}
        </button>

        {/* Print / Save */}
        <button
          onClick={handlePrint}
          type="button"
          className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 text-slate-500 hover:text-slate-800 font-medium text-xs rounded-lg transition-colors"
          title="Print or save as PDF"
        >
          <Printer className="w-3.5 h-3.5" />
          <span>Print</span>
        </button>
      </div>
    </div>
  );
}

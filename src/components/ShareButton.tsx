"use client";

import React, { useState } from "react";
import { Share2, Check } from "lucide-react";

export default function ShareButton({ title }: { title: string }) {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    if (typeof window !== "undefined") {
      if (navigator.share) {
        try {
          await navigator.share({
            title,
            url: window.location.href,
          });
          return;
        } catch {
          // Fall through to clipboard
        }
      }
      try {
        await navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (e) {
        console.error("Failed to copy link", e);
      }
    }
  };

  return (
    <button
      onClick={handleShare}
      type="button"
      className="flex items-center gap-2 ml-auto text-[#2563eb] hover:bg-[#dbeafe] px-3 py-1.5 rounded-lg transition-colors cursor-pointer text-sm font-semibold"
      title="Share or copy article link"
      aria-label="Share article"
    >
      {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4" />}
      <span>{copied ? "Link Copied!" : "Share"}</span>
    </button>
  );
}

"use client";

import React, { useState, useEffect } from "react";
import { ListCollapse, ChevronDown, BookOpen, Check } from "lucide-react";
import type { HeadingItem } from "@/lib/blogUtils";

interface TableOfContentsProps {
  headings: HeadingItem[];
}

export default function TableOfContents({ headings }: TableOfContentsProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    // Expand by default on tablet and desktop (>= 768px), keep collapsed on mobile
    if (typeof window !== "undefined" && window.innerWidth >= 768) {
      setIsOpen(true);
    }
  }, []);

  useEffect(() => {
    if (!headings.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-80px 0px -60% 0px",
        threshold: 0.1,
      }
    );

    headings.forEach((heading) => {
      const el = document.getElementById(heading.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [headings]);

  if (!headings || headings.length === 0) return null;

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const target = document.getElementById(id);
    if (target) {
      const topOffset = 100;
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - topOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });

      // Update URL hash without jump
      window.history.pushState(null, "", `#${id}`);
      setActiveId(id);
    }
  };

  return (
    <nav
      aria-label="Table of contents"
      className="my-8 rounded-2xl border border-blue-100 bg-gradient-to-br from-slate-50 via-blue-50/40 to-indigo-50/30 p-5 sm:p-6 shadow-xs not-prose transition-all"
    >
      <div className="flex items-center justify-between gap-4">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2.5 text-left text-slate-900 font-extrabold text-base md:text-lg hover:text-blue-600 transition-colors focus:outline-none cursor-pointer w-full"
          aria-expanded={isOpen}
        >
          <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-xs">
            <BookOpen className="w-4 h-4" />
          </div>
          <div className="flex-1">
            <span className="block leading-snug">In This Clinical Guide</span>
            <span className="text-xs font-semibold text-slate-500">
              {headings.length} Key Sections · Evidence &amp; Timeline
            </span>
          </div>
          <ChevronDown
            className={`w-5 h-5 text-slate-500 transition-transform duration-200 shrink-0 ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </button>
      </div>

      {isOpen && (
        <div className="mt-4 pt-4 border-t border-blue-100/80">
          <ol className="space-y-1.5 text-xs sm:text-sm max-h-[380px] overflow-y-auto pr-2 custom-scrollbar">
            {headings.map((item, index) => {
              const isActive = activeId === item.id;
              const isSub = item.level === 3;

              return (
                <li
                  key={`${item.id}-${index}`}
                  className={`${isSub ? "ml-4 sm:ml-6" : ""}`}
                >
                  <a
                    href={`#${item.id}`}
                    onClick={(e) => scrollToSection(e, item.id)}
                    className={`group flex items-start gap-2 py-1.5 px-2.5 rounded-lg transition-all leading-snug ${
                      isActive
                        ? "bg-blue-600 text-white font-bold shadow-xs"
                        : "text-slate-700 hover:text-blue-600 hover:bg-white/80 font-medium"
                    }`}
                  >
                    <span
                      className={`text-[11px] font-mono shrink-0 mt-0.5 ${
                        isActive ? "text-blue-200" : "text-slate-400 group-hover:text-blue-500"
                      }`}
                    >
                      {index + 1}.
                    </span>
                    <span className="flex-1 line-clamp-2">{item.text}</span>
                  </a>
                </li>
              );
            })}
          </ol>
        </div>
      )}
    </nav>
  );
}

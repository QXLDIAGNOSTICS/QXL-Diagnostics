"use client";
import React from 'react';
import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

export default function Breadcrumbs({ items, className = '' }: BreadcrumbsProps) {
  const allItems: BreadcrumbItem[] = [
    { label: 'Home', href: '/' },
    ...items,
  ];

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: allItems.map((item, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      name: item.label,
      ...(item.href ? { item: `${typeof window !== 'undefined' ? window.location.origin : ''}${item.href}` } : {}),
    })),
  };

  return (
    <nav aria-label="Breadcrumb" className={`flex items-center flex-wrap gap-1 text-xs font-semibold ${className}`}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {allItems.map((item, index) => {
        const isLast = index === allItems.length - 1;

        return (
          <span key={index} className="flex items-center gap-1 min-w-0">
            {index > 0 && (
              <ChevronRight className="w-3 h-3 text-slate-300 flex-shrink-0" />
            )}
            {isLast || !item.href ? (
              <span
                className={`truncate max-w-[140px] sm:max-w-none ${isLast ? 'text-slate-700' : 'text-slate-400'}`}
                aria-current={isLast ? 'page' : undefined}
              >
                {index === 0 ? (
                  <span className="flex items-center gap-1">
                    <Home className="w-3 h-3 flex-shrink-0" />
                    <span className="hidden sm:inline">{item.label}</span>
                  </span>
                ) : (
                  item.label
                )}
              </span>
            ) : (
              <Link
                href={item.href}
                className="text-slate-400 hover:text-[#2563eb] transition-colors truncate max-w-[140px] sm:max-w-none"
              >
                {index === 0 ? (
                  <span className="flex items-center gap-1">
                    <Home className="w-3 h-3 flex-shrink-0" />
                    <span className="hidden sm:inline">{item.label}</span>
                  </span>
                ) : (
                  item.label
                )}
              </Link>
            )}
          </span>
        );
      })}
    </nav>
  );
}

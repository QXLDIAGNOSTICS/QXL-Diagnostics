"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import {
  Calendar,
  Clock,
  ArrowRight,
  Search,
  X,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  MapPin,
  SlidersHorizontal,
  ChevronRight,
  Phone,
  MessageCircle,
} from "lucide-react";
import { api, type BlogPost } from "../../lib/api";
import { cmsStore } from "../../lib/cmsStore";
import { defaultBlogs, getBlogCategory, getReadingTime } from "../../lib/blogsData";

const CATEGORIES = [
  "All",
  "Pregnancy & Women's Health",
  "Cardiology & Heart",
  "Liver & Kidney",
  "Diabetes & Thyroid",
  "Allergy & Immunology",
  "Lab Science & NABL",
  "Preventive Health",
];

export default function BlogPage() {
  const [blogs, setBlogs] = useState<any[]>(defaultBlogs);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    let cancelled = false;
    (async () => {
      let apiItems: BlogPost[] = [];
      try {
        const { items } = await api.blog.list(50, 0);
        if (items && items.length > 0) apiItems = items;
      } catch {
        // Fallback to cmsStore / defaultBlogs
      }
      if (cancelled) return;

      const cmsBlogs = cmsStore.getAll("blogs");
      const map = new Map<string, any>();

      // Seed with defaultBlogs first to ensure all rich metadata & Cloudinary covers exist
      for (const item of defaultBlogs) {
        if (item.slug) map.set(item.slug, item);
      }
      for (const item of cmsBlogs) {
        if (item.slug) map.set(item.slug, { ...(map.get(item.slug) || {}), ...item });
      }
      for (const item of apiItems) {
        if (item.slug) map.set(item.slug, { ...(map.get(item.slug) || {}), ...item });
      }

      const getTime = (item: any) => {
        if (item.id === "blog-new-22" || item.slug === "personalised-pregnancy-testing-bengaluru") {
          return new Date("2026-10-16T12:00:00.000Z").getTime();
        }
        if (item.id === "blog-new-21" || item.slug === "apob-vs-ldl-c-atherogenic-cardiovascular-risk-guide") {
          return new Date("2026-10-15T09:00:00.000Z").getTime();
        }
        if (item.id === "blog-new-20" || item.slug === "your-liver-works-in-silence-simple-blood-test") {
          return new Date("2026-10-10T10:00:00.000Z").getTime();
        }
        const val = item.created_at || item.date;
        if (!val) return 0;
        const parsed = new Date(val).getTime();
        return isNaN(parsed) ? 0 : parsed;
      };

      const all = Array.from(map.values());
      all.sort((a, b) => getTime(b) - getTime(a));

      setBlogs(all);
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  // Filtered list based on category and search query
  const filteredBlogs = useMemo(() => {
    return blogs.filter((blog) => {
      const category = getBlogCategory(blog);
      const matchesCategory =
        selectedCategory === "All" || category === selectedCategory;

      if (!matchesCategory) return false;

      if (!searchQuery.trim()) return true;

      const q = searchQuery.toLowerCase().trim();
      const titleMatch = (blog.title || "").toLowerCase().includes(q);
      const excerptMatch = (blog.excerpt || "").toLowerCase().includes(q);
      const authorMatch = (blog.author || "").toLowerCase().includes(q);
      const categoryMatch = category.toLowerCase().includes(q);

      return titleMatch || excerptMatch || authorMatch || categoryMatch;
    });
  }, [blogs, selectedCategory, searchQuery]);

  // Featured article: Latest flagship article ("personalised-pregnancy-testing-bengaluru")
  const featuredBlog = useMemo(() => {
    if (selectedCategory !== "All" && selectedCategory !== "Pregnancy & Women's Health") {
      return null;
    }
    if (searchQuery.trim()) return null;
    return blogs.find((b) => b.slug === "personalised-pregnancy-testing-bengaluru") || blogs[0];
  }, [blogs, selectedCategory, searchQuery]);

  // Remaining articles for the grid
  const gridBlogs = useMemo(() => {
    if (!featuredBlog) return filteredBlogs;
    return filteredBlogs.filter((b) => b.slug !== featuredBlog.slug);
  }, [filteredBlogs, featuredBlog]);

  // Category counts
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { All: blogs.length };
    CATEGORIES.forEach((cat) => {
      if (cat !== "All") counts[cat] = 0;
    });
    blogs.forEach((b) => {
      const cat = getBlogCategory(b);
      if (counts[cat] !== undefined) {
        counts[cat] = (counts[cat] || 0) + 1;
      }
    });
    return counts;
  }, [blogs]);

  return (
    <div className="min-h-screen bg-[#f8faff] py-10 md:py-16">
      <div className="max-w-[1240px] mx-auto px-4 w-full">
        {/* Hero Header */}
        <div className="text-center mb-10 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-[#dbeafe] text-[#1d4ed8] text-[11px] font-extrabold px-3.5 py-1.5 rounded-full uppercase tracking-wider mb-4 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-[#2563eb]" />
            Evidence-Reviewed Diagnostic Insights
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0d2e42] tracking-tight mb-4 leading-[1.15]">
            Clinical Knowledge &amp; Health Guides
          </h1>
          <p className="text-slate-600 text-sm sm:text-base font-medium leading-relaxed">
            Written and reviewed by consultant pathologists and biochemists at QXL Diagnostics Bengaluru. Explore evidence-based pregnancy screening, cardiology markers, organ profiles, and quality-assured laboratory science.
          </p>

          {/* Quick Trust Badges */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 mt-6 text-xs font-bold text-slate-600">
            <span className="flex items-center gap-1.5 bg-white border border-slate-200 px-3 py-1.5 rounded-full shadow-2xs">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              NABL Accredited (MC-6849)
            </span>
            <span className="flex items-center gap-1.5 bg-white border border-slate-200 px-3 py-1.5 rounded-full shadow-2xs">
              <Stethoscope className="w-4 h-4 text-blue-600" />
              Doctor-Reviewed Content
            </span>
            <span className="flex items-center gap-1.5 bg-white border border-slate-200 px-3 py-1.5 rounded-full shadow-2xs">
              <MapPin className="w-4 h-4 text-amber-600" />
              Bengaluru Central Lab &amp; Doorstep Phlebotomy
            </span>
          </div>
        </div>

        {/* Search & Filter Controls */}
        <div className="mb-10 space-y-4">
          {/* Search Bar */}
          <div className="relative max-w-xl mx-auto">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-slate-400" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by topic, symptom, or test (e.g. pregnancy, ApoB, liver, thyroid)..."
              className="w-full pl-10 pr-10 py-3 bg-white border border-slate-200 rounded-2xl text-sm font-medium text-slate-800 placeholder-slate-400 shadow-xs focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 cursor-pointer"
                aria-label="Clear search"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          {/* Category Tabs */}
          <div className="flex items-center justify-start lg:justify-center gap-2 overflow-x-auto pb-2 scrollbar-none pt-1">
            {CATEGORIES.map((cat) => {
              const isSelected = selectedCategory === cat;
              const count = categoryCounts[cat] ?? 0;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  type="button"
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
                    isSelected
                      ? "bg-[#2563eb] text-white shadow-sm shadow-blue-500/20 scale-[1.02]"
                      : "bg-white text-slate-600 hover:bg-slate-100/80 border border-slate-200/80"
                  }`}
                >
                  <span>{cat}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full font-extrabold ${
                      isSelected ? "bg-white/20 text-white" : "bg-slate-100 text-slate-500"
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Active Filter Status */}
          {(selectedCategory !== "All" || searchQuery) && (
            <div className="flex items-center justify-between text-xs text-slate-500 px-1 pt-1 font-semibold">
              <span>
                Showing <strong>{filteredBlogs.length}</strong> {filteredBlogs.length === 1 ? "article" : "articles"}
                {selectedCategory !== "All" && ` in "${selectedCategory}"`}
                {searchQuery && ` matching "${searchQuery}"`}
              </span>
              <button
                type="button"
                onClick={() => {
                  setSelectedCategory("All");
                  setSearchQuery("");
                }}
                className="text-blue-600 hover:text-blue-800 hover:underline cursor-pointer flex items-center gap-1"
              >
                Reset filters <X className="w-3 h-3" />
              </button>
            </div>
          )}
        </div>

        {/* Featured Article Hero Showcase */}
        {featuredBlog && (
          <div className="mb-12">
            <div className="bg-gradient-to-br from-[#0d2e42] via-[#113752] to-[#154668] text-white rounded-3xl overflow-hidden shadow-xl border border-sky-900 group">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 items-stretch">
                {/* Featured Image */}
                <div className="lg:col-span-6 relative overflow-hidden min-h-[260px] sm:min-h-[340px]">
                  <img
                    src={featuredBlog.image || "https://res.cloudinary.com/btjglif5/image/upload/v1784150388/Assets-QXL/legacy-assets/image/slide_womens_wellness.jpg"}
                    alt={featuredBlog.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0d2e42] via-transparent to-transparent lg:hidden opacity-90" />
                  <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
                    <span className="bg-[#2563eb] text-white text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider shadow-md">
                      Featured Guide
                    </span>
                    <span className="bg-emerald-500/90 text-white text-[10px] font-bold px-2.5 py-1 rounded-full backdrop-blur-sm">
                      2026 Evidence Review
                    </span>
                  </div>
                </div>

                {/* Featured Text Content */}
                <div className="lg:col-span-6 p-6 sm:p-8 md:p-10 flex flex-col justify-between">
                  <div>
                    <div className="flex flex-wrap items-center gap-3 text-xs text-blue-200 font-semibold mb-3">
                      <span className="bg-white/10 px-2.5 py-1 rounded-md border border-white/15">
                        {getBlogCategory(featuredBlog)}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-blue-300" />
                        {featuredBlog.date || "October 19, 2026"}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-blue-300" />
                        {getReadingTime(featuredBlog.content)}
                      </span>
                    </div>

                    <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-3 leading-tight tracking-tight group-hover:text-sky-300 transition-colors">
                      <Link href={`/blog/${featuredBlog.slug}`}>
                        {featuredBlog.title}
                      </Link>
                    </h2>

                    <p className="text-blue-100/90 text-sm sm:text-base leading-relaxed mb-6 line-clamp-3 font-medium">
                      {featuredBlog.excerpt}
                    </p>

                    <div className="flex flex-wrap items-center gap-2 mb-6 text-xs text-sky-200/80">
                      <span className="bg-sky-950/60 border border-sky-400/20 px-2.5 py-1 rounded-lg">
                        ✓ Double Marker (11–13.6w)
                      </span>
                      <span className="bg-sky-950/60 border border-sky-400/20 px-2.5 py-1 rounded-lg">
                        ✓ NIPT vs Serum Markers
                      </span>
                      <span className="bg-sky-950/60 border border-sky-400/20 px-2.5 py-1 rounded-lg">
                        ✓ Gestational Diabetes OGTT
                      </span>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
                    <div className="flex items-center gap-2 text-xs text-blue-200">
                      <Stethoscope className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>Reviewed by <strong>{featuredBlog.reviewer || featuredBlog.author}</strong></span>
                    </div>

                    <Link
                      href={`/blog/${featuredBlog.slug}`}
                      className="inline-flex items-center gap-2 bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-extrabold px-5 py-2.5 rounded-xl text-xs sm:text-sm uppercase tracking-wider shadow-md transition-all active:scale-95"
                    >
                      Read Complete Guide <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Blog Cards Grid */}
        {gridBlogs.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 shadow-sm my-8">
            <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-[#0d2e42] mb-2">No Clinical Guides Found</h3>
            <p className="text-slate-500 text-sm max-w-md mx-auto mb-6">
              We couldn't find any articles matching "{searchQuery}" in {selectedCategory}. Try broadening your search or resetting filters.
            </p>
            <button
              type="button"
              onClick={() => {
                setSelectedCategory("All");
                setSearchQuery("");
              }}
              className="bg-[#2563eb] text-white font-bold px-6 py-2.5 rounded-xl text-sm hover:bg-[#1d4ed8] transition-colors"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
            {gridBlogs.map((blog: any) => {
              const displayDate = blog.date
                ? blog.date
                : blog.created_at
                ? new Date(blog.created_at).toLocaleDateString("en-IN", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })
                : "October 2026";

              const category = getBlogCategory(blog);
              const readTime = getReadingTime(blog.content);
              const imageUrl =
                blog.image ||
                "https://res.cloudinary.com/btjglif5/image/upload/v1784150388/Assets-QXL/legacy-assets/image/slide_womens_wellness.jpg";

              return (
                <article
                  key={blog.id}
                  className="bg-white rounded-3xl overflow-hidden shadow-xs border border-slate-200/80 hover:shadow-xl hover:border-blue-300 transition-all duration-300 group flex flex-col"
                >
                  {/* Card Cover Image with Overlays */}
                  <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                    <img
                      src={imageUrl}
                      alt={blog.title}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60" />

                    {/* Category Tag on Image */}
                    <span className="absolute top-3.5 left-3.5 bg-white/95 backdrop-blur-md text-[#2563eb] text-[10px] font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider shadow-xs">
                      {category}
                    </span>

                    {/* Read Time Pill */}
                    <span className="absolute top-3.5 right-3.5 bg-slate-950/70 backdrop-blur-md text-white text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 shadow-xs">
                      <Clock className="w-2.5 h-2.5" /> {readTime}
                    </span>
                  </div>

                  {/* Card Body */}
                  <div className="p-6 flex flex-col flex-1">
                    {/* Date and Category Bar */}
                    <div className="flex items-center gap-3 text-xs text-slate-500 font-semibold mb-2.5">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-blue-600" />
                        {displayDate}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-base sm:text-lg font-extrabold text-[#0d2e42] mb-2.5 line-clamp-2 group-hover:text-[#2563eb] transition-colors leading-snug">
                      <Link href={`/blog/${blog.slug}`}>
                        {blog.title}
                      </Link>
                    </h3>

                    {/* Excerpt */}
                    <p className="text-xs sm:text-sm text-slate-600 mb-5 line-clamp-3 flex-1 leading-relaxed font-medium">
                      {blog.excerpt}
                    </p>

                    {/* Card Footer */}
                    <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between gap-2">
                      <span className="text-[11px] font-bold text-slate-600 truncate max-w-[170px]" title={blog.reviewer || blog.author}>
                        {blog.reviewer ? `Reviewed by ${blog.reviewer.split(",")[0]}` : (blog.author || "QXL Editorial Team")}
                      </span>

                      <Link
                        href={`/blog/${blog.slug}`}
                        className="inline-flex items-center gap-1 text-xs font-extrabold text-[#2563eb] hover:text-[#1d4ed8] group-hover:translate-x-0.5 transition-all whitespace-nowrap"
                      >
                        Read Guide <ChevronRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}

        {/* Bottom Consultation & Test Booking Banner */}
        <div className="mt-16 bg-gradient-to-r from-sky-50 via-indigo-50 to-blue-50 border border-blue-200 rounded-3xl p-6 sm:p-10 shadow-xs">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="max-w-2xl">
              <span className="bg-[#2563eb] text-white text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider mb-2 inline-block">
                Direct Laboratory Access
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0d2e42] mb-2 tracking-tight">
                Need Fast, Reliable Blood Tests in Bengaluru?
              </h2>
              <p className="text-slate-600 text-sm leading-relaxed">
                Book temperature-controlled doorstep phlebotomy or visit our NABL accredited Central Lab in Kengeri or Yelahanka North Hub. Same-day digital reports verified by consultant pathologists.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
              <Link
                href="/book"
                className="flex-1 md:flex-initial text-center bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-extrabold px-6 py-3.5 rounded-2xl text-xs sm:text-sm uppercase tracking-wider shadow-md transition-all active:scale-95 whitespace-nowrap"
              >
                Book Home Collection →
              </Link>
              <a
                href="https://wa.me/919964639639?text=Hi%20QXL%20Diagnostics%2C%20I%20would%20like%20to%20inquire%20about%20blood%20tests."
                target="_blank"
                rel="noreferrer"
                className="flex-1 md:flex-initial text-center bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold px-5 py-3.5 rounded-2xl text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2 whitespace-nowrap"
              >
                <MessageCircle className="w-4 h-4" /> WhatsApp Us
              </a>
            </div>
          </div>
        </div>

      </div>

      {/* Blog Collection & ItemList JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "CollectionPage",
                "@id": "https://qxldiagnostics.com/blog/#webpage",
                "url": "https://qxldiagnostics.com/blog",
                "name": "Clinical Diagnostics Blog & Evidence-Based Health Guides | QXL Bengaluru",
                "description": "Evidence-based laboratory guides, prenatal testing timelines, cardiac markers, liver health, and diagnostic advances reviewed by consultant pathologists at QXL Bengaluru.",
                "inLanguage": "en-IN",
                "breadcrumb": {
                  "@type": "BreadcrumbList",
                  "itemListElement": [
                    {
                      "@type": "ListItem",
                      "position": 1,
                      "name": "Home",
                      "item": "https://qxldiagnostics.com/"
                    },
                    {
                      "@type": "ListItem",
                      "position": 2,
                      "name": "Clinical Blog & Health Guides",
                      "item": "https://qxldiagnostics.com/blog"
                    }
                  ]
                },
                "publisher": {
                  "@type": ["DiagnosticLab", "MedicalOrganization"],
                  "@id": "https://qxldiagnostics.com/#kengeri-lab",
                  "name": "QXL Diagnostics",
                  "url": "https://qxldiagnostics.com/",
                  "logo": {
                    "@type": "ImageObject",
                    "url": "https://res.cloudinary.com/btjglif5/image/upload/v1784150212/Assets-QXL/legacy-assets/image/qxl_logo.png"
                  }
                }
              },
              {
                "@type": "ItemList",
                "@id": "https://qxldiagnostics.com/blog/#articles",
                "name": "Clinical Diagnostic Guides",
                "itemListElement": defaultBlogs.map((b, i) => ({
                  "@type": "ListItem",
                  "position": i + 1,
                  "name": b.title,
                  "url": `https://qxldiagnostics.com/blog/${b.slug}`
                }))
              }
            ]
          }),
        }}
      />
    </div>
  );
}

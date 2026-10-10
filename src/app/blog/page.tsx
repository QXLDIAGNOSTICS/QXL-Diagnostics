"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { BookOpen, Calendar, ArrowRight, Loader2 } from "lucide-react";
import { api, type BlogPost } from "../../lib/api";
import { cmsStore } from "../../lib/cmsStore";

export default function BlogPage() {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      let apiItems: BlogPost[] = [];
      try {
        const { items } = await api.blog.list(50, 0);
        if (items && items.length > 0) apiItems = items;
      } catch {
        // Fallback to cmsStore
      }
      if (cancelled) return;

      const cmsBlogs = cmsStore.getAll("blogs");
      const map = new Map<string, any>();

      for (const item of cmsBlogs) {
        if (item.slug) map.set(item.slug, item);
      }
      for (const item of apiItems) {
        if (item.slug && !map.has(item.slug)) map.set(item.slug, item);
      }

      const getTime = (item: any) => {
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
      setLoading(false);
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#f8faff] py-12">
      <div className="max-w-[1200px] mx-auto px-4 w-full">
        {/* Header section */}
        <div className="text-center mb-12">
          <span className="inline-block bg-[#2563eb] text-white text-[10px] font-extrabold px-3 py-1.5 rounded-full uppercase tracking-widest mb-2 shadow-sm">
            Health Insights
          </span>
          <h1 className="text-[#0f2d5e] text-3xl md:text-4xl font-extrabold mb-3">
            Blogs
          </h1>
          <p className="text-slate-500 text-sm md:text-base font-medium max-w-2xl mx-auto">
            Stay updated with the latest medical insights, wellness tips, and health news from our team of experts.
          </p>
          <div className="w-16 h-1 bg-[#2563eb] mx-auto rounded-full mt-5" />
        </div>

        {/* Blog Grid */}
        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="w-8 h-8 text-[#2563eb] animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {blogs.map((blog: any) => {
              const displayDate = blog.date
                ? blog.date
                : blog.created_at
                ? new Date(blog.created_at).toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" })
                : "October 7, 2026";

              return (
                <div 
                  key={blog.id} 
                  className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-150 hover:shadow-xl transition-all duration-300 group flex flex-col"
                >
                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex items-center gap-4 text-xs text-slate-500 font-semibold mb-3">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-[#2563eb]" />
                        {displayDate}
                      </div>
                    </div>

                    <h3 className="text-base font-extrabold text-[#0d2e42] mb-2 line-clamp-2 group-hover:text-[#2563eb] transition-colors leading-snug">
                      {blog.title}
                    </h3>
                    
                    <p className="text-xs text-slate-500 mb-4 line-clamp-3 flex-1 leading-relaxed font-medium">
                      {blog.excerpt}
                    </p>

                    <div className="mt-auto pt-3 border-t border-gray-100 flex items-center justify-between">
                      <span className="text-[10px] font-bold text-[#2563eb] bg-blue-50 px-2.5 py-1 rounded-full">
                        {"author" in blog ? blog.author : "QXL Editorial Team"}
                      </span>
                      <Link 
                        href={`/blog/${blog.slug}`} 
                        className="inline-flex items-center gap-1 text-xs font-bold text-[#2563eb] hover:text-[#1d4ed8] transition-colors"
                      >
                        Read Guide <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>
    </div>
  );
}

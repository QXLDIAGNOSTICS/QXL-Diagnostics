"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ChevronRight, Calendar } from "lucide-react";
import { api, type BlogPost } from "../lib/api";
import { cmsStore } from "../lib/cmsStore";
import { getAutoBlogDate } from "../lib/dateUtils";

import { defaultBlogs } from "../lib/blogsData";

export default function BlogSlider({ decorativeHeading = false }: { decorativeHeading?: boolean }) {
  const [blogs, setBlogs] = useState<any[]>(defaultBlogs.slice(0, 8));
  const Heading = decorativeHeading ? 'p' : 'h2';

  useEffect(() => {
    let cancelled = false;
    (async () => {
      let apiItems: BlogPost[] = [];
      try {
        const { items } = await api.blog.list(15, 0);
        if (items && items.length > 0) apiItems = items;
      } catch (err) {
        console.error("Failed to load API blog posts, falling back to local", err);
      }

      if (cancelled) return;

      const cmsBlogs = cmsStore.getAll("blogs");
      const map = new Map<string, any>();

      // 1. Add canonical defaultBlogs first
      for (const item of defaultBlogs) {
        if (item.slug) map.set(item.slug, item);
      }

      // 2. Merge cmsBlogs (custom items only)
      for (const item of cmsBlogs) {
        if (item.slug && !map.has(item.slug)) map.set(item.slug, item);
      }

      // 3. Add apiItems if any
      for (const item of apiItems) {
        if (item.slug && !map.has(item.slug)) map.set(item.slug, item);
      }

      const getTime = (item: any) => {
        const val = item.created_at || item.date;
        if (!val) return 0;
        const parsed = new Date(val).getTime();
        return isNaN(parsed) ? 0 : parsed;
      };

      const all = Array.from(map.values());
      all.sort((a, b) => getTime(b) - getTime(a));

      setBlogs(all.slice(0, 8));
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  if (blogs.length === 0) return null;

  return (
    <section className="py-10 bg-white border-t border-blue-100">
      <div className="max-w-[1260px] mx-auto px-4 w-full">
        {/* Heading */}
        <div className="flex justify-between items-end mb-7">
          <div>
            <span className="inline-block bg-[#2563EB] text-white text-[10px] font-extrabold px-3 py-1.5 rounded-full uppercase tracking-widest mb-2 shadow-sm">
              Health Insights
            </span>
            <Heading className="text-[#0f2d5e] text-2xl font-extrabold mt-0.5">Latest From Our Blog</Heading>
            <p className="text-slate-500 text-xs font-semibold mt-1">
              Read up on health tips, medical news, and wellness advice from experts.
            </p>
          </div>
          <Link
            href="/blog"
            className="hidden sm:inline-flex border border-[#2563EB] text-[#2563EB] hover:bg-[#EFF6FF] font-extrabold px-6 py-2 rounded-xl text-xs transition-colors"
          >
            View all blog articles
          </Link>
        </div>

        {/* Horizontal Scrollable Container */}
        <div className="flex overflow-x-auto gap-6 pb-6 pt-2 snap-x snap-mandatory hide-scrollbar" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          {blogs.map((blog) => (
            <div
              key={blog.id}
              className="min-w-[280px] sm:min-w-[340px] max-w-[340px] flex-shrink-0 bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-150 hover:shadow-lg transition-all group snap-start flex flex-col"
            >
              <div className="p-5 flex flex-col flex-1">
                <div className="flex items-center gap-3 text-[10px] text-slate-500 font-bold mb-2">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-[#2563EB]" />{" "}
                    {getAutoBlogDate(blog)}
                  </span>
                </div>
                <h3 className="text-[15px] font-bold text-[#0d2e42] mb-2 line-clamp-2 leading-snug group-hover:text-[#2563EB] transition-colors">
                  {blog.title}
                </h3>
                <p className="text-xs text-slate-500 mb-4 line-clamp-3 leading-relaxed flex-1">
                  {blog.excerpt}
                </p>
                <div className="mt-auto pt-2">
                  <Link
                    href={`/blog/${blog.slug}`}
                    className="inline-flex items-center justify-center gap-1 text-xs font-bold text-white bg-[#2563EB] hover:bg-blue-600 transition-colors px-4 py-2.5 rounded-xl w-full shadow-xs"
                  >
                    Read: {blog.title.length > 42 ? `${blog.title.slice(0, 42)}…` : blog.title}
                    <ChevronRight className="w-4 h-4 shrink-0 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Mobile View All Button */}
        <div className="mt-2 text-center sm:hidden">
          <Link
            href="/blog"
            className="inline-block border-2 border-[#2563EB] text-[#2563EB] bg-white hover:bg-[#EFF6FF] font-extrabold px-6 py-2.5 rounded-xl text-xs transition-colors shadow-xs"
          >
            View all blog articles
          </Link>
        </div>

      </div>
    </section>
  );
}

"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ChevronRight, Calendar } from "lucide-react";
import { api, type BlogPost } from "../lib/api";

export default function BlogSlider() {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);

  useEffect(() => {
    let cancelled = false;
    api.blog
      .list(8, 0)
      .then(({ items }) => {
        if (!cancelled) setBlogs(items);
      })
      .catch((err) => console.error("Failed to load blog posts", err));
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
            <span className="inline-block bg-[#2563eb] text-white text-[10px] font-extrabold px-3 py-1.5 rounded-full uppercase tracking-widest mb-2 shadow-sm">
              Health Insights
            </span>
            <h2 className="text-[#0f2d5e] text-2xl font-extrabold mt-0.5">Latest From Our Blog</h2>
            <p className="text-slate-500 text-xs font-semibold mt-1">
              Read up on health tips, medical news, and wellness advice from experts.
            </p>
          </div>
          <Link
            href="/blog"
            className="hidden sm:inline-flex border border-[#2563eb] text-[#2563eb] font-bold px-6 py-2 rounded-xl text-xs hover:bg-[#dbeafe] transition-colors"
          >
            View All Articles
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
                    <Calendar className="w-3 h-3" />{" "}
                    {new Date(blog.created_at).toLocaleDateString(undefined, {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                </div>
                <h3 className="text-[15px] font-bold text-[#0d2e42] mb-2 line-clamp-2 leading-snug group-hover:text-[#2563eb] transition-colors">
                  {blog.title}
                </h3>
                <p className="text-xs text-slate-500 mb-4 line-clamp-3 leading-relaxed flex-1">
                  {blog.excerpt}
                </p>
                <div className="mt-auto pt-2">
                  <Link
                    href={`/blog/${blog.slug}`}
                    className="inline-flex items-center justify-center gap-1 text-xs font-bold text-white bg-[#2563eb] hover:bg-[#1d4ed8] transition-colors px-4 py-2.5 rounded-xl w-full"
                  >
                    Read More <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
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
            className="inline-block border border-[#2563eb] text-[#2563eb] font-bold px-6 py-2 rounded-xl text-xs hover:bg-[#dbeafe] transition-colors"
          >
            View All Articles
          </Link>
        </div>

      </div>
    </section>
  );
}

"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { BookOpen, Calendar, User, ArrowRight } from "lucide-react";
import { cmsStore } from "../../lib/cmsStore";

export default function BlogPage() {
  const [blogs, setBlogs] = useState<any[]>([]);

  useEffect(() => {
    // Fetch blogs from our local CMS store
    const fetchedBlogs = cmsStore.getAll("blogs");
    setBlogs(fetchedBlogs);

    // Optional: listen for updates
    const handleUpdate = () => setBlogs(cmsStore.getAll("blogs"));
    window.addEventListener("cms-update", handleUpdate);
    return () => window.removeEventListener("cms-update", handleUpdate);
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
        {blogs.length === 0 ? (
          <div className="text-center py-20 text-slate-500">
            <BookOpen className="w-12 h-12 mx-auto text-slate-300 mb-4" />
            <p className="text-lg font-semibold">No articles available yet.</p>
            <p className="text-sm">Please check back later or visit the admin portal to add some.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {blogs.map((blog) => (
              <div 
                key={blog.id} 
                className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-150 hover:shadow-xl transition-all duration-300 group flex flex-col"
              >
                {/* Removed Image Section */}

                {/* Content */}
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-center gap-4 text-xs text-slate-500 font-semibold mb-3">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5" />
                      {blog.date}
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-[#0d2e42] mb-3 line-clamp-2 group-hover:text-[#2563eb] transition-colors">
                    {blog.title}
                  </h3>
                  
                  <p className="text-sm text-slate-500 mb-6 line-clamp-3 flex-1">
                    {blog.excerpt}
                  </p>

                  <div className="mt-auto pt-4 border-t border-gray-100">
                    <Link 
                      href={`/blog/${blog.id}`} 
                      className="inline-flex items-center gap-2 text-sm font-bold text-[#2563eb] hover:text-[#1d4ed8] transition-colors"
                    >
                      Read Full Article <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

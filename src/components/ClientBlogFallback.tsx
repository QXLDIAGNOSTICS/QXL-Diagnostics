"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { cmsStore } from "../lib/cmsStore";
import { getAutoBlogDate } from "../lib/dateUtils";
import ShareButton from "./ShareButton";

export default function ClientBlogFallback({ slug }: { slug: string }) {
  const [blog, setBlog] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const all = cmsStore.getAll("blogs");
      const found = all.find((b: any) => b.slug === slug || b.id === slug);
      if (found) {
        setBlog(found);
      }
    } catch (e) {
      console.error("Failed to load client blog", e);
    } finally {
      setLoading(false);
    }
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f8faff]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#f8faff] text-center p-6">
        <h1 className="text-4xl font-extrabold text-[#0f2d5e] mb-4">Article Not Found</h1>
        <p className="text-gray-500 mb-8 max-w-md">We couldn't find the blog post you're looking for. It may have been removed or the URL is incorrect.</p>
        <Link href="/blog" className="px-6 py-3 bg-[#2563eb] text-white font-bold rounded-xl shadow-md hover:bg-[#1d4ed8] transition-colors">
          Back to All Articles
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8faff] py-12">
      <div className="max-w-[700px] mx-auto px-4 w-full">
        <Link href="/blog" className="inline-flex items-center gap-2 text-[#2563eb] font-bold text-sm mb-8 hover:underline">
          <ArrowLeft className="w-4 h-4" /> Back to Blog
        </Link>

        <div className="mb-8">
          <span className="inline-block bg-[#dbeafe] text-[#2563eb] text-[10px] font-extrabold px-3 py-1.5 rounded-full uppercase tracking-widest mb-4">
            {blog.category || "Medical Article"}
          </span>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#0d2e42] leading-tight mb-4">
            {blog.title}
          </h1>
          <p className="text-sm font-semibold text-slate-400 mb-6 flex items-center gap-2">
            Last Updated: {getAutoBlogDate(blog)} · {blog.reviewer ? `Reviewed by ${blog.reviewer}` : "Reviewed by QXL Medical Team"}
          </p>
          <div className="flex flex-wrap items-center gap-6 text-sm text-slate-500 font-semibold border-b border-gray-200 pb-6">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-[#2563eb]" />
              {getAutoBlogDate(blog)}
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#2563eb]" />
              5 min read
            </div>
            <ShareButton title={blog.title} />
          </div>
        </div>

        <article className="prose prose-lg prose-blue max-w-none text-slate-700">
          {blog.excerpt && (
            <p className="text-xl font-medium text-slate-600 mb-8 leading-relaxed">
              {blog.excerpt}
            </p>
          )}
          <div className="markdown-content leading-loose">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {blog.content}
            </ReactMarkdown>
          </div>
        </article>
      </div>
    </div>
  );
}

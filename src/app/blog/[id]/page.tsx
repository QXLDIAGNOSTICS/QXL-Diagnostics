"use client";

import React, { useState, useEffect, use } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Calendar, User, Clock, Share2 } from "lucide-react";
import { cmsStore } from "../../../lib/cmsStore";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function SingleBlogPage({ params }: { params: Promise<{ id: string }> }) {
  const unwrappedParams = use(params);
  const [blog, setBlog] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = () => {
      const allBlogs = cmsStore.getAll("blogs");
      const foundBlog = allBlogs.find(b => b.id === unwrappedParams.id);
      setBlog(foundBlog || null);
      setLoading(false);
    };

    fetchBlog();

    const handleUpdate = () => fetchBlog();
    window.addEventListener("cms-update", handleUpdate);
    return () => window.removeEventListener("cms-update", handleUpdate);
  }, [unwrappedParams.id]);

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

        {/* Blog Header */}
        <div className="mb-8">
          <span className="inline-block bg-[#dbeafe] text-[#2563eb] text-[10px] font-extrabold px-3 py-1.5 rounded-full uppercase tracking-widest mb-4">
            Medical Article
          </span>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#0d2e42] leading-tight mb-4">
            {blog.title}
          </h1>
          <p className="text-sm font-semibold text-slate-400 mb-6 flex items-center gap-2">
            Last Updated: {blog.date} (Reviewed by QXL Medical Team)
          </p>
          
          <div className="flex flex-wrap items-center gap-6 text-sm text-slate-500 font-semibold border-b border-gray-200 pb-6">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-[#2563eb]" />
              {blog.date}
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#2563eb]" />
              3 min read
            </div>
            <button className="flex items-center gap-2 ml-auto text-[#2563eb] hover:bg-[#dbeafe] px-3 py-1.5 rounded-lg transition-colors cursor-pointer">
              <Share2 className="w-4 h-4" /> Share
            </button>
          </div>
        </div>

        {/* Removed Cover Image */}

        {/* Article Content */}
        <article className="prose prose-lg prose-blue max-w-none text-slate-700">
          <p className="text-xl font-medium text-slate-600 mb-8 leading-relaxed">
            {blog.excerpt}
          </p>
          <div className="markdown-content leading-loose">
            <ReactMarkdown 
              remarkPlugins={[remarkGfm]}
              components={{
                h2: ({node, ...props}) => <h2 className="text-3xl font-bold text-[#0d2e42] mt-10 mb-6" {...props} />,
                h3: ({node, ...props}) => <h3 className="text-2xl font-bold text-[#0d2e42] mt-8 mb-4" {...props} />,
                p: ({node, ...props}) => <p className="mb-6" {...props} />,
                ul: ({node, ...props}) => <ul className="list-disc pl-6 mb-6 space-y-2" {...props} />,
                ol: ({node, ...props}) => <ol className="list-decimal pl-6 mb-6 space-y-2" {...props} />,
                li: ({node, ...props}) => <li className="text-slate-700" {...props} />,
                table: ({node, ...props}) => (
                  <div className="overflow-x-auto my-8 border border-gray-200 rounded-lg">
                    <table className="w-full text-left border-collapse" {...props} />
                  </div>
                ),
                th: ({node, ...props}) => <th className="bg-gray-50 text-gray-700 p-4 font-bold border-b border-gray-200" {...props} />,
                td: ({node, ...props}) => <td className="p-4 border-b border-gray-200 text-slate-600" {...props} />,
                strong: ({node, ...props}) => <strong className="font-bold text-[#0f2d5e]" {...props} />,
                a: ({node, ...props}) => <a className="text-[#2563eb] hover:underline" {...props} />,
                hr: ({node, ...props}) => <hr className="my-10 border-gray-200" {...props} />,
              }}
            >
              {blog.content}
            </ReactMarkdown>
          </div>

          {/* Medical Disclaimer */}
          <div className="mt-12 bg-amber-50 border border-amber-200 rounded-xl p-5 shadow-sm">
            <h4 className="text-amber-800 font-bold mb-1 flex items-center gap-2">
              <span className="bg-amber-100 text-amber-700 px-2 py-0.5 rounded text-[10px] uppercase tracking-widest">Medical Disclaimer</span>
            </h4>
            <p className="text-amber-700/80 text-sm font-medium leading-relaxed">
              This article is for educational purposes only and should not replace professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition.
            </p>
          </div>
        </article>

        {/* Related Blogs Section */}
        <div className="mt-16 pt-10 border-t border-gray-200">
          <h3 className="text-2xl font-extrabold text-[#0d2e42] mb-6">Related Articles</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {cmsStore.getAll("blogs").filter(b => b.id !== blog.id).slice(0, 4).map(related => (
              <Link key={related.id} href={`/blog/${related.id}`} className="block bg-white border border-gray-150 p-4 rounded-xl hover:shadow-md hover:border-blue-200 transition-all group">
                <span className="text-xs font-bold text-blue-600 mb-1 block">{related.category}</span>
                <h4 className="text-sm font-bold text-slate-800 group-hover:text-blue-600 transition-colors line-clamp-2 leading-snug">{related.title}</h4>
              </Link>
            ))}
          </div>
        </div>
      </div>
      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            mainEntityOfPage: {
              "@type": "WebPage",
              "@id": `https://qxldiagnostics.com/blog/${blog.id}`,
            },
            headline: blog.title,
            description: blog.excerpt,
            image: `https://qxldiagnostics.com${blog.image}`,
            author: {
              "@type": "Person",
              name: blog.author,
            },
            publisher: {
              "@type": "Organization",
              name: "QXL Diagnostics",
              logo: {
                "@type": "ImageObject",
                url: "https://qxldiagnostics.com/image/Logo (1).png",
              },
            },
            datePublished: new Date(blog.date).toISOString(),
            dateModified: new Date(blog.date).toISOString(),
          }),
        }}
      />
    </div>
  );
}

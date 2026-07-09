"use client";

import React, { useState, useEffect, useCallback } from "react";
import { MessageSquare, Plus, Search, Edit2, Trash2, X, Sparkles, Loader2, Eye, EyeOff } from "lucide-react";
import { api, type BlogPost } from "@/lib/api";
import { aiHelper } from "@/lib/aiHelper";

export default function BlogAdminPage() {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form states
  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");
  const [image, setImage] = useState("");
  const [isPublished, setIsPublished] = useState(true);

  // AI states
  const [aiTopic, setAiTopic] = useState("");
  const [isAiGenerating, setIsAiGenerating] = useState(false);
  const [showAiInput, setShowAiInput] = useState(false);

  const refreshData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const { items } = await api.blog.adminList(200, 0);
      setBlogs(items);
    } catch {
      setError("Failed to load blog articles.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshData();
  }, [refreshData]);

  const openAddModal = () => {
    setEditingId(null);
    setTitle("");
    setExcerpt("");
    setContent("");
    setAuthor("QXL Medical Review Team");
    setImage("/image/food_intolerance_banner.png");
    setIsPublished(true);
    setIsModalOpen(true);
    setShowAiInput(false);
    setAiTopic("");
  };

  const openEditModal = (blog: BlogPost) => {
    setEditingId(blog.id);
    setTitle(blog.title);
    setExcerpt(blog.excerpt || "");
    setContent(blog.content || "");
    setAuthor(blog.author || "");
    setImage(blog.image_url || "");
    setIsPublished(blog.is_published !== false);
    setIsModalOpen(true);
    setShowAiInput(false);
    setAiTopic("");
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !content) return;

    setSaving(true);
    setError(null);
    try {
      const payload = {
        title,
        excerpt,
        content,
        author,
        image_url: image,
        is_published: isPublished,
      };

      if (editingId) {
        await api.blog.update(editingId, payload);
      } else {
        await api.blog.create(payload);
      }
      setIsModalOpen(false);
      await refreshData();
    } catch {
      setError("Failed to save the blog article.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this blog post?")) return;
    try {
      await api.blog.remove(id);
      await refreshData();
    } catch {
      setError("Failed to delete the blog article.");
    }
  };

  const togglePublish = async (blog: BlogPost) => {
    try {
      await api.blog.update(blog.id, { is_published: !blog.is_published });
      await refreshData();
    } catch {
      setError("Failed to update publish status.");
    }
  };

  const handleAiWrite = async () => {
    if (!aiTopic) return;
    setIsAiGenerating(true);
    try {
      const result = await aiHelper.generateBlogPost(aiTopic);
      setTitle(result.title);
      setExcerpt(result.excerpt);
      setContent(result.content);
      setAuthor(result.author);
      setShowAiInput(false);
    } catch (e) {
      console.error(e);
    } finally {
      setIsAiGenerating(false);
    }
  };

  const filtered = blogs.filter(blog =>
    blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (blog.excerpt || "").toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <MessageSquare className="w-6 h-6 text-teal-600 dark:text-teal-400" />
            Health Blogs
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Publish informative clinical logs, symptom articles, and wellness posts.</p>
        </div>
        
        <button 
          onClick={openAddModal}
          className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-lg transition-colors flex items-center gap-2 text-sm font-medium shadow-sm cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          Write Article
        </button>
      </div>

      {error && (
        <div className="p-3 rounded-lg bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900 text-red-600 dark:text-red-400 text-sm">
          {error}
        </div>
      )}

      {/* Grid */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-150 dark:border-gray-800 shadow-sm overflow-hidden">
        
        <div className="p-4 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
          <div className="relative max-w-sm w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search articles..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-sm bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all text-slate-800 dark:text-slate-100"
            />
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Showing {filtered.length} articles
          </div>
        </div>

        {loading ? (
          <div className="p-12 flex items-center justify-center text-gray-400">
            <Loader2 className="w-6 h-6 animate-spin" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="p-12 text-center flex flex-col items-center justify-center">
            <MessageSquare className="w-12 h-12 text-gray-300 mb-3" />
            <h3 className="text-base font-semibold text-gray-955 dark:text-white">No articles found</h3>
            <p className="text-xs text-gray-500 max-w-xs mt-1 mb-4">Add your medical wellness logs.</p>
            <button onClick={openAddModal} className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold rounded-lg cursor-pointer">
              Write First Blog
            </button>
          </div>
        ) : (
          <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in duration-300">
            {filtered.map((blog) => (
              <div key={blog.id} className="border border-gray-200 dark:border-gray-800 rounded-xl p-5 flex flex-col justify-between bg-slate-50/50 dark:bg-slate-950/20 relative">
                <div>
                  <div className="flex justify-between items-start gap-2 mb-2">
                    <span className="text-[10px] text-gray-400 dark:text-gray-500 font-bold">By {blog.author}</span>
                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider ${blog.is_published ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"}`}>
                      {blog.is_published ? "Published" : "Draft"}
                    </span>
                  </div>
                  <h4 className="font-extrabold text-slate-800 dark:text-white text-sm mb-2">{blog.title}</h4>
                  <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed font-medium line-clamp-3">{blog.excerpt}</p>
                </div>

                <div className="mt-6 pt-3 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between">
                  <span className="text-[10px] text-gray-400 font-mono">ID: {blog.id}</span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => togglePublish(blog)}
                      title={blog.is_published ? "Unpublish" : "Publish"}
                      className="p-1.5 text-slate-500 hover:text-amber-600 dark:hover:text-amber-400 hover:bg-slate-100 dark:hover:bg-gray-800 rounded-md transition-colors cursor-pointer"
                    >
                      {blog.is_published ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                    </button>
                    <button 
                      onClick={() => openEditModal(blog)}
                      className="p-1.5 text-slate-500 hover:text-teal-600 dark:hover:text-teal-400 hover:bg-slate-100 dark:hover:bg-gray-800 rounded-md transition-colors cursor-pointer"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button 
                      onClick={() => handleDelete(blog.id)}
                      className="p-1.5 text-slate-500 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/20 rounded-md transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Editor Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/55 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
          <div className="bg-white dark:bg-gray-900 rounded-2xl max-w-2xl w-full shadow-2xl border border-gray-150 dark:border-gray-800 overflow-hidden flex flex-col max-h-[90vh]">
            <div className="p-6 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
              <h3 className="text-base font-bold text-gray-900 dark:text-white">
                {editingId ? "Edit Blog Article" : "Write Blog Article"}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="p-2 text-gray-400 hover:text-gray-600 rounded-lg">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* AI Blog Writer */}
            <div className="px-6 py-3 bg-teal-50/50 dark:bg-teal-950/10 border-b border-teal-100/50 dark:border-teal-900/10">
              {!showAiInput ? (
                <button
                  type="button"
                  onClick={() => setShowAiInput(true)}
                  className="w-full py-2 bg-gradient-to-r from-teal-500 to-emerald-600 text-white rounded-lg text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 hover:opacity-95 shadow-xs cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5 animate-pulse" />
                  Write complete article with AI Assistant
                </button>
              ) : (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-teal-800 dark:text-teal-400 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5" /> AI Article Writer
                    </span>
                    <button 
                      type="button" 
                      onClick={() => setShowAiInput(false)}
                      className="text-xs text-gray-400 hover:text-gray-600"
                    >
                      Cancel
                    </button>
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="E.g., Fatty liver signs, symptoms and blood screens..."
                      value={aiTopic}
                      onChange={(e) => setAiTopic(e.target.value)}
                      className="flex-1 px-3 py-2 text-xs bg-white dark:bg-gray-800 border border-teal-200 dark:border-teal-900 rounded-lg text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-teal-500"
                    />
                    <button
                      type="button"
                      disabled={isAiGenerating || !aiTopic}
                      onClick={handleAiWrite}
                      className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold rounded-lg disabled:opacity-50 flex items-center gap-1 cursor-pointer"
                    >
                      {isAiGenerating ? "Writing..." : "Draft"}
                    </button>
                  </div>
                </div>
              )}
            </div>

            <form onSubmit={handleSave} className="p-6 space-y-4 overflow-y-auto flex-1">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">Article Title</label>
                  <input 
                    type="text" 
                    required
                    value={title} 
                    onChange={(e) => setTitle(e.target.value)} 
                    placeholder="10 Tips to Manage Cholesterol" 
                    className="w-full px-3.5 py-2.5 text-sm bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">Author Name / Team</label>
                  <input 
                    type="text" 
                    required
                    value={author} 
                    onChange={(e) => setAuthor(e.target.value)} 
                    placeholder="Dr. Pritilata Rout" 
                    className="w-full px-3.5 py-2.5 text-sm bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">Asset Image URL</label>
                <input 
                  type="text" 
                  required
                  value={image} 
                  onChange={(e) => setImage(e.target.value)} 
                  placeholder="/image/food_intolerance_banner.png" 
                  className="w-full px-3.5 py-2.5 text-sm bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">Short Excerpt (Abstract)</label>
                <textarea 
                  rows={2}
                  required
                  value={excerpt} 
                  onChange={(e) => setExcerpt(e.target.value)} 
                  placeholder="A summary introducing the article details..." 
                  className="w-full px-3.5 py-2.5 text-sm bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-teal-500 resize-none"
                ></textarea>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">Full Content</label>
                <textarea 
                  rows={6}
                  required
                  value={content} 
                  onChange={(e) => setContent(e.target.value)} 
                  placeholder="Paste or write full blog content..." 
                  className="w-full px-3.5 py-2.5 text-sm bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-teal-500"
                ></textarea>
              </div>

              <label className="flex items-center gap-2.5 p-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg cursor-pointer">
                <input
                  type="checkbox"
                  checked={isPublished}
                  onChange={(e) => setIsPublished(e.target.checked)}
                  className="w-4 h-4 accent-teal-600"
                />
                <span className="text-xs font-bold text-gray-700 dark:text-gray-300">Publish immediately (uncheck to save as draft)</span>
              </label>

              <div className="pt-4 flex justify-end gap-3 border-t border-gray-100 dark:border-gray-800">
                <button 
                  type="button" 
                  onClick={() => setIsModalOpen(false)} 
                  className="px-4 py-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 text-xs font-medium cursor-pointer"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  disabled={saving}
                  className="px-5 py-2 bg-teal-600 hover:bg-teal-700 disabled:opacity-60 text-white rounded-lg text-xs font-medium shadow-sm cursor-pointer flex items-center gap-2"
                >
                  {saving && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                  {isPublished ? "Publish Article" : "Save Draft"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}

"use client";

import React, { useState, useEffect } from "react";
import { Star, Plus, Search, Trash2, CheckCircle, X, MessageSquare, ShieldCheck } from "lucide-react";
import { cmsStore } from "@/lib/cmsStore";

export default function ReviewsPage() {
  const [reviews, setReviews] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form states
  const [name, setName] = useState("");
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  useEffect(() => {
    const refreshData = () => {
      setReviews(cmsStore.getAll("reviews"));
    };
    refreshData();
    window.addEventListener("cms-update", refreshData);
    return () => window.removeEventListener("cms-update", refreshData);
  }, []);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !comment) return;

    cmsStore.addItem("reviews", {
      name,
      rating,
      comment,
      status: "Approved"
    });
    
    setIsModalOpen(false);
    setName("");
    setComment("");
    setRating(5);
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this review?")) {
      cmsStore.deleteItem("reviews", id);
    }
  };

  const toggleStatus = (id: string, currentStatus: string) => {
    const nextStatus = currentStatus === "Approved" ? "Pending" : "Approved";
    cmsStore.updateItem("reviews", id, { status: nextStatus });
  };

  const filtered = reviews.filter(rev => 
    rev.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    rev.comment.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <Star className="w-6 h-6 text-amber-500 fill-amber-500" />
            Patient Feedback Moderator
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Approve, decline, and manage customer reviews shown on search ranking panels.</p>
        </div>
        
        <button 
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-lg transition-colors flex items-center gap-2 text-sm font-medium shadow-sm cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          Add Review Card
        </button>
      </div>

      {/* Action Bar */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-150 dark:border-gray-800 shadow-sm p-4 flex items-center justify-between">
        <div className="relative max-w-sm w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search reviews..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-sm bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all text-slate-800 dark:text-slate-100"
          />
        </div>
        <div className="text-sm text-gray-500 dark:text-gray-400 font-bold">
          Total reviews: {filtered.length}
        </div>
      </div>

      {/* Grid of Reviews */}
      {filtered.length === 0 ? (
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-150 dark:border-gray-800 shadow-sm p-12 text-center flex flex-col items-center justify-center">
          <MessageSquare className="w-12 h-12 text-gray-300 mb-3" />
          <h3 className="text-base font-semibold text-gray-955 dark:text-white">No patient feedback found</h3>
          <p className="text-sm text-gray-500 max-w-xs mt-1 mb-4">Reviews will appear here for moderation.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((rev) => (
            <div key={rev.id} className="bg-white dark:bg-gray-900 border border-gray-150 dark:border-gray-800 rounded-2xl p-5 flex flex-col justify-between shadow-sm relative">
              
              <div>
                <div className="flex justify-between items-start gap-2 mb-3">
                  <h4 className="font-extrabold text-slate-850 dark:text-white text-sm">{rev.name}</h4>
                  <span className={`px-2 py-0.5 rounded-full text-[9px] font-black uppercase ${
                    rev.status === "Approved" ? "bg-emerald-50 text-emerald-600 border border-emerald-100" : "bg-orange-50 text-orange-600 border border-orange-100"
                  }`}>
                    {rev.status}
                  </span>
                </div>
                
                {/* Stars */}
                <div className="flex items-center gap-0.5 mb-3">
                  {Array.from({ length: 5 }).map((_, idx) => (
                    <Star 
                      key={idx} 
                      className={`w-3.5 h-3.5 ${
                        idx < (rev.rating || 5) ? "text-amber-500 fill-amber-500" : "text-gray-200 dark:text-gray-800"
                      }`} 
                    />
                  ))}
                </div>

                <p className="text-xs text-gray-600 dark:text-gray-400 italic bg-gray-50 dark:bg-gray-950/20 p-3 rounded-xl border border-gray-100 dark:border-gray-850 line-clamp-4">
                  "{rev.comment}"
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between">
                <button
                  onClick={() => toggleStatus(rev.id, rev.status)}
                  className={`text-[10px] font-bold px-3 py-1.5 rounded-lg border transition-all cursor-pointer ${
                    rev.status === "Approved" 
                      ? "bg-slate-50 text-orange-600 hover:bg-orange-50 hover:border-orange-100" 
                      : "bg-teal-600 text-white hover:bg-teal-700"
                  }`}
                >
                  {rev.status === "Approved" ? "Deactivate" : "Approve"}
                </button>

                <button 
                  onClick={() => handleDelete(rev.id)}
                  className="p-1.5 text-slate-400 hover:text-red-650 hover:bg-red-50 rounded-md transition-colors cursor-pointer"
                  title="Delete review"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Editor Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/55 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
          <div className="bg-white dark:bg-gray-900 rounded-2xl max-w-md w-full shadow-2xl border border-gray-150 dark:border-gray-800 overflow-hidden">
            <div className="p-6 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
              <h3 className="text-base font-bold text-gray-900 dark:text-white">Log Patient Review Card</h3>
              <button onClick={() => setIsModalOpen(false)} className="p-2 text-gray-400 hover:text-gray-650 rounded-lg">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">Patient Name</label>
                <input 
                  type="text" 
                  required
                  value={name} 
                  onChange={(e) => setName(e.target.value)} 
                  placeholder="Geeta Sen" 
                  className="w-full px-3.5 py-2.5 text-sm bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">Rating Rating (1-5)</label>
                <select 
                  value={rating} 
                  onChange={(e) => setRating(Number(e.target.value))} 
                  className="w-full px-3.5 py-2.5 text-sm bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-slate-655 dark:text-slate-100 focus:outline-none"
                >
                  <option value={5}>5 Stars (Excellent)</option>
                  <option value={4}>4 Stars (Good)</option>
                  <option value={3}>3 Stars (Average)</option>
                  <option value={2}>2 Stars (Poor)</option>
                  <option value={1}>1 Star (Critical)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">Comment / review text</label>
                <textarea 
                  rows={3}
                  required
                  value={comment} 
                  onChange={(e) => setComment(e.target.value)} 
                  placeholder="Very prompt services. Collector was highly professional." 
                  className="w-full px-3.5 py-2.5 text-sm bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-slate-800 dark:text-slate-100 focus:outline-none resize-none"
                />
              </div>

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
                  className="px-5 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-lg text-xs font-medium shadow-sm cursor-pointer"
                >
                  Save Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}

"use client";

import React, { useState, useEffect } from "react";
import { Mail, Search, Trash2, Sparkles, X, Check, MessageCircle } from "lucide-react";
import { cmsStore } from "@/lib/cmsStore";
import { aiHelper } from "@/lib/aiHelper";

export default function EnquiriesAdminPage() {
  const [enquiries, setEnquiries] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedEnquiry, setSelectedEnquiry] = useState<any | null>(null);
  
  // AI reply states
  const [aiReply, setAiReply] = useState("");
  const [isAiGenerating, setIsAiGenerating] = useState(false);

  useEffect(() => {
    const refreshData = () => {
      setEnquiries(cmsStore.getAll("enquiries"));
    };
    refreshData();
    window.addEventListener("cms-update", refreshData);
    return () => window.removeEventListener("cms-update", refreshData);
  }, []);

  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm("Are you sure you want to delete this enquiry record?")) {
      cmsStore.deleteItem("enquiries", id);
      if (selectedEnquiry && selectedEnquiry.id === id) {
        setSelectedEnquiry(null);
        setAiReply("");
      }
    }
  };

  const handleMarkStatus = (id: string, status: string, e: React.MouseEvent) => {
    e.stopPropagation();
    cmsStore.updateItem("enquiries", id, { status });
    if (selectedEnquiry && selectedEnquiry.id === id) {
      setSelectedEnquiry((prev: any) => ({ ...prev, status }));
    }
  };

  const selectEnquiryItem = (item: any) => {
    setSelectedEnquiry(item);
    setAiReply("");
  };

  const handleGenerateAiReply = async () => {
    if (!selectedEnquiry) return;
    setIsAiGenerating(true);
    try {
      const draft = await aiHelper.generateReply(
        selectedEnquiry.service,
        selectedEnquiry.message
      );
      setAiReply(draft);
    } catch (e) {
      console.error(e);
    } finally {
      setIsAiGenerating(false);
    }
  };

  const filtered = enquiries.filter(enq =>
    enq.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    enq.service.toLowerCase().includes(searchQuery.toLowerCase()) ||
    enq.message.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
          <Mail className="w-6 h-6 text-teal-600 dark:text-teal-400" />
          Customer Enquiries
        </h2>
        <p className="text-gray-500 dark:text-gray-400 mt-1">Review contact form entries and generate smart AI responses.</p>
      </div>

      {/* Split Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Side: List */}
        <div className="lg:col-span-5 bg-white dark:bg-gray-900 rounded-2xl border border-gray-150 dark:border-gray-800 shadow-sm overflow-hidden flex flex-col h-[600px]">
          
          <div className="p-4 border-b border-gray-100 dark:border-gray-800">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input 
                type="text" 
                placeholder="Search enquiries..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-xs bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all text-slate-800 dark:text-slate-100"
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto divide-y divide-gray-100 dark:divide-gray-800">
            {filtered.length === 0 ? (
              <div className="p-12 text-center text-gray-400 dark:text-gray-600">
                No enquiries found.
              </div>
            ) : (
              filtered.map((enq) => (
                <div 
                  key={enq.id}
                  onClick={() => selectEnquiryItem(enq)}
                  className={`p-4 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors ${selectedEnquiry?.id === enq.id ? "bg-teal-50/40 dark:bg-teal-950/10 border-l-4 border-teal-500" : ""}`}
                >
                  <div className="flex justify-between items-start mb-1.5">
                    <span className="font-extrabold text-xs text-slate-800 dark:text-white">{enq.name}</span>
                    <span className="text-[10px] text-gray-400">{enq.date}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-teal-600 dark:text-teal-400">{enq.service}</span>
                    <span className={`text-[9px] px-2 py-0.5 rounded-full font-black uppercase ${enq.status === 'New' ? 'bg-orange-100 text-orange-700' : 'bg-slate-100 text-slate-600'}`}>
                      {enq.status}
                    </span>
                  </div>
                  <p className="text-[11px] text-gray-500 dark:text-gray-400 line-clamp-1 mt-1">{enq.message}</p>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Right Side: Detail & AI Response */}
        <div className="lg:col-span-7 bg-white dark:bg-gray-900 rounded-2xl border border-gray-150 dark:border-gray-800 shadow-sm overflow-hidden min-h-[600px] flex flex-col">
          {selectedEnquiry ? (
            <div className="p-6 flex-1 flex flex-col justify-between h-full">
              <div className="space-y-6">
                
                {/* Details Header */}
                <div className="flex items-start justify-between border-b border-gray-100 dark:border-gray-800 pb-4">
                  <div>
                    <h3 className="font-extrabold text-base text-gray-900 dark:text-white">{selectedEnquiry.name}</h3>
                    <p className="text-xs text-gray-400 mt-1">Phone: {selectedEnquiry.phone} • Date: {selectedEnquiry.date}</p>
                  </div>

                  <div className="flex items-center gap-2">
                    {selectedEnquiry.status === "New" && (
                      <button 
                        onClick={(e) => handleMarkStatus(selectedEnquiry.id, "Addressed", e)}
                        className="px-2.5 py-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 text-[10px] font-bold rounded-lg border border-emerald-200 flex items-center gap-1 cursor-pointer"
                      >
                        <Check className="w-3.5 h-3.5" /> Mark Addressed
                      </button>
                    )}
                    <button 
                      onClick={(e) => handleDelete(selectedEnquiry.id, e)}
                      className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg cursor-pointer"
                    >
                      <Trash2 className="w-4.5 h-4.5" />
                    </button>
                  </div>
                </div>

                {/* Message Content */}
                <div>
                  <span className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest block mb-2">Message Topic: {selectedEnquiry.service}</span>
                  <div className="p-4 bg-slate-50 dark:bg-slate-950 border border-gray-100 dark:border-gray-800 rounded-xl text-xs text-slate-700 dark:text-slate-350 leading-relaxed font-medium">
                    {selectedEnquiry.message || "[No message content entered]"}
                  </div>
                </div>

                {/* AI Draft Response Section */}
                <div className="border-t border-gray-100 dark:border-gray-805 pt-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-extrabold text-teal-800 dark:text-teal-400 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5" /> AI Response Draft Assistant
                    </span>
                    <button
                      onClick={handleGenerateAiReply}
                      disabled={isAiGenerating}
                      className="px-3 py-1.5 bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-600 hover:to-emerald-700 text-white text-[10px] font-bold rounded-lg uppercase tracking-wider flex items-center gap-1 shadow-xs cursor-pointer"
                    >
                      <Sparkles className="w-3 h-3" /> {isAiGenerating ? "Drafting..." : "Generate AI Reply"}
                    </button>
                  </div>

                  {aiReply && (
                    <div className="space-y-2 animate-in fade-in duration-200">
                      <textarea
                        rows={8}
                        value={aiReply}
                        onChange={(e) => setAiReply(e.target.value)}
                        className="w-full p-4 bg-teal-50/10 border border-teal-200/50 dark:border-teal-900/40 rounded-xl text-xs font-mono text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-1 focus:ring-teal-500"
                      />
                      <div className="flex justify-end gap-2">
                        <a 
                          href={`https://api.whatsapp.com/send?phone=${selectedEnquiry.phone.replace(/[^0-9]/g, "")}&text=${encodeURIComponent(aiReply)}`}
                          target="_blank" 
                          rel="noreferrer"
                          className="px-3 py-1.5 bg-green-600 hover:bg-green-700 text-white text-[10px] font-bold rounded-lg flex items-center gap-1 shadow-xs cursor-pointer"
                        >
                          <MessageCircle className="w-3.5 h-3.5" /> Send on WhatsApp
                        </a>
                      </div>
                    </div>
                  )}
                </div>

              </div>
            </div>
          ) : (
            <div className="m-auto text-center flex flex-col items-center justify-center text-gray-400 dark:text-gray-650 p-6">
              <Mail className="w-16 h-16 text-gray-300 dark:text-gray-700 mb-3" />
              <p className="text-sm font-semibold">Select an enquiry from the sidebar list to inspect details and generate drafts.</p>
            </div>
          )}
        </div>

      </div>

    </div>
  );
}

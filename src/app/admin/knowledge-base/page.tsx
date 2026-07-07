"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { BrainCircuit, Upload, Trash2, FileText, Loader2 } from "lucide-react";
import { api, type KnowledgeDocument } from "@/lib/api";

function formatSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export default function KnowledgeBasePage() {
  const [documents, setDocuments] = useState<KnowledgeDocument[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const refreshData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const { items } = await api.knowledgeBase.list();
      setDocuments(items);
    } catch {
      setError("Failed to load knowledge base documents.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshData();
  }, [refreshData]);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setError(null);
    try {
      await api.knowledgeBase.upload(file);
      await refreshData();
    } catch {
      setError("Failed to upload document — check the file type/size and try again.");
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Remove this document from the chatbot's knowledge base?")) return;
    try {
      await api.knowledgeBase.remove(id);
      await refreshData();
    } catch {
      setError("Failed to delete document.");
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <BrainCircuit className="w-6 h-6 text-teal-600 dark:text-teal-400" />
            Chatbot Knowledge Base
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mt-1 max-w-2xl">
            Upload PDFs or text documents (policies, guides, specialities info) to ground the AI
            assistant&apos;s answers for every visitor — in addition to the live packages, tests,
            centers, blog, and FAQ data it already looks up automatically.
          </p>
        </div>

        <label className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-lg transition-colors flex items-center gap-2 text-sm font-medium shadow-sm cursor-pointer">
          {uploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
          {uploading ? "Uploading…" : "Upload Document"}
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,.txt,application/pdf,text/plain"
            onChange={handleUpload}
            disabled={uploading}
            className="hidden"
          />
        </label>
      </div>

      {error && (
        <div className="p-3 rounded-lg bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900 text-red-600 dark:text-red-400 text-sm">
          {error}
        </div>
      )}

      <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-150 dark:border-gray-800 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-gray-100 dark:border-gray-800 text-sm text-gray-500 dark:text-gray-400">
          {documents.length} document{documents.length === 1 ? "" : "s"} in the knowledge base
        </div>

        {loading ? (
          <div className="p-12 flex items-center justify-center text-gray-400">
            <Loader2 className="w-6 h-6 animate-spin" />
          </div>
        ) : documents.length === 0 ? (
          <div className="p-12 text-center flex flex-col items-center justify-center">
            <BrainCircuit className="w-12 h-12 text-gray-300 mb-3" />
            <h3 className="text-base font-semibold text-gray-950 dark:text-white">No documents yet</h3>
            <p className="text-sm text-gray-500 max-w-sm mt-1">
              Upload a PDF or text file to teach the chatbot about anything not already covered by
              live catalog data — e.g. detailed speciality guides or internal policies.
            </p>
          </div>
        ) : (
          <div className="divide-y divide-gray-100 dark:divide-gray-800">
            {documents.map((doc) => (
              <div key={doc.id} className="p-4 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-9 h-9 rounded-lg bg-teal-50 dark:bg-teal-950/30 flex items-center justify-center shrink-0">
                    <FileText className="w-4 h-4 text-teal-600 dark:text-teal-400" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-bold text-slate-900 dark:text-white truncate">{doc.filename}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {formatSize(doc.size)} · {doc.chunk_count} chunk{doc.chunk_count === 1 ? "" : "s"} indexed ·{" "}
                      {new Date(doc.created_at).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => handleDelete(doc.id)}
                  className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20 rounded-md cursor-pointer shrink-0"
                  title="Remove from knowledge base"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

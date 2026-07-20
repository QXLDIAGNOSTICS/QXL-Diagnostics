"use client";

import React, { useRef, useState } from "react";
import { ImagePlus, Loader2, AlertTriangle } from "lucide-react";
import { api, ApiError } from "@/lib/api";

interface ImageUploadFieldProps {
  label: string;
  value: string;
  onChange: (url: string) => void;
  required?: boolean;
  placeholder?: string;
}

/**
 * Admin image field: shows a live preview of the current URL, and lets the
 * admin either upload a real image file (stored permanently on Cloudinary —
 * see backend `/uploads/image`) or paste a URL directly. Uploading always
 * replaces the field with the returned Cloudinary URL.
 */
export default function ImageUploadField({ label, value, onChange, required, placeholder }: ImageUploadFieldProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setError(null);
    setUploading(true);
    try {
      const { url } = await api.uploads.image(file);
      onChange(url);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Failed to upload image.");
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  };

  return (
    <div>
      <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
        {label}
      </label>
      <div className="flex items-center gap-3">
        <div className="w-14 h-14 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 flex items-center justify-center flex-shrink-0">
          {value ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={value} alt="Preview" className="w-full h-full object-cover" />
          ) : (
            <ImagePlus className="w-5 h-5 text-gray-400" />
          )}
        </div>
        <div className="flex-1 space-y-1.5">
          <input
            type="text"
            required={required}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder || "Image URL, or upload a file"}
            className="w-full px-3.5 py-2.5 text-sm bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
          <div className="flex items-center gap-2">
            <input
              ref={inputRef}
              type="file"
              accept="image/png,image/jpeg,image/webp,image/gif"
              onChange={handleFileChange}
              disabled={uploading}
              className="text-[11px] text-gray-500 dark:text-gray-400 file:mr-3 file:py-1.5 file:px-3 file:rounded-md file:border-0 file:text-[11px] file:font-bold file:bg-teal-50 file:text-teal-700 hover:file:bg-teal-100 dark:file:bg-teal-950/30 dark:file:text-teal-400 cursor-pointer disabled:opacity-60"
            />
            {uploading && <Loader2 className="w-3.5 h-3.5 animate-spin text-teal-600 flex-shrink-0" />}
          </div>
        </div>
      </div>
      {error && (
        <p className="flex items-center gap-1.5 text-[11px] font-semibold text-red-600 mt-1.5">
          <AlertTriangle className="w-3.5 h-3.5 flex-shrink-0" /> {error}
        </p>
      )}
    </div>
  );
}

import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import Link from 'next/link';
import { X, Upload, FileText, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import { useAuth } from '../lib/useAuth';
import { api, Prescription } from '../lib/api';

interface PrescriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function PrescriptionModal({ isOpen, onClose }: PrescriptionModalProps) {
  const { user, loading: authLoading } = useAuth();
  const [mounted, setMounted] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [prescription, setPrescription] = useState<Prescription | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMounted(true);
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  if (!isOpen || !mounted) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setPrescription(null);
      setError(null);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const pollUntilDone = async (id: string) => {
    for (let attempt = 0; attempt < 30; attempt++) {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      const record = await api.prescriptions.get(id);
      setPrescription(record);
      if (record.analysis_status === 'completed' || record.analysis_status === 'failed') {
        return record;
      }
    }
    return null;
  };

  const handleAnalyze = async () => {
    if (!file) return;
    setError(null);
    setIsAnalyzing(true);
    try {
      const created = await api.prescriptions.upload(file);
      setPrescription(created);
      const finalRecord = await pollUntilDone(created.id);
      if (!finalRecord) {
        setError('Analysis is taking longer than expected. Please check your dashboard shortly.');
      } else if (finalRecord.analysis_status === 'failed') {
        setError(finalRecord.error_message || 'We could not analyze this file. Please try a clearer photo or PDF.');
      }
    } catch (err: any) {
      console.error('Prescription upload failed', err);
      setError(err?.status === 401 ? 'Please log in to upload and analyze a prescription.' : 'Upload failed. Please try again.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleClose = () => {
    setFile(null);
    setPrescription(null);
    setError(null);
    onClose();
  };

  return createPortal(
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden flex flex-col max-h-[90vh]">
        <div className="p-4 border-b flex items-center justify-between bg-blue-50">
          <h2 className="text-xl font-bold text-[#0f2d5e] flex items-center gap-2">
            <FileText className="text-blue-600" />
            Upload Prescription
          </h2>
          <button onClick={handleClose} className="p-2 text-gray-500 hover:bg-white rounded-full transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 flex-1 overflow-y-auto">
          {!authLoading && user && (
            <div className="mb-4 bg-blue-50 border border-blue-100 rounded-xl px-4 py-3 text-xs font-semibold text-[#0f2d5e]">
              Uploading as {user.name || user.phone || 'QXL patient'}.
            </div>
          )}

          {!authLoading && !user ? (
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 flex flex-col items-center text-center gap-3">
              <AlertCircle className="w-8 h-8 text-amber-600" />
              <p className="text-sm text-amber-800 font-semibold">
                Please log in to upload and get an AI analysis of your prescription.
              </p>
              <Link
                href="/login"
                onClick={handleClose}
                className="inline-block bg-[#2563eb] text-white font-bold px-6 py-2.5 rounded-full text-sm uppercase tracking-wider"
              >
                Login
              </Link>
            </div>
          ) : !file ? (
            <div
              className="border-2 border-dashed border-blue-200 rounded-xl p-8 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-blue-50 transition-colors"
              onClick={handleUploadClick}
            >
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <Upload className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Click to Upload or Drag & Drop</h3>
              <p className="text-gray-500 text-sm">Supported formats: PDF, JPG, PNG (Max 5MB)</p>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept=".pdf,image/*"
                className="hidden"
              />
            </div>
          ) : (
            <div className="flex flex-col gap-6">
              <div className="bg-gray-50 p-4 rounded-xl border flex items-center justify-between">
                <div className="flex items-center gap-3 overflow-hidden">
                  <FileText className="text-blue-500 shrink-0" />
                  <span className="font-medium text-gray-700 truncate">{file.name}</span>
                </div>
                <button
                  onClick={() => { setFile(null); setPrescription(null); setError(null); }}
                  className="text-red-500 text-sm font-semibold hover:underline shrink-0"
                >
                  Remove
                </button>
              </div>

              {!isAnalyzing && !prescription && (
                <button
                  onClick={handleAnalyze}
                  className="w-full bg-blue-600 text-white font-bold py-3 rounded-xl hover:bg-blue-700 transition-colors shadow-md"
                >
                  Analyze with AI
                </button>
              )}

              {isAnalyzing && (
                <div className="flex flex-col items-center justify-center py-8 gap-4">
                  <Loader2 className="w-10 h-10 text-blue-600 animate-spin" />
                  <p className="text-gray-600 font-medium">AI is reading your prescription...</p>
                </div>
              )}

              {error && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-start gap-2">
                  <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                  <p className="text-sm text-red-700 font-medium">{error}</p>
                </div>
              )}

              {prescription?.analysis_status === 'completed' && prescription.analysis && (
                <div className="bg-green-50 border border-green-200 rounded-xl p-5">
                  <div className="flex items-center gap-2 text-green-700 mb-3">
                    <CheckCircle2 className="w-6 h-6" />
                    <h3 className="font-bold text-lg">Analysis Report</h3>
                  </div>
                  <p className="text-gray-700 text-sm leading-relaxed mb-3">{prescription.analysis.summary}</p>
                  {prescription.analysis.tests.length > 0 && (
                    <div className="mb-3">
                      <p className="text-xs font-bold text-gray-600 uppercase tracking-wider mb-1">Recommended Tests</p>
                      <ul className="list-disc list-inside text-sm text-gray-700 space-y-0.5">
                        {prescription.analysis.tests.map((t, i) => (
                          <li key={i}>{t}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  <p className="text-[11px] text-gray-400 leading-relaxed">{prescription.analysis.disclaimer}</p>
                  <div className="mt-5 flex gap-3">
                    <Link
                      href={`/book?${prescription.analysis.tests.map((t) => `tests=${encodeURIComponent(t)}`).join('&')}`}
                      onClick={handleClose}
                      className="flex-1 text-center bg-green-600 text-white font-bold py-2 rounded-lg hover:bg-green-700 transition-colors"
                    >
                      Book These Tests
                    </Link>
                    <button onClick={handleClose} className="flex-1 bg-white border border-gray-300 text-gray-700 font-bold py-2 rounded-lg hover:bg-gray-50 transition-colors">
                      Close
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
}

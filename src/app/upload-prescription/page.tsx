"use client";
import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { Upload, FileText, CheckCircle, Phone, MessageCircle, Brain, X, AlertCircle } from 'lucide-react';
import { useAuth } from '../../lib/useAuth';
import { api, Prescription } from '../../lib/api';

export default function UploadPrescriptionPage() {
  const { user, loading: authLoading } = useAuth();
  const [dragActive, setDragActive] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [prescription, setPrescription] = useState<Prescription | null>(null);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(e.type === 'dragenter' || e.type === 'dragover');
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    const file = e.dataTransfer.files?.[0];
    if (file) processFile(file);
  };

  const processFile = (file: File) => {
    setUploadedFile(file);
    setPrescription(null);
    setError(null);
    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (ev) => setUploadedImage(ev.target?.result as string);
      reader.readAsDataURL(file);
    } else {
      setUploadedImage(null);
    }
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
    if (!uploadedFile) return;
    setError(null);
    setIsAnalyzing(true);
    try {
      const created = await api.prescriptions.upload(uploadedFile);
      setPrescription(created);
      const finalRecord = await pollUntilDone(created.id);
      if (!finalRecord) {
        setError('Analysis is taking longer than expected. Please check back shortly or call us for help.');
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

  return (
    <div className="bg-[#f8faff] min-h-screen">
      {/* Hero */}
      <section className="bg-gradient-to-r from-[#e0f2fe] to-[#eff6ff] py-14 border-b border-gray-100">
        <div className="max-w-[1260px] mx-auto px-4">
          <span className="inline-block bg-[#2563eb] text-white text-[10px] font-extrabold px-3 py-1.5 rounded-full tracking-widest uppercase mb-4">Upload & Book</span>
          <h1 className="text-3xl md:text-5xl font-extrabold text-[#0f2d5e] mb-3 leading-tight">
            Upload Your Prescription
          </h1>
          <p className="text-slate-500 text-sm md:text-base max-w-2xl font-medium">
            Connect with our specialists or visit us for accurate and reliable test results. Your health is our top priority. Discover our tailored health test packages, receive expert consultations, and visit our conveniently located lab in Bengaluru.
          </p>
        </div>
      </section>

      <section className="py-14">
        <div className="max-w-[1100px] mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">

            {/* Left: Upload area */}
            <div className="lg:col-span-3 flex flex-col gap-6">
              {!authLoading && user && (
                <div className="bg-blue-50 border border-blue-100 rounded-2xl p-4 text-xs font-semibold text-[#0f2d5e]">
                  Signed in as {user.name || user.phone || 'QXL patient'}. Prescription uploads will be saved to your profile.
                </div>
              )}

              {/* Drag & Drop Zone */}
              <div
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                onClick={() => inputRef.current?.click()}
                className={`relative border-2 border-dashed rounded-3xl p-10 flex flex-col items-center justify-center text-center cursor-pointer transition-all min-h-[280px] ${
                  dragActive
                    ? 'border-[#2563eb] bg-[#dbeafe]'
                    : uploadedFile
                    ? 'border-green-400 bg-green-50'
                    : 'border-[#93c5fd] bg-white hover:border-[#2563eb] hover:bg-[#f0f8fc]'
                }`}
              >
                <input
                  ref={inputRef}
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  className="hidden"
                  onChange={(e) => { const f = e.target.files?.[0]; if (f) processFile(f); }}
                />
                {uploadedFile ? (
                  <>
                    {uploadedImage ? (
                      <img src={uploadedImage} alt="Prescription preview"
                        className="max-h-52 rounded-xl mb-4 object-contain shadow border border-gray-100" />
                    ) : (
                      <div className="w-16 h-16 rounded-2xl bg-green-100 flex items-center justify-center mb-4">
                        <FileText className="w-8 h-8 text-green-600" />
                      </div>
                    )}
                    <p className="font-extrabold text-green-700 text-sm mb-1">✓ File Uploaded</p>
                    <p className="text-slate-500 text-xs font-medium">{uploadedFile.name}</p>
                    <button
                      onClick={(e) => { e.stopPropagation(); setUploadedFile(null); setUploadedImage(null); setPrescription(null); setError(null); }}
                      className="mt-3 flex items-center gap-1 text-red-500 text-xs font-bold hover:underline"
                    >
                      <X className="w-3.5 h-3.5" /> Remove file
                    </button>
                  </>
                ) : (
                  <>
                    <div className="w-20 h-20 rounded-full bg-[#dbeafe] flex items-center justify-center mb-5">
                      <Upload className="w-9 h-9 text-[#2563eb]" />
                    </div>
                    <p className="font-extrabold text-[#0f2d5e] text-lg mb-2">Drag & drop your prescription here</p>
                    <p className="text-slate-400 text-sm font-medium mb-4">or click to browse files</p>
                    <span className="inline-block bg-[#2563eb] text-white text-xs font-extrabold px-5 py-2.5 rounded-full">Browse File</span>
                    <p className="text-xs text-slate-400 mt-4 font-medium">Supports: JPG, PNG, PDF · Max 10 MB</p>
                  </>
                )}
              </div>

              {/* AI Analyze Button */}
              {uploadedFile && !prescription && !authLoading && user && (
                <button
                  onClick={handleAnalyze}
                  disabled={isAnalyzing}
                  className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-[#2563eb] to-[#1d4ed8] text-white font-extrabold py-4 rounded-2xl text-sm hover:opacity-90 transition-all shadow-md disabled:opacity-70"
                >
                  <Brain className="w-5 h-5" />
                  {isAnalyzing ? 'Analyzing with AI...' : 'Analyze Prescription with AI'}
                </button>
              )}

              {/* Login required notice */}
              {uploadedFile && !authLoading && !user && (
                <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                  <p className="text-xs text-amber-800 font-semibold leading-relaxed">
                    Please <Link href="/login" className="underline font-extrabold">log in</Link> to upload and get an AI analysis of your prescription.
                  </p>
                </div>
              )}

              {/* Error */}
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-2xl p-5 flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                  <p className="text-xs text-red-700 font-semibold leading-relaxed">{error}</p>
                </div>
              )}

              {/* AI Result */}
              {prescription?.analysis_status === 'completed' && prescription.analysis && (
                <div className="bg-white border border-green-200 rounded-2xl p-6 shadow-sm">
                  <div className="flex items-center gap-2 mb-3">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <h3 className="font-extrabold text-slate-800 text-sm">AI Analysis Result</h3>
                  </div>
                  <p className="text-xs text-slate-600 font-medium leading-relaxed mb-4">{prescription.analysis.summary}</p>
                  {prescription.analysis.tests.length > 0 && (
                    <div className="mb-4">
                      <p className="text-[11px] font-extrabold text-slate-700 uppercase tracking-wider mb-2">Recommended Tests</p>
                      <ul className="space-y-1">
                        {prescription.analysis.tests.map((t, i) => (
                          <li key={i} className="text-xs text-slate-600 font-medium flex items-start gap-1.5">
                            <CheckCircle className="w-3.5 h-3.5 text-green-500 shrink-0 mt-0.5" /> {t}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {prescription.analysis.medications.length > 0 && (
                    <div className="mb-4">
                      <p className="text-[11px] font-extrabold text-slate-700 uppercase tracking-wider mb-2">Medications Noted</p>
                      <p className="text-xs text-slate-600 font-medium">{prescription.analysis.medications.join(', ')}</p>
                    </div>
                  )}
                  <p className="text-[10px] text-slate-400 font-medium leading-relaxed mb-4">{prescription.analysis.disclaimer}</p>
                  <div className="mt-4 flex gap-3 flex-wrap">
                    {prescription.analysis.tests.length > 0 && (
                      <Link
                        href={`/book?${prescription.analysis.tests.map((t) => `tests=${encodeURIComponent(t)}`).join('&')}`}
                        className="inline-flex items-center gap-2 bg-green-600 text-white text-xs font-bold px-5 py-2.5 rounded-full"
                      >
                        Book These Tests
                      </Link>
                    )}
                    <a href="tel:+919964639639"
                      className="inline-flex items-center gap-2 bg-[#2563eb] text-white text-xs font-bold px-5 py-2.5 rounded-full">
                      <Phone className="w-3.5 h-3.5" /> Call to Confirm
                    </a>
                    <a href="https://api.whatsapp.com/send?phone=919964639639" target="_blank" rel="noreferrer"
                      className="inline-flex items-center gap-2 bg-[#25d366] text-white text-xs font-bold px-5 py-2.5 rounded-full">
                      <MessageCircle className="w-3.5 h-3.5" /> WhatsApp Us
                    </a>
                  </div>
                </div>
              )}

              {isAnalyzing && !prescription?.analysis && (
                <p className="text-xs text-slate-500 font-semibold text-center">Our AI is reading your prescription… this can take up to a minute.</p>
              )}
            </div>

            {/* Right: Info panel */}
            <div className="lg:col-span-2 flex flex-col gap-5">
              <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
                <h3 className="font-extrabold text-[#0f2d5e] text-base mb-4">How It Works</h3>
                {[
                  { step: '1', text: "Upload your doctor's prescription (photo or PDF)" },
                  { step: '2', text: 'Our AI identifies the required tests' },
                  { step: '3', text: 'QXL team confirms and prepares your order' },
                  { step: '4', text: 'Home collection or walk-in — your choice!' },
                ].map((s) => (
                  <div key={s.step} className="flex gap-3 mb-4 last:mb-0">
                    <div className="w-8 h-8 rounded-full bg-[#dbeafe] flex items-center justify-center flex-shrink-0 text-[#2563eb] font-black text-sm">{s.step}</div>
                    <p className="text-slate-600 text-xs font-medium leading-relaxed self-center">{s.text}</p>
                  </div>
                ))}
              </div>

              <div className="bg-gradient-to-br from-[#2563eb] to-[#1d4ed8] rounded-2xl p-6 text-white shadow-md">
                <h3 className="font-extrabold text-base mb-2">Need Help?</h3>
                <p className="text-blue-100 text-xs font-medium mb-5 leading-relaxed">
                  Our team of experts will guide you through the tests required based on your prescription.
                </p>
                <a href="tel:+919964639639"
                  className="flex items-center gap-2 bg-white/20 hover:bg-white/30 transition-colors rounded-xl px-4 py-3 mb-3 text-sm font-bold">
                  <Phone className="w-4 h-4" /> +91 99646 39639
                </a>
                <a href="https://api.whatsapp.com/send?phone=919964639639" target="_blank" rel="noreferrer"
                  className="flex items-center gap-2 bg-[#25d366]/80 hover:bg-[#25d366] transition-colors rounded-xl px-4 py-3 text-sm font-bold">
                  <MessageCircle className="w-4 h-4" /> WhatsApp Booking
                </a>
              </div>

              <div className="bg-[#dbeafe] rounded-2xl p-5 border border-[#d0e9f5]">
                <p className="text-[11px] text-slate-600 font-semibold leading-relaxed">
                  🔒 <strong>Privacy Protected:</strong> Your prescription is only used to identify required tests. We do not store or share your medical documents.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

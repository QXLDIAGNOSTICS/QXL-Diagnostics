import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, Upload, FileText, Loader2, CheckCircle2 } from 'lucide-react';

interface PrescriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function PrescriptionModal({ isOpen, onClose }: PrescriptionModalProps) {
  const [mounted, setMounted] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [report, setReport] = useState<string | null>(null);
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
      setReport(null);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleAnalyze = () => {
    if (!file) return;
    setIsAnalyzing(true);
    
    // Simulate AI analysis delay
    setTimeout(() => {
      setIsAnalyzing(false);
      setReport(
        "AI Analysis Complete.\n\n" +
        "Detected Tests from Prescription:\n" +
        "1. Complete Blood Count (CBC)\n" +
        "2. Thyroid Profile (T3, T4, TSH)\n" +
        "3. Fasting Blood Sugar (FBS)\n\n" +
        "Recommended Action: We have added these tests to your cart. You can proceed to book a home collection."
      );
    }, 3000);
  };

  return createPortal(
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden flex flex-col max-h-[90vh]">
        <div className="p-4 border-b flex items-center justify-between bg-blue-50">
          <h2 className="text-xl font-bold text-[#0f2d5e] flex items-center gap-2">
            <FileText className="text-blue-600" />
            Upload Prescription
          </h2>
          <button onClick={onClose} className="p-2 text-gray-500 hover:bg-white rounded-full transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 flex-1 overflow-y-auto">
          {!file ? (
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
                  <FileText className="text-blue-500 flex-shrink-0" />
                  <span className="font-medium text-gray-700 truncate">{file.name}</span>
                </div>
                <button 
                  onClick={() => { setFile(null); setReport(null); }}
                  className="text-red-500 text-sm font-semibold hover:underline flex-shrink-0"
                >
                  Remove
                </button>
              </div>

              {!isAnalyzing && !report && (
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

              {report && (
                <div className="bg-green-50 border border-green-200 rounded-xl p-5">
                  <div className="flex items-center gap-2 text-green-700 mb-3">
                    <CheckCircle2 className="w-6 h-6" />
                    <h3 className="font-bold text-lg">Analysis Report</h3>
                  </div>
                  <div className="whitespace-pre-line text-gray-700 text-sm leading-relaxed">
                    {report}
                  </div>
                  <div className="mt-5 flex gap-3">
                    <button className="flex-1 bg-green-600 text-white font-bold py-2 rounded-lg hover:bg-green-700 transition-colors">
                      Book These Tests
                    </button>
                    <button onClick={onClose} className="flex-1 bg-white border border-gray-300 text-gray-700 font-bold py-2 rounded-lg hover:bg-gray-50 transition-colors">
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

import React, { useState } from 'react';
import { 
  FileText, 
  ExternalLink, 
  Upload, 
  ChevronLeft, 
  ChevronRight, 
  X, 
  Maximize2, 
  RotateCcw,
  Sparkles,
  Layers
} from 'lucide-react';

export default function SamplePdfViewer({ 
  onClose,
  activeExpNo = '6'
}) {
  const [pdfUrl, setPdfUrl] = useState('./sample-target-record.pdf');
  const [currentPage, setCurrentPage] = useState(1);
  const [isCustomPdf, setIsCustomPdf] = useState(false);

  // Quick Page Presets matching the 30-page target record PDF
  const expPresets = [
    { label: 'Exp 6 (P.1)', page: 1, exp: '6' },
    { label: 'Exp 6 Output (P.2)', page: 2, exp: '6' },
    { label: 'Exp 6 Result (P.3)', page: 3, exp: '6' },
    { label: 'Exp 7 (P.5)', page: 5, exp: '7' },
    { label: 'Exp 7 Output (P.6)', page: 6, exp: '7' },
    { label: 'Exp 8 (P.9)', page: 9, exp: '8' },
    { label: 'Exp 9 (P.13)', page: 13, exp: '9' },
    { label: 'Exp 11 (P.21)', page: 21, exp: '11' },
    { label: 'Exp 12 (P.25)', page: 25, exp: '12' }
  ];

  const handleCustomPdfUpload = (e) => {
    const file = e.target.files?.[0];
    if (file && file.type === 'application/pdf') {
      const blobUrl = URL.createObjectURL(file);
      setPdfUrl(blobUrl);
      setIsCustomPdf(true);
      setCurrentPage(1);
    }
  };

  const handleResetToDefault = () => {
    setPdfUrl('./sample-target-record.pdf');
    setIsCustomPdf(false);
    setCurrentPage(1);
  };

  return (
    <div className="w-full h-full flex flex-col bg-slate-950/90 border border-white/[0.08] rounded-2xl shadow-2xl shadow-black/60 overflow-hidden">
      
      {/* Viewer Header */}
      <div className="bg-slate-900/90 border-b border-white/[0.08] px-3.5 py-2.5 flex flex-wrap items-center justify-between gap-2 shrink-0 backdrop-blur-md">
        
        {/* Title & Status */}
        <div className="flex items-center gap-2">
          <div className="p-1 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <FileText className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-white tracking-tight">
                Target Reference PDF
              </span>
              <span className="text-[10px] font-semibold bg-amber-500/10 text-amber-300 px-2 py-0.5 rounded-full border border-amber-500/20">
                {isCustomPdf ? 'Custom Upload' : 'Original 30-Page Model'}
              </span>
            </div>
            <p className="text-[10px] text-slate-400 hidden sm:block">
              Side-by-side visual reference for margins, spacing, font sizes & leaf alignment
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-1.5">
          
          {/* Quick Page Steppers */}
          <div className="flex items-center bg-slate-950 px-1 py-0.5 rounded-xl border border-white/[0.08]">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
              disabled={currentPage <= 1}
              className="p-1 text-slate-400 hover:text-white disabled:opacity-30 rounded hover:bg-slate-800 transition-colors"
              title="Previous Page"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
            <span className="text-[11px] font-mono font-bold text-amber-300 px-1.5">
              P.{currentPage}
            </span>
            <button
              onClick={() => setCurrentPage((prev) => Math.min(30, prev + 1))}
              disabled={currentPage >= 30}
              className="p-1 text-slate-400 hover:text-white disabled:opacity-30 rounded hover:bg-slate-800 transition-colors"
              title="Next Page"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Upload Custom PDF */}
          <label 
            className="flex items-center gap-1 px-2.5 py-1 text-xs font-medium text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-xl border border-white/[0.08] cursor-pointer transition-colors"
            title="Upload custom reference PDF to compare"
          >
            <Upload className="w-3.5 h-3.5 text-slate-400" />
            <span className="hidden md:inline">Change PDF</span>
            <input type="file" accept="application/pdf" onChange={handleCustomPdfUpload} className="hidden" />
          </label>

          {isCustomPdf && (
            <button
              onClick={handleResetToDefault}
              className="p-1 text-slate-400 hover:text-white bg-slate-800 rounded-xl border border-white/[0.08]"
              title="Reset to Original Model Record"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          )}

          {/* Open In New Tab */}
          <a
            href={pdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 px-2.5 py-1 text-xs font-medium text-indigo-300 hover:text-white bg-indigo-500/10 hover:bg-indigo-500/20 rounded-xl border border-indigo-500/30 transition-colors"
            title="Open Reference PDF in New Window / Fullscreen"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Fullscreen</span>
          </a>

          {/* Close Panel Button */}
          {onClose && (
            <button
              onClick={onClose}
              className="p-1 text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 rounded-xl border border-transparent hover:border-rose-500/20 transition-all ml-1"
              title="Hide Reference Comparison"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

      </div>

      {/* Quick Jump Ribbon for Experiments */}
      <div className="bg-slate-900/60 border-b border-white/[0.06] px-3 py-1.5 flex items-center gap-1.5 overflow-x-auto shrink-0 scrollbar-none text-[10px]">
        <span className="font-semibold text-slate-400 uppercase tracking-wider shrink-0 flex items-center gap-1">
          <Layers className="w-3 h-3 text-amber-400" />
          <span>Jump to:</span>
        </span>
        {expPresets.map((item) => {
          const isSelected = currentPage === item.page;
          return (
            <button
              key={item.page}
              onClick={() => setCurrentPage(item.page)}
              className={`px-2 py-0.5 rounded-lg font-mono font-medium shrink-0 transition-all border ${
                isSelected
                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/40 font-bold shadow-sm'
                  : 'bg-slate-950/60 text-slate-400 hover:text-slate-200 border-white/[0.04] hover:border-white/[0.1]'
              }`}
            >
              {item.label}
            </button>
          );
        })}
      </div>

      {/* PDF Viewport Container */}
      <div className="flex-1 w-full h-full relative bg-slate-950 overflow-hidden">
        <iframe
          key={`${pdfUrl}-${currentPage}`}
          src={`${pdfUrl}#page=${currentPage}&view=FitH`}
          className="w-full h-full border-0"
          title="Sample Target Laboratory Record PDF"
        />

        {/* Fallback Overlay Notification for Browsers without Native PDF plugin */}
        <noscript>
          <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center text-slate-300">
            <p className="text-sm font-semibold mb-2">Native PDF plugin not available</p>
            <a 
              href={pdfUrl} 
              target="_blank" 
              rel="noreferrer" 
              className="px-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-bold"
            >
              Open Reference PDF
            </a>
          </div>
        </noscript>
      </div>

    </div>
  );
}

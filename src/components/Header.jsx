import React from 'react';

export default function Header({
  onDownloadPdf,
  isExporting,
  onFillSample,
  onClearAll,
  onAddExperiment
}) {
  return (
    <header className="bg-slate-900/90 backdrop-blur-md border-b border-slate-800 px-4 py-3 flex items-center justify-between z-30 shrink-0">
      
      {/* Brand & Logo */}
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 flex items-center justify-center text-white font-black text-lg shadow-lg shadow-blue-500/25">
          BPT
        </div>
        <div>
          <h1 className="text-base font-bold text-white tracking-tight leading-none flex items-center gap-2">
            LOE Student Record Studio
            <span className="text-[10px] font-semibold bg-blue-500/20 text-blue-400 px-2 py-0.5 rounded-full border border-blue-500/30">
              v2.0
            </span>
          </h1>
          <p className="text-xs text-slate-400 mt-0.5 hidden sm:block">
            Multi-Experiment Lab Record & PDF Generator Studio
          </p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-2">
        <button
          onClick={onAddExperiment}
          className="flex items-center gap-1.5 text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white px-3 py-1.5 rounded-lg shadow-md shadow-emerald-600/30 transition-all active:scale-95"
          title="Add a new experiment at the end of the document"
        >
          <span>➕</span>
          <span>Add Experiment</span>
        </button>

        <button
          onClick={onFillSample}
          className="hidden sm:flex items-center gap-1.5 text-xs font-medium bg-slate-800 hover:bg-slate-700 text-amber-300 px-3 py-1.5 rounded-lg border border-slate-700 transition-colors"
          title="Populate sample experiment data"
        >
          <span>✨</span>
          <span>Sample Data</span>
        </button>

        <button
          onClick={onClearAll}
          className="hidden sm:flex items-center gap-1.5 text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-300 px-3 py-1.5 rounded-lg border border-slate-700 transition-colors"
          title="Clear all form fields"
        >
          <span>🗑️</span>
          <span>Clear</span>
        </button>

        <button
          onClick={onDownloadPdf}
          disabled={isExporting}
          className="btn-primary flex items-center gap-2 px-4 py-1.5 rounded-lg text-xs font-bold transition-all active:scale-95 disabled:opacity-50"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <span>{isExporting ? 'Exporting...' : 'Export PDF'}</span>
        </button>
      </div>

    </header>
  );
}

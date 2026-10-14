import React from 'react';
import { Plus, Sparkles, Trash2, Download, Layers, Loader2 } from 'lucide-react';

export default function Header({
  onDownloadPdf,
  isExporting,
  onFillSample,
  onClearAll,
  onAddExperiment
}) {
  return (
    <header className="bg-slate-950/85 backdrop-blur-xl border-b border-white/[0.08] px-4 py-2.5 flex items-center justify-between z-30 shrink-0 sticky top-0 shadow-lg shadow-black/40">
      
      {/* Brand & Studio Indicator */}
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 via-blue-600 to-indigo-800 flex items-center justify-center text-white font-black text-sm shadow-md shadow-indigo-500/20 ring-1 ring-white/20 select-none">
          <Layers className="w-5 h-5" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-sm sm:text-base font-bold text-white tracking-tight leading-none">
              LOE Student Record Studio
            </h1>
            <span className="inline-flex items-center gap-1 text-[10px] font-semibold bg-indigo-500/10 text-indigo-300 px-2 py-0.5 rounded-full border border-indigo-500/20 tracking-wide uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              v2.5 Studio
            </span>
          </div>
          <p className="text-[11px] text-slate-400 mt-0.5 hidden sm:flex items-center gap-1.5">
            <span>Engineering Lab Record Engine</span>
            <span className="text-slate-600">•</span>
            <span className="text-slate-400 font-mono text-[10px]">A4 Academic Print Standard</span>
          </p>
        </div>
      </div>

      {/* Action Toolbar */}
      <div className="flex items-center gap-2">

        <button
          onClick={onAddExperiment}
          className="flex items-center gap-1.5 text-xs font-semibold bg-emerald-600/90 hover:bg-emerald-500 text-white px-3 py-1.5 rounded-xl shadow-md shadow-emerald-950/50 border border-emerald-500/40 transition-all duration-150 active:scale-[0.97]"
          title="Add a new experiment to the document"
        >
          <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
          <span className="hidden xs:inline">Add Experiment</span>
        </button>

        <button
          onClick={onFillSample}
          className="hidden sm:flex items-center gap-1.5 text-xs font-medium bg-slate-900/90 hover:bg-slate-800 text-amber-300 px-3 py-1.5 rounded-xl border border-amber-500/20 hover:border-amber-500/40 transition-all duration-150 active:scale-[0.97]"
          title="Populate complete college syllabus reference sample data"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>Sample Data</span>
        </button>

        <button
          onClick={onClearAll}
          className="hidden sm:flex items-center gap-1.5 text-xs font-medium bg-slate-900/90 hover:bg-slate-800 text-slate-300 hover:text-rose-300 px-3 py-1.5 rounded-xl border border-white/[0.08] hover:border-rose-500/30 transition-all duration-150 active:scale-[0.97]"
          title="Clear all fields"
        >
          <Trash2 className="w-3.5 h-3.5 text-slate-400" />
          <span>Clear</span>
        </button>

        <button
          onClick={onDownloadPdf}
          disabled={isExporting}
          className="relative group overflow-hidden flex items-center gap-2 px-4 py-1.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 shadow-lg shadow-indigo-600/25 border border-indigo-400/30 transition-all duration-150 active:scale-[0.97] disabled:opacity-50 disabled:pointer-events-none"
        >
          {isExporting ? (
            <Loader2 className="w-4 h-4 animate-spin text-white" />
          ) : (
            <Download className="w-4 h-4 text-white stroke-[2.5]" />
          )}
          <span>{isExporting ? 'Exporting...' : 'Export PDF'}</span>
        </button>
      </div>

    </header>
  );
}

import React from 'react';
import { 
  Type, 
  Stamp, 
  Sliders, 
  Sparkles, 
  Eraser, 
  CaseSensitive,
  Code2,
  Heading,
  Check
} from 'lucide-react';

export default function Sidebar({ data, setData, formData, onUpdate, onFillSample, onClearAll, onShowToast }) {
  const currentData = data || formData || {};

  const handleUpdate = (field, value) => {
    if (setData) {
      setData((prev) => ({ ...prev, [field]: value }));
    } else if (onUpdate) {
      onUpdate(field, value);
    }
  };

  const handleFontChange = (font) => {
    handleUpdate('fontFamily', font);
    if (onShowToast) onShowToast(`Font changed to ${font}`);
  };

  const availableFonts = [
    { name: 'Times New Roman', label: 'Times New Roman (Academic)', style: { fontFamily: 'Times New Roman, serif' } },
    { name: 'Georgia', label: 'Georgia (Editorial Serif)', style: { fontFamily: 'Georgia, serif' } },
    { name: 'Garamond', label: 'Garamond (Classic Serif)', style: { fontFamily: 'Garamond, serif' } },
    { name: 'Inter', label: 'Inter (Modern Sans)', style: { fontFamily: 'Inter, sans-serif' } },
    { name: 'Outfit', label: 'Outfit (Clean Sans)', style: { fontFamily: 'Outfit, sans-serif' } },
    { name: 'Arial', label: 'Arial (Neutral Sans)', style: { fontFamily: 'Arial, sans-serif' } },
    { name: 'Calibri', label: 'Calibri (Document Sans)', style: { fontFamily: 'Calibri, sans-serif' } },
    { name: 'Verdana', label: 'Verdana (Legible Sans)', style: { fontFamily: 'Verdana, sans-serif' } },
    { name: 'Fira Code', label: 'Fira Code (Developer Mono)', style: { fontFamily: 'Fira Code, monospace' } },
    { name: 'Courier New', label: 'Courier New (Typewriter)', style: { fontFamily: 'Courier New, monospace' } }
  ];

  const bodyFontSize = currentData.bodyFontSize !== undefined ? currentData.bodyFontSize : 20;
  const codeFontSize = currentData.codeFontSize !== undefined ? currentData.codeFontSize : 20;
  const titleFontSize = currentData.titleFontSize !== undefined ? currentData.titleFontSize : 20;
  const activeFont = currentData.fontFamily || 'Times New Roman';

  return (
    <div className="w-full h-full bg-slate-950 flex flex-col justify-between p-4 sm:p-5 overflow-y-auto max-w-xl mx-auto space-y-6">
      <div className="space-y-6">
        
        {/* Section Header */}
        <div className="border-b border-white/[0.08] pb-4">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              <Sliders className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-white tracking-tight">
                Document Typography & Styling
              </h2>
              <p className="text-[11px] text-slate-400">
                Fine-tune print layout fonts, size metrics, and watermark
              </p>
            </div>
          </div>
        </div>

        {/* Section 1: Font Family Style */}
        <div className="bg-slate-900/60 backdrop-blur-sm rounded-2xl p-4 border border-white/[0.06] space-y-3 shadow-lg shadow-black/20">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-slate-200 tracking-wide flex items-center gap-1.5">
              <Type className="w-4 h-4 text-purple-400" />
              <span>Document Typeface Family</span>
            </h3>
            <span className="text-[10px] text-indigo-400 font-mono bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/20">
              {activeFont}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
            {availableFonts.map((item) => {
              const isSelected = activeFont === item.name;
              return (
                <button
                  key={item.name}
                  onClick={() => handleFontChange(item.name)}
                  className={`px-3 py-2.5 rounded-xl text-xs text-left transition-all duration-150 flex items-center justify-between border ${
                    isSelected
                      ? 'bg-gradient-to-r from-indigo-600 to-blue-600 text-white font-semibold border-indigo-400 shadow-md shadow-indigo-600/25 ring-1 ring-white/20'
                      : 'bg-slate-950/70 text-slate-300 hover:text-white border-white/[0.06] hover:border-white/[0.14] hover:bg-slate-900'
                  }`}
                >
                  <span style={item.style} className="truncate">
                    {item.label}
                  </span>
                  {isSelected && <Check className="w-3.5 h-3.5 shrink-0 ml-1.5 text-white stroke-[2.5]" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* Section 2: Precise Font Size Controls */}
        <div className="bg-slate-900/60 backdrop-blur-sm rounded-2xl p-4 border border-white/[0.06] space-y-4 shadow-lg shadow-black/20">
          <div className="flex items-center justify-between border-b border-white/[0.06] pb-3">
            <h3 className="text-xs font-bold text-slate-200 tracking-wide flex items-center gap-1.5">
              <CaseSensitive className="w-4 h-4 text-blue-400" />
              <span>Optical Font Scale Controls</span>
            </h3>
            <span className="text-[10px] text-slate-400">Default Target: 20px</span>
          </div>

          {/* 1. Body Text Size */}
          <div className="space-y-2 bg-slate-950/70 p-3 rounded-xl border border-white/[0.04]">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-slate-200 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                Body Text (Aim, Algorithm, Result)
              </span>
              <span className="font-mono text-blue-400 font-bold bg-blue-500/10 px-2 py-0.5 rounded border border-blue-500/20">
                {bodyFontSize}px
              </span>
            </div>
            <div className="flex items-center gap-3 pt-1">
              <input
                type="range"
                min="8"
                max="28"
                step="0.5"
                value={bodyFontSize}
                onChange={(e) => handleUpdate('bodyFontSize', parseFloat(e.target.value))}
                className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
              />
              <div className="flex items-center gap-1 shrink-0">
                <button
                  onClick={() => handleUpdate('bodyFontSize', Math.max(8, bodyFontSize - 0.5))}
                  className="w-7 h-7 flex items-center justify-center bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white rounded-lg border border-white/[0.08] text-xs font-bold transition-all active:scale-95"
                >
                  -
                </button>
                <button
                  onClick={() => handleUpdate('bodyFontSize', Math.min(28, bodyFontSize + 0.5))}
                  className="w-7 h-7 flex items-center justify-center bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white rounded-lg border border-white/[0.08] text-xs font-bold transition-all active:scale-95"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          {/* 2. Code & Console Output Size */}
          <div className="space-y-2 bg-slate-950/70 p-3 rounded-xl border border-white/[0.04]">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-slate-200 flex items-center gap-1.5">
                <Code2 className="w-3.5 h-3.5 text-indigo-400" />
                Commands & Code Lines
              </span>
              <span className="font-mono text-indigo-400 font-bold bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/20">
                {codeFontSize}px
              </span>
            </div>
            <div className="flex items-center gap-3 pt-1">
              <input
                type="range"
                min="7"
                max="28"
                step="0.5"
                value={codeFontSize}
                onChange={(e) => handleUpdate('codeFontSize', parseFloat(e.target.value))}
                className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
              />
              <div className="flex items-center gap-1 shrink-0">
                <button
                  onClick={() => handleUpdate('codeFontSize', Math.max(7, codeFontSize - 0.5))}
                  className="w-7 h-7 flex items-center justify-center bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white rounded-lg border border-white/[0.08] text-xs font-bold transition-all active:scale-95"
                >
                  -
                </button>
                <button
                  onClick={() => handleUpdate('codeFontSize', Math.min(28, codeFontSize + 0.5))}
                  className="w-7 h-7 flex items-center justify-center bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white rounded-lg border border-white/[0.08] text-xs font-bold transition-all active:scale-95"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          {/* 3. Section Titles Size */}
          <div className="space-y-2 bg-slate-950/70 p-3 rounded-xl border border-white/[0.04]">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-slate-200 flex items-center gap-1.5">
                <Heading className="w-3.5 h-3.5 text-purple-400" />
                Section Headings (AIM, ALGORITHM, COMMANDS)
              </span>
              <span className="font-mono text-purple-400 font-bold bg-purple-500/10 px-2 py-0.5 rounded border border-purple-500/20">
                {titleFontSize}px
              </span>
            </div>
            <div className="flex items-center gap-3 pt-1">
              <input
                type="range"
                min="10"
                max="32"
                step="0.5"
                value={titleFontSize}
                onChange={(e) => handleUpdate('titleFontSize', parseFloat(e.target.value))}
                className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-purple-500"
              />
              <div className="flex items-center gap-1 shrink-0">
                <button
                  onClick={() => handleUpdate('titleFontSize', Math.max(10, titleFontSize - 0.5))}
                  className="w-7 h-7 flex items-center justify-center bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white rounded-lg border border-white/[0.08] text-xs font-bold transition-all active:scale-95"
                >
                  -
                </button>
                <button
                  onClick={() => handleUpdate('titleFontSize', Math.min(32, titleFontSize + 0.5))}
                  className="w-7 h-7 flex items-center justify-center bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white rounded-lg border border-white/[0.08] text-xs font-bold transition-all active:scale-95"
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Section 3: Watermark Text */}
        <div className="bg-slate-900/60 backdrop-blur-sm rounded-2xl p-4 border border-white/[0.06] space-y-3 shadow-lg shadow-black/20">
          <h3 className="text-xs font-bold text-slate-200 tracking-wide flex items-center gap-1.5">
            <Stamp className="w-4 h-4 text-cyan-400" />
            <span>Document Watermark Overlay</span>
          </h3>
          <div className="relative">
            <input
              type="text"
              value={currentData.watermarkText || ''}
              onChange={(e) => handleUpdate('watermarkText', e.target.value)}
              className="w-full bg-slate-950/80 border border-white/[0.08] focus:border-cyan-500/80 focus:ring-2 focus:ring-cyan-500/20 rounded-xl px-3.5 py-2.5 text-xs text-slate-100 placeholder:text-slate-600 transition-all font-mono"
              placeholder="e.g. LOE RECORD (Leave blank for none)"
            />
          </div>
          <p className="text-[10px] text-slate-400 leading-relaxed">
            Renders a delicate, authentic diagonal watermark across each printed page without obscuring handwriting or code.
          </p>
        </div>

      </div>

      {/* Action Buttons at bottom */}
      <div className="space-y-2.5 pt-4 border-t border-white/[0.08] mt-6">
        <button
          onClick={onFillSample}
          className="w-full py-2.5 px-4 rounded-xl text-xs font-bold bg-indigo-600/15 hover:bg-indigo-600/25 text-indigo-300 hover:text-white border border-indigo-500/30 hover:border-indigo-500/50 transition-all duration-150 flex items-center justify-center gap-2 shadow-sm active:scale-[0.98]"
        >
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>Restore Sample Syllabus Experiments</span>
        </button>

        <button
          onClick={onClearAll}
          className="w-full py-2 px-4 rounded-xl text-xs font-medium bg-slate-950/60 hover:bg-rose-950/20 text-slate-400 hover:text-rose-400 border border-white/[0.06] hover:border-rose-900/50 transition-all duration-150 flex items-center justify-center gap-2 active:scale-[0.98]"
        >
          <Eraser className="w-3.5 h-3.5" />
          <span>Clear All Inputs & Start Blank</span>
        </button>
      </div>
    </div>
  );
}

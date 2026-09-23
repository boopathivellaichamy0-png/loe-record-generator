import React from 'react';
import { 
  Type,
  Stamp,
  Sliders,
  Sparkles,
  Eraser,
  AArrowUp
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
    'Times New Roman',
    'Arial',
    'Georgia',
    'Courier New',
    'Fira Code',
    'Outfit',
    'Inter',
    'Calibri',
    'Verdana',
    'Garamond'
  ];

  const bodyFontSize = currentData.bodyFontSize !== undefined ? currentData.bodyFontSize : 20;
  const codeFontSize = currentData.codeFontSize !== undefined ? currentData.codeFontSize : 20;
  const titleFontSize = currentData.titleFontSize !== undefined ? currentData.titleFontSize : 20;

  return (
    <div className="w-full h-full bg-slate-900 flex flex-col justify-between p-6 overflow-y-auto max-w-xl mx-auto border-r border-slate-800">
      <div className="space-y-6">
        
        {/* Workspace Nav Left Corner Editing Section Title */}
        <div className="border-b border-slate-800 pb-4">
          <h2 className="text-base font-bold text-slate-100 flex items-center gap-2">
            <Sliders className="w-5 h-5 text-blue-400" />
            <span>Workspace Editing & Styling Options</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Customize font family, font sizes, and watermark text preferences.
          </p>
        </div>

        {/* Section 1: Typography & Font Family Style */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
            <Type className="w-4 h-4 text-purple-400" />
            <span>PDF Font Family Style</span>
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {availableFonts.map((font) => (
              <button
                key={font}
                onClick={() => handleFontChange(font)}
                className={`px-3 py-2 rounded-xl text-xs font-medium text-left truncate transition-all border ${
                  (currentData.fontFamily || 'Times New Roman') === font
                    ? 'bg-blue-600 text-white font-semibold border-blue-500 shadow-md shadow-blue-600/30'
                    : 'bg-slate-950 text-slate-300 hover:text-white border-slate-800 hover:border-slate-700'
                }`}
              >
                {font}
              </button>
            ))}
          </div>
        </div>

        {/* Section 2: Font Size Controls (DEFAULT = 20px) */}
        <div className="space-y-4 pt-4 border-t border-slate-800">
          <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
            <AArrowUp className="w-4 h-4 text-amber-400" />
            <span>PDF Font Size Controls</span>
          </h3>

          {/* 1. Body Text Font Size (Aim, Algorithm, Result) */}
          <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-slate-200">Body Text Size (Aim / Algorithm / Result)</span>
              <span className="font-mono text-blue-400 font-bold bg-blue-500/10 px-2 py-0.5 rounded border border-blue-500/20">
                {bodyFontSize}px
              </span>
            </div>
            <div className="flex items-center gap-3">
              <input
                type="range"
                min="8"
                max="28"
                step="0.5"
                value={bodyFontSize}
                onChange={(e) => handleUpdate('bodyFontSize', parseFloat(e.target.value))}
                className="w-full accent-blue-500 cursor-pointer"
              />
              <div className="flex items-center gap-1 shrink-0">
                <button
                  onClick={() => handleUpdate('bodyFontSize', Math.max(8, bodyFontSize - 0.5))}
                  className="px-2 py-1 bg-slate-800 text-slate-300 hover:text-white rounded border border-slate-700 text-xs font-bold"
                >
                  -
                </button>
                <button
                  onClick={() => handleUpdate('bodyFontSize', Math.min(28, bodyFontSize + 0.5))}
                  className="px-2 py-1 bg-slate-800 text-slate-300 hover:text-white rounded border border-slate-700 text-xs font-bold"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          {/* 2. Code & Output Font Size */}
          <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-slate-200">Code & Console Output Size</span>
              <span className="font-mono text-indigo-400 font-bold bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/20">
                {codeFontSize}px
              </span>
            </div>
            <div className="flex items-center gap-3">
              <input
                type="range"
                min="7"
                max="28"
                step="0.5"
                value={codeFontSize}
                onChange={(e) => handleUpdate('codeFontSize', parseFloat(e.target.value))}
                className="w-full accent-indigo-500 cursor-pointer"
              />
              <div className="flex items-center gap-1 shrink-0">
                <button
                  onClick={() => handleUpdate('codeFontSize', Math.max(7, codeFontSize - 0.5))}
                  className="px-2 py-1 bg-slate-800 text-slate-300 hover:text-white rounded border border-slate-700 text-xs font-bold"
                >
                  -
                </button>
                <button
                  onClick={() => handleUpdate('codeFontSize', Math.min(28, codeFontSize + 0.5))}
                  className="px-2 py-1 bg-slate-800 text-slate-300 hover:text-white rounded border border-slate-700 text-xs font-bold"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          {/* 3. Section Titles Font Size */}
          <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-slate-200">Section Headings Size (AIM, ALGORITHM, CODING...)</span>
              <span className="font-mono text-purple-400 font-bold bg-purple-500/10 px-2 py-0.5 rounded border border-purple-500/20">
                {titleFontSize}px
              </span>
            </div>
            <div className="flex items-center gap-3">
              <input
                type="range"
                min="10"
                max="32"
                step="0.5"
                value={titleFontSize}
                onChange={(e) => handleUpdate('titleFontSize', parseFloat(e.target.value))}
                className="w-full accent-purple-500 cursor-pointer"
              />
              <div className="flex items-center gap-1 shrink-0">
                <button
                  onClick={() => handleUpdate('titleFontSize', Math.max(10, titleFontSize - 0.5))}
                  className="px-2 py-1 bg-slate-800 text-slate-300 hover:text-white rounded border border-slate-700 text-xs font-bold"
                >
                  -
                </button>
                <button
                  onClick={() => handleUpdate('titleFontSize', Math.min(32, titleFontSize + 0.5))}
                  className="px-2 py-1 bg-slate-800 text-slate-300 hover:text-white rounded border border-slate-700 text-xs font-bold"
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Section 3: Watermark Text */}
        <div className="space-y-3 pt-4 border-t border-slate-800">
          <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
            <Stamp className="w-4 h-4 text-cyan-400" />
            <span>Document Watermark Text</span>
          </h3>
          <input
            type="text"
            value={currentData.watermarkText || ''}
            onChange={(e) => handleUpdate('watermarkText', e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-slate-100 focus:outline-none focus:border-blue-500 transition-colors"
            placeholder="e.g. LOE BPT RECORD (Leave blank for no watermark)"
          />
        </div>

      </div>

      {/* Action Buttons at bottom */}
      <div className="space-y-2.5 pt-6 border-t border-slate-800 mt-6">
        <button
          onClick={onFillSample}
          className="w-full py-2.5 px-4 rounded-xl text-xs font-bold bg-blue-600/20 text-blue-400 border border-blue-500/30 hover:bg-blue-600/30 transition-colors flex items-center justify-center gap-2 shadow-sm"
        >
          <Sparkles className="w-4 h-4" />
          <span>Fill Sample Experiment Data</span>
        </button>

        <button
          onClick={onClearAll}
          className="w-full py-2.5 px-4 rounded-xl text-xs font-medium bg-slate-950 text-slate-400 hover:text-rose-400 border border-slate-800 hover:border-rose-900/50 transition-colors flex items-center justify-center gap-2"
        >
          <Eraser className="w-4 h-4" />
          <span>Clear All Input Fields</span>
        </button>
      </div>
    </div>
  );
}

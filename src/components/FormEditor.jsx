import React, { useState } from 'react';
import { 
  User, 
  FlaskConical, 
  Target, 
  Code, 
  Copy, 
  Check, 
  X, 
  Upload, 
  Plus,
  Terminal,
  FileText,
  Trash2,
  Calendar,
  Hash,
  Sparkles,
  ChevronDown
} from 'lucide-react';

export default function FormEditor({
  data,
  onUpdateGlobal,
  onUpdateActiveExp,
  onSelectExp,
  onAddExp,
  onDeleteExp,
  onFillSample,
  onClearAll,
  onDownload,
  isGenerating
}) {
  const [copiedCode, setCopiedCode] = useState(false);

  const globalData = data || {};
  const experimentsList = globalData.experiments || [];
  const activeIdx = globalData.activeExpIndex !== undefined ? globalData.activeExpIndex : 0;
  const currentExp = experimentsList[activeIdx] || experimentsList[0] || {};

  const handleExpFieldChange = (field, value) => {
    if (onUpdateActiveExp) {
      onUpdateActiveExp(field, value);
    }
  };

  const handleGlobalFieldChange = (field, value) => {
    if (onUpdateGlobal) {
      onUpdateGlobal(field, value);
    }
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(currentExp.code || '');
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files || []);
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const base64 = event.target?.result;
        if (base64) {
          const updatedImages = [...(currentExp.outputImages || []), base64];
          handleExpFieldChange('outputImages', updatedImages);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const handleRemoveImage = (imgIdx) => {
    const updatedImages = (currentExp.outputImages || []).filter((_, i) => i !== imgIdx);
    handleExpFieldChange('outputImages', updatedImages);
  };

  return (
    <div className="w-full space-y-5 pb-8">
      
      {/* MULTI-EXPERIMENT SELECTOR & ADD EXP TAB BAR */}
      <div className="bg-slate-900/70 backdrop-blur-md p-3.5 rounded-2xl border border-white/[0.08] space-y-3 shadow-xl shadow-black/25">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <FlaskConical className="w-4 h-4" />
            </div>
            <div>
              <span className="text-xs font-bold text-white tracking-tight">
                Document Experiments
              </span>
              <span className="ml-2 text-[10px] font-mono font-semibold bg-white/[0.06] text-slate-300 px-2 py-0.5 rounded-full border border-white/[0.08]">
                {experimentsList.length} Total
              </span>
            </div>
          </div>

          <button
            onClick={onAddExp}
            className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-white shadow-md shadow-emerald-950/40 border border-emerald-400/30 transition-all duration-150 flex items-center gap-1.5 active:scale-[0.97]"
            title="Append a new experiment to document"
          >
            <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
            <span>Add Exp</span>
          </button>
        </div>

        {/* Horizontal Scrollable Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-0.5 scrollbar-thin">
          {experimentsList.map((exp, idx) => {
            const isActive = idx === activeIdx;
            return (
              <div
                key={exp.id || idx}
                onClick={() => onSelectExp && onSelectExp(idx)}
                className={`group flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold cursor-pointer transition-all duration-150 border shrink-0 select-none ${
                  isActive
                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white border-blue-400 shadow-md shadow-indigo-600/30 ring-1 ring-white/20'
                    : 'bg-slate-950/70 text-slate-400 hover:text-slate-200 border-white/[0.06] hover:border-white/[0.12] hover:bg-slate-900'
                }`}
              >
                <span>🧪 Exp {exp.expNo || String(idx + 1)}</span>
                
                {experimentsList.length > 1 && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (onDeleteExp) onDeleteExp(idx);
                    }}
                    className="text-slate-400 hover:text-rose-400 p-0.5 rounded-md hover:bg-black/30 transition-colors"
                    title="Delete this experiment"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Card 1: Student Information */}
      <div className="bg-slate-900/60 backdrop-blur-sm rounded-2xl p-5 border border-white/[0.06] hover:border-white/[0.12] space-y-4 shadow-xl shadow-black/20 transition-colors">
        <div className="flex items-center gap-2 border-b border-white/[0.06] pb-3">
          <div className="p-1.5 rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/20">
            <User className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-xs font-bold text-white tracking-wide uppercase">
              Student Academic Credentials
            </h2>
            <p className="text-[10px] text-slate-400">Printed on every page header & footer</p>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-[11px] font-semibold text-slate-300 mb-1.5">Student Full Name</label>
            <input
              type="text"
              value={globalData.studentName || ''}
              onChange={(e) => handleGlobalFieldChange('studentName', e.target.value)}
              className="w-full bg-slate-950/80 border border-white/[0.08] focus:border-blue-500/80 focus:ring-2 focus:ring-blue-500/20 rounded-xl px-3.5 py-2.5 text-xs text-slate-100 font-bold uppercase placeholder:text-slate-600 transition-all tracking-wide"
              placeholder="e.g. ASHWANT S"
            />
          </div>
          <div>
            <label className="block text-[11px] font-semibold text-slate-300 mb-1.5">Register / Roll Number</label>
            <input
              type="text"
              value={globalData.registerNo || ''}
              onChange={(e) => handleGlobalFieldChange('registerNo', e.target.value)}
              className="w-full bg-slate-950/80 border border-white/[0.08] focus:border-blue-500/80 focus:ring-2 focus:ring-blue-500/20 rounded-xl px-3.5 py-2.5 text-xs text-slate-100 font-mono font-bold placeholder:text-slate-600 transition-all tracking-wider"
              placeholder="e.g. 714025247009"
            />
          </div>
        </div>
      </div>

      {/* Card 2: Active Experiment Information */}
      <div className="bg-slate-900/60 backdrop-blur-sm rounded-2xl p-5 border border-white/[0.06] hover:border-white/[0.12] space-y-4 shadow-xl shadow-black/20 transition-colors">
        <div className="flex items-center justify-between border-b border-white/[0.06] pb-3">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-purple-500/10 text-purple-400 border border-purple-500/20">
              <FlaskConical className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-xs font-bold text-white tracking-wide uppercase">
                Experiment {currentExp.expNo || String(activeIdx + 1)} Information
              </h2>
              <p className="text-[10px] text-slate-400">Header metadata & title block</p>
            </div>
          </div>
          {experimentsList.length > 1 && (
            <button
              onClick={() => onDeleteExp && onDeleteExp(activeIdx)}
              className="text-xs text-rose-400 hover:text-rose-300 font-semibold flex items-center gap-1.5 bg-rose-500/10 hover:bg-rose-500/20 px-2.5 py-1 rounded-xl border border-rose-500/25 transition-all"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Delete</span>
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-[11px] font-semibold text-slate-300 mb-1.5 flex items-center gap-1">
              <Hash className="w-3 h-3 text-purple-400" />
              <span>Experiment No.</span>
            </label>
            <input
              type="text"
              value={currentExp.expNo || ''}
              onChange={(e) => handleExpFieldChange('expNo', e.target.value)}
              className="w-full bg-slate-950/80 border border-white/[0.08] focus:border-purple-500/80 focus:ring-2 focus:ring-purple-500/20 rounded-xl px-3.5 py-2.5 text-xs text-slate-100 font-bold placeholder:text-slate-600 transition-all"
              placeholder="e.g. 6"
            />
          </div>
          <div>
            <label className="block text-[11px] font-semibold text-slate-300 mb-1.5 flex items-center gap-1">
              <Calendar className="w-3 h-3 text-purple-400" />
              <span>Experiment Date</span>
            </label>
            <input
              type="text"
              value={currentExp.date || ''}
              onChange={(e) => handleExpFieldChange('date', e.target.value)}
              className="w-full bg-slate-950/80 border border-white/[0.08] focus:border-purple-500/80 focus:ring-2 focus:ring-purple-500/20 rounded-xl px-3.5 py-2.5 text-xs text-slate-100 placeholder:text-slate-600 transition-all font-mono"
              placeholder="DD/MM/YYYY (or leave blank)"
            />
          </div>
        </div>

        <div>
          <label className="block text-[11px] font-semibold text-slate-300 mb-1.5">
            Experiment Title (Uppercase Academic Heading)
          </label>
          <input
            type="text"
            value={currentExp.title || ''}
            onChange={(e) => handleExpFieldChange('title', e.target.value)}
            className="w-full bg-slate-950/80 border border-white/[0.08] focus:border-purple-500/80 focus:ring-2 focus:ring-purple-500/20 rounded-xl px-3.5 py-2.5 text-xs text-slate-100 font-bold uppercase placeholder:text-slate-600 transition-all tracking-wide"
            placeholder="e.g. BASH SCRIPT USING BASH VARIABLE"
          />
        </div>
      </div>

      {/* Card 3: AIM & ALGORITHM */}
      <div className="bg-slate-900/60 backdrop-blur-sm rounded-2xl p-5 border border-white/[0.06] hover:border-white/[0.12] space-y-4 shadow-xl shadow-black/20 transition-colors">
        <div className="flex items-center gap-2 border-b border-white/[0.06] pb-3">
          <div className="p-1.5 rounded-lg bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
            <Target className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-xs font-bold text-white tracking-wide uppercase">
              Aim & Algorithm Logic
            </h2>
            <p className="text-[10px] text-slate-400">Printed directly under the title header</p>
          </div>
        </div>

        <div>
          <label className="block text-[11px] font-semibold text-slate-300 mb-1.5">AIM Statement</label>
          <textarea
            rows={3}
            value={currentExp.aim || ''}
            onChange={(e) => handleExpFieldChange('aim', e.target.value)}
            className="w-full bg-slate-950/80 border border-white/[0.08] focus:border-indigo-500/80 focus:ring-2 focus:ring-indigo-500/20 rounded-xl p-3.5 text-xs text-slate-100 placeholder:text-slate-600 transition-all resize-y leading-relaxed"
            placeholder="To write a Bash shell script to calculate an employee's basic salary details..."
          />
        </div>

        <div>
          <label className="block text-[11px] font-semibold text-slate-300 mb-1.5">
            ALGORITHM (Step by Step Instructions)
          </label>
          <textarea
            rows={5}
            value={currentExp.algorithm || ''}
            onChange={(e) => handleExpFieldChange('algorithm', e.target.value)}
            className="w-full bg-slate-950/80 border border-white/[0.08] focus:border-indigo-500/80 focus:ring-2 focus:ring-indigo-500/20 rounded-xl p-3.5 text-xs text-slate-100 placeholder:text-slate-600 transition-all resize-y leading-relaxed font-mono"
            placeholder={`1. Start the program.\n2. Read the employee name.\n3. Read the basic salary.\n4. Calculate HRA as 20% of basic salary.`}
          />
        </div>
      </div>

      {/* Card 4: COMMANDS / CODING */}
      <div className="bg-slate-900/60 backdrop-blur-sm rounded-2xl p-5 border border-white/[0.06] hover:border-white/[0.12] space-y-4 shadow-xl shadow-black/20 transition-colors">
        <div className="flex items-center justify-between border-b border-white/[0.06] pb-3">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <Code className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-xs font-bold text-white tracking-wide uppercase">
                Commands / Code Implementation
              </h2>
              <p className="text-[10px] text-slate-400">Strict line-by-line formatting & continuation</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <select
              value={currentExp.codeLabel || 'COMMANDS:'}
              onChange={(e) => handleExpFieldChange('codeLabel', e.target.value)}
              className="bg-slate-950 border border-white/[0.1] text-xs text-emerald-400 font-bold rounded-xl px-2.5 py-1.5 focus:outline-none focus:border-emerald-500 cursor-pointer"
            >
              <option value="COMMANDS:">COMMANDS:</option>
              <option value="CODING:">CODING:</option>
              <option value="PROGRAM:">PROGRAM:</option>
              <option value="SOURCE CODE:">SOURCE CODE:</option>
              <option value="SQL QUERIES:">SQL QUERIES:</option>
            </select>

            <button
              onClick={handleCopyCode}
              className="text-xs font-semibold text-slate-300 hover:text-white flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 px-3 py-1.5 rounded-xl border border-white/[0.08] transition-all duration-150 active:scale-95"
            >
              {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-400 stroke-[2.5]" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedCode ? 'Copied' : 'Copy'}</span>
            </button>
          </div>
        </div>

        <div className="relative">
          <textarea
            rows={12}
            value={currentExp.code || ''}
            onChange={(e) => handleExpFieldChange('code', e.target.value)}
            className="w-full bg-slate-950/90 border border-white/[0.08] focus:border-emerald-500/80 focus:ring-2 focus:ring-emerald-500/20 rounded-xl p-3.5 text-xs text-slate-100 placeholder:text-slate-600 transition-all font-mono resize-y leading-relaxed"
            placeholder="Paste Linux bash commands, C/C++ code, Java, or SQL queries here..."
          />
        </div>
      </div>

      {/* Card 5: OUTPUT TEXT & TERMINAL SCREENSHOTS */}
      <div className="bg-slate-900/60 backdrop-blur-sm rounded-2xl p-5 border border-white/[0.06] hover:border-white/[0.12] space-y-4 shadow-xl shadow-black/20 transition-colors">
        <div className="flex items-center gap-2 border-b border-white/[0.06] pb-3">
          <div className="p-1.5 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <Terminal className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-xs font-bold text-white tracking-wide uppercase">
              Execution Output & Terminal Screenshots
            </h2>
            <p className="text-[10px] text-slate-400">Positioned on Page 2 • Drag directly on paper canvas to move & resize behind text</p>
          </div>
        </div>

        <div>
          <label className="block text-[11px] font-semibold text-slate-300 mb-1.5">
            Console Output Text (Optional)
          </label>
          <textarea
            rows={3}
            value={currentExp.outputText || ''}
            onChange={(e) => handleExpFieldChange('outputText', e.target.value)}
            className="w-full bg-slate-950/80 border border-white/[0.08] focus:border-amber-500/80 focus:ring-2 focus:ring-amber-500/20 rounded-xl p-3 text-xs text-slate-200 placeholder:text-slate-600 transition-all font-mono resize-y"
            placeholder="Paste text execution output..."
          />
        </div>

        {/* Upload Terminal Screenshot Image */}
        <div className="space-y-2.5">
          <label className="block text-[11px] font-semibold text-slate-300">
            Upload Terminal Screenshot Image(s)
          </label>
          <label className="border-2 border-dashed border-white/[0.12] hover:border-blue-500/80 rounded-2xl p-5 flex flex-col items-center justify-center cursor-pointer bg-slate-950/60 hover:bg-slate-950/90 transition-all group">
            <div className="p-2 rounded-xl bg-blue-500/10 text-blue-400 mb-2 group-hover:scale-110 transition-transform">
              <Upload className="w-5 h-5" />
            </div>
            <span className="text-xs text-slate-200 font-semibold">
              Drop terminal screenshot here or click to browse
            </span>
            <span className="text-[10px] text-slate-400 mt-0.5">PNG, JPG, WebP supported</span>
            <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" multiple />
          </label>

          {/* Previews */}
          {currentExp.outputImages && currentExp.outputImages.length > 0 && (
            <div className="grid grid-cols-2 gap-3 pt-2">
              {currentExp.outputImages.map((img, idx) => (
                <div key={idx} className="relative group bg-slate-950 rounded-xl overflow-hidden border border-white/[0.08] shadow-md">
                  <img src={img} alt={`Terminal Screenshot ${idx + 1}`} className="w-full h-24 object-contain p-2" />
                  <button
                    onClick={() => handleRemoveImage(idx)}
                    className="absolute top-1.5 right-1.5 bg-rose-600 hover:bg-rose-500 text-white p-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                    title="Remove screenshot"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Card 6: EVALUATION MARKS & RESULT STATEMENT */}
      <div className="bg-slate-900/60 backdrop-blur-sm rounded-2xl p-5 border border-white/[0.06] hover:border-white/[0.12] space-y-4 shadow-xl shadow-black/20 transition-colors">
        <div className="flex items-center justify-between border-b border-white/[0.06] pb-3">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-rose-500/10 text-rose-400 border border-rose-500/20">
              <FileText className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-xs font-bold text-white tracking-wide uppercase">
                Evaluation Table & Final Result
              </h2>
              <p className="text-[10px] text-slate-400">Rendered on Page 3 (Final Written Page)</p>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-slate-950/80 px-3 py-1.5 rounded-xl border border-white/[0.08]">
            <span className="text-[11px] text-slate-300 font-medium">Show Eval Box:</span>
            <button
              onClick={() => handleExpFieldChange('showEvalTable', currentExp.showEvalTable === false ? true : false)}
              className={`w-9 h-5 rounded-full transition-colors relative p-0.5 cursor-pointer ${
                currentExp.showEvalTable !== false ? 'bg-indigo-600' : 'bg-slate-800'
              }`}
            >
              <div className={`w-4 h-4 rounded-full bg-white transition-transform ${
                currentExp.showEvalTable !== false ? 'translate-x-4' : 'translate-x-0'
              }`} />
            </button>
          </div>
        </div>

        {/* 4 Evaluation Marks Inputs */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-950/80 p-3.5 rounded-xl border border-white/[0.06]">
          <div>
            <label className="block text-[10px] font-semibold text-slate-400 mb-1 text-center">PROGRAM & EXEC.</label>
            <input
              type="text"
              value={currentExp.evalMarks?.programExecution || ''}
              onChange={(e) => handleExpFieldChange('evalMarks', { ...currentExp.evalMarks, programExecution: e.target.value })}
              className="w-full bg-slate-900 border border-white/[0.08] focus:border-indigo-500 rounded-lg px-2 py-1.5 text-xs text-center font-bold text-white transition-all"
              placeholder="-"
            />
          </div>
          <div>
            <label className="block text-[10px] font-semibold text-slate-400 mb-1 text-center">CLASS PERF.</label>
            <input
              type="text"
              value={currentExp.evalMarks?.classPerformance || ''}
              onChange={(e) => handleExpFieldChange('evalMarks', { ...currentExp.evalMarks, classPerformance: e.target.value })}
              className="w-full bg-slate-900 border border-white/[0.08] focus:border-indigo-500 rounded-lg px-2 py-1.5 text-xs text-center font-bold text-white transition-all"
              placeholder="-"
            />
          </div>
          <div>
            <label className="block text-[10px] font-semibold text-slate-400 mb-1 text-center">VIVA</label>
            <input
              type="text"
              value={currentExp.evalMarks?.viva || ''}
              onChange={(e) => handleExpFieldChange('evalMarks', { ...currentExp.evalMarks, viva: e.target.value })}
              className="w-full bg-slate-900 border border-white/[0.08] focus:border-indigo-500 rounded-lg px-2 py-1.5 text-xs text-center font-bold text-white transition-all"
              placeholder="-"
            />
          </div>
          <div>
            <label className="block text-[10px] font-semibold text-slate-400 mb-1 text-center">TOTAL MARKS</label>
            <input
              type="text"
              value={currentExp.evalMarks?.total || ''}
              onChange={(e) => handleExpFieldChange('evalMarks', { ...currentExp.evalMarks, total: e.target.value })}
              className="w-full bg-slate-900 border border-emerald-500/40 focus:border-emerald-500 rounded-lg px-2 py-1.5 text-xs text-center font-bold text-emerald-400 transition-all"
              placeholder="-"
            />
          </div>
        </div>

        <div>
          <label className="block text-[11px] font-semibold text-slate-300 mb-1.5">RESULT Statement</label>
          <textarea
            rows={3}
            value={currentExp.result || ''}
            onChange={(e) => handleExpFieldChange('result', e.target.value)}
            className="w-full bg-slate-950/80 border border-white/[0.08] focus:border-rose-500/80 focus:ring-2 focus:ring-rose-500/20 rounded-xl p-3.5 text-xs text-slate-100 placeholder:text-slate-600 transition-all leading-relaxed"
            placeholder="Thus, using Linux commands, employee gross salary has been found successfully."
          />
        </div>
      </div>

    </div>
  );
}

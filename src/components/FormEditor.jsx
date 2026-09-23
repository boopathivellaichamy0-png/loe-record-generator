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
  Trash2
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
    <div className="w-full space-y-6 pb-8">
      
      {/* MULTI-EXPERIMENT SELECTOR & ADD EXP TAB BAR */}
      <div className="bg-slate-900 p-3 rounded-2xl border border-slate-800 space-y-3 shadow-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-200">
            <FlaskConical className="w-4 h-4 text-emerald-400" />
            <span>Document Experiments List ({experimentsList.length})</span>
          </div>
          <button
            onClick={onAddExp}
            className="px-3 py-1 rounded-lg text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow-md transition-all flex items-center gap-1 active:scale-95"
            title="Add a new experiment to the end of the document"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Experiment</span>
          </button>
        </div>

        {/* Horizontal Scrollable Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          {experimentsList.map((exp, idx) => {
            const isActive = idx === activeIdx;
            return (
              <div
                key={exp.id || idx}
                onClick={() => onSelectExp && onSelectExp(idx)}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold cursor-pointer transition-all border shrink-0 select-none ${
                  isActive
                    ? 'bg-blue-600 text-white border-blue-500 shadow-md ring-2 ring-blue-400'
                    : 'bg-slate-950 text-slate-400 hover:text-white border-slate-800 hover:border-slate-700'
                }`}
              >
                <span>🧪 Exp {exp.expNo || String(idx + 1)}</span>
                
                {experimentsList.length > 1 && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (onDeleteExp) onDeleteExp(idx);
                    }}
                    className="ml-1 text-slate-400 hover:text-rose-400 p-0.5 rounded hover:bg-slate-800/80 transition-colors"
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
      <div className="bg-slate-900 rounded-2xl p-5 border border-slate-800 space-y-4 shadow-lg">
        <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
          <User className="w-5 h-5 text-blue-400" />
          <h2 className="text-sm font-bold text-white tracking-tight">Student Details</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Student Name</label>
            <input
              type="text"
              value={globalData.studentName || ''}
              onChange={(e) => handleGlobalFieldChange('studentName', e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-slate-100 focus:outline-none focus:border-blue-500 transition-colors font-bold uppercase"
              placeholder="e.g. ASHWANT S"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Register Number</label>
            <input
              type="text"
              value={globalData.registerNo || ''}
              onChange={(e) => handleGlobalFieldChange('registerNo', e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-slate-100 focus:outline-none focus:border-blue-500 transition-colors font-mono font-bold"
              placeholder="e.g. 714025247009"
            />
          </div>
        </div>
      </div>

      {/* Card 2: Active Experiment Information */}
      <div className="bg-slate-900 rounded-2xl p-5 border border-slate-800 space-y-4 shadow-lg">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <FlaskConical className="w-5 h-5 text-purple-400" />
            <h2 className="text-sm font-bold text-white tracking-tight">
              Editing Experiment {currentExp.expNo || String(activeIdx + 1)} Details
            </h2>
          </div>
          {experimentsList.length > 1 && (
            <button
              onClick={() => onDeleteExp && onDeleteExp(activeIdx)}
              className="text-xs text-rose-400 hover:text-rose-300 font-semibold flex items-center gap-1 bg-rose-500/10 px-2.5 py-1 rounded-lg border border-rose-500/20"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Delete Exp</span>
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Experiment No.</label>
            <input
              type="text"
              value={currentExp.expNo || ''}
              onChange={(e) => handleExpFieldChange('expNo', e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-slate-100 focus:outline-none focus:border-purple-500 transition-colors font-bold"
              placeholder="6"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Date</label>
            <input
              type="text"
              value={currentExp.date || ''}
              onChange={(e) => handleExpFieldChange('date', e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-slate-100 focus:outline-none focus:border-purple-500 transition-colors"
              placeholder="10/7/2026"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">Experiment Title</label>
          <input
            type="text"
            value={currentExp.title || ''}
            onChange={(e) => handleExpFieldChange('title', e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-slate-100 focus:outline-none focus:border-purple-500 transition-colors font-semibold uppercase"
            placeholder="e.g. BASH SCRIPT USING BASH VARIABLE"
          />
        </div>
      </div>

      {/* Card 3: AIM & ALGORITHM */}
      <div className="bg-slate-900 rounded-2xl p-5 border border-slate-800 space-y-4 shadow-lg">
        <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
          <Target className="w-5 h-5 text-indigo-400" />
          <h2 className="text-sm font-bold text-white tracking-tight">Aim & Algorithm</h2>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">AIM</label>
          <textarea
            rows={3}
            value={currentExp.aim || ''}
            onChange={(e) => handleExpFieldChange('aim', e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-100 focus:outline-none focus:border-indigo-500 transition-colors resize-y font-sans"
            placeholder="To write a Bash shell script to calculate an employee's basic salary details..."
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">ALGORITHM (One step per line)</label>
          <textarea
            rows={6}
            value={currentExp.algorithm || ''}
            onChange={(e) => handleExpFieldChange('algorithm', e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-100 focus:outline-none focus:border-indigo-500 transition-colors resize-y font-sans leading-relaxed"
            placeholder={`1. Start the program.\n2. Read the employee name.\n3. Read the basic salary.\n4. Calculate HRA as 20% of the basic salary.`}
          />
        </div>
      </div>

      {/* Card 4: COMMANDS / CODING */}
      <div className="bg-slate-900 rounded-2xl p-5 border border-slate-800 space-y-4 shadow-lg">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <Code className="w-5 h-5 text-emerald-400" />
            <h2 className="text-sm font-bold text-white tracking-tight">
              Commands / Code Section (Exp {currentExp.expNo})
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <select
              value={currentExp.codeLabel || 'COMMANDS:'}
              onChange={(e) => handleExpFieldChange('codeLabel', e.target.value)}
              className="bg-slate-950 border border-slate-800 text-xs text-emerald-400 font-bold rounded-lg px-2.5 py-1 focus:outline-none"
            >
              <option value="COMMANDS:">Heading: COMMANDS:</option>
              <option value="CODING:">Heading: CODING:</option>
            </select>
            <button
              onClick={handleCopyCode}
              className="text-xs text-slate-400 hover:text-white flex items-center gap-1 bg-slate-800 px-2.5 py-1 rounded-lg border border-slate-700 transition-colors"
            >
              {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedCode ? 'Copied' : 'Copy'}</span>
            </button>
          </div>
        </div>

        <textarea
          rows={12}
          value={currentExp.code || ''}
          onChange={(e) => handleExpFieldChange('code', e.target.value)}
          className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3.5 text-xs text-slate-100 focus:outline-none focus:border-emerald-500 transition-colors font-mono resize-y leading-relaxed"
          placeholder="Paste Linux commands or Bash shell script lines..."
        />
      </div>

      {/* Card 5: OUTPUT TEXT & TERMINAL SCREENSHOTS */}
      <div className="bg-slate-900 rounded-2xl p-5 border border-slate-800 space-y-4 shadow-lg">
        <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
          <Terminal className="w-5 h-5 text-amber-400" />
          <h2 className="text-sm font-bold text-white tracking-tight">
            OUTPUT (Terminal Screenshots & Execution Output)
          </h2>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">Terminal Output Text (Optional)</label>
          <textarea
            rows={4}
            value={currentExp.outputText || ''}
            onChange={(e) => handleExpFieldChange('outputText', e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-200 focus:outline-none focus:border-amber-500 transition-colors font-mono resize-y"
            placeholder="Paste text execution output..."
          />
        </div>

        {/* Upload Terminal Screenshot Image */}
        <div className="space-y-2">
          <label className="block text-xs font-semibold text-slate-300">Upload Terminal Screenshot Image(s)</label>
          <div className="flex items-center gap-3">
            <label className="flex-1 border-2 border-dashed border-slate-800 hover:border-blue-500 rounded-xl p-4 flex flex-col items-center justify-center cursor-pointer bg-slate-950 transition-colors group">
              <Upload className="w-6 h-6 text-slate-400 group-hover:text-blue-400 mb-1 transition-colors" />
              <span className="text-xs text-slate-300 font-medium">Click to upload terminal screenshot</span>
              <span className="text-[10px] text-slate-500">PNG, JPG, SVG supported</span>
              <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" multiple />
            </label>
          </div>

          {/* Previews */}
          {currentExp.outputImages && currentExp.outputImages.length > 0 && (
            <div className="grid grid-cols-2 gap-3 pt-2">
              {currentExp.outputImages.map((img, idx) => (
                <div key={idx} className="relative group bg-slate-950 rounded-xl overflow-hidden border border-slate-800">
                  <img src={img} alt={`Terminal Screenshot ${idx + 1}`} className="w-full h-24 object-contain p-2" />
                  <button
                    onClick={() => handleRemoveImage(idx)}
                    className="absolute top-1.5 right-1.5 bg-rose-600 text-white p-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity shadow-md"
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
      <div className="bg-slate-900 rounded-2xl p-5 border border-slate-800 space-y-4 shadow-lg">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-rose-400" />
            <h2 className="text-sm font-bold text-white tracking-tight">Evaluation Box Marks & Result</h2>
          </div>
          <div className="flex items-center gap-2 bg-slate-950 px-3 py-1 rounded-lg border border-slate-800">
            <span className="text-xs text-slate-400 font-medium">Show Box:</span>
            <button
              onClick={() => handleExpFieldChange('showEvalTable', currentExp.showEvalTable === false ? true : false)}
              className={`w-9 h-5 rounded-full transition-colors relative p-0.5 ${
                currentExp.showEvalTable !== false ? 'bg-blue-600' : 'bg-slate-800'
              }`}
            >
              <div className={`w-4 h-4 rounded-full bg-white transition-transform ${
                currentExp.showEvalTable !== false ? 'translate-x-4' : 'translate-x-0'
              }`} />
            </button>
          </div>
        </div>

        {/* 4 Evaluation Marks Inputs */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-950 p-3 rounded-xl border border-slate-800">
          <div>
            <label className="block text-[10px] font-semibold text-slate-400 mb-1">PROGRAM & EXEC.</label>
            <input
              type="text"
              value={currentExp.evalMarks?.programExecution || ''}
              onChange={(e) => handleExpFieldChange('evalMarks', { ...currentExp.evalMarks, programExecution: e.target.value })}
              className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2 py-1.5 text-xs text-center font-bold text-white"
              placeholder=""
            />
          </div>
          <div>
            <label className="block text-[10px] font-semibold text-slate-400 mb-1">CLASS PERF.</label>
            <input
              type="text"
              value={currentExp.evalMarks?.classPerformance || ''}
              onChange={(e) => handleExpFieldChange('evalMarks', { ...currentExp.evalMarks, classPerformance: e.target.value })}
              className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2 py-1.5 text-xs text-center font-bold text-white"
              placeholder=""
            />
          </div>
          <div>
            <label className="block text-[10px] font-semibold text-slate-400 mb-1">VIVA</label>
            <input
              type="text"
              value={currentExp.evalMarks?.viva || ''}
              onChange={(e) => handleExpFieldChange('evalMarks', { ...currentExp.evalMarks, viva: e.target.value })}
              className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2 py-1.5 text-xs text-center font-bold text-white"
              placeholder=""
            />
          </div>
          <div>
            <label className="block text-[10px] font-semibold text-slate-400 mb-1">TOTAL MARKS</label>
            <input
              type="text"
              value={currentExp.evalMarks?.total || ''}
              onChange={(e) => handleExpFieldChange('evalMarks', { ...currentExp.evalMarks, total: e.target.value })}
              className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2 py-1.5 text-xs text-center font-bold text-emerald-400"
              placeholder=""
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">RESULT Statement</label>
          <textarea
            rows={3}
            value={currentExp.result || ''}
            onChange={(e) => handleExpFieldChange('result', e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-100 focus:outline-none focus:border-rose-500 transition-colors font-sans"
            placeholder="Thus, using Linux commands, employee gross salary has been found successfully."
          />
        </div>
      </div>

    </div>
  );
}

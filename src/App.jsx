import React, { useState } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import FormEditor from './components/FormEditor';
import PdfDocument from './components/PdfDocument';
import { exportToPdf } from './utils/pdfExporter';

// Factory for creating a brand new experiment
export const createNewExperiment = (expNumber = 6) => ({
  id: `exp_${Date.now()}_${expNumber}`,
  expNo: String(expNumber),
  date: '',
  title: `BASH SCRIPT ${expNumber}`,
  aim: '',
  algorithm: '',
  code: '',
  codeLabel: 'COMMANDS:',
  outputText: '',
  outputImages: [],
  showEvalTable: true,
  evalMarks: {
    programExecution: '',
    classPerformance: '',
    viva: '',
    total: ''
  },
  result: ''
});

// Initial Data Matching Uploaded Target College Laboratory Record (Exp 6, 7, 8)
export const INITIAL_MULTI_EXPERIMENT_DATA = {
  studentName: 'ASHWANT S',
  registerNo: '714025247009',
  fontFamily: 'Times New Roman',
  bodyFontSize: 12,
  codeFontSize: 11,
  titleFontSize: 13,
  imageMaxHeight: 180,
  imageMaxWidth: 95,
  imageAlignment: 'center',
  imageMarginTop: 4,
  imageOffsetX: 0,
  imageOffsetY: 4,
  watermarkText: '',
  activeExpIndex: 0,
  experiments: [
    {
      id: 'exp_6',
      expNo: '6',
      date: '',
      title: 'BASH SCRIPT USING BASH VARIABLE',
      aim: 'To write a Bash shell script to calculate an employee\'s basic salary details and arithmetic equation',
      algorithm: `1. Start the program.
2. Read the employee name.
3. Read the basic salary.
4. Calculate HRA as 20% of the basic salary.
5. Calculate DA as 10% of the basic salary.
6. Calculate gross salary = Basic salary + HRA + DA.
7. Display the employee details and salary.`,
      codeLabel: 'COMMANDS:',
      code: `1. To create shell file:
   $ nano emp.sh
2. #Scripting
   echo "Enter employee name:"
   read name
   echo "Employee Basic Salary:"
   read salary
   da=$((salary * 10 / 100))
   hra=$((salary * 20 / 100))
   gross=$((salary + da + hra))
   echo "Employee name : $name"
   echo "Employee basic salary : $salary"
   echo "DA : $da"
   echo "HRA : $hra"
   echo "Gross salary : $gross"

3. To give permission to execute:
   $ chmod +x emp.sh

4. To run the shell:
   $ ./emp.sh`,
      outputText: ``,
      outputImages: [],
      showEvalTable: true,
      evalMarks: {
        programExecution: '',
        classPerformance: '',
        viva: '',
        total: ''
      },
      result: 'Thus, using Linux commands, employee gross salary has been found successfully.'
    },
    {
      id: 'exp_7',
      expNo: '7',
      date: '',
      title: 'BASH SCRIPT USING CONDITIONAL STATEMENT',
      aim: 'To write a Bash shell script to validate the therapy session details such as Patient ID, Patient Name, Age, Gender, Therapist Name, Session Date, Session Time, Username and Password, and check whether valid.',
      algorithm: `1. Read Patient ID, Patient Name, Age, Gender, Therapist Name, Session Time, Date, Username & Password.
2. Check whether each required field is empty.
3. Check whether Age is a number between 1 to 120.
4. If any field is invalid, display the corresponding error message.`,
      codeLabel: 'COMMANDS:',
      code: `1.To create script:
   $nano emp7.sh
   #!/bin/bash
   echo "Basic Therapy Session Login Validation"
   read -p "Enter Patient ID: " patient_id
   read -p "Enter Patient Name: " patient_name
   read -p "Enter Age: " age
   read -p "Enter Gender (Male/Female/Other): " gender
   read -p "Enter Therapist Name: " therapist
   read -p "Enter Session Date: " session_date
   read -p "Enter Session Time: " session_time
   read -p "Enter Username: " username
   read -sp "Enter Password: " password
   echo
   valid=1
   if [ -z "$patient_id" ]; then
   echo "Error: Patient ID cannot be empty"
   valid=0
   fi
   if [ -z "$patient_name" ]; then
   echo "Error: Patient name cannot be empty"
   valid=0
   fi
   if ! [[ "$age" =~ ^[0-9]+$ ]] || [ "$age" -lt 1 ] || [ "$age" -gt 120 ]; then
   echo "Error: Age must be between 1 and 120"
   valid=0
   fi
   if [ -z "$gender" ]; then
   echo "Error: Gender cannot be empty"
   valid=0
   fi
   if [ -z "$therapist" ]; then
   echo "Error: Therapist Name cannot be empty"
   valid=0
   fi
   if [ -z "$session_time" ]; then
   echo "Error: Session Time cannot be empty"
   valid=0
   fi
   if [ -z "$session_date" ]; then
   echo "Error: Session Date cannot be empty"
   valid=0
   fi
   if [ -z "$username" ]; then
   echo "Error: Username cannot be empty"
   valid=0
   fi
   if [ -z "$password" ]; then
   echo "Error: Password cannot be empty"
   valid=0
   fi
   if [ "$valid" -eq 1 ]; then
   echo "All details are valid"
   echo "Basic Therapy Session Login Successful!"
   else
   echo "Please enter valid details."
   fi

2.To give execute permission:
  $ chmod +x emp7.sh

3.To run the script:
  $ ./emp7.sh`,
      outputText: ``,
      outputImages: [],
      showEvalTable: true,
      evalMarks: {
        programExecution: '',
        classPerformance: '',
        viva: '',
        total: ''
      },
      result: 'Thus, the login validation script was executed successfully and the therapy session details were validated.'
    }
  ]
};

export default function App() {
  const [formData, setFormData] = useState(INITIAL_MULTI_EXPERIMENT_DATA);
  const [isExporting, setIsExporting] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(85);
  const [viewLayout, setViewLayout] = useState('double');
  
  // Sub-Tab inside Workspace Panel ("inputs" or "styling")
  const [editorSubTab, setEditorSubTab] = useState('inputs');

  // Adjustable Panel Split Ratio Width Percentage (default 32%)
  const [leftPanelWidth, setLeftPanelWidth] = useState(32);
  const [isResizing, setIsResizing] = useState(false);

  const startResizing = (e) => {
    e.preventDefault();
    setIsResizing(true);

    const handleMouseMove = (moveEvent) => {
      const totalWidth = window.innerWidth;
      const newLeftWidth = (moveEvent.clientX / totalWidth) * 100;
      setLeftPanelWidth(Math.max(18, Math.min(75, newLeftWidth)));
    };

    const handleMouseUp = () => {
      setIsResizing(false);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
  };

  const handleUpdateGlobal = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value
    }));
  };

  // ADD NEW EXPERIMENT FEATURE
  const handleAddExperiment = () => {
    setFormData((prev) => {
      const nextExpNum = (prev.experiments || []).length + 6;
      const newExp = createNewExperiment(nextExpNum);
      const updatedExps = [...(prev.experiments || []), newExp];
      return {
        ...prev,
        experiments: updatedExps,
        activeExpIndex: updatedExps.length - 1
      };
    });

    // Auto scroll preview panel to bottom
    setTimeout(() => {
      const previewPanel = document.querySelector('.preview-space-panel');
      if (previewPanel) {
        previewPanel.scrollTo({ top: previewPanel.scrollHeight, behavior: 'smooth' });
      }
    }, 200);
  };

  const handleDeleteExperiment = (indexToDelete) => {
    setFormData((prev) => {
      if ((prev.experiments || []).length <= 1) {
        alert('Document must contain at least one experiment.');
        return prev;
      }
      const updatedExps = prev.experiments.filter((_, idx) => idx !== indexToDelete);
      const newActiveIdx = Math.min(prev.activeExpIndex, updatedExps.length - 1);
      return {
        ...prev,
        experiments: updatedExps,
        activeExpIndex: Math.max(0, newActiveIdx)
      };
    });
  };

  const handleSelectActiveExperiment = (idx) => {
    setFormData((prev) => ({
      ...prev,
      activeExpIndex: idx
    }));
  };

  const handleUpdateActiveExperimentField = (field, value) => {
    setFormData((prev) => {
      const activeIdx = prev.activeExpIndex !== undefined ? prev.activeExpIndex : 0;
      const updatedExps = [...(prev.experiments || [])];
      if (updatedExps[activeIdx]) {
        updatedExps[activeIdx] = {
          ...updatedExps[activeIdx],
          [field]: value
        };
      }
      return {
        ...prev,
        experiments: updatedExps
      };
    });
  };

  const handleFillSample = () => {
    setFormData((prev) => {
      const activeIdx = prev.activeExpIndex !== undefined ? prev.activeExpIndex : 0;
      const sampleExp = INITIAL_MULTI_EXPERIMENT_DATA.experiments[0];

      if (prev.experiments && prev.experiments.length > 0) {
        const updatedExps = [...prev.experiments];
        updatedExps[activeIdx] = {
          ...updatedExps[activeIdx],
          expNo: updatedExps[activeIdx].expNo || sampleExp.expNo,
          date: sampleExp.date,
          title: sampleExp.title,
          aim: sampleExp.aim,
          algorithm: sampleExp.algorithm,
          code: sampleExp.code,
          codeLabel: sampleExp.codeLabel,
          outputText: sampleExp.outputText,
          outputImages: sampleExp.outputImages || [],
          evalMarks: { ...sampleExp.evalMarks },
          result: sampleExp.result
        };
        return {
          ...prev,
          studentName: prev.studentName || INITIAL_MULTI_EXPERIMENT_DATA.studentName,
          registerNo: prev.registerNo || INITIAL_MULTI_EXPERIMENT_DATA.registerNo,
          experiments: updatedExps
        };
      }
      return INITIAL_MULTI_EXPERIMENT_DATA;
    });
  };

  const handleClearAll = () => {
    setFormData((prev) => ({
      ...prev,
      studentName: '',
      registerNo: '',
      watermarkText: '',
      activeExpIndex: 0,
      experiments: [createNewExperiment(6)]
    }));
  };

  const handleZoomIn = () => setZoomLevel((prev) => Math.min(160, prev + 10));
  const handleZoomOut = () => setZoomLevel((prev) => Math.max(30, prev - 10));
  const handleZoomReset = () => setZoomLevel(85);

  const handleDownloadPdf = async () => {
    if (isExporting) return;
    try {
      setIsExporting(true);
      const studentName = formData.studentName || 'Student';
      const filename = `${studentName.replace(/\s+/g, '_')}_Lab_Record.pdf`;
      
      await exportToPdf('pdf-content', filename);
    } catch (err) {
      console.error('PDF export failed:', err);
      alert('Failed to generate PDF. Please try again.');
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className={`app-container flex flex-col h-screen w-screen overflow-hidden bg-slate-950 text-slate-100 font-sans ${isResizing ? 'select-none' : ''}`}>
      {/* Top Header */}
      <Header
        onDownloadPdf={handleDownloadPdf}
        isExporting={isExporting}
        onFillSample={handleFillSample}
        onClearAll={handleClearAll}
        onAddExperiment={handleAddExperiment}
      />

      {/* Main Workspace Split-Screen Container */}
      <div className="main-content flex flex-col md:flex-row flex-1 overflow-hidden relative w-full h-full">
        
        {/* LEFT PANE: WORKSPACE & INPUT DETAILS EDITOR */}
        <div
          className="h-1/2 md:h-full overflow-y-auto bg-slate-950 flex flex-col shrink-0"
          style={{ width: window.innerWidth >= 768 ? `${leftPanelWidth}%` : '100%' }}
        >
          {/* Sub-Nav Bar inside Left Editor Panel */}
          <div className="w-full px-4 py-3 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between sticky top-0 z-20 backdrop-blur-md">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-300">📝 Workspace Editor:</span>
              <div className="flex items-center bg-slate-950 p-1 rounded-lg border border-slate-800">
                <button
                  onClick={() => setEditorSubTab('inputs')}
                  className={`px-3 py-1 rounded-md text-xs font-bold transition-all flex items-center gap-1.5 ${
                    editorSubTab === 'inputs'
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <span>📋</span>
                  <span>Inputs</span>
                </button>

                <button
                  onClick={() => setEditorSubTab('styling')}
                  className={`px-3 py-1 rounded-md text-xs font-bold transition-all flex items-center gap-1.5 ${
                    editorSubTab === 'styling'
                      ? 'bg-purple-600 text-white shadow-sm'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <span>⚙️</span>
                  <span>Styling</span>
                </button>
              </div>
            </div>
          </div>

          {/* Form Editor or Sidebar */}
          <div className="p-3 sm:p-4 overflow-y-auto flex-1">
            {editorSubTab === 'inputs' ? (
              <FormEditor
                data={formData}
                setData={setFormData}
                formData={formData}
                onUpdateGlobal={handleUpdateGlobal}
                onUpdateActiveExp={handleUpdateActiveExperimentField}
                onSelectExp={handleSelectActiveExperiment}
                onAddExp={handleAddExperiment}
                onDeleteExp={handleDeleteExperiment}
                onFillSample={handleFillSample}
                onClearAll={handleClearAll}
                onDownload={handleDownloadPdf}
                isGenerating={isExporting}
              />
            ) : (
              <Sidebar
                data={formData}
                setData={setFormData}
                formData={formData}
                onUpdate={handleUpdateGlobal}
                onFillSample={handleFillSample}
                onClearAll={handleClearAll}
              />
            )}
          </div>
        </div>

        {/* INTERACTIVE DRAGGABLE RESIZER HANDLE */}
        <div
          onMouseDown={startResizing}
          className={`hidden md:flex w-2.5 h-full bg-slate-900 hover:bg-blue-600 cursor-col-resize items-center justify-center shrink-0 border-x border-slate-800 transition-colors z-20 group ${
            isResizing ? 'bg-blue-600' : ''
          }`}
          title="Click and drag left or right to adjust Workspace & Preview panel widths"
        >
          <div className="w-1 h-10 bg-slate-600 group-hover:bg-white rounded-full transition-colors" />
        </div>

        {/* RIGHT PANE: LIVE DOCUMENT PREVIEW CANVAS WITH MULTI-EXPERIMENT ADD BUTTON */}
        <div
          className="flex-1 h-1/2 md:h-full overflow-x-auto overflow-y-auto preview-space-panel flex flex-col items-center p-3 sm:p-6"
          style={{ width: window.innerWidth >= 768 ? `${100 - leftPanelWidth}%` : '100%' }}
        >
          
          {/* Sticky Preview Controls Header */}
          <div className="flex flex-wrap items-center justify-between gap-2 w-full max-w-[440mm] mb-4 bg-slate-900/90 p-3 rounded-xl border border-slate-800 backdrop-blur-md shrink-0 shadow-lg sticky top-0 z-30">
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-slate-200">👁️ Live Preview Space</span>
              <span className="text-xs text-slate-400 font-mono hidden sm:inline">({formData.experiments?.length || 1} Experiment{(formData.experiments?.length || 1) > 1 ? 's' : ''})</span>
            </div>

            <div className="flex items-center gap-2">
              {/* ADD NEW EXPERIMENT BUTTON IN PREVIEW SPACE */}
              <button
                onClick={handleAddExperiment}
                className="px-3.5 py-1.5 rounded-lg text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow-md shadow-emerald-600/30 transition-all flex items-center gap-1.5 active:scale-95"
                title="Add a new experiment at the end of the last experiment"
              >
                <span>➕</span>
                <span>Add New Experiment</span>
              </button>

              {/* 2-Page Single Row vs Single Page Toggle */}
              <div className="flex items-center bg-slate-950 p-1 rounded-lg border border-slate-800">
                <button
                  onClick={() => setViewLayout('double')}
                  className={`px-2.5 py-1 rounded text-xs font-semibold transition-all ${
                    viewLayout === 'double'
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                  title="View 2 Pages Side-by-Side in a Single Row"
                >
                  📖 2 Pages
                </button>
                <button
                  onClick={() => setViewLayout('single')}
                  className={`px-2.5 py-1 rounded text-xs font-semibold transition-all ${
                    viewLayout === 'single'
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                  title="View 1 Page Stacked Column"
                >
                  📜 1 Page
                </button>
              </div>

              {/* Zoom Controls Bar */}
              <div className="flex items-center gap-1 bg-slate-950 px-2 py-1 rounded-lg border border-slate-800">
                <button
                  onClick={handleZoomOut}
                  disabled={zoomLevel <= 30}
                  className="text-slate-300 hover:text-white disabled:opacity-30 px-2 py-0.5 text-xs font-bold rounded hover:bg-slate-800 transition-colors"
                  title="Zoom Out (-10%)"
                >
                  🔍 –
                </button>
                <button
                  onClick={handleZoomReset}
                  className="text-xs font-mono font-bold text-blue-400 px-2 py-0.5 rounded bg-blue-500/10 border border-blue-500/20 hover:bg-blue-500/20 transition-colors"
                  title="Reset Zoom to 85%"
                >
                  {zoomLevel}%
                </button>
                <button
                  onClick={handleZoomIn}
                  disabled={zoomLevel >= 160}
                  className="text-slate-300 hover:text-white disabled:opacity-30 px-2 py-0.5 text-xs font-bold rounded hover:bg-slate-800 transition-colors"
                >
                  🔍 +
                </button>
              </div>

              <button
                onClick={handleDownloadPdf}
                disabled={isExporting}
                className="btn-primary px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all active:scale-95 disabled:opacity-50"
              >
                {isExporting ? 'Exporting...' : 'Export PDF'}
              </button>
            </div>
          </div>

          {/* Dynamic Scaled Live Document Preview Canvas */}
          <div className="w-full flex justify-center overflow-x-auto py-2">
            <div
              className="preview-scaler transition-transform duration-200 origin-top flex flex-col items-center shrink-0"
              style={{
                transform: `scale(${zoomLevel / 100})`,
                transformOrigin: 'top center'
              }}
            >
              <PdfDocument data={formData} onUpdateData={handleUpdateGlobal} viewLayout={viewLayout} />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

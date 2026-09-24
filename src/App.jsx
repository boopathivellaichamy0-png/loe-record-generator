import React, { useState } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import FormEditor from './components/FormEditor';
import PdfDocument from './components/PdfDocument';
import { exportToPdf } from './utils/pdfExporter';

// Factory for creating a brand new experiment
export const createNewExperiment = (expNumber = 1) => ({
  id: `exp_${Date.now()}_${expNumber}`,
  expNo: String(expNumber),
  date: '07.07.2026',
  title: `EXPERIMENT TITLE ${expNumber}`,
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

// Initial Data Matching Uploaded Target College Laboratory Record (Exp 1 & Exp 2)
export const INITIAL_MULTI_EXPERIMENT_DATA = {
  studentName: 'DEEPAK A',
  registerNo: '714025247021',
  fontFamily: 'Times New Roman',
  bodyFontSize: 13,
  codeFontSize: 12.5,
  titleFontSize: 14.5,
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
      id: 'exp_1',
      expNo: '1',
      date: '07.07.2026',
      title: 'INSTALLATION OF KALI LINUX USING ORACLE VM VIRTUALBOX',
      aim: 'To install and configure Kali Linux on Oracle VirtualBox by creating a virtual machine, installing the Kali Linux operating system, and verifying its successful setup for cybersecurity and networking experiments.',
      algorithm: `OPERATING SYSTEM :
Definition: An Operating System is system software that manages the computer's hardware and software resources and allows users to interact with the computer.

KALI LINUX:
Definition: Kali Linux is a Debian-based Linux distribution developed for offensive security. It is specially designed for cybersecurity professionals, ethical hackers, penetration testers, and digital forensic analysts.

Advantages of kali linux:
• Free and open source
• Pre-installed security tools
• Regular updates
• Highly customizable
• Strong community support

Disadvantages of Kali Linux:
• Difficult for beginners
• Not suitable for daily use
• Can be misused if used illegally
• Requires Linux knowledge
• Some hardware compatibility issues`,
      codeLabel: 'COMMANDS:',
      code: `Procedure / Configuration of Kali Linux in VirtualBox:

Step 1: Open Oracle VirtualBox.
Step 2: Select the New option to create a new virtual machine.
Step 3: Enter the VM name as Kali Linux and select Linux -> Debian (64-bit).
Step 4: Allocate 4096 MB RAM and 2 processor cores.
Step 5: Create a 35 GB dynamically allocated VDI virtual hard disk.
Step 6: Open Settings -> Storage and attach the downloaded Kali Linux ISO file.
Step 7: Configure Display by setting 128 MB Video Memory and selecting VMSVGA as graphics controller.
Step 8: Start the virtual machine and select Graphical Install.
Step 9: Choose the language, location, and keyboard layout.
Step 10: Enter the hostname, leave domain blank, and create username and password.
Step 11: Select Guided - Use Entire Disk, choose the virtual hard disk, confirm partition settings.
Step 12: Select the Xfce Desktop Environment and default tool selection for software installation.
Step 13: Install the GRUB Boot Loader on /dev/sda and complete the installation.
Step 14: Restart the virtual machine and log in using the created username and password.
Step 15: Now the setup is complete, and Kali Linux is configured in Oracle VirtualBox.`,
      outputText: ``,
      outputImages: [],
      showEvalTable: true,
      evalMarks: {
        programExecution: '',
        classPerformance: '',
        viva: '',
        total: ''
      },
      result: 'Thus, the installation of Oracle VirtualBox and Kali Linux, and the configuration of Kali Linux in Oracle VirtualBox, has been completed successfully.'
    },
    {
      id: 'exp_2',
      expNo: '2',
      date: '07.07.2026',
      title: 'EXECUTION OF BASIC LINUX COMMANDS',
      aim: 'To learn and execute for user information directory management, directory navigation and file management.',
      algorithm: `1. Open the Linux terminal.
2. Display the current user information.
3. Display the current working directory.
4. List files and directories using different ls options.
5. Navigate between directories using the cd command.
6. Create new files using the touch command.
7. Display the contents of the files using suitable commands.
8. Copy and rename files and directories.
9. Delete files and directories using suitable commands.
10. Verify the files and directories after performing the operations.`,
      codeLabel: 'COMMANDS:',
      code: `1. Display the current username.
   whoami
2. Switch to root user
   sudo -i
3. Return to normal user
   exit
4. Displays the full path of working directory.
   pwd
5. List files and directories.
   ls
6. List files and Directories in long formats.
   ls-l
7. Lists all files and directories, including hidden files.
   ls -a
8. Change the Directory.
   cd directory_name
9. Move to parent directory.
   cd ..
10. Move to home directory.
   cd~
11. Create new directory.
   mkdir directory_name
12. To create a file.
   touch file_name
13. To work in that file.
   echo "text"> file_name
14. Display contents of the file.
   cat file_name
15. Remove specified file.
   rm file_name
16. Remove specified directory.
   rmdir directory_name`,
      outputText: ``,
      outputImages: [],
      showEvalTable: true,
      evalMarks: {
        programExecution: '',
        classPerformance: '',
        viva: '',
        total: ''
      },
      result: 'Thus, the basic Linux commands were executed successfully and the outputs were displayed successfully.'
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
      const nextExpNum = (prev.experiments || []).length + 1;
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
      experiments: [createNewExperiment(1)]
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

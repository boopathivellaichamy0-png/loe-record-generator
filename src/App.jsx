import React, { useState } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import FormEditor from './components/FormEditor';
import PdfDocument from './components/PdfDocument';
import { exportToPdf } from './utils/pdfExporter';
import { 
  FileText,
  Sliders,
  Plus, 
  Eye, 
  BookOpen, 
  Scroll, 
  ZoomIn, 
  ZoomOut, 
  Download, 
  Loader2
} from 'lucide-react';

// Factory for creating a brand new experiment
export const createNewExperiment = (expNumber = 1) => ({
  id: `exp_${Date.now()}_${expNumber}`,
  expNo: String(expNumber),
  date: '',
  title: '',
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

export const SAMPLE_TERMINAL_IMAGE = `data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20640%20360%22%20width%3D%22640%22%20height%3D%22360%22%3E%0A%20%20%3Crect%20width%3D%22640%22%20height%3D%22360%22%20rx%3D%228%22%20fill%3D%22%231e1e1e%22%2F%3E%0A%20%20%3Ccircle%20cx%3D%2220%22%20cy%3D%2218%22%20r%3D%226%22%20fill%3D%22%23ff5f56%22%2F%3E%0A%20%20%3Ccircle%20cx%3D%2238%22%20cy%3D%2218%22%20r%3D%226%22%20fill%3D%22%23ffbd2e%22%2F%3E%0A%20%20%3Ccircle%20cx%3D%2256%22%20cy%3D%2218%22%20r%3D%226%22%20fill%3D%22%2327c93f%22%2F%3E%0A%20%20%3Ctext%20x%3D%2224%22%20y%3D%2260%22%20fill%3D%22%234ade80%22%20font-family%3D%22monospace%22%20font-size%3D%2214%22%20font-weight%3D%22bold%22%3Estudent%40linux%3A~%24%20.%2Femp.sh%3C%2Ftext%3E%0A%20%20%3Ctext%20x%3D%2224%22%20y%3D%2290%22%20fill%3D%22%23e2e8f0%22%20font-family%3D%22monospace%22%20font-size%3D%2213%22%3EEnter%20employee%20name%3A%20ASHWANT%20S%3C%2Ftext%3E%0A%20%20%3Ctext%20x%3D%2224%22%20y%3D%22120%22%20fill%3D%22%23e2e8f0%22%20font-family%3D%22monospace%22%20font-size%3D%2213%22%3EEmployee%20Basic%20Salary%3A%2025000%3C%2Ftext%3E%0A%20%20%3Ctext%20x%3D%2224%22%20y%3D%22150%22%20fill%3D%22%2338bdf8%22%20font-family%3D%22monospace%22%20font-size%3D%2213%22%3EEmployee%20name%20%3A%20ASHWANT%20S%3C%2Ftext%3E%0A%20%20%3Ctext%20x%3D%2224%22%20y%3D%22175%22%20fill%3D%22%2338bdf8%22%20font-family%3D%22monospace%22%20font-size%3D%2213%22%3EEmployee%20basic%20salary%20%3A%2025000%3C%2Ftext%3E%0A%20%20%3Ctext%20x%3D%2224%22%20y%3D%22200%22%20fill%3D%22%2338bdf8%22%20font-family%3D%22monospace%22%20font-size%3D%2213%22%3EDA%20%3A%202500%3C%2Ftext%3E%0A%20%20%3Ctext%20x%3D%2224%22%20y%3D%22225%22%20fill%3D%22%2338bdf8%22%20font-family%3D%22monospace%22%20font-size%3D%2213%22%3EHRA%20%3A%205000%3C%2Ftext%3E%0A%20%20%3Ctext%20x%3D%2224%22%20y%3D%22250%22%20fill%3D%22%234ade80%22%20font-family%3D%22monospace%22%20font-size%3D%2214%22%20font-weight%3D%22bold%22%3EGross%20salary%20%3A%2032500%3C%2Ftext%3E%0A%20%20%3Ctext%20x%3D%2224%22%20y%3D%22295%22%20fill%3D%22%2394a3b8%22%20font-family%3D%22monospace%22%20font-size%3D%2212%22%3Estudent%40linux%3A~%24%20%26%23x2588%3B%3C%2Ftext%3E%0A%3C%2Fsvg%3E`;

// Full Sample Experiments Dataset Matching Target College Lab Record PDF Exactly
export const TARGET_SAMPLE_EXPERIMENTS = [
  {
    id: 'exp_6',
    expNo: '6',
    date: '',
    title: 'BASH SCRIPT USING BASH VARIABLE',
    aim: 'To write a Bash shell script to calculate an employee’s basic salary details and arithmetic equation',
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
    outputImages: [SAMPLE_TERMINAL_IMAGE],
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
  },
  {
    id: 'exp_8',
    expNo: '8',
    date: '',
    title: 'BASH SCRIPT USING LOOPS',
    aim: 'To write a Bash shell script using a loop for user account management..',
    algorithm: `1. Display a menu for user account management.
2. Read the user account operation.
3. Use a loop to repeatedly perform the selected operation.
4. Create, delete, or display user accounts using appropriate Linux commands.
5. Continue until the user selects the quit option.`,
    codeLabel: 'COMMANDS:',
    code: `1.To create script:
   $ nano emp8.sh
   #Scripting:
   #!/bin/bash
   echo "User Account Audit"
   echo
   echo "1. Username"
   for user in $(cut -d: -f1 /etc/passwd)
   do
   echo "$user"
   done
   echo
   echo "2. USER UID INFORMATION"
   cat /etc/passwd | while IFS=: read -r username password uid gid fullname home shell
   do
   echo "User: $username | UID: $uid"
   done
   echo
   echo "3. Account Status"
   users=$(cut -d: -f1 /etc/passwd)
   i=1
   total=$(echo "$users" | wc -l)
   until [ $i -gt $total ]
   do
   username=$(echo "$users" | sed -n "\${i}p")
   if passwd -S "$username" 2>/dev/null | grep -q " L "
   then
   echo "$username : Locked"
   else
   echo "$username : Active"
   fi
   i=$((i+1))` + `\n   done\n   echo\n   echo "AUDIT COMPLETE"\n\n2. To give execute permission:\n   $ chmod +x emp8.sh\n\n3. To run the script:\n   $ sh emp8.sh`,
    outputText: ``,
    outputImages: [],
    showEvalTable: true,
    evalMarks: {
      programExecution: '',
      classPerformance: '',
      viva: '',
      total: ''
    },
    result: 'Thus, the Bash shell script for user account management using a loop has been done successfully.'
  },
  {
    id: 'exp_9',
    expNo: '9',
    date: '',
    title: 'BASH SCRIPT USING FUNCTION',
    aim: 'To develop a Bash shell script using functions to automate basic administrative tasks in Linux.',
    algorithm: `1. Write the Bash script.
2. Define functions for administrative tasks.
3. Call the required functions.
4. Display the task result.
5. Note the outputs.`,
    codeLabel: 'COMMANDS:',
    code: `1.$ nano exp9.sh
   #Scripting:
   #!/bin/bash
   dysrm-info()
   {
   echo "System Information"
   echo "Hostname : $(hostname)"
   echo "Current user : $(whoami)"
   echo "Date : $(date)"
   echo "Uptime : $(uptime -p)"
   }
   disk-usage()
   {
   echo "Disk Usage"
   df -h
   }
   memory-usage()
   {
   echo "Memory Usage"
   free -h
   }
   logged-users()
   {
   echo "Logged in users"
   who
   }
   running-processes()
   {
   echo "Top running process"
   ps aux --sort=-%cpu | head
   }
   dysrm-info
   disk-usage
   memory-usage
   logged-users
   running-processes

2.$ chmod +x exp9.sh
3.$ sh exp9.sh`,
    outputText: ``,
    outputImages: [],
    showEvalTable: true,
    evalMarks: {
      programExecution: '',
      classPerformance: '',
      viva: '',
      total: ''
    },
    result: 'Thus, the Bash shell script using functions to automate basic administrative tasks in Linux has been done successfully.'
  },
  {
    id: 'exp_11',
    expNo: '11',
    date: '',
    title: 'ADMINISTRATIVE PRIVILEDGES USING SUDO',
    aim: 'To create and manage users and groups and assign Linux privileges using sudo commands.',
    algorithm: `1. Create a new user with user privileges enabled.
2. Set the password for the user using passwd.
3. Create a group using groupadd.
4. Add the user to the group using usermod.
5. Add the user to the sudo group to provide administrative privileges.
6. Verify the new group information using id and getent.`,
    codeLabel: 'CODING:',
    code: `1.$nano exp11.sh
   #Scripting
   #!/bin/bash
   echo "User and group management"
   uname = "student"
   echo "User created"
   echo "User added to group"
   group = "developers"
   sudo groupadd "group"
   sudo useradd "group"
   sudo usermod -aG group "username"
   sudo usermod -aG sudo "username"
   id "username"
   getent group "group"

2.$chmod +x exp11.sh
3.$sh exp11.sh`,
    outputText: ``,
    outputImages: [],
    showEvalTable: true,
    evalMarks: {
      programExecution: '',
      classPerformance: '',
      viva: '',
      total: ''
    },
    result: 'Thus to create and manage users and groups and assign Linux privileges using sudo commands done successfully'
  },
  {
    id: 'exp_12',
    expNo: '12',
    date: '',
    title: 'CONFIGURE DISK PARTITION FILE SYSTEM AND STORAGE MANAGEMENT',
    aim: 'To perform disk partition, create a file system, mount the partition and manage storage in Linux.',
    algorithm: `1. Identify the disk using lsblk.
2. Create a partition using fdisk.
3. Create an ext4 file system using mkfs.
4. Create a mount point and mount the partition.
5. Verify storage using df and lsblk.
6. Unmount the partition.`,
    codeLabel: 'COMMANDS:',
    code: `1. To list available disk and partition
   $ lsblk
2. To open the fdisk utility to create/manage partition
   $ sudo fdisk /dev/sdb
3. Create a new partition inside disk
   n
4. Select primary partition type
   p
5. Write the partition changes to disk and exit fdisk
   W
6. To list available disk and partition
   $ lsblk
7. To create an ext4 filesystem
   $ sudo mkfs.ext4 /dev/sdb1
8. To mount the partition
   $ sudo mount /dev/sdb1 /mnt/mydisk
9. Create the mount-point directory
   $ sudo mkdir -p /mnt/mydisk
10. Show disk filesystem space usage in human readable format
   $ df –h
11.Create an empty test.txt file in the mounted partition
   $ sudo touch /mnt/mydisk/test.txt
12.Write text with permission
   $ echo "This is my storage test" | sudo tee /mnt/mydisk/test.txt
13.To display content
   $ cat /mnt/mydisk/test.txt
   $ df -h /mnt/mydisk
15. To unmount
   $ sudo umount /mnt/mydisk`,
    outputText: ``,
    outputImages: [],
    showEvalTable: true,
    evalMarks: {
      programExecution: '',
      classPerformance: '',
      viva: '',
      total: ''
    },
    result: 'Thus to perform disk partition, create a file system, mount the partition and manage storage in Linux done successfully'
  }
];

export const INITIAL_MULTI_EXPERIMENT_DATA = {
  studentName: '',
  registerNo: '',
  fontFamily: 'Times New Roman',
  bodyFontSize: 15,
  codeFontSize: 15,
  titleFontSize: 16.5,
  imageMaxHeight: 220,
  imageMaxWidth: 96,
  imageWidth: 540,
  imageHeight: 340,
  imageOffsetX: 80,
  imageOffsetY: 120,
  watermarkText: '',
  activeExpIndex: 0,
  experiments: [createNewExperiment(1)]
};

export default function App() {
  const [formData, setFormData] = useState(INITIAL_MULTI_EXPERIMENT_DATA);
  const [isExporting, setIsExporting] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(70);
  const [viewLayout, setViewLayout] = useState('double');
  
  // Sub-Tab inside Workspace Panel ("inputs" or "styling")
  const [editorSubTab, setEditorSubTab] = useState('inputs');

  // Window Width & Mobile View Switcher
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 1200
  );
  const [mobileView, setMobileView] = useState('preview');

  React.useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isDesktop = windowWidth >= 768;

  // Adjustable Panel Split Ratio Width Percentage
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

  const handleUpdateImageTransform = (expIdx, transform, pagePairIdx = 0) => {
    setFormData((prev) => {
      const activeIdx = expIdx !== undefined ? expIdx : (prev.activeExpIndex || 0);
      const updatedExps = [...(prev.experiments || [])];
      if (updatedExps[activeIdx]) {
        const existingTransforms = updatedExps[activeIdx].imageTransforms || {};
        updatedExps[activeIdx] = {
          ...updatedExps[activeIdx],
          imageOffsetX: transform.x,
          imageOffsetY: transform.y,
          imageWidth: transform.width,
          imageHeight: transform.height,
          imageTransforms: {
            ...existingTransforms,
            [pagePairIdx]: transform
          }
        };
      }
      return {
        ...prev,
        experiments: updatedExps,
        imageOffsetX: transform.x,
        imageOffsetY: transform.y,
        imageWidth: transform.width,
        imageHeight: transform.height
      };
    });
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

  // FILL SAMPLE EXPERIMENT DATA - Restores Full Target Reference Dataset
  const handleFillSample = () => {
    setFormData({
      studentName: 'ASHWANT S',
      registerNo: '714025247009',
      fontFamily: 'Times New Roman',
      bodyFontSize: 15,
      codeFontSize: 15,
      titleFontSize: 16.5,
      imageMaxHeight: 220,
      imageMaxWidth: 96,
      imageWidth: 540,
      imageHeight: 340,
      imageOffsetX: 80,
      imageOffsetY: 120,
      watermarkText: '',
      activeExpIndex: 0,
      experiments: TARGET_SAMPLE_EXPERIMENTS
    });
  };

  const handleClearAll = () => {
    setFormData(INITIAL_MULTI_EXPERIMENT_DATA);
  };

  const handleZoomIn = () => setZoomLevel((prev) => Math.min(160, prev + 10));
  const handleZoomOut = () => setZoomLevel((prev) => Math.max(30, prev - 10));
  const handleZoomReset = () => setZoomLevel(70);

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

      {/* Main Workspace Split-Screen Container - ALWAYS DISPLAYS PREVIEW & EDITOR SIDE-BY-SIDE */}
      <div
        className="main-content"
        style={{
          display: 'flex',
          flexDirection: 'row',
          flex: 1,
          width: '100%',
          height: 'calc(100vh - 64px)',
          overflow: 'hidden',
          position: 'relative'
        }}
      >
        {/* LEFT PANE: WORKSPACE & INPUT DETAILS EDITOR */}
        <div
          className="left-editor-panel"
          style={{
            width: `${leftPanelWidth}%`,
            minWidth: '340px',
            maxWidth: '55%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            overflowY: 'auto'
          }}
        >
          {/* Sub-Nav Bar inside Left Editor Panel */}
          <div className="w-full px-4 py-2.5 bg-slate-950/80 border-b border-white/[0.08] flex items-center justify-between sticky top-0 z-20 backdrop-blur-xl shrink-0">
            <div className="flex items-center gap-2">
              <div className="flex items-center bg-slate-900/90 p-1 rounded-xl border border-white/[0.08] shadow-inner">
                <button
                  onClick={() => setEditorSubTab('inputs')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all duration-150 flex items-center gap-1.5 ${
                    editorSubTab === 'inputs'
                      ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-indigo-600/30'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Experiment Data</span>
                </button>

                <button
                  onClick={() => setEditorSubTab('styling')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all duration-150 flex items-center gap-1.5 ${
                    editorSubTab === 'styling'
                      ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md shadow-purple-600/30'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Sliders className="w-3.5 h-3.5" />
                  <span>Typography & Print</span>
                </button>
              </div>
            </div>

            <div className="text-[11px] font-mono text-slate-500 hidden sm:block">
              Auto-saved
            </div>
          </div>

          {/* Form Editor or Sidebar */}
          <div className="p-3 sm:p-5 overflow-y-auto flex-1">
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
          className={`panel-resizer ${isResizing ? 'is-resizing' : ''}`}
          title="Click and drag to adjust Workspace & Preview widths"
        >
          <div className="w-0.5 h-8 bg-slate-700 hover:bg-white rounded-full transition-colors" />
        </div>

        {/* RIGHT PANE: LIVE DOCUMENT PREVIEW CANVAS (ALWAYS DISPLAYED SIDE-BY-SIDE) */}
        <div
          className="preview-space-panel"
          style={{
            width: `${100 - leftPanelWidth}%`,
            flex: 1,
            minWidth: '400px',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            overflowX: 'auto',
            overflowY: 'auto'
          }}
        >
          {/* Floating Studio Controls Header */}
          <div className="flex flex-wrap items-center justify-between gap-3 w-full max-w-[440mm] mb-3 bg-slate-950/80 p-2.5 px-4 rounded-2xl border border-white/[0.08] backdrop-blur-xl shrink-0 shadow-2xl shadow-black/50 sticky top-2 z-30">
            <div className="flex items-center gap-2.5">
              <div className="p-1 rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/20">
                <Eye className="w-4 h-4" />
              </div>
              <div>
                <span className="text-xs font-bold text-white tracking-tight">Live A4 Paper Canvas</span>
                <span className="ml-2 text-[10px] font-mono text-slate-400">
                  ({formData.experiments?.length || 1} Exp{(formData.experiments?.length || 1) > 1 ? 's' : ''})
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleAddExperiment}
                className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-emerald-600/90 hover:bg-emerald-500 text-white shadow-md shadow-emerald-950/40 border border-emerald-400/30 transition-all duration-150 flex items-center gap-1.5 active:scale-[0.97]"
                title="Add a new experiment at the end"
              >
                <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
                <span className="hidden sm:inline">Add Experiment</span>
              </button>

              {/* 2-Page Single Row vs Single Page Toggle */}
              <div className="flex items-center bg-slate-900/90 p-1 rounded-xl border border-white/[0.08]">
                <button
                  onClick={() => setViewLayout('double')}
                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all duration-150 flex items-center gap-1 ${
                    viewLayout === 'double'
                      ? 'bg-indigo-600 text-white shadow-sm'
                      : 'text-slate-400 hover:text-white'
                  }`}
                  title="View 2 Pages Side-by-Side (Book Mode)"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">2 Pages</span>
                </button>
                <button
                  onClick={() => setViewLayout('single')}
                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all duration-150 flex items-center gap-1 ${
                    viewLayout === 'single'
                      ? 'bg-indigo-600 text-white shadow-sm'
                      : 'text-slate-400 hover:text-white'
                  }`}
                  title="View 1 Page Stacked Column"
                >
                  <Scroll className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">1 Page</span>
                </button>
              </div>

              {/* Zoom Controls Bar */}
              <div className="flex items-center gap-1 bg-slate-900/90 px-1.5 py-1 rounded-xl border border-white/[0.08]">
                <button
                  onClick={handleZoomOut}
                  disabled={zoomLevel <= 30}
                  className="text-slate-400 hover:text-white disabled:opacity-30 p-1 rounded-lg hover:bg-slate-800 transition-colors"
                  title="Zoom Out (-10%)"
                >
                  <ZoomOut className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={handleZoomReset}
                  className="text-[11px] font-mono font-bold text-indigo-300 px-2 py-0.5 rounded-lg bg-indigo-500/10 border border-indigo-500/20 hover:bg-indigo-500/20 transition-colors"
                  title="Reset Zoom to 70%"
                >
                  {zoomLevel}%
                </button>
                <button
                  onClick={handleZoomIn}
                  disabled={zoomLevel >= 160}
                  className="text-slate-400 hover:text-white disabled:opacity-30 p-1 rounded-lg hover:bg-slate-800 transition-colors"
                  title="Zoom In (+10%)"
                >
                  <ZoomIn className="w-3.5 h-3.5" />
                </button>
              </div>

              <button
                onClick={handleDownloadPdf}
                disabled={isExporting}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 shadow-md shadow-indigo-600/25 border border-indigo-400/30 transition-all duration-150 active:scale-[0.97] disabled:opacity-50"
              >
                {isExporting ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Download className="w-3.5 h-3.5 stroke-[2.5]" />}
                <span>{isExporting ? 'Exporting...' : 'Export PDF'}</span>
              </button>
            </div>
          </div>

          {/* Dynamic Scaled Live Document Preview Canvas Wrapper */}
          <div className="preview-canvas-wrapper">
            <div
              className="preview-scaler transition-transform duration-200 origin-top flex flex-col items-center shrink-0"
              style={{
                transform: `scale(${zoomLevel / 100})`,
                transformOrigin: 'top center'
              }}
            >
              <PdfDocument 
                data={formData} 
                onUpdateData={handleUpdateGlobal} 
                onUpdateImageTransform={handleUpdateImageTransform}
                viewLayout={viewLayout} 
              />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

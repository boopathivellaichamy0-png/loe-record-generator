import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

export async function exportToPdf(elementId, filename = 'student_record.pdf') {
  const container = document.getElementById(elementId);
  if (!container) {
    throw new Error(`Element with id "${elementId}" not found`);
  }

  // Query all .a4-page elements in exact DOM order
  const pages = Array.from(container.querySelectorAll('.a4-page'));
  if (pages.length === 0) {
    throw new Error('No .a4-page elements found to export');
  }

  // Pre-load all images inside the document before capture
  const images = Array.from(container.querySelectorAll('img'));
  await Promise.all(
    images.map((img) => {
      if (img.complete) return Promise.resolve();
      return new Promise((resolve) => {
        img.onload = resolve;
        img.onerror = resolve;
      });
    })
  );

  // Initialize jsPDF A4 Document (210mm x 297mm)
  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
    compress: true
  });

  // Render each page through an isolated clean off-screen wrapper
  for (let i = 0; i < pages.length; i++) {
    const pageEl = pages[i];

    // Create a pristine, un-transformed clone container off-screen
    const wrapper = document.createElement('div');
    wrapper.style.position = 'fixed';
    wrapper.style.left = '-9999px';
    wrapper.style.top = '0';
    wrapper.style.width = '210mm';
    wrapper.style.height = '297mm';
    wrapper.style.overflow = 'hidden';
    wrapper.style.backgroundColor = '#ffffff';
    wrapper.style.zIndex = '-9999';

    const clone = pageEl.cloneNode(true);
    clone.style.margin = '0';
    clone.style.boxShadow = 'none';
    clone.style.transform = 'none';
    clone.style.pageBreakAfter = 'avoid';
    clone.style.breakAfter = 'avoid';

    wrapper.appendChild(clone);
    document.body.appendChild(wrapper);

    // Capture clean canvas without parent layout transformation interference
    const canvas = await html2canvas(wrapper, {
      scale: 2, // 2x Retina resolution for sharp text & crisp charts
      useCORS: true,
      allowTaint: true,
      logging: false,
      backgroundColor: '#ffffff',
      width: wrapper.offsetWidth,
      height: wrapper.offsetHeight
    });

    document.body.removeChild(wrapper);

    const imgData = canvas.toDataURL('image/png');

    // Add PDF page for 2nd, 3rd, 4th page...
    if (i > 0) {
      pdf.addPage('a4', 'portrait');
    }

    // Add PNG image precisely aligned to A4 page bounds (210mm x 297mm)
    pdf.addImage(imgData, 'PNG', 0, 0, 210, 297);
  }

  pdf.save(filename);
  return true;
}

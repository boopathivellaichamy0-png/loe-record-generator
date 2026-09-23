// Generates high-definition PNG Data URLs for sample charts using Canvas 2D API
// Standard PNG Data URIs (data:image/png;base64,...) ensure 100% reliable rendering in html2canvas & jsPDF without blank images.

export function generateSampleBarChart() {
  const canvas = document.createElement('canvas');
  canvas.width = 1200;
  canvas.height = 640;
  const ctx = canvas.getContext('2d');
  if (!ctx) return '';

  // Background
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.scale(2, 2);

  // Axes
  ctx.strokeStyle = '#333333';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(60, 40);
  ctx.lineTo(60, 260);
  ctx.lineTo(560, 260);
  ctx.stroke();

  // Grid & Y-Axis Labels
  ctx.fillStyle = '#475569';
  ctx.font = '10px sans-serif';
  ctx.textAlign = 'right';
  const yTicks = [
    { val: '0', y: 264 },
    { val: '20', y: 210 },
    { val: '40', y: 155 },
    { val: '60', y: 100 },
    { val: '80', y: 45 }
  ];
  yTicks.forEach(tick => {
    ctx.fillText(tick.val, 48, tick.y);
    ctx.strokeStyle = '#f1f5f9';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(60, tick.y - 4);
    ctx.lineTo(560, tick.y - 4);
    ctx.stroke();
  });

  // Bars Data
  const names = ['Arun', 'Aswin', 'Ashwant', 'Abishek', 'Aravind', 'Frank', 'Grace', 'Henry', 'Isabella', 'Jack', 'Karen', 'Leo', 'Mia', 'Noah', 'Olivia', 'Peter', 'Queenie', 'Ryan'];
  const heights = [200, 180, 160, 190, 195, 140, 175, 155, 170, 145, 200, 180, 185, 150, 205, 165, 180, 170];

  ctx.fillStyle = '#2563eb';
  ctx.textAlign = 'center';
  ctx.font = '8px sans-serif';

  names.forEach((name, i) => {
    const x = 75 + i * 26;
    const h = heights[i];
    const y = 260 - h;
    
    // Bar
    ctx.fillStyle = '#2563eb';
    ctx.fillRect(x, y, 20, h);
    ctx.strokeStyle = '#1d4ed8';
    ctx.strokeRect(x, y, 20, h);

    // Label
    ctx.fillStyle = '#334155';
    ctx.fillText(name, x + 10, 274);
  });

  return canvas.toDataURL('image/png');
}

export function generateCostReductionChart() {
  const canvas = document.createElement('canvas');
  canvas.width = 1200;
  canvas.height = 640;
  const ctx = canvas.getContext('2d');
  if (!ctx) return '';

  // Background
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.scale(2, 2);

  // Title
  ctx.fillStyle = '#0f172a';
  ctx.font = 'bold 13px sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('Gradient Descent Cost Reduction', 300, 30);

  // Grid
  ctx.strokeStyle = '#e2e8f0';
  ctx.lineWidth = 1;
  [60, 110, 160, 210, 260].forEach(y => {
    ctx.beginPath();
    ctx.moveTo(80, y);
    ctx.lineTo(540, y);
    ctx.stroke();
  });
  [80, 172, 264, 356, 448, 540].forEach(x => {
    ctx.beginPath();
    ctx.moveTo(x, 60);
    ctx.lineTo(x, 260);
    ctx.stroke();
  });

  // Axes
  ctx.strokeStyle = '#333333';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(80, 60);
  ctx.lineTo(80, 260);
  ctx.lineTo(540, 260);
  ctx.stroke();

  // Axis Labels
  ctx.fillStyle = '#334155';
  ctx.font = '10px sans-serif';
  ctx.fillText('Iterations', 300, 290);
  
  ctx.save();
  ctx.translate(35, 160);
  ctx.rotate(-Math.PI / 2);
  ctx.fillText('Cost J(theta)', 0, 0);
  ctx.restore();

  // Cost Curve
  ctx.strokeStyle = '#8b5cf6';
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  ctx.moveTo(85, 70);
  ctx.quadraticCurveTo(130, 240, 535, 255);
  ctx.stroke();

  return canvas.toDataURL('image/png');
}

export function generateScatterPlotChart() {
  const canvas = document.createElement('canvas');
  canvas.width = 1200;
  canvas.height = 640;
  const ctx = canvas.getContext('2d');
  if (!ctx) return '';

  // Background
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.scale(2, 2);

  // Title
  ctx.fillStyle = '#0f172a';
  ctx.font = 'bold 13px sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('Actual vs Predicted Laptop Price', 300, 30);

  // Grid
  ctx.strokeStyle = '#f1f5f9';
  ctx.lineWidth = 1;
  [60, 110, 160, 210, 260].forEach(y => {
    ctx.beginPath();
    ctx.moveTo(80, y);
    ctx.lineTo(540, y);
    ctx.stroke();
  });

  // Axes
  ctx.strokeStyle = '#333333';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(80, 60);
  ctx.lineTo(80, 260);
  ctx.lineTo(540, 260);
  ctx.stroke();

  // Regression Line
  ctx.strokeStyle = '#ef4444';
  ctx.lineWidth = 2;
  ctx.setLineDash([4, 4]);
  ctx.beginPath();
  ctx.moveTo(90, 240);
  ctx.lineTo(530, 70);
  ctx.stroke();
  ctx.setLineDash([]);

  // Scatter Dots
  const dots = [
    { x: 100, y: 235 }, { x: 130, y: 210 }, { x: 170, y: 185 },
    { x: 210, y: 165 }, { x: 250, y: 148 }, { x: 300, y: 130 },
    { x: 350, y: 115 }, { x: 410, y: 98 }, { x: 480, y: 80 }, { x: 520, y: 72 }
  ];

  ctx.fillStyle = '#2563eb';
  dots.forEach(d => {
    ctx.beginPath();
    ctx.arc(d.x, d.y, 4.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#1d4ed8';
    ctx.stroke();
  });

  return canvas.toDataURL('image/png');
}

import React, { useState, useEffect } from 'react';

// DIRECT INTERACTIVE DRAG-TO-MOVE AND DRAG-TO-RESIZE IMAGE COMPONENT
function DraggableOutputImage({
  imgUrl,
  expIdx,
  pagePairIdx = 0,
  initialX = 80,
  initialY = 120,
  initialWidth = 540,
  initialHeight = 340,
  onUpdateTransform
}) {
  const [transform, setTransform] = useState({
    x: initialX,
    y: initialY,
    width: initialWidth,
    height: initialHeight
  });
  const [isInteracting, setIsInteracting] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    if (!isInteracting) {
      setTransform({
        x: initialX,
        y: initialY,
        width: initialWidth,
        height: initialHeight
      });
    }
  }, [initialX, initialY, initialWidth, initialHeight, isInteracting]);

  const getZoomScale = (target) => {
    const scaler = target.closest('.preview-scaler');
    if (!scaler) return 1;
    const rect = scaler.getBoundingClientRect();
    return rect.width > 0 && scaler.offsetWidth > 0 ? rect.width / scaler.offsetWidth : 1;
  };

  const handleMoveMouseDown = (e) => {
    if (e.button !== 0) return;
    e.preventDefault();
    e.stopPropagation();

    const scale = getZoomScale(e.currentTarget);
    const startX = e.clientX;
    const startY = e.clientY;
    const originX = transform.x;
    const originY = transform.y;
    const originW = transform.width;
    const originH = transform.height;

    setIsInteracting(true);
    setIsFocused(true);
    document.body.style.cursor = 'grabbing';
    document.body.style.userSelect = 'none';

    let currentX = originX;
    let currentY = originY;

    const handleMouseMove = (moveEvent) => {
      const deltaX = (moveEvent.clientX - startX) / scale;
      const deltaY = (moveEvent.clientY - startY) / scale;
      currentX = Math.round(originX + deltaX);
      currentY = Math.round(originY + deltaY);
      setTransform((prev) => ({
        ...prev,
        x: currentX,
        y: currentY
      }));
    };

    const handleMouseUp = () => {
      setIsInteracting(false);
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      if (onUpdateTransform) {
        onUpdateTransform(expIdx, {
          x: currentX,
          y: currentY,
          width: originW,
          height: originH
        }, pagePairIdx);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
  };

  const handleResizeMouseDown = (e, direction) => {
    if (e.button !== 0) return;
    e.preventDefault();
    e.stopPropagation();

    const scale = getZoomScale(e.currentTarget);
    const startX = e.clientX;
    const startY = e.clientY;
    const originX = transform.x;
    const originY = transform.y;
    const originW = transform.width;
    const originH = transform.height;

    setIsInteracting(true);
    setIsFocused(true);
    document.body.style.userSelect = 'none';

    let currentTransform = { ...transform };

    const handleMouseMove = (moveEvent) => {
      const deltaX = (moveEvent.clientX - startX) / scale;
      const deltaY = (moveEvent.clientY - startY) / scale;

      let newX = originX;
      let newY = originY;
      let newW = originW;
      let newH = originH;

      if (direction.includes('e')) {
        newW = Math.max(60, Math.round(originW + deltaX));
      }
      if (direction.includes('s')) {
        newH = Math.max(40, Math.round(originH + deltaY));
      }
      if (direction.includes('w')) {
        const potentialW = Math.max(60, Math.round(originW - deltaX));
        newX = Math.round(originX + (originW - potentialW));
        newW = potentialW;
      }
      if (direction.includes('n')) {
        const potentialH = Math.max(40, Math.round(originH - deltaY));
        newY = Math.round(originY + (originH - potentialH));
        newH = potentialH;
      }

      currentTransform = { x: newX, y: newY, width: newW, height: newH };
      setTransform(currentTransform);
    };

    const handleMouseUp = () => {
      setIsInteracting(false);
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      if (onUpdateTransform) {
        onUpdateTransform(expIdx, currentTransform, pagePairIdx);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
  };

  const handleReset = (e) => {
    e.stopPropagation();
    const defaultPos = { x: 80, y: 120, width: 540, height: 340 };
    setTransform(defaultPos);
    if (onUpdateTransform) {
      onUpdateTransform(expIdx, defaultPos, pagePairIdx);
    }
  };

  const showControls = isHovered || isInteracting || isFocused;

  return (
    <div
      className={`draggable-image-container absolute z-[1] select-none pointer-events-auto transition-[box-shadow,border-color] ${
        showControls
          ? 'border-2 border-blue-500 ring-2 ring-blue-500/80 shadow-2xl no-print-border'
          : 'border-2 border-transparent'
      }`}
      style={{
        left: `${transform.x}px`,
        top: `${transform.y}px`,
        width: `${transform.width}px`,
        height: `${transform.height}px`,
        cursor: isInteracting ? 'grabbing' : 'grab'
      }}
      tabIndex={0}
      onFocus={() => setIsFocused(true)}
      onBlur={() => !isInteracting && setIsFocused(false)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => !isInteracting && setIsHovered(false)}
      onMouseDown={handleMoveMouseDown}
    >
      <img
        src={imgUrl}
        alt="Terminal Screenshot"
        className="w-full h-full object-contain pointer-events-none rounded select-none"
        draggable={false}
      />

      {/* Floating Info Pill on Top (only shown on hover/interaction, stripped in print/pdf) */}
      <div
        className={`absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-900/95 text-white text-[11px] font-semibold px-3 py-1 rounded-full shadow-lg border border-slate-700/80 flex items-center gap-2.5 transition-opacity no-print pointer-events-auto select-none whitespace-nowrap z-30 ${
          showControls ? 'opacity-90 hover:opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        <span className="flex items-center gap-1.5 text-slate-200">
          <span className="text-blue-400 font-bold">✥</span> Drag image to move • Handles to resize
        </span>
        <button
          type="button"
          onClick={handleReset}
          className="text-amber-400 hover:text-amber-300 font-bold hover:underline cursor-pointer ml-1 text-[10px] bg-amber-400/10 px-2 py-0.5 rounded border border-amber-400/20"
          title="Reset image position and size"
        >
          Reset
        </button>
      </div>

      {/* 4 Corner Resize Handles */}
      <div
        onMouseDown={(e) => handleResizeMouseDown(e, 'nw')}
        className={`absolute -top-2 -left-2 w-4 h-4 bg-blue-600 border-2 border-white rounded-full shadow cursor-nwse-resize no-print hover:scale-125 transition-transform z-30 ${
          showControls ? 'opacity-90 hover:opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        title="Resize (NW)"
      />
      <div
        onMouseDown={(e) => handleResizeMouseDown(e, 'ne')}
        className={`absolute -top-2 -right-2 w-4 h-4 bg-blue-600 border-2 border-white rounded-full shadow cursor-nesw-resize no-print hover:scale-125 transition-transform z-30 ${
          showControls ? 'opacity-90 hover:opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        title="Resize (NE)"
      />
      <div
        onMouseDown={(e) => handleResizeMouseDown(e, 'sw')}
        className={`absolute -bottom-2 -left-2 w-4 h-4 bg-blue-600 border-2 border-white rounded-full shadow cursor-nesw-resize no-print hover:scale-125 transition-transform z-30 ${
          showControls ? 'opacity-90 hover:opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        title="Resize (SW)"
      />
      <div
        onMouseDown={(e) => handleResizeMouseDown(e, 'se')}
        className={`absolute -bottom-2 -right-2 w-4 h-4 bg-blue-600 border-2 border-white rounded-full shadow cursor-nwse-resize no-print hover:scale-125 transition-transform z-30 ${
          showControls ? 'opacity-90 hover:opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        title="Resize (SE)"
      />

      {/* 4 Edge Handles */}
      <div
        onMouseDown={(e) => handleResizeMouseDown(e, 'n')}
        className={`absolute -top-1.5 left-1/2 -translate-x-1/2 w-6 h-2.5 bg-blue-600 border border-white rounded shadow cursor-ns-resize no-print hover:bg-blue-500 z-30 ${
          showControls ? 'opacity-90 hover:opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        title="Resize Height (Top)"
      />
      <div
        onMouseDown={(e) => handleResizeMouseDown(e, 's')}
        className={`absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-6 h-2.5 bg-blue-600 border border-white rounded shadow cursor-ns-resize no-print hover:bg-blue-500 z-30 ${
          showControls ? 'opacity-90 hover:opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        title="Resize Height (Bottom)"
      />
      <div
        onMouseDown={(e) => handleResizeMouseDown(e, 'w')}
        className={`absolute top-1/2 -left-1.5 -translate-y-1/2 w-2.5 h-6 bg-blue-600 border border-white rounded shadow cursor-ew-resize no-print hover:bg-blue-500 z-30 ${
          showControls ? 'opacity-90 hover:opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        title="Resize Width (Left)"
      />
      <div
        onMouseDown={(e) => handleResizeMouseDown(e, 'e')}
        className={`absolute top-1/2 -right-1.5 -translate-y-1/2 w-2.5 h-6 bg-blue-600 border border-white rounded shadow cursor-ew-resize no-print hover:bg-blue-500 z-30 ${
          showControls ? 'opacity-90 hover:opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        title="Resize Width (Right)"
      />
    </div>
  );
}

export default function PdfDocument({ 
  data, 
  onUpdateData, 
  onUpdateImageTransform,
  viewLayout = 'double' 
}) {
  const {
    studentName = '',
    registerNo = '',
    fontFamily = 'Times New Roman',
    bodyFontSize = 15,
    codeFontSize = 15,
    titleFontSize = 16.5,
    watermarkText = '',
    experiments = []
  } = data || {};

  const currentFontFamily = fontFamily || 'Times New Roman, serif';

  // Convert to array of experiments (backward compatible)
  const experimentList = (experiments && experiments.length > 0)
    ? experiments
    : [{
        expNo: data?.expNo || '1',
        date: data?.date || '',
        title: data?.title || '',
        aim: data?.aim || '',
        algorithm: data?.algorithm || '',
        code: data?.code || '',
        codeLabel: data?.codeLabel || 'COMMANDS:',
        outputText: data?.outputText || '',
        outputImages: data?.outputImages || [],
        showEvalTable: data?.showEvalTable !== undefined ? data.showEvalTable : true,
        evalMarks: data?.evalMarks || {},
        result: data?.result || ''
      }];

  // EXACT TARGET PDF CODE CAPACITY RULES:
  // Page 1 Code Capacity: 28 lines (accommodates Header, AIM, ALGORITHM, and first 28 lines of code)
  // Continuation Page Code Capacity: 35 lines
  const page1MaxCodeCapacity = 28;
  const continuationMaxCodeLines = 35;
  const maxOutputLinesPerPage = 45;

  return (
    <div className="relative w-full flex justify-center">

      {/* DOCUMENT PREVIEW CONTAINER FOR ALL EXPERIMENTS SEQUENTIALLY */}
      <div
        id="pdf-content"
        className={`pdf-document-container ${viewLayout === 'double' ? 'view-double-grid' : 'view-single-column'}`}
        style={{ fontFamily: currentFontFamily }}
      >
        {experimentList.map((expItem, expIdx) => {
          const {
            expNo = String(expIdx + 1),
            date = '',
            title = '',
            aim = '',
            algorithm = '',
            code = '',
            codeLabel = 'COMMANDS:',
            outputText = '',
            outputImages = [],
            showEvalTable = true,
            evalMarks = {},
            result = ''
          } = expItem || {};

          // Algorithm steps parsing
          const parsedAlgorithm = algorithm
            ? algorithm.split('\n').filter((line) => line.trim().length > 0).map((line, idx) => {
                const match = line.match(/^(\d+[\.\)]?)\s*(.*)/);
                if (match && match[1]) {
                  return { num: match[1].endsWith('.') ? match[1] : `${match[1]}.`, text: match[2] };
                }
                return { num: `${idx + 1}.`, text: line };
              })
            : [];

          const displayResult = result || '';

          // Code chunking: Page 1 gets up to page1MaxCodeCapacity (28 lines).
          // Continuation written pages get continuationMaxCodeLines (35 lines).
          const allCodeLines = code ? code.split('\n') : [];
          const codeChunks = [];

          const page1CodeSlice = allCodeLines.slice(0, page1MaxCodeCapacity);
          codeChunks.push(page1CodeSlice.join('\n'));

          let remIndex = page1CodeSlice.length;
          while (remIndex < allCodeLines.length) {
            const chunkLines = allCodeLines.slice(remIndex, remIndex + continuationMaxCodeLines);
            codeChunks.push(chunkLines.join('\n'));
            remIndex += continuationMaxCodeLines;
          }

          // If code fits on Page 1, codeChunks has 1 item.
          // BUT in the target PDF record, every experiment has at least 2 written pages:
          // Written Page 1: Theory & Commands (Part 1)
          // Written Page 2: Continuation Commands (if any) + EVALUATION TABLE + RESULT.
          // So codeChunks must have at least 2 entries (entry 1 is '' if no continuation code).
          if (codeChunks.length < 2) {
            codeChunks.push('');
          }

          // Output chunking (Max 45 lines per output page):
          // First page gets OUTPUT: heading and lines 1..45
          // Continuation output pages get lines 46..90, etc. with no output heading
          const allOutputLines = outputText ? outputText.split('\n') : [];
          const outputTextChunks = [];
          if (allOutputLines.length > 0) {
            let lineIdx = 0;
            while (lineIdx < allOutputLines.length) {
              outputTextChunks.push(allOutputLines.slice(lineIdx, lineIdx + maxOutputLinesPerPage).join('\n'));
              lineIdx += maxOutputLinesPerPage;
            }
          }

          const currentImagesList = outputImages || [];
          const outputPagesList = [];
          const totalOutputPagesNeeded = Math.max(outputTextChunks.length, currentImagesList.length, 2);

          for (let i = 0; i < totalOutputPagesNeeded; i++) {
            outputPagesList.push({
              text: outputTextChunks[i] !== undefined ? outputTextChunks[i] : '',
              images: currentImagesList[i] !== undefined ? [currentImagesList[i]] : [],
              isFirstOutputPage: i === 0
            });
          }

          // Total Page Pairs: Every experiment has AT LEAST 2 pairs (4 pages = 2 written odd pages, 2 output even pages)
          const totalPagePairs = Math.max(codeChunks.length, outputPagesList.length, 2);

          return (
            <React.Fragment key={expItem.id || expIdx}>
              {Array.from({ length: totalPagePairs }).map((_, pagePairIdx) => {
                const codeChunk = codeChunks[pagePairIdx] !== undefined ? codeChunks[pagePairIdx] : '';
                const isFirstCodePage = pagePairIdx === 0;
                // The final written page is ALWAYS the last pair in the experiment
                const isFinalWrittenPage = pagePairIdx === totalPagePairs - 1;
                
                const outputPageData = outputPagesList[pagePairIdx];
                const currentOutputChunk = outputPageData?.text || '';
                const currentImages = outputPageData?.images || [];

                return (
                  <React.Fragment key={`${expIdx}-${pagePairIdx}`}>
                    
                    {/* ODD PAGES (WRITTEN PAGES: EXP METADATA, AIM, ALGORITHM, COMMANDS, EVAL TABLE, RESULT) */}
                    <div className="a4-page" id={`experiment-page-${expIdx}-${pagePairIdx}`} style={{ fontFamily: currentFontFamily }}>
                      <div className="a4-inner-border relative flex flex-col justify-between h-full overflow-hidden">
                        
                        {/* Watermark (if set) */}
                        {watermarkText && (
                          <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0 opacity-10">
                            <span className="text-5xl font-extrabold uppercase tracking-widest text-black transform -rotate-45">
                              {watermarkText}
                            </span>
                          </div>
                        )}

                        {/* TOP SECTION: EXP HEADER TABLE (ONLY ON PAGE 1 OF EXPERIMENT) */}
                        <div className="relative z-10 doc-top-content flex-1 flex flex-col overflow-hidden">
                          
                          {isFirstCodePage && (
                            <table className="exp-header-table" style={{ fontFamily: currentFontFamily }}>
                              <tbody>
                                <tr>
                                  <td className="exp-header-left-cell">
                                    <div className="exp-header-left-inner">
                                      <div className="exp-header-no">
                                        EXP. No. {expNo || String(expIdx + 1)}
                                      </div>
                                      <div className="exp-header-date">
                                        DATE: {date || ''}
                                      </div>
                                    </div>
                                  </td>
                                  <td className="exp-header-title">
                                    {title || ''}
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          )}

                          {/* WRITTEN BODY CONTENT WITH ACCURATE INDENTATION & SPACING */}
                          <div className="doc-body-wrapper">
                            
                            {/* AIM (PAGE 1 ONLY) */}
                            {isFirstCodePage && aim && (
                              <div className="doc-section">
                                <div className="doc-section-title" style={{ fontSize: `${titleFontSize}px`, fontFamily: currentFontFamily }}>AIM:</div>
                                <div className="doc-text" style={{ fontSize: `${bodyFontSize}px`, fontFamily: currentFontFamily }}>{aim}</div>
                              </div>
                            )}

                            {/* ALGORITHM (PAGE 1 ONLY) */}
                            {isFirstCodePage && parsedAlgorithm.length > 0 && (
                              <div className="doc-section">
                                <div className="doc-section-title" style={{ fontSize: `${titleFontSize}px`, fontFamily: currentFontFamily }}>ALGORITHM:</div>
                                <div className="doc-algorithm-grid" style={{ fontSize: `${bodyFontSize}px`, fontFamily: currentFontFamily }}>
                                  {parsedAlgorithm.map((item, idx) => (
                                    <React.Fragment key={idx}>
                                      <span className="doc-algorithm-num">{item.num}</span>
                                      <span className="doc-algorithm-text">{item.text}</span>
                                    </React.Fragment>
                                  ))}
                                </div>
                              </div>
                            )}

                            {/* COMMANDS / CODING */}
                            {codeChunk && (
                              <div className="doc-section flex-1 flex flex-col" style={{ marginTop: !isFirstCodePage ? '8px' : '4px', paddingBottom: '4px' }}>
                                {isFirstCodePage && (
                                  <div className="doc-section-title" style={{ fontSize: `${titleFontSize}px`, fontFamily: currentFontFamily }}>
                                    {codeLabel || 'COMMANDS:'}
                                  </div>
                                )}
                                <pre className="doc-code-block flex-1" style={{ fontSize: `${codeFontSize}px`, fontFamily: currentFontFamily }}>{codeChunk}</pre>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* BOTTOM SECTION: EVALUATION TABLE & RESULT (ONLY ON THE FINAL WRITTEN PAGE OF THE EXPERIMENT) */}
                        <div className="relative z-10 doc-bottom-content">
                          
                          {isFinalWrittenPage && (
                            <div className="eval-and-result-block">
                              
                              {/* EVALUATION MARKS TABLE - RIGHT ALIGNED */}
                              {(showEvalTable !== false) && (
                                <div className="eval-table-container">
                                  <table className="eval-table" style={{ fontFamily: currentFontFamily }}>
                                    <tbody>
                                      <tr>
                                        <td className="eval-label">PROGRAM AND EXECUTION</td>
                                        <td className="eval-marks">{evalMarks?.programExecution || ''}</td>
                                      </tr>
                                      <tr>
                                        <td className="eval-label">CLASS PERFORMANCE</td>
                                        <td className="eval-marks">{evalMarks?.classPerformance || ''}</td>
                                      </tr>
                                      <tr>
                                        <td className="eval-label">VIVA</td>
                                        <td className="eval-marks">{evalMarks?.viva || ''}</td>
                                      </tr>
                                      <tr>
                                        <td className="eval-label">TOTAL</td>
                                        <td className="eval-marks">{evalMarks?.total || ''}</td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </div>
                              )}

                              {/* RESULT STATEMENT */}
                              {displayResult && (
                                <div className="doc-section doc-result-section">
                                  <div className="doc-section-title" style={{ fontSize: `${titleFontSize}px`, fontFamily: currentFontFamily }}>RESULT:</div>
                                  <div className="doc-text" style={{ fontSize: `${bodyFontSize}px`, fontFamily: currentFontFamily }}>{displayResult}</div>
                                </div>
                              )}

                            </div>
                          )}

                          {/* FOOTER - STUDENT NAME (LEFT) & REGISTER NO (RIGHT) */}
                          <div className="doc-footer" style={{ fontFamily: currentFontFamily }}>
                            <span>{studentName}</span>
                            <span>{registerNo}</span>
                          </div>
                        </div>

                      </div>
                    </div>

                    {/* EVEN PAGES (OUTPUT SCREENSHOTS / CONSOLE / BLANK LEAF) */}
                    <div className="a4-page" style={{ fontFamily: currentFontFamily }}>
                      <div className="a4-inner-border relative flex flex-col justify-between h-full overflow-hidden">
                        
                        {/* Watermark (if set) */}
                        {watermarkText && (
                          <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0 opacity-10">
                            <span className="text-5xl font-extrabold uppercase tracking-widest text-black transform -rotate-45">
                              {watermarkText}
                            </span>
                          </div>
                        )}

                        {/* DRAGGABLE & RESIZABLE OUTPUT IMAGES (BEHIND TEXT, NOT CONSTRAINED BY LINES) */}
                        {currentImages && currentImages.map((imgUrl, imgI) => (
                          <DraggableOutputImage
                            key={`${expIdx}-${pagePairIdx}-${imgI}`}
                            imgUrl={imgUrl}
                            expIdx={expIdx}
                            pagePairIdx={pagePairIdx}
                            initialX={expItem.imageTransforms?.[pagePairIdx]?.x ?? expItem.imageOffsetX ?? 80}
                            initialY={expItem.imageTransforms?.[pagePairIdx]?.y ?? expItem.imageOffsetY ?? 120}
                            initialWidth={expItem.imageTransforms?.[pagePairIdx]?.width ?? expItem.imageWidth ?? 540}
                            initialHeight={expItem.imageTransforms?.[pagePairIdx]?.height ?? expItem.imageHeight ?? 340}
                            onUpdateTransform={onUpdateImageTransform}
                          />
                        ))}

                        {/* TOP SECTION EVEN PAGE: OUTPUT CONSOLE TEXT (RENDERED IN FRONT OF IMAGE) */}
                        <div className="relative z-10 doc-top-content flex-1 flex flex-col overflow-hidden pointer-events-none bg-transparent">
                          <div className="doc-body-wrapper pt-3 flex-1 flex flex-col overflow-hidden bg-transparent">
                            <div className="doc-section flex-1 flex flex-col overflow-hidden bg-transparent">
                              
                              {/* Optional Console Output Text Header */}
                              {currentOutputChunk && (
                                <div className="bg-transparent pointer-events-none">
                                  {outputPageData?.isFirstOutputPage && (
                                    <div className="doc-section-title bg-transparent" style={{ fontSize: `${titleFontSize}px`, fontFamily: currentFontFamily }}>
                                      OUTPUT:
                                    </div>
                                  )}
                                  <pre className="doc-output-text bg-transparent" style={{ fontSize: `${codeFontSize}px`, fontFamily: currentFontFamily }}>
                                    {currentOutputChunk}
                                  </pre>
                                </div>
                              )}

                            </div>
                          </div>
                        </div>

                        {/* BOTTOM SECTION EVEN PAGE: FOOTER */}
                        <div className="relative z-10 doc-bottom-content pointer-events-none bg-transparent">
                          <div className="doc-footer" style={{ fontFamily: currentFontFamily }}>
                            <span>{studentName}</span>
                            <span>{registerNo}</span>
                          </div>
                        </div>

                      </div>
                    </div>

                  </React.Fragment>
                );
              })}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}

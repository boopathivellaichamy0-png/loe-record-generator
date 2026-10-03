import React, { useState } from 'react';

export default function PdfDocument({ data, onUpdateData, viewLayout = 'double' }) {
  const {
    studentName = 'ASHWANT S',
    registerNo = '714025247009',
    fontFamily = 'Times New Roman',
    bodyFontSize = 11.5,
    codeFontSize = 11,
    titleFontSize = 12.5,
    imageMaxHeight = 220,
    imageMaxWidth = 96,
    imageAlignment = 'center',
    imageMarginTop = 0,
    imageOffsetX = 0,
    imageOffsetY = 0,
    watermarkText = '',
    experiments = []
  } = data || {};

  const [showImageAdjuster, setShowImageAdjuster] = useState(false);

  const currentFontFamily = fontFamily || 'Times New Roman, serif';

  const handleFieldChange = (field, value) => {
    if (onUpdateData) {
      onUpdateData(field, value);
    }
  };

  // Convert to array of experiments (backward compatible)
  const experimentList = (experiments && experiments.length > 0)
    ? experiments
    : [{
        expNo: data?.expNo || '6',
        date: data?.date || '',
        title: data?.title || 'BASH SCRIPT USING BASH VARIABLE',
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

  const getAlignItems = (align) => {
    if (align === 'left') return 'flex-start';
    if (align === 'right') return 'flex-end';
    return 'center';
  };

  const activeOffsetY = imageOffsetY !== undefined ? imageOffsetY : (imageMarginTop || 0);
  const activeOffsetX = imageOffsetX || 0;

  // EXACT TARGET PDF CODE CAPACITY RULES:
  // Page 1 Code Capacity: 28 lines (accommodates Header, AIM, ALGORITHM, and first 28 lines of code)
  // Continuation Page Code Capacity: 35 lines
  const page1MaxCodeCapacity = 28;
  const continuationMaxCodeLines = 35;

  return (
    <div className="relative w-full flex justify-center">
      
      {/* EXPANDED 4-DIRECTIONAL IMAGE ADJUSTER PANEL */}
      {showImageAdjuster && (
        <div className="fixed left-4 top-20 z-40 w-80 bg-slate-900/95 border border-slate-800 rounded-2xl p-4 shadow-2xl space-y-4 backdrop-blur-md transition-all animate-fadeIn">
          
          <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
            <div className="flex items-center gap-2 text-slate-100 font-bold text-xs">
              <span>🖼️ Image Move & Scale Controls</span>
            </div>
            <button
              onClick={() => setShowImageAdjuster(false)}
              className="text-slate-400 hover:text-white text-sm font-bold px-2 py-0.5 rounded hover:bg-slate-800"
            >
              ✕
            </button>
          </div>

          <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-3">
            <div className="text-[11px] font-semibold text-slate-200">Extended 4-Way Movement</div>
            
            <div className="space-y-1">
              <div className="flex justify-between text-[10px] text-slate-400 font-medium">
                <span>Up / Down Offset</span>
                <span className="font-mono text-blue-400 font-bold">{activeOffsetY}px</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleFieldChange('imageOffsetY', Math.max(-150, activeOffsetY - 10))}
                  className="px-2 py-1 bg-slate-800 text-slate-300 hover:text-white rounded border border-slate-700 text-xs font-bold shrink-0"
                >
                  ⬆️ Up
                </button>
                <input
                  type="range"
                  min="-150"
                  max="250"
                  step="5"
                  value={activeOffsetY}
                  onChange={(e) => handleFieldChange('imageOffsetY', parseInt(e.target.value, 10))}
                  className="w-full accent-blue-500 cursor-pointer"
                />
                <button
                  onClick={() => handleFieldChange('imageOffsetY', Math.min(250, activeOffsetY + 10))}
                  className="px-2 py-1 bg-slate-800 text-slate-300 hover:text-white rounded border border-slate-700 text-xs font-bold shrink-0"
                >
                  ⬇️ Down
                </button>
              </div>
            </div>

            <div className="space-y-1 pt-2 border-t border-slate-800/60">
              <div className="flex justify-between text-[10px] text-slate-400 font-medium">
                <span>Left / Right Offset</span>
                <span className="font-mono text-purple-400 font-bold">{activeOffsetX}px</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleFieldChange('imageOffsetX', Math.max(-250, activeOffsetX - 15))}
                  className="px-2 py-1 bg-slate-800 text-slate-300 hover:text-white rounded border border-slate-700 text-xs font-bold shrink-0"
                >
                  ⬅️ Left
                </button>
                <input
                  type="range"
                  min="-250"
                  max="250"
                  step="5"
                  value={activeOffsetX}
                  onChange={(e) => handleFieldChange('imageOffsetX', parseInt(e.target.value, 10))}
                  className="w-full accent-purple-500 cursor-pointer"
                />
                <button
                  onClick={() => handleFieldChange('imageOffsetX', Math.min(250, activeOffsetX + 15))}
                  className="px-2 py-1 bg-slate-800 text-slate-300 hover:text-white rounded border border-slate-700 text-xs font-bold shrink-0"
                >
                  ➡️ Right
                </button>
              </div>
            </div>
          </div>

          <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-1.5">
            <div className="flex items-center justify-between text-[11px]">
              <span className="font-semibold text-slate-200">Image Height (mm)</span>
              <span className="font-mono text-emerald-400 font-bold bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20">
                {imageMaxHeight}mm
              </span>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="range"
                min="50"
                max="260"
                step="5"
                value={imageMaxHeight}
                onChange={(e) => handleFieldChange('imageMaxHeight', parseInt(e.target.value, 10))}
                className="w-full accent-emerald-500 cursor-pointer"
              />
            </div>
          </div>

          <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-1.5">
            <div className="flex items-center justify-between text-[11px]">
              <span className="font-semibold text-slate-200">Image Width (%)</span>
              <span className="font-mono text-cyan-400 font-bold bg-cyan-500/10 px-1.5 py-0.5 rounded border border-cyan-500/20">
                {imageMaxWidth}%
              </span>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="range"
                min="30"
                max="100"
                step="2"
                value={imageMaxWidth}
                onChange={(e) => handleFieldChange('imageMaxWidth', parseInt(e.target.value, 10))}
                className="w-full accent-cyan-500 cursor-pointer"
              />
            </div>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => {
                handleFieldChange('imageOffsetX', 0);
                handleFieldChange('imageOffsetY', 0);
                handleFieldChange('imageMaxHeight', 220);
                handleFieldChange('imageMaxWidth', 96);
              }}
              className="flex-1 py-2 rounded-xl text-xs font-semibold bg-slate-800 text-slate-300 hover:bg-slate-700 transition-colors"
            >
              Reset Position
            </button>
            <button
              onClick={() => setShowImageAdjuster(false)}
              className="flex-1 py-2 rounded-xl text-xs font-bold bg-blue-600 text-white hover:bg-blue-500 shadow-md shadow-blue-600/30 transition-all"
            >
              Close & Save
            </button>
          </div>
        </div>
      )}

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

          const displayResult = result || (title ? `Thus, using Linux commands, ${title.toLowerCase()} has been done successfully.` : '');

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

          // Output Screenshots chunking:
          // Output Page 1 (Even) gets screenshot 1 / console output text.
          // Output Page 2 (Even) gets screenshot 2 (if any) or blank leaf.
          const currentImagesList = outputImages || [];
          const outputPagesList = [];

          if (currentImagesList.length === 0) {
            // Screenshot 1 is console output text or empty
            outputPagesList.push({ text: outputText || '', images: [] });
            // Output page 2 is clean blank leaf
            outputPagesList.push({ text: '', images: [] });
          } else {
            // Distribute images across output pages (1 per output page or stacked if multiple)
            outputPagesList.push({ text: outputText || '', images: [currentImagesList[0]] });
            if (currentImagesList.length > 1) {
              outputPagesList.push({ text: '', images: currentImagesList.slice(1) });
            } else {
              outputPagesList.push({ text: '', images: [] });
            }
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
                                    {title || `EXPERIMENT TITLE ${expIdx + 1}`}
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
                        
                        {/* Watermark */}
                        {watermarkText && (
                          <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0 opacity-10">
                            <span className="text-5xl font-extrabold uppercase tracking-widest text-black transform -rotate-45">
                              {watermarkText}
                            </span>
                          </div>
                        )}

                        {/* TOP SECTION EVEN PAGE: OUTPUT SCREENSHOT OR CONSOLE TEXT */}
                        <div className="relative z-10 doc-top-content flex-1 flex flex-col overflow-hidden">
                          <div className="doc-body-wrapper pt-3 flex-1 flex flex-col overflow-hidden">
                            <div className="doc-section flex-1 flex flex-col overflow-hidden">
                              
                              {/* Optional Console Output Text Header */}
                              {currentOutputChunk && (
                                <>
                                  <div className="doc-section-title" style={{ fontSize: `${titleFontSize}px`, fontFamily: currentFontFamily }}>OUTPUT:</div>
                                  <pre className="doc-output-text" style={{ fontSize: `${codeFontSize}px`, fontFamily: currentFontFamily }}>{currentOutputChunk}</pre>
                                </>
                              )}

                              {/* Terminal Screenshot Image (Centered Vertically and Horizontally) */}
                              {currentImages && currentImages.length > 0 && (
                                <div
                                  className="doc-output-image-container flex-1"
                                  style={{
                                    alignItems: getAlignItems(imageAlignment),
                                    marginTop: `${activeOffsetY}px`,
                                    transform: `translateX(${activeOffsetX}px)`
                                  }}
                                >
                                  {currentImages.map((imgUrl, i) => (
                                    <div
                                      key={i}
                                      onClick={() => setShowImageAdjuster(true)}
                                      className="relative group cursor-pointer"
                                      title="Click image to open positioning controls"
                                    >
                                      <img
                                        src={imgUrl}
                                        alt={`Terminal Screenshot ${i + 1}`}
                                        className="doc-output-image transition-all hover:ring-2 hover:ring-blue-500 hover:shadow-lg"
                                        style={{
                                          maxHeight: `${imageMaxHeight || 220}mm`,
                                          maxWidth: `${imageMaxWidth || 96}%`,
                                          marginBottom: i < currentImages.length - 1 ? '12px' : '0'
                                        }}
                                      />
                                      <div className="absolute top-2 right-2 bg-blue-600/90 text-white text-[10px] font-bold px-2 py-1 rounded shadow opacity-0 group-hover:opacity-100 transition-opacity no-print">
                                        ⚙️ Move Up/Down/Left/Right
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* BOTTOM SECTION EVEN PAGE: FOOTER */}
                        <div className="relative z-10 doc-bottom-content">
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

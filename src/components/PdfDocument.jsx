import React, { useState } from 'react';

export default function PdfDocument({ data, onUpdateData, viewLayout = 'double' }) {
  const {
    studentName = '',
    registerNo = '',
    fontFamily = 'Times New Roman',
    bodyFontSize = 13,
    codeFontSize = 12.5,
    titleFontSize = 14.5,
    imageMaxHeight = 180,
    imageMaxWidth = 95,
    imageAlignment = 'center',
    imageMarginTop = 4,
    imageOffsetX = 0,
    imageOffsetY = 4,
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
        expNo: data?.expNo || '1',
        date: data?.date || '07.07.2026',
        title: data?.title || 'INSTALLATION OF KALI LINUX USING ORACLE VM VIRTUALBOX',
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

  const activeOffsetY = imageOffsetY !== undefined ? imageOffsetY : (imageMarginTop || 4);
  const activeOffsetX = imageOffsetX || 0;

  // EXACT CODE SPACE LINE CAPACITY RULES MATCHING TARGET SAMPLE PDF:
  // Page 1 Code Capacity: 24 lines (with 1.55 line-height)
  // Continued Page Code Capacity: 30 lines
  const page1MaxCodeCapacity = 24;
  const continuationMaxCodeLines = 30;

  return (
    <div className="relative w-full flex justify-center">
      
      {/* EXPANDED 4-DIRECTIONAL IMAGE ADJUSTER PANEL (ANCHORED IN LEFT BLACK EMPTY SPACE) */}
      {showImageAdjuster && (
        <div className="fixed left-4 top-20 z-40 w-80 bg-slate-900/95 border border-slate-800 rounded-2xl p-4 shadow-2xl space-y-4 backdrop-blur-md transition-all animate-fadeIn">
          
          <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
            <div className="flex items-center gap-2 text-slate-100 font-bold text-xs">
              <span>🖼️ High-Range Image Move & Scale</span>
            </div>
            <button
              onClick={() => setShowImageAdjuster(false)}
              className="text-slate-400 hover:text-white text-sm font-bold px-2 py-0.5 rounded hover:bg-slate-800"
            >
              ✕
            </button>
          </div>

          {/* 4-Directional Move Pad with Extended Range */}
          <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-3">
            <div className="text-[11px] font-semibold text-slate-200">Extended 4-Way Movement</div>
            
            {/* Move Up / Down */}
            <div className="space-y-1">
              <div className="flex justify-between text-[10px] text-slate-400 font-medium">
                <span>Up / Down Offset</span>
                <span className="font-mono text-blue-400 font-bold">{activeOffsetY}px</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleFieldChange('imageOffsetY', Math.max(-150, activeOffsetY - 10))}
                  className="px-2 py-1 bg-slate-800 text-slate-300 hover:text-white rounded border border-slate-700 text-xs font-bold shrink-0"
                  title="Move Up"
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
                  title="Move Down"
                >
                  ⬇️ Down
                </button>
              </div>
            </div>

            {/* Move Left / Right */}
            <div className="space-y-1 pt-2 border-t border-slate-800/60">
              <div className="flex justify-between text-[10px] text-slate-400 font-medium">
                <span>Left / Right Offset</span>
                <span className="font-mono text-purple-400 font-bold">{activeOffsetX}px</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleFieldChange('imageOffsetX', Math.max(-250, activeOffsetX - 15))}
                  className="px-2 py-1 bg-slate-800 text-slate-300 hover:text-white rounded border border-slate-700 text-xs font-bold shrink-0"
                  title="Move Left"
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
                  title="Move Right"
                >
                  ➡️ Right
                </button>
              </div>
            </div>
          </div>

          {/* Image Height Slider */}
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
                min="20"
                max="200"
                step="5"
                value={imageMaxHeight}
                onChange={(e) => handleFieldChange('imageMaxHeight', parseInt(e.target.value, 10))}
                className="w-full accent-emerald-500 cursor-pointer"
              />
            </div>
          </div>

          {/* Image Width Slider */}
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
                min="20"
                max="100"
                step="5"
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
                handleFieldChange('imageOffsetY', 4);
                handleFieldChange('imageMaxHeight', 180);
                handleFieldChange('imageMaxWidth', 95);
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
            date = '07.07.2026',
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

          // Algorithm steps
          const parsedAlgorithm = algorithm
            ? algorithm.split('\n').filter((line) => line.trim().length > 0).map((line, idx) => {
                const match = line.match(/^(\d+[\.\)]?)\s*(.*)/);
                if (match && match[1]) {
                  return { num: match[1].endsWith('.') ? match[1] : `${match[1]}.`, text: match[2] };
                }
                return { num: `${idx + 1}.`, text: line };
              })
            : [];

          const displayResult = result || (title ? `Thus, ${title.toLowerCase()} has been completed successfully.` : '');

          // Code chunking
          const allCodeLines = code ? code.split('\n') : [];
          const codeChunks = [];

          if (allCodeLines.length === 0) {
            codeChunks.push('');
          } else {
            const page1CodeSlice = allCodeLines.slice(0, page1MaxCodeCapacity);
            codeChunks.push(page1CodeSlice.join('\n'));

            let remIndex = page1CodeSlice.length;
            while (remIndex < allCodeLines.length) {
              const chunkLines = allCodeLines.slice(remIndex, remIndex + continuationMaxCodeLines);
              codeChunks.push(chunkLines.join('\n'));
              remIndex += continuationMaxCodeLines;
            }
          }

          // Output chunking
          const allOutputLines = outputText ? outputText.split('\n') : [];
          const hasImages = Boolean(outputImages && outputImages.length > 0);
          const outputPagesList = [];

          const maxLinesFirstOutputPage = 50;
          const maxLinesContinuationOutputPage = 50;

          if (allOutputLines.length === 0 && !hasImages) {
            outputPagesList.push({ text: '', images: [] });
          } else {
            let remIndex = 0;
            while (remIndex < allOutputLines.length || (remIndex === 0 && hasImages)) {
              const isFirst = outputPagesList.length === 0;
              const limit = isFirst ? maxLinesFirstOutputPage : maxLinesContinuationOutputPage;
              const textSlice = allOutputLines.slice(remIndex, remIndex + limit).join('\n');
              remIndex += limit;

              const isLast = remIndex >= allOutputLines.length;
              outputPagesList.push({
                text: textSlice,
                images: isLast && hasImages ? outputImages : []
              });
            }
          }

          const totalPagePairs = Math.max(codeChunks.length, outputPagesList.length);

          return (
            <React.Fragment key={expItem.id || expIdx}>
              {Array.from({ length: totalPagePairs }).map((_, pagePairIdx) => {
                const codeChunk = codeChunks[pagePairIdx] || '';
                const isFirstCodePage = pagePairIdx === 0;
                const isFinalCodePage = pagePairIdx === codeChunks.length - 1;
                
                const outputPageData = outputPagesList[pagePairIdx];
                const currentOutputChunk = outputPageData?.text || '';
                const currentImages = outputPageData?.images || [];

                return (
                  <React.Fragment key={`${expIdx}-${pagePairIdx}`}>
                    
                    {/* ODD PAGES (CODE & EXPERIMENT METADATA) */}
                    <div className="a4-page" id={`experiment-page-${expIdx}`} style={{ fontFamily: currentFontFamily }}>
                      <div className="a4-inner-border relative flex flex-col justify-between h-full overflow-hidden">
                        
                        {/* Watermark */}
                        {watermarkText && (
                          <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0 opacity-10">
                            <span className="text-5xl font-extrabold uppercase tracking-widest text-black transform -rotate-45">
                              {watermarkText}
                            </span>
                          </div>
                        )}

                        {/* EVALUATION MARKS TABLE - ANCHORED AT BOTTOM RIGHT OF FINAL PAGE */}
                        {isFinalCodePage && (showEvalTable !== false) && (
                          <div className="eval-table-wrapper-absolute">
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

                        {/* TOP SECTION: EXP HEADER TABLE */}
                        <div className="relative z-10 doc-top-content flex-1 flex flex-col overflow-hidden">
                          
                          {/* EXP Header Box Table ONLY on Page 1 of each experiment */}
                          {isFirstCodePage && (
                            <table className="exp-header-table" style={{ fontFamily: currentFontFamily }}>
                              <tbody>
                                <tr>
                                  <td className="exp-header-left-cell">
                                    <div className="exp-header-left-inner">
                                      <div className="exp-header-no">
                                        EX.NO : {expNo || String(expIdx + 1)}
                                      </div>
                                      <div className="exp-header-date">
                                        DATE: {date || '07.07.2026'}
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

                          {/* DOCUMENT BODY CONTENT WITH PADDING */}
                          <div className="doc-body-wrapper">
                            {/* AIM */}
                            {isFirstCodePage && aim && (
                              <div className="doc-section">
                                <div className="doc-section-title" style={{ fontSize: `${titleFontSize}px`, fontFamily: currentFontFamily }}>AIM:</div>
                                <div className="doc-text" style={{ fontSize: `${bodyFontSize}px`, fontFamily: currentFontFamily }}>{aim}</div>
                              </div>
                            )}

                            {/* ALGORITHM */}
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

                            {/* CODING / COMMANDS */}
                            {(codeChunk || (pagePairIdx < codeChunks.length)) && (
                              <div className="doc-section flex-1 flex flex-col" style={{ marginTop: !isFirstCodePage ? '0' : '4px', paddingBottom: '4px' }}>
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

                        {/* BOTTOM SECTION: RESULT STATEMENT */}
                        <div className="relative z-10 doc-bottom-content">
                          
                          {/* RESULT STATEMENT */}
                          {isFinalCodePage && displayResult && (
                            <div className="doc-section doc-result-section">
                              <div className="doc-section-title" style={{ fontSize: `${titleFontSize}px`, fontFamily: currentFontFamily }}>RESULT:</div>
                              <div className="doc-text" style={{ fontSize: `${bodyFontSize}px`, fontFamily: currentFontFamily }}>{displayResult}</div>
                            </div>
                          )}

                          {/* FOOTER */}
                          <div className="doc-footer" style={{ fontFamily: currentFontFamily }}>
                            <span>{studentName}</span>
                            <span>{registerNo}</span>
                          </div>
                        </div>

                      </div>
                    </div>

                    {/* EVEN PAGES (OUTPUT / SCREENSHOT WORKSPACE) */}
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

                        {/* TOP SECTION EVEN PAGE: OUTPUT ONLY */}
                        <div className="relative z-10 doc-top-content flex-1 flex flex-col overflow-hidden">
                          <div className="doc-body-wrapper pt-3 flex-1 flex flex-col overflow-hidden">
                            <div className="doc-section flex-1 flex flex-col overflow-hidden">
                              {(currentOutputChunk || (currentImages && currentImages.length > 0)) && (
                                <div className="doc-section-title" style={{ fontSize: `${titleFontSize}px`, fontFamily: currentFontFamily }}>OUTPUT:</div>
                              )}

                              {/* Console Text Output */}
                              {currentOutputChunk && (
                                <pre className="doc-output-text" style={{ fontSize: `${codeFontSize}px`, fontFamily: currentFontFamily }}>{currentOutputChunk}</pre>
                              )}

                              {/* Output Plot / Screenshot Image */}
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
                                      title="Click image to open extended 4-directional controls in left panel"
                                    >
                                      <img
                                        src={imgUrl}
                                        alt={`Output Plot / Screenshot ${i + 1}`}
                                        className="doc-output-image transition-all hover:ring-2 hover:ring-blue-500 hover:shadow-lg"
                                        style={{
                                          maxHeight: `${imageMaxHeight || 180}mm`,
                                          maxWidth: `${imageMaxWidth || 95}%`,
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

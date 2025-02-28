"use client";

import React, { useState, useRef, useLayoutEffect } from "react";

export type EditableCellProps = {
  value: string;
  rowIndex: number;
  colIndex: number;
  className: string;
  edited: boolean;
  onCellUpdate: (rowIndex: number, colIndex: number, newValue: string) => void;
};

function EditableCell({
  value,
  rowIndex,
  colIndex,
  className,
  edited,
  onCellUpdate,
}: EditableCellProps) {
  const isEditable = colIndex !== 0;
  const [localValue, setLocalValue] = useState(value);
  const [isComposing, setIsComposing] = useState(false);
  const cellRef = useRef<HTMLTableCellElement>(null);
  const selectionRef = useRef<{ start: number; end: number } | null>(null);

  const saveSelection = () => {
    const selection = window.getSelection();
    if (selection && selection.rangeCount > 0 && cellRef.current) {
      const range = selection.getRangeAt(0);
      const preCaretRange = range.cloneRange();
      preCaretRange.selectNodeContents(cellRef.current);
      preCaretRange.setEnd(range.endContainer, range.endOffset);
      const start = preCaretRange.toString().length;
      selectionRef.current = { start, end: start };
    }
  };

  const restoreSelection = () => {
    const sel = window.getSelection();
    if (sel && cellRef.current && selectionRef.current) {
      let charIndex = 0;
      const range = document.createRange();
      range.setStart(cellRef.current, 0);
      range.collapse(true);
      const nodeStack: Node[] = [cellRef.current];
      let found = false;
      while (nodeStack.length > 0 && !found) {
        const node = nodeStack.shift();
        if (!node) continue;
        if (node.nodeType === Node.TEXT_NODE) {
          const text = node.textContent || "";
          const nextCharIndex = charIndex + text.length;
          if (
            selectionRef.current.start >= charIndex &&
            selectionRef.current.start <= nextCharIndex
          ) {
            range.setStart(node, selectionRef.current.start - charIndex);
            range.collapse(true);
            found = true;
            break;
          }
          charIndex = nextCharIndex;
        } else {
          for (let i = 0; i < node.childNodes.length; i++) {
            nodeStack.push(node.childNodes[i]);
          }
        }
      }
      if (found) {
        sel.removeAllRanges();
        sel.addRange(range);
      }
    }
  };

  const handleCompositionStart = () => {
    if (!isEditable) return;
    setIsComposing(true);
  };

  const handleCompositionEnd = (e: React.CompositionEvent<HTMLTableCellElement>) => {
    if (!isEditable) return;
    setIsComposing(false);
    saveSelection();
    setLocalValue(e.currentTarget.textContent || "");
  };

  const handleInput = (e: React.FormEvent<HTMLTableCellElement>) => {
    if (!isEditable) return;
    if (!isComposing) {
      saveSelection();
      setLocalValue(e.currentTarget.textContent || "");
    }
  };

  const handleBlur = () => {
    if (!isEditable) return;
    if (localValue !== value) {
      onCellUpdate(rowIndex, colIndex, localValue);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTableCellElement>) => {
    if (!isEditable) return;
    if (e.key === "Enter") {
      e.preventDefault();
      cellRef.current?.blur();
    }
  };

  useLayoutEffect(() => {
    if (isEditable && cellRef.current && document.activeElement === cellRef.current) {
      restoreSelection();
    }
  }, [localValue, isEditable]);

  useLayoutEffect(() => {
    setLocalValue(value);
  }, [value]);

  return (
    <td
      ref={cellRef}
      contentEditable={isEditable}
      suppressContentEditableWarning={isEditable}
      onInput={isEditable ? handleInput : undefined}
      onCompositionStart={isEditable ? handleCompositionStart : undefined}
      onCompositionEnd={isEditable ? handleCompositionEnd : undefined}
      onBlur={isEditable ? handleBlur : undefined}
      onKeyDown={isEditable ? handleKeyDown : undefined}
      className={`${className} ${edited ? "bg-[#FFFFFF]" : ""}`}
    >
      {localValue}
    </td>
  );
}

export type GraphProps = {
  tableData: string[][];
  editedCells: Set<string>;
  onCellUpdate: (rowIndex: number, colIndex: number, newValue: string) => void;
};

export function Graph({ tableData, editedCells, onCellUpdate }: GraphProps) {
  const cellClass = "py-1 px-1 border border-gray-300 text-center";
  const [title, setTitle] = useState("시간표 제목");
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      handleImageFile(file);
    }
  };

  const handleImageFile = (file: File) => {
    const url = URL.createObjectURL(file);
    setImageUrl(url);
  };

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="w-full mt-8 flex gap-6">
      <div className="w-[65%] overflow-x-auto">
        <div className="text-gray300 text-center text-[15px] mb-3">
          ※ <span className="text-[#2B8F70]">셀을 클릭</span>하여 과목명을 수정한 후{" "}
          <span className="text-[#2B8F70]">Enter</span>를 누르면 변경사항이 저장됩니다.
        </div>
        <table className="w-full border-collapse">
          <thead className="bg-gray-200">
            <tr>
              <th className={`${cellClass} w-1/8`}>교시</th>
              <th className={`${cellClass} w-1/6`}>월</th>
              <th className={`${cellClass} w-1/6`}>화</th>
              <th className={`${cellClass} w-1/6`}>수</th>
              <th className={`${cellClass} w-1/6`}>목</th>
              <th className={`${cellClass} w-1/6`}>금</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {row.map((cellValue, colIndex) => (
                  <EditableCell
                    key={colIndex}
                    value={cellValue}
                    rowIndex={rowIndex}
                    colIndex={colIndex}
                    edited={editedCells.has(`${rowIndex}-${colIndex}`)}
                    className={`${cellClass} ${colIndex === 0 ? "h-16 w-1/12" : ""}`}
                    onCellUpdate={onCellUpdate}
                  />
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="w-[35%] p-4">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="text-2xl font-bold mb-4 w-full border-b-2 border-transparent hover:border-gray-300 focus:border-[#2B8F70] focus:outline-none px-2 py-1 mt-4"
        />
        <div
          className="w-80 h-106 bg-gray-100 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:bg-gray-200 transition-colors"
          onClick={handleImageClick}
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
        >
        {imageUrl ? (
        <img
            src={imageUrl}
            alt="Uploaded"
            className="w-full h-full object-cover rounded-lg"
        />
        ) : (
        <>
            <svg
            className="w-8 h-8 mb-2 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
            </svg>
            <p className="text-gray-500">클릭하거나 이미지를 드래그하세요</p>
        </>
        )}

        </div>
        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) handleImageFile(file);
          }}
        />
      </div>
    </div>
  );
}

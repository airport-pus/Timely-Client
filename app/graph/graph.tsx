"use client";

import React, { useState, useEffect, useRef, useLayoutEffect, useCallback } from "react";
import Upload from "../upload/upload";
import { useAtomValue } from "jotai";
import { backgroundColorAtom } from "../atoms";
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

  const saveSelection = useCallback(() => {
    const selection = window.getSelection();
    if (selection && selection.rangeCount > 0 && cellRef.current) {
      const range = selection.getRangeAt(0);
      const preCaretRange = range.cloneRange();
      preCaretRange.selectNodeContents(cellRef.current);
      preCaretRange.setEnd(range.endContainer, range.endOffset);
      const start = preCaretRange.toString().length;
      selectionRef.current = { start, end: start };
    }
  }, []);

  const restoreSelection = useCallback(() => {
    const sel = window.getSelection();
    if (sel && cellRef.current && selectionRef.current) {
      let charIndex = 0;
      const range = document.createRange();
      const treeWalker = document.createTreeWalker(
        cellRef.current,
        NodeFilter.SHOW_TEXT,
        null
      );
      let currentNode: Node | null = treeWalker.nextNode();
      while (currentNode) {
        const textLength = currentNode.textContent?.length || 0;
        if (charIndex + textLength >= selectionRef.current.start) {
          range.setStart(currentNode, selectionRef.current.start - charIndex);
          range.collapse(true);
          break;
        }
        charIndex += textLength;
        currentNode = treeWalker.nextNode();
      }
      sel.removeAllRanges();
      sel.addRange(range);
    }
  }, []);

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
  }, [localValue, isEditable, restoreSelection]);

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
  const backgroundColor = useAtomValue(backgroundColorAtom);

  return (
    <>
      <div className="text-gray300 text-center text-[15px] mt-6 mb-[-8]">
        ※ <span className="text-[#2B8F70]">셀을 클릭</span>하여 과목명을 수정한 후{" "}
        <span className="text-[#2B8F70]">Enter</span>를 누르면 변경사항이 저장됩니다.
      </div>
      <div className="w-full mt-8 flex border-2 border-dashed border-gray-300" style={{backgroundColor:`${backgroundColor}`}}>
        <div className="w-[65%] overflow-x-auto p-4">
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
        <Upload />
      </div>
    </>
  );
}

"use client";

import { useState, useRef, useLayoutEffect } from 'react';
import Header from './header/header';
import Search from './search/search';

type EditableCellProps = {
  value: string;
  rowIndex: number;
  colIndex: number;
  className: string;
  edited: boolean;
  onCellUpdate: (rowIndex: number, colIndex: number, newValue: string) => void;
};

function EditableCell({ value, rowIndex, colIndex, className, edited, onCellUpdate }: EditableCellProps) {
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
          if (selectionRef.current.start >= charIndex && selectionRef.current.start <= nextCharIndex) {
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
    setLocalValue(e.currentTarget.textContent || '');
  };

  const handleInput = (e: React.FormEvent<HTMLTableCellElement>) => {
    if (!isEditable) return;
    if (!isComposing) {
      saveSelection();
      setLocalValue(e.currentTarget.textContent || '');
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
      className={`${className} ${edited ? "bg-[#BCCFF1]" : ""}`}
    >
      {localValue}
    </td>
  );
}

export default function Home() {
  const cellClass = "py-2 px-4 border border-gray-300 text-center";

  const initialData = [
    ["1", "수학", "과학", "영어", "체육", "미술"],
    ["2", "체육", "수학", "과학", "영어", "미술"],
    ["3", "음악", "사회", "역사", "정보", "기술"],
    ["4", "수학", "과학", "영어", "체육", "미술"],
    ["5", "음악", "사회", "역사", "정보", "기술"],
    ["6", "체육", "수학", "과학", "영어", "미술"],
    ["7", "음악", "사회", "역사", "데이터베이스", "컴퓨터구조"],
  ];

  const [tableData, setTableData] = useState(initialData);
  const [editedCells, setEditedCells] = useState<Set<string>>(new Set());

  const handleCellUpdate = (rowIndex: number, colIndex: number, newValue: string) => {
    const oldValue = tableData[rowIndex][colIndex];
    if (oldValue === newValue) return;

    let hasDuplicate = false;
    for (let i = 0; i < tableData.length; i++) {
      for (let j = 0; j < tableData[i].length; j++) {
        if (i === rowIndex && j === colIndex) continue;
        if (tableData[i][j] === oldValue) {
          hasDuplicate = true;
          break;
        }
      }
      if (hasDuplicate) break;
    }

    let updateAll = false;
    if (hasDuplicate) {
      updateAll = window.confirm(
        `"${oldValue}"이(가) 포함된 다른 셀도 모두 "${newValue}"(으)로 변경하시겠습니까?`
      );
    }
    setTableData(prevData =>
      prevData.map((row, i) =>
        row.map((cell, j) => {
          if (i === rowIndex && j === colIndex) {
            return newValue;
          }
          if (updateAll && cell === oldValue) {
            setEditedCells(prev => {
              const newSet = new Set(prev);
              newSet.add(`${i}-${j}`);
              return newSet;
            });
            return newValue;
          }
          return cell;
        })
      )
    );

    setEditedCells(prev => {
      const newSet = new Set(prev);
      newSet.add(`${rowIndex}-${colIndex}`);
      return newSet;
    });
  };

  return (
    <>
      <style jsx global>{`
        ::selection {
          background-color: #2B8F70;
          color: #fff;
        }
        ::-moz-selection {
          background-color: #2B8F70;
          color: #fff;
        }
      `}</style>

      <div
        style={{
          backgroundColor: '#F3f4f6',
          minHeight: '100vh',
          fontFamily: 'Pretendard, sans-serif',
        }}
      >
        <div className="grid grid-cols-1 gap-0 mx-[580px] items-center justify-items-center p-8 pb-20 text-black">
          <Header />
          <Search />

          <div className="w-full mt-8 overflow-x-auto">
            <div className="text-gray300 text-center text-[15px] mb-3">
              ※ <span className="text-[#2B8F70]">셀을 클릭</span>하여 과목명을 수정한 후 <span className="text-[#2B8F70]">Enter</span>를 누르면 변경사항이 저장됩니다.
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
                        onCellUpdate={handleCellUpdate}
                      />
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

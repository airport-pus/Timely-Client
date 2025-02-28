'use client';

import { useState, useRef, useLayoutEffect } from 'react';

function EditableCell({ initialValue, className }: { initialValue: any; className: any }) {
  const [value, setValue] = useState(initialValue);
  const [edited, setEdited] = useState(false);
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
    setIsComposing(true);
  };

  const handleCompositionEnd = (e: React.CompositionEvent<HTMLTableCellElement>) => {
    setIsComposing(false);
    saveSelection();
    setValue(e.currentTarget.textContent);
    setEdited(true);
  };

  const handleInput = (e: React.FormEvent<HTMLTableCellElement>) => {
    if (!isComposing) {
      saveSelection();
      setValue(e.currentTarget.textContent);
      setEdited(true);
    }
  };

  useLayoutEffect(() => {
    if (cellRef.current && document.activeElement === cellRef.current) {
      restoreSelection();
    }
  }, [value]);

  return (
    <td
      ref={cellRef}
      contentEditable
      suppressContentEditableWarning
      onInput={handleInput}
      onCompositionStart={handleCompositionStart}
      onCompositionEnd={handleCompositionEnd}
      className={`${className} ${edited ? "bg-[#FFFFE7]" : ""}`}
    >
      {value}
    </td>
  );
}

export default function Home() {
  const cellClass = "py-2 px-4 border border-gray-300 text-center";

  return (
    <div
      style={{
        backgroundColor: '#F3f4f6',
        minHeight: '100vh',
        fontFamily: 'Pretendard, sans-serif',
      }}
    >
      <div className="grid grid-cols-1 gap-0 mx-[580px] items-center justify-items-center p-8 pb-20 text-black">
        <div className="w-full">
          <h1 className="text-2xl font-bold mt-6 mb-2 text-left">
            시간췍 - 초·중·고등학생 시간표 제작
          </h1>
          <p className="text-left">
            "지금 무슨 수업일까?" <strong>학교, 학년, 반</strong>만 입력하면 시간표를 만들어드립니다.<br />
            더 이상 복잡하게 찾을 필요 없이, 간편하게 내 시간표를 확인하세요!
          </p>
        </div>

        <div className="flex space-x-4 mt-6 w-full">
          <div className="flex items-center border border-gray-300 rounded-md w-full px-4 py-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-gray-500 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-4.35-4.35M9 17a8 8 0 100-16 8 8 0 000 16z"
              />
            </svg>
            <input
              type="text"
              placeholder="학교명 검색"
              className="w-full outline-none"
            />
          </div>
          <select className="border border-gray-300 px-4 py-2 rounded-md">
            <option value="">학년 선택</option>
            <option value="1">1학년</option>
            <option value="2">2학년</option>
            <option value="3">3학년</option>
            <option value="4">4학년</option>
            <option value="5">5학년</option>
            <option value="6">6학년</option>
          </select>
          <select className="border border-gray-300 px-4 py-2 rounded-md">
            <option value="">반 선택</option>
            {[...Array(12)].map((_, i) => (
              <option key={i} value={i + 1}>
                {i + 1}반
              </option>
            ))}
          </select>
        </div>

        <div className="w-full mt-8 overflow-x-auto">
          <table className="w-full border-collapse">
            <thead className="bg-gray-200">
              <tr>
                <th className={`${cellClass} w-1/6`}>교시</th>
                <th className={`${cellClass} w-1/6`}>월</th>
                <th className={`${cellClass} w-1/6`}>화</th>
                <th className={`${cellClass} w-1/6`}>수</th>
                <th className={`${cellClass} w-1/6`}>목</th>
                <th className={`${cellClass} w-1/6`}>금</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <EditableCell initialValue="1" className={`${cellClass} h-16`} />
                <EditableCell initialValue="수학" className={cellClass} />
                <EditableCell initialValue="과학" className={cellClass} />
                <EditableCell initialValue="영어" className={cellClass} />
                <EditableCell initialValue="체육" className={cellClass} />
                <EditableCell initialValue="미술" className={cellClass} />
              </tr>
              <tr>
                <EditableCell initialValue="2" className={`${cellClass} h-16`} />
                <EditableCell initialValue="체육" className={cellClass} />
                <EditableCell initialValue="수학" className={cellClass} />
                <EditableCell initialValue="과학" className={cellClass} />
                <EditableCell initialValue="영어" className={cellClass} />
                <EditableCell initialValue="미술" className={cellClass} />
              </tr>
              <tr>
                <EditableCell initialValue="3" className={`${cellClass} h-16`} />
                <EditableCell initialValue="음악" className={cellClass} />
                <EditableCell initialValue="사회" className={cellClass} />
                <EditableCell initialValue="역사" className={cellClass} />
                <EditableCell initialValue="정보" className={cellClass} />
                <EditableCell initialValue="기술" className={cellClass} />
              </tr>
              <tr>
                <EditableCell initialValue="4" className={`${cellClass} h-16`} />
                <EditableCell initialValue="수학" className={cellClass} />
                <EditableCell initialValue="과학" className={cellClass} />
                <EditableCell initialValue="영어" className={cellClass} />
                <EditableCell initialValue="체육" className={cellClass} />
                <EditableCell initialValue="미술" className={cellClass} />
              </tr>
              <tr>
                <EditableCell initialValue="5" className={`${cellClass} h-16`} />
                <EditableCell initialValue="음악" className={cellClass} />
                <EditableCell initialValue="사회" className={cellClass} />
                <EditableCell initialValue="역사" className={cellClass} />
                <EditableCell initialValue="정보" className={cellClass} />
                <EditableCell initialValue="기술" className={cellClass} />
              </tr>
              <tr>
                <EditableCell initialValue="6" className={`${cellClass} h-16`} />
                <EditableCell initialValue="체육" className={cellClass} />
                <EditableCell initialValue="수학" className={cellClass} />
                <EditableCell initialValue="과학" className={cellClass} />
                <EditableCell initialValue="영어" className={cellClass} />
                <EditableCell initialValue="미술" className={cellClass} />
              </tr>
              <tr>
                <EditableCell initialValue="7" className={`${cellClass} h-16`} />
                <EditableCell initialValue="음악" className={cellClass} />
                <EditableCell initialValue="사회" className={cellClass} />
                <EditableCell initialValue="역사" className={cellClass} />
                <EditableCell initialValue="데이터베이스" className={cellClass} />
                <EditableCell initialValue="컴퓨터구조" className={cellClass} />
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

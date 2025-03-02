"use client";

import { useRef } from 'react';
import html2canvas from 'html2canvas-pro';
import { useAtomValue } from 'jotai';
import { backgroundColorAtom, borderColorAtom, targetRefAtom } from "../../atoms";

export default function Save() {
  // Use useAtomValue to get the current value of the ref atom
  const targetElement = useAtomValue(targetRefAtom);

  const handleSave = async () => {
    if (!targetElement) return;

    try {
      const canvas = await html2canvas(targetElement, {
        backgroundColor: null,
        useCORS: true,
        scale: 2, // 해상도를 2배로 높임
        logging: false,
        allowTaint: true,
      });
      
      const image = canvas.toDataURL('image/png');
      
      // 다운로드 링크 생성
      const link = document.createElement('a');
      link.href = image;
      link.download = 'timetable.png';
      link.click();
    } catch (error) {
      console.error('Failed to save image:', error);
    }
  };

  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">
        저장
      </h2>

      <button
        onClick={handleSave}
        className="bg-[#2B8F70] text-white px-4 py-2 rounded hover:bg-[#236e57] transition-colors"
      >
        시간표 이미지로 저장
      </button>
    </div>
  );
}

"use client";

import { useRef } from 'react';
import html2canvas from 'html2canvas-pro';
import { useAtomValue } from 'jotai';
import { backgroundColorAtom, borderColorAtom, targetRefAtom } from "../../atoms";

export default function Save() {
  const targetElement = useAtomValue(targetRefAtom);

  const handleSave = async () => {
    if (!targetElement) return;

    try {
      const originalStyles = new Map();

      const headerCells = targetElement.querySelectorAll('th');
      const firstColumnCells = targetElement.querySelectorAll('tbody tr td:first-child');

      headerCells.forEach((cell, index) => {
        originalStyles.set(cell, cell.getAttribute('style'));
        cell.style.textAlign = 'center';
      });

      firstColumnCells.forEach((cell) => {
        originalStyles.set(cell, cell.getAttribute('style'));
        cell.style.textAlign = 'center';
      });

      const flexContainer = targetElement.querySelector('.flex');
      if (flexContainer) {
        originalStyles.set(flexContainer, flexContainer.getAttribute('style'));
        flexContainer.style.alignItems = 'flex-start';
      }
      
      const uploadComponent = targetElement.querySelector('.flex > :nth-child(2)');
      if (uploadComponent) {
        originalStyles.set(uploadComponent, uploadComponent.getAttribute('style'));
        uploadComponent.style.alignSelf = 'flex-start';
        uploadComponent.style.position = 'relative';
        uploadComponent.style.top = '0';
        uploadComponent.style.marginTop = '0';
      }

      const container = targetElement.querySelector('.border-dashed');
      let originalBgColor = '';
      if (container) {
        originalBgColor = container.style.backgroundColor;
        originalStyles.set(container, container.getAttribute('style'));
        const currentBgColor = window.getComputedStyle(container).backgroundColor;
        if (!currentBgColor || currentBgColor === 'transparent' || currentBgColor === 'rgba(0, 0, 0, 0)') {
          container.style.backgroundColor = '#FFFFFF';
        }
      }

      const canvas = await html2canvas(targetElement, {
        backgroundColor: '#FFFFFF',
        useCORS: true,
        scale: 2,
        logging: false,
        allowTaint: true,
        onclone: (clonedDoc) => {
          const clonedHeaderCells = clonedDoc.querySelectorAll('th');
          const clonedFirstColumnCells = clonedDoc.querySelectorAll('tbody tr td:first-child');
          
          clonedHeaderCells.forEach((cell) => {
            cell.style.textAlign = 'center';
          });
          
          clonedFirstColumnCells.forEach((cell) => {
            cell.style.textAlign = 'center';
          });
          
          const clonedFlexContainer = clonedDoc.querySelector('.flex');
          if (clonedFlexContainer) {
            clonedFlexContainer.style.alignItems = 'flex-start';
          }
          
          const clonedUploadComponent = clonedDoc.querySelector('.flex > :nth-child(2)');
          if (clonedUploadComponent) {
            clonedUploadComponent.style.alignSelf = 'flex-start';
            clonedUploadComponent.style.position = 'relative';
            clonedUploadComponent.style.top = '0';
            clonedUploadComponent.style.marginTop = '0';
          }

          const clonedContainer = clonedDoc.querySelector('.border-dashed');
          if (clonedContainer) {
            const currentBgColor = window.getComputedStyle(clonedContainer).backgroundColor;
            if (!currentBgColor || currentBgColor === 'transparent' || currentBgColor === 'rgba(0, 0, 0, 0)') {
              clonedContainer.style.backgroundColor = '#FFFFFF';
            }
          }
        }
      });

      headerCells.forEach((cell) => {
        const originalStyle = originalStyles.get(cell);
        if (originalStyle) {
          cell.setAttribute('style', originalStyle);
        } else {
          cell.removeAttribute('style');
        }
      });
      
      firstColumnCells.forEach((cell) => {
        const originalStyle = originalStyles.get(cell);
        if (originalStyle) {
          cell.setAttribute('style', originalStyle);
        } else {
          cell.removeAttribute('style');
        }
      });
      
      if (uploadComponent) {
        const originalStyle = originalStyles.get(uploadComponent);
        if (originalStyle) {
          uploadComponent.setAttribute('style', originalStyle);
        } else {
          uploadComponent.removeAttribute('style');
        }
      }
      
      if (container) {
        const originalStyle = originalStyles.get(container);
        if (originalStyle) {
          container.setAttribute('style', originalStyle);
        } else {
          container.removeAttribute('style');
        }
      }
      
      const image = canvas.toDataURL('image/png');

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

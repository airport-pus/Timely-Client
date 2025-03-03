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
      const originalStyles = new Map<HTMLElement, string | null>();

      if (typeof targetElement === 'object' && targetElement !== null && 'querySelectorAll' in targetElement) {
        const headerCells = Array.from((targetElement as HTMLElement).querySelectorAll('th'));
        const firstColumnCells = Array.from((targetElement as HTMLElement).querySelectorAll('tbody tr td:first-child'));

        headerCells.forEach((cell) => {
          if (cell instanceof HTMLElement) {
            originalStyles.set(cell, cell.getAttribute('style'));
            cell.style.textAlign = 'center';
          }
        });

        firstColumnCells.forEach((cell) => {
          if (cell instanceof HTMLElement) {
            originalStyles.set(cell, cell.getAttribute('style'));
            cell.style.textAlign = 'center';
          }
        });

        if (typeof targetElement === 'object' && targetElement !== null && 'querySelector' in targetElement) {
          const flexContainer = (targetElement as HTMLElement).querySelector('.flex');
          if (flexContainer instanceof HTMLElement) {
            originalStyles.set(flexContainer, flexContainer.getAttribute('style'));
            flexContainer.style.alignItems = 'flex-start';
          }
        }

        const uploadComponent = (targetElement as HTMLElement).querySelector('.flex > :nth-child(2)');
        if (uploadComponent instanceof HTMLElement) {
          originalStyles.set(uploadComponent, uploadComponent.getAttribute('style'));
          uploadComponent.style.alignSelf = 'flex-start';
          uploadComponent.style.position = 'relative';
          uploadComponent.style.top = '0';
          uploadComponent.style.marginTop = '0';
        }

        const container = (targetElement as HTMLElement).querySelector('.border-dashed');
        if (container instanceof HTMLElement) {
          originalStyles.set(container, container.getAttribute('style'));
          const currentBgColor = window.getComputedStyle(container).backgroundColor;
          
          if (
            !currentBgColor ||
            currentBgColor === 'transparent' ||
            currentBgColor === 'rgba(0, 0, 0, 0)'
          ) {
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
              if (cell instanceof HTMLElement) {
                cell.style.textAlign = 'center';
              }
            });

            clonedFirstColumnCells.forEach((cell) => {
              if (cell instanceof HTMLElement) {
                cell.style.textAlign = 'center';
              }
            });

            const clonedFlexContainer = clonedDoc.querySelector('.flex');
            if (clonedFlexContainer instanceof HTMLElement) {
              clonedFlexContainer.style.alignItems = 'flex-start';
            }

            const clonedUploadComponent = clonedDoc.querySelector('.flex > :nth-child(2)');
            if (clonedUploadComponent instanceof HTMLElement) {
              clonedUploadComponent.style.alignSelf = 'flex-start';
              clonedUploadComponent.style.position = 'relative';
              clonedUploadComponent.style.top = '0';
              clonedUploadComponent.style.marginTop = '0';
            }

            const clonedContainer = clonedDoc.querySelector('.border-dashed');
            if (clonedContainer instanceof HTMLElement) {
              const clonedBgColor = window.getComputedStyle(clonedContainer).backgroundColor;
              if (
                !clonedBgColor ||
                clonedBgColor === 'transparent' ||
                clonedBgColor === 'rgba(0, 0, 0, 0)'
              ) {
                clonedContainer.style.backgroundColor = '#FFFFFF';
              }
            }
          },
        });

        headerCells.forEach((cell) => {
          if (cell instanceof HTMLElement) {
            const originalStyle = originalStyles.get(cell);
            if (originalStyle) {
              cell.setAttribute('style', originalStyle);
            } else {
              cell.removeAttribute('style');
            }
          }
        });

        firstColumnCells.forEach((cell) => {
          if (cell instanceof HTMLElement) {
            const originalStyle = originalStyles.get(cell);
            if (originalStyle) {
              cell.setAttribute('style', originalStyle);
            } else {
              cell.removeAttribute('style');
            }
          }
        });

        if (uploadComponent instanceof HTMLElement) {
          const originalStyle = originalStyles.get(uploadComponent);
          if (originalStyle) {
            uploadComponent.setAttribute('style', originalStyle);
          } else {
            uploadComponent.removeAttribute('style');
          }
        }

        if (container instanceof HTMLElement) {
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
      }
    } catch (error) {
      console.error('Failed to save image:', error);
    }
  };

  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">저장</h2>
      <button
        onClick={handleSave}
        className="bg-[#2B8F70] text-white px-4 py-2 rounded hover:bg-[#236e57] transition-colors"
      >
        시간표 이미지로 저장
      </button>
    </div>
  );
}

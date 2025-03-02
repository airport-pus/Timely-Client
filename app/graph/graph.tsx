  "use client";

  import React, { useRef, DragEvent, useLayoutEffect, useCallback, useState, useEffect } from "react";
  import { useAtom } from "jotai";
  import { placedStickersAtom, PlacedSticker } from "./../store/stickerAtom";
  import Upload from "../upload/upload";

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
    const [localValue, setLocalValue] = React.useState(value);
    const [isComposing, setIsComposing] = React.useState(false);
    const cellRef = React.useRef<HTMLTableCellElement>(null);
    const selectionRef = React.useRef<{ start: number; end: number } | null>(null);

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

  function DraggableSticker({ sticker }: { sticker: PlacedSticker }) {
    const [placedStickers, setPlacedStickers] = useAtom(placedStickersAtom);
    const [isSelected, setIsSelected] = useState(false);
    const stickerRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement | null>(null);
    
    useLayoutEffect(() => {
      containerRef.current = document.querySelector('.border-dashed');
    }, []);

    useEffect(() => {
      const handleClickOutside = (e: MouseEvent) => {
        if (stickerRef.current && !stickerRef.current.contains(e.target as Node)) {
          setIsSelected(false);
        }
      };
      
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, []);

    const handleMouseDown = (e: React.MouseEvent) => {
      e.stopPropagation();
      setIsSelected(true);
      const startX = e.clientX;
      const startY = e.clientY;
      const initialX = sticker.x;
      const initialY = sticker.y;

      const handleMouseMove = (moveEvent: MouseEvent) => {
        if (!containerRef.current) return;
        
        const containerRect = containerRef.current.getBoundingClientRect();
        const dx = moveEvent.clientX - startX;
        const dy = moveEvent.clientY - startY;

        let newX = initialX + dx;
        let newY = initialY + dy;

        newX = Math.max(0, Math.min(newX, containerRect.width - sticker.width));
        newY = Math.max(0, Math.min(newY, containerRect.height - sticker.height));
        
        setPlacedStickers((prev) =>
          prev.map((s) =>
            s.id === sticker.id ? { ...s, x: newX, y: newY } : s
          )
        );
      };

      const handleMouseUp = () => {
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("mouseup", handleMouseUp);
      };

      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    };

    const handleResizeMouseDown = (e: React.MouseEvent) => {
      e.stopPropagation();
      const startX = e.clientX;
      const startY = e.clientY;
      const initialWidth = sticker.width;
      const initialHeight = sticker.height;

      const handleMouseMove = (moveEvent: MouseEvent) => {
        if (!containerRef.current) return;
        
        const containerRect = containerRef.current.getBoundingClientRect();
        const dx = moveEvent.clientX - startX;
        const dy = moveEvent.clientY - startY;
        
        let newWidth = Math.max(30, initialWidth + dx);
        let newHeight = Math.max(30, initialHeight + dy);
        
        newWidth = Math.min(newWidth, containerRect.width - sticker.x);
        newHeight = Math.min(newHeight, containerRect.height - sticker.y);
        
        setPlacedStickers((prev) =>
          prev.map((s) =>
            s.id === sticker.id
              ? {
                  ...s,
                  width: newWidth,
                  height: newHeight,
                }
              : s
          )
        );
      };

      const handleMouseUp = () => {
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("mouseup", handleMouseUp);
      };

      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    };

    const handleRotateMouseDown = (e: React.MouseEvent) => {
      e.stopPropagation();
      const centerX = sticker.x + sticker.width / 2;
      const centerY = sticker.y + sticker.height / 2;
      const startAngle = Math.atan2(e.clientY - centerY, e.clientX - centerX);
      const initialRotation = sticker.rotation;

      const handleMouseMove = (moveEvent: MouseEvent) => {
        const currentAngle = Math.atan2(moveEvent.clientY - centerY, moveEvent.clientX - centerX);
        const rotationDelta = (currentAngle - startAngle) * (180 / Math.PI);
        setPlacedStickers((prev) =>
          prev.map((s) =>
            s.id === sticker.id ? { ...s, rotation: initialRotation + rotationDelta } : s
          )
        );
      };

      const handleMouseUp = () => {
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("mouseup", handleMouseUp);
      };

      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    };

    return (
      <div
        ref={stickerRef}
        onMouseDown={handleMouseDown}
        style={{
          position: "absolute",
          left: sticker.x,
          top: sticker.y,
          width: sticker.width,
          height: sticker.height,
          transform: `rotate(${sticker.rotation}deg)`,
          cursor: "move",
        }}
      >
        <img
          src={sticker.image.src}
          alt={sticker.image.alt}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
            pointerEvents: "none",
          }}
        />
        {isSelected && (
          <>
            <div
              onMouseDown={handleResizeMouseDown}
              style={{
                position: "absolute",
                right: 0,
                bottom: 0,
                width: 16,
                height: 16,
                backgroundColor: "rgba(0,0,0,0.5)",
                cursor: "nwse-resize",
              }}
            />
            <div
              onMouseDown={handleRotateMouseDown}
              style={{
                position: "absolute",
                top: -20,
                left: "50%",
                transform: "translateX(-50%)",
                width: 16,
                height: 16,
                backgroundColor: "rgba(0,0,0,0.5)",
                borderRadius: "50%",
                cursor: "grab",
              }}
            />
          </>
        )}
      </div>
    );
  }

  export type GraphProps = {
    tableData: string[][];
    editedCells: Set<string>;
    onCellUpdate: (rowIndex: number, colIndex: number, newValue: string) => void;
  };

  export function Graph({ tableData, editedCells, onCellUpdate }: GraphProps) {
    const cellClass = "py-1 px-1 border border-gray-300 text-center";
    const containerRef = useRef<HTMLDivElement>(null);
    const [placedStickers, setPlacedStickers] = useAtom(placedStickersAtom);

    const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
      e.preventDefault();
    };

    const handleDrop = (e: DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      if (!containerRef.current) return;
      const data = e.dataTransfer.getData("sticker");
      if (!data) return;
      const stickerData = JSON.parse(data) as typeof placedStickers[number]["image"];
      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const newSticker: PlacedSticker = {
        id: Date.now().toString(),
        image: stickerData,
        x,
        y,
        width: 80,
        height: 80,
        rotation: 0,
      };
      setPlacedStickers((prev) => [...prev, newSticker]);
    };

    return (
      <>
        <div className="text-gray300 text-center text-[15px] mt-6 mb-[-8]">
          ※ <span className="text-[#2B8F70]">셀을 클릭</span>하여 과목명을 수정한 후{" "}
          <span className="text-[#2B8F70]">Enter</span>를 누르면 변경사항이 저장됩니다.
        </div>
        <div
          className="w-full mt-8 relative border-2 border-dashed border-gray-300"
          ref={containerRef}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          style={{ minHeight: 400 }}
        >
          <div className="flex">
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
          {placedStickers.map((sticker) => (
            <DraggableSticker key={sticker.id} sticker={sticker} />
          ))}
        </div>
      </>
    );
  }

"use client"

import { useEffect, useRef } from 'react';
import { ColorPicker, useColor } from "react-color-palette";
import "react-color-palette/css";
import { backgroundColorAtom, borderColorAtom } from '../../atoms';
import { useAtom } from 'jotai';

export default function Graph() {
  const [borderColor, setBorderColor] = useAtom(borderColorAtom);
  const [color, setColor] = useColor(borderColor ? borderColor : "#BBBBBB");
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Clear any existing timer
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    
    // Set a new timer that will run after 500ms
    timerRef.current = setTimeout(() => {
      if (borderColor !== color.hex) {
        setBorderColor(color.hex);
      }
    }, 10);
    
    // Cleanup function to clear the timer if component unmounts or effect runs again
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [color, borderColor]);

  return (
    <div className='w-96'>
      <p>현재 색상: {borderColor}</p>
      <h2 className="text-lg font-semibold mb-4">
        표 선분 색상 지정
      </h2>
      <ColorPicker
        height={140} 
        hideAlpha={true} 
        hideInput={["rgb", "hsv", "rgb"]} 
        color={color} 
        onChange={setColor}
      />
      <div className="flex">
        <div className="w-1/4 border-r pr-4"></div>
        <div className="flex-1 pl-4"></div>
      </div>
    </div>
  );
}

"use client"

import { useEffect, useRef } from 'react';
import { ColorPicker, useColor } from "react-color-palette";
import "react-color-palette/css";
import { textColorAtom } from '../../atoms';
import { useAtom } from 'jotai';

export default function Text() {
  const [textColor, setTextColor] = useAtom(textColorAtom);
  const [color, setColor] = useColor(textColor ? textColor : "#000000");
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Clear any existing timer
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    
    // Set a new timer that will run after 500ms
    timerRef.current = setTimeout(() => {
      if (textColor !== color.hex) {
        setTextColor(color.hex);
      }
    }, 10);
    
    // Cleanup function to clear the timer if component unmounts or effect runs again
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [color, textColor]);

  return (
    <div className='w-96'>
      <p>현재 글자색: {textColor}</p>
      <h2 className="text-lg font-semibold mb-4">
        글자 색상 지정
      </h2>
      <ColorPicker
        height={140} 
        hideAlpha={true} 
        hideInput={["rgb", "hsv", "rgb"]} 
        color={color} 
        onChange={setColor}
      />
      <div className="flex">
        <div className="w-1/4 text-r pr-4"></div>
        <div className="flex-1 pl-4"></div>
      </div>
    </div>
  );
}

"use client"

import { useEffect } from 'react';
import { ColorPicker, useColor } from "react-color-palette";
import "react-color-palette/css";
import { backgroundColorAtom } from '../../atoms';
import { useAtom } from 'jotai';

export default function Background() {
  const [color, setColor] = useColor("#FFFFFF");
  const [backgroundColor, setBackgroundColor] = useAtom(backgroundColorAtom);

  useEffect(() => {
    setBackgroundColor(color.hex);
  }, [color]);

  return (
    <div className='w-96'>
      <p>현재 배경색: {backgroundColor}</p>
      <h2 className="text-lg font-semibold mb-4">
        표 색상 지정
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

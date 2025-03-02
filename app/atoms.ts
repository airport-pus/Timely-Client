import { atom, useAtom } from 'jotai';
import { useRef, useEffect } from 'react';
import html2canvas from 'html2canvas';


export const backgroundColorAtom = atom<string>('');
export const borderColorAtom = atom<string>('');
export const targetRefAtom = atom(null);

import { atom } from "jotai";

export type StickerImage = {
  id: number;
  src: string;
  alt: string;
  name: string;
};

export type PlacedSticker = {
  id: string;
  image: StickerImage;
  x: number;
  y: number;
  width: number;
  height: number;
  rotation: number;
};

export const placedStickersAtom = atom<PlacedSticker[]>([]);

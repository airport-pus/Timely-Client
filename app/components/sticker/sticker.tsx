"use client";

import React from "react";
import { StickerImage } from "../../store/stickerAtom";

const images: StickerImage[] = [
  { id: 1, src: "/sticker/bear1.gif", alt: "Smile sticker", name: "노랑 곰" },
  { id: 2, src: "/sticker/bear2.png", alt: "Heart sticker", name: "곰" },
  { id: 3, src: "/sticker/bear3.png", alt: "Star sticker", name: "물개" },
  { id: 4, src: "/sticker/gae1.png", alt: "Thumbs up sticker", name: "꽃게" },
  { id: 5, src: "/sticker/rabbit1.png", alt: "Fire sticker", name: "당근 토끼" },
  { id: 6, src: "/sticker/rabbit2.png", alt: "Party sticker", name: "차렷 토끼" },
  { id: 7, src: "/sticker/rabbit3.png", alt: "Cool sticker", name: "하트 토끼" },
];

export function StickerItem({ image }: { image: StickerImage }) {
  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    e.dataTransfer.setData("sticker", JSON.stringify(image));
  };

  return (
    <div
      draggable
      onDragStart={handleDragStart}
      className="flex flex-col items-center cursor-move"
    >
      <img
        src={image.src}
        alt={image.alt}
        className="h-14 w-14 object-contain"
      />
      <span className="text-[14px] mt-2">{image.name}</span>
    </div>
  );
}

export default function Sticker() {
  return (
    <div>
      <div className="bg-[#F3F4F6] rounded-[8px] h-30 w-222 ml-[-2] flex items-center justify-start gap-10 pl-4">
        {images.map((image) => (
          <StickerItem key={image.id} image={image} />
        ))}
      </div>
    </div>
  );
}

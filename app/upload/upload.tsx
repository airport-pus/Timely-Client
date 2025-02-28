"use client";

import React, { useState, useRef } from "react";

export default function Upload() {
  const [title, setTitle] = useState("타이틀 입력");
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageFile = (file: File) => {
    const url = URL.createObjectURL(file);
    setImageUrl(url);
  };

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      handleImageFile(file);
    }
  };

  return (
    <div className="w-[35%] p-4">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="text-2xl font-bold mb-4 w-full border-b-2 border-transparent hover:border-gray-300 focus:border-[#2B8F70] focus:outline-none px-2 py-1 mt-4"
      />
      <div
        className="w-80 h-107 bg-gray-100 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:bg-gray-200 transition-colors"
        onClick={handleImageClick}
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
      >
        {imageUrl ? (
          <img
            src={imageUrl}
            alt="Uploaded"
            className="w-full h-full object-cover rounded-lg"
          />
        ) : (
          <>
            <svg
              className="w-8 h-8 mb-2 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
            <p className="text-gray-500">
              드래그 앤 드롭 또는 직접 업로드 해 주세요.
            </p>
          </>
        )}
      </div>
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        accept="image/*"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleImageFile(file);
        }}
      />
    </div>
  );
}

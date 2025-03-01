"use client";

import { useState } from "react";

const TABS = [
  { value: "표", label: "표" },
  { value: "배경", label: "배경" },
  { value: "스티커", label: "스티커" },
  { value: "저장", label: "저장" },
];

export default function Custom() {
  const [selectedTab, setSelectedTab] = useState("표");

  const activeClass =
    "text-[#2b8f70] after:content-[''] after:absolute after:bottom-0 after:left-[-10%] after:w-[120%] after:h-0.5 after:bg-[#2b8f70]";
  const inactiveClass = "text-gray-600";

  return (
    <div className="w-full max-w-screen-md mt-8">
      <nav className="flex space-x-12 mb-4">
        {TABS.map((tab) => (
          <button
            key={tab.value}
            className={`pb-1 cursor-pointer relative text-lg font-medium ${
              selectedTab === tab.value ? activeClass : inactiveClass
            }`}
            onClick={() => setSelectedTab(tab.value)}
          >
            {tab.label}
          </button>
        ))}
      </nav>
      <div className="border-b border-[#AEAEAE] w-213 mb-4"></div>

      <div>
        <h2 className="text-lg font-semibold mb-4">
          아이템을 추가해 꾸며 주세요!
        </h2>

        <div className="flex">
          <div className="w-1/4 border-r pr-4"></div>
          <div className="flex-1 pl-4"></div>
        </div>
      </div>
    </div>
  );
}

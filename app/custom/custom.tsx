"use client";

import { useState } from "react";
import Graph from "../components/graph/graph";
import Background from "../components/background/background";
import Sticker from "../components/sticker/sticker";
import Save from "../components/save/save";

const TABS = [
  { value: "표", label: "표" },
  { value: "배경", label: "배경" },
  { value: "스티커", label: "스티커" },
  { value: "저장", label: "저장" },
];

export default function Custom() {
  const [selectedTab, setSelectedTab] = useState("표");

  const activeClass = "bg-[#e6f7f1] text-[#2b8f70] font-medium border-b-2 border-[#2b8f70]";
  const inactiveClass = "bg-[#F2F4F6] text-gray-600";

  const renderTabContent = () => {
    switch (selectedTab) {
      case "표":
        return <Graph />;
      case "배경":
        return <Background />;
      case "스티커":
        return <Sticker />;
      case "저장":
        return <Save />;
      default:
        return <Graph />;
    }
  };

  return (
    <div className="w-full max-w-screen-md mt-8">
      <nav className="flex mb-4 w-full">
        {TABS.map((tab) => (
          <button
            key={tab.value}
            className={`py-2 flex-1 cursor-pointer text-lg ${
              selectedTab === tab.value ? activeClass : inactiveClass
            }`}
            onClick={() => setSelectedTab(tab.value)}
          >
            {tab.label}
          </button>
        ))}
      </nav>
      <div>
        {renderTabContent()}
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import Graph from "../components/graph/graph";
import Background from "../components/background/background";
import Sticker from "../components/sticker/sticker";
import Save from "../components/save/save";

const TABS = [
  { value: "표", label: "표", icon: "📊" },
  { value: "배경", label: "배경", icon: "🖼️" },
  { value: "타이틀", label: "타이틀", icon: "✏️" },
  { value: "스티커", label: "스티커", icon: "🏷️" },
  { value: "저장", label: "저장", icon: "💾" },
];

export default function Custom() {
  const [selectedTab, setSelectedTab] = useState("표");

  const activeClass = "bg-[#2b8f70] text-white font-medium rounded-md";
  const inactiveClass = "bg-gray-100 text-gray-600 hover:bg-gray-200 rounded-md";

  const renderTabContent = () => {
    switch (selectedTab) {
      case "표":
        return <Graph />;
      case "배경":
        return <Background />;
      case "타이틀":
        return <div>타이틀 컴포넌트</div>;
      case "스티커":
        return (
          <div className="w-full h-full" style={{ maxWidth: '100%', overflowX: 'hidden' }}>
            <Sticker />
          </div>
        );
      case "저장":
        return <Save />;
      default:
        return <Graph />;
    }
  };

  return (
    <div className="w-full max-w-screen-lg mt-8">
      <nav className="flex mb-4 w-full gap-2">
        {TABS.map((tab) => (
          <button
            key={tab.value}
            className={`py-3 flex-1 cursor-pointer text-lg flex flex-col items-center justify-center transition-all ${
              selectedTab === tab.value ? activeClass : inactiveClass
            }`}
            onClick={() => setSelectedTab(tab.value)}
          >
            <span className="text-2xl mb-1">{tab.icon}</span>
            <span>{tab.label}</span>
          </button>
        ))}
      </nav>
      <div className="bg-white p-4 rounded-lg border border-gray-200 min-h-[400px] overflow-hidden" style={{ width: '100%', maxWidth: '100%' }}>
        {renderTabContent()}
      </div>
    </div>
  );
}

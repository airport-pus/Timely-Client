"use client";

import { useState } from "react";
import Header from "./header/header";
import Search from "./search/search";
import Edit from "./edit/edit";
import Footer from "./footer/footer";

export default function Home() {
  const [selectedTab, setSelectedTab] = useState("꾸미기");

  return (
    <>
      <style jsx global>{`
        ::selection {
          background-color: #2b8f70;
          color: #fff;
        }
        ::-moz-selection {
          background-color: #2b8f70;
          color: #fff;
        }
      `}</style>

      <div
        style={{
          backgroundColor: "#FFFFFF",
          minHeight: "100vh",
          fontFamily: "Pretendard, sans-serif",
        }}
      >
        <div className="grid grid-cols-1 gap-0 mx-auto max-w-192 items-center justify-items-center p-4 pb-20 text-black">
          <div className="ml-[-56]">
            <Header />
            <Search />
            <Edit />

            <div className="w-full max-w-screen-md mt-8">
              <nav className="flex space-x-8 mb-4">
                <button 
                  className={`pb-1 cursor-pointer relative text-lg font-medium ${selectedTab === "꾸미기" ? "text-[#2b8f70] after:content-[''] after:absolute after:bottom-0 after:left-[-10%] after:w-[120%] after:h-0.5 after:bg-[#2b8f70]" : "text-gray-600"}`}
                  onClick={() => setSelectedTab("꾸미기")}
                >
                  꾸미기
                </button>
                <button 
                  className={`pb-1 cursor-pointer relative text-lg font-medium ${selectedTab === "배경" ? "text-[#2b8f70] after:content-[''] after:absolute after:bottom-0 after:left-[-10%] after:w-[120%] after:h-0.5 after:bg-[#2b8f70]" : "text-gray-600"}`}
                  onClick={() => setSelectedTab("배경")}
                >
                  배경
                </button>
                <button 
                  className={`pb-1 cursor-pointer relative text-lg font-medium ${selectedTab === "사진" ? "text-[#2b8f70] after:content-[''] after:absolute after:bottom-0 after:left-[-10%] after:w-[120%] after:h-0.5 after:bg-[#2b8f70]" : "text-gray-600"}`}
                  onClick={() => setSelectedTab("사진")}
                >
                  사진
                </button>
                <button 
                  className={`pb-1 cursor-pointer relative text-lg font-medium ${selectedTab === "드로잉" ? "text-[#2b8f70] after:content-[''] after:absolute after:bottom-0 after:left-[-10%] after:w-[120%] after:h-0.5 after:bg-[#2b8f70]" : "text-gray-600"}`}
                  onClick={() => setSelectedTab("드로잉")}
                >
                  드로잉
                </button>
                <button 
                  className={`pb-1 cursor-pointer relative text-lg font-medium ${selectedTab === "저장" ? "text-[#2b8f70] after:content-[''] after:absolute after:bottom-0 after:left-[-10%] after:w-[120%] after:h-0.5 after:bg-[#2b8f70]" : "text-gray-600"}`}
                  onClick={() => setSelectedTab("저장")}
                >
                  저장
                </button>
              </nav>
              <div className="border-b border-[#AEAEAE] w-213 mb-4"></div>

              <div>
                <h2 className="text-lg font-semibold mb-4">
                  아이템을 추가해 꾸며 주세요!
                </h2>

                <div className="flex">
                  <div className="w-1/4 border-r pr-4">
                  </div>
                  <div className="flex-1 pl-4">
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}

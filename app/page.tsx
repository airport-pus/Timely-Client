"use client";

import { useState } from "react";
import Header from "./header/header";
import Search from "./search/search";
import Edit from "./edit/edit";
import Footer from "./footer/footer";
import Custom from "./custom/custom";

export default function Home() {
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
            <Custom />
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}

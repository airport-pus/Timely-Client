"use client";

import Header from './header/header';
import Search from './search/search';
import Edit from './edit/edit';
import Footer from './footer/footer';

export default function Home() {
  return (
    <>
      <style jsx global>{`
        ::selection {
          background-color: #2B8F70;
          color: #fff;
        }
        ::-moz-selection {
          background-color: #2B8F70;
          color: #fff;
        }
      `}</style>

      <div
        style={{
          backgroundColor: '#FFFFFF',
          minHeight: '100vh',
          fontFamily: 'Pretendard, sans-serif',
        }}
      >
        <div className="grid grid-cols-1 gap-0 mx-[580px] items-center justify-items-center p-8 pb-20 text-black">
          <Header />
          <Search />
          <Edit />
        </div>
        <Footer />
      </div>
    </>
  );
}

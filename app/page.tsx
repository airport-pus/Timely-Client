'use client';

import Footer from './footer/footer';

export default function Home() {
  return (
    <div
      style={{
        backgroundColor: '#F3f4f6',
        minHeight: '100vh',
        fontFamily: 'Pretendard, sans-serif'
      }}
    >
      <div className="grid grid-cols-1 gap-0 mx-[580px] items-center justify-items-center p-8 pb-20 text-black">
        
        <div className="w-full">
          <h1 className="text-2xl font-bold mt-6 mb-2 text-left">
            시간췍 - 초·중·고등학생 시간표 제작
          </h1>
          <p className="text-left">
            “지금 무슨 수업일까?" <strong>학교, 학년, 반</strong>만 입력하면 시간표를 만들어드립니다.<br />
            더 이상 복잡하게 찾을 필요 없이, 간편하게 내 시간표를 확인하세요!”
          </p>
        </div>
        
        <div className="flex space-x-4 mt-6 w-full">
          <div className="flex items-center border border-gray-300 rounded-md w-full px-4 py-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-4 text-gray-500 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-4.35-4.35M9 17a8 8 0 100-16 8 8 0 000 16z" />
            </svg>
            <input
              type="text"
              placeholder="학교명 검색"
              className="w-full outline-none"
            />
          </div>
          <select className="border border-gray-300 px-4 py-2 rounded-md">
            <option value="">학년 선택</option>
            <option value="1">1학년</option>
            <option value="2">2학년</option>
            <option value="3">3학년</option>
            <option value="4">4학년</option>
            <option value="5">5학년</option>
            <option value="6">6학년</option>
          </select>
          <select className="border border-gray-300 px-4 py-2 rounded-md">
            <option value="">반 선택</option>
            {[...Array(12)].map((_, i) => (
              <option key={i} value={i + 1}>
                {i + 1}반
              </option>
            ))}
          </select>
        </div>
        
        <div className="w-full h-[500px] bg-gray-300 mt-8" />
      </div>
      <Footer />
    </div>
  );
}

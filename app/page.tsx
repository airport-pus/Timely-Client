'use client';

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
        
        <div className="flex space-x-4 mt-6">
          <button className="border border-gray-300 px-4 py-2 rounded-md hover:bg-gray-100">
            학교 시간표 만들기
          </button>
          <button className="border border-gray-300 px-4 py-2 rounded-md hover:bg-gray-100">
            학원 시간표 만들기
          </button>
          <button className="border border-gray-300 px-4 py-2 rounded-md hover:bg-gray-100">
            일반 일정표 만들기
          </button>
        </div>
        
        <div className="w-full h-[500px] bg-gray-300 mt-8" />
      </div>
    </div>
  );
}

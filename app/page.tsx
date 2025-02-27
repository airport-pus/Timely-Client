'use client';

export default function Home() {
  const cellClass = "py-2 px-4 border border-gray-300 text-center";

  return (
    <div
      style={{
        backgroundColor: '#F3f4f6',
        minHeight: '100vh',
        fontFamily: 'Pretendard, sans-serif',
      }}
    >
      <div className="grid grid-cols-1 gap-0 mx-[580px] items-center justify-items-center p-8 pb-20 text-black">
        
        <div className="w-full">
          <h1 className="text-2xl font-bold mt-6 mb-2 text-left">
            시간췍 - 초·중·고등학생 시간표 제작
          </h1>
          <p className="text-left">
            "지금 무슨 수업일까?" <strong>학교, 학년, 반</strong>만 입력하면 시간표를 만들어드립니다.<br />
            더 이상 복잡하게 찾을 필요 없이, 간편하게 내 시간표를 확인하세요!
          </p>
        </div>
        
        <div className="flex space-x-4 mt-6 w-full">
          <div className="flex items-center border border-gray-300 rounded-md w-full px-4 py-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-gray-500 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-4.35-4.35M9 17a8 8 0 100-16 8 8 0 000 16z"
              />
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
        
        <div className="w-full mt-8 overflow-x-auto">
          <table className="w-full border-collapse">
            <thead className="bg-gray-200">
              <tr>
                <th className={`${cellClass} w-1/6`}>교시</th>
                <th className={`${cellClass} w-1/6`}>월</th>
                <th className={`${cellClass} w-1/6`}>화</th>
                <th className={`${cellClass} w-1/6`}>수</th>
                <th className={`${cellClass} w-1/6`}>목</th>
                <th className={`${cellClass} w-1/6`}>금</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className={`${cellClass} h-16`}>1</td>
                <td className={cellClass}>수학</td>
                <td className={cellClass}>과학</td>
                <td className={cellClass}>영어</td>
                <td className={cellClass}>체육</td>
                <td className={cellClass}>미술</td>
              </tr>
              <tr>
                <td className={`${cellClass} h-16`}>2</td>
                <td className={cellClass}>체육</td>
                <td className={cellClass}>수학</td>
                <td className={cellClass}>과학</td>
                <td className={cellClass}>영어</td>
                <td className={cellClass}>미술</td>
              </tr>
              <tr>
                <td className={`${cellClass} h-16`}>3</td>
                <td className={cellClass}>음악</td>
                <td className={cellClass}>사회</td>
                <td className={cellClass}>역사</td>
                <td className={cellClass}>정보</td>
                <td className={cellClass}>기술</td>
              </tr>
              <tr>
                <td className={`${cellClass} h-16`}>4</td>
                <td className={cellClass}>수학</td>
                <td className={cellClass}>과학</td>
                <td className={cellClass}>영어</td>
                <td className={cellClass}>체육</td>
                <td className={cellClass}>미술</td>
              </tr>
              <tr>
                <td className={`${cellClass} h-16`}>5</td>
                <td className={cellClass}>음악</td>
                <td className={cellClass}>사회</td>
                <td className={cellClass}>역사</td>
                <td className={cellClass}>정보</td>
                <td className={cellClass}>기술</td>
              </tr>
              <tr>
                <td className={`${cellClass} h-16`}>6</td>
                <td className={cellClass}>체육</td>
                <td className={cellClass}>수학</td>
                <td className={cellClass}>과학</td>
                <td className={cellClass}>영어</td>
                <td className={cellClass}>미술</td>
              </tr>
              <tr>
                <td className={`${cellClass} h-16`}>7</td>
                <td className={cellClass}>음악</td>
                <td className={cellClass}>사회</td>
                <td className={cellClass}>역사</td>
                <td className={cellClass}>데이터베이스</td>
                <td className={cellClass}>컴퓨터구조</td>
              </tr>
            </tbody>
          </table>
        </div>
        
      </div>
    </div>
  );
}

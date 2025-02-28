"use client";
import React from 'react';

const Header = () => {
  return (
    <div className="w-full">
      <h1 className="text-2xl font-bold mt-6 mb-2 text-left">
        시간췍 - 초·중·고등학생 커스텀 시간표 제작
      </h1>
      <p className="text-left">
        "지금 무슨 수업일까?" <strong>학교, 학년, 반</strong>만 입력하면 시간표를 만들어드립니다.<br />
        더 이상 복잡하게 찾을 필요 없이, 간편하게 내 시간표를 확인하세요!
      </p>
    </div>
  );
};

export default Header;

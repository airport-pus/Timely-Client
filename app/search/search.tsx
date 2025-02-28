"use client";
import React from 'react';

const Search = () => {
  return (
    <div className="flex space-x-2 mt-6 w-full">
      <div className="flex items-center border border-gray-300 rounded-md w-full px-4 py-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-6 text-gray-500 mr-2"
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
      <select className="border border-gray-300 px-4 py-2 rounded-md mr-[-56px]">
        <option value="">반 선택</option>
        {[...Array(12)].map((_, i) => (
          <option key={i} value={i + 1}>
            {i + 1}반
          </option>
        ))}
      </select>
    </div>
  );
};

export default Search;
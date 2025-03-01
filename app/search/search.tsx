"use client";
import React from 'react';

const GRADE_OPTIONS = [
  { value: '', label: '학년 선택' },
  { value: '1', label: '1학년' },
  { value: '2', label: '2학년' },
  { value: '3', label: '3학년' },
  { value: '4', label: '4학년' },
  { value: '5', label: '5학년' },
  { value: '6', label: '6학년' },
];

const CLASS_OPTIONS = [
  { value: '', label: '반 선택' },
  ...Array.from({ length: 12 }, (_, i) => ({
    value: String(i + 1),
    label: `${i + 1}반`,
  })),
];

const Search = () => {
  return (
    <div className="flex space-x-2 mt-6 w-full">
      <div className="flex items-center border border-gray-300 rounded-md w-full px-4 py-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
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
        {GRADE_OPTIONS.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <select className="border border-gray-300 px-4 py-2 rounded-md mr-[-56px]">
        {CLASS_OPTIONS.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Search;

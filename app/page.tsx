"use client";

import { useState } from 'react';
import Header from './header/header';
import Search from './search/search';
import { Graph } from './graph/graph';

export default function Home() {
  const initialData = [
    ["1", "수학", "과학", "영어", "체육", "미술"],
    ["2", "체육", "수학", "과학", "영어", "미술"],
    ["3", "음악", "사회", "역사", "정보", "기술"],
    ["4", "수학", "과학", "영어", "체육", "미술"],
    ["5", "음악", "사회", "역사", "정보", "기술"],
    ["6", "체육", "수학", "과학", "영어", "미술"],
    ["7", "음악", "사회", "역사", "데이터베이스", "컴퓨터구조"],
  ];

  const [tableData, setTableData] = useState(initialData);
  const [editedCells, setEditedCells] = useState<Set<string>>(new Set());

  const handleCellUpdate = (rowIndex: number, colIndex: number, newValue: string) => {
    const oldValue = tableData[rowIndex][colIndex];
    if (oldValue === newValue) return;

    let hasDuplicate = false;
    for (let i = 0; i < tableData.length; i++) {
      for (let j = 0; j < tableData[i].length; j++) {
        if (i === rowIndex && j === colIndex) continue;
        if (tableData[i][j] === oldValue) {
          hasDuplicate = true;
          break;
        }
      }
      if (hasDuplicate) break;
    }

    let updateAll = false;
    if (hasDuplicate) {
      updateAll = window.confirm(
        `"${oldValue}"이(가) 포함된 다른 셀도 모두 "${newValue}"(으)로 변경하시겠습니까?`
      );
    }
    setTableData(prevData =>
      prevData.map((row, i) =>
        row.map((cell, j) => {
          if (i === rowIndex && j === colIndex) {
            return newValue;
          }
          if (updateAll && cell === oldValue) {
            setEditedCells(prev => {
              const newSet = new Set(prev);
              newSet.add(`${i}-${j}`);
              return newSet;
            });
            return newValue;
          }
          return cell;
        })
      )
    );

    setEditedCells(prev => {
      const newSet = new Set(prev);
      newSet.add(`${rowIndex}-${colIndex}`);
      return newSet;
    });
  };

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
          backgroundColor: '#F3f4f6',
          minHeight: '100vh',
          fontFamily: 'Pretendard, sans-serif',
        }}
      >
        <div className="grid grid-cols-1 gap-0 mx-[580px] items-center justify-items-center p-8 pb-20 text-black">
          <Header />
          <Search />
          <Graph
            tableData={tableData}
            editedCells={editedCells}
            onCellUpdate={handleCellUpdate}
          />
        </div>
      </div>
    </>
  );
}

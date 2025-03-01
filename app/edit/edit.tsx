"use client";

import { useState } from 'react';
import { Graph } from '../graph/graph';

export default function Edit() {
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

    const hasDuplicate = tableData.some((row, i) =>
      row.some((cell, j) => (i !== rowIndex || j !== colIndex) && cell === oldValue)
    );

    let updateAll = false;
    if (hasDuplicate) {
      updateAll = window.confirm(
        `"${oldValue}"이(가) 포함된 다른 셀도 모두 "${newValue}"(으)로 변경하시겠습니까?`
      );
    }

    const newTableData = tableData.map((row, i) =>
      row.map((cell, j) => {
        if (i === rowIndex && j === colIndex) return newValue;
        if (updateAll && cell === oldValue) return newValue;
        return cell;
      })
    );

    const newEditedCells = new Set(editedCells);
    newEditedCells.add(`${rowIndex}-${colIndex}`);
    if (updateAll) {
      tableData.forEach((row, i) => {
        row.forEach((cell, j) => {
          if (cell === oldValue && !(i === rowIndex && j === colIndex)) {
            newEditedCells.add(`${i}-${j}`);
          }
        });
      });
    }

    setTableData(newTableData);
    setEditedCells(newEditedCells);
  };

  return (
    <Graph
      tableData={tableData}
      editedCells={editedCells}
      onCellUpdate={handleCellUpdate}
    />
  );
}

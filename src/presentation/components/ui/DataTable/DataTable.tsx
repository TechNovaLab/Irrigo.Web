import React from "react";
import { DataTableProps } from "@/presentation/components/ui/DataTable/DataTable.types";

export default function DataTable({ columns, children, className = "" }: DataTableProps) {
  return (
    <table className={`w-full border-collapse border border-gray-300 space-y-2 ${className}`}>
      <thead>
        <tr className="bg-gray-200">
          {columns.map((col, index) => (
            <th key={index} className="border border-gray-300 p-2">
              {col}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>{children}</tbody>
    </table>
  );
} 
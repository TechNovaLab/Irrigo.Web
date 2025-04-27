import React from "react";
import { DataTableRowProps } from "@/presentation/components/ui/DataTable/DataTable.types";

export default function DataTableRow({ id, columns, children, className = "" }: DataTableRowProps) {
  return (
    <tr className={className}>
      {columns.map((col, index) => (
        <td key={`${id}-${index}`} className="border border-gray-300 p-2">
          {col}
        </td>
      ))}
      {children && (
        <td className="border border-gray-300 p-2 text-center">{children}</td>
      )}
    </tr>
  );
} 
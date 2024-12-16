import React from "react";
import { TableRowProps } from "./Table.types";

export default function TableRow({ id, columns, children }: TableRowProps) {
  return (
    <tr className="hover:bg-gray-100">
      {columns.map((col, index) => (
        <td key={index} className="border border-gray-300 p-2">
          {col}
        </td>
      ))}
      {children && (
        <td className="border border-gray-300 p-2 text-center">{children}</td>
      )}
    </tr>
  );
}

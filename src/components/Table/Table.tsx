import { TableProps } from "./Table.types";

export default function Table({ columns, children }: TableProps) {
  return (
    <table className="w-full border-collapse border border-gray-300 space-y-2">
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

import React, { createContext, useContext, useState } from "react";
import { TableContextProps } from "./table.types";

const TableContext = createContext<TableContextProps | undefined>(undefined);

export const TableProvider = ({ children }: { children: React.ReactNode }) => {
  const [rows, setRows] = useState<any[]>([]);

  const addRow = () => {
    setRows((prev) => [
      ...prev,
      {
        ...Object.fromEntries(
          Object.keys(prev[0] || {}).map((key) => [key, null])
        ),
        id: Date.now(),
      },
    ]);
  };

  const deleteRow = (id: number) => {
    setRows((prev) => prev.filter((row) => row.id !== id));
  };

  const saveRow = (id: number, data: any) => {
    setRows((prev) =>
      prev.map((row) => (row.id === id ? { ...row, ...data } : row))
    );
  };

  return (
    <TableContext.Provider
      value={{ rows, addRow, deleteRow, saveRow, setRows }}
    >
      {children}
    </TableContext.Provider>
  );
};

export const useTableContext = () => {
  const context = useContext(TableContext);
  if (!context)
    throw new Error("useTableContext must be used within a TableProvider");
  return context;
};

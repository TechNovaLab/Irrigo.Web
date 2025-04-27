import { ReactNode } from "react";

export interface DataTableProps {
  columns: string[];
  children: ReactNode;
  className?: string;
}

export interface DataTableRowProps {
  id: number | string;
  columns: ReactNode[];
  children?: ReactNode;
  className?: string;
} 
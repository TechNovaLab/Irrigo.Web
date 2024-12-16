export interface TableProps {
  columns: string[];
  children: React.ReactNode;
}

export interface TableRowProps {
  id: number;
  columns: React.ReactNode[];
  children?: React.ReactNode;
}

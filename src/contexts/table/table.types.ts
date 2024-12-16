export interface TableContextProps {
  rows: any[];
  addRow: () => void;
  deleteRow: (id: number) => void;
  saveRow: (id: number, data: any) => void;
  setRows: React.Dispatch<React.SetStateAction<any[]>>;
}

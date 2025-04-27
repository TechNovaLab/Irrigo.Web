export interface MenuOption {
  id: number;
  label: string;
}

export interface MenuProps {
  options: MenuOption[];
  selectedOption?: string | number;
  onSelect: (id: number | string) => void;
  className?: string;
}

export interface MenuContextProps {
  addNew: () => void;
}

export interface MenuProviderProps {
  children: React.ReactNode;
  onAddNew: () => void;
} 
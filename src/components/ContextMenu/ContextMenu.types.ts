export interface ContextMenuProps {
  options: { id: number | string; label: string }[];
  selectedOption?: number | string | null; // Agregamos esta propiedad
  onSelect: (id: number | string) => void;
  onAddNew: () => void;
}

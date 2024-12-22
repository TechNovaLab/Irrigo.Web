import { ContextMenuOption } from "./ContextMenuOption";

export interface ContextMenuProps {
  options: ContextMenuOption[];
  selectedOption?: string | number;
  onSelect: (id: number) => void;
}

import { ReactNode } from "react";

export interface DropdownContextState {
  expandedGroups: Set<string>;
  toggleGroup: (groupId: string) => void;
}

export interface DropdownProviderProps {
  children: ReactNode;
}

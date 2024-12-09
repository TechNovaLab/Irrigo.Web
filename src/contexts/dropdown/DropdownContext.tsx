import { createContext, useContext, useState } from "react";
import { DropdownContextState, DropdownProviderProps } from "./dropdown.types";

const DropdownContext = createContext<DropdownContextState | undefined>(
  undefined
);

export const DropdownProvider: React.FC<DropdownProviderProps> = ({
  children,
}) => {
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(new Set());

  const toggleGroup = (groupId: string) => {
    setExpandedGroups((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(groupId)) {
        newSet.delete(groupId);
      } else {
        newSet.add(groupId);
      }
      return newSet;
    });
  };

  return (
    <DropdownContext.Provider value={{ expandedGroups, toggleGroup }}>
      {children}
    </DropdownContext.Provider>
  );
};

export const useDropdown = () => {
  const context = useContext(DropdownContext);
  if (!context) {
    throw new Error("useDropdown must be used within a DropdownProvider");
  }
  return context;
};

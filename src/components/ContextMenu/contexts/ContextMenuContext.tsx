import React, { createContext } from "react";
import { ContextMenuContextProps } from "../types/ContextMenuContextProps";
import { ContextMenuContextProviderProps } from "../types/ContextMenuContextProviderProps";

export const ContextMenuContext = createContext<ContextMenuContextProps | null>(null);

export const ContextMenuProvider = ({ children, onAddNew }: ContextMenuContextProviderProps) => {
  const addNew = () => onAddNew();

  return <ContextMenuContext.Provider value={{ addNew }}>{children}</ContextMenuContext.Provider>;
};

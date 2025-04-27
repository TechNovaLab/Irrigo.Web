import React, { createContext } from "react";
import { MenuContextProps, MenuProviderProps } from "@/presentation/components/ui/Menu/Menu.types";

export const MenuContext = createContext<MenuContextProps | null>(null);

export const MenuProvider = ({ children, onAddNew }: MenuProviderProps) => {
  const addNew = () => onAddNew();

  return <MenuContext.Provider value={{ addNew }}>{children}</MenuContext.Provider>;
}; 
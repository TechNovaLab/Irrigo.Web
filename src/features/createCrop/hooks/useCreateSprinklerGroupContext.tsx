import { useContext } from "react";
import { CreateSprinklerGroupContext } from "../contexts/CreateSprinklerGroupContext";
import { CreateSprinklerGroupContextProps } from "../types/CreateSprinklerGroupContextProps";

export const useCreateSprinklerGroupContext = (): CreateSprinklerGroupContextProps => {
  const context = useContext(CreateSprinklerGroupContext);
  if (!context) {
    throw new Error("useCreateSprinklerGroupContext must be used within a CreateSprinklerGroupProvider");
  }
  return context;
};

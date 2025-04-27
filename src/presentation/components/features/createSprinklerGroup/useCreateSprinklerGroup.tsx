import { useContext } from "react";
import { CreateSprinklerGroupContext } from "@/core/application/features/createSprinklerGroup/CreateSprinklerGroupContext";
import { CreateSprinklerGroupContextProps } from "@/core/application/features/createSprinklerGroup/CreateSprinklerGroupContextProps";

export const useCreateSprinklerGroup = (): CreateSprinklerGroupContextProps => {
  const context = useContext(CreateSprinklerGroupContext);
  if (!context) {
    throw new Error("useCreateSprinklerGroupContext must be used within a CreateSprinklerGroupProvider");
  }
  return context;
};

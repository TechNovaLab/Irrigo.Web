import { useContext } from "react";
import { CreatePlanterContext } from "@/core/application/features/createPlanter/CreatePlanterContext";
import { CreatePlanterContextProps } from "@/core/application/features/createPlanter/CreatePlanterContextProps";

export const useCreatePlanter = (): CreatePlanterContextProps => {
  const context = useContext(CreatePlanterContext);
  if (!context) {
    throw new Error("useCreatePlanterContext must be used within a CreatePlanterProvider");
  }
  return context;
};

import { useContext } from "react";
import { CreatePlanterContext } from "../contexts/CreatePlanterContext";
import { CreatePlanterContextProps } from "../types/CreatePlanterContextProps";

export const useCreatePlanterContext = (): CreatePlanterContextProps => {
  const context = useContext(CreatePlanterContext);
  if (!context) {
    throw new Error("useCreatePlanterContext must be used within a CreatePlanterProvider");
  }
  return context;
};

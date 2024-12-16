import { useContext } from "react";
import { CreateCropTypeContext } from "../contexts/CreateCropTypeContext";
import { CreateCropTypeContextProps } from "../types/CreateCropTypeContextProps";

export const useCreateCropTypeContext = (): CreateCropTypeContextProps => {
  const context = useContext(CreateCropTypeContext);
  if (!context) {
    throw new Error("useCreateCropTypeContext must be used within a CreateCropTypeProvider");
  }
  return context;
};

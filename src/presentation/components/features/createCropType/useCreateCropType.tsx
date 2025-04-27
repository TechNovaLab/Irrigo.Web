import { useContext } from "react";
import { CreateCropTypeContext } from "@/core/application/features/createCropType/CreateCropTypeContext";
import { CreateCropTypeContextProps } from "@/core/application/features/createCropType/CreateCropTypeContextProps";

export const useCreateCropType = (): CreateCropTypeContextProps => {
  const context = useContext(CreateCropTypeContext);
  if (!context) {
    throw new Error("useCreateCropTypeContext must be used within a CreateCropTypeProvider");
  }
  return context;
};

import { useContext } from "react";
import { CreateCropContext } from "@/core/application/features/createCrop/CreateCropContext";
import { CreateCropContextProps } from "@/core/application/features/createCrop/CreateCropContextProps";

export const useCreateCrop = (): CreateCropContextProps => {
  const context = useContext(CreateCropContext);
  if (!context) {
    throw new Error("useCreateCrop must be used within a CreateCropProvider");
  }
  return context;
}; 
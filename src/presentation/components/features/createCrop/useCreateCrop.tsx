import { useContext } from "react";
import { CreateCropContext } from "@/presentation/components/features/createCrop/CreateCropContext";
import { CreateCropContextProps } from "@/presentation/components/features/createCrop/CreateCropContextProps";

export const useCreateCrop = (): CreateCropContextProps => {
  const context = useContext(CreateCropContext);
  if (!context) {
    throw new Error("useCreateCrop must be used within a CreateCropProvider");
  }
  return context;
}; 
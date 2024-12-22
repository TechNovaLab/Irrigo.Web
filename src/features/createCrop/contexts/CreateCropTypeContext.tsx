import React, { useState, createContext } from "react";
import { CreateCropTypeContextProps } from "../types/CreateCropTypeContextProps";
import { CreateCropTypeData } from "../types/CreateCropTypeData";
import { cropTypeRepository } from "@/domain/repositories/cropTypeRepository";
import { ToastData } from "../types/ToastData";
import { OnCompleteCallback } from "../types/OnCompleteCallback";
import { OnCancelCallback } from "../types/OnCancelCallback";

export const CreateCropTypeContext = createContext<CreateCropTypeContextProps | null>(null);

export const CreateCropTypeProvider: React.FC<{
  children: React.ReactNode;
  onComplete: OnCompleteCallback<{ id: number; name: string }>;
  onCancel: OnCancelCallback;
}> = ({ children, onComplete, onCancel }) => {
  const [toast, setToast] = useState<ToastData>({ message: "", type: "" });
  const [formData, setFormData] = useState<CreateCropTypeData>({
    name: "",
    waterRequiredPerDay: 1,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSave = async () => {
    try {
      const payload = { ...formData };
      const response = await cropTypeRepository.createCropType(payload);
      const newRecord = { ...formData, id: response.id };

      setToast({
        message: `Registro del tipo de cultivo completado. ID: ${response.publicId}`,
        type: "success",
      });

      onComplete?.(newRecord);
    } catch (error) {
      setToast({
        message: `${error}`,
        type: "error",
      });
    }
  };

  const handleCancel = () => onCancel?.("cancel");

  return (
    <CreateCropTypeContext.Provider value={{ formData, toast, handleInputChange, handleSave, handleCancel }}>
      {children}
    </CreateCropTypeContext.Provider>
  );
};

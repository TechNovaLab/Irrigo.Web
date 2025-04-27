import React, { useState, createContext } from "react";
import { CreateCropTypeContextProps } from "@/core/application/features/createCropType/CreateCropTypeContextProps";
import { CreateCropTypeFormData } from "@/core/application/features/createCropType/CreateCropTypeFormData";
import { cropTypeRepository } from "@/core/infrastructure/repositories/cropTypeRepository";
import { Notification } from "@/core/domain/shared/Notification";
import { CompleteCallback } from "@/core/domain/shared/CompleteCallback";
import { CancelCallback } from "@/core/domain/shared/CancelCallback";

export const CreateCropTypeContext = createContext<CreateCropTypeContextProps | null>(null);

export const CreateCropTypeProvider: React.FC<{
  children: React.ReactNode;
  onComplete: CompleteCallback<{ id: number; name: string }>;
  onCancel: CancelCallback;
}> = ({ children, onComplete, onCancel }) => {
  const [toast, setToast] = useState<Notification>({ message: "", type: "" });
  const [formData, setFormData] = useState<CreateCropTypeFormData>({
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

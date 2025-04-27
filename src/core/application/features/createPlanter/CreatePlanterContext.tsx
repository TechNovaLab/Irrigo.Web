import React, { createContext, useState } from "react";
import { CreatePlanterContextProps } from "@/core/application/features/createPlanter/CreatePlanterContextProps";
import { CompleteCallback } from "@/core/domain/shared/CompleteCallback";
import { Notification } from "@/core/domain/shared/Notification";
import { CreatePlanterFormData } from "@/core/application/features/createPlanter/CreatePlanterFormData";
import { planterRepository } from "@/core/infrastructure/repositories/planterRepository";
import { CancelCallback } from "@/core/domain/shared/CancelCallback";

export const CreatePlanterContext = createContext<CreatePlanterContextProps | null>(null);

export const CreatePlanterProvider: React.FC<{
  children: React.ReactNode;
  onComplete: CompleteCallback<{ id: number; name: string }>;
  onCancel: CancelCallback;
}> = ({ children, onComplete, onCancel }) => {
  const [toast, setToast] = useState<Notification>({ message: "", type: "" });
  const [formData, setFormData] = useState<CreatePlanterFormData>({
    name: "",
    description: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev: CreatePlanterFormData) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSave = async () => {
    try {
      const payload = { ...formData };
      const response = await planterRepository.createPlanter(payload);
      const newRecord = { ...formData, id: response.id };

      setToast({
        message: `Registro de la jardinera completado. ID: ${response.publicId}`,
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
    <CreatePlanterContext.Provider value={{ formData, toast, handleInputChange, handleSave, handleCancel }}>
      {children}
    </CreatePlanterContext.Provider>
  );
};

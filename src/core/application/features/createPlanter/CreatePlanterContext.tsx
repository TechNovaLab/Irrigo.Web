import React, { createContext, useState } from "react";
import { CreatePlanterContextProps } from "./CreatePlanterContextProps";
import { OnCompleteCallback } from "../../../domain/shared/CompleteCallback";
import { ToastData } from "../../../domain/shared/Notification";
import { CreatePlanterData } from "./CreatePlanterFormData";
import { planterRepository } from "@/core/infrastructure/repositories/planterRepository";
import { OnCancelCallback } from "../../../domain/shared/CancelCallback";

export const CreatePlanterContext = createContext<CreatePlanterContextProps | null>(null);

export const CreatePlanterProvider: React.FC<{
  children: React.ReactNode;
  onComplete: OnCompleteCallback<{ id: number; name: string }>;
  onCancel: OnCancelCallback;
}> = ({ children, onComplete, onCancel }) => {
  const [toast, setToast] = useState<ToastData>({ message: "", type: "" });
  const [formData, setFormData] = useState<CreatePlanterData>({
    name: "",
    description: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
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

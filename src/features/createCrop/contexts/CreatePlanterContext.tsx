import React, { createContext, useState } from "react";
import { CreatePlanterContextProps } from "../types/CreatePlanterContextProps";
import { OnCompleteCallback } from "../types/OnCompleteCallback";
import { ToastData } from "../types/ToastData";
import { CreatePlanterData } from "../types/CreatePlanterData";
import { planterRepository } from "@/domain/repositories/planterRepository";

export const CreatePlanterContext = createContext<CreatePlanterContextProps | null>(null);

export const CreatePlanterProvider: React.FC<{ children: React.ReactNode; onComplete: OnCompleteCallback }> = ({
  children,
  onComplete,
}) => {
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

      setToast({
        message: `Registro de la jardinera completado. ID: ${response.publicId}`,
        type: "success",
      });

      onComplete?.("save", formData);
    } catch (error) {
      setToast({
        message: `${error}`,
        type: "error",
      });
    }
  };

  const handleCancel = () => onComplete?.("cancel");

  return (
    <CreatePlanterContext.Provider value={{ formData, toast, handleInputChange, handleSave, handleCancel }}>
      {children}
    </CreatePlanterContext.Provider>
  );
};

import React, { createContext, useState } from "react";
import { CreateSprinklerGroupContextProps } from "../types/CreateSprinklerGroupContextProps";
import { OnCompleteCallback } from "../types/OnCompleteCallback";
import { ToastData } from "../types/ToastData";
import { CreateSprinklerGroupData } from "../types/CreateSprinklerGroupData";
import { sprinklerGroupRepository } from "@/domain/repositories/sprinklerGroupRepository";
import { OnCancelCallback } from "../types/OnCancelCallback";

export const CreateSprinklerGroupContext = createContext<CreateSprinklerGroupContextProps | null>(null);

export const CreateSprinklerGroupProvider: React.FC<{
  children: React.ReactNode;
  onComplete: OnCompleteCallback<{ id: number; name: string }>;
  onCancel: OnCancelCallback;
}> = ({ children, onComplete, onCancel }) => {
  const [toast, setToast] = useState<ToastData>({ message: "", type: "" });
  const [formData, setFormData] = useState<CreateSprinklerGroupData>({
    name: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSave = async () => {
    try {
      const payload = { ...formData };
      const response = await sprinklerGroupRepository.createGroup(payload);
      const newRecord = { ...formData, id: response.id };

      setToast({
        message: `Registro del gtupo de aspersores completado. ID: ${response.publicId}`,
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
    <CreateSprinklerGroupContext.Provider value={{ formData, toast, handleInputChange, handleSave, handleCancel }}>
      {children}
    </CreateSprinklerGroupContext.Provider>
  );
};

import React, { createContext, useState } from "react";
import { CreateSprinklerGroupContextProps } from "../types/CreateSprinklerGroupContextProps";
import { OnCompleteCallback } from "../types/OnCompleteCallback";
import { ToastData } from "../types/ToastData";
import { CreateSprinklerGroupData } from "../types/CreateSprinklerGroupData";
import { sprinklerGroupRepository } from "@/domain/repositories/sprinklerGroupRepository";

export const CreateSprinklerGroupContext = createContext<CreateSprinklerGroupContextProps | null>(null);

export const CreateSprinklerGroupProvider: React.FC<{ children: React.ReactNode; onComplete: OnCompleteCallback }> = ({
  children,
  onComplete,
}) => {
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

      setToast({
        message: `Registro del gtupo de aspersores completado. ID: ${response.publicId}`,
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
    <CreateSprinklerGroupContext.Provider value={{ formData, toast, handleInputChange, handleSave, handleCancel }}>
      {children}
    </CreateSprinklerGroupContext.Provider>
  );
};

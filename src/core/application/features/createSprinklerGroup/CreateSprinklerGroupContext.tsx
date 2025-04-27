import React, { createContext, useState } from "react";
import { CreateSprinklerGroupContextProps } from "./CreateSprinklerGroupContextProps";
import { CompleteCallback } from "@/core/domain/shared/CompleteCallback";
import { Notification } from "@/core/domain/shared/Notification";
import { CreateSprinklerGroupFormData } from "./CreateSprinklerGroupFormData";
import { CancelCallback } from "@/core/domain/shared/CancelCallback";
import { sprinklerGroupRepository } from "@/core/infrastructure/repositories/sprinklerGroupRepository";

export const CreateSprinklerGroupContext = createContext<CreateSprinklerGroupContextProps | null>(null);

export const CreateSprinklerGroupProvider: React.FC<{
  children: React.ReactNode;
  onComplete: CompleteCallback<{ id: number; name: string }>;
  onCancel: CancelCallback;
}> = ({ children, onComplete, onCancel }) => {
  const [toast, setToast] = useState<Notification>({ message: "", type: "" });
  const [formData, setFormData] = useState<CreateSprinklerGroupFormData>({
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

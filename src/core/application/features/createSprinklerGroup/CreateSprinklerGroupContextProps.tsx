import { CreateSprinklerGroupFormData } from "@/core/application/features/createSprinklerGroup/CreateSprinklerGroupFormData";
import { Notification } from "@/core/domain/shared/Notification";

export interface CreateSprinklerGroupContextProps {
  formData: CreateSprinklerGroupFormData;
  toast: Notification;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSave: () => Promise<void>;
  handleCancel: () => void;
}

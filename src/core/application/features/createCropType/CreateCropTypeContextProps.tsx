import { CreateCropTypeFormData } from "./CreateCropTypeFormData";
import { Notification } from "@/core/domain/shared/Notification";

export interface CreateCropTypeContextProps {
  formData: CreateCropTypeFormData;
  toast: Notification;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSave: () => Promise<void>;
  handleCancel: () => void;
}


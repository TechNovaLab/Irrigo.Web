import { CreatePlanterFormData } from "@/core/application/features/createPlanter/CreatePlanterFormData";
import { Notification } from "@/core/domain/shared/Notification";

export interface CreatePlanterContextProps {
  formData: CreatePlanterFormData;
  toast: Notification;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleSave: () => Promise<void>;
  handleCancel: () => void;
}

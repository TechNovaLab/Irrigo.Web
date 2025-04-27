import { CreatePlanterData } from "./CreatePlanterFormData";
import { ToastData } from "../../../domain/shared/Notification";

export interface CreatePlanterContextProps {
  formData: CreatePlanterData;
  toast: ToastData;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleSave: () => Promise<void>;
  handleCancel: () => void;
}

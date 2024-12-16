import { CreatePlanterData } from "./CreatePlanterData";
import { ToastData } from "./ToastData";

export interface CreatePlanterContextProps {
  formData: CreatePlanterData;
  toast: ToastData;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleSave: () => Promise<void>;
  handleCancel: () => void;
}

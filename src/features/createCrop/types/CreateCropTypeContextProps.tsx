import { CreateCropTypeData } from "./CreateCropTypeData";
import { ToastData } from "./ToastData";

export interface CreateCropTypeContextProps {
  formData: CreateCropTypeData;
  toast: ToastData;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSave: () => Promise<void>;
  handleCancel: () => void;
}


import { CreateSprinklerGroupData } from "./CreateSprinklerGroupData";
import { ToastData } from "./ToastData";


export interface CreateSprinklerGroupContextProps {
  formData: CreateSprinklerGroupData;
  toast: ToastData;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSave: () => Promise<void>;
  handleCancel: () => void;
}

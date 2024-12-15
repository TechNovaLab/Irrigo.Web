import { LoginFormData } from "./LoginFormData";
import { ToastData } from "./ToastData";

export interface LoginContextProps {
  formData: LoginFormData;
  toast: ToastData;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: () => Promise<void>;
}

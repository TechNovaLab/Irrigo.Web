import { SignupFormData } from "./SignupFormData";
import { ToastData } from "./ToastData";

export interface SignupContextProps {
  formData: SignupFormData;
  toast: ToastData;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (isGuest: boolean) => Promise<void>;
}

import { LoginFormData } from "@/core/application/features/login/LoginFormData";
import { Notification } from "@/core/domain/shared/Notification";

export interface LoginContextProps {
  formData: LoginFormData;
  toast: Notification;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: () => Promise<void>;
}

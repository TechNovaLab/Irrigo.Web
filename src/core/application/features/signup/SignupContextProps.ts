import { SignupFormData } from "@/core/application/features/signup/SignupFormData";
import { Notification } from "@/core/domain/shared/Notification";

export interface SignupContextProps {
  formData: SignupFormData;
  toast: Notification;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (isGuest: boolean) => Promise<void>;
}

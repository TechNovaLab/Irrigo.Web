export interface SignupFormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface ToastData {
  message: string;
  type: "success" | "error" | "";
}

export interface SignupContextProps {
  formData: SignupFormData;
  toast: ToastData;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (isGuest: boolean) => Promise<void>;
}

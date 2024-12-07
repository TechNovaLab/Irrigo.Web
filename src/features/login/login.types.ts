export interface UserIdentity {
  publicId: string;
  firstName: string;
  lastName: string;
  email: string;
  role: number;
  token: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface LoginFormData {
  email: string;
  password: string;
}

export interface ToastData {
  message: string;
  type: "success" | "error" | "";
}

export interface LoginContextProps {
  formData: LoginFormData;
  toast: ToastData;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: () => Promise<void>;
}

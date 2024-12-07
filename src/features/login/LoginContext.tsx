"use client";

import { createContext, useContext, useState } from "react";
import { LoginContextProps, LoginFormData, ToastData } from "./login.types";
import { useAuth } from "@/contexts/auth/AuthContext";

const LoginContext = createContext<LoginContextProps | undefined>(undefined);

export const LoginProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { login } = useAuth();
  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
  });

  const [toast, setToast] = useState<ToastData>({ message: "", type: "" });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async () => {
    try {
      const payload = { ...formData };
      await login(payload.email, payload.password);

      setToast({
        message: `Login completado correctamente.`,
        type: "success",
      });

      setFormData({
        ...formData,
        email: payload.email,
        password: payload.password,
      });
    } catch (error) {
      setToast({
        message: `Error al registrar: ${error}`,
        type: "error",
      });
    }
  };

  return (
    <LoginContext.Provider
      value={{ formData, toast, handleInputChange, handleSubmit }}
    >
      {children}
    </LoginContext.Provider>
  );
};

export const useLoginContext = (): LoginContextProps => {
  const context = useContext(LoginContext);
  if (!context) {
    throw new Error("useLoginContext must be used within a LoginProvider");
  }
  return context;
};

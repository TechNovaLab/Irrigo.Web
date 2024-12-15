"use client";

import { createContext } from "react";
import { LoginContextProps } from "../types/LoginContextProps";
import { useAuth } from "@/contexts/auth/AuthContext";
import { useState } from "react";
import { LoginFormData } from "../types/LoginFormData";
import { ToastData } from "../types/ToastData";

export const LoginContext = createContext<LoginContextProps | undefined>(undefined);
export const LoginProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
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
    <LoginContext.Provider value={{ formData, toast, handleInputChange, handleSubmit }}>
      {children}
    </LoginContext.Provider>
  );
};

"use client";

import { createContext } from "react";
import { SignupContextProps } from "../types/SignupContextProps";
import React, { useState } from "react";
import { useAuth } from "@/contexts/auth/AuthContext";
import { userRepository } from "@/domain/repositories/userRepository";
import { SignupFormData } from "../types/SignupFormData";
import { generateGuestCredentials } from "@/utils/guestHelpers";
import { ToastData } from "../types/ToastData";

export const SignupContext = createContext<SignupContextProps | undefined>(undefined);
export const SignupProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { login } = useAuth();
  const [formData, setFormData] = useState<SignupFormData>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const [toast, setToast] = useState<ToastData>({ message: "", type: "" });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (isGuest: boolean) => {
    try {
      let payload = { ...formData };

      if (isGuest) {
        payload = generateGuestCredentials();
      }

      const response = await userRepository.register(payload);
      await login(payload.email, payload.password);

      setToast({
        message: `Registro ${isGuest ? "como invitado" : ""} exitoso. ID: ${response.id}`,
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
    <SignupContext.Provider value={{ formData, toast, handleInputChange, handleSubmit }}>
      {children}
    </SignupContext.Provider>
  );
};

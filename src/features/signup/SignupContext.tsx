"use client";

import React, { createContext, useContext, useState } from "react";
import { generateGuestCredentials } from "@/utils/guestHelpers";
import { SignupContextProps, SignupFormData, ToastData } from "./types";
import { registerUser } from "./signupService";

const SignupContext = createContext<SignupContextProps | undefined>(undefined);

export const SignupProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
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

      const response = await registerUser(payload);

      setToast({
        message: `Registro ${isGuest ? "como invitado" : ""} exitoso. ID: ${
          response.Id
        }`,
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
    <SignupContext.Provider
      value={{ formData, toast, handleInputChange, handleSubmit }}
    >
      {children}
    </SignupContext.Provider>
  );
};

export const useSignupContext = (): SignupContextProps => {
  const context = useContext(SignupContext);
  if (!context) {
    throw new Error("useSignupContext must be used within a SignupProvider");
  }
  return context;
};

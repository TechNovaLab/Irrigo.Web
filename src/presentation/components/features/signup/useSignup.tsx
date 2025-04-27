import { useContext } from "react";
import { SignupContextProps } from "@/core/application/features/signup/SignupContextProps";
import { SignupContext } from "@/core/application/features/signup/SignupContext";

export const useSignup = (): SignupContextProps => {
  const context = useContext(SignupContext);
  if (!context) {
    throw new Error("useSignupContext must be used within a SignupProvider");
  }
  return context;
};

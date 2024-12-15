import { useContext } from "react";
import { SignupContextProps } from "../types/SignupContextProps";
import { SignupContext } from "../contexts/SignupContext";

export const useSignupContext = (): SignupContextProps => {
  const context = useContext(SignupContext);
  if (!context) {
    throw new Error("useSignupContext must be used within a SignupProvider");
  }
  return context;
};

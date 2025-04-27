import { useContext } from "react";
import { LoginContext } from "@/core/application/features/login/LoginContext";
import { LoginContextProps } from "@/core/application/features/login/LoginContextProps";

export const useLogin = (): LoginContextProps => {
  const context = useContext(LoginContext);
  if (!context) {
    throw new Error("useLoginContext must be used within a LoginProvider");
  }
  return context;
};

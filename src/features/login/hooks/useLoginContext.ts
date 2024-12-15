import { useContext } from "react";
import { LoginContext } from "../contexts/LoginContext";
import { LoginContextProps } from "../types/LoginContextProps";

export const useLoginContext = (): LoginContextProps => {
  const context = useContext(LoginContext);
  if (!context) {
    throw new Error("useLoginContext must be used within a LoginProvider");
  }
  return context;
};

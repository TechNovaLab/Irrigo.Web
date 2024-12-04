import React, { createContext, useContext, useEffect, useState } from "react";
import { AuthContextProps } from "./types";
import { UserIdentity } from "@/features/login/types";
import { clearSession, getSession, saveSession } from "@/utils/sessionStorage";
import { loginService } from "@/features/login/loginService";

const AuthContext = createContext<AuthContextProps | undefined>(undefined);
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<UserIdentity | null>(getSession);

  useEffect(() => {
    if (user) saveSession(user);
  }, [user]);

  const login = async (email: string, password: string) => {
    const data = await loginService({ email, password });
    setUser(data);
  };

  const logout = () => {
    setUser(null);
    clearSession();
  };

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated: !!user, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};

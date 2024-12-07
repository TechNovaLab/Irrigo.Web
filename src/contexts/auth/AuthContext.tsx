import React, { createContext, useContext, useEffect, useState } from "react";
import { AuthContextProps } from "./auth.types";
import { UserIdentity } from "@/features/login/login.types";
import { cookieStorageManager } from "@/utils";
import { loginUser } from "@/features/login";

const AuthContext = createContext<AuthContextProps | undefined>(undefined);
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<UserIdentity | null>(null);
  const storage_key = "user_identity";

  useEffect(() => {
    const data = cookieStorageManager.get(storage_key);
    setUser(data ?? null);
  }, []);

  // useEffect(() => {
  //   if (user) {
  //     cookieStorageManager.set(storage_key, user, { maxAge: 60 * 60 * 24 * 1 });
  //   }
  // }, [user]);

  const login = async (email: string, password: string) => {
    const data = await loginUser({ email, password });
    setUser(data);
  };

  const logout = () => {
    setUser(null);
    cookieStorageManager.remove(storage_key);
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

  if (!context)
    throw new Error("useAuth debe usarse dentro de un AuthProvider");

  return context;
};

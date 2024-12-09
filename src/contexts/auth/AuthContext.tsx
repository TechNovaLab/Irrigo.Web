import React, { createContext, useContext, useEffect, useState } from "react";
import { AuthContextProps } from "./auth.types";
import { UserIdentity } from "@/features/login/login.types";
import { cookieStorageManager } from "@/utils";
import { loginUser } from "@/features/login";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext<AuthContextProps | undefined>(undefined);
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<UserIdentity | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const storage_key = "user_identity";

  const isTokenValid = (token: string): boolean => {
    try {
      const { exp } = jwtDecode<{ exp: number }>(token);
      console.log("IsTokenValid", Date.now() < exp * 1000);
      return Date.now() < exp * 1000;
    } catch (error) {
      console.log("Token error", error);
      return false;
    }
  };

  useEffect(() => {
    const data = cookieStorageManager.get(storage_key);
    if (data && isTokenValid(data.token)) {
      setUser(data);
      setIsAuthenticated(true);
    } else {
      setUser(null);
      setIsAuthenticated(false);
    }
    setIsInitialized(true);
  }, []);

  const login = async (email: string, password: string) => {
    const data = await loginUser({ email, password });
    if (data && isTokenValid(data.token)) {
      setUser(data);
      setIsAuthenticated(true);
    } else {
      throw new Error("Token inválido o expirado");
    }
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    cookieStorageManager.remove(storage_key);
  };

  return (
    <AuthContext.Provider
      value={{ user, isInitialized, isAuthenticated, login, logout }}
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

import React, { createContext, useContext, useEffect, useState } from "react";
import { AuthContextProps } from "./auth.types";
import { jwtDecode } from "jwt-decode";
import { userRepository } from "@/domain/repositories/userRepository";
import { identityManager } from "@/utils";
import { UserIdentity } from "@/domain/models/UserIdentity";

const AuthContext = createContext<AuthContextProps | undefined>(undefined);
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [userIdentity, setUserIdentity] = useState<UserIdentity | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const isTokenValid = (token: string): boolean => {
    try {
      const { exp } = jwtDecode<{ exp: number }>(token);
      return Date.now() < exp * 1000;
    } catch (error) {
      console.log("Token error", error);
      return false;
    }
  };

  useEffect(() => {
    const identity = identityManager.getUserIdentity();
    if (identity && isTokenValid(identity.token)) {
      setUserIdentity(identity);
      setIsAuthenticated(true);
    } else {
      setUserIdentity(null);
      setIsAuthenticated(false);
    }
    setIsInitialized(true);
  }, []);

  const login = async (email: string, password: string) => {
    const identity = await userRepository.login({ email, password });
    if (identity) {
      setUserIdentity(identity);
      setIsAuthenticated(true);
      identityManager.setUserIdentity(identity);
    } else {
      throw new Error("Token inválido o expirado");
    }
  };

  const logout = () => {
    setUserIdentity(null);
    setIsAuthenticated(false);
    identityManager.removeUserIdentity();
  };

  return (
    <AuthContext.Provider value={{ userIdentity, isInitialized, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) throw new Error("useAuth debe usarse dentro de un AuthProvider");

  return context;
};

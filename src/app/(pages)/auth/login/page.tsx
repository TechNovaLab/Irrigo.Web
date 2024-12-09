"use client";

import { LoginProvider } from "@/features/login/LoginContext";
import { LoginForm } from "@/features/login";
import { useAuth } from "@/contexts/auth/AuthContext";
import { useEffect } from "react";
import { redirect } from "next/navigation";

const Login = () => {
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      redirect("/main");
    }
  }, [isAuthenticated]);

  return (
    <LoginProvider>
      <LoginForm />
    </LoginProvider>
  );
};

export default Login;

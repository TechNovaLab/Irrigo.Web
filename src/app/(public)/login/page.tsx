"use client";

import { LoginForm, LoginProvider } from "@/presentation/components/features";
import { useAuth } from "@/presentation/contexts/auth/AuthContext";
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

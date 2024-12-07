"use client";

import { SignupProvider } from "@/features/signup/SignupContext";
import { SignupForm } from "@/features/signup";
import { useAuth } from "@/contexts/auth/AuthContext";
import { useEffect } from "react";
import { redirect } from "next/navigation";

const Signup = () => {
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      redirect("/main");
    }
  }, [isAuthenticated]);

  return (
    <SignupProvider>
      <SignupForm />
    </SignupProvider>
  );
};

export default Signup;

"use client";

import { useAuth } from "@/presentation/contexts/auth/AuthContext";
import { useEffect } from "react";
import { redirect } from "next/navigation";
import { SignupProvider, SignupForm } from "@/presentation/components/features";

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

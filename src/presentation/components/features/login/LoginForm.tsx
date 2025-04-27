"use client";

import React from "react";
import { useLogin } from "@/presentation/components/features/login/useLogin";
import { Input, InputPassword } from "@/presentation/components/ui/Input";
import styles from "./LoginForm.module.css";
import Snackbar from "@/presentation/components/ui/Snackbar/Snackbar";

export default function LoginForm() {
  const { formData, toast, handleInputChange, handleSubmit } = useLogin();

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-white-900">
          Inicia sesión en tu cuenta
        </h2>
      </div>
      <div className={styles.loginForm}>
        {toast.message && <Snackbar message={toast.message} type={toast.type as "success" | "error" | "warning"} />}
        <form className="space-y-4">
          <Input label="Email" name="email" value={formData.email} onChange={handleInputChange} />
          <InputPassword label="Password" name="password" value={formData.password} onChange={handleInputChange} />
          <button type="button" className={styles.primary} onClick={() => handleSubmit()}>
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

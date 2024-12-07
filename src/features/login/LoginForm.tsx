"use client";

import React from "react";
import { useLoginContext } from "./LoginContext";
import { Input, InputPassword } from "@/components/Input";
import Toast from "@/components/Toast/Toast";
import styles from "./LoginForm.module.css";

export default function LoginForm() {
  const { formData, toast, handleInputChange, handleSubmit } =
    useLoginContext();

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-white-900">
          Inicia sesión en tu cuenta
        </h2>
      </div>
      <div className={styles.loginForm}>
        {toast.message && <Toast message={toast.message} type={toast.type} />}
        <form className="space-y-4">
          <Input
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
          />
          <InputPassword
            label="Password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
          />
          <button
            type="button"
            className={styles.primary}
            onClick={() => handleSubmit()}
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

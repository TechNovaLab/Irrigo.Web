"use client";

import React from "react";
import { useSignupContext } from "@/features/signup/SignupContext";
import { Input, InputPassword } from "@/components/Input";
import Toast from "@/components/Toast/Toast";
import styles from "./SignupForm.module.css";

export default function SignupForm() {
  const { formData, toast, handleInputChange, handleSubmit } =
    useSignupContext();

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-white-900">
          Inicia sesión en tu cuenta
        </h2>
      </div>
      <div className={styles.signupForm}>
        {toast.message && <Toast message={toast.message} type={toast.type} />}
        {/* <form className={styles.customSpace}> */}
        <form className="space-y-4">
          <Input
            label="Nombre"
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
          />
          <Input
            label="Apellido"
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
          />
          <Input
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleInputChange}
          />
          <InputPassword
            label="Contraseña"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
          />
          <div className="flex justify-between">
            <button
              type="button"
              className={styles.primary}
              onClick={() => handleSubmit(false)}
            >
              Registrarse
            </button>
            <button
              type="submit"
              className={styles.secondary}
              onClick={() => handleSubmit(true)}
            >
              Continuar como invitado
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

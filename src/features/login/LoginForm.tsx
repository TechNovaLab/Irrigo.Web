"use client";

import React, { useState } from "react";
import styles from "./LoginForm.module.css";
import { Input, InputPassword } from "@/components/Input";
import { useAuth } from "@/contexts/auth/AuthContext";

export const LoginForm: React.FC = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password);
    } catch (err) {
      setError(`Invalid credentials: ${err}`);
    }
  };
  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-white-900">
          Inicia sesión en tu cuenta
        </h2>
      </div>
      <div className={styles.loginForm} onSubmit={handleSubmit}>
        <form className="space-y-4">
          <Input
            label="Email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <InputPassword
            label="Password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <p className={styles.error}>{error}</p>}
          <button type="submit" className={styles.primary}>
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

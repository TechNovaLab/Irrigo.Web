"use client";

import React, { useState } from "react";
import { InputPasswordProps } from "./Input.types";

const InputPassword: React.FC<InputPasswordProps> = ({
  label,
  name,
  value,
  onChange,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div>
      <div className="flex items-center justify-between">
        <label
          htmlFor="password"
          className="block text-sm/6 font-medium text-white-900"
        >
          {label}
        </label>
        {/* <div className="text-sm">
            <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">Forgot password?</a>
          </div> */}
      </div>
      <div className="mt-2 relative">
        <input
          id="password"
          type={showPassword ? "text" : "password"}
          name={name}
          value={value}
          placeholder={label}
          className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
          onChange={onChange}
          autoComplete="current-password"
          required
        />
        <button
          type="button"
          className="absolute top-2 right-2 text-sm text-gray-900"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? "Ocultar" : "Mostrar"}
        </button>
      </div>
    </div>
  );
};

export default InputPassword;

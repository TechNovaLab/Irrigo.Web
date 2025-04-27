import React from "react";
import { TextFieldProps } from "@/presentation/components/ui/TextField/TextField.types";

export const TextField: React.FC<TextFieldProps> = ({
  label,
  name,
  type = "text",
  value,
  onChange,
  placeholder,
  required = false,
  autoComplete = "off",
  error,
  helperText,
  className = "",
}) => {
  return (
    <div className={`space-y-2 ${className}`}>
      {label && (
        <label
          htmlFor={name}
          className="block text-sm font-medium text-gray-700"
        >
          {label}
        </label>
      )}
      <div>
        <input
          id={name}
          type={type}
          name={name}
          value={value}
          placeholder={placeholder || label}
          className={`block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm ${
            error ? "border-red-500" : ""
          }`}
          onChange={onChange}
          autoComplete={autoComplete}
          required={required}
          aria-invalid={error ? "true" : "false"}
          aria-describedby={error ? `${name}-error` : undefined}
        />
      </div>
      {(error || helperText) && (
        <p
          id={`${name}-error`}
          className={`text-sm ${error ? "text-red-600" : "text-gray-500"}`}
        >
          {error || helperText}
        </p>
      )}
    </div>
  );
};

export default TextField; 
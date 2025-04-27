import { ChangeEvent } from "react";

export interface TextFieldProps {
  label?: string;
  name: string;
  type?: "text" | "email" | "password" | "number" | "tel" | "url";
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  required?: boolean;
  autoComplete?: string;
  error?: string;
  helperText?: string;
  className?: string;
} 
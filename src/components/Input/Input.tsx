import React from "react";
import { InputProps } from "./Input.types";

const Input: React.FC<InputProps> = ({
  label,
  name,
  type = "text",
  value,
  onChange,
}) => {
  return (
    <div>
      <label
        htmlFor="email"
        className="block text-sm/6 font-medium text-white-900"
      >
        {label}
      </label>
      <div className="mt-2">
        <input
          id="email"
          type={type}
          name={name}
          value={value}
          placeholder={label}
          className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
          onChange={onChange}
          autoComplete="email"
          required
        />
      </div>
    </div>
  );
};

export default Input;

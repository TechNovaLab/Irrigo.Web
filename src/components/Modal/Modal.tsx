import React from "react";
import { ModalProps } from "./Modal.types";

export default function Modal({
  isOpen,
  title,
  onClose,
  children,
}: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative bg-white p-6 rounded-md shadow-lg w-96">
        <button
          className="absolute top-1 right-1 w-8 h-8 flex items-center justify-center border rounded text-gray-500 hover:text-gray-700"
          onClick={onClose}
          aria-label="Cerrar"
        >
          &times;
        </button>
        <h2 className="text-lg font-semibold mb-4">{title}</h2>
        <div>{children}</div>
      </div>
    </div>
  );
}

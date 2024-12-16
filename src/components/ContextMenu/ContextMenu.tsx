import React, { useState, useRef, useEffect } from "react";
import { ContextMenuProps } from "./ContextMenu.types";

export default function ContextMenu({
  options,
  selectedOption = null,
  onSelect,
  onAddNew,
}: ContextMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  const toggleMenu = () => setIsOpen((prev) => !prev);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative inline-block">
      <button
        onClick={toggleMenu}
        className="p-2 bg-gray-200 rounded-md hover:bg-gray-300"
      >
        {selectedOption
          ? options.find((option) => option.id === selectedOption)?.label ||
            "Seleccionar"
          : "Seleccionar"}
      </button>

      {isOpen && (
        <div
          ref={menuRef}
          className="absolute z-10 w-48 mt-2 bg-white border border-gray-300 rounded-md shadow-lg"
        >
          <div className="px-4 py-2 bg-gray-100 border-b border-gray-300">
            <button
              onClick={() => {
                onAddNew();
                setIsOpen(false);
              }}
              className="text-blue-500 hover:text-blue-600 flex items-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                className="w-5 h-5 mr-2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4v16m8-8H4"
                />
              </svg>
              Añadir nuevo
            </button>
          </div>

          <ul className="py-2">
            {options.map((option) => (
              <li
                key={option.id}
                onClick={() => {
                  onSelect(option.id);
                  setIsOpen(false);
                }}
                className={`px-4 py-2 cursor-pointer hover:bg-gray-100 ${
                  selectedOption === option.id
                    ? "bg-blue-100 font-semibold"
                    : ""
                }`}
              >
                {option.label}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

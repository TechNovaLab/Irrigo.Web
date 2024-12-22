import React, { useState, useRef, useEffect, useContext } from "react";
import { ContextMenuProps } from "../types/ContextMenuProps";
import { ContextMenuContext } from "../contexts/ContextMenuContext";

export default function ContextMenu({ options, selectedOption, onSelect }: ContextMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const { addNew } = useContext(ContextMenuContext)!;
  const toggleMenu = () => setIsOpen((prev) => !prev);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block">
      <button onClick={toggleMenu} className="p-2 bg-gray-200 rounded-md hover:bg-gray-300">
        {selectedOption
          ? options.find((option) => option.id === selectedOption)?.label || "Seleccionar"
          : "Seleccionar"}
      </button>

      {isOpen && (
        <div ref={menuRef} className="absolute z-10 w-48 mt-2 bg-white border rounded-md shadow-lg">
          <div className="px-4 py-2 bg-gray-100 border-b">
            <button onClick={addNew} className="text-blue-500 hover:text-blue-600 flex items-center">
              <span className="mr-2">+</span> Añadir nuevo
            </button>
          </div>
          <ul>
            {options.map((option) => (
              <li
                key={option.id}
                onClick={() => {
                  onSelect(option.id);
                  setIsOpen(false);
                }}
                className={`px-4 py-2 hover:bg-gray-100 cursor-pointer ${
                  selectedOption === option.id ? "bg-blue-100 font-semibold" : ""
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

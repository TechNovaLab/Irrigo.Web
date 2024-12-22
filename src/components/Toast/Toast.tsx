import React from "react";

export default function Toast({
  message,
  type,
  linkText,
  onLinkClick,
}: {
  message: string;
  type: string;
  linkText?: string;
  onLinkClick?: () => void;
}) {
  const bgColor =
    type === "success"
      ? "bg-green-500"
      : type === "error"
      ? "bg-red-500"
      : "bg-yellow-500";

  return (
    <div
      className={`fixed bottom-4 right-4 p-4 text-white rounded-md shadow-lg ${bgColor}`}
    >
      <p>{message}</p>
      {type === "warning" && linkText && onLinkClick && (
        <button
          onClick={onLinkClick}
          className="underline text-blue-200 hover:text-blue-300 ml-2"
        >
          {linkText}
        </button>
      )}
    </div>
  );
}

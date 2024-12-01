import React from "react";

export default function Toast({
  message,
  type,
}: {
  message: string;
  type: string;
}) {
  const bgColor = type === "success" ? "bg-green-500" : "bg-red-500";
  return (
    <div
      className={`fixed bottom-4 right-4 p-4 text-white rounded-md shadow-lg ${bgColor}`}
    >
      {message}
    </div>
  );
}

"use client";

import React, { useEffect } from "react";
import { redirect } from "next/navigation";
import { useAuth } from "@/contexts/auth/AuthContext";
import Sidebar from "@/components/Sidebar/Sidebar";

export default function DashboradLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { isInitialized, isAuthenticated, logout } = useAuth();
  useEffect(() => {
    if (isInitialized && !isAuthenticated) {
      logout();
      redirect("/auth/login");
    }
  }, [isInitialized, isAuthenticated, logout]);

  return (
    <div className="flex h-screen bg-white text-[#1f1633] dark:text-white">
      <Sidebar></Sidebar>
      <main className="flex flex-col flex-grow">
        <header className="w-full h-[75px] bg-gray-100 border-b border-gray-200 text-gray-600 flex items-center px-8">
          <h1 className="text-xl font-semibold">Dashboard</h1>
        </header>

        <div className="flex-grow p-8 gap-5 text-gray-600">{children}</div>

        <footer className="w-full h-[50px] border-t border-gray-200 bg-gray-100 text-gray-600 flex items-center justify-center">
          &copy; {new Date().getFullYear()} TechNovaLab · Irrigo. Todos los
          derechos reservados.
        </footer>
      </main>
    </div>
  );
}

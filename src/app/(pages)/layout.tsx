import React from "react";
import Link from "next/link";

interface PagesLayoutProps {
  children: React.ReactNode;
}

const PagesLayout: React.FC<PagesLayoutProps> = ({ children }) => {
  return (
    <div
      className={`flex flex-col min-h-screen bg-white text-[#1f1633] dark:bg-[#1f1633] dark:text-white transition-colors duration-300`}
    >
      <header className="w-full border-b border-indigo-200 dark:border-indigo-700">
        <div className="max-w-5xl mx-auto px-4 flex justify-between items-center h-16">
          <div className="text-3xl font-bold tracking-tight text-slate-200 sm:text-3xl">
            TechNovaLab/Irrigo
          </div>
          <nav className="flex space-x-6">
            <Link href="/signup">
              <button className="px-4 py-2 hover:bg-[#6a5fc1] text-xs text-white rounded hover:bg-opacity-90 transition">
                REGISTRARSE
              </button>
            </Link>
            <Link href="/auth/login">
              <button className="px-4 py-2 hover:bg-[#6a5fc1] text-xs text-white rounded hover:bg-opacity-90 transition">
                SING IN
              </button>
            </Link>
            <button className="px-4 py-2 bg-[#6a5fc1] text-xs text-white rounded hover:bg-opacity-90 transition">
              CONTINUAR COMO INVITADO
            </button>
          </nav>
        </div>
      </header>

      <main
        id="pagesMain"
        className="flex-grow w-full max-w-4xl mx-auto px-4 py-8"
      >
        {children}
      </main>

      <footer className="w-full border-t border-indigo-100 dark:border-indigo-900">
        <div className="max-w-4xl mx-auto px-4 py-4 text-center text-sm">
          &copy; {new Date().getFullYear()} TechNovaLab · Irrigo. Todos los
          derechos reservados.
        </div>
      </footer>
    </div>
  );
};

export default PagesLayout;

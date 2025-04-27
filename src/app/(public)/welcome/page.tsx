import React from "react";

const Welcome = async () => {
  return (
    <section className="flex flex-col items-center justify-center text-center">
      <h1 className="text-3xl font-bold mb-4 sm:text-4x1">
        Bienvenido a Irrigo
      </h1>
      <p className="text-base text-gray-600 dark:text-gray-300">
        Aplicación de gestión y optimización de procesos de riegos de forma
        sencilla y eficiente.
      </p>
    </section>
  );
};

export default Welcome;

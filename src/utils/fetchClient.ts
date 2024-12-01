import { FetchOptions } from "./utils.types";

const fetchClient = async (url: string, options: FetchOptions = {}) => {
  try {
    const headers = {
      "Content-Type": "application/json",
      ...options.headers,
    };

    if (options.body && typeof options.body !== "string") {
      options.body = JSON.stringify(options.body);
    }

    const response = await fetch(url, { ...options, headers });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Error desconocido");
    }

    return response.json();
  } catch (error) {
    console.error("Error en fetchClient:", error);
    throw error;
  }
};

export { fetchClient };

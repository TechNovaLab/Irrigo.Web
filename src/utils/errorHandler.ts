import { ApplicationError } from "@/domain/errors/ApplicationError";

export const handleError = (error: unknown): void => {
  if (error instanceof ApplicationError) {
    console.error(`[Error ${error.status}] ${error.title}: ${error.detail}`);
    // (!) Mostrar notificaciones o mensajes de error
  } else {
    console.error("Unexpected error", error);
  }
};

import { ApplicationError } from "../errors/ApplicationError";
import { UserIdentity } from "../models/UserIdentity";

const baseApiUrl = process.env.BASE_API_URL;
export const createApiClient = (getUserIdentity: () => UserIdentity | null) => {
  return async <T>(url: string, options: RequestInit = {}): Promise<T> => {
    try {
      const userIdentity = getUserIdentity();
      const headers = new Headers(options.headers || {});
      headers.set("Content-Type", "application/json");

      if (userIdentity) {
        headers.set("Authorization", `Bearer ${userIdentity.token}`);
      }

      const endpoint = `${baseApiUrl}/${url}`;
      const response = await fetch(endpoint, { ...options, headers });

      if (!response.ok) {
        const errorData = await response.json();
        throw new ApplicationError(errorData);
      }

      return response.json();
    } catch (error) {
      throw error instanceof ApplicationError ? error : new Error("Unexpected error");
    }
  };
};

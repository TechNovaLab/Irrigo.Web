import { fetchClient } from "@/utils";

const BASE_URL = "https://localhost:5001/api/users";

export const login = async (payload: { email: string; password: string }) => {
  return fetchClient(`${BASE_URL}/login`, {
    method: "POST",
    body: JSON.stringify(payload),
  });
};

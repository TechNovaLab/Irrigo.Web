import { UserIdentity } from "./types";
import { fetchClient } from "@/utils";

type request = {
  email: string;
  password: string;
};

const BASE_URL = "https://localhost:5001/api/users";
export const loginService = async (payload: request): Promise<UserIdentity> => {
  return fetchClient(`${BASE_URL}/login`, {
    method: "POST",
    body: JSON.stringify(payload),
  });
};

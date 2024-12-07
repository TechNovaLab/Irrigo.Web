import { UserIdentity, LoginCredentials } from "./login.types";
import { cookieStorageManager, fetchClient } from "@/utils";

const BASE_URL = "https://localhost:5001/api/users";
const STORAGE_KEY = "user_identity";

const loginUser = async (
  credentials: LoginCredentials
): Promise<UserIdentity> => {
  const user = await fetchClient(`${BASE_URL}/login`, {
    method: "POST",
    body: JSON.stringify(credentials),
  });

  cookieStorageManager.set(STORAGE_KEY, user, {
    maxAge: 60 * 60 * 24 * 1,
  });

  return user;
};

export { loginUser };

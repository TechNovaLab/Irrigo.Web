import { UserIdentity } from "@/features/login/types";
const USER_KEY = "user_identity";

export const getSession = (): UserIdentity | null => {
  const data = sessionStorage.getItem(USER_KEY);
  return data ? JSON.parse(data) : null;
};

export const saveSession = (user: UserIdentity) => {
  sessionStorage.setItem(USER_KEY, JSON.stringify(user));
};

export const clearSession = () => {
  sessionStorage.removeItem(USER_KEY);
};

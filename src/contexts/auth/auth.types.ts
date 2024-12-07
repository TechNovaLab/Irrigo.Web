import { UserIdentity } from "@/features/login/login.types";

export interface AuthContextProps {
  user: UserIdentity | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

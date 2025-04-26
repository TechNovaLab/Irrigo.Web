import { UserIdentity } from "@/core/domain/models/UserIdentity";

export interface AuthContextProps {
  userIdentity: UserIdentity | null;
  isInitialized: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

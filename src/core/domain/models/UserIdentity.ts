import { User } from "@/core/domain/models/User";

export interface UserIdentity extends User {
  token: string;
} 
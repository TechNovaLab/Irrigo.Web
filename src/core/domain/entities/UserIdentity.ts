import { User } from "@/core/domain/entities/User";

export interface UserIdentity extends User {
  token: string;
} 
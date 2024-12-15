import { User } from "./User";

export interface UserIdentity extends User {
  token: string;
}

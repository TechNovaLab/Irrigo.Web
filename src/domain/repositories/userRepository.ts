import { BaseRepository } from "./BaseRepository";
import { createApiClient } from "../api/apiClient";
import { User } from "../models/User";
import { UserIdentity } from "../models/UserIdentity";
import { LoginRequest } from "../api/requests/LoginRequest";
import { RegisterRequest } from "../api/requests/RegisterRequest";

class UserRepository extends BaseRepository {
  async register(request: RegisterRequest): Promise<User> {
    return this.create("users/register", request);
  }

  async login(request: LoginRequest): Promise<UserIdentity> {
    return this.authenticate("users/login", request);
  }
}

export const userRepository = new UserRepository(createApiClient(() => null));

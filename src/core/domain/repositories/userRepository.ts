import { BaseRepository } from "@/core/domain/repositories/BaseRepository";
import { createApiClient } from "@/core/domain/api/apiClient";
import { User } from "@/core/domain/models/User";
import { UserIdentity } from "@/core/domain/models/UserIdentity";
import { LoginRequest } from "@/core/domain/api/requests/LoginRequest";
import { RegisterRequest } from "@/core/domain/api/requests/RegisterRequest";

class UserRepository extends BaseRepository {
  async register(request: RegisterRequest): Promise<User> {
    return this.create("users/register", request);
  }

  async login(request: LoginRequest): Promise<UserIdentity> {
    return this.authenticate("users/login", request);
  }
}

export const userRepository = new UserRepository(createApiClient(() => null)); 
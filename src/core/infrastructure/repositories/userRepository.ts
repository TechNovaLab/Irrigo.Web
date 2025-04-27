import { BaseRepository } from "@/core/infrastructure/repositories/BaseRepository";
import { createHttpClient } from "@/core/infrastructure/api/HttpClient";
import { User } from "@/core/domain/entities/User";
import { UserIdentity } from "@/core/domain/entities/UserIdentity";
import { LoginRequest } from "@/core/infrastructure/api/requests/LoginRequest";
import { RegisterRequest } from "@/core/infrastructure/api/requests/RegisterRequest";
import { identityManager } from "@/shared/utils";

class UserRepository extends BaseRepository {
  async register(request: RegisterRequest): Promise<User> {
    return this.create("users/register", request);
  }

  async login(request: LoginRequest): Promise<UserIdentity> {
    return this.authenticate("users/login", request);
  }
}

export const userRepository = new UserRepository(
  (url, options) => createHttpClient(() => identityManager.getUserIdentity()).request(url, options));
  

import { identityManager } from "@/shared/utils";
import { createHttpClient } from "@/core/infrastructure/api/HttpClient";
import { CreateSprinklerGroupRequest } from "@/core/infrastructure/api/requests/CreateSprinklerGroupRequest";
import { SprinklerGroup } from "@/core/domain/entities/SprinklerGroup";
import { BaseRepository } from "@/core/infrastructure/repositories/BaseRepository";

class SprinklerGroupRepository extends BaseRepository {
  async createGroup(request: CreateSprinklerGroupRequest): Promise<SprinklerGroup> {
    return this.create("sprinklers/create-group", request);
  }

  async getGroups(): Promise<SprinklerGroup[]> {
    return this.getAll("sprinklers/sprinkler-groups");
  }
}

export const sprinklerGroupRepository = new SprinklerGroupRepository(
  (url, options) => createHttpClient(() => identityManager.getUserIdentity()).request(url, options));
  

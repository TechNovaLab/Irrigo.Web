import { identityManager } from "@/utils";
import { createApiClient } from "@/core/domain/api/apiClient";
import { CreateSprinklerGroupRequest } from "@/core/domain/api/requests/CreateSprinklerGroupRequest";
import { SprinklerGroup } from "@/core/domain/models/SprinklerGroup";
import { BaseRepository } from "@/core/domain/repositories/BaseRepository";

class SprinklerGroupRepository extends BaseRepository {
  async createGroup(request: CreateSprinklerGroupRequest): Promise<SprinklerGroup> {
    return this.create("sprinklers/create-group", request);
  }

  async getGroups(): Promise<SprinklerGroup[]> {
    return this.getAll("sprinklers/sprinkler-groups");
  }
}

export const sprinklerGroupRepository = new SprinklerGroupRepository(
  createApiClient(() => identityManager.getUserIdentity())
); 
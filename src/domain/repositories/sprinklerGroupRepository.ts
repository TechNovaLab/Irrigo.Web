import { identityManager } from "@/utils";
import { createApiClient } from "../api/apiClient";
import { CreateSprinklerGroupRequest } from "../api/requests/CreateSprinklerGroupRequest";
import { SprinklerGroup } from "../models/SprinklerGroup";
import { BaseRepository } from "./BaseRepository";

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

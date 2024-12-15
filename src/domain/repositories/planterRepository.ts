import { identityManager } from "@/utils";
import { createApiClient } from "../api/apiClient";
import { BaseRepository } from "./BaseRepository";
import { CreatePlanterRequest } from "../api/requests/CreatePlanterRequest";
import { Planter } from "../models/Planter";

class PlanterRepository extends BaseRepository {
  async createPlanter(request: CreatePlanterRequest): Promise<Planter> {
    return this.create("planters/create-planter", request);
  }
}

export const planterRepository = new PlanterRepository(createApiClient(() => identityManager.getUserIdentity()));

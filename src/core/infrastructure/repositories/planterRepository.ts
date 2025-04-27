import { identityManager } from "@/shared/utils";
import { createHttpClient } from "@/core/infrastructure/api/HttpClient";
import { BaseRepository } from "@/core/infrastructure/repositories/BaseRepository";
import { CreatePlanterRequest } from "@/core/infrastructure/api/requests/CreatePlanterRequest";
import { Planter } from "@/core/domain/entities/Planter";

class PlanterRepository extends BaseRepository {
  async createPlanter(request: CreatePlanterRequest): Promise<Planter> {
    return this.create("planters/create-planter", request);
  }

  async getPlanters(): Promise<Planter[]> {
    return this.getAll("planters/");
  }
}

export const planterRepository = new PlanterRepository(
  (url, options) => createHttpClient(() => identityManager.getUserIdentity()).request(url, options));
  

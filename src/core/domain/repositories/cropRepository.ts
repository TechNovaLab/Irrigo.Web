import { identityManager } from "@/utils";
import { createApiClient } from "@/core/domain/api/apiClient";
import { CreateCropRequest } from "@/core/domain/api/requests/CreateCropRequest";
import { Crop } from "@/core/domain/models/Crop";
import { BaseRepository } from "@/core/domain/repositories/BaseRepository";

class CropRepository extends BaseRepository {
  async createCrop(request: CreateCropRequest): Promise<Crop> {
    return this.create("crops/create-crop", request);
  }

  async getCrops(): Promise<Crop[]> {
    return this.getAll("crops/");
  }
}

export const cropRepository = new CropRepository(createApiClient(() => identityManager.getUserIdentity())); 
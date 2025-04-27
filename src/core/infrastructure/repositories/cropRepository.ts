import { identityManager } from "@/shared/utils";
import { createHttpClient } from "@/core/infrastructure/api/HttpClient";
import { CreateCropRequest } from "@/core/infrastructure/api/requests/CreateCropRequest";
import { Crop } from "@/core/domain/entities/Crop";
import { BaseRepository } from "@/core/infrastructure/repositories/BaseRepository";

class CropRepository extends BaseRepository {
  async createCrop(request: CreateCropRequest): Promise<Crop> {
    return this.create("crops/create-crop", request);
  }

  async getCrops(): Promise<Crop[]> {
    return this.getAll("crops/");
  }
}

export const cropRepository = new CropRepository(
  (url, options) => createHttpClient(() => identityManager.getUserIdentity()).request(url, options));
  
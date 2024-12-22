import { identityManager } from "@/utils";
import { createApiClient } from "../api/apiClient";
import { CreateCropRequest } from "../api/requests/CreateCropRequest";
import { Crop } from "../models/Crop";
import { BaseRepository } from "./BaseRepository";

class CropRepository extends BaseRepository {
  async createCrop(request: CreateCropRequest): Promise<Crop> {
    return this.create("crops/create-crop", request);
  }

  async getCrops(): Promise<Crop[]> {
    return this.getAll("crops/");
  }
}

export const cropRepository = new CropRepository(createApiClient(() => identityManager.getUserIdentity()));

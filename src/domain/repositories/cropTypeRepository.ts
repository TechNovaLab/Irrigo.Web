import { BaseRepository } from "./BaseRepository";
import { createApiClient } from "../api/apiClient";
import { identityManager } from "@/utils";
import { CropType } from "../models/CropType";
import { CreateCropTypeRequest } from "../api/requests/CreateCropTypeRequest";

class CropTypeRepository extends BaseRepository {
  async createCropType(request: CreateCropTypeRequest): Promise<CropType> {
    return this.create("crops/create-crop-type", request);
  }

  async getCropTypes(): Promise<CropType[]> {
    return this.getAll("crops/");
  }
}

export const cropTypeRepository = new CropTypeRepository(createApiClient(() => identityManager.getUserIdentity()));

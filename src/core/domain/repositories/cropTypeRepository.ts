import { BaseRepository } from "@/core/domain/repositories/BaseRepository";
import { createApiClient } from "@/core/domain/api/apiClient";
import { identityManager } from "@/utils";
import { CropType } from "@/core/domain/models/CropType";
import { CreateCropTypeRequest } from "@/core/domain/api/requests/CreateCropTypeRequest";

class CropTypeRepository extends BaseRepository {
  async createCropType(request: CreateCropTypeRequest): Promise<CropType> {
    return this.create("crops/create-crop-type", request);
  }

  async getCropTypes(): Promise<CropType[]> {
    return this.getAll("crops/crop-types");
  }
}

export const cropTypeRepository = new CropTypeRepository(createApiClient(() => identityManager.getUserIdentity())); 
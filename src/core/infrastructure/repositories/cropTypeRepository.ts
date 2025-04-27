import { BaseRepository } from "@/core/infrastructure/repositories/BaseRepository";
import { createHttpClient } from "@/core/infrastructure/api/HttpClient";
import { identityManager } from "@/shared/utils";
import { CropType } from "@/core/domain/entities/CropType";
import { CreateCropTypeRequest } from "@/core/infrastructure/api/requests/CreateCropTypeRequest";

class CropTypeRepository extends BaseRepository {
  async createCropType(request: CreateCropTypeRequest): Promise<CropType> {
    return this.create("crops/create-crop-type", request);
  }

  async getCropTypes(): Promise<CropType[]> {
    return this.getAll("crops/crop-types");
  }
}

export const cropTypeRepository = new CropTypeRepository(
  (url, options) => createHttpClient(() => identityManager.getUserIdentity()).request(url, options)
); 
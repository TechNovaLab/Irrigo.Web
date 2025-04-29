import { identityManager } from "@/shared/utils";
import { createHttpClient } from "@/core/infrastructure/api/HttpClient";
import { Crop } from "@/core/domain/entities/Crop";
import { BaseRepository } from "@/core/infrastructure/repositories/BaseRepository";
import { RemoveCropRequest } from "@/core/application/features/removeCrop/RemoveCropRequest";
import { RemoveCropResponse } from "@/core/application/features/removeCrop/RemoveCropResponse";
import { CreateCropRequest } from "@/core/application/features/createCrop/CreateCropRequest";

class CropRepository extends BaseRepository {
  async createCrop(request: CreateCropRequest): Promise<Crop> {
    return this.create("crops/create-crop", request);
  }

  async getCrops(): Promise<Crop[]> {
    return this.getAll("crops/");
  }

  async removeCrop(request: RemoveCropRequest): Promise<RemoveCropResponse> {
    return this.delete<RemoveCropResponse>("crops/remove-crop", request.publicId);
  }
}

export const cropRepository = new CropRepository(
  (url, options) => createHttpClient(() => identityManager.getUserIdentity()).request(url, options));
  
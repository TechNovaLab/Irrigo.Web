import { CropType } from "@/core/domain/entities/CropType";
import { cropTypeRepository } from "@/core/infrastructure/repositories/cropTypeRepository";

interface IGetCropTypesUseCase {
    execute(): Promise<CropType[]>;
}

class GetCropTypesUseCase implements IGetCropTypesUseCase {
  constructor(private readonly repository = cropTypeRepository) {}

  async execute(): Promise<CropType[]> {
    return await this.repository.getCropTypes();
  }
}

export const getCropTypesUseCase = new GetCropTypesUseCase(cropTypeRepository);

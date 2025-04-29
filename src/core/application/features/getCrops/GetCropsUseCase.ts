import { cropRepository } from "@/core/infrastructure/repositories/cropRepository";
import { Crop } from "@/core/domain/entities/Crop";

interface IGetCropsUseCase {
  execute(): Promise<Crop[]>;
}

class GetCropsUseCase implements IGetCropsUseCase {
  constructor(private readonly repository = cropRepository) {}

  async execute(): Promise<Crop[]> {
    return await this.repository.getCrops();
  }
}

export const getCropsUseCase = new GetCropsUseCase(cropRepository);

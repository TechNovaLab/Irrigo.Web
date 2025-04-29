import { cropRepository } from "@/core/infrastructure/repositories/cropRepository";
import { CreateCropRequest } from "@/core/application/features/createCrop/CreateCropRequest";
import { Crop } from "@/core/domain/entities/Crop";

interface ICreateCropUseCase {
  execute(request: CreateCropRequest): Promise<Crop>;
} 

class CreateCropUseCase implements ICreateCropUseCase {
  constructor(private readonly repository = cropRepository) {}

  async execute(request: CreateCropRequest): Promise<Crop> {
    return await this.repository.createCrop(request);
  }
} 

export const createCropUseCase = new CreateCropUseCase(cropRepository);
  
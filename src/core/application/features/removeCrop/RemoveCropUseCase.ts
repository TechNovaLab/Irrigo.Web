import { cropRepository } from "@/core/infrastructure/repositories/cropRepository";
import { RemoveCropRequest } from "@/core/application/features/removeCrop/RemoveCropRequest";

interface IRemoveCropUseCase {
  execute(request: RemoveCropRequest): Promise<void>;
}

class RemoveCropUseCase implements IRemoveCropUseCase {
  constructor(private readonly repository = cropRepository) {}

  async execute(request: RemoveCropRequest): Promise<void> {
    await this.repository.removeCrop(request);
  }
}

export const removeCropUseCase = new RemoveCropUseCase(cropRepository);
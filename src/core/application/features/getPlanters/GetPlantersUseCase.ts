import { Planter } from "@/core/domain/entities/Planter";
import { planterRepository } from "@/core/infrastructure/repositories/planterRepository";

interface IGetPlantersUseCase {
  execute(): Promise<Planter[]>;
}

class GetPlantersUseCase implements IGetPlantersUseCase {
  constructor(private readonly repository = planterRepository) {}

  async execute(): Promise<Planter[]> {
    return await this.repository.getPlanters();
  }
}

export const getPlantersUseCase = new GetPlantersUseCase(planterRepository);

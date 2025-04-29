import { sprinklerGroupRepository } from "@/core/infrastructure/repositories/sprinklerGroupRepository";
import { SprinklerGroup } from "@/core/domain/entities/SprinklerGroup";

interface IGetSprinklerGroupsUseCase {
  execute(): Promise<SprinklerGroup[]>;
}

class GetSprinklerGroupsUseCase implements IGetSprinklerGroupsUseCase {
  constructor(private readonly repository = sprinklerGroupRepository) {}

  async execute(): Promise<SprinklerGroup[]> {
    return await this.repository.getGroups();
  }
}

export const getSprinklerGroupsUseCase = new GetSprinklerGroupsUseCase(sprinklerGroupRepository);

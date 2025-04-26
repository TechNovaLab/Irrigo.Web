export interface IWaterRequirement {
  litersPerDay: number;
  isSufficient(availableWater: number): boolean;
}

export class WaterRequirement implements IWaterRequirement {
  constructor(public litersPerDay: number) {}

  isSufficient(availableWater: number): boolean {
    return availableWater >= this.litersPerDay;
  }
} 
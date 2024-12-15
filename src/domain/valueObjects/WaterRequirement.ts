export class WaterRequirement {
  constructor(public litersPerDay: number) {}

  isSufficient(availableWater: number): boolean {
    return availableWater >= this.litersPerDay;
  }
}

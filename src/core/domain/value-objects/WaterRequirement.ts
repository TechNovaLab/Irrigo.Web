export interface IWaterRequirement {
  litersPerDay: number;
  isSufficient(availableWater: number): boolean;
}

export class WaterRequirement implements IWaterRequirement {
  private readonly _litersPerDay: number;

  constructor(litersPerDay: number) {
    if (litersPerDay < 0) {
      throw new Error('Liters per day cannot be negative');
    }
    this._litersPerDay = litersPerDay;
  }

  get litersPerDay(): number {
    return this._litersPerDay;
  }

  isSufficient(availableWater: number): boolean {
    return availableWater >= this._litersPerDay;
  }

  add(other: WaterRequirement): WaterRequirement {
    return new WaterRequirement(this._litersPerDay + other.litersPerDay);
  }

  equals(other: WaterRequirement): boolean {
    return this._litersPerDay === other.litersPerDay;
  }
}


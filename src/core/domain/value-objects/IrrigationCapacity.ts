
export class IrrigationCapacity {
  private readonly _capacityPerMinute: number;

  constructor(capacityPerMinute: number) {
    if (capacityPerMinute < 0) {
      throw new Error('Capacity cannot be negative');
    }
    this._capacityPerMinute = capacityPerMinute;
  }

  get capacityPerMinute(): number {
    return this._capacityPerMinute;
  }

  calculateWaterUsage(minutes: number): number {
    return this._capacityPerMinute * minutes;
  }
}

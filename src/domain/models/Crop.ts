export class Crop {
  constructor(
    public id: number,
    public publicId: string,
    public cropTypeId: number,
    public planterId: number,
    public sprinklerGroupId: number,
    public name: string,
    public plantUnits: number,
    public dailyWaterConsumption: number
  ) {}

  calculateWeeklyWaterConsumption(): number {
    return this.dailyWaterConsumption * 7;
  }
}

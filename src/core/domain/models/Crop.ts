export interface ICrop {
  id: number;
  publicId: string;
  cropTypeId: number;
  planterId: number;
  sprinklerGroupId: number;
  name: string;
  plantUnits: number;
  dailyWaterConsumption: number;
  calculateWeeklyWaterConsumption(): number;
}

export class Crop implements ICrop {
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
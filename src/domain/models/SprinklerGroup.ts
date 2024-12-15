import { State } from "./State";

export class SprinklerGroup {
  constructor(
    public id: number,
    public publicId: string,
    public name: string,
    public state: State,
    public waterConsumptionPerSession: number,
    public activeMinutesPerSession: number
  ) {}
}

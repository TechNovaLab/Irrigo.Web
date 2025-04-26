import { State } from "@/core/domain/models/State";

export interface ISprinklerGroup {
  id: number;
  publicId: string;
  name: string;
  state: State;
  waterConsumptionPerSession: number;
  activeMinutesPerSession: number;
  description?: string;
}

export class SprinklerGroup implements ISprinklerGroup {
  constructor(
    public id: number,
    public publicId: string,
    public name: string,
    public state: State,
    public waterConsumptionPerSession: number,
    public activeMinutesPerSession: number,
    public description?: string
  ) {}
} 
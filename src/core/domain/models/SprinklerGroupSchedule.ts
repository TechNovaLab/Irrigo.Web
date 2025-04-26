export interface ISprinklerGroupSchedule {
  id: number;
  publicId: string;
  sprinklerGroupId: number;
  startTime: Date;
  endTime: Date;
  isActive: boolean;
  notes?: string;
}

export class SprinklerGroupSchedule implements ISprinklerGroupSchedule {
  constructor(
    public id: number,
    public publicId: string,
    public sprinklerGroupId: number,
    public startTime: Date,
    public endTime: Date,
    public isActive: boolean,
    public notes?: string
  ) {}
} 
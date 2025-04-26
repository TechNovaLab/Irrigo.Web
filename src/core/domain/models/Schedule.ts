export interface ISchedule {
  id: number;
  publicId: string;
  sprinklerGroupId: number;
  startTime: Date;
  isActive: boolean;
  endTime: number;
  notes?: string;
}

export class Schedule implements ISchedule {
  constructor(
    public id: number,
    public publicId: string,
    public sprinklerGroupId: number,
    public startTime: Date,
    public isActive: boolean,
    public endTime: number,
    public notes?: string
  ) {}
} 
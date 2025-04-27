export interface ISprinklerGroupRestriction {
  id: number;
  publicId: string;
  sprinklerGroupId: number;
  restrictionId: number;
  startDate: Date;
  endDate: Date;
  isActive: boolean;
  notes?: string;
}

export class SprinklerGroupRestriction implements ISprinklerGroupRestriction {
  constructor(
    public id: number,
    public publicId: string,
    public sprinklerGroupId: number,
    public restrictionId: number,
    public startDate: Date,
    public endDate: Date,
    public isActive: boolean,
    public notes?: string
  ) {}
} 
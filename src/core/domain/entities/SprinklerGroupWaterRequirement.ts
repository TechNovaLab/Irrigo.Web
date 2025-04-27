export interface ISprinklerGroupWaterRequirement {
  id: number;
  publicId: string;
  sprinklerGroupId: number;
  waterRequirementId: number;
  startDate: Date;
  endDate: Date;
  isActive: boolean;
  notes?: string;
}

export class SprinklerGroupWaterRequirement implements ISprinklerGroupWaterRequirement {
  constructor(
    public id: number,
    public publicId: string,
    public sprinklerGroupId: number,
    public waterRequirementId: number,
    public startDate: Date,
    public endDate: Date,
    public isActive: boolean,
    public notes?: string
  ) {}
} 
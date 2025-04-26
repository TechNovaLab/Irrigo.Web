import { RestrictionSeverity } from "@/core/domain/models/RestrictionSeverity";
import { Season } from "@/core/domain/models/Season";

export class CreateRestrictionRequest {
  constructor(
    public name: string,
    public season: Season,
    public severity: RestrictionSeverity,
    public maxWaterLimit: number,
    public startDate: Date,
    public endDate: Date,
    public allowedStartTime: number,
    public allowedEndTime: number,
    public reason?: string
  ) {}
} 
import { RestrictionSeverity } from "@/domain/models/RestrictionSeverity";
import { Season } from "@/domain/models/Season";

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

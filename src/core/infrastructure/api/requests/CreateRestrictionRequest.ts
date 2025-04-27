import { RestrictionSeverity } from "@/core/domain/entities/RestrictionSeverity";
import { Season } from "@/core/domain/entities/Season";

export class CreateRestrictionRequest {
  constructor(
    public name: string,
    public description: string,
    public severity: RestrictionSeverity,
    public season: Season,
    public startDate: Date,
    public endDate: Date
  ) {}
} 
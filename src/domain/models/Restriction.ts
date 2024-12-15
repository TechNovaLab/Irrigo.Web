import { RestrictionSeverity } from "./RestrictionSeverity";
import { Season } from "./Season";

export class Restriction {
  constructor(
    public id: number,
    public publicId: string,
    public name: string,
    public season: Season,
    public restrictionSeverity: RestrictionSeverity,
    public maxWaterLimit: number,
    public startDate: Date,
    public endDate: Date,
    public allowedStartTime: number,
    public allowedEndTime: number,
    public reason?: string
  ) {}
}

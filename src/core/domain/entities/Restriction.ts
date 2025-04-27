import { RestrictionSeverity } from '@/core/domain/entities/RestrictionSeverity';
import { Season } from '@/core/domain/entities/Season';

export interface IRestriction {
  id: number;
  publicId: string;
  name: string;
  season: Season;
  severity: RestrictionSeverity;
  maxWaterLimit: number;
  startDate: Date;
  endDate: Date;
  allowedStartTime: Date;
  allowedEndTime: Date;
  reason?: string;
}

export class Restriction implements IRestriction {
  constructor(
    public id: number,
    public publicId: string,
    public name: string,
    public season: Season,
    public severity: RestrictionSeverity,
    public maxWaterLimit: number,
    public startDate: Date,
    public endDate: Date,
    public allowedStartTime: Date,
    public allowedEndTime: Date,
    public reason?: string
  ) {}
} 
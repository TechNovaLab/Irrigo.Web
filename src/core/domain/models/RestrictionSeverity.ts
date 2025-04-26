export interface IRestrictionSeverity {
  id: number;
  name: string;
  description?: string;
  level: number;
}

export class RestrictionSeverity implements IRestrictionSeverity {
  constructor(
    public id: number,
    public name: string,
    public level: number,
    public description?: string
  ) {}
} 
export interface ISeason {
  id: number;
  name: string;
  description?: string;
  startDate: Date;
  endDate: Date;
}

export class Season implements ISeason {
  constructor(
    public id: number,
    public name: string,
    public startDate: Date,
    public endDate: Date,
    public description?: string
  ) {}
} 
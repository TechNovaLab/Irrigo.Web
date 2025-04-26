export interface IHistory {
  id: number;
  publicId: string;
  waterUsed: number;
  durationInMinutes: number;
  date: Date;
}

export class History implements IHistory {
  constructor(
    public id: number,
    public publicId: string,
    public waterUsed: number,
    public durationInMinutes: number,
    public date: Date
  ) {}
} 
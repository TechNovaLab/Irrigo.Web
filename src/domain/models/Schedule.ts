export class Schedule {
  constructor(
    public id: number,
    public publicId: string,
    public sprinklerGroupId: number,
    public startTime: number,
    public isActive: boolean,
    public endTime: number,
    public notes?: string
  ) {}
}

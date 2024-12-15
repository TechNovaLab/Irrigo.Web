export class CreateScheduleRequest {
  constructor(
    public sprinklerGroupId: number,
    public startTime: number,
    public isActive: boolean,
    public notes?: string
  ) {}
}

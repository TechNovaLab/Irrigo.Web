export class CreateSpinklerRequest {
  constructor(
    public name: string,
    public irrigationCapacityPerMinute: number,
    public sprinklerGroupId?: number
  ) {}
}

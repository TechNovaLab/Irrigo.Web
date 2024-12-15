export class Sprinkler {
  constructor(
    public id: number,
    public publicId: string,
    public name: string,
    public irrigationCapacityPerMinute: number,
    public sprinklerGroupId?: number
  ) {}
}

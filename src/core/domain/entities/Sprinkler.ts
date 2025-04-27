export interface ISprinkler {
  id: number;
  publicId: string;
  name: string;
  irrigationCapacityPerMinute: number;
  sprinklerGroupId?: number;
}

export class Sprinkler implements ISprinkler {
  constructor(
    public id: number,
    public publicId: string,
    public name: string,
    public irrigationCapacityPerMinute: number,
    public sprinklerGroupId?: number
  ) {}
} 
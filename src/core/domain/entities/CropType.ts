export interface ICropType {
  id: number;
  publicId: string;
  name: string;
  waterRequiredPerDay: number;
}

export class CropType implements ICropType {
  constructor(
    public id: number,
    public publicId: string,
    public name: string,
    public waterRequiredPerDay: number
  ) {}
} 
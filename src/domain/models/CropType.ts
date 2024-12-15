export class CropType {
  constructor(
    public id: number,
    public publicId: string,
    public name: string,
    public waterRequiredPerDay: number
  ) {}
}

export class CreateCropRequest {
  constructor(
    public name: string,
    public plantUnits: number,
    public cropTypeId: number,
    public planterId: number,
    public sprinklerGroupId: number
  ) {}
}

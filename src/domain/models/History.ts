export class History {
  constructor(
    public id: number,
    public publicId: string,
    public waterUsed: number,
    public durationInMinutes: number,
    public date: Date
  ) {}
}

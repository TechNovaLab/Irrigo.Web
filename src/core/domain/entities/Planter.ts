export interface IPlanter {
  id: number;
  publicId: string;
  name: string;
  location: string;
  capacity: number;
  status: string;
  cropTypeId?: number;
}

export class Planter implements IPlanter {
  constructor(
    public id: number,
    public publicId: string,
    public name: string,
    public location: string,
    public capacity: number,
    public status: string,
    public cropTypeId?: number
  ) {}
} 
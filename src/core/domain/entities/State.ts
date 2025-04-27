export interface IState {
  id: number;
  name: string;
  description?: string;
}

export class State implements IState {
  constructor(
    public id: number,
    public name: string,
    public description?: string
  ) {}
} 
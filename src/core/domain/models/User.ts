import { RoleEnum } from "./RoleEnum";

export interface IUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: RoleEnum;
}

export class User implements IUser {
  constructor(
    public id: string,
    public email: string,
    public firstName: string,
    public lastName: string,
    public role: RoleEnum
  ) {}
} 
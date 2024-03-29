import { Request } from 'express';
import { IUser } from '@components/user/users.interface';

export interface IDataStoredInToken {
  _id: string;
}

export interface ITokenData {
  token: string;
  expiresIn: number;
}

export interface IRequestWithUser extends Request {
  user: IUser;
}

export interface IUserBody {
  name: string;
  email: string;
  password: string;
}

export interface IUserName {
  name: string;
}

import { Request } from 'express';
import { IUser } from '@interfaces/users.interface';

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
  email: string;
  password: string;
}

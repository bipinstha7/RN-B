import { Request, Response } from 'express';

import { IRequestWithUser, IUserBody } from '@interfaces/auth.interface';
import { IUser } from '@interfaces/users.interface';
import * as authService from '@services/auth.service';
import * as tokenService from '@services/token.service';

export const signup = async (req: Request, res: Response): Promise<void> => {
  const userData: IUserBody = req.body;
  const user: IUser = await authService.signup(userData);

  res.status(201).json({ data: user, message: 'signup' });
};

export const login = async (req: Request, res: Response): Promise<void> => {
  const userData: IUserBody = req.body;
  const user: IUser = await authService.login(userData);
  const token: string = await tokenService.generateAuthTokens(user);

  res.status(200).json({ data: { user, token }, message: 'login' });
};

export const logOut = async (req: IRequestWithUser, res: Response): Promise<void> => {
  const userData: IUser = req.user;
  const logOutUserData: IUser = await authService.logout(userData);

  res.status(200).json({ data: logOutUserData, message: 'logout' });
};

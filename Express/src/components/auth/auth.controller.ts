import { Request, Response } from 'express';

import { IRequestWithUser, IUserBody, IUserName } from '@components/auth/auth.interface';
import { IUser } from '@components/user/users.interface';
import authService from './auth.service';

export default {
  async signup(req: Request, res: Response): Promise<void> {
    const userData: IUserBody = req.body;
    const user: IUserName = await authService.signup(userData);

    res.status(201).json({ data: user, message: 'signup' });
  },

  /* use rate limiter */
  async login(req: Request, res: Response): Promise<void> {
    // USE TWO FACTOR AUTHENTICATION
    const userData: IUserBody = req.body;
    const user: IUser = await authService.login(userData);

    res.status(200).json({ data: { user }, message: 'login' });
  },

  async logout(req: IRequestWithUser, res: Response): Promise<void> {
    const userData: IUser = req.user;
    const logOutUserData: IUser = await authService.logout(userData);

    res.status(200).json({ data: logOutUserData, message: 'logout' });
  },
};

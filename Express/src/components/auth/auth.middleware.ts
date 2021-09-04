// import config from 'config';
import { NextFunction, Response } from 'express';
import jwt from 'jsonwebtoken';

import { IDataStoredInToken, IRequestWithUser } from '@components/auth/auth.interface';
import User from '@components/user/user.model';
import ApiError from '@shared/utils/ApiError';

const authMiddleware = async (req: IRequestWithUser, res: Response, next: NextFunction) => {
  try {
    const Authorization = req.cookies['Authorization'] || req.header('Authorization').split('Bearer ')[1] || null;

    if (Authorization) {
      // call token service to verify the token
      const secretKey: string = "config.get('secretKey')";
      const verificationResponse = (await jwt.verify(Authorization, secretKey)) as IDataStoredInToken;
      const userId = verificationResponse._id;
      const findUser = await User.findById(userId);

      if (findUser) {
        req.user = findUser;
        next();
      } else {
        next(new ApiError(401, 'Wrong authentication token'));
      }
    } else {
      next(new ApiError(404, 'Authentication token missing'));
    }
  } catch (error) {
    next(new ApiError(401, 'Wrong authentication token'));
  }
};

export default authMiddleware;

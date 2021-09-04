import { NextFunction, Request, Response } from 'express';

import logger from '@shared/utils/logger';
import ApiError from '@shared/utils/ApiError';

const errorMiddleware = (error: ApiError, req: Request, res: Response, next: NextFunction) => {
  try {
    const status: number = error.statusCode || 500;
    const message: string = error.message || 'Something went wrong';

    logger.error(
      `[${req.method}] ${req.path} ==>> StatusCode:: ${status}, Message:: ${message} >> stack:: ${error.stack}`,
    );

    const response = {
      code: status,
      errors: message,
    };

    res.status(status).json(response);
  } catch (error) {
    next(error);
  }
};

export default errorMiddleware;

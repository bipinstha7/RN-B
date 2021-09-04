import { Router } from 'express';

import authMiddleware from './auth.middleware';
import authValidation from './auth.validation';
import authController from './auth.controller';
import validate from '@shared/middlewares/validation.middleware';

const v1 = '/v1/auth';
const router: Router = Router();

router.post(`${v1}/signup`, validate(authValidation.register), authController.signup);
router.post(`${v1}/login`, validate(authValidation.login), authController.login);
router.post(`${v1}/logout`, authMiddleware, authController.logout);

export default router;

import { Router } from 'express';

import validate from '@middlewares/validation.middleware';
import authMiddleware from '@middlewares/auth.middleware';
import * as authValidation from '@validations/auth.validation';
import * as authController from '@controllers/auth.controller';

const router: Router = Router();
const v1 = '/v1';

router.post(`${v1}/signup`, validate(authValidation.register), authController.signup);
router.post(`${v1}/login`, validate(authValidation.login), authController.login);
router.post(`${v1}/logout`, authMiddleware, authController.logOut);

export default router;

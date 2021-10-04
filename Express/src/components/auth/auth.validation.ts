import Joi from 'joi';

/* maybe take this password out of the custom validation */
import { password } from '@shared/validations/custom.validation';

export default {
  signup: {
    body: Joi.object().keys({
      name: Joi.string().required().trim(),
      email: Joi.string().required().email().trim(),
      password: Joi.string().required().min(15).trim(),
      // password: Joi.string().required().custom(password),
    }),
  },

  login: {
    body: Joi.object().keys({
      email: Joi.string().required(),
      password: Joi.string().required(),
    }),
  },

  logout: {
    body: Joi.object().keys({
      refreshToken: Joi.string().required(),
    }),
  },

  refreshTokens: {
    body: Joi.object().keys({
      refreshToken: Joi.string().required(),
    }),
  },

  forgotPassword: {
    body: Joi.object().keys({
      email: Joi.string().email().required(),
    }),
  },

  resetPassword: {
    query: Joi.object().keys({
      token: Joi.string().required(),
    }),
    body: Joi.object().keys({
      password: Joi.string().required().custom(password),
    }),
  },

  verifyEmail: {
    query: Joi.object().keys({
      token: Joi.string().required(),
    }),
  },
};

import Joi from 'joi';

import pick from '@utils/pick';
import ApiError from '@utils/ApiError';

const validate = schema => (req, res, next) => {
  const validSchema = pick(schema, ['params', 'query', 'body']);

  const object = pick(req, Object.keys(validSchema));
  const { value, error } = Joi.compile(validSchema)
    .prefs({ errors: { label: 'key', wrap: { label: false } }, abortEarly: false })
    .validate(object);

  if (error) {
    const errorMessage = error.details.reduce((obj, details) => {
      obj[details.context.key] = details.message;
      return obj;
    }, {});

    return next(new ApiError(400, errorMessage));
  }
  Object.assign(req, value);
  return next();
};

export default validate;

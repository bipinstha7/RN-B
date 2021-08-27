export default class ApiError extends Error {
  constructor(public statusCode, public message, public isOperational = true, stack = '') {
    super(message);

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

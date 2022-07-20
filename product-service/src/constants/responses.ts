export const SUCCESS = 'Success';
export const INTERNAL_SERVER_ERROR = 'InternalServerError';
export const BAD_REQUEST = 'BadRequestError';
export const UNAUTHORIZED = 'UnauthorizedError';
export const FORBIDDEN = 'ForbiddenError';
export const NOT_FOUND = 'NotFoundError';
export const CONFLICT = 'ConflictError';
export const AlREADY_EXISTS = 'AlreadyExistsError';
export const VALIDATION_ERROR = 'ValidationError';

export const RESPONSE_CODES = {
  [SUCCESS]: 200,
  [BAD_REQUEST]: 400,
  [UNAUTHORIZED]: 401,
  [FORBIDDEN]: 403,
  [NOT_FOUND]: 404,
  [CONFLICT]: 409,
  [AlREADY_EXISTS]: 417,
  [VALIDATION_ERROR]: 422,
  [INTERNAL_SERVER_ERROR]: 500,
};

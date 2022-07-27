export enum HTTP_CODE {
  SUCCESS = 200,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  CONFLICT = 409,
  AlREADY_EXISTS = 417,
  VALIDATION_ERROR = 422,
  INTERNAL_SERVER_ERROR = 500,
}

export class HttpError extends Error {
  constructor(public readonly statusCode: HTTP_CODE, message: string) {
    super(message);
  }
}

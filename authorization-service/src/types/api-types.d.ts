export type HttpResponse = {
  code: number;
  error?: string;
};

export type SuccessResponse = string;

export type ErrorResponse = {
  code: number;
  error: string;
};

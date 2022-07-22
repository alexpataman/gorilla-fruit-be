export type Product = {
  id: string;
  title: string;
  description: string;
  count: number;
  price: number;
};

export type CreateProductRequest = {
  title: string;
  description: string;
  count: number;
  price: number;
};

export type httpResponse = {
  code: number;
  error?: string;
};

export type errorResponse = {
  code: number;
  error: string;
};

export type productsResponse = httpResponse & {
  code: number;
  data?: Product[];
};

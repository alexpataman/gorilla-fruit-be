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

export type HttpResponse = {
  code: number;
  error?: string;
};

export type ErrorResponse = {
  code: number;
  error: string;
};

export type ProductsResponse = HttpResponse & {
  code: number;
  items?: Product[];
};

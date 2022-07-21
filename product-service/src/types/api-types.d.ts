export type Products = Product[];

export type Product = {
  id: string,
  title: string,
  description: string,
  count: number,
  price: number
}

export type CreateProductRequest = Omit<Product, 'id'>;

export type Error = {
  message: string
}

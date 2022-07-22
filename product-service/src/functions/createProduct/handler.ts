import { addProduct } from '@/services/product';
import { CreateProductRequest } from '@/types/api-types';
import { lambdaHandler } from '@/utils/lambdaHandler';
import schema from './schema';

export const main = lambdaHandler(async (event) => {
  const product = event.body as unknown as CreateProductRequest;
  return await addProduct(product);
}, schema);

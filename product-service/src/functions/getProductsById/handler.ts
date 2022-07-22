import { getProduct } from '@/services/product';
import { lambdaHandler } from '@/utils/lambdaHandler';
import schema from './schema';

export const main = lambdaHandler(async (event) => {
  const { productId } = event.pathParameters;
  return await getProduct(productId);
}, schema);

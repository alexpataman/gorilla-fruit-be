import { lambdaHandler } from '@/utils/lambdaHandler';
import schema from './schema';
import { addProduct } from '@/services/product';

export const main = lambdaHandler(async (event) => {
  await Promise.all(
    event.Records.map(async ({ body }) => {
      const product = JSON.parse(body);
      if (product) {
        await addProduct(product);
      }
    })
  );

  return {
    message: 'Done',
  };
}, schema);

import { getProducts } from '@/services/product';
import { lambdaHandler } from '@/utils/lambdaHandler';
import schema from './schema';

export const main = lambdaHandler(async () => await getProducts(), schema);

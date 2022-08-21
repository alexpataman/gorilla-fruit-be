import { lambdaHandler } from '@/utils/lambdaHandler';
import schema from './schema';

export const main = lambdaHandler(async () => {
  return 'Hello world';
}, schema);

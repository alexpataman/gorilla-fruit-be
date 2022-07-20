import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';

import schema from './schema';
import { RESPONSE_CODES, INTERNAL_SERVER_ERROR, SOMETHING_WENT_WRONG_MESSAGE } from '@/constants';
import { getProducts } from "@/services/product";

const products: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async () => {
  try {
    const items = await getProducts();
    return formatJSONResponse({items});
  } catch {
    return formatJSONResponse({
      message: SOMETHING_WENT_WRONG_MESSAGE,
    }, RESPONSE_CODES[INTERNAL_SERVER_ERROR]);
  }
};

export const main = middyfy(products);

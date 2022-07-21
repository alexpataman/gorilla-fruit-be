import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';

import schema from './schema';
import {
  RESPONSE_CODES,
  INTERNAL_SERVER_ERROR,
  SOMETHING_WENT_WRONG_MESSAGE,
} from '@/constants';
import { addProduct } from "@/services/product";
import { CreateProductRequest } from "@/types/api-types";

const createProduct: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
  const product = event.body as unknown as CreateProductRequest;
  try {
    await addProduct(product);
    return formatJSONResponse({message: 'OK'});
  } catch {
    return formatJSONResponse({
      error: SOMETHING_WENT_WRONG_MESSAGE,
    }, RESPONSE_CODES[INTERNAL_SERVER_ERROR]);
  }
};

export const main = middyfy(createProduct);

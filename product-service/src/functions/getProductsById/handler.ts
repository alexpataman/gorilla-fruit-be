import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';

import schema from './schema';
import {
  RESPONSE_CODES,
  INTERNAL_SERVER_ERROR,
  NOT_FOUND,
  SOMETHING_WENT_WRONG_MESSAGE,
  PRODUCT_NOT_FOUND_MESSAGE,
} from '@/constants';
import { getProduct } from "@/services/product";

const getProductsById: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
  const { productId } = event.pathParameters;

  try {
    const item = await getProduct(productId);

    if (item) {
      return formatJSONResponse(item);
    } else {
      return formatJSONResponse(
        {
          message: PRODUCT_NOT_FOUND_MESSAGE
        },
        RESPONSE_CODES[NOT_FOUND]);
    }
  } catch {
    return formatJSONResponse({
      message: SOMETHING_WENT_WRONG_MESSAGE,
    }, RESPONSE_CODES[INTERNAL_SERVER_ERROR]);
  }
};

export const main = middyfy(getProductsById);

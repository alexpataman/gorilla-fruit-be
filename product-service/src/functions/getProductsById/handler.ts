import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import axios from "axios";

import schema from './schema';
import {
  PRODUCT_LIST_PATH,
  RESPONSE_CODES,
  INTERNAL_SERVER_ERROR,
  NOT_FOUND,
  SOMETHING_WENT_WRONG_MESSAGE,
  PRODUCT_NOT_FOUND_MESSAGE,
} from '@/constants';

const getProductsById: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
  const { productId } = event.pathParameters;

  try {
    const {data} = await axios.get(PRODUCT_LIST_PATH);
    const item = data.find(el=>el.id === productId);

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

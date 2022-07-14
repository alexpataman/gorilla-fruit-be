import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import axios from 'axios';

import schema from './schema';
import { PRODUCT_LIST_PATH, RESPONSE_CODES, BAD_REQUEST, SOMETHING_WENT_WRONG_MESSAGE } from '../../constants';

const products: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async () => {

  try {
    const response = await axios.get(PRODUCT_LIST_PATH);
    return formatJSONResponse(response.data);
  } catch {
    return formatJSONResponse({
      message: SOMETHING_WENT_WRONG_MESSAGE,
    }, RESPONSE_CODES[BAD_REQUEST]);
  }
};

export const main = middyfy(products);

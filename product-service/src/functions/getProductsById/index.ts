import { handlerPath } from '@libs/handler-resolver';
import {
  BAD_REQUEST,
  NOT_FOUND,
  PRODUCT_NOT_FOUND_MESSAGE,
  RESPONSE_CODES,
  SOMETHING_WENT_WRONG_MESSAGE,
  SUCCESS
} from "@/constants";

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      httpApi: {
        method: 'get',
        path: '/products/{productId}',
        description: 'Returns information about particular product',
        responseData: {
          [RESPONSE_CODES[SUCCESS]]: {
            description: 'Success',
            bodyType: 'Product',
          },
          [RESPONSE_CODES[BAD_REQUEST]]: SOMETHING_WENT_WRONG_MESSAGE,
          [RESPONSE_CODES[NOT_FOUND]]: PRODUCT_NOT_FOUND_MESSAGE,
        }
      },
    },
  ],
};

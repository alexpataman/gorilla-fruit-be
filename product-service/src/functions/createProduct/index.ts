import { handlerPath } from '@libs/handler-resolver';
import {
  INTERNAL_SERVER_ERROR,
  RESPONSE_CODES,
  SOMETHING_WENT_WRONG_MESSAGE,
  SUCCESS
} from "@/constants";

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      httpApi: {
        method: 'post',
        path: '/products',
        description: 'Add new product',
        responseData: {
          [RESPONSE_CODES[SUCCESS]]: {
            description: 'Success',
            bodyType: 'Product',
          },
          [RESPONSE_CODES[INTERNAL_SERVER_ERROR]]: {
            description: SOMETHING_WENT_WRONG_MESSAGE,
            bodyType: 'Error',
          },
        }
      },
    },
  ],
};

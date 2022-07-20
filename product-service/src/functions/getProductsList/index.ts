import { handlerPath } from '@libs/handler-resolver';
import {
  RESPONSE_CODES,
  SUCCESS,
  SOMETHING_WENT_WRONG_MESSAGE,
  INTERNAL_SERVER_ERROR
} from '@/constants'

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      httpApi: {
        method: 'get',
        path: '/products',
        description: 'Returns full set of products',
        responseData: {
          [RESPONSE_CODES[SUCCESS]]: {
            description: 'Success',
            bodyType: 'Products',
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

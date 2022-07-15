import { handlerPath } from '@libs/handler-resolver';
import {
  RESPONSE_CODES,
  BAD_REQUEST,
  SUCCESS,
  SOMETHING_WENT_WRONG_MESSAGE
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
          [RESPONSE_CODES[BAD_REQUEST]]: SOMETHING_WENT_WRONG_MESSAGE,
        }
      },
    },
  ],
};

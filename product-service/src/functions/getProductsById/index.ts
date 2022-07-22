import { handlerPath } from '@libs/handler-resolver';
import { PRODUCT_NOT_FOUND_MESSAGE, SOMETHING_WENT_WRONG_MESSAGE } from '@/constants';
import { HTTP_CODE } from '@/utils/http';

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      httpApi: {
        method: 'get',
        path: '/products/{productId}',
        description: 'Returns information about particular product',
        responseData: {
          [HTTP_CODE.SUCCESS]: {
            description: 'Success',
            bodyType: 'ProductsResponse',
          },
          [HTTP_CODE.NOT_FOUND]: {
            description: PRODUCT_NOT_FOUND_MESSAGE,
            bodyType: 'ErrorResponse',
          },
          [HTTP_CODE.INTERNAL_SERVER_ERROR]: {
            description: SOMETHING_WENT_WRONG_MESSAGE,
            bodyType: 'ErrorResponse',
          },
        },
      },
    },
  ],
};

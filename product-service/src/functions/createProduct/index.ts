import { handlerPath } from '@libs/handler-resolver';
import { SOMETHING_WENT_WRONG_MESSAGE } from '@/constants';
import { HTTP_CODE } from '@/utils/http';

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      httpApi: {
        method: 'post',
        path: '/products',
        bodyType: 'CreateProductRequest',
        description: 'Add new product',
        responseData: {
          [HTTP_CODE.SUCCESS]: {
            description: 'Success',
            bodyType: 'productsResponse',
          },
          [HTTP_CODE.INTERNAL_SERVER_ERROR]: {
            description: SOMETHING_WENT_WRONG_MESSAGE,
            bodyType: 'errorResponse',
          },
        },
      },
    },
  ],
};

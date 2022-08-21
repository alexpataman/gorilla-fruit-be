import { handlerPath } from '@libs/handler-resolver';
import { SOMETHING_WENT_WRONG_MESSAGE } from '@/constants';
import { HTTP_CODE } from '@/utils/http';

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      httpApi: {
        method: 'get',
        path: '/basicAuthorizer',
        description: 'Say hello',
        responseData: {
          [HTTP_CODE.SUCCESS]: {
            description: 'Success',
            bodyType: 'SuccessResponse',
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

import { handlerPath } from '@libs/handler-resolver';
import { SOMETHING_WENT_WRONG_MESSAGE } from '@/constants';
import { HTTP_CODE } from '@/utils/http';

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      httpApi: {
        method: 'get',
        path: '/import',
        authorizer: {
          name: 'httpApiRequestAuthorizer',
        },
        queryStringParameters: {
          name: {
            required: true,
            type: 'string',
            description: 'File name',
          },
        },
        description:
          'Service expects a request with a name of CSV file with products and returns a new Signed URL',
        responseData: {
          [HTTP_CODE.SUCCESS]: {
            description: 'Success',
            bodyType: 'ImportProductsFileResponse',
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

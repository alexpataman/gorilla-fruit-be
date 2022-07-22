import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import { HTTP_CODE } from '@/utils/http';
import { httpResponse } from '@/types/api-types';
import { logger } from '@/utils/logger';

export const lambdaHandler = (callback: (event) => Promise<any>, schema) => {
  const getData: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
    let response: httpResponse = {
      code: HTTP_CODE.SUCCESS,
    };
    try {
      logger.log(`Request:\n`, event);
      response['items'] = await callback(event);
    } catch (error) {
      response['code'] = error.statusCode || error.code;
      response['error'] = error.message;
    } finally {
      return formatJSONResponse(response, response.code);
    }
  };

  return middyfy(getData);
};

import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import { HTTP_CODE } from '@/utils/http';
import { logger } from '@/utils/logger';

export const lambdaHandler = (callback: (event) => Promise<any>, schema) => {
  const getData: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
    let statusCode = HTTP_CODE.SUCCESS;
    let response;

    try {
      logger.log(`Request:\n`, event);
      response = await callback(event);
    } catch (error) {
      statusCode = error.statusCode || error.code;
      response = { error: error.message };
    }
    return formatJSONResponse(response, statusCode);
  };

  return middyfy(getData);
};

import * as AWS from 'aws-sdk';

import { lambdaHandler } from '@/utils/lambdaHandler';
import { HTTP_CODE, HttpError } from '@/utils/http';
import { BAD_REQUEST_MESSAGE } from '@/constants';
import { BUCKET_NAME, DEFAULT_REGION, UPLOADED_DIR } from '@/constants/aws';

import schema from './schema';

export const main = lambdaHandler(async (event) => {
  const { name } = event.queryStringParameters;
  if (!name) {
    throw new HttpError(HTTP_CODE.BAD_REQUEST, BAD_REQUEST_MESSAGE);
  }
  const s3 = new AWS.S3({ region: DEFAULT_REGION });
  const params = {
    Bucket: BUCKET_NAME,
    Key: `${UPLOADED_DIR}/${name}`,
    Expires: 60,
    ContentType: 'text/csv',
  };

  return { url: await s3.getSignedUrlPromise('putObject', params) };
}, schema);

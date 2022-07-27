import { lambdaHandler } from '@/utils/lambdaHandler';
import * as AWS from 'aws-sdk';

import schema from './schema';
import { BUCKET_NAME, DEFAULT_REGION, UPLOADED_DIR } from '@/constants/aws';

export const main = lambdaHandler(async (event) => {
  const { name } = event.queryStringParameters;
  const s3 = new AWS.S3({ region: DEFAULT_REGION });
  const params = {
    Bucket: BUCKET_NAME,
    Key: `${UPLOADED_DIR}/${name}`,
    Expires: 60,
    ContentType: 'text/csv',
  };

  return { url: await s3.getSignedUrlPromise('putObject', params) };
}, schema);

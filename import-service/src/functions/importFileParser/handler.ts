import { lambdaHandler } from '@/utils/lambdaHandler';
import * as AWS from 'aws-sdk';
import schema from './schema';
import { BUCKET_NAME, DEFAULT_REGION } from '@/constants';

const csv = require('csv-parser');

export const main = lambdaHandler(async (event) => {
  const s3 = new AWS.S3({ region: DEFAULT_REGION });
  const result = [];
  for (const record of event.Records) {
    const params = {
      Bucket: BUCKET_NAME,
      Key: record.s3.object.key,
    };

    try {
      const recordData = await new Promise((resolve, reject) => {
        const chunks = [];
        s3.getObject(params)
          .createReadStream()
          .pipe(csv())
          .on('data', (data) => {
            chunks.push(data);
          })
          .on('error', (error) => {
            reject(error.message);
          })
          .on('end', () => {
            resolve(chunks);
          });
      });
      result.push(`File: ${record.s3.object.key}`, recordData);
    } catch (error) {
      throw new Error(error.message);
    }
  }
  console.log('Loaded content:', result);

  return {
    message: 'Success',
  };
}, schema);

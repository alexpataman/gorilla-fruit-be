import { lambdaHandler } from '@/utils/lambdaHandler';
import * as AWS from 'aws-sdk';
import schema from './schema';
import { BUCKET_NAME, DEFAULT_REGION, PARSED_DIR, UPLOADED_DIR } from '@/constants';

const csv = require('csv-parser');

export const main = lambdaHandler(async (event) => {
  const s3 = new AWS.S3({ region: DEFAULT_REGION });
  const sqs = new AWS.SQS();
  for (const record of event.Records) {
    try {
      await new Promise<void | string>((resolve, reject) => {
        s3.getObject({
          Bucket: BUCKET_NAME,
          Key: record.s3.object.key,
        })
          .createReadStream()
          .pipe(csv())
          .on('data', (data) => {
            sqs.sendMessage(
              {
                QueueUrl: process.env.SQS_URL,
                MessageBody: JSON.stringify({
                  title: data.Title,
                  description: data.Description,
                  price: data.Price,
                  count: data.Count,
                }),
              },
              () => {
                console.log('Sent to SQS: ', data.Title);
              }
            );
          })
          .on('error', (error) => {
            reject(error.message);
          })
          .on('end', () => {
            resolve();
          });
      });
    } catch (error) {
      throw new Error(error.message);
    }

    await s3
      .copyObject({
        Bucket: BUCKET_NAME,
        CopySource: `${BUCKET_NAME}/${record.s3.object.key}`,
        Key: record.s3.object.key.replace(UPLOADED_DIR, PARSED_DIR),
      })
      .promise();

    await s3
      .deleteObject({
        Bucket: BUCKET_NAME,
        Key: record.s3.object.key,
      })
      .promise();
  }

  return {
    message: 'Success',
  };
}, schema);

import * as AWS from 'aws-sdk';
import { lambdaHandler } from '@/utils/lambdaHandler';
import { addProduct } from '@/services/product';
import { DEFAULT_REGION } from '@/constants/aws';

import schema from './schema';

export const main = lambdaHandler(async (event) => {
  const sns = new AWS.SNS({ region: DEFAULT_REGION });
  await Promise.allSettled(
    event.Records.map(async ({ body }) => {
      const product = JSON.parse(body);
      if (product) {
        try {
          await addProduct(product);
          await new Promise<void>((resolve) => {
            sns.publish(
              {
                Subject: 'Imported products',
                MessageAttributes: {
                  count: {
                    DataType: 'Number',
                    StringValue: product.count.toString(),
                  },
                },
                Message: `Product created: ${JSON.stringify(product)}`,
                TopicArn: process.env.SNS_ARN,
              },
              (error) => {
                if (error) {
                  console.log(error);
                }
                resolve();
              }
            );
          });
        } catch (error) {
          console.log('error:', error);
        }
      }
    })
  );

  return {
    message: 'Done',
  };
}, schema);

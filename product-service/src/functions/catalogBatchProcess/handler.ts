import { lambdaHandler } from '@/utils/lambdaHandler';
import schema from './schema';
import { addProduct } from '@/services/product';
import * as AWS from 'aws-sdk';
import { DEFAULT_REGION } from '@/constants/aws';

export const main = lambdaHandler(async (event) => {
  const products = [];
  await Promise.all(
    event.Records.map(async ({ body }) => {
      const product = JSON.parse(body);
      if (product) {
        products.push(product.title);
        await addProduct(product);
      }
    })
  );

  const sns = new AWS.SNS({ region: DEFAULT_REGION });

  await new Promise<void>((resolve) => {
    sns.publish(
      {
        Subject: 'Imported products',
        Message: `Products created: ${JSON.stringify(products)}`,
        TopicArn: process.env.SNS_ARN,
      },
      () => {
        console.log('create-product-topic sent');
        resolve();
      }
    );
  });

  return {
    message: 'Done',
  };
}, schema);

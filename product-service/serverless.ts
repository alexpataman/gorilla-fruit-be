import type { AWS } from '@serverless/typescript';
import * as dotenv from 'dotenv';
import {
  getProductsById,
  getProductsList,
  createProduct,
  catalogBatchProcess,
} from '@functions/index';

dotenv.config();

const serverlessConfiguration: AWS = {
  service: 'gorilla-fruit-product-service',
  configValidationMode: 'error',
  frameworkVersion: '3',
  plugins: ['serverless-auto-swagger', 'serverless-esbuild', 'serverless-offline'],
  provider: {
    name: 'aws',
    runtime: 'nodejs14.x',
    stage: 'dev',
    region: 'eu-west-1',
    httpApi: {
      cors: true,
    },
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
      PG_HOST: process.env.PG_HOST,
      PG_PORT: process.env.PG_PORT,
      PG_DATABASE: process.env.PG_DATABASE,
      PG_USERNAME: process.env.PG_USERNAME,
      PG_PASSWORD: process.env.PG_PASSWORD,
      SNS_ARN: { Ref: 'SNSTopic' },
    },
    iam: {
      role: {
        statements: [
          {
            Effect: 'Allow',
            Action: ['sqs:*'],
            Resource: [{ 'Fn::GetAtt': ['SQSQueue', 'Arn'] }],
          },
          {
            Effect: 'Allow',
            Action: ['sns:*'],
            Resource: [{ Ref: 'SNSTopic' }],
          },
        ],
      },
    },
  },
  resources: {
    Resources: {
      SQSQueue: {
        Type: 'AWS::SQS::Queue',
        Properties: {
          QueueName: 'gorilla-fruit-product-service-queue',
        },
      },
      SNSTopic: {
        Type: 'AWS::SNS::Topic',
        Properties: {
          TopicName: 'gorilla-fruit-create-product-topic',
        },
      },
      SNSSubscription: {
        Type: 'AWS::SNS::Subscription',
        Properties: {
          Endpoint: 'alex.pataman@gmail.com',
          Protocol: 'email',
          TopicArn: { Ref: 'SNSTopic' },
        },
      },
    },
  },
  functions: {
    getProductsList,
    getProductsById,
    createProduct,
    catalogBatchProcess,
  },
  package: { individually: true },
  custom: {
    autoswagger: {
      generateSwaggerOnDeploy: false,
    },
    'serverless-offline': {
      httpPort: 4000,
    },
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ['aws-sdk', 'pg-native'],
      target: 'node14',
      define: { 'require.resolve': undefined },
      platform: 'node',
      concurrency: 10,
    },
  },
};

module.exports = serverlessConfiguration;

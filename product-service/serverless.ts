import type { AWS } from '@serverless/typescript';
import {
  getProductsById,
  getProductsList,
  createProduct,
  catalogBatchProcess,
} from '@functions/index';

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
      PG_HOST: '${env:PG_HOST}',
      PG_PORT: '${env:PG_PORT}',
      PG_DATABASE: '${env:PG_DATABASE}',
      PG_USERNAME: '${env:PG_USERNAME}',
      PG_PASSWORD: '${env:PG_PASSWORD}',
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
      SNSSubscriptionAmountNormal: {
        Type: 'AWS::SNS::Subscription',
        Properties: {
          Endpoint: '${env:SNS_SUBSCRIPTION_NORMAL_AMOUNT_EMAIL}',
          Protocol: 'email',
          TopicArn: { Ref: 'SNSTopic' },
          FilterPolicy: {
            count: [{ numeric: ['>', 2] }],
          },
        },
      },
      SNSSubscriptionAmountLow: {
        Type: 'AWS::SNS::Subscription',
        Properties: {
          Endpoint: '${env:SNS_SUBSCRIPTION_LOW_AMOUNT_EMAIL}',
          Protocol: 'email',
          TopicArn: { Ref: 'SNSTopic' },
          FilterPolicy: {
            count: [{ numeric: ['<=', 2] }],
          },
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
  useDotenv: true,
  custom: {
    autoswagger: {
      generateSwaggerOnDeploy: false,
    },
    'serverless-offline': {
      httpPort: '${env:OFFLINE_HTTP_PORT}',
      lambdaPort: '${env:OFFLINE_LAMBDA_PORT}',
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

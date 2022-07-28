import type { AWS } from '@serverless/typescript';

import { importProductsFile, importFileParser } from '@functions/index';

const serverlessConfiguration: AWS = {
  service: 'import-service',
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
    },
    iam: {
      role: {
        statements: [
          {
            Effect: 'Allow',
            Action: ['s3:ListBucket'],
            Resource: ['arn:aws:s3:::gorilla-fruit-storage'],
          },
          {
            Effect: 'Allow',
            Action: ['s3:*'],
            Resource: ['arn:aws:s3:::gorilla-fruit-storage/*'],
          },
        ],
      },
    },
  },
  // import the function via paths
  functions: { importProductsFile, importFileParser },
  package: { individually: true },
  useDotenv: true,
  custom: {
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

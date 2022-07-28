import * as handler from '../handler';
import * as AWS from 'aws-sdk';
import { HTTP_CODE } from '@/utils/http';

jest.mock('aws-sdk', () => {
  const fn = {
    getSignedUrlPromise: jest.fn(),
  };
  return { S3: jest.fn(() => fn) };
});

describe('importProductsFile test', () => {
  let s3;
  beforeEach(() => {
    s3 = new AWS.S3();
  });
  test('If there is no name in params throw 400 error', async () => {
    const response = await handler.main({ queryStringParameters: {} }, null);
    expect(response.statusCode).toBe(HTTP_CODE.BAD_REQUEST);
  });

  test('Handler returns a correct response with url', async () => {
    const testUrl = 'https://some.url';
    s3.getSignedUrlPromise.mockResolvedValue(testUrl);
    const response = await handler.main({ queryStringParameters: { name: 'test.txt' } }, null);
    const { url } = JSON.parse(response.body);
    expect(url).toBe(testUrl);
  });
});

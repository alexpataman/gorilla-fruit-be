import * as handler from '../handler';
import * as AWS from 'aws-sdk';
import { Client } from 'pg';
import { mockedBatchRequest, mockedDbResponse } from './fixtures';

jest.mock('aws-sdk', () => {
  const fn = {
    publish: jest.fn((_, fn) => {
      fn();
    }),
  };

  return {
    SNS: jest.fn(() => fn),
  };
});

jest.mock('pg', () => {
  const mClient = {
    connect: jest.fn(),
    query: jest.fn(),
    end: jest.fn(),
  };
  return { Client: jest.fn(() => mClient) };
});

describe('catalogBatchProcess', () => {
  let sns, client;
  beforeEach(() => {
    sns = new AWS.SNS();
    client = new Client();
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  test('Published 2 times', async () => {
    client.query.mockResolvedValue(mockedDbResponse);
    await handler.main({ Records: mockedBatchRequest }, null);
    expect(client.query).toBeCalledTimes(8);
    expect(sns.publish).toBeCalledTimes(2);
  });
});

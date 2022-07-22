import * as handler from '../handler';
import { mockedProductsList } from './fixtures';
import { Client } from 'pg';

jest.mock('pg', () => {
  const mClient = {
    connect: jest.fn(),
    query: jest.fn(),
    end: jest.fn(),
  };
  return { Client: jest.fn(() => mClient) };
});

describe('getProductsList test', () => {
  let client;
  beforeEach(() => {
    client = new Client();
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  test('Get list of products', async () => {
    client.query.mockResolvedValue(mockedProductsList);
    const { statusCode, body } = await handler.main('', null);
    const { items } = JSON.parse(body);
    expect(statusCode).toBe(200);
    expect(items.length).toBe(2);
  });
});

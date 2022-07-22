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

describe('getProductsById test', () => {
  let client;
  beforeEach(() => {
    client = new Client();
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  test('Test product successfully found by ID', async () => {
    client.query.mockResolvedValue(mockedProductsList);
    const { statusCode, body } = await handler.main(
      { pathParameters: { productId: '7567ec4b-b10c-48c5-9345-fc73c48a80aa' } },
      null
    );
    const { data } = JSON.parse(body);
    expect(statusCode).toBe(200);
    expect(data[0].title).toBe('ProductOne Test');
  });

  test("Wrong product isn't found by ID", async () => {
    client.query.mockResolvedValue({ rows: [] });
    const { statusCode, body } = await handler.main({ pathParameters: { productId: '123' } }, null);
    const { error } = JSON.parse(body);
    expect(statusCode).toBe(404);
    expect(error).toBe('Product not found');
  });
});

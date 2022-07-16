import * as handler from '../handler';
import { mockedProductsList } from './fixtures';
const axios = require("axios");

jest.mock("axios");
axios.get.mockResolvedValue({ data: mockedProductsList });

test('Test product successfully found by ID', async () => {
  const {statusCode, body} = await handler.main({pathParameters: {productId: '7567ec4b-b10c-48c5-9345-fc73c48a80aa'}}, null);
  const data = JSON.parse(body)
  expect(statusCode).toBe(200);
  expect(data.title).toBe("ProductOne Test");
});

test('Wrong product isn\'t found by ID', async () => {
  const {statusCode, body} = await handler.main({pathParameters: {productId: '123'}}, null);
  const data = JSON.parse(body)
  expect(statusCode).toBe(404);
  expect(data.message).toBe("Product not found");
});

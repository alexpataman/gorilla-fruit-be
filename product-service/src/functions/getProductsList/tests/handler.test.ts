import * as handler from '../handler';
import { mockedProductsList } from './fixtures';
const axios = require("axios");

jest.mock("axios");
axios.get.mockResolvedValue({ data: mockedProductsList });

test('Get list of products', async () => {
  const {statusCode, body} = await handler.main('',null);
  const data = JSON.parse(body)
  expect(statusCode).toBe(200);
  expect(data.length).toBe(2);
});

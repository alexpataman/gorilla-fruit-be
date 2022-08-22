import { Client } from 'pg';
import { HTTP_CODE, HttpError } from '@/utils/http';
import { SOMETHING_WENT_WRONG_MESSAGE } from '@/constants';
const { PG_HOST, PG_PORT, PG_DATABASE, PG_USERNAME, PG_PASSWORD } = process.env;

const dbOptions = {
  host: PG_HOST,
  post: PG_PORT,
  database: PG_DATABASE,
  user: PG_USERNAME,
  password: PG_PASSWORD,
  ssl: {
    rejectUnauthorized: false,
  },
  connectionTimeoutMillis: 5000,
};

export const getDbClient = () => {
  return new Client(dbOptions);
};

export const executeDbQuery = async (tryCallback, catchCallback?) => {
  const client = getDbClient();
  await client.connect();
  try {
    return await tryCallback(client);
  } catch (error) {
    if (catchCallback) {
      await catchCallback(client);
    }
    if (error.statusCode) {
      throw error;
    }
    throw new HttpError(HTTP_CODE.INTERNAL_SERVER_ERROR, SOMETHING_WENT_WRONG_MESSAGE);
  } finally {
    client.end();
  }
};

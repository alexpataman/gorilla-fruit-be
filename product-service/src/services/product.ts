import { getDbClient } from "@/utils/db";
import { BAD_REQUEST } from "@/constants";

export const getProducts = async () => {
  const client = getDbClient();
  await client.connect();

  const { rows } = await client.query(`
      select p.*,s.count from products p left join stocks s on p.id=s.product_id;
  `);

  client.end();

  return rows;
}

export const getProduct = async (id: string) => {
  if (!/^[\w\d-]*$/ig.test(id)) {
    throw Error(BAD_REQUEST);
  }
  const client = getDbClient();
  await client.connect();

  const { rows } = await client.query(`
      select p.*,s.count from products p left join stocks s on p.id=s.product_id where p.id='${id}';
  `);

  client.end();

  return rows;
}

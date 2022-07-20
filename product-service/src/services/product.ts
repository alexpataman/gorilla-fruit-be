import { getDbClient } from "@/utils/db";
import { BAD_REQUEST } from "@/constants";
import { Product, Products } from "@/types/api-types";

export const getProducts = async (): Promise<Products> => {
  const client = getDbClient();
  await client.connect();

  const { rows } = await client.query(`
      select p.*,s.count from products p left join stocks s on p.id=s.product_id;
  `);

  client.end();

  return rows;
}

export const getProduct = async (id: string): Promise<Product> => {
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

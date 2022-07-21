import { getDbClient } from "@/utils/db";
import { BAD_REQUEST } from "@/constants";
import { CreateProductRequest, Product, Products } from "@/types/api-types";

export const getProducts = async (): Promise<Products> => {
  const client = getDbClient();
  await client.connect();

  const { rows } = await client.query('select p.*,s.count from products p left join stocks s on p.id=s.product_id');

  client.end();

  return rows;
}

export const validateProduct = (product) => {
  const {title, description, price, count} = product;
  return [title, description, price, count].every(value=>value!==undefined && value!=='');
};

export const addProduct = async (product: CreateProductRequest): Promise<Product|void> => {
  if (!validateProduct(product)){
    throw new Error(BAD_REQUEST);
  }
  const {title, description, count, price} = product;

  const client = getDbClient();
  await client.connect();

  try {
    await client.query('BEGIN')
    const res = await client.query(
      'insert into products(title, description, price) values ($1,$2,$3) RETURNING id',
      [title, description, price]
    );
    await client.query(
      'insert into stocks(product_id, count) values ($1,$2)',
      [res.rows[0].id, count]
    );
    await client.query('COMMIT')
  } catch(e) {
    await client.query('ROLLBACK');
    throw e;
  } finally {
    client.end();
  }
}

export const getProduct = async (id: string): Promise<Products> => {
  if (!/^[\w\d-]*$/ig.test(id)) {
    throw Error(BAD_REQUEST);
  }
  const client = getDbClient();
  await client.connect();

  const { rows } = await client.query(
    'select p.*,s.count from products p left join stocks s on p.id=s.product_id where p.id=$1', [id]
  );

  client.end();

  return rows;
}

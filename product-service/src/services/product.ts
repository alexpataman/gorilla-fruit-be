import { executeDbQuery } from '@/utils/db';
import { BAD_REQUEST_MESSAGE, PRODUCT_NOT_FOUND_MESSAGE } from '@/constants';
import { CreateProductRequest, Product } from '@/types/api-types';
import { HTTP_CODE, HttpError } from '@/utils/http';

const validateProduct = (product) => {
  const { title, description, price, count } = product;
  return (
    [title, description, price, count].every((value) => value !== undefined && value !== '') &&
    count > 0
  );
};

export const addProduct = async (product: CreateProductRequest): Promise<Product | void> => {
  if (!validateProduct(product)) {
    throw new HttpError(HTTP_CODE.BAD_REQUEST, BAD_REQUEST_MESSAGE);
  }
  const { title, description, count, price } = product;

  return await executeDbQuery(
    async (client) => {
      await client.query('BEGIN');
      const res = await client.query(
        'insert into products(title, description, price) values ($1,$2,$3) RETURNING id',
        [title, description, price]
      );
      await client.query('insert into stocks(product_id, count) values ($1,$2)', [
        res.rows[0].id,
        count,
      ]);
      await client.query('COMMIT');
      return [{ id: res.rows[0].id, ...product }];
    },
    async (client) => await client.query('ROLLBACK')
  );
};

export const getProducts = async (): Promise<Product[]> => {
  return await executeDbQuery(async (client) => {
    const { rows } = await client.query(
      'select p.*,s.count from products p left join stocks s on p.id=s.product_id'
    );
    return rows;
  });
};

export const getProduct = async (id: string): Promise<Product[]> => {
  if (!/^[\w\d-]*$/gi.test(id)) {
    throw new HttpError(HTTP_CODE.BAD_REQUEST, BAD_REQUEST_MESSAGE);
  }

  return await executeDbQuery(async (client) => {
    const { rows } = await client.query(
      'select p.*,s.count from products p left join stocks s on p.id=s.product_id where p.id=$1',
      [id]
    );
    if (!rows.length) {
      throw new HttpError(HTTP_CODE.NOT_FOUND, PRODUCT_NOT_FOUND_MESSAGE);
    }
    return rows;
  });
};

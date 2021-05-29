import knex from '../../common/connection';

export type Products = {
  name: string;
  amount: number;
  price: number;
};

const db = knex();
const productsRepository = () => {
  const getAll = async () => {
    return await db.select().from('products');
  };
  const getOne = async (uid: string) => {
    const [data] = await db.select().from('products').where({ uid });
    return data;
  };
  const edit = async ({ uid, body }: { uid: String; body: Products }) => {
    const [data] = await db.from('products').update(body).where({ uid }).returning('*');
    return data;
  };
  const add = async (body: Products) => {
    return await db.from('products').insert(body).returning('*');
  };
  const deleteProduct = async (uid: string) => {
    await db.from('products').delete().where({ uid });
    return getAll();
  };
  const findNameLike = async (name: string) => {
    return await db.select().from('products').where('name', 'like', `%${name}%`);
  };
  const findName = async (name: string) => {
    return await db.select().from('products').where({ name });
  };
  const findPriceRange = async ({ after, before }: { after: Number; before: Number }) => {
    return await db
      .select()
      .from('products')
      .where('price', '>=', String(after))
      .where('price', '<=', String(before));
  };
  const findInStock = async () => {
    return await db.select().from('products').where('amount', '>', 0);
  };
  return {
    getAll,
    getOne,
    deleteProduct,
    add,
    edit,
    findInStock,
    findName,
    findNameLike,
    findPriceRange,
  };
};

export default productsRepository;
